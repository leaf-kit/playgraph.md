use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LocalizedText {
    pub kr: String,
    pub en: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Frontmatter {
    pub id: String,
    pub title: LocalizedText,
    pub difficulty: String,
    #[serde(default)]
    pub connections: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConceptMeta {
    pub id: String,
    pub title: LocalizedText,
    pub difficulty: String,
    pub connections: Vec<String>,
    pub file_path: String,
    pub category: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnimParam {
    pub default: serde_json::Value,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub min: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub step: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub label: Option<LocalizedText>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MathAnimBlock {
    pub anim_type: String,
    pub params: HashMap<String, AnimParam>,
    pub raw: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConceptFull {
    pub meta: ConceptMeta,
    pub body_html: String,
    pub raw_markdown: String,
    pub animations: Vec<MathAnimBlock>,
    pub mermaid_blocks: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GraphNode {
    pub id: String,
    pub title: LocalizedText,
    pub difficulty: String,
    pub category: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GraphEdge {
    pub source: String,
    pub target: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GraphData {
    pub nodes: Vec<GraphNode>,
    pub edges: Vec<GraphEdge>,
}
