---
id: "geometric-series"
title: { kr: "등비급수", en: "Geometric Series" }
difficulty: "High-1"
connections: ["sequences-series", "exponential-function"]
---

# 등비급수 / Geometric Series

등비수열의 항들을 모두 더한 합입니다.

The sum of terms in a geometric sequence.

$$S_n = a_1 \cdot \frac{1 - r^n}{1 - r}$$

```math-anim
type: geometric-series
params:
  first: { default: 1, min: 0.5, max: 5, step: 0.5, label: { kr: "첫째항", en: "First term" } }
  ratio: { default: 0.5, min: 0.1, max: 2, step: 0.1, label: { kr: "공비", en: "Common ratio" } }
  n: { default: 8, min: 2, max: 15, step: 1, label: { kr: "항 수", en: "Terms" } }
  showBars: { default: true, label: { kr: "막대 보기", en: "Show Bars" } }
```

## 실생활 활용

- **반감기 계산**
- **프랙탈 도형**
- **무한등비급수의 합**

