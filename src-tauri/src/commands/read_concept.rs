use crate::models::ConceptFull;
use crate::parser::frontmatter::extract_frontmatter;
use crate::parser::math_anim::{extract_math_anim_blocks, markdown_to_html};
use crate::state::LibraryPath;
use std::fs;
use std::path::Path;
use walkdir::WalkDir;

fn find_concept_file(library_path: &Path, concept_id: &str) -> Option<std::path::PathBuf> {
    WalkDir::new(library_path)
        .into_iter()
        .filter_map(|e| e.ok())
        .find(|entry| {
            let path = entry.path();
            if path.extension().and_then(|e| e.to_str()) != Some("md") {
                return false;
            }
            let content = match fs::read_to_string(path) {
                Ok(c) => c,
                Err(_) => return false,
            };
            extract_frontmatter(&content)
                .map(|(fm, _)| fm.id == concept_id)
                .unwrap_or(false)
        })
        .map(|e| e.path().to_path_buf())
}

fn category_from_path(path: &Path, library_root: &Path) -> String {
    path.strip_prefix(library_root)
        .ok()
        .and_then(|rel| rel.components().next())
        .map(|c| c.as_os_str().to_string_lossy().to_string())
        .unwrap_or_default()
}

pub fn read_concept_from_path(
    file_path: &Path,
    library_root: &Path,
) -> Result<ConceptFull, String> {
    let content = fs::read_to_string(file_path).map_err(|e| e.to_string())?;

    let (fm, body) =
        extract_frontmatter(&content).ok_or_else(|| "No frontmatter found".to_string())?;

    let (cleaned_body, animations, mermaid_blocks) = extract_math_anim_blocks(body);
    let body_html = markdown_to_html(&cleaned_body);
    let category = category_from_path(file_path, library_root);

    Ok(ConceptFull {
        meta: crate::models::ConceptMeta {
            id: fm.id,
            title: fm.title,
            difficulty: fm.difficulty,
            connections: fm.connections,
            file_path: file_path.to_string_lossy().to_string(),
            category,
        },
        body_html,
        raw_markdown: content.clone(),
        animations,
        mermaid_blocks,
    })
}

#[tauri::command]
pub fn read_concept(
    state: tauri::State<'_, LibraryPath>,
    app_handle: tauri::AppHandle,
    id: String,
) -> Result<ConceptFull, String> {
    let library_path = crate::state::resolve_library_path(&state, &app_handle)
        .ok_or_else(|| "Library directory not found".to_string())?;

    let file_path = find_concept_file(&library_path, &id)
        .ok_or_else(|| format!("Concept '{}' not found", id))?;

    read_concept_from_path(&file_path, &library_path)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use tempfile::tempdir;

    #[test]
    fn test_read_concept_from_path() {
        let dir = tempdir().unwrap();
        let func_dir = dir.path().join("04_functions");
        fs::create_dir_all(&func_dir).unwrap();

        let file = func_dir.join("sine-wave.md");
        fs::write(
            &file,
            r#"---
id: "sine-wave"
title: { kr: "사인 함수", en: "Sine Wave" }
difficulty: "Middle-3"
connections: ["unit-circle"]
---

# Sine Wave

$$y = A \sin(Bx)$$

```math-anim
type: sine-wave
params:
  amplitude: { default: 1, min: 0.1, max: 3, step: 0.1, label: { kr: "진폭", en: "Amplitude" } }
```

Related: [[unit-circle]]
"#,
        )
        .unwrap();

        let concept = read_concept_from_path(&file, dir.path()).unwrap();
        assert_eq!(concept.meta.id, "sine-wave");
        assert_eq!(concept.animations.len(), 1);
        assert_eq!(concept.animations[0].anim_type, "sine-wave");
        assert!(concept.body_html.contains("<h1>Sine Wave</h1>"));
        assert!(concept.body_html.contains("data-math-anim"));
    }
}
