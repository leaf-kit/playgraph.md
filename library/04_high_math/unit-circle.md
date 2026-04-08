---
id: "unit-circle"
title: { kr: "단위원", en: "Unit Circle" }
difficulty: "High-1"
connections: ["sine-wave", "pythagorean-theorem"]
---

# 단위원 / Unit Circle

단위원은 반지름이 1인 원으로, 삼각함수의 핵심 개념입니다.

원 위의 점 P의 좌표는:

$$P(\theta) = (\cos\theta, \sin\theta)$$

이때 항상 다음이 성립합니다:

$$\cos^2\theta + \sin^2\theta = 1$$

```math-anim
type: unit-circle
params:
  angle: { default: 0.785, min: 0, max: 6.28, step: 0.01, label: { kr: "각도 (rad)", en: "Angle (rad)" } }
  showProjections: { default: true, label: { kr: "투영선 보기", en: "Show Projections" } }
  autoRotate: { default: false, label: { kr: "자동 회전", en: "Auto Rotate" } }
  speed: { default: 1, min: 0.1, max: 3, step: 0.1, label: { kr: "속도", en: "Speed" } }
```

## 주요 각도

| 각도 (도) | 각도 (라디안) | cos | sin |
|-----------|--------------|-----|-----|
| 0 | 0 | 1 | 0 |
| 30 | $\pi/6$ | $\sqrt{3}/2$ | $1/2$ |
| 45 | $\pi/4$ | $\sqrt{2}/2$ | $\sqrt{2}/2$ |
| 60 | $\pi/3$ | $1/2$ | $\sqrt{3}/2$ |
| 90 | $\pi/2$ | 0 | 1 |

