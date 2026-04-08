---
id: "momentum"
title: { kr: "운동량", en: "Momentum" }
difficulty: "High-1"
connections: ["newtons-laws", "force-motion"]
---

# 운동량 / Momentum

물체의 질량과 속도의 곱으로, 운동의 양을 나타냅니다.

The product of mass and velocity, measuring the quantity of motion.

$$p = mv, \; \Delta p = F\Delta t$$

```math-anim
type: momentum
params:
  mass1: { default: 2, min: 0.5, max: 10, step: 0.5, label: { kr: "질량 1 (kg)", en: "Mass 1 (kg)" } }
  vel1: { default: 5, min: -10, max: 10, step: 1, label: { kr: "속도 1 (m/s)", en: "Velocity 1" } }
  mass2: { default: 3, min: 0.5, max: 10, step: 0.5, label: { kr: "질량 2 (kg)", en: "Mass 2 (kg)" } }
  showCollision: { default: true, label: { kr: "충돌 보기", en: "Show Collision" } }
```

## 실생활 활용

- **당구공 충돌**
- **교통사고 분석**
- **로켓 추진**

