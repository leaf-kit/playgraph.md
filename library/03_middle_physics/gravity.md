---
id: "gravity"
title: { kr: "중력", en: "Gravity" }
difficulty: "Middle-1"
connections: ["force-motion", "projectile-motion"]
---

# 중력 / Gravity

지구가 물체를 끌어당기는 힘입니다.

The force that pulls objects toward the center of the Earth.

$$F = mg, \; g \approx 9.8\,m/s^2$$

```math-anim
type: gravity
params:
  mass: { default: 1, min: 0.1, max: 10, step: 0.1, label: { kr: "질량 (kg)", en: "Mass (kg)" } }
  height: { default: 10, min: 1, max: 50, step: 1, label: { kr: "높이 (m)", en: "Height (m)" } }
  showFall: { default: true, label: { kr: "낙하 보기", en: "Show Fall" } }
```

## 실생활 활용

- **자유 낙하**
- **체중 측정**
- **행성별 중력 차이**

