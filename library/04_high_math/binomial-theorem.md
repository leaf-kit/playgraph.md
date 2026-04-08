---
id: "binomial-theorem"
title: { kr: "이항정리", en: "Binomial Theorem" }
difficulty: "High-2"
connections: ["permutation-combination", "exponents"]
---

# 이항정리 / Binomial Theorem

두 항의 합의 거듭제곱을 전개하는 공식입니다.

A formula for expanding powers of a binomial expression.

$$(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k}b^k$$

```math-anim
type: binomial-theorem
params:
  n: { default: 4, min: 1, max: 8, step: 1, label: { kr: "지수 n", en: "Power n" } }
  a: { default: 1, min: 1, max: 3, step: 1, label: { kr: "항 a", en: "Term a" } }
  b: { default: 1, min: 1, max: 3, step: 1, label: { kr: "항 b", en: "Term b" } }
  showPascal: { default: true, label: { kr: "파스칼 삼각형", en: "Pascal's Triangle" } }
```

## 실생활 활용

- **확률 이항분포**
- **근사 계산**
- **조합 경우의 수**

