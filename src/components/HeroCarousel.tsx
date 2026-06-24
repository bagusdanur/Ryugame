"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GameCardItem } from "@/services/api";
import { Star, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getProxyUrl } from "@/utils/imageProxy";

export default function HeroCarousel({ games }: { games: GameCardItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredGames = games.slice(0, 5); // Take top 5

  useEffect(() => {
    if (featuredGames.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredGames.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredGames.length]);

  if (featuredGames.length === 0) return null;

  const currentGame = featuredGames[currentIndex];
  const imageSrc = getProxyUrl(currentGame.image || currentGame.thumbnail);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
  };

  return (
    <div className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden group/carousel border border-border/20 shadow-2xl bg-slate-950">
      {/* Background slide with framer-motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Blurred Background Banner */}
          <div className="absolute inset-0 bg-slate-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={currentGame.title}
              className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 blur-[8px]"
            />
          </div>
          {/* Real overlay image split on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

          {/* Banner Graphic on the Right for Desktop */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={currentGame.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>


      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12 md:max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase">
              🔥 Trending Game
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight line-clamp-2 drop-shadow-md">
              {currentGame.title}
            </h1>

            <div className="flex items-center gap-4 text-sm font-semibold text-slate-300">
              {currentGame.rating && currentGame.rating > 0 && (
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  {currentGame.rating.toFixed(1)} Rating
                </span>
              )}
              {currentGame.tags && currentGame.tags.length > 0 && (
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg text-xs border border-slate-700/50">
                  {currentGame.tags.slice(0, 2).join(" • ")}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-400 line-clamp-2 max-w-md">
              Unduh game {currentGame.title} versi terbaru {currentGame.version ? `v${currentGame.version}` : ""} gratis untuk Android & PC dengan link aman, cepat, dan terverifikasi.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href={`/game/detail/${currentGame.slug}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold px-6 py-3 rounded-full shadow-lg shadow-sky-500/20 active:scale-95 transition-all text-sm shrink-0"
              >
                <Download className="w-4 h-4" /> Download Sekarang
              </Link>
              {currentGame.version && (
                <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
                  Versi {currentGame.version}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Navigation Controls */}
      <div className="absolute right-6 bottom-6 z-30 flex items-center gap-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-white hover:bg-slate-800 active:scale-90 transition-all cursor-pointer"
          aria-label="Previous Game"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-white hover:bg-slate-800 active:scale-90 transition-all cursor-pointer"
          aria-label="Next Game"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide dots */}
      <div className="absolute left-6 md:left-12 top-6 z-30 flex items-center gap-1.5">
        {featuredGames.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === i ? "w-6 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
