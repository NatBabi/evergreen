"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Search, SlidersHorizontal, RotateCcw, Check, Sparkles } from "lucide-react";
import { FilterId, CATEGORY_OPTIONS } from "@/components/PlantFilterBar";

export type SortOption = "recommended" | "price-asc" | "price-desc" | "name-asc";
export type LightOption = "all" | "bright" | "low" | "direct";

export interface CatalogFilterSidebarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: FilterId;
  onCategoryChange: (cat: FilterId) => void;
  selectedLight: LightOption;
  onLightChange: (light: LightOption) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
  onApply?: () => void;
  categoryCounts: Record<FilterId, number>;
  totalCount: number;
  filteredCount: number;
}

export function CatalogFilterSidebar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  selectedLight,
  onLightChange,
  sortBy,
  onSortChange,
  onReset,
  onApply,
  categoryCounts,
  totalCount,
  filteredCount,
}: CatalogFilterSidebarProps) {
  const { isDark } = useTheme();

  const isFiltered =
    activeCategory !== "all" ||
    selectedLight !== "all" ||
    sortBy !== "recommended" ||
    searchQuery.trim().length > 0;

  return (
    <aside
      aria-label="Plant catalog filter controls"
      className={`w-full rounded-[14px] p-5 border transition-all duration-300 shadow-sm ${
        isDark
          ? "bg-forest/50 border-ivory/15 text-ivory"
          : "bg-white/95 border-forest/15 text-forest shadow-sm"
      }`}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center justify-between pb-4 border-b ${
        isDark ? "border-ivory/10" : "border-forest/10"
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-leaf/20 text-leaf flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base tracking-tight leading-none">
              Filter Plants
            </h2>
            <p className={`text-[11px] font-sans mt-0.5 leading-none ${
              isDark ? "text-ivory/60" : "text-forest/60"
            }`}>
              {filteredCount} of {totalCount} specimens
            </p>
          </div>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className={`text-xs flex items-center gap-1 font-medium transition-colors ${
              isDark ? "text-leaf hover:text-white" : "text-leaf hover:text-forest"
            }`}
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="space-y-4 pt-4">
        {/* 1. Search Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="catalog-search-input"
            className={`block text-xs font-semibold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}
          >
            Search
          </label>
          <div className={`relative flex items-center rounded-[9px] border px-3 py-2 transition-colors ${
            isDark
              ? "bg-forest-deep/60 border-ivory/15 focus-within:border-leaf"
              : "bg-forest/5 border-forest/15 focus-within:border-leaf"
          }`}>
            <Search className="w-4 h-4 text-leaf shrink-0 mr-2" />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plants..."
              className={`w-full bg-transparent text-xs font-sans outline-none focus:outline-none focus:ring-0 border-none ${
                isDark ? "text-ivory placeholder:text-ivory/40" : "text-forest placeholder:text-forest/40"
              }`}
            />
          </div>
        </div>

        {/* 2. Plant Category Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="catalog-category-select"
            className={`block text-xs font-semibold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}
          >
            Plant Category
          </label>
          <div className={`relative rounded-[9px] border transition-colors ${
            isDark
              ? "bg-forest-deep/60 border-ivory/15 focus-within:border-leaf"
              : "bg-forest/5 border-forest/15 focus-within:border-leaf"
          }`}>
            <select
              id="catalog-category-select"
              value={activeCategory}
              onChange={(e) => onCategoryChange(e.target.value as FilterId)}
              className={`w-full bg-transparent text-xs font-sans py-2.5 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-forest"
              }`}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}
                >
                  {cat.label} ({categoryCounts[cat.id] ?? 0})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-leaf">
              <span className="text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* 3. Light / Space Requirements Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="catalog-light-select"
            className={`block text-xs font-semibold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}
          >
            Light Requirement
          </label>
          <div className={`relative rounded-[9px] border transition-colors ${
            isDark
              ? "bg-forest-deep/60 border-ivory/15 focus-within:border-leaf"
              : "bg-forest/5 border-forest/15 focus-within:border-leaf"
          }`}>
            <select
              id="catalog-light-select"
              value={selectedLight}
              onChange={(e) => onLightChange(e.target.value as LightOption)}
              className={`w-full bg-transparent text-xs font-sans py-2.5 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-forest"
              }`}
            >
              <option value="all" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}>
                All light levels
              </option>
              <option value="bright" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}>
                Bright indirect light
              </option>
              <option value="low" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}>
                Low / medium light
              </option>
              <option value="direct" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}>
                Direct sun / outdoor
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-leaf">
              <span className="text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* 4. Sort By Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="catalog-sort-select"
            className={`block text-xs font-semibold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}
          >
            Sort By
          </label>
          <div className={`relative rounded-[9px] border transition-colors ${
            isDark
              ? "bg-forest-deep/60 border-ivory/15 focus-within:border-leaf"
              : "bg-forest/5 border-forest/15 focus-within:border-leaf"
          }`}>
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className={`w-full bg-transparent text-xs font-sans py-2.5 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-forest"
              }`}
            >
              <option value="recommended" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}>
                Recommended
              </option>
              <option value="price-asc" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}>
                Price: Low to High
              </option>
              <option value="price-desc" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}>
                Price: High to Low
              </option>
              <option value="name-asc" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#123D2B]"}>
                Name: A to Z
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-leaf">
              <span className="text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={onApply}
            className="w-full py-3 px-4 rounded-[10px] bg-leaf text-ivory font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-leaf/90 transition-all shadow-sm active:scale-95 min-h-[44px]"
          >
            <Check className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
