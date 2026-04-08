---
id: "trie"
title: { kr: "트라이", en: "Trie" }
difficulty: "High-3"
connections: ["hash-table", "binary-search-tree"]
---

# 트라이 / Trie

문자열을 효율적으로 저장하고 검색하기 위한 트리 기반 자료구조입니다.

A tree-based data structure for efficiently storing and searching strings.

```math-anim
type: trie
params:
  wordCount: { default: 4, min: 2, max: 8, step: 1, label: { kr: "단어 수", en: "Words" } }
  searchDepth: { default: 3, min: 1, max: 6, step: 1, label: { kr: "검색 깊이", en: "Search Depth" } }
  showPrefix: { default: true, label: { kr: "접두사 표시", en: "Show Prefix" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **자동 완성 기능**
- **스펠링 체크**
- **IP 라우팅 테이블**

## 핵심 정리

> 검색/삽입 O(m), m은 문자열 길이. 접두사 검색에 최적화.

