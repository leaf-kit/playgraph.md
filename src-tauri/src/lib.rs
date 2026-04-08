mod commands;
mod models;
mod parser;
pub mod state;
mod watcher;

use state::LibraryPath;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(LibraryPath::new())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            if let Err(e) = watcher::start_watching(app.handle().clone()) {
                log::error!("Failed to start file watcher: {}", e);
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::scan::scan_library,
            commands::read_concept::read_concept,
            commands::graph::get_graph_data,
            commands::open_folder::open_folder,
            commands::open_folder::get_current_library_path,
            commands::save_concept::save_concept,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
