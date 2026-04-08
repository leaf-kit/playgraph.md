import { useState, useCallback } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { ConceptViewer } from "./ConceptViewer";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { PromptGenerator } from "./PromptGenerator";
import { useLibrary } from "../hooks/useLibrary";
import { useI18n } from "../hooks/useI18n";
import { useFileWatcher } from "../hooks/useFileWatcher";
import { useTheme } from "../hooks/useTheme";
import { openFolderDialog } from "../lib/tauri";
import type { Lang, LocalizedText } from "../lib/types";

type View = "concept" | "graph" | "prompt";

export function Layout() {
  const { lang, toggleLang, t, localized } = useI18n();
  const { theme, changeTheme } = useTheme();
  const { concepts, refresh } = useLibrary();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<View>("concept");
  const [libraryPath, setLibraryPath] = useState<string | null>(null);

  useFileWatcher(useCallback(() => { refresh(); }, [refresh]));

  const handleSelectConcept = useCallback((id: string) => {
    setSelectedId(id);
    setView("concept");
  }, []);

  const handleToggleGraph = useCallback(() => {
    setView((prev) => (prev === "graph" ? "concept" : "graph"));
  }, []);

  const handleTogglePrompt = useCallback(() => {
    setView((prev) => (prev === "prompt" ? "concept" : "prompt"));
  }, []);

  const handleOpenFolder = useCallback(async () => {
    const path = await openFolderDialog();
    if (path) { setLibraryPath(path); setSelectedId(null); refresh(); }
  }, [refresh]);

  return (
    <div className="layout">
      <Sidebar
        concepts={concepts}
        selectedId={selectedId}
        onSelect={handleSelectConcept}
        onToggleGraph={handleToggleGraph}
        onOpenFolder={handleOpenFolder}
        libraryPath={libraryPath}
        lang={lang}
        onToggleLang={toggleLang}
        t={t}
        localized={localized}
        isGraphView={view === "graph"}
      />
      <div className="main-column">
        <TopBar
          isPromptView={view === "prompt"}
          onTogglePrompt={handleTogglePrompt}
          currentTheme={theme}
          onChangeTheme={changeTheme}
          t={t}
          localized={localized}
        />
        <main className="main-content">
          {view === "prompt" ? (
            <PromptGenerator lang={lang} t={t} localized={localized} />
          ) : view === "graph" ? (
            <KnowledgeGraph lang={lang} localized={localized} onSelectConcept={handleSelectConcept} />
          ) : selectedId ? (
            <ConceptViewer id={selectedId} lang={lang} localized={localized} onSelectConcept={handleSelectConcept} />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                  <path d="M30 50 Q40 20 50 50" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                  <circle cx="40" cy="35" r="3" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
              <h2>{t("app.subtitle")}</h2>
              <p>{t("graph.clickToExplore")}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export type { Lang, LocalizedText };
