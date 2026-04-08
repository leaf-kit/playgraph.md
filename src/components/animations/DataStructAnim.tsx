import { useRef, useEffect } from "react";
import type { AnimationProps } from "./registry";

const C = { blue: "#60a5fa", green: "#4ade80", pink: "#f472b6", yellow: "#fbbf24", purple: "#a78bfa", cyan: "#38bdf8" };

export function DataStructAnim({ params, animType }: AnimationProps) {
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
    const size = Math.max(3, Math.min(12, Math.round(nums[0]?.[1] ?? 8)));
    const highlight = Math.round(nums[1]?.[1] ?? 3) % size;

    // Deterministic pseudo-random values
    const vals: number[] = [];
    let seed = 42;
    for (let i = 0; i < size; i++) { seed = (seed * 37 + 11) % 60 + 10; vals.push(seed); }

    const type = animType ?? "array";

    function draw() {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Background grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let gy = 0; gy < h; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
      for (let gx = 0; gx < w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }

      if (type === "stack") drawStack(ctx, w, h, t, vals, size);
      else if (type === "queue") drawQueue(ctx, w, h, t, vals, size);
      else if (type.includes("sort")) drawSorting(ctx, w, h, t, vals, size, type);
      else if (type === "binary-tree" || type === "heap") drawTree(ctx, w, h, t, vals, size, type === "heap");
      else if (type === "binary-search-tree" || type === "binary-search") drawBST(ctx, w, h, t, vals, size, highlight);
      else if (type === "linked-list") drawLinkedList(ctx, w, h, t, vals, size, highlight);
      else if (type === "hash-table") drawHashTable(ctx, w, h, t, vals, size, highlight);
      else if (type === "recursion" || type === "dynamic-programming") drawRecursion(ctx, w, h, t, size);
      else if (type === "bfs-dfs" || type === "graph-traversal" || type === "dijkstra") drawGraph(ctx, w, h, t, size);
      else if (type === "trie") drawTrie(ctx, w, h, t);
      else drawArray(ctx, w, h, t, vals, size, highlight);

      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [params, animType]);

  return <canvas ref={canvasRef} className="anim-canvas" style={{ width: "100%", height: "400px" }} />;
}

// ════════════ Stack: push/pop animation ════════════
function drawStack(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, vals: number[], size: number) {
  const boxW = 100, boxH = 36, gap = 4;
  const cx = w * 0.35, baseY = h - 50;
  const stackH = size * (boxH + gap);
  const phase = (t * 0.4) % 3; // 0-1: stable, 1-2: pop, 2-3: push

  // Container walls
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - boxW / 2 - 10, baseY + 5);
  ctx.lineTo(cx - boxW / 2 - 10, baseY - stackH - 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + boxW / 2 + 10, baseY + 5);
  ctx.lineTo(cx + boxW / 2 + 10, baseY - stackH - 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - boxW / 2 - 10, baseY + 5);
  ctx.lineTo(cx + boxW / 2 + 10, baseY + 5);
  ctx.stroke();

  const visibleCount = phase < 1 ? size : phase < 2 ? size - 1 : Math.min(size, Math.floor(size - 1 + (phase - 2)));
  const pushProgress = phase >= 2 ? (phase - 2) : 0;

  for (let i = 0; i < Math.min(visibleCount, size); i++) {
    const by = baseY - (i + 1) * (boxH + gap);
    const isTop = i === Math.floor(visibleCount) - 1;
    const color = isTop ? C.yellow : C.blue;
    const alpha = (i === Math.floor(visibleCount) - 1 && pushProgress > 0 && pushProgress < 1) ? pushProgress : 1;

    ctx.fillStyle = `rgba(${hexRGB(color)},${0.2 * alpha})`;
    ctx.beginPath(); ctx.roundRect(cx - boxW / 2, by, boxW, boxH, 6); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},${0.6 * alpha})`;
    ctx.lineWidth = 2; ctx.stroke();
    lbl(ctx, String(vals[i]), cx, by + boxH / 2, `rgba(255,255,255,${0.9 * alpha})`, 16);
  }

  // Pop animation
  if (phase >= 1 && phase < 2) {
    const popP = phase - 1;
    const popY = baseY - size * (boxH + gap) - popP * 60;
    const popAlpha = 1 - popP;
    const color = C.pink;
    ctx.fillStyle = `rgba(${hexRGB(color)},${0.3 * popAlpha})`;
    ctx.beginPath(); ctx.roundRect(cx - boxW / 2, popY, boxW, boxH, 6); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},${0.7 * popAlpha})`;
    ctx.lineWidth = 2; ctx.stroke();
    lbl(ctx, String(vals[size - 1]), cx, popY + boxH / 2, `rgba(255,255,255,${popAlpha})`, 16);
    lbl(ctx, "POP", cx + boxW / 2 + 30, popY + boxH / 2, `rgba(${hexRGB(C.pink)},${popAlpha})`, 14);
  }

  // Labels
  lbl(ctx, "STACK", cx, 24, C.blue, 18);
  lbl(ctx, `size: ${Math.floor(visibleCount)}`, cx, 48, "rgba(255,255,255,0.4)", 13);

  // Operation log (right side)
  const ops = ["PUSH 42", "PUSH 17", "POP → 17", "PUSH 63", "POP → 63", "PEEK → 42"];
  const activeOp = Math.floor(t * 0.8) % ops.length;
  lbl(ctx, "Operations", w * 0.72, 30, "rgba(255,255,255,0.5)", 14);
  ops.forEach((op, i) => {
    const isActive = i === activeOp;
    lbl(ctx, op, w * 0.72, 60 + i * 24, isActive ? C.yellow : "rgba(255,255,255,0.25)", 12);
    if (isActive) {
      ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(w * 0.72 - 55, 60 + i * 24, 3, 0, Math.PI * 2); ctx.fill();
    }
  });
  lbl(ctx, "LIFO: Last In, First Out", w * 0.72, h - 30, "rgba(255,255,255,0.3)", 11);
}

