"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 py-8 mt-12 bg-card/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} RyuGame. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
