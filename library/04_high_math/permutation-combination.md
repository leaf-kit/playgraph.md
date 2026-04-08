---
id: "permutation-combination"
title: { kr: "순열과 조합", en: "Permutation & Combination" }
difficulty: "High-1"
connections: ["probability-basic", "factoring"]
---

# 순열과 조합 / Permutation & Combination

서로 다른 n개에서 r개를 뽑는 경우의 수입니다.

Counting arrangements and selections from a set.

$$_nP_r = \frac{n!}{(n-r)!}, \; _nC_r = \frac{n!}{r!(n-r)!}$$

```math-anim
type: permutation-combination
params:
  n: { default: 5, min: 2, max: 10, step: 1, label: { kr: "전체 n", en: "Total n" } }
  r: { default: 3, min: 1, max: 8, step: 1, label: { kr: "선택 r", en: "Choose r" } }
  showPermutation: { default: true, label: { kr: "순열 보기", en: "Show Permutation" } }
```

## 실생활 활용

- **비밀번호 가짓수**
- **로또 당첨 확률**
- **대진표 편성**