// ════════════ Queue: enqueue/dequeue animation ════════════
function drawQueue(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, vals: number[], size: number) {
  const boxW = 50, boxH = 50, gap = 8;
  const totalW = size * (boxW + gap) - gap;
  const startX = (w - totalW) / 2;
  const cy = h * 0.45;
  const phase = (t * 0.35) % 3;

  // Queue container
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(startX - 15, cy - boxH / 2 - 10, totalW + 30, boxH + 20, 10); ctx.stroke();

  const dequeueP = phase >= 1 && phase < 2 ? phase - 1 : 0;
  const enqueueP = phase >= 2 ? phase - 2 : 0;

  for (let i = 0; i < size; i++) {
    let bx = startX + i * (boxW + gap);
    let alpha = 1;
    const isFront = i === 0;
    const isBack = i === size - 1;

    // Dequeue: front slides left and fades
    if (isFront && dequeueP > 0) {
      bx -= dequeueP * 80;
      alpha = 1 - dequeueP;
    }
    // Shift others left during dequeue
    if (!isFront && dequeueP > 0) {
      bx -= dequeueP * (boxW + gap);
    }

    const color = isFront ? C.green : isBack ? C.yellow : C.blue;
    ctx.fillStyle = `rgba(${hexRGB(color)},${0.2 * alpha})`;
    ctx.beginPath(); ctx.roundRect(bx, cy - boxH / 2, boxW, boxH, 6); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},${0.6 * alpha})`;
    ctx.lineWidth = 2; ctx.stroke();
    lbl(ctx, String(vals[i]), bx + boxW / 2, cy, `rgba(255,255,255,${0.9 * alpha})`, 15);

    // Arrow
    if (i < size - 1) {
      const ax = bx + boxW + 1;
      ctx.fillStyle = `rgba(255,255,255,${0.2 * alpha})`;
      ctx.beginPath(); ctx.moveTo(ax + 6, cy); ctx.lineTo(ax + 2, cy - 3); ctx.lineTo(ax + 2, cy + 3); ctx.closePath(); ctx.fill();
    }
  }

  // Enqueue animation (new element from right)
  if (enqueueP > 0) {
    const newX = startX + (size - 1) * (boxW + gap) + (1 - enqueueP) * 80;
    ctx.fillStyle = `rgba(${hexRGB(C.pink)},${0.3 * enqueueP})`;
    ctx.beginPath(); ctx.roundRect(newX, cy - boxH / 2, boxW, boxH, 6); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(C.pink)},${0.7 * enqueueP})`;
    ctx.lineWidth = 2; ctx.stroke();
    lbl(ctx, "NEW", newX + boxW / 2, cy, `rgba(255,255,255,${enqueueP})`, 13);
  }

  // Labels
  lbl(ctx, "QUEUE", w / 2, 24, C.blue, 18);
  lbl(ctx, "Front", startX + boxW / 2, cy + boxH / 2 + 24, C.green, 12);
  lbl(ctx, "Back", startX + (size - 1) * (boxW + gap) + boxW / 2, cy + boxH / 2 + 24, C.yellow, 12);

  // Arrows
  lbl(ctx, "← DEQUEUE", startX - 30, cy, C.green, 12, "right");
  lbl(ctx, "ENQUEUE →", startX + totalW + 30, cy, C.pink, 12, "left");
  lbl(ctx, "FIFO: First In, First Out", w / 2, h - 30, "rgba(255,255,255,0.3)", 11);
}

