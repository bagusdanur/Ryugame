import { Metadata } from "next";
import GameDetailClient, { GameDetailError } from "./GameDetailClient";

interface GameDetailResponse {
  success: boolean;
  data: {
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

interface Props {
  params: Promise<{ slug: string }>;
}

// Fetch game data directly on the server (disabled caching for real-time downloads)
async function getGameDetail(slug: string): Promise<GameDetailResponse | null> {
  try {
    const res = await fetch(`https://game.ryukomik.web.id/game/detail/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch game details:", error);
    return null;
  }
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getGameDetail(resolvedParams.slug);

  if (!data?.success || !data.data) {
    return {
      title: "Game Not Found",
      description: "The game page could not be found.",
    };
  }

  const game = data.data;
  const cleanDescription = (game.description || game.description_en || "")
    .replace(/<[^>]*>/g, "") // Strip HTML tags for clean description
    .slice(0, 160);

  return {
    title: `${game.title} - Download Free Premium Android & PC Games`,
    description: cleanDescription || `Download ${game.title} free for PC and Android.`,
    openGraph: {
      title: `${game.title} - Download Android & PC`,
      description: cleanDescription,
      url: `https://ryugame.web.id/game/${game.slug}`,
      type: "website",
      images: [
        {
          url: game.thumbnail,
          width: 150,
          height: 150,
          alt: game.title,
        },
      ],
    },
  };
}

export default async function GameDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const data = await getGameDetail(resolvedParams.slug);

  if (!data?.success || !data.data) {
    return <GameDetailError />;
  }

  const game = data.data;
  const cleanDescription = (game.description || game.description_en || "")
    .replace(/<[^>]*>/g, "")
    .slice(0, 160);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": game.title,
    "operatingSystem": game.platforms?.join(", ") || "Android, Windows",
    "applicationCategory": "GameApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": game.rating || "4.5",
      "ratingCount": game.downloads_count ? game.downloads_count.replace(/\D/g, '') || "100" : "100"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "image": game.thumbnail,
    "description": cleanDescription,
    "author": {
      "@type": "Organization",
      "name": game.developer || "Unknown Developer"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GameDetailClient game={game} />
    </>
  );
}

