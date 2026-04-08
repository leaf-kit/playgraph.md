import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

const ERAS: Record<string, { color: string; label: string; start: number; end: number }> = {
  "gojoseon-era": { color: "#fbbf24", label: "고조선", start: -2333, end: -108 },
  "three-kingdoms-era": { color: "#60a5fa", label: "삼국시대", start: -57, end: 668 },
  "unified-silla": { color: "#4ade80", label: "통일신라", start: 668, end: 935 },
  "goryeo-dynasty": { color: "#a78bfa", label: "고려", start: 918, end: 1392 },
  "joseon-dynasty": { color: "#f472b6", label: "조선", start: 1392, end: 1897 },
  "japanese-occupation": { color: "#ef4444", label: "일제강점기", start: 1910, end: 1945 },
  "korean-war": { color: "#fb923c", label: "6.25 전쟁", start: 1950, end: 1953 },
  "modern-korea": { color: "#38bdf8", label: "현대", start: 1953, end: 2024 },
};

const ALL_ERAS = Object.values(ERAS);

export function TimelineAnim({ params, animType }: AnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;

    const nums = Object.entries(params).filter(([, v]) => typeof v === "number") as [string, number][];
    const yearParam = nums[0]?.[1] ?? 0;
    const currentEra = ERAS[animType ?? ""] ?? null;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Background grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let gy = 0; gy < h; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }

      // ── Full timeline (top section) ──
      const tlY = 50;
      const tlH = 24;
      const pad = 40;
      const tlW = w - pad * 2;
      const minYear = -2400;
      const maxYear = 2050;
      const totalSpan = maxYear - minYear;
      const toX = (year: number) => pad + ((year - minYear) / totalSpan) * tlW;

      // Timeline axis
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pad, tlY + tlH / 2); ctx.lineTo(pad + tlW, tlY + tlH / 2); ctx.stroke();

      // Tick marks
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      for (let y = -2000; y <= 2000; y += 500) {
        const x = toX(y);
        ctx.beginPath(); ctx.moveTo(x, tlY); ctx.lineTo(x, tlY + tlH); ctx.stroke();
        ctx.fillText(y < 0 ? `${Math.abs(y)}BC` : `${y}`, x, tlY + tlH + 12);
      }

      // Era bars
      ALL_ERAS.forEach((era) => {
        const x1 = toX(era.start);
        const x2 = toX(era.end);
        const isCurrent = currentEra && era.label === currentEra.label;
        const alpha = isCurrent ? 0.5 : 0.15;
        ctx.fillStyle = `rgba(${hexRGB(era.color)},${alpha})`;
        ctx.beginPath();
        ctx.roundRect(x1, tlY + 2, x2 - x1, tlH - 4, 3);
        ctx.fill();
        if (isCurrent) {
          ctx.strokeStyle = era.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Year marker
      const markerX = toX(yearParam);
      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(markerX, tlY - 6);
      ctx.lineTo(markerX - 5, tlY - 14);
      ctx.lineTo(markerX + 5, tlY - 14);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // ── Detail section (below) ──
      const detailY = 100;

      if (currentEra) {
        // Era title
        lbl(ctx, currentEra.label, w / 2, detailY, currentEra.color, 28);
        lbl(ctx, `${currentEra.start < 0 ? "BC " + Math.abs(currentEra.start) : currentEra.start} ~ ${currentEra.end}`, w / 2, detailY + 32, "rgba(255,255,255,0.5)", 14);

        // Animated era bar (large)
        const barY = detailY + 60;
        const barH = 40;
        const eraSpan = currentEra.end - currentEra.start;
        const eraProgress = Math.min(1, (yearParam - currentEra.start) / eraSpan);
        const barW = w * 0.7;
        const barX = (w - barW) / 2;

        // Full bar
        ctx.fillStyle = `rgba(${hexRGB(currentEra.color)},0.1)`;
        ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 8); ctx.fill();
        ctx.strokeStyle = `rgba(${hexRGB(currentEra.color)},0.3)`;
        ctx.lineWidth = 1.5; ctx.stroke();

        // Progress fill
        const fillW = eraProgress * barW;
        ctx.fillStyle = `rgba(${hexRGB(currentEra.color)},0.3)`;
        ctx.beginPath(); ctx.roundRect(barX, barY, fillW, barH, 8); ctx.fill();

        // Current year marker on bar
        const yearX = barX + fillW;
        ctx.fillStyle = currentEra.color;
        ctx.shadowColor = currentEra.color;
        ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(yearX, barY + barH / 2, 8, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        lbl(ctx, yearParam < 0 ? `BC ${Math.abs(yearParam)}` : `AD ${yearParam}`, yearX, barY - 14, currentEra.color, 13);

        // Start/end labels
        lbl(ctx, String(currentEra.start < 0 ? "BC " + Math.abs(currentEra.start) : currentEra.start), barX, barY + barH + 18, "rgba(255,255,255,0.3)", 11);
        lbl(ctx, String(currentEra.end), barX + barW, barY + barH + 18, "rgba(255,255,255,0.3)", 11);

        // Era duration
        lbl(ctx, `${eraSpan}년간`, barX + barW / 2, barY + barH + 18, "rgba(255,255,255,0.4)", 12);

        // ── All eras list (bottom) ──
        const listY = barY + barH + 50;
        const eraW = (w - 80) / ALL_ERAS.length;
        ALL_ERAS.forEach((era, i) => {
          const ex = 40 + i * eraW;
          const isCurr = era.label === currentEra.label;
          const pulse = isCurr ? 0.8 + 0.2 * Math.sin(t * 3) : 0.6;

          ctx.fillStyle = `rgba(${hexRGB(era.color)},${isCurr ? 0.35 : 0.1})`;
          ctx.beginPath(); ctx.roundRect(ex + 2, listY, eraW - 4, 50, 6); ctx.fill();
          if (isCurr) {
            ctx.strokeStyle = era.color; ctx.lineWidth = 2; ctx.stroke();
          }
          lbl(ctx, era.label, ex + eraW / 2, listY + 18, `rgba(255,255,255,${pulse})`, 10);
          lbl(ctx, `${Math.abs(era.end - era.start)}년`, ex + eraW / 2, listY + 36, "rgba(255,255,255,0.3)", 9);
        });
      }

      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [params, animType]);

  return <canvas ref={canvasRef} className="anim-canvas" style={{ width: "100%", height: "380px" }} />;
}

function lbl(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, c: string, s: number, a: CanvasTextAlign = "center") {
  ctx.font = `bold ${s}px sans-serif`; ctx.textAlign = a; ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = 4; ctx.fillStyle = c; ctx.fillText(t, x, y); ctx.shadowBlur = 0;
}
function hexRGB(hex: string): string {
  return `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;
}
