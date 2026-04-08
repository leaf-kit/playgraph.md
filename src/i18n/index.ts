import kr from "./kr.json";
import en from "./en.json";
import type { Lang } from "../lib/types";

const messages: Record<Lang, Record<string, string>> = { kr, en };

export function t(lang: Lang, key: string): string {
  return messages[lang]?.[key] ?? key;
}
