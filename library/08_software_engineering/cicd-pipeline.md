---
id: "cicd-pipeline"
title: { kr: "CI/CD 파이프라인", en: "CI/CD Pipeline" }
difficulty: "High-2"
connections: ["sdlc", "testing-strategy"]
---

# CI/CD 파이프라인 / CI/CD Pipeline

코드 변경을 자동으로 빌드, 테스트, 배포하는 지속적 통합/지속적 배포 프로세스입니다.

Continuous Integration and Continuous Deployment — automating the build, test, and deployment process.

```mermaid
graph LR
    A[코드 커밋\nGit Push] --> B[빌드\nBuild]
    B --> C[단위 테스트\nUnit Test]
    C --> D[통합 테스트\nIntegration Test]
    D --> E{품질 게이트\nQuality Gate}
    E -->|통과| F[스테이징 배포\nStaging]
    E -->|실패| G[개발자 알림\nNotification]
    F --> H[QA 검증\nQA Verify]
    H --> I[프로덕션 배포\nProduction]
```

## CI vs CD

| 구분 | CI (지속적 통합) | CD (지속적 배포) |
|------|-----------------|-----------------|
| 범위 | 빌드 + 테스트 자동화 | 배포까지 자동화 |
| 주기 | 커밋마다 | 릴리스마다 |
| 도구 | Jenkins, GitHub Actions | ArgoCD, Spinnaker |


## 실생활 활용

- **GitHub Actions / GitLab CI**
- **Docker + Kubernetes 배포**
- **마이크로서비스 운영**
