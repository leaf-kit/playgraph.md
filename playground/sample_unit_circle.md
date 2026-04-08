---
id: "sample-circle"
title: { kr: "단위원 테스트", en: "Unit Circle Test" }
difficulty: "High-1"
connections: ["sample-sine"]
---

# 단위원 테스트 / Unit Circle Test

이 파일은 playground 테스트용 샘플입니다.

단위원 위의 점:

$$P(\theta) = (\cos\theta, \sin\theta)$$

주요 각도별 기대값:

| 각도 | cos | sin |
|------|-----|-----|
| 0 (0°) | 1.000 | 0.000 |
| 0.785 (45°) | 0.707 | 0.707 |
| 1.571 (90°) | 0.000 | 1.000 |
| 3.142 (180°) | -1.000 | 0.000 |
| 4.712 (270°) | 0.000 | -1.000 |

```math-anim
type: unit-circle
params:
  angle: { default: 0, min: 0, max: 6.28, step: 0.01, label: { kr: "각도 (rad)", en: "Angle (rad)" } }
  showProjections: { default: true, label: { kr: "투영선 보기", en: "Show Projections" } }
  autoRotate: { default: true, label: { kr: "자동 회전", en: "Auto Rotate" } }
  speed: { default: 1.5, min: 0.1, max: 3, step: 0.1, label: { kr: "속도", en: "Speed" } }
```

## 테스트 시나리오

1. 자동 회전 ON → 점이 원 위를 따라 회전하며 사인 트레이스가 생성되는지 확인
2. 자동 회전 OFF → 각도 슬라이더로 수동 조절 가능 확인
3. 각도 0 → cos=1, sin=0 표시 확인
4. 각도 1.571 (90°) → cos=0, sin=1 표시 확인
5. 투영선 토글 → cos(파란)/sin(초록) 투영선 on/off 확인
6. 속도 슬라이더 조절 → 회전 속도 변화 확인
7. 오른쪽 사인 트레이스가 점과 연결선으로 이어지는지 확인

관련: [[sample-sine]]
