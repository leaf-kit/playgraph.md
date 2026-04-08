import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

const COLORS = ["#60a5fa", "#4ade80", "#f472b6", "#fbbf24", "#a78bfa", "#38bdf8", "#fb923c"];

export function BarChartAnim({ params }: AnimationProps) {
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
    const bools = Object.entries(params).filter(([, v]) => typeof v === "boolean") as [string, boolean][];
    const animate = bools.find(([k]) => k.toLowerCase().includes("anim"))?.[1] ?? true;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Background
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let gy = 0; gy < h; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }

      if (nums.length === 0) { animRef.current = requestAnimationFrame(draw); return; }

      const maxVal = Math.max(...nums.map(([, v]) => Math.abs(v)), 1);
      const pad = 50;
      const barArea = { x: pad, y: pad, w: w - pad * 2, h: h - pad * 2 - 20 };
      const barGap = 12;
      const barW = Math.min(60, (barArea.w - barGap * (nums.length + 1)) / nums.length);
      const totalW = nums.length * barW + (nums.length - 1) * barGap;
      const startX = barArea.x + (barArea.w - totalW) / 2;
      const baseY = barArea.y + barArea.h;

      // Baseline
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(barArea.x, baseY);
      ctx.lineTo(barArea.x + barArea.w, baseY);
      ctx.stroke();

      // Horizontal guide lines
      for (let i = 1; i <= 4; i++) {
        const gy = baseY - (i / 4) * barArea.h;
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.beginPath(); ctx.moveTo(barArea.x, gy); ctx.lineTo(barArea.x + barArea.w, gy); ctx.stroke();
      }

      // Bars
      const mean = nums.reduce((s, [, v]) => s + v, 0) / nums.length;

      nums.forEach(([key, val], i) => {
        const color = COLORS[i % COLORS.length];
        const norm = Math.abs(val) / maxVal;
        const growT = animate ? Math.min(1, (t - i * 0.15) * 1.5) : 1;
        const grow = Math.max(0, growT);
        const barH = norm * barArea.h * 0.85 * grow;
        const bx = startX + i * (barW + barGap);
        const by = baseY - barH;
        const pulse = animate ? 0.9 + 0.1 * Math.sin(t * 2.5 + i) : 1;

        // Bar fill
        ctx.fillStyle = hexRgba(color, 0.3 * pulse);
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, barH, [6, 6, 0, 0]);
        ctx.fill();

        // Bar border
        ctx.strokeStyle = hexRgba(color, 0.7);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, barH, [6, 6, 0, 0]);
        ctx.stroke();

        // Glow dot on top
        if (animate) {
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(bx + barW / 2, by - 2, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Value label
        lbl(ctx, val.toFixed(1), bx + barW / 2, by - 16, color, 14);

        // Key label
        const short = key.length > 7 ? key.slice(0, 6) + "…" : key;
        lbl(ctx, short, bx + barW / 2, baseY + 16, "rgba(255,255,255,0.4)", 10);
      });

      // Mean line
      if (nums.length > 1) {
        const meanY = baseY - (Math.abs(mean) / maxVal) * barArea.h * 0.85;
        ctx.strokeStyle = "rgba(251,191,36,0.5)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(startX - 10, meanY);
        ctx.lineTo(startX + totalW + 10, meanY);
        ctx.stroke();
        ctx.setLineDash([]);
        lbl(ctx, `avg ${mean.toFixed(1)}`, startX + totalW + 15, meanY, "#fbbf24", 11, "left");
      }

      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [params]);

  return <canvas ref={canvasRef} className="anim-canvas" style={{ width: "100%", height: "360px" }} />;
}

function lbl(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, c: string, s: number, a: CanvasTextAlign = "center") {
  ctx.font = `bold ${s}px sans-serif`; ctx.textAlign = a; ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = 4; ctx.fillStyle = c; ctx.fillText(t, x, y); ctx.shadowBlur = 0;
}
function hexRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
