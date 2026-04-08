---
id: "sine-wave"
title: { kr: "사인 함수", en: "Sine Wave" }
difficulty: "Middle-3"
connections: ["unit-circle"]
---

# 사인 함수 / Sine Wave

사인 함수는 주기적으로 반복되는 파동을 나타내는 가장 기본적인 삼각함수입니다.

$$y = A \sin(Bx + C) + D$$

- **A**: 진폭 (Amplitude) — 파동의 높이를 결정합니다
- **B**: 주파수 (Frequency) — 파동이 얼마나 빠르게 반복되는지 결정합니다
- **C**: 위상 이동 (Phase Shift) — 그래프를 좌우로 이동시킵니다
- **D**: 수직 이동 (Vertical Shift) — 그래프를 상하로 이동시킵니다

```math-anim
type: sine-wave
params:
  amplitude: { default: 1, min: 0.1, max: 3, step: 0.1, label: { kr: "진폭", en: "Amplitude" } }
  frequency: { default: 1, min: 0.1, max: 5, step: 0.1, label: { kr: "주파수", en: "Frequency" } }
  phase: { default: 0, min: -3.14, max: 3.14, step: 0.1, label: { kr: "위상", en: "Phase" } }
  showWave: { default: true, label: { kr: "파도 효과", en: "Wave Effect" } }
```

## 실생활 속 사인 함수

사인 함수는 다양한 자연 현상에서 나타납니다:

- **음파**: 소리는 공기의 압력 변화가 사인파 형태로 전달됩니다
- **빛**: 전자기파는 사인 함수로 표현됩니다
- **조수**: 바다의 밀물과 썰물은 사인 함수를 따릅니다
- **진자 운동**: 추의 왕복 운동은 사인 함수로 근사할 수 있습니다

