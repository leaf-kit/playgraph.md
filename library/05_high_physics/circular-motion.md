---
id: "circular-motion"
title: { kr: "원운동", en: "Circular Motion" }
difficulty: "High-1"
connections: ["force-motion", "unit-circle"]
---

# 원운동 / Circular Motion

물체가 원형 경로를 따라 일정한 속력으로 회전하는 운동입니다.

Motion of an object along a circular path.

$$a_c = \frac{v^2}{r}$$

```math-anim
type: circular-motion
params:
  radius: { default: 3, min: 1, max: 6, step: 0.5, label: { kr: "반지름 (m)", en: "Radius (m)" } }
  speed: { default: 2, min: 0.5, max: 5, step: 0.5, label: { kr: "속력 (m/s)", en: "Speed (m/s)" } }
  showVectors: { default: true, label: { kr: "벡터 표시", en: "Show Vectors" } }
```

## 실생활 활용

- **놀이공원 회전 놀이기구**
- **인공위성 궤도**
- **세탁기 탈수**

