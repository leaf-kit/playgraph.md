---
id: "arithmetic-series"
title: { kr: "등차급수", en: "Arithmetic Series" }
difficulty: "High-1"
connections: ["sequences-series"]
---

# 등차급수 / Arithmetic Series

등차수열의 항들을 모두 더한 합입니다.

The sum of terms in an arithmetic sequence.

$$S_n = \frac{n(a_1 + a_n)}{2}$$

```math-anim
type: arithmetic-series
params:
  first: { default: 1, min: 0, max: 10, step: 1, label: { kr: "첫째항", en: "First term" } }
  diff: { default: 2, min: 1, max: 5, step: 1, label: { kr: "공차", en: "Common diff" } }
  n: { default: 10, min: 2, max: 20, step: 1, label: { kr: "항 수", en: "Terms" } }
  showStack: { default: true, label: { kr: "쌓기 보기", en: "Show Stack" } }
```

## 실생활 활용

- **가우스의 합 공식**
- **계단식 좌석**
- **적금 총액**

