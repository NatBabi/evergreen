"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { MessageCircle } from "lucide-react";

export function FoliageParallaxBand() {
  const { content } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();

  const { foliageBand } = content;

  return (
    <section
      className="relative w-full min-h-[360px] sm:min-h-[440px] flex items-center justify-center bg-transparent px-4 sm:px-8 py-20"
      aria-label="Foliage Call to Action"
    >
      {/* Content */}
      <div className="relative z-20 max-w-[936px] mx-auto text-center flex flex-col items-center">

        {/* Headline with one italic serif word */}
        <h2 className={`font-heading font-extrabold text-[32px] sm:text-5xl md:text-[64px] tracking-tight leading-[40px] sm:leading-[56px] md:leading-[72px] mb-6 ${
          isDark ? "text-ivory" : "text-forest"
        }`}>
          <span>{foliageBand.headlineSans}</span>
          <span className="font-serif italic font-normal text-leaf">
            {foliageBand.headlineItalic}
          </span>
          <span>{foliageBand.headlineEnd}</span>
        </h2>

        <p className={`font-sans text-base sm:text-xl max-w-[720px] leading-6 sm:leading-7 mb-8 ${
          isDark ? "text-ivory/80" : "text-forest/80"
        }`}>
          {foliageBand.subtitle}
        </p>

        <button
          onClick={() => openInquiry(foliageBand.headlineSans + foliageBand.headlineItalic)}
          className="px-8 py-4 rounded-full bg-leaf text-ivory font-semibold text-base leading-6 tracking-wide hover:bg-leaf/90 transition-all duration-200 shadow-xl flex items-center gap-2 active:scale-95 group min-h-[48px]"
        >
          <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>{foliageBand.cta}</span>
        </button>
      </div>
    </section>
  );
}
