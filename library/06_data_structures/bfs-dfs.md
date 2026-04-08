---
id: "bfs-dfs"
title: { kr: "BFS와 DFS", en: "BFS & DFS" }
difficulty: "High-2"
connections: ["graph-traversal", "queue", "stack"]
---

# BFS와 DFS / BFS & DFS

그래프를 탐색하는 두 가지 대표적인 방법입니다.

Two fundamental approaches for traversing a graph.

BFS (너비 우선 탐색): 가까운 노드부터 레벨별로 탐색
DFS (깊이 우선 탐색): 한 방향으로 끝까지 탐색 후 되돌아옴

```math-anim
type: bfs-dfs
params:
  nodes: { default: 8, min: 4, max: 12, step: 1, label: { kr: "노드 수", en: "Nodes" } }
  startNode: { default: 0, min: 0, max: 11, step: 1, label: { kr: "시작 노드", en: "Start Node" } }
  useBFS: { default: true, label: { kr: "BFS 모드", en: "BFS Mode" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **미로 탐색**
- **소셜 네트워크 친구 추천 (BFS)**
- **퍼즐 풀이 (DFS)**

## 핵심 정리

> BFS: 큐 사용, 최단 경로 보장. DFS: 스택/재귀 사용, 메모리 효율적.

