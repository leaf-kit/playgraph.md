---
id: "probability-basic"
title: { kr: "확률 기초", en: "Basic Probability" }
difficulty: "Middle-2"
connections: ["statistics-mean"]
---

# 확률 기초 / Basic Probability

어떤 사건이 일어날 가능성을 수로 나타낸 것입니다.

The numerical measure of the likelihood of an event occurring.

$$P(A) = \frac{n(A)}{n(S)}$$

```math-anim
type: probability-basic
params:
  favorable: { default: 3, min: 1, max: 12, step: 1, label: { kr: "유리한 경우", en: "Favorable" } }
  total: { default: 6, min: 2, max: 12, step: 1, label: { kr: "전체 경우", en: "Total" } }
  showDice: { default: true, label: { kr: "주사위 보기", en: "Show Dice" } }
```

## 실생활 활용

- **동전 던지기**
- **주사위 게임**
- **날씨 예보 확률**