// ════════════ Sorting: animated comparison & swaps ════════════
function drawSorting(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, vals: number[], size: number, type: string) {
  const arr = [...vals.slice(0, size)];
  const maxV = Math.max(...arr);
  const pad = 40;
  const barW = Math.min(50, (w - pad * 2 - (size - 1) * 6) / size);
  const totalW = size * barW + (size - 1) * 6;
  const startX = (w - totalW) / 2;
  const barMaxH = h * 0.55;
  const baseY = h - 60;

  // Determine which step of sorting we're at
  // Simulate partial bubble sort state
  const sorted = [...arr];
  const totalSteps = Math.floor(t * 1.2);
  let swapCount = 0;
  const swapped = new Set<number>();
  outer: for (let pass = 0; pass < size; pass++) {
    for (let j = 0; j < size - 1 - pass; j++) {
      if (swapCount >= totalSteps % (size * 2)) break outer;
      if (sorted[j] > sorted[j + 1]) {
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
        swapped.add(j); swapped.add(j + 1);
      }
      swapCount++;
    }
  }

  // Active comparison pair
  const compI = totalSteps % (size - 1);
  const compJ = compI + 1;

  for (let i = 0; i < size; i++) {
    const bx = startX + i * (barW + 6);
    const barH = (sorted[i] / maxV) * barMaxH;
    const isComparing = i === compI || i === compJ;
    const isSwap = isComparing && sorted[compI] > sorted[compJ];

    let color = C.blue;
    if (isSwap) color = C.pink;
    else if (isComparing) color = C.yellow;

    // Swap bounce effect
    let offsetY = 0;
    if (isComparing) {
      offsetY = -8 * Math.abs(Math.sin(t * 6));
    }

    ctx.fillStyle = `rgba(${hexRGB(color)},0.3)`;
    ctx.beginPath();
    ctx.roundRect(bx, baseY - barH + offsetY, barW, barH, [4, 4, 0, 0]);
    ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.7)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    lbl(ctx, String(sorted[i]), bx + barW / 2, baseY - barH + offsetY - 14, color, 12);
  }

  // Comparison arrow
  if (compI < size - 1) {
    const ax1 = startX + compI * (barW + 6) + barW / 2;
    const ax2 = startX + compJ * (barW + 6) + barW / 2;
    ctx.strokeStyle = C.yellow;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ax1, baseY + 12); ctx.lineTo(ax2, baseY + 12); ctx.stroke();
    lbl(ctx, sorted[compI] > sorted[compJ] ? "SWAP!" : "OK", (ax1 + ax2) / 2, baseY + 28, sorted[compI] > sorted[compJ] ? C.pink : C.green, 12);
  }

  const name = type === "sorting-quick" ? "Quick Sort" : type === "sorting-merge" ? "Merge Sort" : "Bubble Sort";
  lbl(ctx, name, w / 2, 24, C.blue, 18);
  lbl(ctx, `Comparing index [${compI}] vs [${compJ}]`, w / 2, 50, "rgba(255,255,255,0.4)", 12);
}

