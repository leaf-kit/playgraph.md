import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

export function PhysicsAnim({ params }: AnimationProps) {
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
    const animate = bools.find(([k]) => k.toLowerCase().includes("anim") || k.toLowerCase().includes("show"))?.[1] ?? true;

    const v0 = nums[0]?.[1] ?? 10;
    const v1 = nums[1]?.[1] ?? 5;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let gy = 0; gy < h; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
      for (let gx = 0; gx < w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }

      // Ground
      const groundY = h * 0.78;
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(30, groundY); ctx.lineTo(w - 30, groundY); ctx.stroke();
      // Ground hash
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      for (let gx = 40; gx < w - 30; gx += 15) {
        ctx.beginPath(); ctx.moveTo(gx, groundY); ctx.lineTo(gx - 8, groundY + 10); ctx.stroke();
      }

      // Object (ball) with projectile motion
      const g = 9.8;
      const angle = (v1 / 90) * Math.PI / 2 + 0.3;
      const speed = v0 * 2;
      const period = (2 * speed * Math.sin(angle)) / g;
      const loopT = animate ? (t % (period + 1)) : period * 0.5;

      // Scale trajectory to fit canvas
      const maxRange = (speed * speed * Math.sin(2 * angle)) / g;
      const maxHeight = (speed * speed * Math.sin(angle) * Math.sin(angle)) / (2 * g);
      const scaleX = Math.max(1, (w - 120) / Math.max(maxRange, 1));
      const scaleY = Math.max(1, (groundY - 60) / Math.max(maxHeight, 1));
      const fitScale = Math.min(scaleX, scaleY);

      const objX = 60 + speed * Math.cos(angle) * loopT * fitScale;
      const objYphys = speed * Math.sin(angle) * loopT - 0.5 * g * loopT * loopT;
      const objY = groundY - Math.max(0, objYphys) * fitScale;

      // Trail
      if (animate) {
        ctx.strokeStyle = "rgba(96,165,250,0.2)";
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        let first = true;
        for (let tt = 0; tt <= loopT; tt += 0.05) {
          const tx = 60 + speed * Math.cos(angle) * tt * fitScale;
          const tyP = speed * Math.sin(angle) * tt - 0.5 * g * tt * tt;
          const ty = groundY - Math.max(0, tyP) * fitScale;
          if (first) { ctx.moveTo(tx, ty); first = false; } else ctx.lineTo(tx, ty);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Object
      ctx.fillStyle = "#60a5fa";
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(objX, objY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Velocity vector
      if (animate && objYphys >= 0) {
        const vx = speed * Math.cos(angle);
        const vy = speed * Math.sin(angle) - g * loopT;
        const vLen = Math.sqrt(vx * vx + vy * vy);
        const arrowLen = 40;
        const ax = objX + (vx / vLen) * arrowLen;
        const ay = objY - (vy / vLen) * arrowLen;
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(objX, objY); ctx.lineTo(ax, ay); ctx.stroke();
        // Arrow head
        ctx.fillStyle = "#fbbf24";
        const ha = Math.atan2(-(vy / vLen), vx / vLen);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 8 * Math.cos(ha - 0.4), ay + 8 * Math.sin(ha - 0.4));
        ctx.lineTo(ax - 8 * Math.cos(ha + 0.4), ay + 8 * Math.sin(ha + 0.4));
        ctx.closePath();
        ctx.fill();
      }

      // Gravity arrow
      ctx.strokeStyle = "rgba(244,114,182,0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(objX, objY + 16); ctx.lineTo(objX, objY + 40); ctx.stroke();
      ctx.fillStyle = "#f472b6";
      ctx.beginPath(); ctx.moveTo(objX, objY + 44); ctx.lineTo(objX - 4, objY + 38); ctx.lineTo(objX + 4, objY + 38); ctx.closePath(); ctx.fill();
      lbl(ctx, "g", objX + 12, objY + 34, "#f9a8d4", 11);

      // Parameters display (top-right)
      nums.forEach(([key, val], i) => {
        const colors = ["#93c5fd", "#86efac", "#f9a8d4", "#fde68a"];
        lbl(ctx, `${key} = ${val.toFixed(1)}`, w - 20, 24 + i * 22, colors[i % 4], 13, "right");
      });

      // Height/distance markers
      if (animate) {
        lbl(ctx, `x = ${(objX - 60).toFixed(0)}`, objX, groundY + 24, "rgba(255,255,255,0.3)", 11);
        if (objYphys > 0) {
          lbl(ctx, `h = ${objYphys.toFixed(1)}`, objX - 28, objY, "rgba(255,255,255,0.3)", 11);
        }
      }

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
