import { useState, useEffect, useCallback } from "react";
import type { ConceptMeta } from "../lib/types";
import { scanLibrary } from "../lib/tauri";

export function useLibrary() {
  const [concepts, setConcepts] = useState<ConceptMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await scanLibrary();
      setConcepts(data);
      setError(null);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { concepts, loading, error, refresh };
}
