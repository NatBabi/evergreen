"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Search, SlidersHorizontal, RotateCcw, Check } from "lucide-react";
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
      className={`w-full rounded-[14px] p-5 border transition-all duration-300 shadow-chaka font-chaka ${
        isDark
          ? "bg-[#1B1D19] border-[#2C2F29] text-ivory"
          : "bg-white border-[#e2e9e4] text-[#333333]"
      }`}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center justify-between pb-3.5 border-b ${
        isDark ? "border-[#2C2F29]" : "border-[#e2e9e4]"
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[8px] bg-[#e8f7ef] text-[#157347] flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-[15px] tracking-tight leading-none text-[#333333] dark:text-ivory">
              Filter Plants
            </h2>
            <p className={`text-[11px] mt-0.5 leading-none ${
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
            className={`text-[12px] flex items-center gap-1 font-bold px-2 py-1 rounded-[8px] border transition-colors ${
              isDark
                ? "bg-[#121311] border-[#2C2F29] text-leaf hover:text-white"
                : "bg-white border-[#e2e9e4] text-[#78837c] hover:text-[#198754]"
            }`}
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="space-y-3.5 pt-3.5">
        {/* 1. Search Field */}
        <div className="space-y-1">
          <label
            htmlFor="catalog-search-input"
            className={`block text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-[#78837c]"
            }`}
          >
            Search
          </label>
          <div className={`relative flex items-center rounded-[9px] border px-3 py-2 transition-colors focus-within:border-[#198754] focus-chaka ${
            isDark
              ? "bg-[#121311] border-[#2C2F29]"
              : "bg-[#fbfcfb] border-[#d9e3dc]"
          }`}>
            <Search className="w-3.5 h-3.5 text-[#198754] shrink-0 mr-2" />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plants..."
              className={`w-full bg-transparent text-[13px] outline-none focus:outline-none focus:ring-0 border-none leading-none ${
                isDark ? "text-ivory placeholder:text-ivory/40" : "text-[#333333] placeholder:text-[#a5afa8]"
              }`}
            />
          </div>
        </div>

        {/* 2. Plant Category Dropdown */}
        <div className="space-y-1">
          <label
            htmlFor="catalog-category-select"
            className={`block text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-[#78837c]"
            }`}
          >
            Plant Category
          </label>
          <div className={`relative rounded-[9px] border transition-colors focus-within:border-[#198754] focus-chaka ${
            isDark
              ? "bg-[#121311] border-[#2C2F29]"
              : "bg-[#fbfcfb] border-[#d9e3dc]"
          }`}>
            <select
              id="catalog-category-select"
              value={activeCategory}
              onChange={(e) => onCategoryChange(e.target.value as FilterId)}
              className={`w-full bg-transparent text-[13px] py-2 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-[#333333]"
              }`}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}
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
        <div className="space-y-1">
          <label
            htmlFor="catalog-light-select"
            className={`block text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-[#78837c]"
            }`}
          >
            Light Requirement
          </label>
          <div className={`relative rounded-[9px] border transition-colors focus-within:border-[#198754] focus-chaka ${
            isDark
              ? "bg-[#121311] border-[#2C2F29]"
              : "bg-[#fbfcfb] border-[#d9e3dc]"
          }`}>
            <select
              id="catalog-light-select"
              value={selectedLight}
              onChange={(e) => onLightChange(e.target.value as LightOption)}
              className={`w-full bg-transparent text-[13px] py-2 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-[#333333]"
              }`}
            >
              <option value="all" className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}>
                All light levels
              </option>
              <option value="bright" className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}>
                Bright indirect light
              </option>
              <option value="low" className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}>
                Low / medium light
              </option>
              <option value="direct" className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}>
                Direct sun / outdoor
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#198754]">
              <span className="text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* 4. Sort By Dropdown */}
        <div className="space-y-1">
          <label
            htmlFor="catalog-sort-select"
            className={`block text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "text-ivory/70" : "text-[#78837c]"
            }`}
          >
            Sort By
          </label>
          <div className={`relative rounded-[9px] border transition-colors focus-within:border-[#198754] focus-chaka ${
            isDark
              ? "bg-[#121311] border-[#2C2F29]"
              : "bg-[#fbfcfb] border-[#d9e3dc]"
          }`}>
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className={`w-full bg-transparent text-[13px] py-2 px-3 rounded-[9px] outline-none focus:outline-none focus:ring-0 border-none cursor-pointer appearance-none ${
                isDark ? "text-ivory" : "text-[#333333]"
              }`}
            >
              <option value="recommended" className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}>
                Recommended
              </option>
              <option value="price-asc" className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}>
                Price: Low to High
              </option>
              <option value="price-desc" className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}>
                Price: High to Low
              </option>
              <option value="name-asc" className={isDark ? "bg-[#121311] text-ivory" : "bg-white text-[#333333]"}>
                Name: A to Z
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#198754]">
              <span className="text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* Action Button: Apply */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onApply}
            className="w-full py-2.5 px-4 rounded-[10px] bg-[#198754] hover:bg-[#146c43] text-white font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-chaka-btn transition-colors active:scale-95 min-h-[40px] focus-chaka"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
