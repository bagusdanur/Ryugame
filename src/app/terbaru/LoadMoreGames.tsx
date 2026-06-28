"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher, ApiListResponse, GameCardItem } from "@/services/api";
import GameCard from "@/components/GameCard";
import { ChevronDown, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface LoadMoreGamesProps {
  initialGames: GameCardItem[];
  initialTotalPages: number;
}

export default function LoadMoreGames({ initialGames, initialTotalPages }: LoadMoreGamesProps) {
  const [pages, setPages] = useState<GameCardItem[][]>([initialGames]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();

  // We only fetch when we increment currentPage past the loaded ones
  const { isLoading } = useSWR<ApiListResponse>(
    currentPage > pages.length ? `/game/terbaru?page=${currentPage}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.success && data.data) {
          setPages((prev) => [...prev, data.data]);
        }
      }
    }
  );

  const loadMore = () => {
    if (currentPage < initialTotalPages && !isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const allGames = pages.flat();

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
        {allGames.map((game, i) => (
          <GameCard key={`${game.slug}-${i}`} game={game} />
        ))}
      </div>

      {/* Load More Button */}
      {currentPage < initialTotalPages && (
        <div className="flex justify-center pt-8 border-t border-border/20">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border/50 hover:border-primary/50 rounded-2xl font-bold text-foreground hover:bg-muted transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> {t("latest.loading")}
              </>
            ) : (
              <>
                {t("latest.load_more")} <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
