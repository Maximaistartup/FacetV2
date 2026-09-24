export function createLandmarkEditor(canvas, onConfirm) {
  const ctx = canvas.getContext("2d");
  let img = null;
  let pointsMap = {};
  let currentKey = null;
  let activeDrag = null;

  function draw() {
    if (!img) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    for (const [key, pt] of Object.entries(pointsMap)) {
      const isActive = key === currentKey;
      ctx.strokeStyle = isActive ? "#00f0ff" : "#00ffaa";
      ctx.lineWidth = isActive ? 3 : 2;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, isActive ? 8 : 5, 0, Math.PI * 2);
      ctx.stroke();

      if (isActive) {
        ctx.beginPath();
        ctx.moveTo(pt.x - 12, pt.y); ctx.lineTo(pt.x + 12, pt.y);
        ctx.moveTo(pt.x, pt.y - 12); ctx.lineTo(pt.x, pt.y + 12);
        ctx.stroke();
      }
    }
  }

  canvas.addEventListener("pointerdown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const [key, pt] of Object.entries(pointsMap)) {
      if (Math.hypot(pt.x - x, pt.y - y) < 15) {
        activeDrag = key;
        currentKey = key;
        draw();
        break;
      }
    }
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!activeDrag) return;
    const rect = canvas.getBoundingClientRect();
    pointsMap[activeDrag] = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    draw();
  });

  window.addEventListener("pointerup", () => { activeDrag = null; });

  return {
    loadMetric(imageEl, points) {
      img = imageEl;
      canvas.width = imageEl.naturalWidth || 800;
      canvas.height = imageEl.naturalHeight || 800;
      pointsMap = { ...points };
      currentKey = Object.keys(pointsMap)[0] || null;
      draw();
    },
    getPoints: () => pointsMap
  };
}
