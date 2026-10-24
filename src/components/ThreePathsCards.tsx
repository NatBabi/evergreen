"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { Check, Sparkles, Home, Building2, Trees, ShieldCheck } from "lucide-react";

export function ThreePathsCards() {
  const { content } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const { threePaths } = content;

  const getPathIcon = (id: string) => {
    switch (id) {
      case "shop":
        return <Home className="w-5 h-5" />;
      case "care":
        return <Building2 className="w-5 h-5" />;
      case "projects":
        return <Trees className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="paths"
      className={`relative w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 transition-colors duration-300 ${
        isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
      }`}
      aria-label="Three tailored botanical paths and services"
    >
      <div className="max-w-[1128px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-medium tracking-wide mb-3 border leading-4 ${
            isDark
              ? "bg-forest/60 border-ivory/15 text-ivory"
              : "bg-forest/5 border-forest/15 text-forest"
          }`}>
            <Sparkles className="w-4 h-4 text-leaf" />
            <span>{threePaths.eyebrow}</span>
          </div>

          <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] mb-4 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{threePaths.headlineSans}</span>
            <span className="font-serif italic font-normal text-leaf px-1">
              {threePaths.headlineItalic}
            </span>
          </h2>

          <p className={`font-sans text-base leading-6 font-normal ${
            isDark ? "text-ivory/75" : "text-forest/75"
          }`}>
            {threePaths.subtitle}
          </p>
        </div>

        {/* 3 Path Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {threePaths.paths.map((path) => {
            const isHighlighted = path.highlighted;

            return (
              <div
                key={path.id}
                className={`rounded-[32px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? isDark
                      ? "bg-forest/80 backdrop-blur-md text-ivory shadow-2xl scale-[1.01] border-2 border-leaf relative ring-2 ring-leaf/40"
                      : "bg-white backdrop-blur-md text-forest shadow-2xl scale-[1.01] border-2 border-leaf relative ring-2 ring-leaf/30"
                    : isDark
                      ? "bg-forest/40 backdrop-blur-md text-ivory border border-ivory/12 shadow-sm hover:shadow-xl hover:border-leaf/40 hover:bg-forest/60"
                      : "bg-white/85 backdrop-blur-md text-forest border border-forest/12 shadow-md hover:shadow-xl hover:border-leaf/40 hover:bg-white"
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`p-3 rounded-2xl ${
                        isHighlighted
                          ? "bg-leaf/20 text-leaf border border-leaf/30"
                          : isDark
                            ? "bg-forest/80 text-leaf border border-ivory/10"
                            : "bg-forest/10 text-leaf border border-forest/10"
                      }`}
                    >
                      {getPathIcon(path.id)}
                    </div>

                    {isHighlighted && (
                      <span className="px-3 py-1 rounded-full bg-leaf text-ivory text-xs font-semibold tracking-wide uppercase leading-4 shadow-sm">
                        Most Requested
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`font-heading font-extrabold text-2xl tracking-tight mb-1 leading-8 ${
                    isDark ? "text-ivory" : "text-forest"
                  }`}>
                    {path.title}
                  </h3>
                  <h4 className="font-sans text-xs font-medium mb-4 leading-4 text-leaf">
                    {path.subtitle}
                  </h4>

                  {/* Description */}
                  <p
                    className={`font-sans text-xs sm:text-base leading-4 sm:leading-6 mb-6 ${
                      isHighlighted
                        ? isDark ? "text-ivory/90" : "text-forest/90"
                        : isDark ? "text-ivory/75" : "text-forest/75"
                    }`}
                  >
                    {path.description}
                  </p>

                  {/* Features Bullet Points */}
                  <div
                    className={`space-y-3 pt-4 border-t mb-8 ${
                      isHighlighted
                        ? isDark ? "border-ivory/20" : "border-forest/20"
                        : isDark ? "border-ivory/10" : "border-forest/10"
                    }`}
                  >
                    {path.bulletPoints.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 shrink-0 mt-1 text-leaf" />
                        <span
                          className={`text-xs sm:text-base font-sans leading-4 sm:leading-6 ${
                            isHighlighted
                              ? isDark ? "text-ivory/95" : "text-forest/95"
                              : isDark ? "text-ivory/80" : "text-forest/80"
                          }`}
                        >
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to action button */}
                <button
                  type="button"
                  onClick={() => openInquiry(path.title)}
                  className={`w-full py-3 px-6 rounded-full font-semibold text-base leading-6 tracking-wide transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[48px] ${
                    isHighlighted
                      ? "bg-leaf text-ivory hover:bg-leaf/90 shadow-lg shadow-leaf/20"
                      : isDark
                        ? "bg-forest/80 hover:bg-forest text-ivory border border-ivory/20"
                        : "bg-forest/10 hover:bg-forest/15 text-forest border border-forest/20"
                  }`}
                >
                  {path.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Pricing Honesty Notice */}
        <div className={`mt-8 text-center text-xs font-mono flex items-center justify-center gap-2 leading-4 ${
          isDark ? "text-ivory/60" : "text-forest/60"
        }`}>
          <ShieldCheck className="w-4 h-4 text-leaf" />
          <span>{threePaths.pricingNotice}</span>
        </div>
      </div>
    </section>
  );
}
