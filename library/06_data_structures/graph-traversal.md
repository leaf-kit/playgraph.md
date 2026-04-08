---
id: "graph-traversal"
title: { kr: "그래프 탐색", en: "Graph Traversal" }
difficulty: "High-3"
connections: ["bfs-dfs", "queue", "stack"]
---

# 그래프 탐색 / Graph Traversal

그래프의 모든 정점을 체계적으로 방문하는 방법입니다.

Systematically visiting all vertices in a graph.

```math-anim
type: graph-traversal
params:
  nodes: { default: 7, min: 4, max: 12, step: 1, label: { kr: "정점 수", en: "Nodes" } }
  edges: { default: 10, min: 4, max: 20, step: 1, label: { kr: "간선 수", en: "Edges" } }
  showVisited: { default: true, label: { kr: "방문 표시", en: "Show Visited" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **소셜 네트워크 분석**
- **지도 내비게이션**
- **웹 크롤링**

## 핵심 정리

> BFS: O(V+E), DFS: O(V+E)

