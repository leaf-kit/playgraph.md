import { useState, useRef, useEffect } from "react";
import { THEMES, type ThemeId } from "../lib/themes";
import type { LocalizedText } from "../lib/types";

interface ThemePickerProps {
  currentTheme: ThemeId;
  onChangeTheme: (id: ThemeId) => void;
  localized: (text: LocalizedText) => string;
}

export function ThemePicker({
  currentTheme,
  onChangeTheme,
  localized,
}: ThemePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="theme-picker" ref={ref}>
      <button
        className="btn-icon"
        onClick={() => setOpen(!open)}
        title="Theme"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M9 2.5A6.5 6.5 0 009 15.5V2.5z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </button>

      {open && (
        <div className="theme-dropdown">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`theme-option ${currentTheme === t.id ? "active" : ""}`}
              onClick={() => {
                onChangeTheme(t.id);
                setOpen(false);
              }}
            >
              <span
                className="theme-swatch"
                style={{ background: t.preview }}
              />
              <span className="theme-label">{localized(t.label)}</span>
              {currentTheme === t.id && (
                <svg
                  className="theme-check"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 7l3 3 5-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
