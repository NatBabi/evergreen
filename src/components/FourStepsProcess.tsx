"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import {
  MessageCircle,
  Camera,
  Truck,
  Sprout,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function FourStepsProcess() {
  const { content } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const { fourSteps } = content;
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Scroll-driven active step tracking on mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-step-index"));
            if (!isNaN(index)) {
              setActiveIdx(index);
            }
          }
        });
      },
      { rootMargin: "-25% 0px -35% 0px", threshold: 0.2 }
    );

    const stepElements = document.querySelectorAll(".step-milestone-item");
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Metadata for the 4 steps aligning with the reference UI
  const stepsMeta = [
    {
      stepLabel: "STEP 1",
      cardTitle: "Inquire",
      cardDescription: "Tell us about your room's light or what caught your eye on TikTok",
      metric: "0 Birr",
      metricLabel: "Zero obligation to purchase",
      icon: MessageCircle,
    },
    {
      stepLabel: "STEP 2",
      cardTitle: "Confirm",
      cardDescription: "Live photos, pot diameter, and health verified before payment",
      metric: "100% Live",
      metricLabel: "Verified live video & specs",
      icon: Camera,
    },
    {
      stepLabel: "STEP 3",
      cardTitle: "Deliver",
      cardDescription: "Cushioned doorstep transport directly to your home in Addis",
      metric: "24–48h",
      metricLabel: "Doorstep dispatch across Addis",
      icon: Truck,
    },
    {
      stepLabel: "STEP 4",
      cardTitle: "Grow",
      cardDescription: "Acclimatized at 2,350m elevation with ongoing WhatsApp care",
      metric: "7-Day",
      metricLabel: "Acclimatization guarantee",
      icon: Sprout,
    },
  ];

  const currentStep = fourSteps.steps[activeIdx] || fourSteps.steps[0];
  const currentMeta = stepsMeta[activeIdx] || stepsMeta[0];
  const CurrentIcon = currentMeta.icon;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : fourSteps.steps.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev < fourSteps.steps.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="steps"
      className={`relative w-full py-16 md:py-28 px-4 sm:px-8 lg:px-12 bg-transparent transition-colors duration-300 ${
        isDark ? "text-ivory" : "text-forest"
      }`}
      aria-label="Ordering process in four transparent steps"
    >
      <div className="max-w-[1128px] mx-auto">
        {/* Section Header without 04 Eyebrow Badge Pill */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16 md:mb-20">
          <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] mb-4 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{fourSteps.headlineSans}</span>
            <span className="font-serif italic font-normal text-leaf px-1">
              {fourSteps.headlineItalic}
            </span>
          </h2>
          <p className={`font-sans text-base max-w-[600px] mx-auto leading-relaxed ${
            isDark ? "text-ivory/75" : "text-forest/75"
          }`}>
            {fourSteps.subtitle}
          </p>
        </div>

        {/* 2-Column Desktop Layout / Clean Scrollable Timeline on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stacked 3D Card Deck (DESKTOP ONLY - hidden on mobile to avoid redundant card boxes) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[390px]">
              {/* Stacked Cards Physical Deck Layers beneath active card */}
              <div
                className={`absolute -bottom-2.5 inset-x-3 h-6 rounded-b-[26px] border-b border-x transition-colors duration-300 ${
                  isDark
                    ? "bg-[#0E3424] border-leaf/30 shadow-lg shadow-black/40"
                    : "bg-white/90 border-forest/15 shadow-sm"
                } -z-10`}
              />
              <div
                className={`absolute -bottom-5 inset-x-6 h-6 rounded-b-[22px] border-b border-x transition-colors duration-300 ${
                  isDark
                    ? "bg-[#071E15] border-leaf/20 shadow-md shadow-black/30"
                    : "bg-white/70 border-forest/10"
                } -z-20`}
              />

              {/* Main Active Card */}
              <div className={`w-full rounded-3xl p-7 sm:p-8 backdrop-blur-md border transition-all duration-300 relative ${
                isDark
                  ? "bg-[#0C2B1E] border-leaf/35 text-ivory shadow-2xl shadow-black/50"
                  : "bg-white border-forest/15 text-forest shadow-xl shadow-forest/5"
              }`}>
                {/* Stage Tag and Pagination Controls */}
                <div className="flex items-center justify-between mb-8">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-leaf/15 text-leaf border border-leaf/25">
                    <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
                    <span>{currentMeta.stepLabel}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors active:scale-95 ${
                        isDark
                          ? "border-ivory/20 hover:bg-ivory/10 text-ivory"
                          : "border-forest/20 hover:bg-forest/10 text-forest"
                      }`}
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors active:scale-95 ${
                        isDark
                          ? "border-ivory/20 hover:bg-ivory/10 text-ivory"
                          : "border-forest/20 hover:bg-forest/10 text-forest"
                      }`}
                      aria-label="Next step"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Big Metric Display */}
                <div className="mb-6">
                  <div className="font-heading font-black text-4xl sm:text-5xl text-leaf tracking-tight leading-none mb-2">
                    {currentMeta.metric}
                  </div>
                  <div className={`text-xs font-mono font-bold tracking-wider uppercase ${
                    isDark ? "text-ivory/70" : "text-forest/70"
                  }`}>
                    {currentMeta.metricLabel}
                  </div>
                </div>

                {/* Active Card Content */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-leaf text-ivory flex items-center justify-center shadow-md shrink-0">
                      <CurrentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-heading font-bold text-xl sm:text-2xl tracking-tight leading-tight ${
                        isDark ? "text-ivory" : "text-forest"
                      }`}>
                        {currentStep.title}
                      </h3>
                      <p className={`text-xs font-sans ${isDark ? "text-ivory/60" : "text-forest/60"}`}>
                        {currentStep.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-ivory/85" : "text-forest/85"}`}>
                    {currentStep.description}
                  </p>
                </div>

                {/* Bottom Step Indicator Dots */}
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-forest/10 dark:border-ivory/10">
                  {fourSteps.steps.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setActiveIdx(dotIdx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeIdx === dotIdx ? "w-8 bg-leaf" : "w-2 bg-leaf/30 hover:bg-leaf/50"
                      }`}
                      aria-label={`Go to step ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Milestone Steps Vertical Timeline */}
          <div className="lg:col-span-7">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-forest/15 dark:border-ivory/15 space-y-8 sm:space-y-10">
              {fourSteps.steps.map((step, idx) => {
                const meta = stepsMeta[idx];
                const isActive = activeIdx === idx;
                const StepIcon = meta.icon;

                return (
                  <div
                    key={idx}
                    data-step-index={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`step-milestone-item relative cursor-pointer group transition-all duration-300 p-4 sm:p-5 rounded-2xl border ${
                      isActive
                        ? isDark
                          ? "bg-[#0A261B]/80 border-leaf/40 shadow-lg shadow-black/25"
                          : "bg-white border-forest/20 shadow-md shadow-forest/5"
                        : isDark
                        ? "bg-transparent border-transparent hover:bg-ivory/5"
                        : "bg-transparent border-transparent hover:bg-forest/5"
                    }`}
                  >
                    {/* Node on Vertical Timeline */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-4 sm:top-5 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-leaf text-ivory scale-110 shadow-md shadow-leaf/30"
                          : isDark
                          ? "w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-ivory/20 bg-forest-deep group-hover:border-leaf"
                          : "w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-forest/20 bg-ivory group-hover:border-leaf"
                      }`}
                    >
                      {isActive ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-leaf/40 group-hover:bg-leaf" />
                      )}
                    </div>

                    {/* Step Eyebrow with Stage Label and Icon */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold tracking-wider text-leaf uppercase">
                        {meta.stepLabel}
                      </span>
                      <span className={`text-[11px] font-mono opacity-40 ${isDark ? "text-ivory" : "text-forest"}`}>·</span>
                      <StepIcon className="w-3.5 h-3.5 text-leaf opacity-80" />
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3
                      className={`font-heading font-bold text-lg sm:text-xl tracking-tight transition-colors ${
                        isDark
                          ? isActive ? "text-ivory" : "text-ivory/80 group-hover:text-ivory"
                          : isActive ? "text-forest" : "text-forest/80 group-hover:text-forest"
                      }`}
                    >
                      {step.title}
                      <span className="text-xs font-sans font-normal opacity-60 ml-2.5 hidden sm:inline">
                        — {step.subtitle}
                      </span>
                    </h3>

                    {/* Step Detailed Description */}
                    <p
                      className={`font-sans text-xs sm:text-sm leading-relaxed mt-1.5 transition-opacity ${
                        isDark
                          ? isActive ? "text-ivory/95" : "text-ivory/65 group-hover:text-ivory/85"
                          : isActive ? "text-forest/95" : "text-forest/65 group-hover:text-forest/85"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Highlight Metric / Key Value Box */}
                    <div className={`flex items-baseline gap-2.5 mt-3 pt-2.5 border-t transition-colors ${
                      isActive
                        ? isDark ? "border-leaf/25" : "border-forest/15"
                        : isDark ? "border-ivory/10" : "border-forest/10"
                    }`}>
                      <span className="font-heading font-black text-sm sm:text-base text-leaf tracking-tight">
                        {meta.metric}
                      </span>
                      <span className={`text-[11px] sm:text-xs font-mono font-medium ${
                        isDark ? "text-ivory/60" : "text-forest/60"
                      }`}>
                        {meta.metricLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reassurance Callout Box */}
        <div className={`mt-14 p-6 sm:p-8 rounded-3xl backdrop-blur-md border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark
            ? "bg-[#0A261B]/80 border-leaf/25 text-ivory shadow-lg"
            : "bg-white/95 border-forest/15 text-forest shadow-md"
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
