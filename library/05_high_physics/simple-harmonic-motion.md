---
id: "simple-harmonic-motion"
title: { kr: "단진동", en: "Simple Harmonic Motion" }
difficulty: "High-2"
connections: ["sine-wave", "pendulum"]
---

# 단진동 / Simple Harmonic Motion

평형점을 중심으로 주기적으로 왕복하는 운동입니다.

Periodic back-and-forth motion around an equilibrium position.

$$x(t) = A\cos(\omega t + \phi)$$

```math-anim
type: simple-harmonic-motion
params:
  amplitude: { default: 2, min: 0.5, max: 4, step: 0.5, label: { kr: "진폭 (m)", en: "Amplitude (m)" } }
  omega: { default: 2, min: 0.5, max: 5, step: 0.5, label: { kr: "각진동수 ω", en: "Angular freq ω" } }
  showGraph: { default: true, label: { kr: "그래프 보기", en: "Show Graph" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **스프링 진동**
- **음파 생성**
- **진자 시계**

