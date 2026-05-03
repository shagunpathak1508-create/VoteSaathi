// lib/useCandidateData.ts
"use client";

import { useState, useEffect } from "react";
import type { ConstituencyData } from "@/lib/types";

let cache: Record<string, ConstituencyData> | null = null;

/**
 * Custom hook that fetches and caches the 2024 Lok Sabha candidate dataset.
 * Data is loaded once from /data/candidates2024.json and cached in module scope
 * to avoid repeated network requests across re-renders.
 * @returns An object containing the candidate data map, loading state, and error flag
 */
export function useCandidateData(): {
  data: Record<string, ConstituencyData>;
  loading: boolean;
  error: boolean;
} {
  const [data, setData] = useState<Record<string, ConstituencyData>>(cache ?? {});
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache) return;
    fetch("/data/candidates2024.json")
      .then((r) => r.json())
      .then((json: Record<string, ConstituencyData>) => {
        cache = json;
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
