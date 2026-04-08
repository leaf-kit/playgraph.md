import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

export function UnitCircle({ params }: AnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef((params.angle as number) ?? 0.785);

  const showProjections = (params.showProjections as boolean) ?? true;
  const autoRotate = (params.autoRotate as boolean) ?? false;
  const speed = (params.speed as number) ?? 1;
  const externalAngle = (params.angle as number) ?? 0.785;

  useEffect(() => {
    if (!autoRotate) {
      angleRef.current = externalAngle;
    }
  }, [externalAngle, autoRotate]);

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
    const cx = w * 0.4;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.32;

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      if (autoRotate) {
        angleRef.current += 0.015 * speed;
      }
      const theta = angleRef.current;

      // Grid
      ctx!.strokeStyle = "rgba(255,255,255,0.06)";
      ctx!.lineWidth = 1;
      for (let y = 0; y < h; y += 30) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();
      }
      for (let x = 0; x < w; x += 30) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }

      // Axes
      ctx!.strokeStyle = "rgba(255,255,255,0.25)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(cx - radius - 20, cy);
      ctx!.lineTo(cx + radius + 20, cy);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(cx, cy - radius - 20);
      ctx!.lineTo(cx, cy + radius + 20);
      ctx!.stroke();

      // Unit circle
      ctx!.strokeStyle = "rgba(255,255,255,0.4)";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.stroke();

      // Angle arc
      ctx!.strokeStyle = "#fbbf24";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 30, 0, -theta, theta > 0);
      ctx!.stroke();

      // Radius line to point
      const px = cx + radius * Math.cos(theta);
      const py = cy - radius * Math.sin(theta);

      ctx!.strokeStyle = "#f472b6";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.lineTo(px, py);
      ctx!.stroke();

      // Projections
      if (showProjections) {
        // cos projection (x)
        ctx!.strokeStyle = "#60a5fa";
        ctx!.lineWidth = 2;
        ctx!.setLineDash([4, 4]);
        ctx!.beginPath();
        ctx!.moveTo(px, py);
        ctx!.lineTo(px, cy);
        ctx!.stroke();
        ctx!.setLineDash([]);

        // cos bar on x-axis
        ctx!.fillStyle = "rgba(96, 165, 250, 0.3)";
        ctx!.fillRect(cx, cy - 3, px - cx, 6);

        // sin projection (y)
        ctx!.strokeStyle = "#4ade80";
        ctx!.lineWidth = 2;
        ctx!.setLineDash([4, 4]);
        ctx!.beginPath();
        ctx!.moveTo(px, py);
        ctx!.lineTo(cx, py);
        ctx!.stroke();
        ctx!.setLineDash([]);

        // sin bar on y-axis
        ctx!.fillStyle = "rgba(74, 222, 128, 0.3)";
        ctx!.fillRect(cx - 3, cy, 6, py - cy);

        // Labels
        ctx!.font = "13px monospace";
        ctx!.fillStyle = "#60a5fa";
        ctx!.fillText(
          `cos = ${Math.cos(theta).toFixed(3)}`,
          cx + (px - cx) / 2 - 30,
          cy + 20
        );
        ctx!.fillStyle = "#4ade80";
        ctx!.fillText(
          `sin = ${Math.sin(theta).toFixed(3)}`,
          cx - 90,
          cy + (py - cy) / 2
        );
      }

      // Point on circle
      ctx!.fillStyle = "#f472b6";
      ctx!.shadowColor = "#f472b6";
      ctx!.shadowBlur = 15;
      ctx!.beginPath();
      ctx!.arc(px, py, 7, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.shadowBlur = 0;

      // Angle label
      ctx!.fillStyle = "#fbbf24";
      ctx!.font = "12px monospace";
      const deg = ((theta * 180) / Math.PI) % 360;
      ctx!.fillText(
        `${deg.toFixed(1)}°`,
        cx + 35,
        cy - 8
      );

      // Sine wave trace on the right
      const traceX = w * 0.65;
      const traceW = w * 0.3;
      const traceH = radius;

      ctx!.strokeStyle = "rgba(255,255,255,0.15)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(traceX, cy);
      ctx!.lineTo(traceX + traceW, cy);
      ctx!.stroke();

      // Draw sine trace
      ctx!.strokeStyle = "#4ade80";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      for (let i = 0; i <= traceW; i++) {
        const a = theta - (i / traceW) * Math.PI * 2;
        const y = cy - Math.sin(a) * traceH;
        if (i === 0) ctx!.moveTo(traceX + i, y);
        else ctx!.lineTo(traceX + i, y);
      }
      ctx!.stroke();

      // Connect point to trace
      ctx!.strokeStyle = "rgba(244, 114, 182, 0.3)";
      ctx!.setLineDash([3, 3]);
      ctx!.beginPath();
      ctx!.moveTo(px, py);
      ctx!.lineTo(traceX, py);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // Dot at trace start
      ctx!.fillStyle = "#4ade80";
      ctx!.beginPath();
      ctx!.arc(traceX, cy - Math.sin(theta) * traceH, 4, 0, Math.PI * 2);
      ctx!.fill();

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [showProjections, autoRotate, speed, externalAngle]);

  return (
    <canvas
      ref={canvasRef}
      className="anim-canvas"
      style={{ width: "100%", height: "350px" }}
    />
  );
}
