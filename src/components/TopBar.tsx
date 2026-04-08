import { ThemePicker } from "./ThemePicker";
import type { ThemeId } from "../lib/themes";
import type { LocalizedText } from "../lib/types";

interface TopBarProps {
  isPromptView: boolean;
  onTogglePrompt: () => void;
  currentTheme: ThemeId;
  onChangeTheme: (id: ThemeId) => void;
  t: (key: string) => string;
  localized: (text: LocalizedText) => string;
}

export function TopBar({
  isPromptView,
  onTogglePrompt,
  currentTheme,
  onChangeTheme,
  t,
  localized,
}: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="top-bar-right">
        <button
          className={`btn-icon ${isPromptView ? "active" : ""}`}
          onClick={onTogglePrompt}
          title={t("sidebar.prompt")}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2.5" y="3" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 7h4M5.5 9.5h7M5.5 12h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
        <ThemePicker
          currentTheme={currentTheme}
          onChangeTheme={onChangeTheme}
          localized={localized}
        />
      </div>
    </div>
  );
}
