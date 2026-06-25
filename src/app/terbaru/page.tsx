import { Metadata } from "next";
import { ApiListResponse } from "@/services/api";
import LatestPageClient, { LatestPageError } from "./LatestPageClient";

export const metadata: Metadata = {
  title: "Latest Games - Download Free Android & PC Games",
  description: "List of the newest Android and PC games recently added, always updated daily.",
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
    return <LatestPageError />;
  }

  const games = data.data || [];
  const totalPages = data.totalPages || 1;

  return <LatestPageClient games={games} totalPages={totalPages} />;
}
