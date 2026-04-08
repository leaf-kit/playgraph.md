use crate::models::ConceptMeta;
use crate::parser::frontmatter::extract_frontmatter;
use crate::state::LibraryPath;
use std::fs;
use std::path::Path;
use walkdir::WalkDir;

fn category_from_path(path: &Path, library_root: &Path) -> String {
    path.strip_prefix(library_root)
        .ok()
        .and_then(|rel| rel.components().next())
        .map(|c| c.as_os_str().to_string_lossy().to_string())
        .unwrap_or_default()
}

pub fn scan_library_dir(library_path: &Path) -> Vec<ConceptMeta> {
    let mut concepts = Vec::new();

    for entry in WalkDir::new(library_path)
        .into_iter()
        .filter_map(|e| e.ok())
    {
        let path = entry.path();
        if path.extension().and_then(|e| e.to_str()) != Some("md") {
            continue;
        }

        let content = match fs::read_to_string(path) {
            Ok(c) => c,
            Err(_) => continue,
        };

        if let Some((fm, _)) = extract_frontmatter(&content) {
            let category = category_from_path(path, library_path);
            concepts.push(ConceptMeta {
                id: fm.id,
                title: fm.title,
                difficulty: fm.difficulty,
                connections: fm.connections,
                file_path: path.to_string_lossy().to_string(),
                category,
            });
        }
    }

    concepts.sort_by(|a, b| a.id.cmp(&b.id));
    concepts
}

#[tauri::command]
pub fn scan_library(
    state: tauri::State<'_, LibraryPath>,
    app_handle: tauri::AppHandle,
) -> Result<Vec<ConceptMeta>, String> {
    let library_path = crate::state::resolve_library_path(&state, &app_handle);

    match library_path {
        Some(p) => Ok(scan_library_dir(&p)),
        None => Ok(Vec::new()),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use tempfile::tempdir;

    #[test]
    fn test_scan_library_dir() {
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

        let concepts = scan_library_dir(dir.path());
        assert_eq!(concepts.len(), 1);
        assert_eq!(concepts[0].id, "sine-wave");
        assert_eq!(concepts[0].category, "04_functions");
    }
}
