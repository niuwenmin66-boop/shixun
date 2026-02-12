from flask import Flask, request, jsonify, make_response
import numpy as np
import tensorflow as tf

MODEL_PATH = "action_lstm.keras"
model = tf.keras.models.load_model(MODEL_PATH, compile=False)
T = 60

app = Flask(__name__)
model = tf.keras.models.load_model(MODEL_PATH)
print("Loaded model input:", model.input_shape)

def cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return resp

@app.route("/infer", methods=["POST","OPTIONS"])
def infer():
    if request.method == "OPTIONS":
        return cors(make_response("", 204))
    data = request.get_json(force=True)
    seq = data["sequence"]
    x = np.array(seq, dtype=np.float32)[None, ...]  # (1,60,23)
    y = model.predict(x, verbose=0)
    prob = float(np.ravel(y)[0])
    return cors(jsonify({"ok": True, "prob_good": prob, "pred": "GOOD" if prob>=0.5 else "BAD"}))

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8001, debug=False)
