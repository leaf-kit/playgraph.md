---
id: "sample-sine"
title: { kr: "사인 함수 테스트", en: "Sine Wave Test" }
difficulty: "Middle-3"
connections: ["sample-circle"]
---

# 사인 함수 테스트 / Sine Wave Test

이 파일은 playground 테스트용 샘플입니다.

$$y = A \sin(Bx + C)$$

- **A** = 진폭
- **B** = 주파수
- **C** = 위상

```math-anim
type: sine-wave
params:
  amplitude: { default: 2, min: 0.1, max: 5, step: 0.1, label: { kr: "진폭", en: "Amplitude" } }
  frequency: { default: 2, min: 0.1, max: 8, step: 0.1, label: { kr: "주파수", en: "Frequency" } }
  phase: { default: 1.57, min: -3.14, max: 3.14, step: 0.1, label: { kr: "위상", en: "Phase" } }
  showWave: { default: true, label: { kr: "파도 효과", en: "Wave Effect" } }
```

## 테스트 시나리오

1. 진폭 슬라이더를 0.1 ~ 5 범위에서 조절 → 파형 높이 변화 확인
2. 주파수 슬라이더를 0.1 ~ 8 범위에서 조절 → 파형 빈도 변화 확인
3. 위상 슬라이더 조절 → 파형 좌우 이동 확인
4. 파도 효과 토글 → 하단 수면 효과 on/off 확인

관련: [[sample-circle]]
