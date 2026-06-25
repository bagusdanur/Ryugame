"use client";

import useSWR from "swr";
import { fetcher, ApiListResponse } from "@/services/api";
import GameCard from "@/components/GameCard";
import HeroCarousel from "@/components/HeroCarousel";
import HorizontalScrollList from "@/components/HorizontalScrollList";
import { Flame, Clock, Award } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Home() {
  const { data: trending, isLoading: isLoadingTrending } = useSWR<ApiListResponse>("/game/trending", fetcher);
  const { data: terbaru, isLoading: isLoadingTerbaru } = useSWR<ApiListResponse>("/game/terbaru?page=1", fetcher);
  const { t } = useLanguage();

  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Featured Hero Carousel (Trending top 5) */}
      <section aria-label="Featured Games">
        {isLoadingTrending ? (
          <div className="w-full h-[320px] md:h-[420px] bg-card rounded-3xl animate-pulse border border-border/20" />
        ) : (
          trending?.data && <HeroCarousel games={trending.data} />
        )}
      </section>

      {/* Trending Games Section (Horizontal Scroll) */}
      <section id="trending">
        {isLoadingTrending ? (
          <div className="space-y-4">
            <div className="h-8 w-48 bg-muted rounded-md animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-none w-[100px] sm:w-[120px] h-[150px] bg-card rounded-2xl animate-pulse border border-border/20" />
              ))}
            </div>
          </div>
        ) : (
          <HorizontalScrollList
            title={t("home.trending_title")}
            subtitle={t("home.trending_subtitle")}
            icon={<Flame className="w-5 h-5" />}
          >
            {trending?.data?.map((game) => (
              <div key={game.slug} className="flex-none w-[100px] sm:w-[120px] snap-start">
                <GameCard game={game} />
              </div>
            ))}
          </HorizontalScrollList>
        )}
      </section>

      {/* Terbaru Section (Horizontal Scroll) */}
      <section id="terbaru">
        {isLoadingTerbaru ? (
          <div className="space-y-4">
            <div className="h-8 w-48 bg-muted rounded-md animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-none w-[100px] sm:w-[120px] h-[150px] bg-card rounded-2xl animate-pulse border border-border/20" />
              ))}
            </div>
          </div>
        ) : (
          <HorizontalScrollList
            title={t("home.latest_title")}
            subtitle={t("home.latest_subtitle")}
            icon={<Clock className="w-5 h-5" />}
            moreLink="/terbaru"
            moreLabel="All"
          >
            {terbaru?.data?.map((game) => (
              <div key={game.slug} className="flex-none w-[100px] sm:w-[120px] snap-start">
                <GameCard game={game} />
              </div>
            ))}
          </HorizontalScrollList>
        )}
      </section>


      {/* Editor's Choice Section (Curated static cards as a fallback or design element) */}
      <section className="bg-gradient-to-r from-primary/10 via-sky-500/5 to-transparent border border-primary/10 p-6 md:p-10 rounded-3xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -z-10" />
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-4 h-4" /> {t("home.editors_choice")}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white">{t("home.editors_title")}</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {t("home.editors_desc")}
          </p>
        </div>
      </section>
      
    </div>
  );
}

