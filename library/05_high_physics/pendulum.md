---
id: "pendulum"
title: { kr: "진자 운동", en: "Pendulum Motion" }
difficulty: "High-1"
connections: ["simple-harmonic-motion", "gravity"]
---

# 진자 운동 / Pendulum Motion

추가 실에 매달려 좌우로 왕복하는 운동입니다.

The swinging motion of a weight on a string.

$$T = 2\pi\sqrt{\frac{L}{g}}$$

```math-anim
type: pendulum
params:
  length: { default: 2, min: 0.5, max: 5, step: 0.5, label: { kr: "줄 길이 (m)", en: "Length (m)" } }
  angle0: { default: 30, min: 5, max: 60, step: 5, label: { kr: "초기 각도 (°)", en: "Initial Angle (°)" } }
  showTrail: { default: true, label: { kr: "궤적 보기", en: "Show Trail" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **진자 시계**
- **그네**
- **메트로놈**

