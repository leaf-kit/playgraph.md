import { useEffect, useRef, useMemo, useState } from "react";
import katex from "katex";
import mermaid from "mermaid";
import { AnimationStage } from "./AnimationStage";
import type { MathAnimBlock, Lang, LocalizedText } from "../lib/types";

function ensureMermaidInit() {
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    suppressErrorRendering: true,
    fontFamily: "sans-serif",
    fontSize: 14,
    themeVariables: {
      darkMode: true,
      background: "transparent",
      primaryColor: "#1e3a5f",
      primaryTextColor: "#e2e8f0",
      primaryBorderColor: "#60a5fa",
      lineColor: "#94a3b8",
      secondaryColor: "#1e2030",
      tertiaryColor: "#252840",
      noteBkgColor: "#1e2030",
      noteTextColor: "#e2e8f0",
      actorTextColor: "#e2e8f0",
      actorBorder: "#60a5fa",
      signalColor: "#e2e8f0",
      labelTextColor: "#e2e8f0",
      edgeLabelBackground: "#161822",
      clusterBkg: "#1e2030",
      clusterBorder: "#334155",
      titleColor: "#e2e8f0",
    },
    flowchart: { htmlLabels: false, curve: "basis", nodeSpacing: 30, rankSpacing: 50, padding: 15 },
    sequence: { mirrorActors: false, messageMargin: 40 },
  });
}

interface MarkdownRendererProps {
  html: string;
  animations: MathAnimBlock[];
  mermaidBlocks: string[];
  lang: Lang;
  localized: (text: LocalizedText) => string;
}

// Render KaTeX on the HTML string directly (not DOM-based)
function renderKatexInHtml(html: string): string {
  // Block math: $$...$$
  let result = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex: string) => {
    try {
      return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return `<span class="math-error">${tex}</span>`;
    }
  });

  // Inline math: $...$
  result = result.replace(/\$([^$\n]+?)\$/g, (_, tex: string) => {
    try {
      return katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return `<span class="math-error">${tex}</span>`;
    }
  });

  return result;
}

let mermaidCounter = 0;

function MermaidBlock({ source }: { source: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current || !source.trim()) return;
    let cancelled = false;
    ensureMermaidInit();
    const id = `mmd-${Date.now()}-${++mermaidCounter}`;
    document.querySelectorAll(`#d${id}, #${id}`).forEach((el) => el.remove());

    (async () => {
      try {
        const { svg } = await mermaid.render(id, source.trim());
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setError(null);
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.removeAttribute("height");
            svgEl.style.width = "100%";
            svgEl.style.maxWidth = "100%";
            svgEl.style.height = "auto";
            svgEl.style.minHeight = "120px";
          }
        }
      } catch (e) {
        document.querySelectorAll(`#d${id}, #${id}`).forEach((el) => el.remove());
        if (!cancelled) setError(String(e));
      }
    })();

    return () => { cancelled = true; };
  }, [source]);

  if (error) {
    return (
      <div className="mermaid-block mermaid-block-error">
        <pre className="mermaid-error">{source}</pre>
        <p className="mermaid-error-msg">Mermaid render failed</p>
      </div>
    );
  }

  return <div ref={ref} className="mermaid-block" />;
}

export function MarkdownRenderer({
  html,
  animations,
  mermaidBlocks,
  lang,
  localized,
}: MarkdownRendererProps) {
  // Split by anim and mermaid placeholders
  const parts = useMemo(() => {
    return html.split(
      /(<div (?:data-math-anim="[^"]*" data-anim-index="\d+"|class="mermaid-block" data-mermaid-index="\d+")><\/div>)/
    );
  }, [html]);

  // Pre-render KaTeX on all HTML parts (string-level, not DOM)
  const renderedParts = useMemo(() => {
    return parts.map((part) => {
      // Skip placeholder divs
      if (part.includes("data-math-anim") || part.includes("data-mermaid-index")) {
        return part;
      }
      return renderKatexInHtml(part);
    });
  }, [parts]);

  return (
    <div className="markdown-body">
      {renderedParts.map((part, i) => {
        const animMatch = part.match(/data-math-anim="([^"]*)" data-anim-index="(\d+)"/);
        if (animMatch) {
          const index = parseInt(animMatch[2], 10);
          const anim = animations[index];
          if (anim) return <AnimationStage key={`anim-${index}`} block={anim} lang={lang} localized={localized} />;
        }

        const mermaidMatch = part.match(/data-mermaid-index="(\d+)"/);
        if (mermaidMatch) {
          const index = parseInt(mermaidMatch[1], 10);
          const source = mermaidBlocks[index];
          if (source) return <MermaidBlock key={`mermaid-${index}-${source.length}`} source={source} />;
        }

        return <div key={`html-${i}`} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </div>
  );
}
