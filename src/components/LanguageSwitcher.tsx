"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/i18n/LanguageContext";
import { Globe, Check } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "id", label: "Bahasa Indonesia" },
    { code: "ja", label: "日本語" },
  ];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-muted/80 border border-border/40 transition-colors text-foreground text-sm font-semibold cursor-pointer"
        aria-label="Change Language"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="uppercase text-xs tracking-wider text-muted-foreground font-mono">
          {currentLanguage.code}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-card border border-border/50 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-left text-sm transition-colors hover:bg-muted cursor-pointer font-semibold ${
                language === lang.code ? "text-primary bg-primary/5" : "text-foreground"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="uppercase text-[10px] tracking-wider text-muted-foreground font-mono bg-muted/60 px-1.5 py-0.5 rounded">
                  {lang.code}
                </span>
                <span>{lang.label}</span>
              </div>
              {language === lang.code && <Check className="w-4 h-4 text-primary shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
