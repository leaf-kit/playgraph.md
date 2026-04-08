---
id: "hash-table"
title: { kr: "해시 테이블", en: "Hash Table" }
difficulty: "High-2"
connections: ["array"]
---

# 해시 테이블 / Hash Table

키(key)를 해시 함수로 변환하여 값(value)을 빠르게 찾는 자료구조입니다.

A data structure that maps keys to values using a hash function.

```math-anim
type: hash-table
params:
  tableSize: { default: 8, min: 4, max: 16, step: 1, label: { kr: "테이블 크기", en: "Table Size" } }
  key: { default: 42, min: 0, max: 99, step: 1, label: { kr: "키", en: "Key" } }
  showCollision: { default: true, label: { kr: "충돌 보기", en: "Show Collision" } }
```

## 실생활 활용

- **전화번호부**
- **웹 캐시**
- **데이터베이스 인덱싱**

## 핵심 정리

> 평균 접근 O(1), 최악 O(n)

