import { useState, useCallback, useEffect } from "react";
import { type ThemeId, applyTheme } from "../lib/themes";

const STORAGE_KEY = "playgraph-theme";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as ThemeId) || "midnight";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const changeTheme = useCallback((id: ThemeId) => {
    setTheme(id);
  }, []);

  return { theme, changeTheme };
}
