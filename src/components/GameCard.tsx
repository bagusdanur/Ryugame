import Link from "next/link";
import { GameCardItem } from "@/services/api";
import { Star, Bookmark } from "lucide-react";
import { getProxyUrl } from "@/utils/imageProxy";
import { useBookmarks } from "@/context/BookmarksContext";

export default function GameCard({ game }: { game: GameCardItem }) {
  const imageSrc = getProxyUrl(game.thumbnail || game.image);
  let endpoint = game.endpoint || `/game/${game.slug}`;
  if (endpoint.startsWith("/game/detail/")) {
    endpoint = endpoint.replace("/game/detail/", "/game/");
  }
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const isSaved = isBookmarked(game.slug);

  return (
    <Link 
      href={endpoint} 
      className="group flex flex-col gap-2 w-[100px] sm:w-[120px] shrink-0 active:scale-95 transition-all duration-200 relative"
    >
      {/* 1:1 Squircle App Icon Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted rounded-2xl border border-border/30 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={game.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out game-thumbnail"
          loading="lazy"
        />
        
        {/* Bookmark Overlay Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(game);
          }}
          className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/85 backdrop-blur-md text-foreground transition-all duration-200 z-10 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          title={isSaved ? "Saved" : "Save"}
          aria-label={isSaved ? "Remove Bookmark" : "Add Bookmark"}
        >
          <Bookmark className={`w-3.5 h-3.5 transition-all ${isSaved ? "fill-primary text-primary" : "text-white/80 hover:text-white"}`} />
        </button>
      </div>

      {/* App details underneath */}
      <div className="flex-1 min-w-0 flex flex-col justify-start">
        <h3 className="font-bold text-xs sm:text-sm text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground font-semibold">
          {game.rating && game.rating > 0 ? (
            <span className="flex items-center gap-0.5 text-yellow-500">
              <Star className="w-2.5 h-2.5 fill-yellow-500" />
              {game.rating.toFixed(1)}
            </span>
          ) : (
            <span>FREE</span>
          )}
          {game.version && (
            <span className="truncate max-w-[50px] opacity-80">
              • v{game.version}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}


