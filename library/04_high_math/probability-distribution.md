---
id: "probability-distribution"
title: { kr: "확률분포", en: "Probability Distribution" }
difficulty: "High-2"
connections: ["probability-basic", "statistics-mean", "binomial-theorem"]
---

# 확률분포 / Probability Distribution

확률 변수가 취할 수 있는 값과 그 확률의 대응 관계입니다.

The mathematical function that gives the probabilities of occurrence for different outcomes.

$$P(X = x) = f(x), \quad \sum f(x) = 1$$

```math-anim
type: probability-distribution
params:
  mean: { default: 5, min: 0, max: 10, step: 0.5, label: { kr: "평균 μ", en: "Mean μ" } }
  stddev: { default: 1.5, min: 0.3, max: 4, step: 0.1, label: { kr: "표준편차 σ", en: "Std Dev σ" } }
  showNormal: { default: true, label: { kr: "정규분포 곡선", en: "Normal Curve" } }
  showArea: { default: true, label: { kr: "면적 표시", en: "Show Area" } }
```

## 실생활 활용

- **시험 점수 분포**
- **품질 관리 (6시그마)**
- **주식 수익률 분석**

