// lib/useCandidateData.ts
"use client";

import { useState, useEffect } from "react";
import type { ConstituencyData } from "@/lib/types";

let cache: Record<string, ConstituencyData> | null = null;

export function useCandidateData() {
  const [data, setData] = useState<Record<string, ConstituencyData>>(cache ?? {});
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache) return;
    fetch("/data/candidates2024.json")
      .then((r) => r.json())
      .then((json) => {
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
