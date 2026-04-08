import { useState, useEffect, useCallback } from "react";
import type { ConceptFull } from "../lib/types";
import { readConcept } from "../lib/tauri";

export function useConcept(id: string | null) {
  const [concept, setConcept] = useState<ConceptFull | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!id) {
      setConcept(null);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await readConcept(id!);
        if (!cancelled) {
          setConcept(data);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(String(e));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id, revision]);

  const reload = useCallback(() => {
    setRevision((r) => r + 1);
  }, []);

  return { concept, loading, error, reload };
}
