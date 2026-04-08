---
id: "binary-search"
title: { kr: "이진 탐색", en: "Binary Search" }
difficulty: "High-1"
connections: ["array", "binary-search-tree"]
---

# 이진 탐색 / Binary Search

정렬된 배열에서 반씩 줄여가며 원하는 값을 찾는 알고리즘입니다.

Efficiently find a value in a sorted array by halving the search space.

```math-anim
type: binary-search
params:
  size: { default: 15, min: 5, max: 20, step: 1, label: { kr: "배열 크기", en: "Array Size" } }
  target: { default: 7, min: 1, max: 20, step: 1, label: { kr: "탐색 값", en: "Target" } }
  showRange: { default: true, label: { kr: "범위 보기", en: "Show Range" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **사전에서 단어 찾기**
- **도서관 책 분류 검색**
- **게임 랭킹 검색**

## 핵심 정리

> 시간 복잡도: O(log n)

