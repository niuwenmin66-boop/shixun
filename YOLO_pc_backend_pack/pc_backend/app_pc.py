from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io, time
from ultralytics import YOLO

# ✅ 改这里：指向你 train2 的 best.pt
MODEL_PATH = r"runs/detect/train2/weights/best.pt"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO(MODEL_PATH)

def clamp(x, lo, hi, default):
    try:
        v = float(x)
    except Exception:
        return default
    return max(lo, min(hi, v))

@app.get("/health")
def health():
    return {"ok": True, "backend": "pc", "model": MODEL_PATH}

@app.post("/infer_image")
async def infer_image(
    file: UploadFile = File(...),
    conf: float = Form(0.25),
    iou: float = Form(0.45),
    imgsz: int = Form(640),
):
    # ---- sanitize ----
    conf = clamp(conf, 0.0, 1.0, 0.25)
    iou  = clamp(iou, 0.0, 1.0, 0.45)
    try:
        imgsz = int(imgsz)
    except Exception:
        imgsz = 640
    imgsz = max(128, min(1280, imgsz))

    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

    t0 = time.time()
    res = model(img, imgsz=imgsz, conf=conf, iou=iou, verbose=False)[0]
    lat_ms = (time.time() - t0) * 1000

    dets = []
    names = getattr(res, "names", None) or getattr(model, "names", None) or {}

    # ✅ 只保留 motor（单类通常 cls_id=0；如果 names 里叫 motor，也支持）
    for b in res.boxes:
        cls_id = int(b.cls) if b.cls is not None else 0
        cls_name = names.get(cls_id, str(cls_id))

        # 过滤：只输出 motor
        if cls_id != 0 and str(cls_name).lower() != "motor":
            continue

        dets.append({
            "cls": "motor",
            "conf": float(b.conf),
            "xyxy": [float(x) for x in b.xyxy[0]]
        })

    return {
        "backend": "pc",
        "lat_ms": round(lat_ms, 2),
        "img_size": [img.width, img.height],
        "conf_used": float(conf),
        "iou_used": float(iou),
        "imgsz_used": int(imgsz),
        "detections": dets
    }