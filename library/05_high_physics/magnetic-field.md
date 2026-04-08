---
id: "magnetic-field"
title: { kr: "자기장", en: "Magnetic Field" }
difficulty: "High-2"
connections: ["electric-field", "electromagnetic-induction"]
---

# 자기장 / Magnetic Field

자석이나 전류 주위에 형성되는 힘의 장입니다.

The field produced by magnets or moving electric charges.

$$F = qvB\sin\theta$$

```math-anim
type: magnetic-field
params:
  current: { default: 5, min: 1, max: 20, step: 1, label: { kr: "전류 (A)", en: "Current (A)" } }
  distance: { default: 3, min: 0.5, max: 10, step: 0.5, label: { kr: "거리 (cm)", en: "Distance (cm)" } }
  showField: { default: true, label: { kr: "자기력선 보기", en: "Show Field" } }
```

## 실생활 활용

- **나침반**
- **MRI 장치**
- **전동기**

