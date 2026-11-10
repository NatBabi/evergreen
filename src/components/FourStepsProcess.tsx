"use client";

import React, { useState } from "react";
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
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold mb-4 border tracking-wide uppercase bg-leaf/10 text-leaf border-leaf/25">
            <Sprout className="w-3.5 h-3.5" />
            <span>{fourSteps.eyebrow}</span>
          </div>
          <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] mb-4 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{fourSteps.headlineSans}</span>
            <span className="font-serif italic font-normal text-leaf px-1">
              {fourSteps.headlineItalic}
            </span>
          </h2>
          <p className={`font-sans text-base sm:text-lg leading-relaxed font-normal ${
            isDark ? "text-ivory/75" : "text-forest/75"
          }`}>
            {fourSteps.subtitle}
          </p>
        </div>

        {/* 2-Column Interactive Stacked Card Deck + Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stacked 3D Card Deck (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
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
                    ? "bg-[#143E2C] border-leaf/20 shadow-md shadow-black/30"
                    : "bg-white/75 border-forest/15 shadow-xs"
                } -z-20`}
              />
              <div
                className={`absolute -bottom-7 inset-x-9 h-6 rounded-b-[20px] border-b border-x transition-colors duration-300 ${
                  isDark
                    ? "bg-[#071B14] border-leaf/10 opacity-70"
                    : "bg-white/50 border-forest/12 opacity-80"
                } -z-30`}
              />

              {/* Active Foreground Card */}
              <div
                className={`relative w-full min-h-[440px] sm:min-h-[470px] rounded-[30px] p-7 sm:p-9 flex flex-col justify-between border transition-all duration-300 shadow-2xl ${
                  isDark
                    ? "bg-[#0A261B] border-leaf/35 text-ivory shadow-black/60"
                    : "bg-white border-forest/15 text-forest shadow-[0_20px_50px_rgba(7,27,20,0.08)] ring-1 ring-forest/5"
                }`}
              >
                {/* Top Row: Brand pill & Step counter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
                    <span className="text-xs font-mono font-semibold tracking-wider text-leaf uppercase">
                      Evergreen
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest border ${
                    isDark ? "bg-leaf/15 text-leaf border-leaf/30" : "bg-leaf/10 text-forest border-leaf/30"
                  }`}>
                    0{activeIdx + 1} / 0{fourSteps.steps.length}
                  </span>
                </div>

                {/* Center Content: Glowing Icon aperture, Title, Description */}
                <div className="flex flex-col items-center text-center my-auto py-6">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center border shadow-inner transition-transform duration-300 hover:scale-105 ${
                      isDark
                        ? "bg-[#123D2B] border-leaf/40 text-leaf shadow-leaf/20"
                        : "bg-leaf/10 border-leaf/30 text-leaf shadow-xs"
                    }`}
                  >
                    <CurrentIcon className="w-9 h-9 text-leaf" />
                  </div>

                  <h3 className={`font-heading font-extrabold text-3xl sm:text-4xl tracking-tight mt-6 mb-2 ${
                    isDark ? "text-ivory" : "text-forest"
                  }`}>
                    {currentStep.title}
                  </h3>

                  <p className={`font-sans text-xs sm:text-sm font-medium leading-relaxed max-w-[260px] ${
                    isDark ? "text-ivory/70" : "text-forest/70"
                  }`}>
                    {currentStep.subtitle || currentStep.description}
                  </p>
                </div>

                {/* Bottom Row: Mini navigation pill buttons */}
                <div className={`flex items-center justify-between pt-4 border-t ${
                  isDark ? "border-leaf/20" : "border-forest/10"
                }`}>
                  <span className={`text-xs font-mono font-medium ${isDark ? "text-ivory/50" : "text-forest/50"}`}>
                    Interactive Step
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous step"
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all active:scale-95 ${
                        isDark
                          ? "bg-forest/60 border-ivory/15 text-ivory hover:bg-forest hover:border-leaf"
                          : "bg-white border-forest/15 text-forest hover:bg-forest/5 hover:border-leaf shadow-xs"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next step"
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all active:scale-95 ${
                        isDark
                          ? "bg-forest/60 border-ivory/15 text-ivory hover:bg-forest hover:border-leaf"
                          : "bg-white border-forest/15 text-forest hover:bg-forest/5 hover:border-leaf shadow-xs"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Connected Timeline Stepper (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative pl-7 sm:pl-10 flex flex-col gap-8 sm:gap-10 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-6 before:w-0.5 before:bg-gradient-to-b before:from-leaf before:via-leaf/35 before:to-transparent">
              {fourSteps.steps.map((step, idx) => {
                const isActive = activeIdx === idx;
                const meta = stepsMeta[idx];

                return (
                  <div
                    key={step.number}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isActive}
                    onClick={() => setActiveIdx(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIdx(idx);
                      }
                    }}
                    className={`relative cursor-pointer group transition-all duration-300 rounded-2xl p-4 -ml-4 outline-none focus-visible:ring-2 focus-visible:ring-leaf ${
                      isActive
                        ? isDark
                          ? "bg-forest-deep/50 border border-leaf/30 shadow-md"
                          : "bg-white border border-forest/15 shadow-lg shadow-forest/5"
                        : "hover:bg-leaf/5"
                    }`}
                  >
                    {/* Node on Vertical Timeline */}
                    <div
                      className={`absolute -left-[27px] sm:-left-[39px] top-5 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? isDark
                            ? "w-6 h-6 rounded-full bg-leaf text-forest ring-4 ring-leaf/25 shadow-md shadow-leaf/30"
                            : "w-6 h-6 rounded-full bg-leaf text-ivory ring-4 ring-leaf/25 shadow-md shadow-leaf/20"
                          : isDark
                          ? "w-5 h-5 rounded-full border-2 border-leaf/30 bg-forest-deep group-hover:border-leaf"
                          : "w-5 h-5 rounded-full border-2 border-forest/20 bg-white group-hover:border-leaf"
                      }`}
                    >
                      {isActive ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-leaf/40 group-hover:bg-leaf" />
                      )}
                    </div>

                    {/* Step Eyebrow */}
                    <div className="text-xs font-mono font-bold tracking-wider text-leaf uppercase mb-1">
                      {meta.stepLabel}
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3
                      className={`font-heading font-extrabold text-xl sm:text-2xl tracking-tight transition-colors ${
                        isActive
                          ? isDark
                            ? "text-ivory"
                            : "text-forest"
                          : isDark
                          ? "text-ivory/70 group-hover:text-ivory"
                          : "text-forest/70 group-hover:text-forest"
                      }`}
                    >
                      {step.title}
                      <span className="text-xs font-sans font-normal opacity-60 ml-3 hidden sm:inline">
                        — {step.subtitle}
                      </span>
                    </h3>

                    {/* Step Detailed Description */}
                    <p
                      className={`font-sans text-xs sm:text-base leading-relaxed mt-2 transition-opacity ${
                        isActive
                          ? isDark
                            ? "text-ivory/85"
                            : "text-forest/85"
                          : isDark
                          ? "text-ivory/50 group-hover:text-ivory/70"
                          : "text-forest/50 group-hover:text-forest/70"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Highlight Metric / Key Value Box (Matching Reference Style) */}
                    <div className="flex items-baseline gap-3 mt-3 pt-3 border-t border-leaf/15">
                      <span className="font-heading font-black text-xl sm:text-2xl text-leaf tracking-tight">
                        {meta.metric}
                      </span>
                      <span className={`text-xs font-mono font-medium ${isDark ? "text-ivory/65" : "text-forest/65"}`}>
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
