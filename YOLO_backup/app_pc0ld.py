from fastapi import FastAPI, UploadFile, File
from PIL import Image
import io, time
from ultralytics import YOLO

# PC 端：用 best.pt（或 yolov8n.pt）直接推理
# 启动前：pip install ultralytics fastapi uvicorn pillow

MODEL_PATH = "runs/detect/train/weights/best.pt"   # 改成你的路径，如 runs/detect/train/weights/best.pt
IMGSZ = 640

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # 或者更严格写 ["http://127.0.0.1:8000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = YOLO(MODEL_PATH)

@app.get("/health")
def health():
    return {"ok": True, "backend": "pc"}

@app.post("/infer_image")
async def infer_image(file: UploadFile = File(...)):
    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

    t0 = time.time()
    res = model(img, imgsz=IMGSZ, verbose=False)[0]
    lat_ms = (time.time() - t0) * 1000

    dets = []
    # 兼容单类/多类：如果模型有 names，就用 names 映射
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
        "detections": dets
    }
