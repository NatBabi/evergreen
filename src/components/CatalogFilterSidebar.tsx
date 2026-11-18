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
      className={`w-full rounded-[14px] p-5 border transition-all duration-300 ${
        isDark
          ? "bg-forest/50 border-ivory/15 text-ivory shadow-md"
          : "bg-white border-[#e2e9e4] text-[#333333] shadow-chaka-card"
      }`}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center justify-between pb-4 border-b ${
        isDark ? "border-ivory/10" : "border-[#e2e9e4]"
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-[#e8f7ef] text-[#157347] flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base tracking-tight leading-none text-[#333333] dark:text-ivory">
              Filter Plants
            </h2>
            <p className={`text-[11px] font-sans mt-0.5 leading-none ${
              isDark ? "text-ivory/60" : "text-[#78837c]"
            }`}>
              {filteredCount} of {totalCount} specimens
            </p>
          </div>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className={`text-xs flex items-center gap-1 font-semibold transition-colors ${
              isDark ? "text-[#78B83D] hover:text-white" : "text-[#198754] hover:text-[#146c43]"
            }`}
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="space-y-4 pt-4">
        {/* 1. Search Field (Chaka Input Recipe) */}
        <div className="space-y-1.5">
          <label
            htmlFor="catalog-search-input"
            className={`block text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-[#78837c]"
            }`}
          >
            Search
          </label>
          <div className={`relative flex items-center rounded-[9px] border px-3 py-2 transition-colors ${
            isDark
              ? "bg-forest-deep/60 border-ivory/15 focus-within:border-leaf"
              : "bg-[#fbfcfb] border-[#d9e3dc] focus-within:border-[#198754] focus-within:bg-white"
          }`}>
            <Search className="w-4 h-4 text-[#198754] shrink-0 mr-2" />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plants..."
              className={`w-full bg-transparent text-[13px] font-sans outline-none focus:outline-none focus:ring-0 border-none ${
                isDark ? "text-ivory placeholder:text-ivory/40" : "text-[#333333] placeholder:text-[#a5afa8]"
              }`}
            />
          </div>
        </div>

        {/* 2. Plant Category Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="catalog-category-select"
            className={`block text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-[#78837c]"
            }`}
          >
            Plant Category
          </label>
          <div className={`relative rounded-[9px] border transition-colors ${
            isDark
              ? "bg-forest-deep/60 border-ivory/15 focus-within:border-leaf"
              : "bg-[#fbfcfb] border-[#d9e3dc] focus-within:border-[#198754] focus-within:bg-white"
          }`}>
            <select
              id="catalog-category-select"
              value={activeCategory}
              onChange={(e) => onCategoryChange(e.target.value as FilterId)}
              className={`w-full bg-transparent text-[13px] font-sans py-2 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-[#333333]"
              }`}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}
                >
                  {cat.label} ({categoryCounts[cat.id] ?? 0})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#198754]">
              <span className="text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* 3. Light / Space Requirements Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="catalog-light-select"
            className={`block text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-[#78837c]"
            }`}
          >
            Light Requirement
          </label>
          <div className={`relative rounded-[9px] border transition-colors ${
            isDark
              ? "bg-forest-deep/60 border-ivory/15 focus-within:border-leaf"
              : "bg-[#fbfcfb] border-[#d9e3dc] focus-within:border-[#198754] focus-within:bg-white"
          }`}>
            <select
              id="catalog-light-select"
              value={selectedLight}
              onChange={(e) => onLightChange(e.target.value as LightOption)}
              className={`w-full bg-transparent text-[13px] font-sans py-2 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-[#333333]"
              }`}
            >
              <option value="all" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}>
                All light levels
              </option>
              <option value="bright" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}>
                Bright indirect light
              </option>
              <option value="low" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}>
                Low / medium light
              </option>
              <option value="direct" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}>
                Direct sun / outdoor
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#198754]">
              <span className="text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* 4. Sort By Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="catalog-sort-select"
            className={`block text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-[#78837c]"
            }`}
          >
            Sort By
          </label>
          <div className={`relative rounded-[9px] border transition-colors ${
            isDark
              ? "bg-forest-deep/60 border-ivory/15 focus-within:border-leaf"
              : "bg-[#fbfcfb] border-[#d9e3dc] focus-within:border-[#198754] focus-within:bg-white"
          }`}>
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className={`w-full bg-transparent text-[13px] font-sans py-2 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-[#333333]"
              }`}
            >
              <option value="recommended" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}>
                Recommended
              </option>
              <option value="price-asc" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}>
                Price: Low to High
              </option>
              <option value="price-desc" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}>
                Price: High to Low
              </option>
              <option value="name-asc" className={isDark ? "bg-[#071B14] text-[#F7F5EE]" : "bg-white text-[#333333]"}>
                Name: A to Z
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#198754]">
              <span className="text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Chaka Primary Button Recipe) */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={onApply}
            className="w-full py-2.5 px-4 rounded-[10px] bg-[#198754] hover:bg-[#146c43] text-white font-bold text-[13px] tracking-wide flex items-center justify-center gap-2 shadow-chaka-accent hover:shadow-chaka-accent-hover transition-all active:scale-95 min-h-[42px]"
          >
            <Check className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </aside>
      </div>
    </aside>
  );
}
