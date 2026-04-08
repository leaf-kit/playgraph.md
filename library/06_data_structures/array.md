---
id: "array"
title: { kr: "배열", en: "Array" }
difficulty: "High-1"
connections: ["linked-list", "binary-search"]
---

# 배열 / Array

같은 타입의 데이터를 연속된 메모리 공간에 저장하는 자료구조입니다.

A contiguous block of memory storing elements of the same type.

```math-anim
type: array
params:
  size: { default: 8, min: 3, max: 15, step: 1, label: { kr: "배열 크기", en: "Array Size" } }
  highlightIndex: { default: 3, min: 0, max: 14, step: 1, label: { kr: "인덱스 선택", en: "Select Index" } }
  showAddress: { default: true, label: { kr: "주소 보기", en: "Show Address" } }
```

## 실생활 활용

- **이미지 픽셀 저장**
- **학생 성적표**
- **게임 인벤토리**

## 핵심 정리

> 접근 O(1), 삽입/삭제 O(n)

