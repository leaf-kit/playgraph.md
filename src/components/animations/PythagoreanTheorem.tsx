import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

export function PythagoreanTheorem({ params }: AnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const sideA = (params.sideA as number) ?? 3;
  const sideB = (params.sideB as number) ?? 4;
  const showSquares = (params.showSquares as boolean) ?? true;
  const animate = (params.animate as boolean) ?? true;

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
    const sideC = Math.sqrt(sideA * sideA + sideB * sideB);

    // Helper: draw text with dark outline for readability
    function drawLabel(
      text: string,
      x: number,
      y: number,
      color: string,
      fontSize: number,
      align: CanvasTextAlign = "center",
    ) {
      ctx!.font = `bold ${fontSize}px sans-serif`;
      ctx!.textAlign = align;
      ctx!.textBaseline = "middle";

      // Dark shadow behind text
      ctx!.shadowColor = "rgba(0,0,0,0.8)";
      ctx!.shadowBlur = 6;
      ctx!.fillStyle = color;
      ctx!.fillText(text, x, y);
      ctx!.shadowBlur = 0;
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;
      const phase = animate ? t : 0;

      // ── Scale: fill canvas ──
      const totalW = sideA + sideB;
      const totalH = sideA + sideB;
      const padding = 70;
      const scale = Math.min(
        (w - padding * 2) / totalW,
        (h - padding * 2) / totalH
      );

      // Triangle origin (right-angle corner)
      const originX = padding + sideA * scale;
      const originY = padding + sideA * scale;

      const Ax = originX;
      const Ay = originY;
      const Bx = originX + sideB * scale;
      const By = originY;
      const Cx = originX;
      const Cy = originY - sideA * scale;

      // ── Soft grid ──
      ctx!.strokeStyle = "rgba(255,255,255,0.04)";
      ctx!.lineWidth = 1;
      for (let gy = 0; gy < h; gy += 40) {
        ctx!.beginPath(); ctx!.moveTo(0, gy); ctx!.lineTo(w, gy); ctx!.stroke();
      }
      for (let gx = 0; gx < w; gx += 40) {
        ctx!.beginPath(); ctx!.moveTo(gx, 0); ctx!.lineTo(gx, h); ctx!.stroke();
      }

      // ── Squares ──
      if (showSquares) {
        const pulse = animate ? 0.7 + 0.3 * Math.sin(phase * 1.8) : 1;

        // --- Square a (left) ---
        const sqAx = Ax - sideA * scale;
        const sqAy = Cy;
        const sqAw = sideA * scale;
        ctx!.fillStyle = `rgba(96, 165, 250, ${0.12 + 0.06 * pulse})`;
        ctx!.fillRect(sqAx, sqAy, sqAw, sqAw);
        ctx!.strokeStyle = "rgba(96, 165, 250, 0.6)";
        ctx!.lineWidth = 2.5;
        ctx!.strokeRect(sqAx, sqAy, sqAw, sqAw);

        // Grid lines
        const gridA = Math.round(sideA);
        const cellA = sqAw / gridA;
        ctx!.strokeStyle = "rgba(96, 165, 250, 0.18)";
        ctx!.lineWidth = 1;
        for (let i = 1; i < gridA; i++) {
          ctx!.beginPath(); ctx!.moveTo(sqAx + i * cellA, sqAy); ctx!.lineTo(sqAx + i * cellA, sqAy + sqAw); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(sqAx, sqAy + i * cellA); ctx!.lineTo(sqAx + sqAw, sqAy + i * cellA); ctx!.stroke();
        }

        drawLabel(
          `a² = ${(sideA * sideA).toFixed(0)}`,
          sqAx + sqAw / 2,
          sqAy + sqAw / 2,
          "#93c5fd",
          20,
        );

        // --- Square b (below) ---
        const sqBx = Ax;
        const sqBy = Ay;
        const sqBw = sideB * scale;
        ctx!.fillStyle = `rgba(74, 222, 128, ${0.12 + 0.06 * pulse})`;
        ctx!.fillRect(sqBx, sqBy, sqBw, sqBw);
        ctx!.strokeStyle = "rgba(74, 222, 128, 0.6)";
        ctx!.lineWidth = 2.5;
        ctx!.strokeRect(sqBx, sqBy, sqBw, sqBw);

        // Grid lines
        const gridB = Math.round(sideB);
        const cellB = sqBw / gridB;
        ctx!.strokeStyle = "rgba(74, 222, 128, 0.18)";
        ctx!.lineWidth = 1;
        for (let i = 1; i < gridB; i++) {
          ctx!.beginPath(); ctx!.moveTo(sqBx + i * cellB, sqBy); ctx!.lineTo(sqBx + i * cellB, sqBy + sqBw); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(sqBx, sqBy + i * cellB); ctx!.lineTo(sqBx + sqBw, sqBy + i * cellB); ctx!.stroke();
        }

        drawLabel(
          `b² = ${(sideB * sideB).toFixed(0)}`,
          sqBx + sqBw / 2,
          sqBy + sqBw / 2,
          "#86efac",
          20,
        );

        // --- Square c (hypotenuse, rotated) ---
        const angle = Math.atan2(Cy - By, Cx - Bx);
        const sqCw = sideC * scale;
        ctx!.save();
        ctx!.translate(Bx, By);
        ctx!.rotate(angle);
        ctx!.fillStyle = `rgba(244, 114, 182, ${0.1 + 0.05 * pulse})`;
        ctx!.fillRect(0, 0, sqCw, sqCw);
        ctx!.strokeStyle = "rgba(244, 114, 182, 0.55)";
        ctx!.lineWidth = 2.5;
        ctx!.strokeRect(0, 0, sqCw, sqCw);

        drawLabel(
          `c² = ${(sideC * sideC).toFixed(0)}`,
          sqCw / 2,
          sqCw / 2,
          "#f9a8d4",
          20,
        );
        ctx!.restore();
      }

      // ── Triangle ──
      const glow = animate ? 10 + 5 * Math.sin(phase * 2) : 8;
      ctx!.strokeStyle = "#f472b6";
      ctx!.lineWidth = 4;
      ctx!.shadowColor = "#f472b6";
      ctx!.shadowBlur = glow;
      ctx!.beginPath();
      ctx!.moveTo(Ax, Ay);
      ctx!.lineTo(Bx, By);
      ctx!.lineTo(Cx, Cy);
      ctx!.closePath();
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // Fill triangle
      ctx!.fillStyle = "rgba(244, 114, 182, 0.07)";
      ctx!.beginPath();
      ctx!.moveTo(Ax, Ay);
      ctx!.lineTo(Bx, By);
      ctx!.lineTo(Cx, Cy);
      ctx!.closePath();
      ctx!.fill();

      // Right-angle marker
      const m = Math.min(18, sideA * scale * 0.12, sideB * scale * 0.12);
      ctx!.strokeStyle = "rgba(255,255,255,0.7)";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.moveTo(Ax + m, Ay);
      ctx!.lineTo(Ax + m, Ay - m);
      ctx!.lineTo(Ax, Ay - m);
      ctx!.stroke();

      // ── Animated dot traveling along edges ──
      if (animate) {
        const lenAB = sideB * scale;
        const lenBC = sideC * scale;
        const lenCA = sideA * scale;
        const total = lenAB + lenBC + lenCA;
        const pos = ((phase * 60) % total);

        let dotX: number, dotY: number;
        if (pos < lenAB) {
          const p = pos / lenAB;
          dotX = Ax + (Bx - Ax) * p;
          dotY = Ay + (By - Ay) * p;
        } else if (pos < lenAB + lenBC) {
          const p = (pos - lenAB) / lenBC;
          dotX = Bx + (Cx - Bx) * p;
          dotY = By + (Cy - By) * p;
        } else {
          const p = (pos - lenAB - lenBC) / lenCA;
          dotX = Cx + (Ax - Cx) * p;
          dotY = Cy + (Ay - Cy) * p;
        }

        ctx!.fillStyle = "#fbbf24";
        ctx!.shadowColor = "#fbbf24";
        ctx!.shadowBlur = 18;
        ctx!.beginPath();
        ctx!.arc(dotX, dotY, 7, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      // ── Vertex dots + labels ──
      const verts = [
        { x: Ax, y: Ay, label: "A", ox: -16, oy: 16 },
        { x: Bx, y: By, label: "B", ox: 16, oy: 16 },
        { x: Cx, y: Cy, label: "C", ox: -16, oy: -14 },
      ];
      for (const v of verts) {
        // White dot
        ctx!.fillStyle = "#fff";
        ctx!.shadowColor = "rgba(255,255,255,0.5)";
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.arc(v.x, v.y, 6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;

        // Label
        drawLabel(v.label, v.x + v.ox, v.y + v.oy, "#ffffff", 16);
      }

      // ── Side length labels (big, bright, with shadow) ──

      // a: left side
      drawLabel(
        `a = ${sideA.toFixed(1)}`,
        Ax - 18,
        (Ay + Cy) / 2,
        "#93c5fd",
        18,
        "right",
      );

      // b: bottom side
      drawLabel(
        `b = ${sideB.toFixed(1)}`,
        (Ax + Bx) / 2,
        Ay - 18,
        "#86efac",
        18,
        "center",
      );

      // c: hypotenuse
      const cmx = (Bx + Cx) / 2;
      const cmy = (By + Cy) / 2;
      drawLabel(
        `c = ${sideC.toFixed(2)}`,
        cmx + 16,
        cmy,
        "#f9a8d4",
        18,
        "left",
      );

      // ── Formula bar (bottom, large and clear) ──
      const a2 = sideA * sideA;
      const b2 = sideB * sideB;
      const c2 = sideC * sideC;

      // Background pill
      const pillW = 280;
      const pillH = 48;
      const pillX = (w - pillW) / 2;
      const pillY = h - 62;

      ctx!.fillStyle = "rgba(0,0,0,0.5)";
      ctx!.beginPath();
      ctx!.roundRect(pillX, pillY, pillW, pillH, 12);
      ctx!.fill();
      ctx!.strokeStyle = "rgba(255,255,255,0.1)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.roundRect(pillX, pillY, pillW, pillH, 12);
      ctx!.stroke();

      const fcy = pillY + pillH / 2;
      ctx!.textBaseline = "middle";
      ctx!.textAlign = "left";
      ctx!.shadowColor = "rgba(0,0,0,0.6)";
      ctx!.shadowBlur = 4;

      let tx = pillX + 16;

      ctx!.font = "bold 18px sans-serif";
      ctx!.fillStyle = "#93c5fd";
      ctx!.fillText(`${a2.toFixed(0)}`, tx, fcy);
      tx += ctx!.measureText(`${a2.toFixed(0)}`).width + 6;

      ctx!.fillStyle = "#ffffff";
      ctx!.fillText("+", tx, fcy);
      tx += ctx!.measureText("+").width + 6;

      ctx!.fillStyle = "#86efac";
      ctx!.fillText(`${b2.toFixed(0)}`, tx, fcy);
      tx += ctx!.measureText(`${b2.toFixed(0)}`).width + 6;

      ctx!.fillStyle = "#ffffff";
      ctx!.fillText("=", tx, fcy);
      tx += ctx!.measureText("=").width + 6;

      ctx!.fillStyle = "#f9a8d4";
      ctx!.fillText(`${c2.toFixed(1)}`, tx, fcy);
      tx += ctx!.measureText(`${c2.toFixed(1)}`).width + 8;

      // Check mark
      const diff = Math.abs(a2 + b2 - c2);
      if (diff < 0.1) {
        ctx!.fillStyle = "#4ade80";
        ctx!.font = "bold 20px sans-serif";
        ctx!.fillText("✓", tx, fcy);
      }

      ctx!.shadowBlur = 0;

      if (animate) {
        animRef.current = requestAnimationFrame(draw);
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [sideA, sideB, showSquares, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="anim-canvas"
      style={{ width: "100%", height: "480px" }}
    />
  );
}
