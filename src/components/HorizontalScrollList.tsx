"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HorizontalScrollListProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  moreLink?: string;
  moreLabel?: string;
  children: React.ReactNode;
}

export default function HorizontalScrollList({
  title,
  subtitle,
  icon,
  moreLink,
  moreLabel,
  children,
}: HorizontalScrollListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of view width
      const target = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: target,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="bg-primary/10 p-2 rounded-xl text-primary shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h2>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {moreLink && (
            <Link
              href={moreLink}
              className="text-xs font-bold text-primary hover:text-white bg-primary/10 hover:bg-primary px-3.5 py-1.5 rounded-full transition-all border border-primary/20 hover:border-transparent active:scale-95 cursor-pointer"
            >
              {moreLabel || "All"}
            </Link>
          )}

          {/* Desktop scroll buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-xl bg-card border border-border/40 hover:border-primary/30 text-foreground transition-all duration-300 hover:shadow-sm active:scale-90"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-xl bg-card border border-border/40 hover:border-primary/30 text-foreground transition-all duration-300 hover:shadow-sm active:scale-90"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroller Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 py-2 px-1 snap-x no-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
