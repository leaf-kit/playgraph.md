import { useState, useCallback } from "react";
import type { Lang, LocalizedText } from "../lib/types";
import { t as translate } from "../i18n";

export function useI18n() {
  const [lang, setLang] = useState<Lang>("kr");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "kr" ? "en" : "kr"));
  }, []);

  const t = useCallback(
    (key: string) => translate(lang, key),
    [lang]
  );

  const localized = useCallback(
    (text: LocalizedText) => text[lang],
    [lang]
  );

  return { lang, toggleLang, t, localized };
}
