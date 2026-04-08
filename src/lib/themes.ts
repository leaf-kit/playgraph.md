import type { LocalizedText } from "./types";

export type ThemeId = "midnight" | "ocean" | "forest" | "sunset" | "light";

export interface ThemeDef {
  id: ThemeId;
  label: LocalizedText;
  preview: string; // CSS gradient for the preview swatch
}

export const THEMES: ThemeDef[] = [
  {
    id: "midnight",
    label: { kr: "미드나잇", en: "Midnight" },
    preview: "linear-gradient(135deg, #0f1117, #161822, #60a5fa)",
  },
  {
    id: "ocean",
    label: { kr: "오션", en: "Ocean" },
    preview: "linear-gradient(135deg, #0a1628, #0f2847, #38bdf8)",
  },
  {
    id: "forest",
    label: { kr: "포레스트", en: "Forest" },
    preview: "linear-gradient(135deg, #0b1410, #132a1c, #4ade80)",
  },
  {
    id: "sunset",
    label: { kr: "선셋", en: "Sunset" },
    preview: "linear-gradient(135deg, #1a0f0a, #2d1810, #fb923c)",
  },
  {
    id: "light",
    label: { kr: "라이트", en: "Light" },
    preview: "linear-gradient(135deg, #f8fafc, #e2e8f0, #3b82f6)",
  },
];

export function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
}
