import { writeFileSync } from "fs";
import { join } from "path";
const LIB = join(import.meta.dirname, "..", "library");

function md({ cat, id, kr, en, diff, conn, formula, desc_kr, desc_en, params, real, extra }) {
  const connStr = conn.map(x => `"${x}"`).join(", ");
  const paramLines = Object.entries(params).map(([k, v]) => {
    if (typeof v.d === "boolean") return `  ${k}: { default: ${v.d}, label: { kr: "${v.kr}", en: "${v.en}" } }`;
    return `  ${k}: { default: ${v.d}, min: ${v.min}, max: ${v.max}, step: ${v.step}, label: { kr: "${v.kr}", en: "${v.en}" } }`;
  }).join("\n");
  const realList = real.map(r => `- **${r}**`).join("\n");
  const extraS = extra ? `\n## 핵심 정리\n\n> ${extra}\n` : "";
  return `---
id: "${id}"
title: { kr: "${kr}", en: "${en}" }
difficulty: "${diff}"
connections: [${connStr}]
---

# ${kr} / ${en}

${desc_kr}

${desc_en}
${formula ? `\n${formula}\n` : ""}
\`\`\`math-anim
type: ${id}
params:
${paramLines}
\`\`\`

## 실생활 활용

${realList}
${extraS}`;
}

