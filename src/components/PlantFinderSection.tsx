"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { Leaf, Sparkles, MessageCircle } from "lucide-react";
import { PlantItem } from "@/data/content";
import { PlantCard } from "@/components/PlantCard";
import {
  PlantFilterBar,
  FilterId,
} from "@/components/PlantFilterBar";

export function PlantFinderSection() {
  const { content } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterId>("beginner");

  const { filters, plantsShowcase } = content;

  // Precompute category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterId, number> = {
      all: plantsShowcase.items.length,
      beginner: 0,
      "low-light": 0,
      sunny: 0,
      flowers: 0,
      fruit: 0,
      "pet-safe": 0,
    };
    plantsShowcase.items.forEach((item) => {
      item.categories?.forEach((cat) => {
        if (cat in counts) {
          counts[cat as FilterId] = (counts[cat as FilterId] || 0) + 1;
        }
      });
    });
    return counts;
  }, [plantsShowcase.items]);

  // Filter curated showcase items by active category
  const filteredPlants = useMemo(() => {
    return plantsShowcase.items.filter((item) =>
      item.categories?.includes(activeFilter as PlantItem["categories"][number])
    );
  }, [activeFilter, plantsShowcase.items]);

  return (
    <section
      id="plants"
      className={`relative w-full py-12 md:py-24 px-4 sm:px-8 lg:px-12 transition-colors duration-300 ${
        isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
      }`}
      aria-label="Botanical plant catalog and finder"
    >
      <div className="max-w-[1128px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              <span>{filters.sectionHeadlineSans}</span>
              <span className="font-serif italic font-normal text-leaf px-1">
                {filters.sectionHeadlineItalic}
              </span>
            </h2>
          </div>

          {/* Specimen Counter Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium leading-4 border ${
            isDark
              ? "bg-ivory/10 text-ivory border-ivory/15"
              : "bg-forest/5 text-forest border-forest/15"
          }`}>
            <Leaf className="w-4 h-4 text-leaf" />
            <span>Curated {filteredPlants.length} specimens</span>
          </div>
        </div>

        {/* Curated Visual Category Filter Pills (No search console on landing page) */}
        <PlantFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          totalCount={plantsShowcase.items.length}
          filteredCount={filteredPlants.length}
          categoryCounts={categoryCounts}
          hideSearch={true}
          hideAllCategory={true}
          defaultFilter="beginner"
        />

        {/* Empty State when category has no plants */}
        {filteredPlants.length === 0 ? (
          <div
            role="status"
            className={`py-16 px-6 text-center rounded-3xl border border-dashed max-w-[720px] mx-auto my-8 ${
              isDark
                ? "bg-forest/40 border-ivory/20 text-ivory"
                : "bg-white/80 border-forest/20 text-forest shadow-sm"
            }`}
          >
            <Leaf className={`w-10 h-10 mx-auto mb-3 ${isDark ? "text-ivory/30" : "text-forest/30"}`} />
            <h3 className={`font-heading font-bold text-xl mb-1 leading-7 ${isDark ? "text-ivory" : "text-forest"}`}>
              No matching plants in this category
            </h3>
            <p className={`text-xs sm:text-base font-sans mb-6 max-w-sm mx-auto leading-4 sm:leading-6 ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}>
              Browse another collection or message us directly on WhatsApp to check our full highland nursery inventory.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveFilter("beginner")}
                className="px-6 py-3 rounded-full bg-leaf text-ivory text-xs font-semibold leading-4 hover:bg-leaf/90 transition-all min-h-[40px]"
              >
                Reset to Beginners
              </button>
              <button
                type="button"
                onClick={() => openInquiry("Inquiry about available nursery stock")}
                className={`px-6 py-3 rounded-full border text-xs font-semibold leading-4 transition-all flex items-center gap-2 min-h-[40px] ${
                  isDark
                    ? "bg-ivory/10 hover:bg-ivory/20 border-ivory/20 text-ivory"
                    : "bg-forest/10 hover:bg-forest/15 border-forest/20 text-forest"
                }`}
              >
                <MessageCircle className="w-4 h-4 text-leaf" />
                <span>Ask Us on WhatsApp</span>
              </button>
            </div>
          </div>
        ) : (
          /* Responsive 3-Column Grid of Spacious Plant Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPlants.map((plant: PlantItem, idx: number) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                priorityImage={idx < 2}
              />
            ))}
          </div>
        )}

        {/* Prominent Rounded "Explore Full Catalog" Button below plant cards */}
        <div className="text-center pt-4 pb-8">
          <Link
            href="/plants"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-leaf text-ivory font-semibold text-base leading-6 hover:bg-leaf/90 transition-all duration-200 shadow-lg hover:shadow-2xl active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[48px]"
          >
            <Sparkles className="w-4 h-4 text-ivory transition-transform group-hover:rotate-12" />
            <span>{plantsShowcase.exploreCatalogBtn || "Explore Full Catalog (50+ Plants) →"}</span>
          </Link>
          <p className={`text-xs font-mono mt-3 leading-4 ${isDark ? "text-ivory/60" : "text-forest/60"}`}>
            Browse our full highland nursery inventory with live search & filters
          </p>
        </div>

        {/* Illustrative Footer Note */}
        <div className={`text-center text-xs font-mono max-w-[720px] mx-auto leading-4 ${
          isDark ? "text-ivory/50" : "text-forest/50"
        }`}>
          {plantsShowcase.illustrativeFooterNote}
        </div>
      </div>
    </section>
  );
}
