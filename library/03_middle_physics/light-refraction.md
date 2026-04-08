---
id: "light-refraction"
title: { kr: "빛의 굴절", en: "Light Refraction" }
difficulty: "Middle-2"
connections: ["light-reflection"]
---

# 빛의 굴절 / Light Refraction

빛이 다른 매질을 통과할 때 꺾이는 현상입니다.

The bending of light as it passes from one medium to another.

$$n_1 \sin\theta_1 = n_2 \sin\theta_2$$

```math-anim
type: light-refraction
params:
  angle: { default: 45, min: 5, max: 85, step: 5, label: { kr: "입사각 (°)", en: "Angle (°)" } }
  n1: { default: 1, min: 1, max: 2.5, step: 0.1, label: { kr: "굴절률 n₁", en: "Index n₁" } }
  n2: { default: 1.5, min: 1, max: 2.5, step: 0.1, label: { kr: "굴절률 n₂", en: "Index n₂" } }
```

## 실생활 활용

- **물속 물체가 휘어 보임**
- **렌즈**
- **무지개**

