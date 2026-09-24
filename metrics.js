import { METRIC_DEFINITIONS } from "./definitions.js";

export function evaluateMetricScore(value, min, max) {
  const mid = (min + max) / 2;
  const halfRange = (max - min) / 2;
  if (halfRange === 0) return { score: "0.00", status: "optimal" };

  const scoreNum = Math.abs(value - mid) / halfRange;
  const formattedScore = scoreNum.toFixed(2);
  const status = scoreNum <= 1.0 ? "optimal" : "outside";

  return { score: formattedScore, status };
}

export function computeMetricValue(metricDef, userPoints) {
  try {
    const val = metricDef.calculate(userPoints);
    if (isNaN(val) || val === null) return null;
    return val;
  } catch (e) {
    console.error(`Error computing ${metricDef.id}:`, e);
    return null;
  }
}
