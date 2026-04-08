---
id: "state-diagram"
title: { kr: "상태 다이어그램", en: "State Diagram" }
difficulty: "High-2"
connections: ["uml-sequence-diagram", "design-patterns"]
---

# 상태 다이어그램 / State Diagram

객체의 상태 변화와 그 전이 조건을 표현하는 다이어그램입니다.

A diagram showing the states of an object and the transitions between them.

```mermaid
stateDiagram-v2
    [*] --> 대기중: 주문 생성
    대기중 --> 결제완료: 결제 성공
    대기중 --> 취소됨: 주문 취소
    결제완료 --> 배송준비: 상품 확인
    배송준비 --> 배송중: 출고 완료
    배송중 --> 배송완료: 수령 확인
    배송완료 --> 반품요청: 반품 신청
    반품요청 --> 반품완료: 반품 처리
    결제완료 --> 환불됨: 환불 요청
    취소됨 --> [*]
    배송완료 --> [*]
    반품완료 --> [*]
    환불됨 --> [*]
```

## 주요 구성 요소

- **상태 (State)**: 객체가 취할 수 있는 조건
- **전이 (Transition)**: 상태 간의 변경
- **이벤트 (Event)**: 전이를 유발하는 사건
- **초기 상태 (`[*]`)**: 시작점
- **최종 상태 (`[*]`)**: 종료점

```math-anim
type: state-diagram
params:
  states: { default: 5, min: 3, max: 8, step: 1, label: { kr: "상태 수", en: "States" } }
  showTransitions: { default: true, label: { kr: "전이 표시", en: "Show Transitions" } }
  animate: { default: true, label: { kr: "애니메이션", en: "Animate" } }
```

## 실생활 활용

- **주문 처리 시스템**
- **게임 캐릭터 AI**
- **UI 상태 관리 (React 등)**
