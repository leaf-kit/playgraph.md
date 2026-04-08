import { useState, useMemo } from "react";
import type { Lang, LocalizedText } from "../lib/types";

interface PromptGeneratorProps {
  lang: Lang;
  t: (key: string) => string;
  localized: (text: LocalizedText) => string;
}

const CATEGORIES = [
  { id: "01_arithmetic", label: { kr: "수와 연산", en: "Arithmetic" } },
  { id: "02_geometry", label: { kr: "도형과 기하", en: "Geometry" } },
  { id: "03_algebra", label: { kr: "문자와 식", en: "Algebra" } },
  { id: "04_functions", label: { kr: "함수와 그래프", en: "Functions" } },
  { id: "05_calculus", label: { kr: "미분과 적분", en: "Calculus" } },
  { id: "06_statistics", label: { kr: "확률과 통계", en: "Statistics" } },
];

const DIFFICULTIES = [
  "Elementary",
  "Middle-1",
  "Middle-2",
  "Middle-3",
  "High-1",
  "High-2",
  "High-3",
];

const ANIM_TYPES = [
  { id: "sine-wave", label: { kr: "사인파 그래프", en: "Sine Wave Graph" } },
  { id: "unit-circle", label: { kr: "단위원 회전", en: "Unit Circle Rotation" } },
  { id: "pythagorean-theorem", label: { kr: "피타고라스 정리", en: "Pythagorean Theorem" } },
  { id: "custom", label: { kr: "커스텀 (직접 정의)", en: "Custom (define your own)" } },
];

// ── Full example markdown for reference ──
const EXAMPLE_MD = `---
id: "sine-wave"
title: { kr: "사인 함수", en: "Sine Wave" }
difficulty: "Middle-3"
connections: ["unit-circle"]
---

# 사인 함수 / Sine Wave

사인 함수는 주기적으로 반복되는 파동을 나타내는 가장 기본적인 삼각함수입니다.

$$y = A \\sin(Bx + C) + D$$

- **A**: 진폭 (Amplitude) — 파동의 높이를 결정합니다
- **B**: 주파수 (Frequency) — 파동이 얼마나 빠르게 반복되는지 결정합니다

\`\`\`math-anim
type: sine-wave
params:
  amplitude: { default: 1, min: 0.1, max: 3, step: 0.1, label: { kr: "진폭", en: "Amplitude" } }
  frequency: { default: 1, min: 0.1, max: 5, step: 0.1, label: { kr: "주파수", en: "Frequency" } }
  phase: { default: 0, min: -3.14, max: 3.14, step: 0.1, label: { kr: "위상", en: "Phase" } }
  showWave: { default: true, label: { kr: "파도 효과", en: "Wave Effect" } }
\`\`\`

## 실생활 속 사인 함수

- **음파**: 소리는 공기의 압력 변화가 사인파 형태로 전달됩니다

## 관련 개념

- [[unit-circle]] — 단위원 위의 점의 y좌표가 사인값입니다`;

