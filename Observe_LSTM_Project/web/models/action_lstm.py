from flask import Flask, request, jsonify, make_response
import numpy as np
import tensorflow as tf
import traceback

MODEL_PATH = "action_lstm.h5"
T = 60

app = Flask(__name__)
model = tf.keras.models.load_model(MODEL_PATH)
print("Loaded:", MODEL_PATH)
model.summary()

def add_cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return resp

@app.route("/infer", methods=["POST", "OPTIONS"])
def infer():
    if request.method == "OPTIONS":
        return add_cors(make_response("", 204))

    try:
        data = request.get_json(silent=True) or {}
        seq = data.get("sequence", None)
        if seq is None:
            return add_cors(jsonify({"ok": False, "error": "missing sequence"})), 400
        if not isinstance(seq, list) or len(seq) != T:
            return add_cors(jsonify({"ok": False, "error": f"bad T, expect {T}"})), 400
        if not isinstance(seq[0], list) or len(seq[0]) == 0:
            return add_cors(jsonify({"ok": False, "error": "bad frame format"})), 400

        D = len(seq[0])
        for i, fr in enumerate(seq):
            if not isinstance(fr, list) or len(fr) != D:
                return add_cors(jsonify({"ok": False, "error": f"D mismatch at frame {i}: got {len(fr)} expect {D}"})), 400

        x = np.array(seq, dtype=np.float32)[None, ...]  # (1,60,D)

        y = model.predict(x, verbose=0)
        y = np.array(y)

        # ---- robust decode ----
        info = {"y_shape": list(y.shape)}

        # Case 1: scalar-ish (1,1) or (1,)
        if y.size == 1:
            prob = float(y.reshape(-1)[0])
            result = {"mode": "scalar", "prob": prob}

        # Case 2: sequence output (1,T,1) or (1,T)
        elif y.ndim == 3 and y.shape[0] == 1 and y.shape[1] == T:
            # take last timestep
            last = y[0, -1]
            if last.size == 1:
                prob = float(last.reshape(-1)[0])
                result = {"mode": "seq_last_scalar", "prob": prob}
            else:
                # multi-class per timestep: return last vector
                probs = last.reshape(-1).tolist()
                cls = int(np.argmax(probs))
                result = {"mode": "seq_last_multiclass", "class": cls, "probs": probs}

        # Case 3: multiclass (1,C)
        elif y.ndim == 2 and y.shape[0] == 1:
            probs = y[0].reshape(-1).tolist()
            cls = int(np.argmax(probs))
            result = {"mode": "multiclass", "class": cls, "probs": probs}

        else:
            # fallback: return first 20 numbers to inspect
            flat = y.reshape(-1)
            result = {"mode": "unknown", "preview": flat[:20].tolist(), "size": int(flat.size)}

        # If it's a sigmoid "GOOD prob" we can still provide pred
        pred = None
        prob_good = None
        if "prob" in result:
            prob_good = float(result["prob"])
            pred = "GOOD" if prob_good >= 0.5 else "BAD"

        payload = {"ok": True, "result": result, "pred": pred, "prob_good": prob_good, "debug": info}
        return add_cors(jsonify(payload))

    except Exception as e:
        tb = traceback.format_exc()
        print("INFER ERROR:\n", tb)
        return add_cors(jsonify({"ok": False, "error": str(e), "trace": tb})), 500

if __name__ == "__main__":
    print("Infer server: http://127.0.0.1:8001/infer")
    app.run(host="0.0.0.0", port=8001, debug=True)
