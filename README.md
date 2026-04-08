<p align="center">
  <img src="images/logo.png" alt="PlayGraph 로고" width="240" />
</p>

# playgraph.md

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/rust-1.77%2B-orange.svg)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/tauri-v2-blueviolet.svg)](https://tauri.app/)
[![React](https://img.shields.io/badge/react-19-61dafb.svg)](https://react.dev/)
[![GitHub Stars](https://img.shields.io/github/stars/leaf-kit/playgraph.md?style=social)](https://github.com/leaf-kit/playgraph.md/stargazers)

**마크다운 기반 인터랙티브 애니메이션 뷰어** — 수학, 물리, 자료구조, 역사, 소프트웨어 공학 등 다양한 분야의 개념을 시각적 애니메이션과 지식 그래프로 탐색하는 학습 도구.

> 📖 [English Documentation](README_en.md)

> **v0.1.0** — [GitHub Release](https://github.com/leaf-kit/playgraph.md/releases/tag/v0.1.0) | [Homebrew Tap](https://github.com/leaf-kit/homebrew-playgraph)
>
> ```bash
> brew tap leaf-kit/playgraph.md && brew install playgraph
> ```

---

## 스크린샷

**애니메이션 뷰 — 파동의 간섭**

![Animation View](images/screen1.png)

**지식 그래프 뷰**

![Graph View](images/screen2.png)

---

## 용어 정리

| 용어 | 설명 |
|------|------|
| **Concept (개념)** | 하나의 주제(예: "사인 함수", "뉴턴의 법칙")를 나타내는 마크다운 파일. YAML 프론트매터와 `math-anim` 블록을 포함 |
| **Library (라이브러리)** | 카테고리별로 정리된 개념 마크다운 파일 모음 (수학, 물리, 자료구조, 역사, 소프트웨어 공학 등) |
| **Knowledge Graph (지식 그래프)** | 개념 간 연결 관계를 보여주는 인터랙티브 힘-방향 그래프 시각화 |
| **math-anim 블록** | 마크다운 내 펜스드 코드 블록(` ```math-anim `)으로, 설정 가능한 파라미터를 가진 인터랙티브 애니메이션을 정의 |
| **Fly-to 내비게이션** | 지식 그래프에서 특정 개념 뷰어로 부드럽게 줌 전환하는 기능 |

---

## 왜 playgraph.md인가?

### 문제

교육 콘텐츠는 너무 정적입니다. 교과서는 고정된 그래프와 수식, 다이어그램만 보여줍니다. 학생들은 파라미터를 직접 *조작*하고 실시간으로 변화를 *관찰*할 수 없기 때문에 직관을 기르기 어렵습니다.

### 해결책

**playgraph.md**는 `math-anim` 블록이 포함된 마크다운 파일을 읽어 완전한 인터랙티브 애니메이션으로 렌더링합니다. 수학뿐 아니라 물리, 자료구조, 역사, 소프트웨어 공학 등 다양한 분야의 개념을 시각적으로 탐색할 수 있습니다. 슬라이더를 드래그하면 파동이 변형되고, 단위원을 회전하면 sin/cos 투영이 실시간으로 업데이트됩니다. 모든 애니메이션은 순수 마크다운으로 정의되며 — 코딩이 필요 없습니다.

---

## 주요 기능

| 카테고리 | 기능 |
|----------|------|
| **인터랙티브 애니메이션** | 슬라이더 파라미터로 구동되는 실시간 Canvas 2D 애니메이션 |
| **지식 그래프** | 130개 이상의 개념을 분야별로 연결하는 힘-방향 그래프 + Fly-to 내비게이션 |
| **마크다운 기반** | 개념은 YAML 프론트매터와 `math-anim` 블록이 포함된 `.md` 파일 |
| **핫 리로드** | 외부에서 마크다운 파일을 수정하면 앱에 즉시 반영 |
| **다국어 지원 (i18n)** | 모든 개념 제목과 UI에 한국어/영어 전환 |
| **KaTeX 렌더링** | 인라인 및 디스플레이 모드의 아름다운 LaTeX 수학 수식 렌더링 |
| **줌 & 팬** | 애니메이션과 지식 그래프 모두에서 부드러운 줌/팬이 가능한 무한 캔버스 |
| **다크 테마** | 집중과 시각적 선명함을 위해 설계된 다크 UI |
| **Tauri v2** | Rust 백엔드와 React 프론트엔드로 구성된 빠르고 가벼운 데스크톱 앱 |

---

## 설치

### Homebrew (macOS / Linux)

```bash
brew tap leaf-kit/playgraph.md
brew install playgraph
```

### 소스에서 빌드

```bash
git clone https://github.com/leaf-kit/playgraph.md.git
cd playgraph.md
npm install
cd src-tauri && cargo test && cd ..
cargo tauri build
```

또는 빌드 스크립트를 사용하세요:

```bash
./build.sh
# 옵션 2를 선택하면 릴리스 빌드
```

### 사전 요구 사항

- [Rust](https://www.rust-lang.org/tools/install) 1.77+
- [Node.js](https://nodejs.org/) 18+
- [Tauri CLI](https://tauri.app/start/) (`cargo install tauri-cli`)

---

## 사용법

### 개발 모드 실행

```bash
cargo tauri dev
```

### 라이브러리 구조

개념 파일은 `library/` 아래에 정리되어 있습니다:

```
library/
├── 01_elementary_math/      # 초등 수학
├── 02_middle_math/          # 중등 수학
├── 03_middle_physics/       # 중등 물리
├── 04_high_math/            # 고등 수학
├── 05_high_physics/         # 고등 물리
├── 06_data_structures/      # 자료구조 & 알고리즘
├── 07_korean_history/       # 한국사
└── 08_software_engineering/ # 소프트웨어 공학
```

### 개념 파일 작성법

각 개념은 YAML 프론트매터가 포함된 마크다운 파일입니다:

```markdown
---
id: "sine-wave"
title: { kr: "사인 함수", en: "Sine Wave" }
difficulty: "Middle-3"
connections: ["unit-circle", "oscillation"]
---

# 사인 함수

$$y = A \sin(Bx + C) + D$$

` `` math-anim
type: sine-wave
params:
  amplitude: { default: 1, min: 0.1, max: 3, step: 0.1, label: { kr: "진폭", en: "Amplitude" } }
  frequency: { default: 1, min: 0.1, max: 5, step: 0.1, label: { kr: "주파수", en: "Frequency" } }
` ``
```

---

## 플레이그라운드

`playground/` 디렉터리에는 앱 검증을 위한 테스트 리소스가 포함되어 있습니다:

```
playground/
└── (테스트용 마크다운 파일 및 리소스)
```

### 샘플 개념 (v0.1.0)

| 개념 | 카테고리 | 난이도 | 애니메이션 |
|------|----------|--------|-----------|
| 사인 함수 | 함수 | 중3 | 진폭/주파수/위상 슬라이더가 있는 인터랙티브 파동 + 파동 효과 |
| 피타고라스 정리 | 기하 | 중2 | 넓이 정사각형 시각화가 포함된 애니메이션 직각삼각형 |
| 단위원 | 함수 | 고1 | sin/cos 투영 + 사인 궤적이 있는 회전 점 |

---

## 빌드 스크립트

```bash
./build.sh
```

```
==================================
  playgraph v0.1.0 — Build & Dev
==================================

  1) Build (debug)
  2) Build (release)
  3) Run tests
  4) Run clippy (lint)
  5) Clean build artifacts
  6) Dev mode (live reload)
  7) Create release tarball
  8) Deploy to Homebrew
  0) Exit
