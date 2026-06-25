"use client";

import React from "react";
import { Star, Download, ShieldCheck, Gamepad2, Info, Calendar, Terminal, CheckCircle2, AlertCircle } from "lucide-react";
import { getProxyUrl } from "@/utils/imageProxy";
import { getSafelinkuUrl } from "@/utils/safelinku";
import { useLanguage } from "@/i18n/LanguageContext";

interface GameDetailProps {
  game: {
    title: string;
    slug: string;
    thumbnail: string;
    banner: string;
    status: string;
    developer: string;
    description: string;
    description_en: string;
    engine: string;
    downloads_count: string;
    updated_on: string;
    rating: string;
    tags: string[];
    platforms: string[];
    screenshots: string[];
    downloads: {
      android: { name: string; url: string; platform?: string; category?: string }[];
      win: { name: string; url: string; platform?: string; category?: string }[];
      other: { name: string; url: string; platform?: string; category?: string }[];
    };
  };
}

export default function GameDetailClient({ game }: GameDetailProps) {
  const { language, t } = useLanguage();

  const hasAndroid = game.downloads.android && game.downloads.android.length > 0;
  const hasWin = game.downloads.win && game.downloads.win.length > 0;
  const hasOther = game.downloads.other && game.downloads.other.length > 0;

  return (
    <article className="space-y-10 sm:space-y-12">
      {/* App Store Style Header */}
      <header className="bg-card/30 border border-border/20 p-5 sm:p-6 md:p-8 rounded-3xl backdrop-blur-md flex flex-col gap-6">
        
        {/* Top Section: Side-by-side Layout for Mobile/Desktop */}
        <div className="flex flex-row gap-4 md:gap-8 items-center">
          {/* App Squircle Icon */}
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0 overflow-hidden bg-muted rounded-2xl md:rounded-3xl border border-border/40 shadow-lg md:shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getProxyUrl(game.thumbnail)}
              alt={game.title}
              className="object-cover w-full h-full game-thumbnail"
            />
          </div>

          {/* Title & Stats */}
          <div className="flex-1 min-w-0 space-y-1.5 md:space-y-4">
            <div>
              <h1 className="text-lg sm:text-2xl md:text-5xl font-black text-white tracking-tight leading-tight line-clamp-2 md:line-clamp-none">
                {game.title}
              </h1>
              {game.developer && (
                <p className="text-primary font-semibold text-xs sm:text-sm md:text-base mt-0.5 md:mt-1">{game.developer}</p>
              )}
            </div>

            {/* Quick Metrics (Desktop/Tablet Only) */}
            <div className="hidden sm:flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full border border-yellow-500/10">
                <Star className="w-3.5 h-3.5 fill-yellow-500" />
                {game.rating || "4.5"} Rating
              </span>
              {game.status && (
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/10 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {game.status}
                </span>
              )}
              {game.engine && (
                <span className="bg-sky-500/10 text-sky-400 px-3 py-1.5 rounded-full border border-sky-500/10 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  {game.engine}
                </span>
              )}
              {game.updated_on && (
                <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {game.updated_on}
                </span>
              )}
            </div>
          </div>

          {/* Big Action GET Button (Desktop Only) */}
          <div className="hidden md:block shrink-0">
            <a
              href="#downloads"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all tracking-wider text-base cursor-pointer"
            >
              <Download className="w-5 h-5" /> GET DOWNLOAD
            </a>
          </div>
        </div>

        {/* Quick Metrics (Mobile Only) */}
        <div className="sm:hidden flex flex-wrap items-center gap-2 text-[10px] font-bold text-muted-foreground">
          <span className="flex items-center gap-0.5 bg-yellow-500/10 text-yellow-500 px-2.5 py-1 rounded-full border border-yellow-500/10">
            <Star className="w-3 h-3 fill-yellow-500" />
            {game.rating || "4.5"}
          </span>
          {game.status && (
            <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/10 flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" />
              {game.status}
            </span>
          )}
          {game.engine && (
            <span className="bg-sky-500/10 text-sky-400 px-2.5 py-1 rounded-full border border-sky-500/10 flex items-center gap-0.5">
              <Terminal className="w-3 h-3" />
              {game.engine}
            </span>
          )}
          {game.updated_on && (
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full flex items-center gap-0.5">
              <Calendar className="w-3 h-3" />
              {game.updated_on}
            </span>
          )}
        </div>

        {/* Big Action GET Button (Mobile/Tablet Only) */}
        <div className="md:hidden w-full pt-1">
          <a
            href="#downloads"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-2xl shadow-md shadow-primary/10 hover:scale-102 active:scale-98 transition-all tracking-wide text-sm cursor-pointer"
          >
            <Download className="w-4 h-4" /> GET DOWNLOAD
          </a>
        </div>
      </header>

      {/* Prominent Download Links Section (Directly below Header for Mobile-First visibility) */}
      <section id="downloads" className="bg-card/45 border border-border/20 p-6 sm:p-8 rounded-3xl backdrop-blur-md space-y-6">
        <div className="flex items-center gap-2.5">
          <Download className="text-primary w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black text-white">{t("detail.download_links")}</h2>
        </div>

        {(!hasAndroid && !hasWin && !hasOther) ? (
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-500 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{t("detail.no_downloads")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Tutorial Video Dropdown */}
            <details className="group border border-primary/30 rounded-2xl bg-primary/5 overflow-hidden mb-2 shadow-sm">
              <summary className="flex items-center justify-between p-4 font-bold text-sm text-primary cursor-pointer select-none hover:bg-primary/10 list-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2.5">
                  <Info className="w-5 h-5" />
                  {t("detail.shortlink_tutorial")}
                </span>
                <span className="transition-transform duration-200 group-open:rotate-180 text-primary/70 text-xs">
                  ▼
                </span>
              </summary>
              <div className="p-4 sm:p-6 border-t border-primary/20 bg-card/60">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50 shadow-inner bg-black">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/ng1vEKToVkc?si=IJwAlJ_g41gzcIG6" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">{t("detail.shortlink_help")}</p>
              </div>
            </details>

            {/* Android Dropdown */}
            {hasAndroid && (
              <details className="group border border-border/40 rounded-2xl bg-muted/20 overflow-hidden">
                <summary className="flex items-center justify-between p-4 font-bold text-sm text-foreground cursor-pointer select-none hover:bg-muted/40 list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    {t("detail.android_mirror", { count: game.downloads.android.length })}
                  </span>
                  <span className="transition-transform duration-200 group-open:rotate-180 text-muted-foreground text-xs">
                    ▼
                  </span>
                </summary>
                <div className="p-4 border-t border-border/30 bg-card/45 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto no-scrollbar">
                  {game.downloads.android.map((dl, i) => (
                    <a
                      key={i}
                      href={getSafelinkuUrl(dl.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground p-3 rounded-xl transition-all duration-200 font-bold text-xs border border-primary/20 shadow-sm active:scale-98 group/item"
                    >
                      <span className="truncate mr-2">
                        {dl.name} {dl.category ? `(${dl.category})` : ""}
                      </span>
                      <ShieldCheck className="w-4 h-4 shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </details>
            )}

            {/* Windows Dropdown */}
            {hasWin && (
              <details className="group border border-border/40 rounded-2xl bg-muted/20 overflow-hidden">
                <summary className="flex items-center justify-between p-4 font-bold text-sm text-foreground cursor-pointer select-none hover:bg-muted/40 list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2.5">
                    <Gamepad2 className="w-5 h-5 text-white" />
                    {t("detail.windows_mirror", { count: game.downloads.win.length })}
                  </span>
                  <span className="transition-transform duration-200 group-open:rotate-180 text-muted-foreground text-xs">
                    ▼
                  </span>
                </summary>
                <div className="p-4 border-t border-border/30 bg-card/45 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto no-scrollbar">
                  {game.downloads.win.map((dl, i) => (
                    <a
                      key={i}
                      href={getSafelinkuUrl(dl.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-slate-800 hover:bg-white hover:text-black text-white p-3 rounded-xl transition-all duration-200 font-bold text-xs border border-slate-700/50 shadow-sm active:scale-98 group/item"
                    >
                      <span className="truncate mr-2">
                        {dl.name} {dl.category ? `(${dl.category})` : ""}
                      </span>
                      <Gamepad2 className="w-4 h-4 shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </details>
            )}

            {/* If no direct downloads, but has other support links */}
            {!hasAndroid && !hasWin && hasOther && (
              <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl text-slate-300 text-sm font-semibold">
                <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                <p>{t("detail.no_direct_download")}</p>
              </div>
            )}

            {/* Other platform / support links */}
            {hasOther && (
              <div className="pt-2">
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">
                  {t("detail.support_developer")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {game.downloads.other.map((dl, i) => (
                    <a
                      key={i}
                      href={getSafelinkuUrl(dl.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-muted hover:bg-slate-700 text-slate-300 p-3.5 rounded-2xl transition-all duration-300 font-semibold text-sm border border-border/50 shadow-sm active:scale-98"
                    >
                      <span className="truncate mr-2">{dl.name || t("detail.access_link")}</span>
                      <Download className="w-4 h-4 shrink-0 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>


      {/* Screenshot Gallery (Horizontal Scroll) */}
      {game.screenshots && game.screenshots.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">Screenshots</h2>
          <div className="flex overflow-x-auto gap-4 py-2 no-scrollbar snap-x scroll-smooth" style={{ WebkitOverflowScrolling: "touch" }}>
            {game.screenshots.map((img, i) => (
              <div key={i} className="relative flex-none w-[280px] sm:w-[480px] aspect-[16/9] rounded-2xl overflow-hidden border border-border/30 snap-start bg-muted shadow-sm hover:border-primary/30 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getProxyUrl(img)}
                  alt={`Screenshot ${i + 1}`}
                  className="object-cover w-full h-full game-thumbnail"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* About Game Column */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card/40 border border-border/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <Info className="text-primary w-6 h-6" /> {t("detail.about_game")}
            </h2>
            <div 
              className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: language === "id" 
                  ? (game.description || game.description_en) 
                  : (game.description_en || game.description)
              }}
            />
            
            {/* Genre Tags */}
            {game.tags && game.tags.length > 0 && (
              <div className="pt-4 border-t border-border/20 space-y-3">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">{t("detail.categories_tags")}</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, i) => (
                    <span key={i} className="px-3.5 py-1 bg-muted/60 text-slate-300 rounded-full text-xs font-semibold hover:bg-primary/20 hover:text-primary transition-all duration-200 border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar Platforms / Info Column */}
        <div className="space-y-6">
          <div className="bg-card border border-border/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-xl">
            <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">{t("detail.additional_info")}</h3>
            <div className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <div className="flex justify-between py-1 border-b border-border/10">
                <span className="text-muted-foreground">Engine</span>
                <span className="text-white font-bold">{game.engine || "Unknown"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/10">
                <span className="text-muted-foreground">Platforms</span>
                <span className="text-white font-bold uppercase truncate max-w-[120px]">{game.platforms?.join(", ") || "Android / PC"}</span>
              </div>
              {game.downloads_count && (
                <div className="flex justify-between py-1 border-b border-border/10">
                  <span className="text-muted-foreground">Downloads</span>
                  <span className="text-white font-bold">{game.downloads_count}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Status</span>
                <span className="text-primary font-bold">{game.status || "Active"}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}

export function GameDetailError() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-2xl font-black">{t("detail.not_found")}</h1>
      <p className="text-muted-foreground">{t("detail.not_found_desc")}</p>
    </div>
  );
}
