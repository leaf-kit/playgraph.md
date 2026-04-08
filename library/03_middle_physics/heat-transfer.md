---
id: "heat-transfer"
title: { kr: "열전달", en: "Heat Transfer" }
difficulty: "Middle-2"
connections: ["thermodynamics"]
---

# 열전달 / Heat Transfer

온도가 다른 두 물체 사이에서 에너지가 이동하는 현상입니다.

The movement of thermal energy from hot to cold objects.

$$Q = mc\Delta T$$

```math-anim
type: heat-transfer
params:
  tempHot: { default: 80, min: 20, max: 100, step: 5, label: { kr: "고온 (°C)", en: "Hot (°C)" } }
  tempCold: { default: 20, min: 0, max: 50, step: 5, label: { kr: "저온 (°C)", en: "Cold (°C)" } }
  showFlow: { default: true, label: { kr: "열 흐름 보기", en: "Show Heat Flow" } }
```

## 실생활 활용

- **요리할 때 열전달**
- **핫팩과 쿨팩**
- **단열재의 원리**

