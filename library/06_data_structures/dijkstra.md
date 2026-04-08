---
id: "dijkstra"
title: { kr: "다익스트라 알고리즘", en: "Dijkstra's Algorithm" }
difficulty: "High-3"
connections: ["graph-traversal", "heap", "bfs-dfs"]
---

# 다익스트라 알고리즘 / Dijkstra's Algorithm

가중 그래프에서 한 정점으로부터 다른 모든 정점까지의 최단 경로를 구하는 알고리즘입니다.

An algorithm for finding the shortest path from a source vertex to all other vertices in a weighted graph.

```math-anim
type: dijkstra
params:
  nodes: { default: 6, min: 4, max: 10, step: 1, label: { kr: "노드 수", en: "Nodes" } }
  startNode: { default: 0, min: 0, max: 9, step: 1, label: { kr: "시작 노드", en: "Start Node" } }
  showDistances: { default: true, label: { kr: "거리 표시", en: "Show Distances" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **지도 내비게이션 (최단 경로)**
- **네트워크 라우팅 프로토콜**
- **게임 AI 경로 탐색**

## 핵심 정리

> 우선순위 큐(힙) 사용 시 O((V+E) log V). 음수 가중치에는 사용 불가.

