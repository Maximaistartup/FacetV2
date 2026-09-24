export const METRIC_DEFINITIONS = [
  // FRONTAL METRICS
  {
    id: "fwhr",
    name: "Facial Height / Width Ratio",
    category: "Frontal",
    photo: "front",
    description: "Ratio of total height (Forehead-to-Chin) relative to cheekbone width.",
    pointsNeeded: [
      { id: "forehead", label: "Forehead Midpoint", index: 10, help: "Top central forehead hairline." },
      { id: "chin", label: "Menton (Chin)", index: 152, help: "Lowest point on chin contour." },
      { id: "leftCheek", label: "Left Zygoma", index: 234, help: "Outermost point on left cheek." },
      { id: "rightCheek", label: "Right Zygoma", index: 454, help: "Outermost point on right cheek." }
    ],
    idealMin: 1.30,
    idealMax: 1.50,
    unit: "ratio",
    calculate: (pts) => {
      const h = Math.hypot(pts.chin.x - pts.forehead.x, pts.chin.y - pts.forehead.y);
      const w = Math.hypot(pts.rightCheek.x - pts.leftCheek.x, pts.rightCheek.y - pts.leftCheek.y);
      return h / (w || 1);
    }
  },
  {
    id: "eyeCanthalRatio",
    name: "Intercanthal Ratio",
    category: "Frontal",
    photo: "front",
    description: "Distance between eyes compared to width of a single eye.",
    pointsNeeded: [
      { id: "lInner", label: "Left Inner Canthus", index: 133, help: "Inner corner of left eye." },
      { id: "lOuter", label: "Left Outer Canthus", index: 33, help: "Outer corner of left eye." },
      { id: "rInner", label: "Right Inner Canthus", index: 362, help: "Inner corner of right eye." }
    ],
    idealMin: 0.90,
    idealMax: 1.10,
    unit: "ratio",
    calculate: (pts) => {
      const eyeW = Math.hypot(pts.lInner.x - pts.lOuter.x, pts.lInner.y - pts.lOuter.y);
      const inter = Math.hypot(pts.rInner.x - pts.lInner.x, pts.rInner.y - pts.lInner.y);
      return inter / (eyeW || 1);
    }
  },

  // SIDE-PROFILE METRICS
  {
    id: "nasolabialAngle",
    name: "Nasolabial Angle",
    category: "Profile",
    photo: "profile",
    description: "Angle formed between nasal columella and upper lip vector.",
    pointsNeeded: [
      { id: "pronasale", label: "Pronasale (Nose Tip)", index: 4, help: "Most anterior point of nose tip." },
      { id: "subnasale", label: "Subnasale", index: 2, help: "Junction between nose base and lip." },
      { id: "labraleSup", label: "Upper Lip Apex", index: 0, help: "Most anterior point of upper lip." }
    ],
    idealMin: 90,
    idealMax: 110,
    unit: "deg",
    calculate: (pts) => {
      const v1 = { x: pts.pronasale.x - pts.subnasale.x, y: pts.pronasale.y - pts.subnasale.y };
      const v2 = { x: pts.labraleSup.x - pts.subnasale.x, y: pts.labraleSup.y - pts.subnasale.y };
      const rad = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
      let deg = Math.abs((rad * 180) / Math.PI);
      if (deg > 180) deg = 360 - deg;
      return deg;
    }
  },
  {
    id: "facialConvexity",
    name: "Facial Convexity (Glabella)",
    category: "Profile",
    photo: "profile",
    description: "Profile angle formed from Glabella to Subnasale to Pogonion.",
    pointsNeeded: [
      { id: "glabella", label: "Glabella", index: 9, help: "Forehead protrusion point." },
      { id: "subnasale", label: "Subnasale", index: 2, help: "Subnasal junction." },
      { id: "pogonion", label: "Pogonion (Chin)", index: 199, help: "Most anterior chin point." }
    ],
    idealMin: 165,
    idealMax: 175,
    unit: "deg",
    calculate: (pts) => {
      const v1 = { x: pts.glabella.x - pts.subnasale.x, y: pts.glabella.y - pts.subnasale.y };
      const v2 = { x: pts.pogonion.x - pts.subnasale.x, y: pts.pogonion.y - pts.subnasale.y };
      const rad = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
      let deg = Math.abs((rad * 180) / Math.PI);
      if (deg > 180) deg = 360 - deg;
      return deg;
    }
  }
];
