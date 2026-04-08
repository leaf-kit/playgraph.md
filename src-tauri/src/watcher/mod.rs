use notify_debouncer_mini::{new_debouncer, DebouncedEventKind};
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Manager};

pub fn start_watching(app_handle: AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let library_path = resolve_library_path(&app_handle);

    let library_path = match library_path {
        Some(p) => p,
        None => {
            log::warn!("Library directory not found, file watcher not started");
            return Ok(());
        }
    };

    let app_handle = Arc::new(app_handle);
    let app_handle_clone = Arc::clone(&app_handle);

    let mut debouncer = new_debouncer(
        Duration::from_millis(300),
        move |res: Result<Vec<notify_debouncer_mini::DebouncedEvent>, notify::Error>| match res
        {
            Ok(events) => {
                let has_md_change = events.iter().any(|e| {
                    e.kind == DebouncedEventKind::Any
                        && e.path
                            .extension()
                            .map(|ext| ext == "md")
                            .unwrap_or(false)
                });

                if has_md_change {
                    let _ = app_handle_clone.emit("library-changed", ());
                }
            }
            Err(e) => {
                log::error!("File watcher error: {:?}", e);
            }
        },
    )?;

    debouncer
        .watcher()
        .watch(&library_path, notify::RecursiveMode::Recursive)?;

    // Keep the debouncer alive by leaking it (it needs to live for the app lifetime)
    std::mem::forget(debouncer);

    log::info!("File watcher started for {:?}", library_path);
    Ok(())
}

fn resolve_library_path(app_handle: &AppHandle) -> Option<PathBuf> {
    let resource_lib = app_handle
        .path()
        .resource_dir()
        .ok()
        .map(|p| p.join("library"));

    if let Some(ref p) = resource_lib {
        if p.exists() {
            return resource_lib;
        }
    }

    let cwd_lib = std::env::current_dir().ok()?.join("library");
    if cwd_lib.exists() {
        Some(cwd_lib)
    } else {
        None
    }
}
