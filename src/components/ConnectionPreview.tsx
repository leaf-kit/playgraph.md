import { useState, useRef, useEffect } from "react";
import { readConcept } from "../lib/tauri";
import type { ConceptFull, Lang, LocalizedText } from "../lib/types";

interface ConnectionPreviewProps {
  conceptId: string;
  lang: Lang;
  localized: (text: LocalizedText) => string;
  onClick: (id: string) => void;
}

export function ConnectionPreview({
  conceptId,
  lang,
  localized,
  onClick,
}: ConnectionPreviewProps) {
  const [hovered, setHovered] = useState(false);
  const [preview, setPreview] = useState<ConceptFull | null>(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const tagRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setHovered(true);
      if (!preview && !loading) {
        setLoading(true);
        readConcept(conceptId)
          .then((data) => setPreview(data))
          .catch(() => {})
          .finally(() => setLoading(false));
      }
      // Decide popup direction
      if (tagRef.current) {
        const rect = tagRef.current.getBoundingClientRect();
        const spaceAbove = rect.top;
        setPosition(spaceAbove > 260 ? "above" : "below");
      }
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setHovered(false);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <span className="connection-preview-wrapper">
      <button
        ref={tagRef}
        className="connection-tag clickable"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(conceptId)}
      >
        {conceptId}
      </button>

      {hovered && (
        <div className={`connection-popup ${position}`}>
          {loading ? (
            <div className="popup-loading">
              <div className="spinner small" />
            </div>
          ) : preview ? (
            <>
              <div className="popup-header">
                <strong>{localized(preview.meta.title)}</strong>
                <span className="popup-difficulty">
                  {preview.meta.difficulty}
                </span>
              </div>
              <p className="popup-body">
                {stripHtml(preview.body_html).slice(0, 200)}
                {stripHtml(preview.body_html).length > 200 ? "..." : ""}
              </p>
              {preview.animations.length > 0 && (
                <div className="popup-anim-count">
                  {preview.animations.length} animation
                  {preview.animations.length > 1 ? "s" : ""}
                </div>
              )}
            </>
          ) : (
            <p className="popup-body">Not found</p>
          )}
        </div>
      )}
    </span>
  );
}
