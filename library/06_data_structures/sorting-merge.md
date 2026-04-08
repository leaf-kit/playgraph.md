---
id: "sorting-merge"
title: { kr: "병합 정렬", en: "Merge Sort" }
difficulty: "High-2"
connections: ["sorting-quick", "recursion"]
---

# 병합 정렬 / Merge Sort

배열을 반으로 나누고, 정렬한 후 합치는 분할 정복 알고리즘입니다.

Divide the array, sort halves, and merge them back.

```math-anim
type: sorting-merge
params:
  size: { default: 8, min: 4, max: 15, step: 1, label: { kr: "배열 크기", en: "Array Size" } }
  speed: { default: 1, min: 0.5, max: 3, step: 0.5, label: { kr: "속도", en: "Speed" } }
  showSplit: { default: true, label: { kr: "분할 보기", en: "Show Split" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **외부 정렬**
- **안정 정렬이 필요한 경우**

## 핵심 정리

> 항상 O(n log n), 공간 O(n)

