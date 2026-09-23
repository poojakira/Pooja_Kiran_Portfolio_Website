import json
import sys
from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np
from scipy.spatial import Delaunay

def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: extract_face_landmarks.py <image> <output-json>")

    image_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    output_path.parent.mkdir(parents=True, exist_ok=True)

    image = cv2.imread(str(image_path))
    if image is None:
        raise SystemExit(f"cannot read {image_path}")

    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    h, w = image.shape[:2]

    with mp.solutions.face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
    ) as face_mesh:
        result = face_mesh.process(rgb)

    if not result.multi_face_landmarks:
        raise SystemExit("no face detected in reference portrait")

    landmarks = result.multi_face_landmarks[0].landmark[:468]
    pts = np.array([[lm.x, lm.y, lm.z] for lm in landmarks], dtype=np.float64)
    pts2 = pts[:, :2]
    tri = Delaunay(pts2).simplices

    # Reject very long Delaunay bridges around the convex hull.
    kept = []
    for a,b,c in tri:
        p = pts2[[a,b,c]]
        d01 = np.linalg.norm(p[0]-p[1])
        d12 = np.linalg.norm(p[1]-p[2])
        d20 = np.linalg.norm(p[2]-p[0])
        if max(d01,d12,d20) < 0.115:
            kept.append([int(a),int(b),int(c)])

    payload = {
        "image_width": int(w),
        "image_height": int(h),
        "landmarks": pts.tolist(),
        "triangles": kept,
        "source": str(image_path),
    }
    output_path.write_text(json.dumps(payload), encoding="utf-8")
    print(f"face landmarks: {len(landmarks)} vertices, {len(kept)} triangles -> {output_path}")

if __name__ == "__main__":
    main()
