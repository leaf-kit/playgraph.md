---
id: "database-normalization"
title: { kr: "데이터베이스 정규화", en: "Database Normalization" }
difficulty: "High-2"
connections: ["er-diagram"]
---

# 데이터베이스 정규화 / Database Normalization

데이터 중복을 최소화하고 무결성을 보장하기 위해 테이블을 분리하는 과정입니다.

The process of organizing data to minimize redundancy and ensure integrity by decomposing tables.

```mermaid
graph LR
    A[비정규형] -->|중복 제거| B[1NF]
    B -->|부분 종속 제거| C[2NF]
    C -->|이행 종속 제거| D[3NF]
    D -->|결정자=후보키| E[BCNF]
    style A fill:#ef4444,color:#fff
    style B fill:#fb923c,color:#fff
    style C fill:#fbbf24,color:#000
    style D fill:#4ade80,color:#000
    style E fill:#60a5fa,color:#fff
```

## 정규형 요약

| 정규형 | 조건 | 예시 |
|--------|------|------|
| 1NF | 모든 속성이 원자값 | 전화번호 여러 개 → 별도 행 |
| 2NF | 부분 함수 종속 제거 | 복합 키의 일부에만 종속된 속성 분리 |
| 3NF | 이행 함수 종속 제거 | A→B→C에서 C를 별도 테이블로 |
| BCNF | 모든 결정자가 후보키 | 더 엄격한 3NF |

```math-anim
type: database-normalization
params:
  normalForm: { default: 3, min: 1, max: 4, step: 1, label: { kr: "정규형", en: "Normal Form" } }
  showDecompose: { default: true, label: { kr: "분해 과정", en: "Show Decomposition" } }
```

## 실생활 활용

- **관계형 데이터베이스 설계**
- **데이터 품질 관리**
- **성능 최적화 (역정규화)**
