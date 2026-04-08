---
id: "sample-pythagorean"
title: { kr: "피타고라스 정리 테스트", en: "Pythagorean Theorem Test" }
difficulty: "Middle-2"
connections: []
---

# 피타고라스 정리 테스트 / Pythagorean Theorem Test

이 파일은 playground 테스트용 샘플입니다.

$$a^2 + b^2 = c^2$$

유명한 피타고라스 수 (Pythagorean triples):

| a | b | c |
|---|---|---|
| 3 | 4 | 5 |
| 5 | 12 | 13 |
| 8 | 15 | 17 |

```math-anim
type: pythagorean-theorem
params:
  sideA: { default: 5, min: 1, max: 15, step: 0.5, label: { kr: "변 a", en: "Side a" } }
  sideB: { default: 12, min: 1, max: 15, step: 0.5, label: { kr: "변 b", en: "Side b" } }
  showSquares: { default: true, label: { kr: "정사각형 보기", en: "Show Squares" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 테스트 시나리오

1. a=3, b=4 설정 → c=5 (정수 결과) 확인
2. a=5, b=12 설정 → c=13 확인
3. 정사각형 보기 토글 → 넓이 시각화 on/off 확인
4. 애니메이션 토글 → 펄스 효과 on/off 확인
5. 극단값 a=1, b=1 → 작은 삼각형 레이아웃 확인
6. 극단값 a=15, b=15 → 큰 삼각형 레이아웃 확인
