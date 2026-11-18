"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  Leaf,
  Search,
  X,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { starPlantsEN, PlantItem } from "@/data/content";
import { useTheme } from "@/context/ThemeContext";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WordmarkFooter } from "@/components/WordmarkFooter";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { PlantCard } from "@/components/PlantCard";
import {
  FilterId,
  CATEGORY_OPTIONS,
} from "@/components/PlantFilterBar";
import {
  CatalogFilterSidebar,
  SortOption,
  LightOption,
} from "@/components/CatalogFilterSidebar";

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

export default function PlantsCatalogClient() {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedLight, setSelectedLight] = useState<LightOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavSearchOpen, setIsNavSearchOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [plantList, setPlantList] = useState<PlantItem[]>(starPlantsEN);

  useEffect(() => {
    fetch("/api/plants")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.plants && data.plants.length > 0) {
          setPlantList(data.plants);
        }
      })
      .catch((err) => console.warn("Live catalog fetch notice:", err));
  }, []);

  // Precompute category item counts for all plants
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterId, number> = {
      all: plantList.length,
      beginner: 0,
      "low-light": 0,
      sunny: 0,
      flowers: 0,
      fruit: 0,
      "pet-safe": 0,
    };
    plantList.forEach((item) => {
      item.categories?.forEach((cat) => {
        if (cat in counts) {
          counts[cat as FilterId] = (counts[cat as FilterId] || 0) + 1;
        }
      });
    });
    return counts;
  }, [plantList]);

  // Comprehensive Filtering & Sorting Engine
  const filteredPlants = useMemo(() => {
    let result = [...plantList];

    // 1. Category Filter
    if (activeFilter !== "all") {
      result = result.filter((item) =>
        item.categories?.includes(activeFilter as PlantItem["categories"][number])
      );
    }

    // 2. Light Filter
    if (selectedLight !== "all") {
      result = result.filter((item) => {
        const itemLight = (item.chips?.light || item.light || "").toLowerCase();
        if (selectedLight === "bright") {
          return itemLight.includes("bright") || itemLight.includes("indirect");
        }
        if (selectedLight === "low") {
          return (
            itemLight.includes("low") ||
            itemLight.includes("medium") ||
            item.categories?.includes("low-light")
          );
        }
        if (selectedLight === "direct") {
          return (
            itemLight.includes("direct") ||
            itemLight.includes("sun") ||
            item.categories?.includes("sunny")
          );
        }
        return true;
      });
    }

    // 3. Search Query
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

    // 4. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.priceETB || 0) - (b.priceETB || 0));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.priceETB || 0) - (a.priceETB || 0));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.commonName.localeCompare(b.commonName));
    }

    return result;
  }, [plantList, activeFilter, selectedLight, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveFilter("all");
    setSelectedLight("all");
    setSortBy("recommended");
    setSearchQuery("");
  };

  const isFiltered =
    activeFilter !== "all" ||
    selectedLight !== "all" ||
    sortBy !== "recommended" ||
    searchQuery.trim().length > 0;

  return (
    <div
      className={`relative min-h-screen flex flex-col selection:bg-[#198754] selection:text-white transition-colors duration-300 font-sans ${
        isDark ? "bg-forest-deep text-ivory" : "bg-[#f4f7f4] text-[#333333]"
      }`}
    >
      <Suspense fallback={null}>
        <SearchParamSync
          onQuery={setSearchQuery}
          onOpenSearch={() => setIsNavSearchOpen(true)}
        />
      </Suspense>

      {/* Top Header Navigation with Left Back Link, Centered Brand & Right Actions (72px profile) */}
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-md border-b py-3 sm:py-4 px-4 sm:px-8 lg:px-12 transition-colors duration-300 ${
          isDark
            ? "bg-forest-deep/85 border-ivory/15 text-ivory"
            : "bg-white/95 border-[#e2e9e4] text-[#333333] shadow-sm"
        }`}
      >
        <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Back to Home Link */}
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-xs font-semibold hover:text-[#198754] transition-colors leading-4 min-h-[44px] shrink-0 ${
              isDark ? "text-ivory/80" : "text-[#78837c] hover:text-[#198754]"
            }`}
            aria-label="Back to home page"
          >
            <ArrowLeft className="w-4 h-4 text-[#198754]" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          {/* Center: Evergreen Brand Mark */}
          <Link
            href="/"
            className={`flex items-center gap-2 font-heading font-extrabold text-base sm:text-xl tracking-tight leading-none transition-colors ${
              isNavSearchOpen ? "hidden md:flex" : "flex"
            }`}
            aria-label="Evergreen Ethiopia Home"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center">
              <Image
                src="/logo-evergreen.png"
                alt="Evergreen Ethiopia Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex items-center font-heading font-extrabold text-sm sm:text-lg tracking-tight leading-none">
              <span className={isDark ? "text-ivory" : "text-[#333333]"}>evergreen</span>
              <span className="font-serif italic font-normal text-[#198754] ml-1">ethiopia</span>
            </div>
          </Link>

          {/* Right: Expanding Search + ThemeToggle + WhatsApp CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isNavSearchOpen ? (
              <form
                onSubmit={(e) => e.preventDefault()}
                className={`relative flex items-center rounded-full border px-3 py-1 shadow-lg animate-in fade-in zoom-in-95 duration-200 ${
                  isDark
                    ? "bg-forest/80 backdrop-blur-md border-leaf/50"
                    : "bg-white backdrop-blur-md border-leaf/50 shadow-md"
                }`}
                role="search"
              >
                <Search className="w-4 h-4 text-leaf shrink-0 mr-2" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plant name, light..."
                  aria-label="Search catalog plants"
                  className={`bg-transparent text-xs font-sans focus:outline-none w-36 sm:w-56 md:w-72 leading-4 border-none outline-none focus:ring-0 shadow-none ${
                    isDark ? "text-ivory placeholder:text-ivory/50" : "text-forest placeholder:text-forest/50"
                  }`}
                />
                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search input"
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 mr-1 ${
                      isDark
                        ? "bg-ivory/10 hover:bg-ivory/20 text-ivory/70 hover:text-ivory"
                        : "bg-forest/10 hover:bg-forest/20 text-forest/70 hover:text-forest"
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
                    isDark
                      ? "text-ivory/60 hover:text-ivory border-ivory/15"
                      : "text-forest/60 hover:text-forest border-forest/15"
                  }`}
                >
                  Close
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsNavSearchOpen(true)}
                aria-label="Open plant search bar"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-[8px] border text-xs font-semibold leading-4 transition-colors duration-200 min-h-[38px] ${
                  isDark
                    ? "bg-forest/60 hover:bg-forest border-ivory/15 text-ivory/80 hover:text-ivory"
                    : "bg-white hover:bg-[#f4f7f4] border-[#e2e9e4] text-[#78837c] hover:text-[#333333]"
                }`}
              >
                <Search className="w-4 h-4 text-[#198754]" />
                <span className="hidden sm:inline">Search plants...</span>
              </button>
            )}

            {/* Dark Mode ↔ Light Mode Switcher */}
            <ThemeToggle />

            {/* Direct WhatsApp Help Button */}
            <a
              href="https://wa.me/251942461641?text=Hi%20Evergreen%20%F0%9F%91%8B%20I'm%20browsing%20your%20plant%20catalog."
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-[8px] border text-xs font-bold leading-4 transition-colors duration-200 min-h-[38px] shrink-0 ${
                isDark
                  ? "bg-forest/80 hover:bg-forest border-ivory/20 text-ivory"
                  : "bg-white hover:bg-[#e8f6ee] border-[#e2e9e4] text-[#198754]"
              }`}
            >
              <MessageCircle className="w-4 h-4 text-[#198754] shrink-0" />
              <span className="hidden sm:inline">WhatsApp Help</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Catalog Body */}
      <main className="flex-1 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Mobile Collapsible Filter Button (Reference style for mobile) */}
        <div className="block lg:hidden mb-6">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between py-3 px-4 rounded-[10px] border text-xs font-semibold leading-none shadow-sm transition-colors min-h-[46px] ${
              isDark
                ? "bg-forest/60 border-ivory/15 text-ivory hover:bg-forest/80"
                : "bg-white border-[#e2e9e4] text-[#333333] hover:border-[#198754]/40"
            }`}
            aria-expanded={mobileFiltersOpen}
            aria-label="Toggle filter plants controls"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#198754]" />
              <span>Filter Plants {isFiltered && "(Active)"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span>{filteredPlants.length} plants</span>
              <span className="text-[#198754]">{mobileFiltersOpen ? "▲" : "▼"}</span>
            </div>
          </button>

          {mobileFiltersOpen && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <CatalogFilterSidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeFilter}
                onCategoryChange={setActiveFilter}
                selectedLight={selectedLight}
                onLightChange={setSelectedLight}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onReset={handleResetFilters}
                onApply={() => setMobileFiltersOpen(false)}
                categoryCounts={categoryCounts}
                totalCount={plantList.length}
                filteredCount={filteredPlants.length}
              />
            </div>
          )}
        </div>

        {/* 2-Column Architecture: Desktop Filter Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Sidebar on Desktop (Reference layout) */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-24">
            <CatalogFilterSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeFilter}
              onCategoryChange={setActiveFilter}
              selectedLight={selectedLight}
              onLightChange={setSelectedLight}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={handleResetFilters}
              categoryCounts={categoryCounts}
              totalCount={plantList.length}
              filteredCount={filteredPlants.length}
            />
          </div>

          {/* Right Main Grid Area */}
          <div className="flex-1 w-full min-w-0">
            {/* Top Quick Category Chips */}
            <div className="relative mb-6">
              <div
                role="tablist"
                aria-label="Botanical category filter tabs"
                className="flex items-center justify-start gap-2 overflow-x-auto pb-2 pt-1 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 scrollbar-none"
              >
                {CATEGORY_OPTIONS.map((cat) => {
                  const isSelected = activeFilter === cat.id;
                  const count = categoryCounts[cat.id] ?? 0;
                  const Icon = cat.icon;

                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveFilter(cat.id)}
                      className={`shrink-0 px-4 py-2 rounded-[20px] text-xs font-semibold tracking-wide transition-colors duration-200 flex items-center gap-2 min-h-[38px] focus-visible:outline-none focus-chaka-ring leading-none ${
                        isSelected
                          ? "bg-[#198754] text-white shadow-sm font-bold ring-2 ring-[#198754] ring-offset-2"
                          : isDark
                            ? "bg-forest/50 border border-ivory/15 text-ivory/85 hover:bg-forest/80 hover:text-ivory"
                            : "bg-white border border-[#e2e9e4] text-[#333333] hover:border-[#198754]/40 hover:text-[#198754] shadow-sm"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isSelected ? "text-white" : "text-[#198754]"
                        }`}
                      />
                      <span>{cat.label}</span>
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${
                          isSelected
                            ? isDark
                              ? "bg-forest-deep text-ivory"
                              : "bg-white/20 text-white"
                            : isDark
                              ? "bg-ivory/10 text-ivory/80"
                              : "bg-[#f4f7f4] text-[#78837c]"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Title & Count Header */}
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#e2e9e4] dark:border-ivory/10">
              <div>
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight leading-none text-[#333333] dark:text-ivory">
                  {activeFilter === "all"
                    ? "Plants"
                    : CATEGORY_OPTIONS.find((c) => c.id === activeFilter)?.label}
                </h1>
                <p className="text-xs font-sans mt-1 text-[#78837c] dark:text-ivory/70 leading-none">
                  Showing {filteredPlants.length} of {plantList.length} plants
                </p>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className={`text-xs flex items-center gap-1 font-semibold transition-colors ${
                    isDark ? "text-[#78B83D] hover:text-white" : "text-[#198754] hover:text-[#146c43]"
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset All</span>
                </button>
              )}
            </div>

            {/* Empty State when no plants match */}
            {filteredPlants.length === 0 ? (
              <div
                role="status"
                className={`py-16 px-6 text-center rounded-[14px] border border-dashed max-w-[720px] mx-auto my-8 ${
                  isDark
                    ? "bg-forest/40 border-ivory/20 text-ivory"
                    : "bg-white border-[#e2e9e4] text-[#333333] shadow-chaka-card"
                }`}
              >
                <Leaf className="w-10 h-10 text-[#198754]/40 mx-auto mb-3" />
                <h3
                  className={`font-heading font-bold text-xl mb-1 leading-7 ${
                    isDark ? "text-ivory" : "text-[#333333]"
                  }`}
                >
                  No plants found
                </h3>
                <p
                  className={`text-xs sm:text-base font-sans mb-6 max-w-sm mx-auto leading-4 sm:leading-6 ${
                    isDark ? "text-ivory/70" : "text-[#78837c]"
                  }`}
                >
                  No plants match your filters. Ask on WhatsApp for unlisted stock.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-[10px] bg-[#198754] text-white text-xs font-bold leading-4 hover:bg-[#146c43] shadow-chaka-accent transition-colors duration-200 min-h-[40px]"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              /* Responsive Catalog Grid: Desktop = 3 cards per row, Mobile = 1 card at a time */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredPlants.map((plant: PlantItem) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <WordmarkFooter />
      <InquirySheet />
      <StickyMobileBar />
    </div>
  );
}