export function PromptGenerator({ lang, t, localized }: PromptGeneratorProps) {
  const [conceptName, setConceptName] = useState("");
  const [category, setCategory] = useState("04_functions");
  const [difficulty, setDifficulty] = useState("Middle-2");
  const [animType, setAnimType] = useState("custom");
  const [connections, setConnections] = useState("");
  const [promptLang, setPromptLang] = useState<"kr" | "en">(lang);
  const [copied, setCopied] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const prompt = useMemo(() => {
    const connList = connections
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const connStr = connList.length > 0 ? connList.map((c) => `"${c}"`).join(", ") : "";
    const catLabel = CATEGORIES.find((c) => c.id === category);
    const catName = catLabel ? catLabel.label[promptLang] : category;
    const animLabel = ANIM_TYPES.find((a) => a.id === animType);
    const animName = animLabel ? animLabel.label[promptLang] : animType;

    if (promptLang === "kr") {
      return `PlayGraph 마크다운 파일을 생성해주세요.

## 요구사항
- **개념 이름**: ${conceptName || "(개념 이름을 입력하세요)"}
- **카테고리**: ${catName} (${category})
- **난이도**: ${difficulty}
- **애니메이션 타입**: ${animName}${connList.length > 0 ? `\n- **관련 개념**: ${connList.join(", ")}` : ""}

## 파일 형식 규칙

### YAML Frontmatter (필수)
\`\`\`yaml
---
id: "kebab-case-id"
title: { kr: "한국어 제목", en: "English Title" }
difficulty: "${difficulty}"
connections: [${connStr}]
---
\`\`\`

### 본문 구조 (필수)
1. **제목**: \`# 한국어 제목 / English Title\`
2. **핵심 설명**: 1~2문단으로 개념을 쉽게 설명
3. **수식**: LaTeX 문법 사용 (\`$$수식$$\`)
4. **주요 변수 설명**: 불릿 리스트로 각 변수의 의미 설명
5. **math-anim 블록**: 인터랙티브 애니메이션 정의 (아래 형식)
6. **실생활 예시**: 이 개념이 실생활에서 어디에 쓰이는지 3~4가지
7. **관련 개념**: \`[[concept-id]]\` 형식으로 링크

### math-anim 블록 형식 (필수)
\`\`\`
\`\`\`math-anim
type: animation-type-id
params:
  paramName: { default: 값, min: 최소, max: 최대, step: 간격, label: { kr: "한국어", en: "English" } }
  boolParam: { default: true, label: { kr: "한국어", en: "English" } }
\`\`\`
\`\`\`

#### 파라미터 규칙
- 숫자 파라미터: \`default\`, \`min\`, \`max\`, \`step\`, \`label\` 필수
- 불린 파라미터: \`default\` (true/false), \`label\` 필수
- \`label\`은 반드시 \`{ kr: "...", en: "..." }\` 형식
- 파라미터는 3~6개가 적당

### 기존 애니메이션 타입 (참고)
| type | 설명 | 주요 params |
|------|------|-------------|
| \`sine-wave\` | 사인파 그래프 + 파도 효과 | amplitude, frequency, phase, showWave |
| \`unit-circle\` | 단위원 + sin/cos 투영 + 사인 트레이스 | angle, showProjections, autoRotate, speed |
| \`pythagorean-theorem\` | 직각삼각형 + 넓이 정사각형 + 수식 | sideA, sideB, showSquares, animate |

### 애니메이션 스타일 가이드라인
- 배경: 어두운 캔버스 (다크 테마)
- 색상 팔레트: 파랑(#60a5fa), 초록(#4ade80), 핑크(#f472b6), 노랑(#fbbf24)
- 선 두께: 주요 요소 3~4px, 보조 요소 1~2px
- 글자: bold sans-serif, 검은 그림자(shadowBlur)로 선명하게
- 애니메이션: requestAnimationFrame 기반 부드러운 루프
- 인터랙션: 슬라이더로 실시간 파라미터 조절

## 예시 파일

${EXAMPLE_MD}

위 형식을 정확히 따라서 "${conceptName || "(개념 이름)"}" 에 대한 PlayGraph 마크다운 파일을 생성해주세요.`;
    } else {
      return `Generate a PlayGraph markdown file.

## Requirements
- **Concept name**: ${conceptName || "(enter concept name)"}
- **Category**: ${catName} (${category})
- **Difficulty**: ${difficulty}
- **Animation type**: ${animName}${connList.length > 0 ? `\n- **Related concepts**: ${connList.join(", ")}` : ""}

## File Format Rules

### YAML Frontmatter (required)
\`\`\`yaml
---
id: "kebab-case-id"
title: { kr: "Korean title", en: "English Title" }
difficulty: "${difficulty}"
connections: [${connStr}]
---
\`\`\`

### Body Structure (required)
1. **Title**: \`# Korean Title / English Title\`
2. **Core explanation**: 1-2 paragraphs explaining the concept simply
3. **Formula**: Use LaTeX syntax (\`$$formula$$\`)
4. **Key variables**: Bullet list explaining each variable
5. **math-anim block**: Interactive animation definition (format below)
6. **Real-world examples**: 3-4 examples of where this concept appears in real life
7. **Related concepts**: Link using \`[[concept-id]]\` format

### math-anim Block Format (required)
\`\`\`
\`\`\`math-anim
type: animation-type-id
params:
  paramName: { default: value, min: minimum, max: maximum, step: interval, label: { kr: "Korean", en: "English" } }
  boolParam: { default: true, label: { kr: "Korean", en: "English" } }
\`\`\`
\`\`\`

#### Parameter Rules
- Numeric params: \`default\`, \`min\`, \`max\`, \`step\`, \`label\` required
- Boolean params: \`default\` (true/false), \`label\` required
- \`label\` must be in \`{ kr: "...", en: "..." }\` format
- 3-6 parameters is ideal

### Existing Animation Types (reference)
| type | description | key params |
|------|------------|------------|
| \`sine-wave\` | Sine wave graph + wave effect | amplitude, frequency, phase, showWave |
| \`unit-circle\` | Unit circle + sin/cos projections + sine trace | angle, showProjections, autoRotate, speed |
| \`pythagorean-theorem\` | Right triangle + area squares + formula | sideA, sideB, showSquares, animate |

### Animation Style Guidelines
- Background: dark canvas (dark theme)
- Color palette: blue(#60a5fa), green(#4ade80), pink(#f472b6), yellow(#fbbf24)
- Line width: main elements 3-4px, secondary 1-2px
- Text: bold sans-serif with dark shadow (shadowBlur) for readability
- Animation: smooth requestAnimationFrame loop
- Interaction: real-time parameter control via sliders

## Example File

${EXAMPLE_MD}

Generate a PlayGraph markdown file for "${conceptName || "(concept name)"}" following the exact format above.`;
    }
  }, [conceptName, category, difficulty, animType, connections, promptLang, lang]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="prompt-generator">
      <header className="pg-header">
        <h1>{t("prompt.title")}</h1>
        <p className="pg-desc">{t("prompt.description")}</p>
      </header>

      <div className="pg-form">
        {/* Concept name */}
        <label className="pg-field">
          <span className="pg-label">{t("prompt.conceptName")}</span>
          <input
            type="text"
            className="pg-input"
            placeholder={promptLang === "kr" ? "예: 이차함수" : "e.g. Quadratic Function"}
            value={conceptName}
            onChange={(e) => setConceptName(e.target.value)}
          />
        </label>

        {/* Row: Category + Difficulty */}
        <div className="pg-row">
          <label className="pg-field">
            <span className="pg-label">{t("prompt.category")}</span>
            <select
              className="pg-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {localized(c.label)}
                </option>
              ))}
            </select>
          </label>

          <label className="pg-field">
            <span className="pg-label">{t("prompt.difficulty")}</span>
            <select
              className="pg-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Row: Animation type + Prompt language */}
        <div className="pg-row">
          <label className="pg-field">
            <span className="pg-label">{t("prompt.animType")}</span>
            <select
              className="pg-select"
              value={animType}
              onChange={(e) => setAnimType(e.target.value)}
            >
              {ANIM_TYPES.map((a) => (
                <option key={a.id} value={a.id}>
                  {localized(a.label)}
                </option>
              ))}
            </select>
          </label>

          <label className="pg-field">
            <span className="pg-label">{t("prompt.promptLang")}</span>
            <select
              className="pg-select"
              value={promptLang}
              onChange={(e) => setPromptLang(e.target.value as "kr" | "en")}
            >
              <option value="kr">한국어</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>

        {/* Connections */}
        <label className="pg-field">
          <span className="pg-label">{t("prompt.connections")}</span>
          <input
            type="text"
            className="pg-input"
            placeholder={promptLang === "kr" ? "예: unit-circle, sine-wave" : "e.g. unit-circle, sine-wave"}
            value={connections}
            onChange={(e) => setConnections(e.target.value)}
          />
          <span className="pg-hint">{t("prompt.connectionsHint")}</span>
        </label>
      </div>

      {/* Example toggle */}
      <button
        className="pg-example-toggle"
        onClick={() => setShowExample(!showExample)}
      >
        {showExample ? t("prompt.hideExample") : t("prompt.showExample")}
      </button>

      {showExample && (
        <div className="pg-example">
          <pre><code>{EXAMPLE_MD}</code></pre>
        </div>
      )}

      {/* Generated prompt */}
      <div className="pg-output-header">
        <h2>{t("prompt.generatedPrompt")}</h2>
        <button
          className={`pg-copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          {copied ? t("prompt.copied") : t("prompt.copy")}
        </button>
      </div>
      <div className="pg-output">
        <pre>{prompt}</pre>
      </div>
    </div>
  );
}
