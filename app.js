import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { initNavigation } from "./navigation.js";
import { METRIC_DEFINITIONS } from "./definitions.js";
import { evaluateMetricScore } from "./metrics.js";
import { validateImageCriteria } from "./validator.js";
import { createLandmarkEditor } from "./landmarkEditor.js";
import { createWorkflowEngine } from "./workflow.js";

let landmarker = null;
let frontImage = null;
let profileImage = null;
let frontLm = null;
let profileLm = null;
let pendingType = null;

const $ = (id) => document.getElementById(id);

// UI Handles
const guideModal = $("guideModal");
const validationAlert = $("validationAlert");
const frontPreview = $("frontPreview");
const profilePreview = $("profilePreview");
const frontPlaceholder = $("frontPlaceholder");
const profilePlaceholder = $("profilePlaceholder");
const profileGuideBtn = $("profileGuideBtn");
const editorSection = $("editorSection");
const resultsSection = $("resultsSection");
const resultsTableBody = $("resultsTableBody");

const editor = createLandmarkEditor($("editorCanvas"));

const workflow = createWorkflowEngine(
  (metric, current, total) => {
    $("editorMetricTitle").textContent = `${metric.name} (${metric.category})`;
    $("editorMetricProgress").textContent = `${current} / ${total}`;
    $("editorInstructions").textContent = metric.description;

    const img = metric.photo === "front" ? frontImage : profileImage;
    const lm = metric.photo === "front" ? frontLm : profileLm;

    // Convert landmark indices into coordinates
    const pts = {};
    metric.pointsNeeded.forEach(p => {
      const point = lm[p.index];
      pts[p.id] = {
        x: point.x * img.naturalWidth,
        y: point.y * img.naturalHeight
      };
    });

    editor.loadMetric(img, pts);
    editorSection.classList.remove("hidden");
  },
  (status, results) => {
    if (status === "front_done") {
      editorSection.classList.add("hidden");
      profileGuideBtn.disabled = false;
      alert("Frontal metrics complete! Proceed to Side-Profile photo.");
    } else if (status === "all_done") {
      editorSection.classList.add("hidden");
      renderResults(results);
    }
  }
);

async function init() {
  initNavigation();
  renderMetricsLibrary();

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm"
  );
  landmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU"
    },
    runningMode: "IMAGE",
    numFaces: 2
  });
}

// Guideline modal triggers
$("frontGuideBtn").addEventListener("click", () => openModal("front"));
$("profileGuideBtn").addEventListener("click", () => openModal("profile"));
$("modalCancelBtn").addEventListener("click", () => guideModal.classList.add("hidden"));

function openModal(type) {
  pendingType = type;
  validationAlert.classList.add("hidden");
  guideModal.classList.remove("hidden");
}

$("modalUploadTrigger").addEventListener("click", () => {
  const input = pendingType === "front" ? $("frontFile") : $("profileFile");
  input.click();
});

$("frontFile").addEventListener("change", (e) => handleUpload(e, "front"));
$("profileFile").addEventListener("change", (e) => handleUpload(e, "profile"));

function handleUpload(e, type) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const img = new Image();
    img.onload = () => {
      const val = validateImageCriteria(img, landmarker, type);
      if (!val.valid) {
        validationAlert.textContent = val.error;
        validationAlert.classList.remove("hidden");
        return;
      }

      guideModal.classList.add("hidden");

      if (type === "front") {
        frontImage = img;
        frontLm = val.landmarks;
        frontPreview.src = evt.target.result;
        frontPreview.classList.add("visible");
        frontPlaceholder.style.display = "none";
        workflow.startFrontal();
      } else {
        profileImage = img;
        profileLm = val.landmarks;
        profilePreview.src = evt.target.result;
        profilePreview.classList.add("visible");
        profilePlaceholder.style.display = "none";
        workflow.startProfile();
      }
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

$("confirmMetricBtn").addEventListener("click", () => {
  const pts = editor.getPoints();
  workflow.confirmCurrentMetric(pts);
});

function renderResults(results) {
  resultsTableBody.innerHTML = "";
  results.forEach(r => {
    const evalRes = evaluateMetricScore(r.val, r.idealMin, r.idealMax);
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><span class="tag-type">${r.category}</span></td>
      <td><strong>${r.name}</strong></td>
      <td>${r.val.toFixed(2)} ${r.unit}</td>
      <td>${r.idealMin.toFixed(2)} - ${r.idealMax.toFixed(2)} ${r.unit}</td>
      <td><span class="score-badge ${evalRes.status}">${evalRes.score}</span></td>
    `;
    resultsTableBody.appendChild(tr);
  });
  resultsSection.classList.remove("hidden");
}

function renderMetricsLibrary() {
  const container = $("metricsLibraryContainer");
  container.innerHTML = "";
  METRIC_DEFINITIONS.forEach(m => {
    const card = document.createElement("div");
    card.className = "upload-card";
    card.innerHTML = `
      <h3>${m.name}</h3>
      <p style="color:var(--muted); font-size:12px; margin: 8px 0;">${m.description}</p>
      <div style="font-family:var(--font-mono); font-size:11px; color:var(--cyan);">
        Target: ${m.idealMin} - ${m.idealMax} ${m.unit}
      </div>
    `;
    container.appendChild(card);
  });
}

init();
