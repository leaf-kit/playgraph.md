---
id: "nuclear-physics"
title: { kr: "핵물리", en: "Nuclear Physics" }
difficulty: "High-3"
connections: ["energy-conservation", "thermodynamics"]
---

# 핵물리 / Nuclear Physics

원자핵의 구조와 핵반응, 방사성 붕괴를 다루는 물리학의 분야입니다.

The branch of physics dealing with atomic nuclei, nuclear reactions, and radioactive decay.

$$E = mc^2$$

```math-anim
type: nuclear-physics
params:
  massNumber: { default: 235, min: 1, max: 240, step: 1, label: { kr: "질량수 A", en: "Mass Number A" } }
  halfLife: { default: 5, min: 1, max: 20, step: 1, label: { kr: "반감기 (년)", en: "Half-life (yr)" } }
  showDecay: { default: true, label: { kr: "붕괴 과정", en: "Show Decay" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **원자력 발전**
- **의료 방사선 치료**
- **방사성 탄소 연대 측정**

