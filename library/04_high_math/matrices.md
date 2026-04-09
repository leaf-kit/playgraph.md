---
id: "matrices"
title: { kr: "행렬", en: "Matrices" }
difficulty: "High-2"
connections: ["vectors", "linear-equation"]
---

# 행렬 / Matrices

수를 직사각형 형태로 배열한 것으로, 연립방정식과 변환에 쓰입니다.

Rectangular arrays of numbers used for transformations and solving systems.

$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$

## 🌟 선생님의 다정한 설명

### 🎈 초등학생 눈높이

행렬은 **숫자를 표로 정리한 것**이에요!

교실에서 자리 배치를 생각해 봐요. 3줄 4칸으로 학생들이 앉아있으면, 그게 바로 $3 \times 4$ 행렬이에요!

행렬이 특별한 이유는 **변환**을 할 수 있다는 거예요:
- 🔄 그림을 회전시키기
- 📏 그림을 늘리거나 줄이기
- 🪞 그림을 뒤집기

행렬은 이 모든 변환을 숫자 몇 개로 표현할 수 있어요!

### 📐 중학생 눈높이

행렬은 **여러 개의 일차방정식을 한꺼번에 다루는 도구**예요.

연립방정식:
$$2x + y = 5$$
$$x + 3y = 7$$

이것을 행렬로 쓰면:
$$\begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 5 \\ 7 \end{pmatrix}$$

행렬끼리의 곱셈은 특별해요. 가로줄과 세로줄을 각각 곱해서 더하는 규칙을 따라요!

### 🎓 고등학생 눈높이

행렬은 **선형변환**을 나타내는 수학적 도구입니다.

$2 \times 2$ 행렬 $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$의 핵심 개념:
- **행렬식:** $\det(A) = ad - bc$ (넓이 변환 비율)
- **역행렬:** $A^{-1} = \frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$ ($\det \neq 0$일 때)
- **고유값:** $Av = \lambda v$를 만족하는 $\lambda$와 $v$

행렬의 행렬식이 0이면 역행렬이 존재하지 않아요 (특이행렬). 기하학적으로는 2D 공간이 1D 선으로 "찌그러지는" 것을 의미해요!

## 🔍 수식을 단계별로 풀어볼까요?

$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$

**1단계: 행과 열 이해**
> 가로줄이 "행(row)", 세로줄이 "열(column)". $2 \times 2$ 행렬은 2행 2열이에요.

**2단계: 행렬의 변환 의미**
> $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$는 단위 벡터 $(1,0)$을 $(a,c)$로, $(0,1)$을 $(b,d)$로 보내는 변환!

**3단계: 행렬식 계산**
> $\det(A) = ad - bc$. 이것은 행렬이 넓이를 몇 배로 바꾸는지 알려줘요. 음수면 뒤집힌다는 뜻!

**4단계: 역행렬 활용**
> $AX = B$에서 $X = A^{-1}B$. 역행렬이 있으면 연립방정식을 깔끔하게 풀 수 있어요!

```math-anim
type: matrices
params:
  a: { default: 2, min: -5, max: 5, step: 1, label: { kr: "a", en: "a" } }
  b: { default: 1, min: -5, max: 5, step: 1, label: { kr: "b", en: "b" } }
  c: { default: 0, min: -5, max: 5, step: 1, label: { kr: "c", en: "c" } }
  d_: { default: 2, min: -5, max: 5, step: 1, label: { kr: "d", en: "d" } }
  showTransform: { default: true, label: { kr: "변환 보기", en: "Show Transform" } }
```

### 🌟 선생님의 관찰 노트

- **관찰 내용:** a, b, c, d 값을 바꿔가며 사각형이 어떻게 변환되는지 관찰해 보세요! $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$을 넣으면 90도 회전이 돼요!
- **관찰 결과:** 행렬의 각 원소가 변환의 다른 측면을 결정해요. 대각선 원소(a, d)는 늘리기/줄이기, 비대각선 원소(b, c)는 기울이기를 담당해요. 행렬식이 0이 되면 면적이 0으로 찌그러져요!
- **연결 질문:** "행렬로 변환할 수 있는 도형이 2D뿐일까요? 3D 공간의 변환은?" → 3D 그래픽, 로봇 공학에서 $3 \times 3$, $4 \times 4$ 행렬을 사용해요!

## 🔗 개념 연결 고리

| 연결 개념 | 관계 | 설명 |
|-----------|------|------|
| **벡터 (Vectors)** | ← 선수 개념 | 행렬은 벡터를 변환하는 도구예요. |
| **연립방정식 (Linear Eq.)** | ↔ 관련 개념 | 연립방정식을 행렬로 표현하고 풀어요. |
| **복소수 (Complex Numbers)** | ↔ 관련 개념 | 복소수 곱셈은 2x2 행렬 곱셈과 같아요. |
| **미분방정식 (Differential Eq.)** | → 심화 개념 | 연립미분방정식을 행렬로 표현! |

## 실생활 활용

- **3D 그래픽 변환:** 영화의 CG, 게임의 3D 모델링은 모두 행렬 연산! 카메라 앵글 변환, 물체 회전 등이 행렬 곱셈으로 이루어져요.
- **암호 해독:** Hill 암호는 행렬 곱셈을 이용해요. 메시지를 행렬로 변환하고 역행렬로 해독!
- **경제 모델:** 레온티에프 산업연관 분석에서 각 산업 간의 관계를 행렬로 표현하고, 최적 생산량을 계산해요.
- **인공지능:** 딥러닝의 핵심은 거대한 행렬 연산! 수백만 개의 가중치를 행렬로 저장하고 계산해요.
