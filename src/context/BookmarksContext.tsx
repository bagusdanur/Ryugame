"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { GameCardItem } from "@/services/api";

interface BookmarksContextType {
  bookmarks: GameCardItem[];
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (game: GameCardItem) => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<GameCardItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("ryugame-bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load bookmarks:", e);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("ryugame-bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      console.error("Failed to save bookmarks:", e);
    }
  }, [bookmarks, isMounted]);

  const isBookmarked = (slug: string) => {
    return bookmarks.some((item) => item.slug === slug);
  };

  const toggleBookmark = (game: GameCardItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((item) => item.slug === game.slug);
      if (exists) {
        return prev.filter((item) => item.slug !== game.slug);
      } else {
        const cleanGame: GameCardItem = {
          title: game.title,
          slug: game.slug,
          thumbnail: game.thumbnail,
          version: game.version,
          rating: game.rating ? Number(game.rating) : undefined,
          endpoint: game.endpoint,
        };
        return [...prev, cleanGame];
      }
    });
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}
