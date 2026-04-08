import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

export function GeometryAnim({ params }: AnimationProps) {
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
    const animate = bools.find(([k]) => k.toLowerCase().includes("anim"))?.[1] ?? true;

    const v0 = nums[0]?.[1] ?? 4;
    const v1 = nums[1]?.[1] ?? 3;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let gy = 0; gy < h; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
      for (let gx = 0; gx < w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }

      const cx = w * 0.4;
      const cy = h * 0.48;
      const sides = Math.max(3, Math.min(12, Math.round(v0)));
      const size = Math.min(w * 0.25, h * 0.3) * (0.5 + v1 * 0.1);
      const phase = animate ? t * 0.3 : 0;

      // Draw polygon
      const glow = animate ? 10 + 4 * Math.sin(t * 2) : 8;
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = glow;
      ctx.beginPath();
      const vertices: [number, number][] = [];
      for (let i = 0; i <= sides; i++) {
        const angle = (i / sides) * Math.PI * 2 - Math.PI / 2 + phase;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        vertices.push([vx, vy]);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fill
      ctx.fillStyle = "rgba(96,165,250,0.06)";
      ctx.fill();

      // Vertex dots
      for (let i = 0; i < sides; i++) {
        const [vx, vy] = vertices[i];
        const pulse = animate ? 4 + 1.5 * Math.sin(t * 3 + i) : 4;
        ctx.fillStyle = "#fbbf24";
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(vx, vy, pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Diagonals from first vertex (if showExtra)
      if (showExtra && sides > 3) {
        ctx.strokeStyle = "rgba(244,114,182,0.25)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        for (let i = 2; i < sides - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(vertices[0][0], vertices[0][1]);
          ctx.lineTo(vertices[i][0], vertices[i][1]);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // Center dot
      ctx.fillStyle = "#f472b6";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Symmetry axis (if showExtra)
      if (showExtra) {
        ctx.strokeStyle = "rgba(74,222,128,0.3)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy - size - 30);
        ctx.lineTo(cx, cy + size + 30);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Side length indicator
      if (sides >= 3 && vertices.length >= 2) {
        const mx = (vertices[0][0] + vertices[1][0]) / 2;
        const my = (vertices[0][1] + vertices[1][1]) / 2;
        const sideLen = Math.sqrt((vertices[1][0] - vertices[0][0]) ** 2 + (vertices[1][1] - vertices[0][1]) ** 2);
        lbl(ctx, sideLen.toFixed(0) + "px", mx + 12, my - 10, "#93c5fd", 12);
      }

      // Info panel (right side)
      const ix = w * 0.72;
      let iy = h * 0.2;

      // Panel bg
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.roundRect(ix - 12, iy - 16, w * 0.26, 140, 10);
      ctx.fill();

      const shapeName = sides === 3 ? "Triangle" : sides === 4 ? "Square" : sides === 5 ? "Pentagon" : sides === 6 ? "Hexagon" : `${sides}-gon`;
      lbl(ctx, shapeName, ix + (w * 0.26 - 24) / 2, iy, "#fff", 16);
      iy += 28;
      lbl(ctx, `Sides: ${sides}`, ix, iy, "#93c5fd", 13, "left"); iy += 22;
      lbl(ctx, `Vertices: ${sides}`, ix, iy, "#86efac", 13, "left"); iy += 22;
      const intAngle = ((sides - 2) * 180) / sides;
      lbl(ctx, `Interior: ${intAngle.toFixed(1)}°`, ix, iy, "#f9a8d4", 13, "left"); iy += 22;
      const diags = (sides * (sides - 3)) / 2;
      lbl(ctx, `Diagonals: ${diags}`, ix, iy, "#fde68a", 13, "left");

      // Params
      nums.forEach(([key, val], i) => {
        const cs = ["#93c5fd", "#86efac", "#f9a8d4", "#fde68a"];
        lbl(ctx, `${key} = ${val.toFixed(1)}`, w - 16, h - 20 - (nums.length - 1 - i) * 20, cs[i % 4], 11, "right");
      });

      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [params]);

  return <canvas ref={canvasRef} className="anim-canvas" style={{ width: "100%", height: "380px" }} />;
}

function lbl(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, c: string, s: number, a: CanvasTextAlign = "center") {
  ctx.font = `bold ${s}px sans-serif`; ctx.textAlign = a; ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = 4; ctx.fillStyle = c; ctx.fillText(t, x, y); ctx.shadowBlur = 0;
}