// ════════════ Binary Tree / Heap ════════════
function drawTree(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, vals: number[], size: number, isHeap: boolean) {
  const treeVals = isHeap ? [...vals.slice(0, size)].sort((a, b) => b - a) : vals.slice(0, size);
  const depth = Math.ceil(Math.log2(size + 1));
  const nodeR = 20;

  function nodePos(idx: number): [number, number] {
    const level = Math.floor(Math.log2(idx + 1));
    const posInLevel = idx - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const levelW = w * 0.85;
    const spacing = levelW / nodesInLevel;
    const x = (w - levelW) / 2 + spacing * posInLevel + spacing / 2;
    const y = 60 + level * ((h - 100) / depth);
    return [x, y];
  }

  // Highlight traversal path
  const activeNode = Math.floor(t * 1.5) % size;

  // Draw edges
  for (let i = 0; i < size; i++) {
    const left = 2 * i + 1, right = 2 * i + 2;
    const [px, py] = nodePos(i);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1.5;
    if (left < size) { const [cx2, cy2] = nodePos(left); ctx.beginPath(); ctx.moveTo(px, py + nodeR); ctx.lineTo(cx2, cy2 - nodeR); ctx.stroke(); }
    if (right < size) { const [cx2, cy2] = nodePos(right); ctx.beginPath(); ctx.moveTo(px, py + nodeR); ctx.lineTo(cx2, cy2 - nodeR); ctx.stroke(); }
  }

  // Draw nodes
  for (let i = 0; i < size; i++) {
    const [nx, ny] = nodePos(i);
    const isActive = i === activeNode;
    const color = isActive ? C.yellow : i === 0 ? C.pink : C.blue;
    const pulse = isActive ? 1.2 + 0.15 * Math.sin(t * 5) : 1;

    ctx.fillStyle = `rgba(${hexRGB(color)},0.2)`;
    ctx.shadowColor = isActive ? color : "transparent";
    ctx.shadowBlur = isActive ? 12 : 0;
    ctx.beginPath(); ctx.arc(nx, ny, nodeR * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.7)`;
    ctx.lineWidth = 2; ctx.stroke();
    ctx.shadowBlur = 0;
    lbl(ctx, String(treeVals[i] ?? ""), nx, ny, "#fff", 14);
  }

  lbl(ctx, isHeap ? "MAX HEAP" : "BINARY TREE", w / 2, 24, C.blue, 18);
  lbl(ctx, `Traversing node [${activeNode}]`, w / 2, h - 20, C.yellow, 12);
}

// ════════════ BST: search traversal ════════════
function drawBST(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, vals: number[], size: number, target: number) {
  // Build BST from vals
  const sorted = [...vals.slice(0, size)].sort((a, b) => a - b);
  const nodeR = 20;
  const depth = Math.ceil(Math.log2(size + 1));

  function nodePos(idx: number): [number, number] {
    const level = Math.floor(Math.log2(idx + 1));
    const posInLevel = idx - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const levelW = w * 0.85;
    const spacing = levelW / nodesInLevel;
    return [(w - levelW) / 2 + spacing * posInLevel + spacing / 2, 60 + level * ((h - 100) / depth)];
  }

  const searchTarget = sorted[target % size];
  const searchStep = Math.floor(t * 0.8) % (depth + 2);

  // Build search path
  const path: number[] = [];
  let curr = 0;
  for (let step = 0; step <= searchStep && curr < size; step++) {
    path.push(curr);
    if (sorted[curr] === searchTarget) break;
    curr = sorted[curr] < searchTarget ? 2 * curr + 2 : 2 * curr + 1;
  }

  // Edges
  for (let i = 0; i < size; i++) {
    const [px, py] = nodePos(i);
    for (const child of [2 * i + 1, 2 * i + 2]) {
      if (child < size) {
        const [cx2, cy2] = nodePos(child);
        const onPath = path.includes(i) && path.includes(child);
        ctx.strokeStyle = onPath ? `rgba(${hexRGB(C.yellow)},0.5)` : "rgba(255,255,255,0.1)";
        ctx.lineWidth = onPath ? 3 : 1.5;
        ctx.beginPath(); ctx.moveTo(px, py + nodeR); ctx.lineTo(cx2, cy2 - nodeR); ctx.stroke();
      }
    }
  }

  // Nodes
  for (let i = 0; i < size; i++) {
    const [nx, ny] = nodePos(i);
    const isOnPath = path.includes(i);
    const isCurrent = i === path[path.length - 1];
    const isFound = isCurrent && sorted[i] === searchTarget;
    const color = isFound ? C.green : isCurrent ? C.yellow : isOnPath ? C.purple : C.blue;

    ctx.fillStyle = `rgba(${hexRGB(color)},0.2)`;
    if (isCurrent) { ctx.shadowColor = color; ctx.shadowBlur = 14; }
    ctx.beginPath(); ctx.arc(nx, ny, nodeR, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.7)`; ctx.lineWidth = 2; ctx.stroke();
    ctx.shadowBlur = 0;
    lbl(ctx, String(sorted[i] ?? ""), nx, ny, "#fff", 14);
  }

  lbl(ctx, "BINARY SEARCH TREE", w / 2, 24, C.blue, 18);
  lbl(ctx, `Searching for: ${searchTarget}`, w / 2, h - 20, C.yellow, 13);
}

