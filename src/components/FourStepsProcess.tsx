"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { MessageCircle, Camera, Truck, Sprout, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function FourStepsProcess() {
  const { content } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const { fourSteps } = content;

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <MessageCircle className="w-5 h-5 text-leaf group-hover:text-ivory transition-colors" />;
      case 1:
        return <Camera className="w-5 h-5 text-leaf group-hover:text-ivory transition-colors" />;
      case 2:
        return <Truck className="w-5 h-5 text-leaf group-hover:text-ivory transition-colors" />;
      case 3:
        return <Sprout className="w-5 h-5 text-leaf group-hover:text-ivory transition-colors" />;
      default:
        return <Sprout className="w-5 h-5 text-leaf group-hover:text-ivory transition-colors" />;
    }
  };

  return (
    <section
      id="steps"
      className={`relative w-full py-12 md:py-24 px-4 sm:px-8 lg:px-12 bg-transparent transition-colors duration-300 ${
        isDark ? "text-ivory" : "text-forest"
      }`}
      aria-label="Ordering process in four transparent steps"
    >
      <div className="max-w-[1128px] mx-auto">
        {/* Section Header - starts directly with Make it happen in four steps */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] mb-4 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{fourSteps.headlineSans}</span>
            <span className="font-serif italic font-normal text-leaf px-1">
              {fourSteps.headlineItalic}
            </span>
          </h2>

          <p className={`font-sans text-base leading-6 font-normal ${
            isDark ? "text-ivory/75" : "text-forest/75"
          }`}>
            {fourSteps.subtitle}
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {fourSteps.steps.map((step, idx) => (
            <div
              key={step.number}
              className={`relative rounded-3xl p-6 sm:p-8 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-default ${
                isDark
                  ? "bg-forest/40 border-ivory/12 text-ivory shadow-sm hover:shadow-2xl hover:border-leaf/50 hover:bg-forest/70"
                  : "bg-white/90 border-forest/15 text-forest shadow-md hover:shadow-2xl hover:border-leaf/50 hover:bg-white"
              }`}
            >
              <div>
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold text-2xl sm:text-[32px] leading-8 sm:leading-[40px] transition-colors ${
                      isDark
                        ? "text-ivory/30 group-hover:text-leaf"
                        : "text-forest/30 group-hover:text-leaf"
                    }`}>
                      {step.number}
                    </span>
                    <span className={`text-xs font-mono tracking-widest uppercase leading-4 ${
                      isDark ? "text-ivory/50" : "text-forest/50"
                    }`}>
                      STEP
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-leaf group-hover:shadow-md ${
                    isDark ? "bg-forest/80 border border-ivory/10" : "bg-leaf/10 border border-leaf/20"
                  }`}>
                    {getStepIcon(idx)}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className={`font-heading font-bold text-xl mb-1 leading-7 ${
                  isDark ? "text-ivory" : "text-forest"
                }`}>
                  {step.title}
                </h3>
                <h4 className="font-sans font-medium text-xs text-leaf mb-3 leading-4">
                  {step.subtitle}
                </h4>

                {/* Description */}
                <p className={`font-sans text-xs sm:text-base leading-4 sm:leading-6 mb-4 ${
                  isDark ? "text-ivory/75" : "text-forest/75"
                }`}>
                  {step.description}
                </p>
              </div>

              {/* Status Guarantee line */}
              <div className={`pt-3 border-t flex items-center gap-2 text-xs font-mono leading-4 ${
                isDark ? "border-ivory/10 text-ivory/60" : "border-forest/10 text-forest/60"
              }`}>
                <CheckCircle2 className="w-4 h-4 text-leaf shrink-0" />
                <span>
                  {idx === 0 && "Zero obligation to purchase"}
                  {idx === 1 && "Live nursery photo before payment"}
                  {idx === 2 && "Careful door delivery in Addis"}
                  {idx === 3 && "Ongoing WhatsApp advice"}
                </span>
              </div>

              {/* Progress Connector line on desktop */}
              {idx < 3 && (
                <div
                  aria-hidden="true"
                  className={`hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 transition-colors ${
                    isDark ? "text-ivory/20 group-hover:text-leaf" : "text-forest/20 group-hover:text-leaf"
                  }`}
                >
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reassurance Callout Box */}
        <div className={`mt-12 p-6 rounded-3xl backdrop-blur-md border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark
            ? "bg-forest/50 border-ivory/15 text-ivory"
            : "bg-white/90 border-forest/15 text-forest shadow-md"
        }`}>
          <div className="flex items-center gap-3 text-center sm:text-left">
            <ShieldCheck className="w-6 h-6 text-leaf shrink-0" />
            <p className={`font-sans text-xs sm:text-base leading-4 sm:leading-6 ${
              isDark ? "text-ivory/85" : "text-forest/85"
            }`}>
              <strong className={isDark ? "text-ivory" : "text-forest"}>Transparent inquiry model:</strong> We confirm current stock, pot sizes, and actual delivery cost before you pay anything.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openInquiry()}
            className="shrink-0 px-6 py-3 rounded-full bg-leaf text-ivory text-xs font-semibold leading-4 hover:bg-leaf/90 transition-all shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[40px]"
          >
            Ask About Any Plant
          </button>
        </div>
      </div>
    </section>
  );
}