```

릴리스 빌드(옵션 2) 전에 테스트가 필수입니다. 스크립트는 빌드 전에 자동으로 `cargo test`와 `cargo clippy`를 실행합니다.

---

## 업데이트

| 방법 | 명령어 |
|------|--------|
| Homebrew | `brew upgrade playgraph` |
| 소스 | `git pull && ./build.sh` |

## 삭제

| 방법 | 명령어 |
|------|--------|
| Homebrew | `brew uninstall playgraph && brew untap leaf-kit/playgraph.md` |

---

## 기술 스택

| 계층 | 기술 |
|------|------|
| 데스크톱 프레임워크 | [Tauri v2](https://tauri.app/) |
| 백엔드 | Rust (serde, pulldown-cmark, notify, walkdir) |
| 프론트엔드 | React 19 + TypeScript + Vite |
| 애니메이션 | HTML5 Canvas 2D API |
| 지식 그래프 | d3-force + d3-zoom (SVG) |
| 수학 렌더링 | [KaTeX](https://katex.org/) |

---

## 로드맵

- [x] 3개 샘플 애니메이션이 포함된 코어 뷰어
- [x] Fly-to 내비게이션이 있는 지식 그래프
- [x] 다국어 지원 (한국어/영어)
- [x] 핫 리로드 파일 감시
- [ ] 개념 라이브러리 확장 (8개 카테고리)
- [ ] 퍼지 매칭 검색
- [ ] 애니메이션 내보내기 (GIF/동영상)
- [ ] 커스텀 애니메이션 플러그인 시스템
- [ ] 모바일 지원

---

## 피드백 & 기여

이슈와 PR은 [GitHub](https://github.com/leaf-kit/playgraph.md/issues)에서 환영합니다.

---

## 라이선스

[MIT](LICENSE)
