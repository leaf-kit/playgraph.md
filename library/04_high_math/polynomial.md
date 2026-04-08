---
id: "polynomial"
title: { kr: "다항함수", en: "Polynomial Function" }
difficulty: "High-1"
connections: ["quadratic-function", "derivatives"]
---

# 다항함수 / Polynomial Function

여러 항의 합으로 이루어진 함수입니다.

A function expressed as the sum of terms with variable powers.

$$f(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_0$$

```math-anim
type: polynomial
params:
  degree: { default: 3, min: 1, max: 5, step: 1, label: { kr: "차수", en: "Degree" } }
  a1: { default: 1, min: -3, max: 3, step: 0.5, label: { kr: "최고차 계수", en: "Leading coeff" } }
  showRoots: { default: true, label: { kr: "근 표시", en: "Show Roots" } }
```

## 실생활 활용

- **물리 궤적 모델링**
- **경제 비용 함수**
- **곡선 피팅**

