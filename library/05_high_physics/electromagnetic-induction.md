---
id: "electromagnetic-induction"
title: { kr: "전자기 유도", en: "Electromagnetic Induction" }
difficulty: "High-3"
connections: ["magnetic-field"]
---

# 전자기 유도 / Electromagnetic Induction

자기장의 변화에 의해 전류가 유도되는 현상입니다.

The production of voltage by a changing magnetic field.

$$\varepsilon = -\frac{d\Phi_B}{dt}$$

```math-anim
type: electromagnetic-induction
params:
  turns: { default: 10, min: 1, max: 30, step: 1, label: { kr: "코일 감은 수", en: "Turns" } }
  speed: { default: 2, min: 0.5, max: 5, step: 0.5, label: { kr: "자석 속도", en: "Magnet Speed" } }
  showVoltage: { default: true, label: { kr: "전압 표시", en: "Show Voltage" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **발전기**
- **무선 충전**
- **교통카드**

