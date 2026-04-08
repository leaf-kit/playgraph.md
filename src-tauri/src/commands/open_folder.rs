use crate::state::LibraryPath;
use std::path::PathBuf;
use tauri::State;

#[tauri::command]
pub fn open_folder(
    path: String,
    state: State<'_, LibraryPath>,
) -> Result<String, String> {
    let path = PathBuf::from(&path);
    if !path.exists() {
        return Err(format!("Directory not found: {}", path.display()));
    }
    if !path.is_dir() {
        return Err(format!("Not a directory: {}", path.display()));
    }
    let display = path.display().to_string();
    state.set(path);
    Ok(display)
}

#[tauri::command]
pub fn get_current_library_path(
    state: State<'_, LibraryPath>,
    app_handle: tauri::AppHandle,
) -> Result<Option<String>, String> {
    let resolved = crate::state::resolve_library_path(&state, &app_handle);
    Ok(resolved.map(|p| p.display().to_string()))
}
