---
id: "integrals"
title: { kr: "적분", en: "Integrals" }
difficulty: "High-2"
connections: ["derivatives", "area-rectangle"]
---

# 적분 / Integrals

함수의 그래프와 x축 사이의 넓이를 구하는 연산입니다.

Finding the area under a curve between two points.

$$\int_a^b f(x)\,dx$$

```math-anim
type: integrals
params:
  power: { default: 2, min: 1, max: 3, step: 1, label: { kr: "차수 n", en: "Power n" } }
  rangeA: { default: 0, min: -3, max: 3, step: 0.5, label: { kr: "하한 a", en: "Lower a" } }
  rangeB: { default: 2, min: -3, max: 3, step: 0.5, label: { kr: "상한 b", en: "Upper b" } }
  showRiemann: { default: true, label: { kr: "리만 합 보기", en: "Show Riemann Sum" } }
```

## 실생활 활용

- **면적 계산**
- **이동 거리 계산**
- **부피 계산**

