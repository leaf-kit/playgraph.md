---
id: "heap"
title: { kr: "힙", en: "Heap" }
difficulty: "High-2"
connections: ["binary-tree", "sorting-quick"]
---

# 힙 / Heap

부모 노드가 항상 자식 노드보다 크거나(최대힙) 작은(최소힙) 완전 이진 트리입니다.

A complete binary tree where parent >= children (max-heap) or parent <= children (min-heap).

```math-anim
type: heap
params:
  size: { default: 7, min: 3, max: 12, step: 1, label: { kr: "크기", en: "Size" } }
  isMaxHeap: { default: true, label: { kr: "최대 힙", en: "Max Heap" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **우선순위 큐**
- **운영체제 작업 스케줄링**
- **다익스트라 알고리즘**

## 핵심 정리

> 삽입/삭제 O(log n), 최대/최소 접근 O(1)