// ════════════ Linked List ════════════
function drawLinkedList(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, vals: number[], size: number, insertPos: number) {
  const boxW = 60, boxH = 40, arrowW = 30;
  const totalW = size * boxW + (size - 1) * arrowW;
  const startX = (w - Math.min(totalW, w - 60)) / 2;
  const cy = h * 0.4;
  const activeNode = Math.floor(t * 1.5) % size;

  for (let i = 0; i < size; i++) {
    const bx = startX + i * (boxW + arrowW);
    if (bx + boxW > w - 20) break;
    const isActive = i === activeNode;
    const isInsert = i === insertPos % size;
    const color = isActive ? C.yellow : isInsert ? C.pink : C.blue;

    // Node box (split: data | next)
    ctx.fillStyle = `rgba(${hexRGB(color)},0.15)`;
    ctx.beginPath(); ctx.roundRect(bx, cy - boxH / 2, boxW, boxH, 6); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.6)`;
    ctx.lineWidth = 2; ctx.stroke();

    // Divider
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.3)`;
    ctx.beginPath(); ctx.moveTo(bx + boxW * 0.65, cy - boxH / 2); ctx.lineTo(bx + boxW * 0.65, cy + boxH / 2); ctx.stroke();

    lbl(ctx, String(vals[i]), bx + boxW * 0.32, cy, "#fff", 14);
    lbl(ctx, "→", bx + boxW * 0.82, cy, "rgba(255,255,255,0.4)", 14);

    // Arrow to next
    if (i < size - 1 && bx + boxW + arrowW + boxW <= w - 20) {
      ctx.strokeStyle = `rgba(255,255,255,0.25)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(bx + boxW, cy); ctx.lineTo(bx + boxW + arrowW - 5, cy); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.beginPath(); ctx.moveTo(bx + boxW + arrowW, cy); ctx.lineTo(bx + boxW + arrowW - 6, cy - 4); ctx.lineTo(bx + boxW + arrowW - 6, cy + 4); ctx.closePath(); ctx.fill();
    }

    // Traversal highlight
    if (isActive) {
      ctx.strokeStyle = C.yellow;
      ctx.lineWidth = 3;
      ctx.shadowColor = C.yellow; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.roundRect(bx - 3, cy - boxH / 2 - 3, boxW + 6, boxH + 6, 8); ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  // NULL at end
  lbl(ctx, "NULL", startX + size * (boxW + arrowW) - arrowW + 10, cy, "rgba(255,255,255,0.3)", 12, "left");
  // Head label
  lbl(ctx, "HEAD", startX + boxW / 2, cy - boxH / 2 - 20, C.green, 12);

  lbl(ctx, "LINKED LIST", w / 2, 24, C.blue, 18);
  lbl(ctx, `Traversing → node [${activeNode}]`, w / 2, h - 30, C.yellow, 12);
}

// ════════════ Hash Table ════════════
function drawHashTable(ctx: CanvasRenderingContext2D, w: number, _h: number, _t: number, vals: number[], size: number, key: number) {
  const buckets = Math.min(8, size);
  const boxW = 70, boxH = 36, gap = 6;
  const startX = w * 0.15;
  const startY = 60;

  // Hash function visualization
  const hashKey = vals[key % vals.length];
  const hashResult = hashKey % buckets;
  // Draw buckets
  for (let i = 0; i < buckets; i++) {
    const by = startY + i * (boxH + gap);
    const isTarget = i === hashResult;
    const color = isTarget ? C.yellow : C.blue;

    // Index
    lbl(ctx, `[${i}]`, startX - 15, by + boxH / 2, "rgba(255,255,255,0.4)", 12, "right");

    // Bucket
    ctx.fillStyle = `rgba(${hexRGB(color)},${isTarget ? 0.2 : 0.08})`;
    ctx.beginPath(); ctx.roundRect(startX, by, boxW, boxH, 6); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},${isTarget ? 0.7 : 0.3})`;
    ctx.lineWidth = isTarget ? 2.5 : 1.5; ctx.stroke();

    // Stored values in bucket
    const stored = vals.filter((v, idx) => idx < size && v % buckets === i);
    stored.forEach((v, j) => {
      const cx2 = startX + boxW + 20 + j * (50 + 15);
      ctx.fillStyle = `rgba(${hexRGB(C.green)},0.15)`;
      ctx.beginPath(); ctx.roundRect(cx2, by, 50, boxH, 6); ctx.fill();
      ctx.strokeStyle = `rgba(${hexRGB(C.green)},0.4)`;
      ctx.lineWidth = 1.5; ctx.stroke();
      lbl(ctx, String(v), cx2 + 25, by + boxH / 2, "#fff", 13);
      // Arrow from bucket
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.beginPath(); ctx.moveTo(startX + boxW, by + boxH / 2); ctx.lineTo(cx2, by + boxH / 2); ctx.stroke();
    });
  }

  // Hash function display
  const hashX = w * 0.7;
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath(); ctx.roundRect(hashX - 10, 60, 160, 80, 10); ctx.fill();
  lbl(ctx, "Hash Function", hashX + 70, 80, C.pink, 14);
  lbl(ctx, `key = ${hashKey}`, hashX + 70, 105, "rgba(255,255,255,0.6)", 12);
  lbl(ctx, `${hashKey} % ${buckets} = ${hashResult}`, hashX + 70, 125, C.yellow, 13);

  lbl(ctx, "HASH TABLE", w / 2, 24, C.blue, 18);
}

