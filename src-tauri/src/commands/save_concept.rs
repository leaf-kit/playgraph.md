use std::fs;

#[tauri::command]
pub fn save_concept(file_path: String, content: String) -> Result<(), String> {
    fs::write(&file_path, &content).map_err(|e| format!("Failed to save: {}", e))
}
