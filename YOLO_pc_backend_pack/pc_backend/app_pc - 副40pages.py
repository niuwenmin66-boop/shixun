from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io, time
from ultralytics import YOLO

MODEL_PATH = "runs/detect/train/weights/best.pt"
IMGSZ = 640

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO(MODEL_PATH)

@app.get("/health")
def health():
    return {"ok": True, "backend": "pc"}

@app.post("/infer_image")
async def infer_image(
    file: UploadFile = File(...),
    conf: float = Form(0.25),
    iou: float = Form(0.45),
    imgsz: int = Form(640),
):
    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

    t0 = time.time()
    res = model(
        img,
        imgsz=imgsz,
        conf=conf,
        iou=iou,
        verbose=False
    )[0]
    lat_ms = (time.time() - t0) * 1000

    dets = []
    names = getattr(res, "names", None) or getattr(model, "names", None) or {}

    for b in res.boxes:
        cls_id = int(b.cls) if b.cls is not None else 0
        cls_name = names.get(cls_id, str(cls_id))
        dets.append({
            "cls": cls_name,
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