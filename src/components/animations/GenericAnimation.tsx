import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

// Color palette for parameters
const COLORS = [
  "#60a5fa", // blue
  "#4ade80", // green
  "#f472b6", // pink
  "#fbbf24", // yellow
  "#a78bfa", // purple
  "#38bdf8", // cyan
  "#fb923c", // orange
  "#e879f9", // magenta
];

export function GenericAnimation({ params }: AnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Separate numeric and boolean params
    const numericParams: { key: string; value: number }[] = [];
    const boolParams: { key: string; value: boolean }[] = [];

    for (const [key, val] of Object.entries(params)) {
      if (typeof val === "boolean") {
        boolParams.push({ key, value: val });
      } else if (typeof val === "number") {
        numericParams.push({ key, value: val });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // ── Background grid ──
      ctx!.strokeStyle = "rgba(255,255,255,0.03)";
      ctx!.lineWidth = 1;
      for (let gy = 0; gy < h; gy += 40) {
        ctx!.beginPath();
        ctx!.moveTo(0, gy);
        ctx!.lineTo(w, gy);
        ctx!.stroke();
      }
      for (let gx = 0; gx < w; gx += 40) {
        ctx!.beginPath();
        ctx!.moveTo(gx, 0);
        ctx!.lineTo(gx, h);
        ctx!.stroke();
      }

      const numCount = numericParams.length;
      if (numCount === 0) {
        // No numeric params — just show a pulsing circle
        const pulse = 0.8 + 0.2 * Math.sin(t * 2);
        ctx!.fillStyle = `rgba(96, 165, 250, ${0.15 * pulse})`;
        ctx!.beginPath();
        ctx!.arc(w / 2, h / 2, 60 * pulse, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.strokeStyle = "#60a5fa";
        ctx!.lineWidth = 2;
        ctx!.stroke();

        drawLabel(ctx!, "Interactive", w / 2, h / 2, "rgba(255,255,255,0.4)", 16);
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // ── Layout: left half = radial/bar visualization, right half = wave plot ──
      const leftW = w * 0.45;
      const rightX = w * 0.52;
      const rightW = w * 0.44;

      // Find max absolute value for normalization
      const maxVal = Math.max(...numericParams.map((p) => Math.abs(p.value)), 1);

      // ═══════════════════════════════════
      // LEFT: Animated bar chart + radial
      // ═══════════════════════════════════
      const barAreaTop = 30;
      const barAreaH = h - 60;
      const barGap = 8;
      const barW = Math.min(
        50,
        (leftW - barGap * (numCount + 1)) / numCount
      );
      const totalBarsW = numCount * barW + (numCount - 1) * barGap;
      const barStartX = (leftW - totalBarsW) / 2;

      for (let i = 0; i < numCount; i++) {
        const p = numericParams[i];
        const color = COLORS[i % COLORS.length];
        const norm = Math.abs(p.value) / maxVal;
        const barH = norm * (barAreaH * 0.7);
        const bx = barStartX + i * (barW + barGap);
        const baseY = barAreaTop + barAreaH * 0.85;

        // Animated grow
        const animNorm = Math.min(1, t * 0.8);
        const animBarH = barH * animNorm;

        // Glow
        const pulse = 0.7 + 0.3 * Math.sin(t * 2 + i * 0.8);

        // Bar
        ctx!.fillStyle = hexToRgba(color, 0.25 + 0.15 * pulse);
        ctx!.beginPath();
        ctx!.roundRect(bx, baseY - animBarH, barW, animBarH, 4);
        ctx!.fill();

        // Bar border
        ctx!.strokeStyle = hexToRgba(color, 0.6);
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.roundRect(bx, baseY - animBarH, barW, animBarH, 4);
        ctx!.stroke();

        // Floating particle on top of bar
        const particleY =
          baseY - animBarH - 8 + 4 * Math.sin(t * 3 + i * 1.2);
        ctx!.fillStyle = color;
        ctx!.shadowColor = color;
        ctx!.shadowBlur = 10;
        ctx!.beginPath();
        ctx!.arc(bx + barW / 2, particleY, 4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;

        // Value label (above bar)
        drawLabel(
          ctx!,
          p.value.toFixed(1),
          bx + barW / 2,
          baseY - animBarH - 22,
          color,
          13
        );

        // Key label (below bar)
        const shortKey =
          p.key.length > 8 ? p.key.slice(0, 7) + "…" : p.key;
        drawLabel(ctx!, shortKey, bx + barW / 2, baseY + 16, "rgba(255,255,255,0.4)", 10);
      }

      // ═══════════════════════════════════
      // RIGHT: Animated wave plot using params
      // ═══════════════════════════════════
      const plotTop = 40;
      const plotH = h - 80;
      const plotMidY = plotTop + plotH / 2;

      // Axes
      ctx!.strokeStyle = "rgba(255,255,255,0.15)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(rightX, plotMidY);
      ctx!.lineTo(rightX + rightW, plotMidY);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(rightX, plotTop);
      ctx!.lineTo(rightX, plotTop + plotH);
      ctx!.stroke();

      // Draw one wave per numeric param
      for (let i = 0; i < Math.min(numCount, 4); i++) {
        const p = numericParams[i];
        const color = COLORS[i % COLORS.length];
        const norm = p.value / maxVal;

        ctx!.strokeStyle = hexToRgba(color, 0.7);
        ctx!.lineWidth = 2.5;
        ctx!.beginPath();

        for (let px = 0; px <= rightW; px++) {
          const x = (px / rightW) * Math.PI * 4;
          // Each param modulates the wave differently
          const amp = Math.abs(norm) * plotH * 0.35;
          const freq = 1 + i * 0.7;
          const phase = i * 1.2 + t * (0.5 + i * 0.3);
          const y = amp * Math.sin(freq * x + phase);

          const cx = rightX + px;
          const cy = plotMidY - y;

          if (px === 0) ctx!.moveTo(cx, cy);
          else ctx!.lineTo(cx, cy);
        }
        ctx!.stroke();

        // Legend dot + label at right edge
        const legendY = plotTop + 16 + i * 22;
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(rightX + rightW - 60, legendY, 4, 0, Math.PI * 2);
        ctx!.fill();

        const shortKey =
          p.key.length > 10 ? p.key.slice(0, 9) + "…" : p.key;
        drawLabel(
          ctx!,
          shortKey,
          rightX + rightW - 40,
          legendY,
          hexToRgba(color, 0.8),
          11,
          "left"
        );
      }

      // Animated scan line on the wave plot
      const scanX = rightX + ((t * 40) % rightW);
      ctx!.strokeStyle = "rgba(251, 191, 36, 0.3)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(scanX, plotTop);
      ctx!.lineTo(scanX, plotTop + plotH);
      ctx!.stroke();

      // Dot on scan line at the first wave's position
      if (numCount > 0) {
        const p0 = numericParams[0];
        const norm0 = p0.value / maxVal;
        const sx = ((scanX - rightX) / rightW) * Math.PI * 4;
        const sy =
          Math.abs(norm0) *
          plotH *
          0.35 *
          Math.sin(sx + t * 0.5);
        ctx!.fillStyle = "#fbbf24";
        ctx!.shadowColor = "#fbbf24";
        ctx!.shadowBlur = 12;
        ctx!.beginPath();
        ctx!.arc(scanX, plotMidY - sy, 5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      // ── Boolean indicators (bottom-right corner) ──
      if (boolParams.length > 0) {
        const indY = h - 24;
        let indX = rightX;
        for (const bp of boolParams) {
          const on = bp.value;
          ctx!.fillStyle = on
            ? "rgba(74, 222, 128, 0.7)"
            : "rgba(255, 255, 255, 0.15)";
          ctx!.beginPath();
          ctx!.arc(indX + 6, indY, 5, 0, Math.PI * 2);
          ctx!.fill();

          const shortKey = bp.key.length > 12 ? bp.key.slice(0, 11) + "…" : bp.key;
          drawLabel(
            ctx!,
            shortKey,
            indX + 18,
            indY,
            on ? "rgba(74,222,128,0.7)" : "rgba(255,255,255,0.25)",
            10,
            "left"
          );
          indX += ctx!.measureText(shortKey).width + 30;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [params]);

  return (
    <canvas
      ref={canvasRef}
      className="anim-canvas"
      style={{ width: "100%", height: "360px" }}
    />
  );
}

// ── Helpers ──

function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  fontSize: number,
  align: CanvasTextAlign = "center"
) {
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur = 4;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.shadowBlur = 0;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
