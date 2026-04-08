import { useRef, useEffect, useState } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
} from "d3-force";
import { zoom as d3Zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { drag as d3Drag } from "d3-drag";
import type { GraphNode, GraphEdge, Lang, LocalizedText } from "../lib/types";
import { getGraphData } from "../lib/tauri";

interface KnowledgeGraphProps {
  lang: Lang;
  localized: (text: LocalizedText) => string;
  onSelectConcept: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  "01_arithmetic": "#fbbf24",
  "02_geometry": "#60a5fa",
  "03_algebra": "#a78bfa",
  "04_functions": "#f472b6",
  "05_calculus": "#fb923c",
  "06_statistics": "#4ade80",
};

const DIFFICULTY_SIZE: Record<string, number> = {
  Elementary: 15,
  "Middle-1": 18,
  "Middle-2": 20,
  "Middle-3": 22,
  "High-1": 25,
  "High-2": 28,
  "High-3": 30,
};

export function KnowledgeGraph({
  lang,
  onSelectConcept,
}: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);

  useEffect(() => {
    getGraphData().then((data) => {
      setNodes(data.nodes.map((n) => ({ ...n })));
      setEdges(data.edges.map((e) => ({ ...e })));
    });
  }, []);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous
    svg.selectAll("g.graph-content").remove();

    const g = svg.append("g").attr("class", "graph-content");

    // Zoom
    const zoomBehavior = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, zoomIdentity.translate(width / 2, height / 2));

    // Simulation
    const simulation = forceSimulation(nodes as any)
      .force(
        "link",
        forceLink(edges as any)
          .id((d: any) => d.id)
          .distance(120)
      )
      .force("charge", forceManyBody().strength(-300))
      .force("center", forceCenter(0, 0))
      .force("collide", forceCollide(40));

    // Edges
    const linkG = g
      .selectAll("line.graph-edge")
      .data(edges)
      .enter()
      .append("line")
      .attr("class", "graph-edge")
      .attr("stroke", "rgba(255,255,255,0.15)")
      .attr("stroke-width", 1.5);

    // Node groups
    const nodeG = g
      .selectAll("g.graph-node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "graph-node")
      .style("cursor", "pointer")
      .on("click", (_, d) => {
        onSelectConcept(d.id);
      });

    // Glow effect
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Circles
    nodeG
      .append("circle")
      .attr("r", (d) => (DIFFICULTY_SIZE[d.difficulty] ?? 20) * 0.8)
      .attr("fill", (d) => CATEGORY_COLORS[d.category] ?? "#94a3b8")
      .attr("opacity", 0.8)
      .attr("filter", "url(#glow)");

    // Labels
    nodeG
      .append("text")
      .text((d) => d.title[lang])
      .attr("dy", (d) => (DIFFICULTY_SIZE[d.difficulty] ?? 20) + 14)
      .attr("text-anchor", "middle")
      .attr("fill", "rgba(255,255,255,0.8)")
      .attr("font-size", "11px")
      .attr("font-family", "sans-serif");

    // Simulation tick
    simulation.on("tick", () => {
      linkG
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeG.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag
    const dragBehavior = d3Drag<SVGGElement, GraphNode & SimulationNodeDatum>()
      .on("start", (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeG.call(dragBehavior as any);

    return () => {
      simulation.stop();
    };
  }, [nodes, edges, lang, onSelectConcept]);

  return (
    <div className="knowledge-graph">
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
}
