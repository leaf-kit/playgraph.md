---
id: "differential-equations"
title: { kr: "미분방정식", en: "Differential Equations" }
difficulty: "High-3"
connections: ["derivatives", "integrals"]
---

# 미분방정식 / Differential Equations

미지 함수와 그 도함수 사이의 관계를 나타내는 방정식입니다.

Equations involving a function and its derivatives.

$$\frac{dy}{dx} = f(x, y)$$

```math-anim
type: differential-equations
params:
  k: { default: 0.5, min: 0.1, max: 2, step: 0.1, label: { kr: "계수 k", en: "Coefficient k" } }
  y0: { default: 1, min: 0.1, max: 5, step: 0.1, label: { kr: "초기값 y₀", en: "Initial y₀" } }
  showField: { default: true, label: { kr: "방향장 보기", en: "Show Direction Field" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **인구 성장 모델**
- **방사성 붕괴**
- **스프링 진동**

