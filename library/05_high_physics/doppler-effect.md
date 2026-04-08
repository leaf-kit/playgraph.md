---
id: "doppler-effect"
title: { kr: "도플러 효과", en: "Doppler Effect" }
difficulty: "High-2"
connections: ["waves-basic", "speed-velocity"]
---

# 도플러 효과 / Doppler Effect

파원과 관측자 사이의 상대 운동에 의해 진동수가 달라지는 현상입니다.

The change in frequency of a wave due to relative motion.

$$f' = f \cdot \frac{v \pm v_o}{v \mp v_s}$$

```math-anim
type: doppler-effect
params:
  sourceSpeed: { default: 10, min: 0, max: 50, step: 1, label: { kr: "파원 속도", en: "Source Speed" } }
  frequency: { default: 3, min: 1, max: 8, step: 0.5, label: { kr: "원래 진동수", en: "Original Freq" } }
  showWaves: { default: true, label: { kr: "파면 보기", en: "Show Wavefronts" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **구급차 사이렌**
- **우주 적색편이**
- **속도 측정 레이더**

