---
id: "sorting-bubble"
title: { kr: "버블 정렬", en: "Bubble Sort" }
difficulty: "High-1"
connections: ["sorting-quick", "sorting-merge", "array"]
---

# 버블 정렬 / Bubble Sort

인접한 두 원소를 비교하여 교환하며 정렬하는 알고리즘입니다.

Sort by repeatedly swapping adjacent elements that are out of order.

```math-anim
type: sorting-bubble
params:
  size: { default: 8, min: 4, max: 15, step: 1, label: { kr: "배열 크기", en: "Array Size" } }
  speed: { default: 1, min: 0.5, max: 3, step: 0.5, label: { kr: "속도", en: "Speed" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **간단한 정렬이 필요한 소규모 데이터**
- **교육용 정렬 시각화**

## 핵심 정리

> 시간 복잡도: O(n²)

