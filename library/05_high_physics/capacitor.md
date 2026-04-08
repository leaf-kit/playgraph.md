---
id: "capacitor"
title: { kr: "축전기", en: "Capacitor" }
difficulty: "High-2"
connections: ["electric-field", "electric-circuit"]
---

# 축전기 / Capacitor

전하를 저장하는 장치로, 두 도체판 사이에 전기장이 형성됩니다.

A device that stores electric charge between two plates.

$$C = \frac{Q}{V}, \; E = \frac{1}{2}CV^2$$

```math-anim
type: capacitor
params:
  capacitance: { default: 10, min: 1, max: 50, step: 1, label: { kr: "전기용량 (μF)", en: "Capacitance (μF)" } }
  voltage: { default: 5, min: 1, max: 20, step: 1, label: { kr: "전압 (V)", en: "Voltage (V)" } }
  showCharge: { default: true, label: { kr: "충전 보기", en: "Show Charging" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **카메라 플래시**
- **제세동기**
- **터치스크린**

