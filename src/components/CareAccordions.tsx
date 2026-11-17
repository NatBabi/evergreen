"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Droplets, Layers } from "lucide-react";

interface CareCardData {
  id: string;
  stepNumber: string;
  tag: string;
  title: string;
  rule: string;
  tip: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof Sun;
}

export function CareAccordions() {
  const { content } = useLanguage();
  const { isDark } = useTheme();
  const { careSection } = content;

  const cards: CareCardData[] = [
    {
      id: "light",
      stepNumber: "01",
      tag: "LIGHT & EXPOSURE",
      title: "Morning Sun, Never Harsh Midday UV",
      rule: "Highland UV at 2,350m scorches indoor foliage. Position near east-facing or sheer-curtained windows.",
      tip: "Bega tip: 4–6 hrs direct sun for blooms; bright indirect for foliage.",
      imageSrc: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=70",
      imageAlt: "Indoor foliage basking in soft morning light",
      icon: Sun,
    },
    {
      id: "water",
      stepNumber: "02",
      tag: "WATERING ROUTINE",
      title: "The Two-Inch Finger Test",
      rule: "Never water on a rigid calendar. Feel 2 inches into the soil; only water thoroughly when it feels dry.",
      tip: "Kiremt tip: Cooler rainy months need far less water.",
      imageSrc: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=600&q=70",
      imageAlt: "Carefully checking moisture in potting soil",
      icon: Droplets,
    },
    {
      id: "soil",
      stepNumber: "03",
      tag: "AERATED POTTING MIX",
      title: "40% Volcanic Pumice Blend",
      rule: "Heavy Addis red clay suffocates roots. Our porous pumice mix guarantees free drainage and zero root rot.",
      tip: "Oxygen rule: Roots need oxygen just as much as water.",
      imageSrc: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=600&q=70",
      imageAlt: "Aerated pumice and organic potting mix",
      icon: Layers,
    },
  ];

  return (
    <section
      id="care"
      className={`relative w-full py-16 md:py-24 px-4 sm:px-8 lg:px-12 transition-colors duration-300 ${
        isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
      }`}
      aria-label="Highland plant care in three simple steps"
    >
      <div className="max-w-[1128px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[720px] mb-10 sm:mb-14">
          <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] mb-3 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{careSection.headlineSans || "Simple care for"} </span>
            <span className="font-serif italic font-normal text-leaf">
              {careSection.headlineItalic || "healthy"}
            </span>
            <span> plants</span>
          </h2>
          <p className={`font-sans text-base leading-relaxed ${
            isDark ? "text-ivory/75" : "text-forest/75"
          }`}>
            {careSection.subtitle ||
              "Practical, foolproof care guidelines tested specifically for Ethiopian indoor spaces."}
          </p>
        </div>

        {/* Minimal 3-Card Grid with Full-bleed Photography and Overlaid Honest Texts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl transition-[box-shadow,border-color] duration-300 group flex flex-col justify-between p-6 sm:p-7 ${
                  isDark ? "border-ivory/15 bg-forest" : "border-forest/15 bg-white"
                }`}
              >
                {/* Background Photography that fits the card */}
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Smooth Dark Overlay for Optimal Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 pointer-events-none" />

                {/* Top Badge: Step Number & Label */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-ivory bg-white/15 backdrop-blur-md border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf" />
                    <span>{card.stepNumber} · {card.tag}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-ivory">
                    <Icon className="w-4 h-4 text-leaf" />
                  </div>
                </div>

                {/* Bottom: 3 Honest Texts Overlay */}
                <div className="relative z-10 space-y-2.5">
                  {/* Text 1: Title */}
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-ivory tracking-tight leading-tight">
                    {card.title}
                  </h3>

                  {/* Text 2: Core Rule */}
                  <p className="font-sans text-sm text-ivory/90 leading-relaxed font-normal">
                    {card.rule}
                  </p>

                  {/* Text 3: Actionable Tip */}
                  <div className="pt-1 text-xs font-mono text-leaf flex items-center gap-1.5">
                    <span>{card.tip}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
