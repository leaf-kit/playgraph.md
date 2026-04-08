import { useState, useCallback, useRef, useEffect } from "react";
import { useConcept } from "../hooks/useConcept";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ConnectionPreview } from "./ConnectionPreview";
import { CopyButton } from "./CopyButton";
import { saveConcept } from "../lib/tauri";
import type { Lang, LocalizedText } from "../lib/types";

interface ConceptViewerProps {
  id: string;
  lang: Lang;
  localized: (text: LocalizedText) => string;
  onSelectConcept: (id: string) => void;
}

export function ConceptViewer({
  id,
  lang,
  localized,
  onSelectConcept,
}: ConceptViewerProps) {
  const { concept, loading, error, reload } = useConcept(id);
  const [showRaw, setShowRaw] = useState(false);
  const [editText, setEditText] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  // Sync editText when concept changes or switching to raw mode
  useEffect(() => {
    if (concept) {
      setEditText(concept.raw_markdown);
      setIsDirty(false);
      setSaveMsg(null);
    }
  }, [concept]);

  // Stable ref for CopyButton
  const rawRef = useRef("");
  if (concept) {
    rawRef.current = showRaw && isDirty ? editText : concept.raw_markdown;
  }
  const getCopyText = useCallback(() => rawRef.current, []);

  const handleSave = useCallback(async () => {
    if (!concept || !isDirty) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      await saveConcept(concept.meta.file_path, editText);
      setIsDirty(false);
      setSaveMsg("saved");
      setTimeout(() => setSaveMsg(null), 2000);
      // Reload to re-parse the updated markdown
      reload();
    } catch (e) {
      setSaveMsg("error");
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  }, [concept, editText, isDirty, reload]);

  // Ctrl/Cmd+S shortcut while editing
  useEffect(() => {
    if (!showRaw) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showRaw, handleSave]);

  if (loading) {
    return (
      <div className="viewer-loading">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return <div className="viewer-error">{error}</div>;
  }

  if (!concept) {
    return null;
  }

  return (
    <div className="concept-viewer">
      <header className="concept-header">
        <div className="concept-header-top">
          <h1>{localized(concept.meta.title)}</h1>
          <div className="concept-toolbar">
            <button
              className={`toolbar-btn ${showRaw ? "active" : ""}`}
              onClick={() => setShowRaw(!showRaw)}
              title={showRaw ? "Viewer" : "Markdown"}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M4 6l1.5 2L4 10M7.5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{showRaw ? "Viewer" : "MD"}</span>
            </button>
            {showRaw && (
              <button
                className={`toolbar-btn ${saveMsg === "saved" ? "copied" : saving ? "saving" : isDirty ? "dirty" : ""}`}
                onClick={handleSave}
                disabled={!isDirty || saving}
                title="Save (Ctrl+S)"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  {saveMsg === "saved" ? (
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <>
                      <path d="M12.5 14H3.5a1 1 0 01-1-1V3a1 1 0 011-1h7l3 3v9a1 1 0 01-1 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                      <path d="M5 2v3h4V2M5 14v-4h6v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                </svg>
                <span>
                  {saveMsg === "saved" ? "Saved!" : saveMsg === "error" ? "Error" : saving ? "..." : "Save"}
                </span>
              </button>
            )}
            <CopyButton getText={getCopyText} />
          </div>
        </div>
        <div className="concept-meta-bar">
          <span className="difficulty-badge">{concept.meta.difficulty}</span>
          <span className="category-badge">{concept.meta.category}</span>
          {showRaw && isDirty && (
            <span className="dirty-badge">unsaved</span>
          )}
        </div>
      </header>

      {showRaw ? (
        <div className="concept-editor">
          <textarea
            className="editor-textarea"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
              setIsDirty(e.target.value !== concept.raw_markdown);
            }}
            spellCheck={false}
          />
        </div>
      ) : (
        <>
          <div className="concept-body">
            <MarkdownRenderer
              html={concept.body_html}
              animations={concept.animations}
              mermaidBlocks={concept.mermaid_blocks}
              lang={lang}
              localized={localized}
            />
          </div>

          {concept.meta.connections.length > 0 && (
            <footer className="concept-connections">
              <h3>Related</h3>
              <div className="connection-tags">
                {concept.meta.connections.map((conn) => (
                  <ConnectionPreview
                    key={conn}
                    conceptId={conn}
                    lang={lang}
                    localized={localized}
                    onClick={onSelectConcept}
                  />
                ))}
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
}
