"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Plus, Minus, AlertCircle } from "lucide-react";

export function FAQSection() {
  const { content } = useLanguage();
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { faq } = content;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className={`relative w-full py-12 md:py-24 px-4 sm:px-8 lg:px-12 transition-colors duration-300 ${
        isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
      }`}
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[936px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] mb-4 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{faq.headlineSans}</span>
            <span className="font-serif italic font-normal text-leaf px-1">
              {faq.headlineItalic}
            </span>
          </h2>

          <p className={`font-sans text-base leading-6 font-normal ${
            isDark ? "text-ivory/75" : "text-forest/75"
          }`}>
            {faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordions Stack */}
        <div className="space-y-4">
          {faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-answer-${idx}`;
            const buttonId = `faq-question-${idx}`;

            return (
              <div
                key={idx}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? isDark
                      ? "bg-forest/70 border-leaf/40 shadow-xl ring-1 ring-leaf/30 text-ivory"
                      : "bg-white border-leaf/50 shadow-xl ring-1 ring-leaf/30 text-forest"
                    : isDark
                      ? "bg-forest/35 border-ivory/12 hover:border-ivory/25 hover:bg-forest/50 text-ivory"
                      : "bg-white/80 border-forest/12 hover:border-forest/25 hover:bg-white text-forest shadow-sm"
                }`}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(idx)}
                  className="w-full min-h-[64px] px-6 py-4 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf cursor-pointer group"
                >
                  <span className={`font-heading font-bold text-base pr-4 leading-6 ${
                    isDark ? "text-ivory" : "text-forest"
                  }`}>
                    {item.question}
                  </span>
                  <div className={`shrink-0 p-2 rounded-full border transition-colors ${
                    isDark
                      ? "bg-forest/60 border-ivory/10 text-ivory group-hover:bg-forest"
                      : "bg-forest/5 border-forest/10 text-forest group-hover:bg-forest/10"
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-leaf" />
                    ) : (
                      <Plus className="w-4 h-4 text-leaf group-hover:rotate-90 transition-transform duration-200" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`px-6 pb-6 pt-2 border-t animate-in fade-in duration-200 ${
                      isDark ? "border-ivory/10" : "border-forest/10"
                    }`}
                  >
                    <p className={`font-sans text-xs sm:text-base leading-4 sm:leading-6 mb-4 ${
                      isDark ? "text-ivory/80" : "text-forest/80"
                    }`}>
                      {item.answer}
                    </p>
                    {item.noteToConfirm && (
                      <div className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full font-mono border leading-4 ${
                        isDark
                          ? "text-amber-300 bg-amber-950/40 border-amber-500/30"
                          : "text-amber-800 bg-amber-50 border-amber-300"
                      }`}>
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{item.noteToConfirm}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Confirmation footer badge */}
        <div className={`mt-8 text-center text-xs font-mono leading-4 ${
          isDark ? "text-ivory/60" : "text-forest/60"
        }`}>
          {faq.confirmNotice}
        </div>
      </div>
    </section>
  );
}
