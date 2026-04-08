---
id: "logarithm"
title: { kr: "로그", en: "Logarithm" }
difficulty: "High-1"
connections: ["exponential-function", "exponents"]
---

# 로그 / Logarithm

거듭제곱의 역연산으로, 지수를 구하는 연산입니다.

The inverse operation of exponentiation.

$$\log_a x = y \;\Leftrightarrow\; a^y = x$$

```math-anim
type: logarithm
params:
  base: { default: 2, min: 1.5, max: 10, step: 0.5, label: { kr: "밑", en: "Base" } }
  maxX: { default: 16, min: 2, max: 50, step: 1, label: { kr: "x 범위", en: "x Range" } }
  showInverse: { default: true, label: { kr: "역함수 보기", en: "Show Inverse" } }
```

## 실생활 활용

- **지진 규모 (리히터)**
- **소리 크기 (데시벨)**
- **pH 척도**

