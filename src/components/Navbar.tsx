"use client";

import Link from "next/link";
import { Search, Gamepad2, Menu, X, Flame, Award } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16 flex items-center justify-between gap-4 relative">
        
        {/* Left: Logo - App Store Style */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="bg-primary p-2 rounded-xl shadow-md transition-all duration-200">
            <Gamepad2 className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Ryu<span className="text-primary font-black">Game</span>
          </span>
        </Link>

        {/* Center: Search Bar (Shows ONLY when isSearchOpen is true) */}
        {isSearchOpen ? (
          <div className="absolute inset-y-0 left-0 right-0 px-4 bg-background/95 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none sm:relative sm:flex-1 sm:max-w-md sm:mx-auto z-50 flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari game favorit Anda..."
                className="block w-full pl-10 pr-10 py-2 border border-border/50 bg-muted/50 focus:bg-card rounded-full text-sm transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-sm font-semibold text-muted-foreground hover:text-white px-2 py-1 transition-colors shrink-0"
            >
              Batal
            </button>
          </div>
        ) : (
          /* Desktop Links (Hidden when searching) */
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold ml-auto mr-4">
            <Link href="/#trending" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-muted-foreground" /> Trending
            </Link>
            <Link href="/terbaru" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              <Award className="w-4 h-4 text-muted-foreground" /> Terbaru
            </Link>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search trigger icon (hidden when search is already active) */}
          {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-muted/80 border border-border/40 transition-colors text-foreground"
              aria-label="Cari Game"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl hover:bg-muted/80 border border-border/40 transition-colors md:hidden text-foreground"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border/50 bg-background/95 backdrop-blur-lg px-4 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2 font-semibold text-sm">
            <Link 
              href="/#trending" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-muted transition-colors flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-orange-500" /> Trending
            </Link>
            <Link 
              href="/terbaru" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-muted transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-primary" /> Terbaru
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}


