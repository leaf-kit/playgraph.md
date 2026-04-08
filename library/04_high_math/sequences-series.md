---
id: "sequences-series"
title: { kr: "수열", en: "Sequences & Series" }
difficulty: "High-1"
connections: ["patterns", "limits"]
---

# 수열 / Sequences & Series

일정한 규칙에 따라 나열된 수의 열입니다.

An ordered list of numbers following a specific pattern.

$$a_n = a_1 + (n-1)d$$

```math-anim
type: sequences-series
params:
  first: { default: 1, min: 0, max: 10, step: 1, label: { kr: "첫째항", en: "First term" } }
  diff: { default: 3, min: -5, max: 5, step: 1, label: { kr: "공차", en: "Common diff" } }
  terms: { default: 8, min: 3, max: 15, step: 1, label: { kr: "항의 수", en: "Terms" } }
  showSum: { default: true, label: { kr: "합 표시", en: "Show Sum" } }
```

## 실생활 활용

- **급여 인상 패턴**
- **좌석 배열**
- **적금 이자**

