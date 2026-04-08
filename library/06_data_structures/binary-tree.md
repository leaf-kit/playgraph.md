---
id: "binary-tree"
title: { kr: "이진 트리", en: "Binary Tree" }
difficulty: "High-2"
connections: ["binary-search-tree", "heap"]
---

# 이진 트리 / Binary Tree

각 노드가 최대 두 개의 자식 노드를 가지는 트리 자료구조입니다.

A tree where each node has at most two children.

```math-anim
type: binary-tree
params:
  depth: { default: 3, min: 2, max: 5, step: 1, label: { kr: "깊이", en: "Depth" } }
  showValues: { default: true, label: { kr: "값 표시", en: "Show Values" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **파일 시스템**
- **조직도**
- **의사 결정 트리**

## 핵심 정리

> 높이 h일 때 최대 노드 수: 2^(h+1) - 1

