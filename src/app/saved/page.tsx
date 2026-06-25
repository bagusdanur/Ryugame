"use client";

import React from "react";
import { Bookmark, ArrowRight } from "lucide-react";
import { useBookmarks } from "@/context/BookmarksContext";
import GameCard from "@/components/GameCard";
import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";

export default function SavedPage() {
  const { bookmarks } = useBookmarks();
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card/30 border border-border/20 p-6 rounded-3xl backdrop-blur-md">
        <div className="bg-primary/10 p-3 rounded-2xl text-primary animate-pulse">
          <Bookmark className="w-6 h-6 fill-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{t("saved.title")}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{t("saved.subtitle")}</p>
        </div>
      </div>

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[45vh] bg-card/15 border border-border/20 rounded-3xl p-8 text-center space-y-5">
          <div className="bg-muted/40 p-4.5 rounded-full border border-border/50 shadow-inner">
            <Bookmark className="w-10 h-10 text-muted-foreground opacity-55" />
          </div>
          <div className="max-w-md space-y-1.5">
            <h2 className="text-xl font-bold text-white">{t("saved.empty")}</h2>
            <p className="text-sm text-muted-foreground">{t("saved.empty_desc")}</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 bg-primary text-primary-foreground font-black px-6 py-3 rounded-full shadow-md shadow-primary/10 hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer"
          >
            {t("saved.browse_btn")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
          {bookmarks.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
