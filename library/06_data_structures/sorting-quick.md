---
id: "sorting-quick"
title: { kr: "퀵 정렬", en: "Quick Sort" }
difficulty: "High-2"
connections: ["sorting-bubble", "sorting-merge", "recursion"]
---

# 퀵 정렬 / Quick Sort

피벗을 기준으로 작은 값과 큰 값을 분할하여 정렬하는 알고리즘입니다.

Divide and conquer sorting using a pivot element.

```math-anim
type: sorting-quick
params:
  size: { default: 10, min: 4, max: 15, step: 1, label: { kr: "배열 크기", en: "Array Size" } }
  speed: { default: 1, min: 0.5, max: 3, step: 0.5, label: { kr: "속도", en: "Speed" } }
  showPivot: { default: true, label: { kr: "피벗 표시", en: "Show Pivot" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **프로그래밍 언어 내장 정렬**
- **대규모 데이터 정렬**

## 핵심 정리

> 평균 O(n log n), 최악 O(n²)