const items = [
  // ── 한국사 연표 (8개) ──
  { cat: "07_korean_history", id: "gojoseon-era", kr: "고조선 시대", en: "Gojoseon Era", diff: "Middle-1", conn: ["three-kingdoms-era"], formula: "", desc_kr: "한반도 최초의 국가로 단군왕검이 BC 2333년에 건국한 것으로 전해집니다.", desc_en: "The first Korean kingdom, traditionally founded by Dangun in 2333 BC.", params: { year: { d: -2333, min: -2333, max: -108, step: 100, kr: "연도 (BC)", en: "Year (BC)" }, showEvents: { d: true, kr: "주요 사건", en: "Show Events" } }, real: ["단군 신화", "청동기 문화", "위만조선"], extra: "BC 2333 ~ BC 108" },
  { cat: "07_korean_history", id: "three-kingdoms-era", kr: "삼국시대", en: "Three Kingdoms", diff: "Middle-1", conn: ["gojoseon-era", "unified-silla"], formula: "", desc_kr: "고구려, 백제, 신라 세 나라가 한반도에서 경쟁하며 발전한 시대입니다.", desc_en: "The era of Goguryeo, Baekje, and Silla competing on the Korean Peninsula.", params: { year: { d: 300, min: 57, max: 668, step: 50, kr: "연도", en: "Year" }, showMap: { d: true, kr: "영토 보기", en: "Show Territory" } }, real: ["광개토대왕의 정복", "백제의 해상 무역", "신라의 화랑도"], extra: "BC 57 ~ AD 668" },
  { cat: "07_korean_history", id: "unified-silla", kr: "통일신라", en: "Unified Silla", diff: "Middle-2", conn: ["three-kingdoms-era", "goryeo-dynasty"], formula: "", desc_kr: "신라가 삼국을 통일하고 불교 문화가 꽃핀 시대입니다.", desc_en: "Silla unified the three kingdoms, and Buddhist culture flourished.", params: { year: { d: 700, min: 668, max: 935, step: 20, kr: "연도", en: "Year" }, showCulture: { d: true, kr: "문화유산", en: "Cultural Heritage" } }, real: ["불국사와 석굴암", "성덕대왕신종", "장보고의 해상 무역"], extra: "668 ~ 935" },
  { cat: "07_korean_history", id: "goryeo-dynasty", kr: "고려시대", en: "Goryeo Dynasty", diff: "Middle-2", conn: ["unified-silla", "joseon-dynasty"], formula: "", desc_kr: "고려는 918년 왕건이 건국했으며 금속활자와 고려청자로 유명합니다.", desc_en: "Goryeo was founded in 918 by Wang Geon, famous for metal type printing and celadon.", params: { year: { d: 1050, min: 918, max: 1392, step: 25, kr: "연도", en: "Year" }, showEvents: { d: true, kr: "주요 사건", en: "Show Events" } }, real: ["팔만대장경", "고려청자", "몽골 침입과 항쟁"], extra: "918 ~ 1392" },
  { cat: "07_korean_history", id: "joseon-dynasty", kr: "조선시대", en: "Joseon Dynasty", diff: "Middle-2", conn: ["goryeo-dynasty", "japanese-occupation"], formula: "", desc_kr: "1392년 이성계가 건국한 조선은 500년간 유교 문화를 발전시켰습니다.", desc_en: "Joseon, founded in 1392 by Yi Seong-gye, developed Confucian culture for 500 years.", params: { year: { d: 1446, min: 1392, max: 1897, step: 25, kr: "연도", en: "Year" }, showKing: { d: true, kr: "왕 보기", en: "Show King" } }, real: ["한글 창제 (1443)", "임진왜란 (1592)", "실학 운동"], extra: "1392 ~ 1897" },
  { cat: "07_korean_history", id: "japanese-occupation", kr: "일제강점기", en: "Japanese Occupation", diff: "Middle-3", conn: ["joseon-dynasty", "korean-war"], formula: "", desc_kr: "1910년부터 1945년까지 일본의 식민 지배를 받은 시기입니다.", desc_en: "The period from 1910 to 1945 when Korea was under Japanese colonial rule.", params: { year: { d: 1919, min: 1910, max: 1945, step: 5, kr: "연도", en: "Year" }, showMovement: { d: true, kr: "독립운동", en: "Independence Movement" } }, real: ["3.1 운동 (1919)", "대한민국 임시정부", "8.15 광복 (1945)"], extra: "1910 ~ 1945" },
  { cat: "07_korean_history", id: "korean-war", kr: "6.25 전쟁", en: "Korean War", diff: "Middle-3", conn: ["japanese-occupation", "modern-korea"], formula: "", desc_kr: "1950년 북한의 남침으로 시작된 전쟁으로 1953년 휴전 협정이 체결되었습니다.", desc_en: "The war that began in 1950 with North Korea's invasion, ending with an armistice in 1953.", params: { year: { d: 1951, min: 1950, max: 1953, step: 1, kr: "연도", en: "Year" }, showBattle: { d: true, kr: "주요 전투", en: "Major Battles" } }, real: ["인천상륙작전", "흥남철수", "판문점 휴전"], extra: "1950 ~ 1953" },
  { cat: "07_korean_history", id: "modern-korea", kr: "현대 대한민국", en: "Modern Korea", diff: "Middle-3", conn: ["korean-war"], formula: "", desc_kr: "전쟁 이후 산업화와 민주화를 이루며 세계적인 경제 강국으로 성장했습니다.", desc_en: "After the war, Korea achieved industrialization and democratization, becoming a global economic power.", params: { year: { d: 1988, min: 1953, max: 2024, step: 5, kr: "연도", en: "Year" }, showGrowth: { d: true, kr: "경제 성장", en: "Economic Growth" } }, real: ["한강의 기적", "88 서울 올림픽", "K-Pop과 한류"], extra: "1953 ~ 현재" },

  // ── 초등 도형의 넓이 (4개) ──
  { cat: "01_elementary_math", id: "area-triangle", kr: "삼각형의 넓이", en: "Triangle Area", diff: "Elementary", conn: ["area-rectangle"], formula: "$$S = \\frac{1}{2} \\times b \\times h$$", desc_kr: "삼각형의 넓이는 밑변 곱하기 높이의 반입니다.", desc_en: "The area of a triangle is half of base times height.", params: { base: { d: 6, min: 1, max: 12, step: 0.5, kr: "밑변", en: "Base" }, height: { d: 4, min: 1, max: 10, step: 0.5, kr: "높이", en: "Height" }, showGrid: { d: true, kr: "격자 보기", en: "Show Grid" } }, real: ["지붕 면적", "삼각김밥 크기", "돛의 면적"] },
  { cat: "01_elementary_math", id: "area-parallelogram", kr: "평행사변형의 넓이", en: "Parallelogram Area", diff: "Elementary", conn: ["area-rectangle", "area-triangle"], formula: "$$S = b \\times h$$", desc_kr: "평행사변형의 넓이는 밑변 곱하기 높이입니다.", desc_en: "The area of a parallelogram is base times height.", params: { base: { d: 6, min: 1, max: 12, step: 0.5, kr: "밑변", en: "Base" }, height: { d: 4, min: 1, max: 10, step: 0.5, kr: "높이", en: "Height" }, slant: { d: 2, min: 0, max: 5, step: 0.5, kr: "기울기", en: "Slant" }, showTransform: { d: true, kr: "변환 보기", en: "Show Transform" } }, real: ["타일 모양", "보석 컷팅", "직물 패턴"] },
  { cat: "01_elementary_math", id: "area-trapezoid", kr: "사다리꼴의 넓이", en: "Trapezoid Area", diff: "Elementary", conn: ["area-rectangle", "area-triangle"], formula: "$$S = \\frac{1}{2} \\times (a + b) \\times h$$", desc_kr: "사다리꼴의 넓이는 윗변과 아랫변의 합에 높이를 곱하고 2로 나눕니다.", desc_en: "The area of a trapezoid is half of the sum of parallel sides times height.", params: { topBase: { d: 3, min: 1, max: 10, step: 0.5, kr: "윗변", en: "Top Base" }, bottomBase: { d: 6, min: 1, max: 12, step: 0.5, kr: "아랫변", en: "Bottom Base" }, height: { d: 4, min: 1, max: 10, step: 0.5, kr: "높이", en: "Height" }, showDecompose: { d: true, kr: "분해 보기", en: "Decompose" } }, real: ["제방 단면", "다리 기둥", "사다리꼴 테이블"] },
  { cat: "01_elementary_math", id: "area-circle", kr: "원의 넓이", en: "Circle Area", diff: "Elementary", conn: ["circle-properties"], formula: "$$S = \\pi r^2$$", desc_kr: "원의 넓이는 반지름의 제곱에 원주율(π)을 곱한 값입니다.", desc_en: "The area of a circle is pi times the radius squared.", params: { radius: { d: 4, min: 1, max: 8, step: 0.5, kr: "반지름", en: "Radius" }, showPi: { d: true, kr: "π 시각화", en: "Visualize π" }, animate: { d: true, kr: "애니메이션", en: "Animate" } }, real: ["피자 크기", "원형 화단", "바퀴 면적"] },
];

let count = 0;
for (const c of items) {
  const filePath = join(LIB, c.cat, `${c.id}.md`);
  writeFileSync(filePath, md(c), "utf-8");
  count++;
}
console.log(`Generated ${count} extra files.`);
