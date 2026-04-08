import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

export function BlockGridAnim({ params }: AnimationProps) {
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

    const valA = nums[0]?.[1] ?? 4;
    const valB = nums[1]?.[1] ?? 3;
    const showExtra = bools[0]?.[1] ?? true;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Grid background
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let gy = 0; gy < h; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
      for (let gx = 0; gx < w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }

      const a = Math.max(1, Math.round(Math.abs(valA)));
      const b = Math.max(1, Math.round(Math.abs(valB)));
      const maxCells = Math.max(a, b, 1);
      const cellSize = Math.min((w * 0.4) / maxCells, (h - 100) / maxCells, 50);
      // Group A (left)
      const gAx = w * 0.22 - (a * cellSize) / 2;
      const gAy = h * 0.5 - (a * cellSize) / 2;
      for (let r = 0; r < a; r++) {
        for (let c = 0; c < (nums.length > 2 ? a : 1); c++) {
          const cx = gAx + c * cellSize;
          const cy = gAy + r * cellSize;
          const delay = (r + c) * 0.08;
          const appear = Math.min(1, Math.max(0, (t - delay) * 2));
          const pulse = 0.8 + 0.2 * Math.sin(t * 2 + r + c);
          ctx.fillStyle = `rgba(96,165,250,${0.15 * appear * pulse})`;
          ctx.fillRect(cx, cy, cellSize - 2, cellSize - 2);
          ctx.strokeStyle = `rgba(96,165,250,${0.5 * appear})`;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(cx, cy, cellSize - 2, cellSize - 2);
        }
      }
      label(ctx, `${nums[0]?.[0] ?? "A"} = ${valA}`, w * 0.22, gAy - 16, "#93c5fd", 16);

      // Group B (right)
      const gBx = w * 0.58 - (b * cellSize) / 2;
      const gBy = h * 0.5 - (b * cellSize) / 2;
      for (let r = 0; r < b; r++) {
        for (let c = 0; c < (nums.length > 2 ? b : 1); c++) {
          const cx = gBx + c * cellSize;
          const cy = gBy + r * cellSize;
          const delay = (r + c) * 0.08 + 0.5;
          const appear = Math.min(1, Math.max(0, (t - delay) * 2));
          const pulse = 0.8 + 0.2 * Math.sin(t * 2 + r + c + 1);
          ctx.fillStyle = `rgba(74,222,128,${0.15 * appear * pulse})`;
          ctx.fillRect(cx, cy, cellSize - 2, cellSize - 2);
          ctx.strokeStyle = `rgba(74,222,128,${0.5 * appear})`;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(cx, cy, cellSize - 2, cellSize - 2);
        }
      }
      label(ctx, `${nums[1]?.[0] ?? "B"} = ${valB}`, w * 0.58, gBy - 16, "#86efac", 16);

      // Result area (bottom)
      if (showExtra && nums.length >= 2) {
        const result = valA + valB;
        const rBarW = Math.min(w * 0.7, Math.abs(result) * 12);
        const ry = h - 50;
        ctx.fillStyle = "rgba(244,114,182,0.2)";
        ctx.beginPath();
        ctx.roundRect(w / 2 - rBarW / 2, ry - 12, rBarW, 24, 6);
        ctx.fill();
        ctx.strokeStyle = "rgba(244,114,182,0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        label(ctx, `= ${result.toFixed(1)}`, w / 2, ry, "#f9a8d4", 18);
      }

      // Operator symbol
      label(ctx, "+", w * 0.4, h * 0.5, "rgba(255,255,255,0.3)", 28);

      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [params]);

  return <canvas ref={canvasRef} className="anim-canvas" style={{ width: "100%", height: "360px" }} />;
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, size: number) {
  ctx.font = `bold ${size}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur = 4;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.shadowBlur = 0;
}
