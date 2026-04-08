---
id: "electric-circuit"
title: { kr: "전기 회로", en: "Electric Circuit" }
difficulty: "Middle-2"
connections: ["ohms-law"]
---

# 전기 회로 / Electric Circuit

전류가 흐르는 도선과 전기 부품으로 이루어진 닫힌 경로입니다.

A closed path through which electric current flows.

$$V = IR$$

```math-anim
type: electric-circuit
params:
  voltage: { default: 9, min: 1, max: 24, step: 1, label: { kr: "전압 (V)", en: "Voltage (V)" } }
  resistance: { default: 3, min: 1, max: 10, step: 0.5, label: { kr: "저항 (Ω)", en: "Resistance (Ω)" } }
  showCurrent: { default: true, label: { kr: "전류 표시", en: "Show Current" } }
```

## 실생활 활용

- **손전등**
- **가전제품 연결**
- **스마트폰 충전**

