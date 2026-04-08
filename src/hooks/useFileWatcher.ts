import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";

export function useFileWatcher(onChanged: () => void) {
  useEffect(() => {
    const unlisten = listen("library-changed", () => {
      onChanged();
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, [onChanged]);
}
