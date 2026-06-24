import { Metadata } from "next";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { ApiListResponse } from "@/services/api";

export const metadata: Metadata = {
  title: "Game Terbaru - Unduh Game Android & PC Gratis",
  description: "Daftar game Android dan PC terbaru yang baru saja ditambahkan, selalu diperbarui setiap hari.",
};

async function getLatestGames(page: number): Promise<ApiListResponse | null> {
  try {
    const res = await fetch(`https://game.ryukomik.web.id/game/terbaru?page=${page}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch latest games:", error);
    return null;
  }
}

export default async function TerbaruPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const data = await getLatestGames(page);
  
  if (!data || !data.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <h1 className="text-2xl font-black">Gagal Memuat Data</h1>
        <p className="text-muted-foreground mt-2">Silakan coba kembali dalam beberapa saat.</p>
      </div>
    );
  }

  const games = data.data || [];
  const totalPages = data.totalPages || 1;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card/30 border border-border/20 p-6 rounded-3xl backdrop-blur-md">
        <div className="bg-primary/10 p-3 rounded-2xl text-primary">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Rilis Terbaru</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Daftar game Android & PC gratis terbaru yang baru ditambahkan</p>
        </div>
      </div>

      {/* Grid */}
      {games.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada game terbaru yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-border/20">
          <Link
            href={`/terbaru?page=${Math.max(1, page - 1)}`}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-border/50 ${
              page <= 1
                ? "opacity-50 pointer-events-none text-muted-foreground bg-muted/20"
                : "bg-card text-foreground hover:bg-muted hover:border-primary/30"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Sebelumnya
          </Link>
          <span className="text-sm font-semibold text-muted-foreground">
            Halaman <span className="text-white font-bold">{page}</span> dari <span className="text-white font-bold">{totalPages}</span>
          </span>
          <Link
            href={`/terbaru?page=${Math.min(totalPages, page + 1)}`}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-border/50 ${
              page >= totalPages
                ? "opacity-50 pointer-events-none text-muted-foreground bg-muted/20"
                : "bg-card text-foreground hover:bg-muted hover:border-primary/30"
            }`}
          >
            Selanjutnya <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
