"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Module-level flag to ensure signInAnonymously is called only once
let authInitiated = false;

/**
 * Custom hook that signs in the user anonymously on first visit.
 * Returns { uid, loading }.
 * If anonymous auth fails, generates a random local fallback ID so the app never breaks.
 */
export function useFirebaseUser(): { uid: string | null; loading: boolean } {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUid(user.uid);
          setLoading(false);
        } else {
          // No user signed in — attempt anonymous sign-in once
          if (!authInitiated) {
            authInitiated = true;
            signInAnonymously(auth).catch(() => {
              // Auth failed — generate a fallback local ID
              const fallbackKey = "votesaathi_fallback_uid";
              let fallbackId = localStorage.getItem(fallbackKey);
              if (!fallbackId) {
                fallbackId = "local_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
                localStorage.setItem(fallbackKey, fallbackId);
              }
              setUid(fallbackId);
              setLoading(false);
            });
          }
        }
      },
      () => {
        // onAuthStateChanged error — use fallback
        const fallbackKey = "votesaathi_fallback_uid";
        let fallbackId = localStorage.getItem(fallbackKey);
        if (!fallbackId) {
          fallbackId = "local_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
          localStorage.setItem(fallbackKey, fallbackId);
        }
        setUid(fallbackId);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { uid, loading };
}
