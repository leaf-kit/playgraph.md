---
id: "pressure"
title: { kr: "압력", en: "Pressure" }
difficulty: "Middle-2"
connections: ["density", "buoyancy"]
---

# 압력 / Pressure

단위 면적에 가해지는 힘의 크기입니다.

The force applied per unit area.

$$P = \frac{F}{A}$$

```math-anim
type: pressure
params:
  force: { default: 100, min: 10, max: 500, step: 10, label: { kr: "힘 (N)", en: "Force (N)" } }
  area: { default: 10, min: 1, max: 50, step: 1, label: { kr: "면적 (cm²)", en: "Area (cm²)" } }
  showArrows: { default: true, label: { kr: "화살표 보기", en: "Show Arrows" } }
```

## 실생활 활용

- **못과 압정**
- **스키와 설피**
- **자동차 타이어**

