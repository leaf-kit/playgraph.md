---
id: "recursion"
title: { kr: "재귀", en: "Recursion" }
difficulty: "High-2"
connections: ["stack", "binary-tree"]
---

# 재귀 / Recursion

함수가 자기 자신을 호출하여 문제를 해결하는 기법입니다.

A technique where a function calls itself to solve subproblems.

```math-anim
type: recursion
params:
  n: { default: 5, min: 1, max: 10, step: 1, label: { kr: "입력 n", en: "Input n" } }
  showStack: { default: true, label: { kr: "호출 스택 보기", en: "Show Call Stack" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **팩토리얼 계산**
- **피보나치 수열**
- **폴더 탐색**

## 핵심 정리

> 기저 조건(base case)이 반드시 필요

