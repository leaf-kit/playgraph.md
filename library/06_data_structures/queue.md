---
id: "queue"
title: { kr: "큐", en: "Queue" }
difficulty: "High-1"
connections: ["linked-list", "bfs-dfs"]
---

# 큐 / Queue

선입선출(FIFO) 원칙을 따르는 자료구조입니다.

A First-In-First-Out (FIFO) data structure.

```math-anim
type: queue
params:
  maxSize: { default: 6, min: 3, max: 10, step: 1, label: { kr: "최대 크기", en: "Max Size" } }
  enqueueValue: { default: 7, min: 0, max: 99, step: 1, label: { kr: "Enqueue 값", en: "Enqueue Value" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **프린터 대기열**
- **콜센터 대기**
- **BFS 탐색**

## 핵심 정리

> Enqueue/Dequeue O(1)

