# PC 本地推理版本（不用 Jetson / portproxy）

## 你得到什么
- pc_backend/app_pc.py：FastAPI 后端，用 Ultralytics YOLO 直接加载 best.pt 推理
- web/yolo_person_demo_like_realtime.html：前端 demo（摄像头/视频抓帧 → POST /infer_image → 画框）
- web/start_web_server.bat：起静态服务器（避免 file:// CORS）

## 步骤
1) 训练好模型或先用官方模型：
   - 你可以把 `pc_backend/app_pc.py` 里的 MODEL_PATH 改成：
     - 你的 `runs/detect/train/weights/best.pt`
     - 或 `yolov8n.pt`（先跑通）
2) 启动后端（PC）：
   - 双击 `pc_backend/start_pc_backend.bat`
   - 看到 Uvicorn 在 0.0.0.0:8001 即成功
3) 启动前端（PC）：
   - 双击 `web/start_web_server.bat`
   - 浏览器打开： http://127.0.0.1:8000/yolo_person_demo_like_realtime.html
4) 点击“检查 /health”，然后“摄像头/导入视频”+“开始推理”

## 接口说明
- GET /health -> {ok:true, backend:"pc"}
- POST /infer_image（multipart 上传 file）-> 统一 JSON:
  { backend, lat_ms, img_size:[w,h], detections:[{cls,conf,xyxy}] }
