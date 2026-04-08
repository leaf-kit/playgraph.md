---
id: "ohms-law"
title: { kr: "옴의 법칙", en: "Ohm's Law" }
difficulty: "High-1"
connections: ["electric-circuit"]
---

# 옴의 법칙 / Ohm's Law

전압, 전류, 저항 사이의 기본적인 관계입니다.

The fundamental relationship between voltage, current, and resistance.

$$V = IR$$

```math-anim
type: ohms-law
params:
  voltage: { default: 12, min: 1, max: 24, step: 1, label: { kr: "전압 (V)", en: "Voltage (V)" } }
  resistance: { default: 4, min: 1, max: 20, step: 1, label: { kr: "저항 (Ω)", en: "Resistance (Ω)" } }
  showMeter: { default: true, label: { kr: "계기 보기", en: "Show Meters" } }
```

## 실생활 활용

- **가전제품 소비전력**
- **퓨즈 용량 계산**
- **LED 저항 선택**

