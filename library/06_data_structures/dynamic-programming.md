---
id: "dynamic-programming"
title: { kr: "동적 프로그래밍", en: "Dynamic Programming" }
difficulty: "High-3"
connections: ["recursion", "big-o-notation"]
---

# 동적 프로그래밍 / Dynamic Programming

큰 문제를 작은 하위 문제로 나누고, 결과를 저장하여 중복 계산을 피하는 기법입니다.

A technique that solves complex problems by breaking them into overlapping subproblems and caching results.

```math-anim
type: dynamic-programming
params:
  n: { default: 7, min: 3, max: 15, step: 1, label: { kr: "입력 n", en: "Input n" } }
  showTable: { default: true, label: { kr: "테이블 보기", en: "Show Table" } }
  showTree: { default: true, label: { kr: "호출 트리", en: "Show Call Tree" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **최단 경로 알고리즘**
- **텍스트 차이 비교 (diff)**
- **자원 배분 최적화**

## 핵심 정리

> 메모이제이션(top-down) vs 타뷸레이션(bottom-up). 시간을 공간으로 교환.