// ════════════ Recursion / DP ════════════
function drawRecursion(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, n: number) {
  const val = Math.min(n, 7);
  const activeLevel = Math.floor(t * 0.8) % (val + 1);

  // Call stack (left)
  const stackX = w * 0.2, baseY = h - 50, boxW = 120, boxH = 32, gap = 4;
  lbl(ctx, "Call Stack", stackX, 30, "rgba(255,255,255,0.5)", 14);

  for (let i = 0; i <= activeLevel && i <= val; i++) {
    const by = baseY - (i + 1) * (boxH + gap);
    const isTop = i === activeLevel;
    const color = isTop ? C.yellow : C.blue;
    ctx.fillStyle = `rgba(${hexRGB(color)},0.15)`;
    ctx.beginPath(); ctx.roundRect(stackX - boxW / 2, by, boxW, boxH, 6); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.5)`;
    ctx.lineWidth = 1.5; ctx.stroke();
    lbl(ctx, `f(${val - i})`, stackX, by + boxH / 2, isTop ? C.yellow : "#fff", 13);
  }

  // Tree (right) showing recursive calls
  const treeX = w * 0.65, treeY = 60;
  function drawRecNode(x: number, y: number, n2: number, depth: number) {
    if (n2 < 0 || depth > 4) return;
    const isActive = depth === activeLevel;
    const color = isActive ? C.yellow : C.blue;
    const r = 16;

    ctx.fillStyle = `rgba(${hexRGB(color)},0.15)`;
    if (isActive) { ctx.shadowColor = color; ctx.shadowBlur = 10; }
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.5)`;
    ctx.lineWidth = 1.5; ctx.stroke();
    ctx.shadowBlur = 0;
    lbl(ctx, `${n2}`, x, y, "#fff", 12);

    if (n2 > 0 && depth < 4) {
      const spread = 100 / (depth + 1);
      const ny = y + 55;
      // Left child: f(n-1)
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath(); ctx.moveTo(x, y + r); ctx.lineTo(x - spread, ny - r); ctx.stroke();
      drawRecNode(x - spread, ny, n2 - 1, depth + 1);
      // Right child: f(n-2)
      if (n2 > 1) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath(); ctx.moveTo(x, y + r); ctx.lineTo(x + spread, ny - r); ctx.stroke();
        drawRecNode(x + spread, ny, n2 - 2, depth + 1);
      }
    }
  }
  drawRecNode(treeX, treeY + 30, val, 0);

  lbl(ctx, "RECURSION", w / 2, 20, C.blue, 18);
  lbl(ctx, `f(n) = f(n-1) + f(n-2)`, w / 2, h - 20, "rgba(255,255,255,0.3)", 12);
}

