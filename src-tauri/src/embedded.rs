use include_dir::{include_dir, Dir};
use std::fs;
use std::path::PathBuf;

static EMBEDDED_LIBRARY: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/../library");

/// Extract embedded library files to a target directory.
/// Returns the path if extraction succeeded.
pub fn extract_default_library() -> Option<PathBuf> {
    let base = dirs_path().ok()?;
    let lib_dir = base.join("library");

    if lib_dir.exists() {
        return Some(lib_dir);
    }

    extract_dir(&EMBEDDED_LIBRARY, &lib_dir).ok()?;
    Some(lib_dir)
}

fn dirs_path() -> Result<PathBuf, ()> {
    #[cfg(target_os = "macos")]
    {
        if let Some(home) = std::env::var_os("HOME") {
            let p = PathBuf::from(home)
                .join("Library")
                .join("Application Support")
                .join("md.playgraph");
            return Ok(p);
        }
    }
    #[cfg(target_os = "linux")]
    {
        if let Some(data) = std::env::var_os("XDG_DATA_HOME") {
            return Ok(PathBuf::from(data).join("playgraph"));
        }
        if let Some(home) = std::env::var_os("HOME") {
            return Ok(PathBuf::from(home).join(".local/share/playgraph"));
        }
    }
    #[cfg(target_os = "windows")]
    {
        if let Some(appdata) = std::env::var_os("APPDATA") {
            return Ok(PathBuf::from(appdata).join("playgraph"));
        }
    }
    Err(())
}

fn extract_dir(dir: &Dir<'_>, target: &PathBuf) -> std::io::Result<()> {
    fs::create_dir_all(target)?;
    for file in dir.files() {
        let dest = target.join(file.path());
        if let Some(parent) = dest.parent() {
            fs::create_dir_all(parent)?;
        }
        fs::write(&dest, file.contents())?;
    }
    for sub in dir.dirs() {
        extract_dir(sub, target)?;
    }
    Ok(())
}
