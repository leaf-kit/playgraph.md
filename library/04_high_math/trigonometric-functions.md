---
id: "trigonometric-functions"
title: { kr: "삼각함수", en: "Trigonometric Functions" }
difficulty: "High-1"
connections: ["sine-wave", "unit-circle"]
---

# 삼각함수 / Trigonometric Functions

직각삼각형의 변의 비로 정의되는 함수들입니다.

Functions relating angles to ratios of triangle sides.

$$\sin\theta, \; \cos\theta, \; \tan\theta$$

## 🌟 선생님의 다정한 설명

### 🎈 초등학생 눈높이

삼각함수는 **"기울어진 언덕의 비밀"** 을 알려주는 거예요!

미끄럼틀을 생각해 봐요. 미끄럼틀이 얼마나 높은지, 얼마나 긴지, 얼마나 기울어져 있는지를 숫자로 나타낼 수 있어요!

- 📐 sin = 높이 ÷ 빗변 (미끄럼틀의 높이가 전체 길이의 몇 배인지?)
- 📐 cos = 밑변 ÷ 빗변 (미끄럼틀의 바닥 길이가 전체 길이의 몇 배인지?)
- 📐 tan = 높이 ÷ 밑변 (미끄럼틀이 얼마나 가파른지?)

### 📐 중학생 눈높이

삼각함수의 기본 정의:

직각삼각형에서 각도 $\theta$에 대해:
$$\sin\theta = \frac{\text{대변(높이)}}{\text{빗변}}, \quad \cos\theta = \frac{\text{인접변(밑변)}}{\text{빗변}}, \quad \tan\theta = \frac{\sin\theta}{\cos\theta}$$

핵심 항등식:
- $\sin^2\theta + \cos^2\theta = 1$
- $\tan\theta = \frac{\sin\theta}{\cos\theta}$

이 세 함수만 있으면 각도가 포함된 거의 모든 문제를 풀 수 있어요!

### 🎓 고등학생 눈높이

삼각함수는 **주기함수**이며, 단위원을 통해 모든 실수에 대해 정의됩니다.

6가지 삼각함수와 그 관계:
- $\csc\theta = \frac{1}{\sin\theta}$, $\sec\theta = \frac{1}{\cos\theta}$, $\cot\theta = \frac{1}{\tan\theta}$

덧셈 정리:
$$\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta$$
$$\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta$$

이 공식들에서 배각, 반각, 합차 공식 등이 모두 유도돼요!

## 🔍 수식을 단계별로 풀어볼까요?

$$\sin\theta, \; \cos\theta, \; \tan\theta$$

**1단계: 직각삼각형 그리기**
> 직각삼각형에서 한 예각 $\theta$를 정하고, 세 변의 이름을 붙여요: 대변(opposite), 인접변(adjacent), 빗변(hypotenuse).

**2단계: 비율 계산하기**
> 각 삼각함수는 두 변의 비율! $\sin 30° = \frac{1}{2}$은 빗변이 2일 때 대변이 1이라는 뜻!

**3단계: 단위원으로 확장**
> 직각삼각형은 $0° < \theta < 90°$에서만 가능하지만, 단위원을 쓰면 모든 각도로 확장할 수 있어요.

**4단계: 그래프 그리기**
> $\sin\theta$는 파도 모양, $\cos\theta$는 sin을 $\frac{\pi}{2}$만큼 옮긴 모양, $\tan\theta$는 수직 점근선이 있는 독특한 모양!

```math-anim
type: trigonometric-functions
params:
  angle: { default: 0.785, min: 0, max: 6.28, step: 0.05, label: { kr: "각도 (rad)", en: "Angle (rad)" } }
  showAll: { default: true, label: { kr: "sin/cos/tan 모두", en: "Show All" } }
  animate: { default: false, label: { kr: "자동 회전", en: "Auto Rotate" } }
```

### 🌟 선생님의 관찰 노트

- **관찰 내용:** 각도를 바꿔가며 sin, cos, tan 값이 어떻게 변하는지 관찰해 보세요. 특히 $\frac{\pi}{2}$ (90도)에서 tan이 어떻게 되는지 주목!
- **관찰 결과:** $\sin$과 $\cos$은 항상 -1과 1 사이를 오가지만, $\tan$은 무한대까지 갈 수 있어요. $\theta = \frac{\pi}{2}$에서 $\cos\theta = 0$이 되어 $\tan\theta$가 정의되지 않아요(수직 점근선)!
- **연결 질문:** "삼각함수의 그래프가 계속 반복된다면, 이 반복되는 패턴으로 어떤 자연 현상을 설명할 수 있을까요?" → **사인 함수(Sine Wave)** 에서 파동 현상을 탐구해요!

## 🔗 개념 연결 고리

| 연결 개념 | 관계 | 설명 |
|-----------|------|------|
| **단위원 (Unit Circle)** | ← 기반 개념 | 삼각함수의 정의가 단위원에서 나와요. |
| **사인 함수 (Sine Wave)** | → 확장 개념 | 삼각함수의 그래프와 파동을 탐구! |
| **벡터 (Vectors)** | ↔ 관련 개념 | 벡터의 성분 분해에 삼각함수가 필수! |
| **복소수 (Complex Numbers)** | → 심화 개념 | 오일러 공식으로 삼각함수와 지수함수가 연결! |

## 실생활 활용

- **건축 각도 계산:** 지붕의 경사, 계단의 각도, 건물의 높이를 삼각함수로 계산해요. 피사의 사탑의 기울기도 tan으로 측정!
- **항해 방향:** 배의 진행 방향과 속도를 성분으로 분해할 때 sin과 cos를 사용해요. GPS 내비게이션의 기본 원리!
- **음파 분석:** 복잡한 소리를 사인파와 코사인파의 합으로 분해하는 것이 음향학의 기초예요. 노이즈 캔슬링 이어폰이 이 원리를 활용!
- **게임과 애니메이션:** 캐릭터의 회전, 물체의 궤적, 부드러운 움직임을 만들 때 삼각함수가 사용돼요.
