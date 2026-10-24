"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Mountain, Sparkles, ShieldCheck } from "lucide-react";
import { PlantCard } from "@/components/PlantCard";

export function SplitIntro() {
  const { content } = useLanguage();
  const { isDark } = useTheme();
  const { companion } = content;
  const plant = companion.featuredPlant;

  return (
    <section
      id="companion"
      className={`relative z-10 w-full py-12 md:py-24 px-4 sm:px-8 lg:px-12 bg-transparent transition-colors duration-300 ${
        isDark ? "text-ivory" : "text-forest"
      }`}
      aria-label="Highland plant philosophy and featured specimen"
    >
      <div className="max-w-[1128px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Botanical Narrative & 3 Resilience Pillars (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Eyebrow */}
            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-medium tracking-wide w-fit mb-6 border leading-4 ${
              isDark
                ? "bg-ivory/10 text-ivory border-ivory/15"
                : "bg-forest/5 text-forest border-forest/15"
            }`}>
              <Sparkles className="w-4 h-4 text-leaf" />
              <span>{companion.eyebrow}</span>
            </div>

            {/* Headline with italic serif emphasis */}
            <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl leading-[40px] sm:leading-[44px] md:leading-[56px] tracking-tight mb-6 ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              <span>{companion.headlineSans}</span>
              <span className="font-serif italic font-normal text-leaf px-1">
                {companion.headlineItalic}
              </span>
              <span>{companion.headlineEnd}</span>
            </h2>

            {/* Narrative Body */}
            <p className={`font-sans text-base sm:text-xl leading-6 sm:leading-7 font-normal mb-8 max-w-[720px] ${
              isDark ? "text-ivory/80" : "text-forest/80"
            }`}>
              {companion.narrative}
            </p>

            {/* Three Highland Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4">
              <div className={`p-6 rounded-2xl border flex flex-col justify-start transition-all shadow-sm ${
                isDark
                  ? "bg-forest/40 border-ivory/12 text-ivory hover:bg-forest/60 hover:border-ivory/25"
                  : "bg-white/85 border-forest/10 text-forest hover:bg-white hover:border-forest/20 hover:shadow-md"
              }`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 shadow-sm ${
                  isDark
                    ? "bg-forest-deep text-ivory border-ivory/15"
                    : "bg-forest/5 text-forest border-forest/10"
                }`}>
                  <Mountain className="w-4 h-4 text-leaf" />
                </div>
                <h3 className="font-heading font-bold text-base mb-1 leading-6">
                  {companion.fact1Label}
                </h3>
                <p className={`text-xs leading-4 font-sans ${
                  isDark ? "text-ivory/70" : "text-forest/70"
                }`}>
                  {companion.fact1Desc}
                </p>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-start transition-all shadow-sm ${
                isDark
                  ? "bg-forest/40 border-ivory/12 text-ivory hover:bg-forest/60 hover:border-ivory/25"
                  : "bg-white/85 border-forest/10 text-forest hover:bg-white hover:border-forest/20 hover:shadow-md"
              }`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 shadow-sm ${
                  isDark
                    ? "bg-forest-deep text-ivory border-ivory/15"
                    : "bg-forest/5 text-forest border-forest/10"
                }`}>
                  <ShieldCheck className="w-4 h-4 text-leaf" />
                </div>
                <h3 className="font-heading font-bold text-base mb-1 leading-6">
                  {companion.fact2Label}
                </h3>
                <p className={`text-xs leading-4 font-sans ${
                  isDark ? "text-ivory/70" : "text-forest/70"
                }`}>
                  {companion.fact2Desc}
                </p>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-start transition-all shadow-sm ${
                isDark
                  ? "bg-forest/40 border-ivory/12 text-ivory hover:bg-forest/60 hover:border-ivory/25"
                  : "bg-white/85 border-forest/10 text-forest hover:bg-white hover:border-forest/20 hover:shadow-md"
              }`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 shadow-sm ${
                  isDark
                    ? "bg-forest-deep text-ivory border-ivory/15"
                    : "bg-forest/5 text-forest border-forest/10"
                }`}>
                  <Sun className="w-4 h-4 text-leaf" />
                </div>
                <h3 className="font-heading font-bold text-base mb-1 leading-6">
                  {companion.fact3Label}
                </h3>
                <p className={`text-xs leading-4 font-sans ${
                  isDark ? "text-ivory/70" : "text-forest/70"
                }`}>
                  {companion.fact3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Specimen Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 leading-4 ${
                  isDark ? "text-ivory/70" : "text-forest/70"
                }`}>
                  <Sparkles className="w-4 h-4 text-leaf" />
                  <span>{companion.featuredCardTitle || "Featured Nursery Specimen"}</span>
                </span>
                <span className="text-xs font-mono text-leaf font-semibold leading-4">
                  {content.brand.name} Choice
                </span>
              </div>
              <PlantCard plant={plant} priorityImage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
