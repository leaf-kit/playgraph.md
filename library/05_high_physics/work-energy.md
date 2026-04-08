---
id: "work-energy"
title: { kr: "일과 에너지", en: "Work & Energy" }
difficulty: "High-1"
connections: ["energy-conservation", "force-motion"]
---

# 일과 에너지 / Work & Energy

힘이 물체를 이동시킬 때 한 일의 양입니다.

The energy transferred when a force moves an object.

$$W = F \cdot d \cdot \cos\theta$$

```math-anim
type: work-energy
params:
  force: { default: 20, min: 1, max: 50, step: 1, label: { kr: "힘 (N)", en: "Force (N)" } }
  distance: { default: 5, min: 1, max: 20, step: 1, label: { kr: "거리 (m)", en: "Distance (m)" } }
  angle: { default: 0, min: 0, max: 90, step: 5, label: { kr: "각도 (°)", en: "Angle (°)" } }
  showEnergy: { default: true, label: { kr: "에너지 막대", en: "Energy Bar" } }
```

## 실생활 활용

- **물건 밀기**
- **계단 올라가기**
- **기중기 작업**

