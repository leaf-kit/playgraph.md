import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

export function SineWave({ params }: AnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const amplitude = (params.amplitude as number) ?? 1;
  const frequency = (params.frequency as number) ?? 1;
  const phase = (params.phase as number) ?? 0;
  const showWave = (params.showWave as boolean) ?? true;

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

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      timeRef.current += 0.02;
      const t = timeRef.current;

      const midY = h / 2;
      const scaleY = h * 0.3;
      const padding = 40;

      // Background grid
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
      ctx!.strokeStyle = "rgba(255,255,255,0.3)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(padding, midY);
      ctx!.lineTo(w - padding, midY);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(padding, padding);
      ctx!.lineTo(padding, h - padding);
      ctx!.stroke();

      // Sine wave
      ctx!.strokeStyle = "#60a5fa";
      ctx!.lineWidth = 3;
      ctx!.shadowColor = "#60a5fa";
      ctx!.shadowBlur = 10;
      ctx!.beginPath();

      for (let px = 0; px <= w - 2 * padding; px++) {
        const x = (px / (w - 2 * padding)) * Math.PI * 4;
        const y = amplitude * Math.sin(frequency * x + phase + t);
        const canvasX = padding + px;
        const canvasY = midY - y * scaleY;

        if (px === 0) {
          ctx!.moveTo(canvasX, canvasY);
        } else {
          ctx!.lineTo(canvasX, canvasY);
        }
      }
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // Moving dot on the wave
      const dotX = ((t * 30) % (w - 2 * padding));
      const dotXNorm = (dotX / (w - 2 * padding)) * Math.PI * 4;
      const dotY = amplitude * Math.sin(frequency * dotXNorm + phase + t);

      ctx!.fillStyle = "#f472b6";
      ctx!.shadowColor = "#f472b6";
      ctx!.shadowBlur = 15;
      ctx!.beginPath();
      ctx!.arc(padding + dotX, midY - dotY * scaleY, 6, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.shadowBlur = 0;

      // Wave effect (water-like) at the bottom
      if (showWave) {
        const waveY = h * 0.8;
        ctx!.fillStyle = "rgba(96, 165, 250, 0.08)";
        ctx!.beginPath();
        ctx!.moveTo(0, h);
        for (let px = 0; px <= w; px++) {
          const x = (px / w) * Math.PI * 3;
          const y = amplitude * 8 * Math.sin(frequency * x + t * 1.5);
          ctx!.lineTo(px, waveY + y);
        }
        ctx!.lineTo(w, h);
        ctx!.closePath();
        ctx!.fill();

        ctx!.fillStyle = "rgba(96, 165, 250, 0.05)";
        ctx!.beginPath();
        ctx!.moveTo(0, h);
        for (let px = 0; px <= w; px++) {
          const x = (px / w) * Math.PI * 4;
          const y = amplitude * 6 * Math.sin(frequency * x + t * 2 + 1);
          ctx!.lineTo(px, waveY + 10 + y);
        }
        ctx!.lineTo(w, h);
        ctx!.closePath();
        ctx!.fill();
      }

      // Amplitude markers
      ctx!.strokeStyle = "rgba(244, 114, 182, 0.3)";
      ctx!.setLineDash([5, 5]);
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(padding, midY - amplitude * scaleY);
      ctx!.lineTo(w - padding, midY - amplitude * scaleY);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(padding, midY + amplitude * scaleY);
      ctx!.lineTo(w - padding, midY + amplitude * scaleY);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // Labels
      ctx!.fillStyle = "rgba(255,255,255,0.6)";
      ctx!.font = "12px monospace";
      ctx!.fillText(`A=${amplitude.toFixed(1)}`, w - padding - 60, midY - amplitude * scaleY - 8);
      ctx!.fillText(`f=${frequency.toFixed(1)}`, w - padding - 60, midY + 20);

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [amplitude, frequency, phase, showWave]);

  return (
    <canvas
      ref={canvasRef}
      className="anim-canvas"
      style={{ width: "100%", height: "300px" }}
    />
  );
}
