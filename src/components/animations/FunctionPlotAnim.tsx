import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

export function FunctionPlotAnim({ params }: AnimationProps) {
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
    const showExtra = bools[0]?.[1] ?? true;

    const pad = 50;
    const plotW = w - pad * 2;
    const plotH = h - pad * 2;
    const cx = pad + plotW / 2;
    const cy = pad + plotH / 2;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let gx = pad; gx <= pad + plotW; gx += gridStep) { ctx.beginPath(); ctx.moveTo(gx, pad); ctx.lineTo(gx, pad + plotH); ctx.stroke(); }
      for (let gy = pad; gy <= pad + plotH; gy += gridStep) { ctx.beginPath(); ctx.moveTo(pad, gy); ctx.lineTo(pad + plotW, gy); ctx.stroke(); }

      // Axes
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pad, cy); ctx.lineTo(pad + plotW, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, pad); ctx.lineTo(cx, pad + plotH); ctx.stroke();

      // Axis labels
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("x", pad + plotW - 5, cy + 16);
      ctx.fillText("y", cx + 14, pad + 10);

      // Tick marks
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.font = "10px monospace";
      for (let i = -4; i <= 4; i++) {
        if (i === 0) continue;
        const tx = cx + (i / 4) * (plotW / 2);
        ctx.fillText(String(i), tx, cy + 14);
        const ty = cy - (i / 4) * (plotH / 2);
        ctx.textAlign = "right";
        ctx.fillText(String(i), cx - 8, ty + 3);
        ctx.textAlign = "center";
      }

      // Use params to shape the curve
      const a = nums[0]?.[1] ?? 1;
      const b = nums[1]?.[1] ?? 0;
      const c = nums[2]?.[1] ?? 0;
      const scaleX = plotW / 8; // -4 to 4
      const scaleY = plotH / 8;

      // Main curve
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      let first = true;
      for (let px = 0; px <= plotW; px++) {
        const x = (px - plotW / 2) / scaleX;
        const y = a * x * x + b * x + c; // Generic polynomial
        const sy = cy - y * scaleY;
        if (sy < pad - 20 || sy > pad + plotH + 20) { first = true; continue; }
        if (first) { ctx.moveTo(pad + px, sy); first = false; }
        else ctx.lineTo(pad + px, sy);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Animated tracing dot
      const dotProgress = (t * 0.3) % 1;
      const dotPx = dotProgress * plotW;
      const dotX = (dotPx - plotW / 2) / scaleX;
      const dotY = a * dotX * dotX + b * dotX + c;
      const dotSy = cy - dotY * scaleY;
      if (dotSy > pad - 10 && dotSy < pad + plotH + 10) {
        ctx.fillStyle = "#fbbf24";
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(pad + dotPx, dotSy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Coordinate label
        if (showExtra) {
          lbl(ctx, `(${dotX.toFixed(1)}, ${dotY.toFixed(1)})`, pad + dotPx, dotSy - 18, "#fbbf24", 11);
        }
      }

      // Tangent line at dot if showExtra
      if (showExtra && dotSy > pad && dotSy < pad + plotH) {
        const slope = 2 * a * dotX + b;
        ctx.strokeStyle = "rgba(244,114,182,0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        const len = 60;
        ctx.beginPath();
        ctx.moveTo(pad + dotPx - len, dotSy + slope * len / scaleX * scaleY);
        ctx.lineTo(pad + dotPx + len, dotSy - slope * len / scaleX * scaleY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Roots (where y=0)
      const disc = b * b - 4 * a * c;
      if (disc >= 0 && Math.abs(a) > 0.01) {
        const r1 = (-b + Math.sqrt(disc)) / (2 * a);
        const r2 = (-b - Math.sqrt(disc)) / (2 * a);
        for (const r of [r1, r2]) {
          const rx = cx + r * scaleX;
          if (rx > pad && rx < pad + plotW) {
            ctx.fillStyle = "#f472b6";
            ctx.beginPath();
            ctx.arc(rx, cy, 5, 0, Math.PI * 2);
            ctx.fill();
            lbl(ctx, r.toFixed(1), rx, cy + 18, "#f9a8d4", 11);
          }
        }
      }

      // Param legend (top-left)
      nums.forEach(([key, val], i) => {
        const colors = ["#93c5fd", "#86efac", "#f9a8d4", "#fde68a"];
        lbl(ctx, `${key} = ${val.toFixed(2)}`, pad + 8, pad + 16 + i * 20, colors[i % 4], 12, "left");
      });

      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [params]);

  return <canvas ref={canvasRef} className="anim-canvas" style={{ width: "100%", height: "380px" }} />;
}

function lbl(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, size: number, align: CanvasTextAlign = "center") {
  ctx.font = `bold ${size}px sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur = 4;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.shadowBlur = 0;
}