// ════════════ Graph traversal (BFS/DFS) ════════════
function drawGraph(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, size: number) {
  const n = Math.min(size, 8);
  // Fixed positions in a circle
  const cx = w / 2, cy = h / 2, radius = Math.min(w, h) * 0.3;
  const positions: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    positions.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
  }

  // Edges (connect neighbors + some cross edges)
  const edges: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    edges.push([i, (i + 1) % n]);
    if (i + 2 < n) edges.push([i, i + 2]);
  }

  // BFS order
  const visited: number[] = [];
  const bfsOrder: number[] = [0];
  const seen = new Set([0]);
  let qi = 0;
  while (qi < bfsOrder.length) {
    const curr = bfsOrder[qi++];
    visited.push(curr);
    for (const [a, b] of edges) {
      const neighbor = a === curr ? b : b === curr ? a : -1;
      if (neighbor >= 0 && !seen.has(neighbor)) { seen.add(neighbor); bfsOrder.push(neighbor); }
    }
  }

  const activeStep = Math.floor(t * 0.6) % (n + 1);
  const activeVisited = new Set(bfsOrder.slice(0, activeStep));
  const currentNode = bfsOrder[Math.min(activeStep, n - 1)];

  // Draw edges
  for (const [a, b] of edges) {
    const [ax, ay] = positions[a];
    const [bx, by] = positions[b];
    const bothVisited = activeVisited.has(a) && activeVisited.has(b);
    ctx.strokeStyle = bothVisited ? `rgba(${hexRGB(C.green)},0.4)` : "rgba(255,255,255,0.08)";
    ctx.lineWidth = bothVisited ? 2.5 : 1;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
  }

  // Draw nodes
  for (let i = 0; i < n; i++) {
    const [nx, ny] = positions[i];
    const isVisited = activeVisited.has(i);
    const isCurrent = i === currentNode;
    const color = isCurrent ? C.yellow : isVisited ? C.green : C.blue;

    ctx.fillStyle = `rgba(${hexRGB(color)},${isVisited ? 0.25 : 0.1})`;
    if (isCurrent) { ctx.shadowColor = C.yellow; ctx.shadowBlur = 14; }
    ctx.beginPath(); ctx.arc(nx, ny, 22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.7)`;
    ctx.lineWidth = 2; ctx.stroke();
    ctx.shadowBlur = 0;
    lbl(ctx, String(i), nx, ny, "#fff", 15);
  }

  lbl(ctx, "GRAPH TRAVERSAL (BFS)", w / 2, 20, C.blue, 18);
  lbl(ctx, `Visited: [${[...activeVisited].join(", ")}]`, w / 2, h - 20, C.green, 12);
}

// ════════════ Trie ════════════
function drawTrie(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const words = ["cat", "car", "cap", "bat"];
  const activeWord = Math.floor(t * 0.3) % words.length;
  const activeChar = Math.floor(t * 0.8) % (words[activeWord].length + 1);

  const nodeR = 16;
  const startY = 70;
  const levelH = 65;

  // Simplified trie layout: root -> first chars -> second chars -> third chars
  type TNode = { char: string; x: number; y: number; children: TNode[] };
  const root: TNode = { char: "root", x: w / 2, y: startY, children: [] };

  // Build trie
  for (const word of words) {
    let node = root;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      let child = node.children.find(c => c.char === ch);
      if (!child) {
        const spread = 80 / (i + 1);
        const offset = (node.children.length - 0.5) * spread;
        child = { char: ch, x: node.x + offset, y: startY + (i + 1) * levelH, children: [] };
        node.children.push(child);
      }
      node = child;
    }
  }

  // Recalculate x positions for better spacing
  function layoutX(node: TNode, x: number, spread: number) {
    node.x = x;
    const childSpread = spread / Math.max(node.children.length, 1);
    node.children.forEach((child, i) => {
      const cx2 = x + (i - (node.children.length - 1) / 2) * childSpread;
      layoutX(child, cx2, childSpread * 0.7);
    });
  }
  layoutX(root, w / 2, w * 0.6);

  // Get active path
  const activePath: string[] = [];
  const activeW = words[activeWord];
  for (let i = 0; i < activeChar && i < activeW.length; i++) activePath.push(activeW[i]);

  function drawNode(node: TNode, depth: number, pathMatch: boolean) {
    // Draw edges to children
    for (const child of node.children) {
      const isOnPath = pathMatch && activePath[depth] === child.char;
      ctx.strokeStyle = isOnPath ? `rgba(${hexRGB(C.yellow)},0.6)` : "rgba(255,255,255,0.1)";
      ctx.lineWidth = isOnPath ? 2.5 : 1;
      ctx.beginPath(); ctx.moveTo(node.x, node.y + nodeR); ctx.lineTo(child.x, child.y - nodeR); ctx.stroke();
      drawNode(child, depth + 1, isOnPath);
    }

    // Node circle
    const isOnPath = depth === 0 ? true : pathMatch;
    const isActive = isOnPath && depth === activeChar;
    const color = isActive ? C.yellow : isOnPath && depth <= activeChar ? C.green : C.blue;

    ctx.fillStyle = `rgba(${hexRGB(color)},0.2)`;
    if (isActive) { ctx.shadowColor = color; ctx.shadowBlur = 12; }
    ctx.beginPath(); ctx.arc(node.x, node.y, nodeR, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},0.6)`;
    ctx.lineWidth = 2; ctx.stroke();
    ctx.shadowBlur = 0;
    lbl(ctx, node.char === "root" ? "∅" : node.char, node.x, node.y, "#fff", 14);
  }
  drawNode(root, 0, true);

  lbl(ctx, "TRIE", w / 2, 20, C.blue, 18);
  lbl(ctx, `Searching: "${activeW}" → "${activeW.slice(0, activeChar)}"`, w / 2, h - 20, C.yellow, 13);
}

