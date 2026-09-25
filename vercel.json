import { METRIC_DEFINITIONS } from "./definitions.js";

export function createWorkflowEngine(onMetricChange, onComplete) {
  let activeType = "front"; // "front" -> "profile"
  let queue = [];
  let index = 0;
  let results = [];

  function loadQueue(type) {
    activeType = type;
    queue = METRIC_DEFINITIONS.filter(m => m.photo === type);
    index = 0;
  }

  return {
    startFrontal() {
      loadQueue("front");
      onMetricChange(queue[index], index + 1, queue.length);
    },
    startProfile() {
      loadQueue("profile");
      onMetricChange(queue[index], index + 1, queue.length);
    },
    confirmCurrentMetric(confirmedPoints) {
      const current = queue[index];
      const val = current.calculate(confirmedPoints);

      results.push({
        id: current.id,
        name: current.name,
        category: current.category,
        val: val,
        unit: current.unit,
        idealMin: current.idealMin,
        idealMax: current.idealMax
      });

      index++;
      if (index < queue.length) {
        onMetricChange(queue[index], index + 1, queue.length);
      } else {
        if (activeType === "front") {
          onComplete("front_done");
        } else {
          onComplete("all_done", results);
        }
      }
    }
  };
}
