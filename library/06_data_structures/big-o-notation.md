---
id: "big-o-notation"
title: { kr: "빅오 표기법", en: "Big-O Notation" }
difficulty: "High-1"
connections: ["sorting-bubble", "sorting-quick", "binary-search"]
---

# 빅오 표기법 / Big-O Notation

알고리즘의 시간 복잡도를 나타내는 표기법입니다.

A notation describing the upper bound of an algorithm's time complexity.

```math-anim
type: big-o-notation
params:
  inputSize: { default: 20, min: 5, max: 50, step: 5, label: { kr: "입력 크기 n", en: "Input Size n" } }
  showAll: { default: true, label: { kr: "모든 복잡도", en: "Show All" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **알고리즘 성능 비교**
- **시스템 설계 시 선택 기준**
- **면접 준비**

## 핵심 정리

> O(1) < O(log n) < O(n) < O(n log n) < O(n²)

