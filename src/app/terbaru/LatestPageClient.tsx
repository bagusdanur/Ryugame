"use client";

import React from "react";
import { Award } from "lucide-react";
import { GameCardItem } from "@/services/api";
import LoadMoreGames from "./LoadMoreGames";
import { useLanguage } from "@/i18n/LanguageContext";

interface LatestPageClientProps {
  games: GameCardItem[];
  totalPages: number;
}

export default function LatestPageClient({ games, totalPages }: LatestPageClientProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card/30 border border-border/20 p-6 rounded-3xl backdrop-blur-md">
        <div className="bg-primary/10 p-3 rounded-2xl text-primary">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{t("latest.title")}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{t("latest.subtitle")}</p>
        </div>
      </div>

      {/* Grid with Load More */}
      {games.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("latest.empty")}</p>
        </div>
      ) : (
        <LoadMoreGames initialGames={games} initialTotalPages={totalPages} />
      )}
    </div>
  );
}

export function LatestPageError() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
      <h1 className="text-2xl font-black">{t("latest.load_failed")}</h1>
      <p className="text-muted-foreground mt-2">{t("latest.load_failed_desc")}</p>
    </div>
  );
}
