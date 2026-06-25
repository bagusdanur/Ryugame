"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationKey } from "./translations";

export type Language = "en" | "id" | "ja";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("lang") as Language;
      if (savedLang === "en" || savedLang === "id" || savedLang === "ja") {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.error("Failed to load language from localStorage:", e);
    }
    setIsMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {
      console.error("Failed to save language to localStorage:", e);
    }
  };

  // Update HTML lang attribute
  useEffect(() => {
    if (isMounted) {
      document.documentElement.lang = language;
    }
  }, [language, isMounted]);

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const langDict = translations[language] || translations.en;
    let translation = langDict[key] || translations.en[key] || key;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        translation = translation.replace(new RegExp(`{${k}}`, "g"), String(v));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
