---
id: "binary-search-tree"
title: { kr: "이진 탐색 트리", en: "Binary Search Tree" }
difficulty: "High-2"
connections: ["binary-tree", "binary-search"]
---

# 이진 탐색 트리 / Binary Search Tree

왼쪽 자식은 부모보다 작고, 오른쪽 자식은 부모보다 큰 이진 트리입니다.

A binary tree where left < parent < right for all nodes.

```math-anim
type: binary-search-tree
params:
  nodeCount: { default: 7, min: 3, max: 12, step: 1, label: { kr: "노드 수", en: "Nodes" } }
  searchValue: { default: 5, min: 1, max: 20, step: 1, label: { kr: "탐색 값", en: "Search Value" } }
  showPath: { default: true, label: { kr: "경로 보기", en: "Show Path" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **사전 검색**
- **데이터베이스 인덱스**
- **자동 완성**

## 핵심 정리

> 평균 탐색 O(log n), 최악 O(n)

