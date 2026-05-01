"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Language, t as translate } from "@/lib/i18n";
import { useFirebaseUser } from "@/lib/useFirebaseUser";
import { saveLanguage, loadLanguage } from "@/lib/firestoreHelpers";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const { uid } = useFirebaseUser();

  // Load language preference from Firestore on mount (when uid becomes available)
  useEffect(() => {
    if (!uid) return;
    loadLanguage(uid).then((savedLang) => {
      if (savedLang === "en" || savedLang === "hi") {
        setLangState(savedLang);
      }
    });
  }, [uid]);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    // Save language to Firestore (fire-and-forget)
    if (uid) {
      saveLanguage(uid, newLang).then().catch(() => {});
    }
  }, [uid]);

  const t = useCallback(
    (key: string) => translate(key, lang),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
