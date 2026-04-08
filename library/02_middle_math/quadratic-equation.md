---
id: "quadratic-equation"
title: { kr: "이차방정식", en: "Quadratic Equation" }
difficulty: "Middle-3"
connections: ["quadratic-function", "square-root"]
---

# 이차방정식 / Quadratic Equation

미지수의 최고 차수가 2인 방정식으로, 근의 공식으로 풀 수 있습니다.

An equation with the variable raised to the second power.

$$ax^2 + bx + c = 0$$

```math-anim
type: quadratic-equation
params:
  a: { default: 1, min: -3, max: 3, step: 0.5, label: { kr: "계수 a", en: "Coefficient a" } }
  b: { default: -3, min: -6, max: 6, step: 0.5, label: { kr: "계수 b", en: "Coefficient b" } }
  c: { default: 2, min: -6, max: 6, step: 0.5, label: { kr: "상수 c", en: "Constant c" } }
  showRoots: { default: true, label: { kr: "근 표시", en: "Show Roots" } }
```

## 실생활 활용

- **포물선 궤적**
- **면적 최적화**
- **이윤 최대화**

