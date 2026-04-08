import type { FC } from "react";
import { SineWave } from "./SineWave";
import { UnitCircle } from "./UnitCircle";
import { PythagoreanTheorem } from "./PythagoreanTheorem";
import { BlockGridAnim } from "./BlockGridAnim";
import { FunctionPlotAnim } from "./FunctionPlotAnim";
import { BarChartAnim } from "./BarChartAnim";
import { PhysicsAnim } from "./PhysicsAnim";
import { DataStructAnim } from "./DataStructAnim";
import { GeometryAnim } from "./GeometryAnim";
import { NumberLineAnim } from "./NumberLineAnim";
import { TimelineAnim } from "./TimelineAnim";

export interface AnimationProps {
  params: Record<string, number | boolean>;
  animType?: string;
}

type AnimationComponent = FC<AnimationProps>;

const registry: Record<string, AnimationComponent> = {
  // ── Dedicated renderers ──
  "sine-wave": SineWave,
  "unit-circle": UnitCircle,
  "pythagorean-theorem": PythagoreanTheorem,

  // ── 01_elementary_math: BlockGrid / Geometry / NumberLine ──
  "addition": BlockGridAnim,
  "subtraction": BlockGridAnim,
  "multiplication": BlockGridAnim,
  "division": BlockGridAnim,
  "fractions": BlockGridAnim,
  "decimals": NumberLineAnim,
  "number-line": NumberLineAnim,
  "shapes-2d": GeometryAnim,
  "symmetry": GeometryAnim,
  "area-rectangle": BlockGridAnim,
  "perimeter": GeometryAnim,
  "angles": GeometryAnim,
  "patterns": BlockGridAnim,
  "bar-graph": BarChartAnim,
  "clock-time": UnitCircle,

  // ── 02_middle_math: NumberLine / FunctionPlot / BarChart / Geometry ──
  "integers": NumberLineAnim,
  "rational-numbers": NumberLineAnim,
  "linear-equation": FunctionPlotAnim,
  "linear-function": FunctionPlotAnim,
  "similar-triangles": GeometryAnim,
  "circle-properties": GeometryAnim,
  "probability-basic": BarChartAnim,
  "quadratic-equation": FunctionPlotAnim,
  "inequality": FunctionPlotAnim,
  "coordinate-plane": FunctionPlotAnim,
  "statistics-mean": BarChartAnim,
  "exponents": BlockGridAnim,
  "square-root": BlockGridAnim,
  "proportion": FunctionPlotAnim,
  "factoring": FunctionPlotAnim,
  "sets": GeometryAnim,

  // ── 03_middle_physics: Physics ──
  "speed-velocity": PhysicsAnim,
  "force-motion": PhysicsAnim,
  "gravity": PhysicsAnim,
  "light-reflection": GeometryAnim,
  "light-refraction": GeometryAnim,
  "waves-basic": SineWave,
  "electric-circuit": DataStructAnim,
  "density": BarChartAnim,
  "energy-conservation": BarChartAnim,
  "heat-transfer": BarChartAnim,
  "pressure": BarChartAnim,
  "buoyancy": PhysicsAnim,

  // ── 04_high_math: FunctionPlot / UnitCircle ──
  "quadratic-function": FunctionPlotAnim,
  "trigonometric-functions": UnitCircle,
  "logarithm": FunctionPlotAnim,
  "exponential-function": FunctionPlotAnim,
  "limits": FunctionPlotAnim,
  "derivatives": FunctionPlotAnim,
  "integrals": FunctionPlotAnim,
  "sequences-series": BarChartAnim,
  "vectors": PhysicsAnim,
  "matrices": BlockGridAnim,
  "complex-numbers": UnitCircle,
  "permutation-combination": BarChartAnim,
  "conic-sections": FunctionPlotAnim,
  "polynomial": FunctionPlotAnim,
  "arithmetic-series": BarChartAnim,
  "geometric-series": BarChartAnim,
  "binomial-theorem": BarChartAnim,
  "differential-equations": FunctionPlotAnim,
  "probability-distribution": FunctionPlotAnim,

  // ── 05_high_physics: Physics / SineWave ──
  "projectile-motion": PhysicsAnim,
  "circular-motion": PhysicsAnim,
  "simple-harmonic-motion": SineWave,
  "newtons-laws": PhysicsAnim,
  "momentum": PhysicsAnim,
  "work-energy": PhysicsAnim,
  "electric-field": PhysicsAnim,
  "magnetic-field": PhysicsAnim,
  "electromagnetic-induction": PhysicsAnim,
  "wave-interference": SineWave,
  "doppler-effect": SineWave,
  "thermodynamics": BarChartAnim,
  "capacitor": BarChartAnim,
  "ohms-law": BarChartAnim,
  "pendulum": PhysicsAnim,
  "nuclear-physics": BarChartAnim,

  // ── 06_data_structures: DataStruct ──
  "array": DataStructAnim,
  "linked-list": DataStructAnim,
  "stack": DataStructAnim,
  "queue": DataStructAnim,
  "binary-tree": DataStructAnim,
  "binary-search-tree": DataStructAnim,
  "heap": DataStructAnim,
  "hash-table": DataStructAnim,
  "graph-traversal": DataStructAnim,
  "sorting-bubble": DataStructAnim,
  "sorting-quick": DataStructAnim,
  "sorting-merge": DataStructAnim,
  "binary-search": DataStructAnim,
  "recursion": DataStructAnim,
  "big-o-notation": FunctionPlotAnim,
  "trie": DataStructAnim,
  "dynamic-programming": DataStructAnim,
  "bfs-dfs": DataStructAnim,
  "dijkstra": DataStructAnim,

  // ── 07_korean_history: Timeline ──
  "gojoseon-era": TimelineAnim,
  "three-kingdoms-era": TimelineAnim,
  "unified-silla": TimelineAnim,
  "goryeo-dynasty": TimelineAnim,
  "joseon-dynasty": TimelineAnim,
  "japanese-occupation": TimelineAnim,
  "korean-war": TimelineAnim,
  "modern-korea": TimelineAnim,

  // ── Extra elementary: Geometry ──
  "area-triangle": GeometryAnim,
  "area-parallelogram": GeometryAnim,
  "area-trapezoid": GeometryAnim,
  "area-circle": GeometryAnim,

  // ── 08_software_engineering: BarChart (process flow) ──
  "sdlc": BarChartAnim,
  "waterfall-model": BarChartAnim,
  "agile-methodology": BarChartAnim,
  "uml-class-diagram": DataStructAnim,
  "uml-sequence-diagram": DataStructAnim,
  "design-patterns": DataStructAnim,
  "solid-principles": BarChartAnim,
  "cicd-pipeline": BarChartAnim,
  "testing-strategy": BarChartAnim,
  "microservices-architecture": DataStructAnim,
  "git-workflow": DataStructAnim,
  "er-diagram": DataStructAnim,
  "database-normalization": BarChartAnim,
  "state-diagram": DataStructAnim,
};

export function getAnimationComponent(type: string): AnimationComponent {
  return registry[type] ?? BarChartAnim;
}
