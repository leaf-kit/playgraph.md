---
id: "projectile-motion"
title: { kr: "포물선 운동", en: "Projectile Motion" }
difficulty: "High-1"
connections: ["gravity", "quadratic-function"]
---

# 포물선 운동 / Projectile Motion

물체를 비스듬히 던졌을 때 포물선을 그리며 이동하는 운동입니다.

The curved path of an object thrown at an angle.

$$y = v_0 \sin\theta \cdot t - \frac{1}{2}gt^2$$

```math-anim
type: projectile-motion
params:
  velocity: { default: 20, min: 5, max: 50, step: 1, label: { kr: "초속 (m/s)", en: "Velocity (m/s)" } }
  angle: { default: 45, min: 5, max: 85, step: 5, label: { kr: "발사각 (°)", en: "Launch Angle (°)" } }
  showTrail: { default: true, label: { kr: "궤적 보기", en: "Show Trail" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **공 던지기**
- **분수대 물줄기**
- **포병 사격 계산**

