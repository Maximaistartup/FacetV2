export function validateImageCriteria(imageEl, landmarker, expectedType) {
  if (!landmarker) return { valid: false, error: "AI Engine not ready." };

  const res = landmarker.detect(imageEl);
  if (!res || !res.faceLandmarks || res.faceLandmarks.length === 0) {
    return { valid: false, error: "No face detected. Follow steps: 2m back, 2x optical zoom, clear light." };
  }

  if (res.faceLandmarks.length > 1) {
    return { valid: false, error: "Multiple faces detected. Ensure only you are in frame." };
  }

  const lm = res.faceLandmarks[0];
  const nose = lm[1];
  const lEar = lm[127];
  const rEar = lm[356];

  if (expectedType === "front") {
    const sym = Math.abs((nose.x - lEar.x) - (rEar.x - nose.x));
    if (sym > 0.15) {
      return { valid: false, error: "Head is turned. Please face straight toward the camera." };
    }
  } else if (expectedType === "profile") {
    const profileDist = Math.abs(lEar.x - rEar.x);
    if (profileDist > 0.25) {
      return { valid: false, error: "Not a pure side-profile. Rotate head 90 degrees to side." };
    }
  }

  return { valid: true, landmarks: lm };
}
