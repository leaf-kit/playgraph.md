---
id: "wave-interference"
title: { kr: "파동의 간섭", en: "Wave Interference" }
difficulty: "High-2"
connections: ["waves-basic", "sine-wave"]
---

# 파동의 간섭 / Wave Interference

두 파동이 만나서 세기가 강해지거나 약해지는 현상입니다.

When two waves overlap, they combine constructively or destructively.

$$y = y_1 + y_2$$

```math-anim
type: wave-interference
params:
  freq1: { default: 2, min: 0.5, max: 5, step: 0.5, label: { kr: "진동수 1", en: "Frequency 1" } }
  freq2: { default: 2.5, min: 0.5, max: 5, step: 0.5, label: { kr: "진동수 2", en: "Frequency 2" } }
  showSum: { default: true, label: { kr: "합성파 보기", en: "Show Sum" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **소음 제거 헤드폰**
- **악기 화음**
- **영의 이중 슬릿 실험**

