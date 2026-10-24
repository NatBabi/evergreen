"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { Phone, MessageCircle } from "lucide-react";

export function StickyMobileBar() {
  const { content } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling past hero (~450px)
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const { stickyBar, brand } = content;

  return (
    <aside
      aria-label="Quick mobile contact actions"
      className="fixed bottom-4 left-4 right-4 z-[90] md:hidden animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div className={`w-full max-w-md mx-auto p-2 rounded-full backdrop-blur-md shadow-2xl border flex items-center justify-between gap-2 transition-colors ${
        isDark ? "bg-forest-deep/90 border-ivory/20" : "bg-white/95 border-forest/15 shadow-xl"
      }`}>
        {/* Direct Phone Call Button */}
        <a
          href={`tel:${brand.phonePrimaryRaw}`}
          className={`flex-1 min-h-[48px] px-3 rounded-full border text-xs font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf leading-4 ${
            isDark
              ? "bg-forest/80 hover:bg-forest border-ivory/20 text-ivory"
              : "bg-forest/10 hover:bg-forest/15 border-forest/20 text-forest"
          }`}
          aria-label={stickyBar.callBtn}
        >
          <Phone className="w-4 h-4 text-leaf shrink-0" />
          <span className="whitespace-nowrap">{brand.phonePrimary}</span>
        </a>

        {/* Ask About A Plant Button */}
        <button
          type="button"
          onClick={() => openInquiry()}
          className="flex-1 min-h-[48px] px-3 rounded-full bg-leaf text-ivory text-xs font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest leading-4"
          aria-label={stickyBar.askBtn}
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">{stickyBar.askBtn}</span>
        </button>
      </div>
    </aside>
  );
}
