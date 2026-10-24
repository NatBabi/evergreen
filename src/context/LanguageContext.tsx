"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteContent, contentEN, contentAM } from "@/data/content";

type Language = "en" | "am";

interface LanguageContextType {
  lang: Language;
  content: SiteContent;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  // Sync html lang attribute and check localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("evergreen_lang") as Language;
      if (saved === "en" || saved === "am") {
        setLang(saved);
        document.documentElement.lang = saved;
      } else {
        document.documentElement.lang = "en";
      }
    } catch {
      document.documentElement.lang = "en";
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
    try {
      localStorage.setItem("evergreen_lang", newLang);
    } catch {
      // Ignore
    }
  };

  const toggleLang = () => {
    handleSetLang(lang === "en" ? "am" : "en");
  };

  const content = lang === "am" ? contentAM : contentEN;

  return (
    <LanguageContext.Provider
      value={{
        lang,
        content,
        setLang: handleSetLang,
        toggleLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
