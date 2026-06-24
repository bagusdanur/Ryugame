"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher, ApiListResponse } from "@/services/api";
import GameCard from "@/components/GameCard";
import { Search, Compass } from "lucide-react";
import { Suspense } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  
  const { data, isLoading } = useSWR<ApiListResponse>(
    q ? `/game/search?q=${encodeURIComponent(q)}` : null,
    fetcher
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Search Header */}
      <div className="flex items-center gap-3 bg-card/30 border border-border/20 p-6 rounded-3xl backdrop-blur-md">
        <div className="bg-primary/10 p-3 rounded-2xl text-primary">
          <Search className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Hasil Pencarian</h1>
          {q ? (
            <p className="text-sm text-muted-foreground mt-0.5">
              Menampilkan game untuk: <span className="font-bold text-primary">&quot;{q}&quot;</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-0.5">Cari koleksi game gratis & premium</p>
          )}
        </div>
      </div>

      {!q ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] border border-dashed border-border/40 rounded-3xl bg-card/10 backdrop-blur-sm p-6 text-center space-y-3">
          <Compass className="w-10 h-10 text-muted-foreground opacity-50" />
          <h2 className="text-lg font-bold text-white">Mulai Menjelajah</h2>
          <p className="text-sm text-muted-foreground max-w-sm">Ketikkan judul game Android atau PC pada kotak pencarian di atas untuk mulai mencari.</p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2 w-full animate-pulse">
              <div className="aspect-square w-full bg-card rounded-2xl border border-border/20" />
              <div className="h-4 w-5/6 bg-muted rounded mt-1" />
              <div className="h-3 w-1/2 bg-muted rounded mt-0.5" />
            </div>
          ))}
        </div>
      ) : !data?.success || data.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-card/25 border border-border/20 rounded-3xl p-6 text-center space-y-3">
          <Search className="w-12 h-12 text-muted-foreground opacity-40" />
          <h2 className="text-lg font-bold text-white">Game tidak ditemukan</h2>
          <p className="text-sm text-muted-foreground max-w-xs">Maaf, kami tidak menemukan hasil untuk &quot;{q}&quot;. Coba cari kata kunci lain seperti &quot;RPG&quot; atau &quot;Action&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
          {data.data.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="space-y-4">
        <div className="h-24 bg-card rounded-3xl animate-pulse" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-card rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}


