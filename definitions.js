export const METRIC_DEFINITIONS = [
  // ==========================================
  // 1. VERTICAL & HORIZONTAL FACIAL PROPORTIONS
  // ==========================================
  {
    id: "topThird",
    name: "Top Third Proportion",
    category: "Proportions",
    photo: "front",
    description: "Hairline to Glabella relative to total facial height.",
    pointsNeeded: [
      { id: "hairline", label: "Hairline (Trichion)", index: 10 },
      { id: "glabella", label: "Glabella", index: 9 },
      { id: "chin", label: "Menton", index: 152 }
    ],
    idealMin: 30.0,
    idealMax: 32.0,
    unit: "%",
    calculate: (pts) => {
      const top = Math.hypot(pts.glabella.x - pts.hairline.x, pts.glabella.y - pts.hairline.y);
      const total = Math.hypot(pts.chin.x - pts.hairline.x, pts.chin.y - pts.hairline.y);
      return (top / (total || 1)) * 100;
    }
  },
  {
    id: "middleThird",
    name: "Middle Third Proportion",
    category: "Proportions",
    photo: "front",
    description: "Glabella to Subnasale relative to total facial height.",
    pointsNeeded: [
      { id: "hairline", label: "Hairline", index: 10 },
      { id: "glabella", label: "Glabella", index: 9 },
      { id: "subnasale", label: "Subnasale", index: 2 },
      { id: "chin", label: "Menton", index: 152 }
    ],
    idealMin: 31.4,
    idealMax: 33.4,
    unit: "%",
    calculate: (pts) => {
      const mid = Math.hypot(pts.subnasale.x - pts.glabella.x, pts.subnasale.y - pts.glabella.y);
      const total = Math.hypot(pts.chin.x - pts.hairline.x, pts.chin.y - pts.hairline.y);
      return (mid / (total || 1)) * 100;
    }
  },
  {
    id: "lowerThird",
    name: "Lower Third Proportion",
    category: "Proportions",
    photo: "front",
    description: "Subnasale to Menton relative to total facial height.",
    pointsNeeded: [
      { id: "hairline", label: "Hairline", index: 10 },
      { id: "subnasale", label: "Subnasale", index: 2 },
      { id: "chin", label: "Menton", index: 152 }
    ],
    idealMin: 33.9,
    idealMax: 37.0,
    unit: "%",
    calculate: (pts) => {
      const lower = Math.hypot(pts.chin.x - pts.subnasale.x, pts.chin.y - pts.subnasale.y);
      const total = Math.hypot(pts.chin.x - pts.hairline.x, pts.chin.y - pts.hairline.y);
      return (lower / (total || 1)) * 100;
    }
  },
  {
    id: "fwhrUpper",
    name: "Upper FWHR",
    category: "Proportions",
    photo: "front",
    description: "Bizygomatic width relative to upper facial height (Nose Bridge to Lip Apex).",
    pointsNeeded: [
      { id: "nasion", label: "Nose Bridge", index: 6 },
      { id: "lipApex", label: "Upper Lip Apex", index: 0 },
      { id: "lCheek", label: "Left Zygoma", index: 234 },
      { id: "rCheek", label: "Right Zygoma", index: 454 }
    ],
    idealMin: 1.96,
    idealMax: 2.00,
    unit: "ratio",
    calculate: (pts) => {
      const w = Math.hypot(pts.rCheek.x - pts.lCheek.x, pts.rCheek.y - pts.lCheek.y);
      const h = Math.hypot(pts.lipApex.x - pts.nasion.x, pts.lipApex.y - pts.nasion.y);
      return w / (h || 1);
    }
  },
  {
    id: "fwhrTotal",
    name: "Total Facial Width to Height Ratio",
    category: "Proportions",
    photo: "front",
    description: "Cheekbone width relative to total facial height.",
    pointsNeeded: [
      { id: "hairline", label: "Hairline", index: 10 },
      { id: "chin", label: "Menton", index: 152 },
      { id: "lCheek", label: "Left Zygoma", index: 234 },
      { id: "rCheek", label: "Right Zygoma", index: 454 }
    ],
    idealMin: 1.34,
    idealMax: 1.37,
    unit: "ratio",
    calculate: (pts) => {
      const w = Math.hypot(pts.rCheek.x - pts.lCheek.x, pts.rCheek.y - pts.lCheek.y);
      const h = Math.hypot(pts.chin.x - pts.hairline.x, pts.chin.y - pts.hairline.y);
      return w / (h || 1);
    }
  },
  {
    id: "bitemporalWidth",
    name: "Bitemporal Width Ratio",
    category: "Proportions",
    photo: "front",
    description: "Temple width relative to bizygomatic facial width.",
    pointsNeeded: [
      { id: "lTemple", label: "Left Temple", index: 21 },
      { id: "rTemple", label: "Right Temple", index: 251 },
      { id: "lCheek", label: "Left Zygoma", index: 234 },
      { id: "rCheek", label: "Right Zygoma", index: 454 }
    ],
    idealMin: 86.5,
    idealMax: 92.5,
    unit: "%",
    calculate: (pts) => {
      const templeW = Math.hypot(pts.rTemple.x - pts.lTemple.x, pts.rTemple.y - pts.lTemple.y);
      const cheekW = Math.hypot(pts.rCheek.x - pts.lCheek.x, pts.rCheek.y - pts.lCheek.y);
      return (templeW / (cheekW || 1)) * 100;
    }
  },
  {
    id: "midfaceRatio",
    name: "Midface Ratio",
    category: "Proportions",
    photo: "front",
    description: "Intercanthal distance relative to midface vertical height.",
    pointsNeeded: [
      { id: "lInner", label: "Left Inner Eye", index: 133 },
      { id: "rInner", label: "Right Inner Eye", index: 362 },
      { id: "subnasale", label: "Subnasale", index: 2 }
    ],
    idealMin: 0.97,
    idealMax: 1.00,
    unit: "ratio",
    calculate: (pts) => {
      const eyeW = Math.hypot(pts.rInner.x - pts.lInner.x, pts.rInner.y - pts.lInner.y);
      const midY = (pts.lInner.y + pts.rInner.y) / 2;
      const midH = Math.abs(pts.subnasale.y - midY);
      return eyeW / (midH || 1);
    }
  },

  // ==========================================
  // 2. LOWER FACE & MANDIBULAR ARCHITECTURE
  // ==========================================
  {
    id: "bigonialWidth",
    name: "Bigonial Width Ratio",
    category: "Lower Face",
    photo: "front",
    description: "Jaw width (Gonion-to-Gonion) relative to cheekbone width.",
    pointsNeeded: [
      { id: "lGonion", label: "Left Gonion", index: 172 },
      { id: "rGonion", label: "Right Gonion", index: 397 },
      { id: "lCheek", label: "Left Zygoma", index: 234 },
      { id: "rCheek", label: "Right Zygoma", index: 454 }
    ],
    idealMin: 87.5,
    idealMax: 91.5,
    unit: "%",
    calculate: (pts) => {
      const jawW = Math.hypot(pts.rGonion.x - pts.lGonion.x, pts.rGonion.y - pts.lGonion.y);
      const cheekW = Math.hypot(pts.rCheek.x - pts.lCheek.x, pts.rCheek.y - pts.lCheek.y);
      return (jawW / (cheekW || 1)) * 100;
    }
  },
  {
    id: "chinWidthRatio",
    name: "Chin Width Ratio",
    category: "Lower Face",
    photo: "front",
    description: "Chin width relative to cheekbone width.",
    pointsNeeded: [
      { id: "lChin", label: "Left Chin Point", index: 148 },
      { id: "rChin", label: "Right Chin Point", index: 377 },
      { id: "lCheek", label: "Left Zygoma", index: 234 },
      { id: "rCheek", label: "Right Zygoma", index: 454 }
    ],
    idealMin: 25.0,
    idealMax: 35.0,
    unit: "%",
    calculate: (pts) => {
      const chinW = Math.hypot(pts.rChin.x - pts.lChin.x, pts.rChin.y - pts.lChin.y);
      const cheekW = Math.hypot(pts.rCheek.x - pts.lCheek.x, pts.rCheek.y - pts.lCheek.y);
      return (chinW / (cheekW || 1)) * 100;
    }
  },
  {
    id: "gonialAngle",
    name: "Gonial Angle",
    category: "Lower Face",
    photo: "profile",
    description: "Mandibular angle between Ramus and Mandibular Body.",
    pointsNeeded: [
      { id: "condyle", label: "TMJ / Condyle", index: 162 },
      { id: "gonion", label: "Gonion", index: 172 },
      { id: "pogonion", label: "Pogonion", index: 199 }
    ],
    idealMin: 115,
    idealMax: 121,
    unit: "deg",
    calculate: (pts) => {
      const v1 = { x: pts.condyle.x - pts.gonion.x, y: pts.condyle.y - pts.gonion.y };
      const v2 = { x: pts.pogonion.x - pts.gonion.x, y: pts.pogonion.y - pts.gonion.y };
      const rad = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
      let deg = Math.abs((rad * 180) / Math.PI);
      if (deg > 180) deg = 360 - deg;
      return deg;
    }
  },

  // ==========================================
  // 3. EYES & ORBITAL REGION
  // ==========================================
  {
    id: "eyeCanthalRatio",
    name: "One Eye Apart Ratio",
    category: "Eyes",
    photo: "front",
    description: "Intercanthal distance divided by average width of a single eye.",
    pointsNeeded: [
      { id: "lInner", label: "Left Inner Corner", index: 133 },
      { id: "lOuter", label: "Left Outer Corner", index: 33 },
      { id: "rInner", label: "Right Inner Corner", index: 362 }
    ],
    idealMin: 1.05,
    idealMax: 1.10,
    unit: "ratio",
    calculate: (pts) => {
      const eyeW = Math.hypot(pts.lInner.x - pts.lOuter.x, pts.lInner.y - pts.lOuter.y);
      const inter = Math.hypot(pts.rInner.x - pts.lInner.x, pts.rInner.y - pts.lInner.y);
      return inter / (eyeW || 1);
    }
  },
  {
    id: "eyeAspectRatio",
    name: "Eye Aspect Ratio",
    category: "Eyes",
    photo: "front",
    description: "Width of left eye relative to its height.",
    pointsNeeded: [
      { id: "lInner", label: "Left Inner Corner", index: 133 },
      { id: "lOuter", label: "Left Outer Corner", index: 33 },
      { id: "lTop", label: "Left Upper Lid", index: 159 },
      { id: "lBottom", label: "Left Lower Lid", index: 145 }
    ],
    idealMin: 3.00,
    idealMax: 3.50,
    unit: "ratio",
    calculate: (pts) => {
      const eyeW = Math.hypot(pts.lOuter.x - pts.lInner.x, pts.lOuter.y - pts.lInner.y);
      const eyeH = Math.hypot(pts.lBottom.x - pts.lTop.x, pts.lBottom.y - pts.lTop.y);
      return eyeW / (eyeH || 1);
    }
  },
  {
    id: "canthalTilt",
    name: "Lateral Canthal Tilt",
    category: "Eyes",
    photo: "front",
    description: "Elevation angle of outer eye corners relative to inner corners.",
    pointsNeeded: [
      { id: "lInner", label: "Left Inner Canthus", index: 133 },
      { id: "lOuter", label: "Left Outer Canthus", index: 33 }
    ],
    idealMin: 6.0,
    idealMax: 7.7,
    unit: "deg",
    calculate: (pts) => {
      const dx = pts.lOuter.x - pts.lInner.x;
      const dy = -(pts.lOuter.y - pts.lInner.y);
      return (Math.atan2(dy, dx) * 180) / Math.PI;
    }
  },

  // ==========================================
  // 4. NASAL COMPLEX
  // ==========================================
  {
    id: "noseToFaceWidth",
    name: "Nose Width / Face Width",
    category: "Nose",
    photo: "front",
    description: "Alar width relative to bizygomatic cheekbone width.",
    pointsNeeded: [
      { id: "lAlar", label: "Left Alar", index: 129 },
      { id: "rAlar", label: "Right Alar", index: 358 },
      { id: "lCheek", label: "Left Zygoma", index: 234 },
      { id: "rCheek", label: "Right Zygoma", index: 454 }
    ],
    idealMin: 0.25,
    idealMax: 0.27,
    unit: "ratio",
    calculate: (pts) => {
      const noseW = Math.hypot(pts.rAlar.x - pts.lAlar.x, pts.rAlar.y - pts.lAlar.y);
      const cheekW = Math.hypot(pts.rCheek.x - pts.lCheek.x, pts.rCheek.y - pts.lCheek.y);
      return noseW / (cheekW || 1);
    }
  },
  {
    id: "nasolabialAngle",
    name: "Nasolabial Angle",
    category: "Nose",
    photo: "profile",
    description: "Angle between nasal columella and upper lip vector.",
    pointsNeeded: [
      { id: "pronasale", label: "Nose Tip", index: 4 },
      { id: "subnasale", label: "Subnasale", index: 2 },
      { id: "labraleSup", label: "Upper Lip Apex", index: 0 }
    ],
    idealMin: 95.0,
    idealMax: 105.0,
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

  // ==========================================
  // 5. MOUTH & LIPS
  // ==========================================
  {
    id: "mouthToNoseWidth",
    name: "Mouth Width / Nose Width",
    category: "Mouth",
    photo: "front",
    description: "Width between mouth corners relative to alar width.",
    pointsNeeded: [
      { id: "lCorner", label: "Left Mouth Corner", index: 61 },
      { id: "rCorner", label: "Right Mouth Corner", index: 291 },
      { id: "lAlar", label: "Left Alar", index: 129 },
      { id: "rAlar", label: "Right Alar", index: 358 }
    ],
    idealMin: 1.42,
    idealMax: 1.50,
    unit: "ratio",
    calculate: (pts) => {
      const mouthW = Math.hypot(pts.rCorner.x - pts.lCorner.x, pts.rCorner.y - pts.lCorner.y);
      const noseW = Math.hypot(pts.rAlar.x - pts.lAlar.x, pts.rAlar.y - pts.lAlar.y);
      return mouthW / (noseW || 1);
    }
  },
  {
    id: "lipRatio",
    name: "Lower Lip / Upper Lip Ratio",
    category: "Mouth",
    photo: "front",
    description: "Vertical height of lower lip relative to upper lip.",
    pointsNeeded: [
      { id: "uTop", label: "Upper Lip Top", index: 0 },
      { id: "uBottom", label: "Upper Lip Bottom", index: 13 },
      { id: "lTop", label: "Lower Lip Top", index: 14 },
      { id: "lBottom", label: "Lower Lip Bottom", index: 17 }
    ],
    idealMin: 1.55,
    idealMax: 1.85,
    unit: "ratio",
    calculate: (pts) => {
      const upperH = Math.hypot(pts.uBottom.x - pts.uTop.x, pts.uBottom.y - pts.uTop.y);
      const lowerH = Math.hypot(pts.lBottom.x - pts.lTop.x, pts.lBottom.y - pts.lTop.y);
      return lowerH / (upperH || 1);
    }
  },
  {
    id: "chinPhiltrumRatio",
    name: "Chin / Philtrum Ratio",
    category: "Mouth",
    photo: "front",
    description: "Height of chin (Subnasale-to-Menton) relative to philtrum length.",
    pointsNeeded: [
      { id: "subnasale", label: "Subnasale", index: 2 },
      { id: "lipApex", label: "Upper Lip Apex", index: 0 },
      { id: "chin", label: "Menton", index: 152 }
    ],
    idealMin: 2.15,
    idealMax: 2.45,
    unit: "ratio",
    calculate: (pts) => {
      const philtrumH = Math.hypot(pts.lipApex.x - pts.subnasale.x, pts.lipApex.y - pts.subnasale.y);
      const chinH = Math.hypot(pts.chin.x - pts.subnasale.x, pts.chin.y - pts.subnasale.y);
      return chinH / (philtrumH || 1);
    }
  },

  // ==========================================
  // 6. PROFILE ANGLES & SAGITTAL PROJECTIONS
  // ==========================================
  {
    id: "facialConvexityGlabella",
    name: "Facial Convexity (Glabella)",
    category: "Profile",
    photo: "profile",
    description: "Profile angle from Glabella to Subnasale to Pogonion.",
    pointsNeeded: [
      { id: "glabella", label: "Glabella", index: 9 },
      { id: "subnasale", label: "Subnasale", index: 2 },
      { id: "pogonion", label: "Pogonion", index: 199 }
    ],
    idealMin: 170.0,
    idealMax: 175.0,
    unit: "deg",
    calculate: (pts) => {
      const v1 = { x: pts.glabella.x - pts.subnasale.x, y: pts.glabella.y - pts.subnasale.y };
      const v2 = { x: pts.pogonion.x - pts.subnasale.x, y: pts.pogonion.y - pts.subnasale.y };
      const rad = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
      let deg = Math.abs((rad * 180) / Math.PI);
      if (deg > 180) deg = 360 - deg;
      return deg;
    }
  },
  {
    id: "nasofrontalAngle",
    name: "Nasofrontal Angle",
    category: "Profile",
    photo: "profile",
    description: "Angle formed between forehead slope and nasal bridge.",
    pointsNeeded: [
      { id: "glabella", label: "Glabella", index: 9 },
      { id: "nasion", label: "Nose Bridge", index: 6 },
      { id: "pronasale", label: "Nose Tip", index: 4 }
    ],
    idealMin: 116.0,
    idealMax: 128.0,
    unit: "deg",
    calculate: (pts) => {
      const v1 = { x: pts.glabella.x - pts.nasion.x, y: pts.glabella.y - pts.nasion.y };
      const v2 = { x: pts.pronasale.x - pts.nasion.x, y: pts.pronasale.y - pts.nasion.y };
      const rad = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
      let deg = Math.abs((rad * 180) / Math.PI);
      if (deg > 180) deg = 360 - deg;
      return deg;
    }
  },

  // ==========================================
  // 7. CEPHALOMETRICS & CERVICAL ANGLES
  // ==========================================
  {
    id: "mentolabialAngle",
    name: "Mentolabial Angle",
    category: "Profile",
    photo: "profile",
    description: "Angle formed between lower lip contour and chin.",
    pointsNeeded: [
      { id: "labraleInf", label: "Lower Lip Apex", index: 17 },
      { id: "supramentale", label: "Supramentale", index: 18 },
      { id: "pogonion", label: "Pogonion", index: 199 }
    ],
    idealMin: 111.0,
    idealMax: 127.0,
    unit: "deg",
    calculate: (pts) => {
      const v1 = { x: pts.labraleInf.x - pts.supramentale.x, y: pts.labraleInf.y - pts.supramentale.y };
      const v2 = { x: pts.pogonion.x - pts.supramentale.x, y: pts.pogonion.y - pts.supramentale.y };
      const rad = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
      let deg = Math.abs((rad * 180) / Math.PI);
      if (deg > 180) deg = 360 - deg;
      return deg;
    }
  },

  // ==========================================
  // 8. SYMMETRY & MIDLINE ALIGNMENT
  // ==========================================
  {
    id: "facialMidlineDeviation",
    name: "Facial Midline Deviation",
    category: "Symmetry",
    photo: "front",
    description: "Horizontal deviation angle between nose tip and chin relative to central line.",
    pointsNeeded: [
      { id: "nasion", label: "Nose Bridge", index: 6 },
      { id: "pronasale", label: "Nose Tip", index: 4 },
      { id: "pogonion", label: "Pogonion", index: 199 }
    ],
    idealMin: 0.0,
    idealMax: 2.0,
    unit: "deg",
    calculate: (pts) => {
      const v1 = { x: pts.pronasale.x - pts.nasion.x, y: pts.pronasale.y - pts.nasion.y };
      const v2 = { x: pts.pogonion.x - pts.nasion.x, y: pts.pogonion.y - pts.nasion.y };
      const rad = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
      return Math.abs((rad * 180) / Math.PI);
    }
  }
];
