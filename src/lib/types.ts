export interface LocalizedText {
  kr: string;
  en: string;
}

export type Lang = "kr" | "en";

export interface AnimParam {
  default: number | boolean;
  min?: number;
  max?: number;
  step?: number;
  label?: LocalizedText;
}

export interface MathAnimBlock {
  anim_type: string;
  params: Record<string, AnimParam>;
  raw: string;
}

export interface ConceptMeta {
  id: string;
  title: LocalizedText;
  difficulty: string;
  connections: string[];
  file_path: string;
  category: string;
}

export interface ConceptFull {
  meta: ConceptMeta;
  body_html: string;
  raw_markdown: string;
  animations: MathAnimBlock[];
  mermaid_blocks: string[];
}

export interface GraphNode {
  id: string;
  title: LocalizedText;
  difficulty: string;
  category: string;
  // d3-force adds these at runtime
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphEdge {
  source: string | GraphNode;
  target: string | GraphNode;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
