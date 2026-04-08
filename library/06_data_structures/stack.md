---
id: "stack"
title: { kr: "스택", en: "Stack" }
difficulty: "High-1"
connections: ["linked-list", "recursion"]
---

# 스택 / Stack

후입선출(LIFO) 원칙을 따르는 자료구조입니다.

A Last-In-First-Out (LIFO) data structure.

```math-anim
type: stack
params:
  maxSize: { default: 6, min: 3, max: 10, step: 1, label: { kr: "최대 크기", en: "Max Size" } }
  pushValue: { default: 42, min: 0, max: 99, step: 1, label: { kr: "Push 값", en: "Push Value" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **실행 취소(Undo)**
- **괄호 짝 맞추기**
- **함수 호출 스택**

## 핵심 정리

> Push/Pop O(1)

