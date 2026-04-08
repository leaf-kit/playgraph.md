---
id: "vectors"
title: { kr: "벡터", en: "Vectors" }
difficulty: "High-1"
connections: ["coordinate-plane", "matrices"]
---

# 벡터 / Vectors

크기와 방향을 모두 가진 양으로, 화살표로 나타냅니다.

A quantity with both magnitude and direction.

$$\vec{v} = (v_x, v_y)$$

```math-anim
type: vectors
params:
  vx: { default: 3, min: -5, max: 5, step: 0.5, label: { kr: "x 성분", en: "x component" } }
  vy: { default: 4, min: -5, max: 5, step: 0.5, label: { kr: "y 성분", en: "y component" } }
  showMagnitude: { default: true, label: { kr: "크기 표시", en: "Show Magnitude" } }
  showAngle: { default: true, label: { kr: "각도 표시", en: "Show Angle" } }
```

## 실생활 활용

- **바람 방향과 세기**
- **물체 운동 방향**
- **항공기 항로**

