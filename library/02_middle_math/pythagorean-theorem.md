---
id: "pythagorean-theorem"
title: { kr: "피타고라스 정리", en: "Pythagorean Theorem" }
difficulty: "Middle-2"
connections: ["unit-circle"]
---

# 피타고라스 정리 / Pythagorean Theorem

직각삼각형에서 빗변의 제곱은 나머지 두 변의 제곱의 합과 같습니다.

$$a^2 + b^2 = c^2$$

여기서:
- **a**, **b**: 직각을 이루는 두 변 (밑변과 높이)
- **c**: 빗변 (가장 긴 변)

```math-anim
type: pythagorean-theorem
params:
  sideA: { default: 3, min: 1, max: 10, step: 0.5, label: { kr: "변 a", en: "Side a" } }
  sideB: { default: 4, min: 1, max: 10, step: 0.5, label: { kr: "변 b", en: "Side b" } }
  showSquares: { default: true, label: { kr: "정사각형 보기", en: "Show Squares" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 역사

기원전 6세기 그리스의 수학자 피타고라스가 정리한 것으로 알려져 있지만, 이보다 훨씬 이전에 바빌로니아와 인도에서도 이 관계를 알고 있었습니다.

## 활용

- **거리 계산**: 두 점 사이의 거리를 구할 때 사용합니다
- **건축**: 직각을 확인하는 데 활용됩니다 (3-4-5 삼각형)
- **내비게이션**: GPS 좌표 간의 직선거리를 계산합니다

