import { Metadata } from "next";
import { Star, Download, ShieldCheck, Gamepad2, Info, Calendar, Terminal, CheckCircle2, AlertCircle } from "lucide-react";
import { getProxyUrl } from "@/utils/imageProxy";
import { getSafelinkuUrl } from "@/utils/safelinku";

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
      title: "Game Tidak Ditemukan",
      description: "Halaman game tidak dapat ditemukan.",
    };
  }

  const game = data.data;
  const cleanDescription = (game.description || game.description_en || "")
    .replace(/<[^>]*>/g, "") // Strip HTML tags for clean description
    .slice(0, 160);

  return {
    title: `${game.title} - Download Premium Gratis`,
    description: cleanDescription || `Download ${game.title} gratis untuk PC dan Android.`,
    openGraph: {
      title: `${game.title} - Download Android & PC`,
      description: cleanDescription,
      url: `https://ryugame.web.id/game/detail/${game.slug}`,
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-black">Game tidak ditemukan</h1>
        <p className="text-muted-foreground">URL mungkin salah atau game telah dihapus.</p>
      </div>
    );
  }

  const game = data.data;
  const hasAndroid = game.downloads.android && game.downloads.android.length > 0;
  const hasWin = game.downloads.win && game.downloads.win.length > 0;
  const hasOther = game.downloads.other && game.downloads.other.length > 0;

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
      "ratingCount": game.downloads_count ? game.downloads_count.replace(/\\D/g, '') || "100" : "100"
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
    <article className="space-y-10 sm:space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* App Store Style Header */}
      <header className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center bg-card/30 border border-border/20 p-6 md:p-8 rounded-3xl backdrop-blur-md">
        
        {/* App Squircle Icon */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 overflow-hidden bg-muted rounded-3xl border border-border/40 shadow-xl mx-auto md:mx-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getProxyUrl(game.thumbnail)}
            alt={game.title}
            className="object-cover w-full h-full game-thumbnail"
          />
        </div>

        {/* Title & Stats */}
        <div className="flex-1 min-w-0 space-y-4 text-center md:text-left w-full">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {game.title}
            </h1>
            {game.developer && (
              <p className="text-primary font-semibold mt-1">{game.developer}</p>
            )}
          </div>

          {/* Quick Metrics (App Store style) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs font-semibold text-muted-foreground">
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

        {/* Big Action GET Button */}
        <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
          <a
            href="#downloads"
            className="flex items-center justify-center gap-2 w-full md:w-auto bg-primary text-primary-foreground font-black px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all tracking-wider text-sm md:text-base cursor-pointer"
          >
            <Download className="w-5 h-5" /> GET DOWNLOAD
          </a>
        </div>
      </header>

      {/* Prominent Download Links Section (Directly below Header for Mobile-First visibility) */}
      <section id="downloads" className="bg-card/45 border border-border/20 p-6 sm:p-8 rounded-3xl backdrop-blur-md space-y-6">
        <div className="flex items-center gap-2.5">
          <Download className="text-primary w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black text-white">Link Unduh Game</h2>
        </div>

        {(!hasAndroid && !hasWin && !hasOther) ? (
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-500 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Maaf, saat ini link download belum tersedia untuk game ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Android Dropdown */}
            {hasAndroid && (
              <details className="group border border-border/40 rounded-2xl bg-muted/20 overflow-hidden">
                <summary className="flex items-center justify-between p-4 font-bold text-sm text-foreground cursor-pointer select-none hover:bg-muted/40 list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Pilih Mirror Download Android APK ({game.downloads.android.length})
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
                    Pilih Mirror Download Windows PC ({game.downloads.win.length})
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
                <p>Game ini tidak menyediakan file unduhan langsung (Free). Hubungi atau dukung developer melalui link di bawah.</p>
              </div>
            )}

            {/* Other platform / support links */}
            {hasOther && (
              <div className="pt-2">
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">
                  Dukung Developer / Akses VIP
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
                      <span className="truncate mr-2">{dl.name || "Akses Link"}</span>
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
              <Info className="text-primary w-6 h-6" /> Tentang Game
            </h2>
            <div 
              className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: game.description || game.description_en }}
            />
            
            {/* Genre Tags */}
            {game.tags && game.tags.length > 0 && (
              <div className="pt-4 border-t border-border/20 space-y-3">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Kategori & Tag</h3>
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
            <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">Informasi Tambahan</h3>
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

