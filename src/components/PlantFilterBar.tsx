"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  Search,
  X,
  Sprout,
  Sparkles,
  Moon,
  Sun,
  Flower2,
  Apple,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export type FilterId =
  | "all"
  | "beginner"
  | "low-light"
  | "sunny"
  | "flowers"
  | "fruit"
  | "pet-safe";

export interface CategoryOption {
  id: FilterId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: "all", label: "All Plants", icon: Sprout },
  { id: "beginner", label: "Total Beginners", icon: Sparkles },
  { id: "low-light", label: "Low Light", icon: Moon },
  { id: "sunny", label: "Sunny Garden", icon: Sun },
  { id: "flowers", label: "Flowering", icon: Flower2 },
  { id: "fruit", label: "Fruit at Home", icon: Apple },
  { id: "pet-safe", label: "Pet-Friendly", icon: ShieldCheck },
];

export interface PlantFilterBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeFilter: FilterId;
  onFilterChange: (filter: FilterId) => void;
  totalCount: number;
  filteredCount: number;
  categoryCounts: Record<FilterId, number>;
  hideSearch?: boolean;
  showActiveStrip?: boolean;
  hideAllCategory?: boolean;
  defaultFilter?: FilterId;
}

export function PlantFilterBar({
  searchQuery = "",
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalCount,
  filteredCount,
  categoryCounts,
  hideSearch = false,
  showActiveStrip = false,
  hideAllCategory = false,
  defaultFilter = "all",
}: PlantFilterBarProps) {
  const { isDark } = useTheme();

  const visibleCategories = hideAllCategory
    ? CATEGORY_OPTIONS.filter((cat) => cat.id !== "all")
    : CATEGORY_OPTIONS;

  const isFiltered =
    (!hideAllCategory && activeFilter !== "all") ||
    (hideAllCategory && activeFilter !== defaultFilter) ||
    (!hideSearch && searchQuery.trim().length > 0);

  const quickSearchTags = [
    "Monstera",
    "Peace Lily",
    "ሞንስተራ",
    "Low light",
    "Pet-safe",
    "Birkin",
  ];

  return (
    <div className="w-full space-y-4 mb-8">
      {/* 1. Airbnb-Inspired Elevated Search Bar Console (Catalog page only) */}
      {!hideSearch && onSearchChange && (
        <div className="w-full max-w-[720px] mx-auto">
          <div className={`relative flex items-center backdrop-blur-md rounded-full shadow-md hover:shadow-lg focus-within:shadow-lg focus-within:border-leaf focus-within:ring-2 focus-within:ring-leaf/20 transition-all p-2 border ${
            isDark
              ? "bg-forest/60 border-ivory/20"
              : "bg-white/90 border-forest/15"
          }`}>
            {/* Circular Search Icon Plinth */}
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ml-1 ${
              isDark
                ? "bg-forest-deep text-ivory border-ivory/15"
                : "bg-forest/5 text-forest border-forest/10"
            }`}>
              <Search className="w-4 h-4 text-leaf" />
            </div>

            {/* Search Input Field */}
            <input
              type="search"
              aria-label="Search plants by English or Amharic name, light, or care"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plant name (Monstera, ፒስ ሊሊ), room light, or care..."
              className={`flex-1 bg-transparent px-4 py-2 text-xs sm:text-base leading-4 sm:leading-6 focus:outline-none ${
                isDark
                  ? "text-ivory placeholder:text-ivory/45"
                  : "text-forest placeholder:text-forest/45"
              }`}
            />

            {/* Right Action: Clear Button & Result Count Badge */}
            <div className="flex items-center gap-2 pr-2 shrink-0">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-leaf ${
                    isDark
                      ? "bg-ivory/10 hover:bg-ivory/20 text-ivory/70 hover:text-ivory"
                      : "bg-forest/10 hover:bg-forest/20 text-forest/70 hover:text-forest"
                  }`}
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold leading-4 border ${
                isDark
                  ? "bg-ivory/10 text-ivory border-ivory/15"
                  : "bg-forest/5 text-forest border-forest/10"
              }`}>
                <span>{filteredCount} {filteredCount === 1 ? "specimen" : "specimens"}</span>
              </div>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex items-center justify-center gap-2 mt-2 px-2 flex-wrap">
            <span className={`text-xs font-mono leading-4 ${
              isDark ? "text-ivory/50" : "text-forest/50"
            }`}>Popular:</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSearchChange(tag)}
                className={`text-xs font-sans underline decoration-dotted leading-4 transition-colors ${
                  isDark
                    ? "text-ivory/75 hover:text-leaf decoration-ivory/30 hover:decoration-leaf"
                    : "text-forest/75 hover:text-leaf decoration-forest/30 hover:decoration-leaf"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Visual Category Filter Pills Bar with Custom Icons */}
      <div
        role="tablist"
        aria-label="Botanical category filter tabs"
        className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none"
      >
        {visibleCategories.map((cat) => {
          const isSelected = activeFilter === cat.id;
          const count = categoryCounts[cat.id] ?? 0;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onFilterChange(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 shadow-sm min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf leading-4 ${
                isSelected
                  ? "bg-leaf text-ivory ring-2 ring-leaf ring-offset-2 shadow-md font-bold"
                  : isDark
                    ? "bg-forest/50 border border-ivory/15 text-ivory/85 hover:bg-forest/80 hover:text-ivory hover:border-ivory/30"
                    : "bg-white/90 border border-forest/15 text-forest/85 hover:bg-white hover:text-forest hover:border-forest/30 shadow-sm"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isSelected ? "text-ivory" : "text-leaf"
                }`}
              />
              <span>{cat.label}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-mono font-bold leading-4 ${
                  isSelected
                    ? isDark ? "bg-forest-deep text-ivory" : "bg-white text-forest"
                    : isDark ? "bg-ivory/10 text-ivory/80" : "bg-forest/5 text-forest/80"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Active Filters Strip & Reset Button */}
      {(showActiveStrip || !hideSearch) && isFiltered && (
        <div className={`flex items-center justify-between gap-4 py-2 px-4 rounded-2xl backdrop-blur-md text-xs font-sans leading-4 flex-wrap shadow-sm border ${
          isDark
            ? "bg-forest/40 border-ivory/15 text-ivory"
            : "bg-white/90 border-forest/15 text-forest"
        }`}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-semibold ${isDark ? "text-ivory/70" : "text-forest/70"}`}>Active filters:</span>

            {activeFilter !== "all" && (
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium ${
                isDark
                  ? "bg-forest-deep text-ivory border border-ivory/20"
                  : "bg-forest text-ivory"
              }`}>
                <span>{CATEGORY_OPTIONS.find((c) => c.id === activeFilter)?.label}</span>
                <button
                  type="button"
                  onClick={() => onFilterChange(defaultFilter)}
                  aria-label="Clear category filter"
                  className="hover:text-leaf ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-leaf text-ivory font-medium">
                <span>&ldquo;{searchQuery}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => onSearchChange?.("")}
                  aria-label="Clear search query"
                  className={`ml-1 ${isDark ? "hover:text-forest-deep" : "hover:text-forest"}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <span className={`font-mono ${isDark ? "text-ivory/60" : "text-forest/60"}`}>
              ({filteredCount} of {totalCount} matching)
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onSearchChange?.("");
              onFilterChange(defaultFilter);
            }}
            className={`inline-flex items-center gap-2 text-xs font-semibold hover:text-leaf hover:underline leading-4 ${
              isDark ? "text-ivory/90" : "text-forest/90"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset all filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