// ════════════ Array (default) ════════════
function drawArray(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, vals: number[], size: number, highlight: number) {
  const boxW = Math.min(60, (w - 80) / size - 6);
  const boxH = 48;
  const totalW = size * (boxW + 6) - 6;
  const startX = (w - totalW) / 2;
  const cy = h * 0.4;
  const activeIdx = Math.floor(t * 1.2) % size;

  for (let i = 0; i < size; i++) {
    const bx = startX + i * (boxW + 6);
    const isActive = i === activeIdx;
    const isHL = i === highlight;
    const color = isActive ? C.yellow : isHL ? C.pink : C.blue;

    ctx.fillStyle = `rgba(${hexRGB(color)},${isActive ? 0.25 : 0.1})`;
    ctx.beginPath(); ctx.roundRect(bx, cy - boxH / 2, boxW, boxH, 6); ctx.fill();
    ctx.strokeStyle = `rgba(${hexRGB(color)},${isActive ? 0.8 : 0.4})`;
    ctx.lineWidth = isActive ? 2.5 : 1.5; ctx.stroke();
    lbl(ctx, String(vals[i]), bx + boxW / 2, cy, "#fff", 15);
    lbl(ctx, `[${i}]`, bx + boxW / 2, cy + boxH / 2 + 16, "rgba(255,255,255,0.3)", 10);
  }

  // Access pointer
  const px = startX + activeIdx * (boxW + 6) + boxW / 2;
  const py = cy - boxH / 2 - 18 + 3 * Math.sin(t * 4);
  ctx.fillStyle = C.yellow;
  ctx.beginPath(); ctx.moveTo(px, py + 8); ctx.lineTo(px - 6, py); ctx.lineTo(px + 6, py); ctx.closePath(); ctx.fill();

  lbl(ctx, "ARRAY", w / 2, 20, C.blue, 18);
  lbl(ctx, `Access: arr[${activeIdx}] = ${vals[activeIdx]}  →  O(1)`, w / 2, h - 25, C.yellow, 12);
}

// ════════════ Helpers ════════════
function lbl(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, c: string, s: number, a: CanvasTextAlign = "center") {
  ctx.font = `bold ${s}px sans-serif`; ctx.textAlign = a; ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = 4; ctx.fillStyle = c; ctx.fillText(t, x, y); ctx.shadowBlur = 0;
}
function hexRGB(hex: string): string {
  return `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;
}
