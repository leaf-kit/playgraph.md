---
id: "buoyancy"
title: { kr: "부력", en: "Buoyancy" }
difficulty: "Middle-2"
connections: ["density", "pressure"]
---

# 부력 / Buoyancy

유체 속의 물체가 위로 떠오르려는 힘입니다.

The upward force exerted on an object submerged in fluid.

$$F_b = \rho_{fluid} \cdot V \cdot g$$

```math-anim
type: buoyancy
params:
  objectDensity: { default: 800, min: 100, max: 2000, step: 100, label: { kr: "물체 밀도", en: "Object Density" } }
  fluidDensity: { default: 1000, min: 500, max: 1500, step: 100, label: { kr: "유체 밀도", en: "Fluid Density" } }
  showForces: { default: true, label: { kr: "힘 표시", en: "Show Forces" } }
```

## 실생활 활용

- **배가 뜨는 원리**
- **잠수함**
- **열기구**

