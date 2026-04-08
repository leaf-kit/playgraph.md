---
id: "area-trapezoid"
title: { kr: "사다리꼴의 넓이", en: "Trapezoid Area" }
difficulty: "Elementary"
connections: ["area-rectangle", "area-triangle"]
---

# 사다리꼴의 넓이 / Trapezoid Area

사다리꼴의 넓이는 윗변과 아랫변의 합에 높이를 곱하고 2로 나눕니다.

The area of a trapezoid is half of the sum of parallel sides times height.

$$S = \frac{1}{2} \times (a + b) \times h$$

```math-anim
type: area-trapezoid
params:
  topBase: { default: 3, min: 1, max: 10, step: 0.5, label: { kr: "윗변", en: "Top Base" } }
  bottomBase: { default: 6, min: 1, max: 12, step: 0.5, label: { kr: "아랫변", en: "Bottom Base" } }
  height: { default: 4, min: 1, max: 10, step: 0.5, label: { kr: "높이", en: "Height" } }
  showDecompose: { default: true, label: { kr: "분해 보기", en: "Decompose" } }
```

## 실생활 활용

- **제방 단면**
- **다리 기둥**
- **사다리꼴 테이블**
