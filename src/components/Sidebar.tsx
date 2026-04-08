import { useState, useMemo } from "react";
import type { ConceptMeta, Lang, LocalizedText } from "../lib/types";

interface SidebarProps {
  concepts: ConceptMeta[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleGraph: () => void;
  onOpenFolder: () => void;
  libraryPath: string | null;
  lang: Lang;
  onToggleLang: () => void;
  t: (key: string) => string;
  localized: (text: LocalizedText) => string;
  isGraphView: boolean;
}

const CATEGORY_LABELS: Record<string, LocalizedText> = {
  "01_elementary_math": { kr: "초등 수학", en: "Elementary Math" },
  "02_middle_math": { kr: "중등 수학", en: "Middle School Math" },
  "03_middle_physics": { kr: "중등 물리", en: "Middle School Physics" },
  "04_high_math": { kr: "고등 수학", en: "High School Math" },
  "05_high_physics": { kr: "고등 물리", en: "High School Physics" },
  "06_data_structures": { kr: "자료구조", en: "Data Structures" },
  "07_korean_history": { kr: "한국사 연표", en: "Korean History" },
  "08_software_engineering": { kr: "소프트웨어 공학", en: "Software Engineering" },
};

const DIFFICULTY_COLORS: Record<string, string> = {
  "Elementary": "#4ade80",
  "Middle-1": "#60a5fa",
  "Middle-2": "#818cf8",
  "Middle-3": "#a78bfa",
  "High-1": "#f472b6",
  "High-2": "#fb923c",
  "High-3": "#ef4444",
};

export function Sidebar({
  concepts,
  selectedId,
  onSelect,
  onToggleGraph,
  onOpenFolder,
  libraryPath,
  lang,
  onToggleLang,
  t,
  localized,
  isGraphView,
}: SidebarProps) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const grouped = useMemo(() => {
    const filtered = concepts.filter((c) => {
      const query = search.toLowerCase();
      return (
        c.title.kr.toLowerCase().includes(query) ||
        c.title.en.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query)
      );
    });
    const groups: Record<string, ConceptMeta[]> = {};
    for (const c of filtered) {
      const cat = c.category || "uncategorized";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(c);
    }
    return groups;
  }, [concepts, search]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">{t("app.title")}</h1>
        <div className="sidebar-actions">
          <button className="btn-icon" onClick={onOpenFolder} title={t("sidebar.openFolder")}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5.5V14a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1H9l-1.5-2H3a1 1 0 00-1 1v1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
          <button className={`btn-icon ${isGraphView ? "active" : ""}`} onClick={onToggleGraph} title={t("sidebar.graph")}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="14" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="6" y1="5" x2="7.5" y2="12" stroke="currentColor" strokeWidth="1.2" />
              <line x1="12" y1="5" x2="10.5" y2="12" stroke="currentColor" strokeWidth="1.2" />
              <line x1="6.5" y1="4" x2="11.5" y2="4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <button className="btn-lang" onClick={onToggleLang}>{t("lang.toggle")}</button>
        </div>
      </div>

      {libraryPath && (
        <div className="sidebar-path" title={libraryPath}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 3.5V10a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H6.5L5.5 3H1.5a.5.5 0 00-.5.5z" fill="currentColor" opacity="0.5" />
          </svg>
          <span>{libraryPath.split("/").slice(-2).join("/")}</span>
        </div>
      )}

      <div className="sidebar-search">
        <input type="text" placeholder={t("sidebar.search")} value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="sidebar-collapse-bar">
        <button
          className="collapse-all-btn"
          onClick={() => {
            const allKeys = Object.keys(grouped);
            const allCollapsed = allKeys.every((k) => collapsed[k]);
            const next: Record<string, boolean> = {};
            allKeys.forEach((k) => { next[k] = !allCollapsed; });
            setCollapsed(next);
          }}
        >
          {Object.keys(grouped).every((k) => collapsed[k]) ? "Expand All" : "Collapse All"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([category, items]) => {
            const isCollapsed = collapsed[category] ?? false;
            return (
              <div key={category} className="concept-group">
                <button
                  className="group-title"
                  onClick={() => setCollapsed((prev) => ({ ...prev, [category]: !isCollapsed }))}
                >
                  <svg
                    className={`group-chevron ${isCollapsed ? "collapsed" : ""}`}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M4 2.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{CATEGORY_LABELS[category] ? localized(CATEGORY_LABELS[category]) : category}</span>
                  <span className="group-count">{items.length}</span>
                </button>
                {!isCollapsed &&
                  items.map((c) => (
                    <button
                      key={c.id}
                      className={`concept-item ${selectedId === c.id ? "selected" : ""}`}
                      onClick={() => onSelect(c.id)}
                    >
                      <span className="difficulty-dot" style={{ backgroundColor: DIFFICULTY_COLORS[c.difficulty] ?? "#94a3b8" }} />
                      <span className="concept-name">{localized(c.title)}</span>
                    </button>
                  ))}
              </div>
            );
          })}
      </nav>
    </aside>
  );
}
