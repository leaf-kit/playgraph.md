---
id: "derivatives"
title: { kr: "미분", en: "Derivatives" }
difficulty: "High-2"
connections: ["limits", "integrals"]
---

# 미분 / Derivatives

함수의 순간 변화율을 구하는 연산입니다.

The instantaneous rate of change of a function.

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

```math-anim
type: derivatives
params:
  power: { default: 2, min: 1, max: 4, step: 1, label: { kr: "차수 n", en: "Power n" } }
  xPos: { default: 1, min: -3, max: 3, step: 0.1, label: { kr: "x 위치", en: "x Position" } }
  showTangent: { default: true, label: { kr: "접선 보기", en: "Show Tangent" } }
```

## 실생활 활용

- **속도 = 위치의 미분**
- **가속도 = 속도의 미분**
- **최대/최소값 구하기**

