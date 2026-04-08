---
id: "linked-list"
title: { kr: "연결 리스트", en: "Linked List" }
difficulty: "High-1"
connections: ["array", "stack", "queue"]
---

# 연결 리스트 / Linked List

각 노드가 데이터와 다음 노드의 포인터를 가진 자료구조입니다.

A sequence of nodes where each node points to the next.

```math-anim
type: linked-list
params:
  nodes: { default: 5, min: 2, max: 10, step: 1, label: { kr: "노드 수", en: "Nodes" } }
  insertPos: { default: 2, min: 0, max: 9, step: 1, label: { kr: "삽입 위치", en: "Insert Position" } }
  showPointers: { default: true, label: { kr: "포인터 보기", en: "Show Pointers" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **음악 재생목록**
- **브라우저 방문 기록**
- **다항식 표현**

## 핵심 정리

> 삽입/삭제 O(1), 접근 O(n)

