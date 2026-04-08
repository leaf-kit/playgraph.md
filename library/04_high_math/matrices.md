---
id: "matrices"
title: { kr: "행렬", en: "Matrices" }
difficulty: "High-2"
connections: ["vectors", "linear-equation"]
---

# 행렬 / Matrices

수를 직사각형 형태로 배열한 것으로, 연립방정식과 변환에 쓰입니다.

Rectangular arrays of numbers used for transformations and solving systems.

$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$

```math-anim
type: matrices
params:
  a: { default: 2, min: -5, max: 5, step: 1, label: { kr: "a", en: "a" } }
  b: { default: 1, min: -5, max: 5, step: 1, label: { kr: "b", en: "b" } }
  c: { default: 0, min: -5, max: 5, step: 1, label: { kr: "c", en: "c" } }
  d_: { default: 2, min: -5, max: 5, step: 1, label: { kr: "d", en: "d" } }
  showTransform: { default: true, label: { kr: "변환 보기", en: "Show Transform" } }
```

## 실생활 활용

- **3D 그래픽 변환**
- **암호 해독**
- **경제 모델**

