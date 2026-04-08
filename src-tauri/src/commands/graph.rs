use crate::commands::scan::scan_library_dir;
use crate::models::{GraphData, GraphEdge, GraphNode};
use crate::state::LibraryPath;
use std::collections::HashSet;

pub fn build_graph_data(library_path: &std::path::Path) -> GraphData {
    let concepts = scan_library_dir(library_path);
    let known_ids: HashSet<&str> = concepts.iter().map(|c| c.id.as_str()).collect();

    let nodes: Vec<GraphNode> = concepts
        .iter()
        .map(|c| GraphNode {
            id: c.id.clone(),
            title: c.title.clone(),
            difficulty: c.difficulty.clone(),
            category: c.category.clone(),
        })
        .collect();

    let mut edges = Vec::new();
    let mut seen_edges: HashSet<(String, String)> = HashSet::new();

    for concept in &concepts {
        for conn in &concept.connections {
            if known_ids.contains(conn.as_str()) {
                let edge_key = if concept.id < *conn {
                    (concept.id.clone(), conn.clone())
                } else {
                    (conn.clone(), concept.id.clone())
                };
                if seen_edges.insert(edge_key) {
                    edges.push(GraphEdge {
                        source: concept.id.clone(),
                        target: conn.clone(),
                    });
                }
            }
        }
    }

    GraphData { nodes, edges }
}

#[tauri::command]
pub fn get_graph_data(
    state: tauri::State<'_, LibraryPath>,
    app_handle: tauri::AppHandle,
) -> Result<GraphData, String> {
    let library_path = crate::state::resolve_library_path(&state, &app_handle);

    match library_path {
        Some(p) => Ok(build_graph_data(&p)),
        None => Ok(GraphData {
            nodes: Vec::new(),
            edges: Vec::new(),
        }),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use tempfile::tempdir;

    #[test]
    fn test_build_graph_data() {
        let dir = tempdir().unwrap();
        let func_dir = dir.path().join("04_functions");
        fs::create_dir_all(&func_dir).unwrap();

        fs::write(
            func_dir.join("sine-wave.md"),
            r#"---
id: "sine-wave"
title: { kr: "사인 함수", en: "Sine Wave" }
difficulty: "Middle-3"
connections: ["unit-circle"]
---
# Sine Wave
"#,
        )
        .unwrap();

        fs::write(
            func_dir.join("unit-circle.md"),
            r#"---
id: "unit-circle"
title: { kr: "단위원", en: "Unit Circle" }
difficulty: "High-1"
connections: ["sine-wave"]
---
# Unit Circle
"#,
        )
        .unwrap();

        let graph = build_graph_data(dir.path());
        assert_eq!(graph.nodes.len(), 2);
        assert_eq!(graph.edges.len(), 1);
        assert_eq!(graph.edges[0].source, "sine-wave");
        assert_eq!(graph.edges[0].target, "unit-circle");
    }
}
