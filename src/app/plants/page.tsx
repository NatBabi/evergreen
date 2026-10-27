"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  Leaf,
  Search,
  X,
} from "lucide-react";
import { starPlantsEN, PlantItem } from "@/data/content";
import { useTheme } from "@/context/ThemeContext";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WordmarkFooter } from "@/components/WordmarkFooter";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { PlantCard } from "@/components/PlantCard";
import {
  PlantFilterBar,
  FilterId,
} from "@/components/PlantFilterBar";

const InquirySheet = dynamic(
  () => import("@/components/InquirySheet").then((mod) => mod.InquirySheet),
  { ssr: false }
);

function SearchParamSync({
  onQuery,
  onOpenSearch,
}: {
  onQuery: (q: string) => void;
  onOpenSearch: () => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      onQuery(q);
      onOpenSearch();
    }
  }, [searchParams, onQuery, onOpenSearch]);
  return null;
}

export default function PlantsCatalogPage() {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavSearchOpen, setIsNavSearchOpen] = useState(false);

  // Precompute category item counts for all star plants
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterId, number> = {
      all: starPlantsEN.length,
      beginner: 0,
      "low-light": 0,
      sunny: 0,
      flowers: 0,
      fruit: 0,
      "pet-safe": 0,
    };
    starPlantsEN.forEach((item) => {
      item.categories?.forEach((cat) => {
        if (cat in counts) {
          counts[cat as FilterId] = (counts[cat as FilterId] || 0) + 1;
        }
      });
    });
    return counts;
  }, []);

  const filteredPlants = useMemo(() => {
    let result = starPlantsEN;

    if (activeFilter !== "all") {
      result = result.filter((item) =>
        item.categories?.includes(activeFilter as PlantItem["categories"][number])
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.commonName.toLowerCase().includes(q) ||
          item.botanicalName.toLowerCase().includes(q) ||
          item.amharicName.toLowerCase().includes(q) ||
          item.trait.toLowerCase().includes(q) ||
          (item.outcomeLine && item.outcomeLine.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  return (
    <div className={`relative min-h-screen flex flex-col selection:bg-leaf selection:text-ivory transition-colors duration-300 ${
      isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
    }`}>
      <Suspense fallback={null}>
        <SearchParamSync
          onQuery={setSearchQuery}
          onOpenSearch={() => setIsNavSearchOpen(true)}
        />
      </Suspense>

      {/* Top Header Navigation with Left Back Link, Centered Brand & Right Expanding Search + ThemeToggle + WhatsApp */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b py-3 sm:py-4 px-4 sm:px-8 lg:px-12 transition-colors duration-300 ${
        isDark
          ? "bg-forest-deep/85 border-ivory/15 text-ivory"
          : "bg-white/85 border-forest/15 text-forest shadow-sm"
      }`}>
        <div className="max-w-[1128px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Back Link */}
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-xs font-semibold hover:text-leaf transition-colors leading-4 min-h-[44px] shrink-0 ${
              isDark ? "text-ivory/80" : "text-forest/80"
            }`}
            aria-label="Back to home page"
          >
            <ArrowLeft className="w-4 h-4 text-leaf" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          {/* Center: Evergreen Brand Mark */}
          <Link
            href="/"
            className={`font-heading font-extrabold text-xl tracking-tight leading-7 transition-all ${
              isNavSearchOpen ? "hidden md:block" : "block"
            } ${isDark ? "text-ivory" : "text-forest"}`}
            aria-label="Evergreen Ethiopia Home"
          >
            <span>evergreen</span>
            <span className="font-serif italic font-normal text-leaf px-1">ethiopia</span>
          </Link>

          {/* Right: Expanding Search + ThemeToggle + WhatsApp CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isNavSearchOpen ? (
              <div
                className={`relative flex items-center rounded-full border px-3 py-1 shadow-lg animate-in fade-in zoom-in-95 duration-200 ${
                  isDark ? "bg-forest/80 backdrop-blur-md border-leaf/50" : "bg-white backdrop-blur-md border-leaf/50 shadow-md"
                }`}
                role="search"
              >
                <Search className="w-4 h-4 text-leaf shrink-0 mr-2" />
                <input
                  type="search"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plant name, light..."
                  aria-label="Search catalog plants"
                  className={`bg-transparent text-xs font-sans focus:outline-none w-36 sm:w-56 md:w-72 leading-4 ${
                    isDark ? "text-ivory placeholder:text-ivory/50" : "text-forest placeholder:text-forest/50"
                  }`}
                />
                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search input"
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 mr-1 ${
                      isDark ? "bg-ivory/10 hover:bg-ivory/20 text-ivory/70 hover:text-ivory" : "bg-forest/10 hover:bg-forest/20 text-forest/70 hover:text-forest"
                    }`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsNavSearchOpen(false);
                    setSearchQuery("");
                  }}
                  aria-label="Close search bar"
                  className={`text-xs font-mono pl-1 border-l ${
                    isDark ? "text-ivory/60 hover:text-ivory border-ivory/15" : "text-forest/60 hover:text-forest border-forest/15"
                  }`}
                >
                  Close
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsNavSearchOpen(true)}
                aria-label="Open plant search bar"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-medium leading-4 transition-all min-h-[40px] ${
                  isDark
                    ? "bg-forest/60 hover:bg-forest border-ivory/15 text-ivory/80 hover:text-ivory"
                    : "bg-forest/5 hover:bg-forest/10 border-forest/15 text-forest/80 hover:text-forest"
                }`}
              >
                <Search className="w-4 h-4 text-leaf" />
                <span className="hidden sm:inline">Search plants...</span>
              </button>
            )}

            {/* Dark Mode ↔ Light Mode Switcher */}
            <ThemeToggle />

            <a
              href="https://wa.me/251942461641?text=Hi%20Evergreen%20%F0%9F%91%8B%20I'm%20browsing%20your%20plant%20catalog."
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border text-xs font-semibold leading-4 transition-all min-h-[40px] shrink-0 ${
                isDark
                  ? "bg-forest/80 hover:bg-forest border-ivory/20 text-ivory"
                  : "bg-forest/10 hover:bg-forest/15 border-forest/20 text-forest"
              }`}
            >
              <MessageCircle className="w-4 h-4 text-leaf shrink-0" />
              <span className="hidden sm:inline">WhatsApp Help</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Catalog Body: Filters & Plant Grid directly beneath Header */}
      <main className="flex-1 w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-16">
        {/* Category Filter Pills & Active Filter Status Bar */}
        <PlantFilterBar
          hideSearch={true}
          showActiveStrip={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          totalCount={starPlantsEN.length}
          filteredCount={filteredPlants.length}
          categoryCounts={categoryCounts}
        />

        {/* Empty State */}
        {filteredPlants.length === 0 ? (
          <div
            role="status"
            className={`py-16 px-6 text-center rounded-3xl border border-dashed max-w-[720px] mx-auto my-8 ${
              isDark
                ? "bg-forest/40 border-ivory/20 text-ivory"
                : "bg-white/80 border-forest/20 text-forest shadow-sm"
            }`}
          >
            <Leaf className="w-10 h-10 text-leaf/40 mx-auto mb-3" />
            <h3 className={`font-heading font-bold text-xl mb-1 leading-7 ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              No matching plants in catalog
            </h3>
            <p className={`text-xs sm:text-base font-sans mb-6 max-w-sm mx-auto leading-4 sm:leading-6 ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}>
              We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Check with us on WhatsApp for unlisted nursery stock.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="px-6 py-3 rounded-full bg-leaf text-ivory text-xs font-semibold leading-4 hover:bg-leaf/90 transition-all min-h-[40px]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Responsive 3-Column Catalog Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPlants.map((plant: PlantItem) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </main>

      <WordmarkFooter />
      <InquirySheet />
      <StickyMobileBar />
    </div>
  );
}
