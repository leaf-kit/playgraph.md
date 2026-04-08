use std::path::PathBuf;
use std::sync::Mutex;

pub struct LibraryPath(pub Mutex<Option<PathBuf>>);

impl LibraryPath {
    pub fn new() -> Self {
        Self(Mutex::new(None))
    }

    pub fn get(&self) -> Option<PathBuf> {
        self.0.lock().unwrap().clone()
    }

    pub fn set(&self, path: PathBuf) {
        *self.0.lock().unwrap() = Some(path);
    }
}

pub fn resolve_library_path(
    state: &LibraryPath,
    app_handle: &tauri::AppHandle,
) -> Option<PathBuf> {
    // 1. User-selected path
    if let Some(p) = state.get() {
        if p.exists() {
            return Some(p);
        }
    }

    // 2. Resource dir / library
    use tauri::Manager;
    if let Ok(resource) = app_handle.path().resource_dir() {
        let lib = resource.join("library");
        if lib.exists() {
            return Some(lib);
        }
    }

    // 3. CWD / library
    if let Ok(cwd) = std::env::current_dir() {
        let lib = cwd.join("library");
        if lib.exists() {
            return Some(lib);
        }
    }

    None
}
