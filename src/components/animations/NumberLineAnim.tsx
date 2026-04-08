import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

export function NumberLineAnim({ params }: AnimationProps) {
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

    const posA = nums[0]?.[1] ?? 3;
    const posB = nums[1]?.[1] ?? 7;
    const range = nums[2]?.[1] ?? 10;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let gy = 0; gy < h; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }

      const pad = 60;
      const lineY = h * 0.45;
      const lineW = w - pad * 2;
      const minV = -Math.abs(range);
      const maxV = Math.abs(range);
      const totalRange = maxV - minV;

      const toX = (v: number) => pad + ((v - minV) / totalRange) * lineW;

      // Main line
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pad - 10, lineY);
      ctx.lineTo(pad + lineW + 10, lineY);
      ctx.stroke();

      // Arrow heads
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.beginPath(); ctx.moveTo(pad + lineW + 16, lineY); ctx.lineTo(pad + lineW + 8, lineY - 5); ctx.lineTo(pad + lineW + 8, lineY + 5); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(pad - 16, lineY); ctx.lineTo(pad - 8, lineY - 5); ctx.lineTo(pad - 8, lineY + 5); ctx.closePath(); ctx.fill();

      // Tick marks
      const step = totalRange <= 10 ? 1 : totalRange <= 20 ? 2 : 5;
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      for (let v = Math.ceil(minV / step) * step; v <= maxV; v += step) {
        const x = toX(v);
        const isZero = v === 0;
        ctx.strokeStyle = isZero ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)";
        ctx.lineWidth = isZero ? 2 : 1;
        ctx.beginPath(); ctx.moveTo(x, lineY - 8); ctx.lineTo(x, lineY + 8); ctx.stroke();
        ctx.fillStyle = isZero ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)";
        ctx.fillText(String(v), x, lineY + 22);
      }

      // Point A
      const ax = toX(posA);
      const pulse = 0.8 + 0.2 * Math.sin(t * 3);
      ctx.fillStyle = "#60a5fa";
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(ax, lineY, 8 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      lbl(ctx, `${nums[0]?.[0] ?? "A"} = ${posA.toFixed(1)}`, ax, lineY - 28, "#93c5fd", 14);

      // Point B (if exists)
      if (nums.length >= 2) {
        const bx = toX(posB);
        ctx.fillStyle = "#4ade80";
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(bx, lineY, 8 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        lbl(ctx, `${nums[1]?.[0] ?? "B"} = ${posB.toFixed(1)}`, bx, lineY - 28, "#86efac", 14);

        // Distance line between A and B
        if (showExtra) {
          const leftX = Math.min(ax, bx);
          const rightX = Math.max(ax, bx);
          const distY = lineY + 44;
          ctx.strokeStyle = "rgba(244,114,182,0.5)";
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(leftX, distY); ctx.lineTo(rightX, distY); ctx.stroke();
          // End caps
          ctx.beginPath(); ctx.moveTo(leftX, distY - 5); ctx.lineTo(leftX, distY + 5); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(rightX, distY - 5); ctx.lineTo(rightX, distY + 5); ctx.stroke();

          const dist = Math.abs(posA - posB);
          lbl(ctx, `|d| = ${dist.toFixed(1)}`, (leftX + rightX) / 2, distY + 18, "#f9a8d4", 13);

          // Animated arrow from A to B
          const progress = (t * 0.5) % 1;
          const dotX = ax + (bx - ax) * progress;
          ctx.fillStyle = "#fbbf24";
          ctx.shadowColor = "#fbbf24";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(dotX, lineY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [params]);

  return <canvas ref={canvasRef} className="anim-canvas" style={{ width: "100%", height: "300px" }} />;
}

function lbl(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, c: string, s: number, a: CanvasTextAlign = "center") {
  ctx.font = `bold ${s}px sans-serif`; ctx.textAlign = a; ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = 4; ctx.fillStyle = c; ctx.fillText(t, x, y); ctx.shadowBlur = 0;
}
