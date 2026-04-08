---
id: "area-triangle"
title: { kr: "삼각형의 넓이", en: "Triangle Area" }
difficulty: "Elementary"
connections: ["area-rectangle"]
---

# 삼각형의 넓이 / Triangle Area

삼각형의 넓이는 밑변 곱하기 높이의 반입니다.

The area of a triangle is half of base times height.

$$S = \frac{1}{2} \times b \times h$$

```math-anim
type: area-triangle
params:
  base: { default: 6, min: 1, max: 12, step: 0.5, label: { kr: "밑변", en: "Base" } }
  height: { default: 4, min: 1, max: 10, step: 0.5, label: { kr: "높이", en: "Height" } }
  showGrid: { default: true, label: { kr: "격자 보기", en: "Show Grid" } }
```

## 실생활 활용

- **지붕 면적**
- **삼각김밥 크기**
- **돛의 면적**
