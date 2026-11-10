"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  Sun,
  Droplets,
  Layers,
  ArrowUpRight,
  HelpCircle,
  Compass,
} from "lucide-react";

interface CarePanelData {
  id: string;
  stepNumber: string;
  panelKey: "light" | "water" | "soil";
  label: string;
  heading: string;
  amharicTitle: string;
  subtitle: string;
  keyAdvice: string;
  body: string;
  problemSolved: string;
  tiktokQuery: string;
  bgHex: string;
  inkHex: string;
  accentHex: string;
  badgeBg: string;
  borderColor: string;
}

export function CareAccordions() {
  const { content } = useLanguage();
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { careSection } = content;

  // Curated botanical color palette strictly derived from the Evergreen design system
  const panels: CarePanelData[] = [
    {
      id: "light",
      stepNumber: "01",
      panelKey: "light",
      label: "Light & Exposure",
      heading: "Light & Why Plants Stop Flowering",
      amharicTitle: "የብርሃንና አበባ ጥምረት",
      subtitle: "Morning sunlight vs scorching midday heat in Addis Ababa",
      keyAdvice:
        "Flowering plants (Bougainvillea, Desert Rose) need 4–6 hours of direct sun to bloom. Indoor foliage (Monstera, Peace Lily) prefers bright indirect light.",
      body: "Highland UV at 2,350m is intense. Midday direct sun will scorch indoor foliage leaves. Position foliage near east-facing or sheer-curtained windows.",
      problemSolved: "Direct answer: 'Why did my plant stop blooming?'",
      tiktokQuery: "Bougainvillea care & flowering in Addis",
      bgHex: "#143E2C", // Highland Canopy Jade
      inkHex: "#F7F5EE", // Pure Ivory Ink
      accentHex: "#78B83D", // Leaf Green
      badgeBg: "rgba(247, 245, 238, 0.12)",
      borderColor: "rgba(247, 245, 238, 0.18)",
    },
    {
      id: "water",
      stepNumber: "02",
      panelKey: "water",
      label: "Watering Routine",
      heading: "Highland Watering: The 2-Inch Rule",
      amharicTitle: "የውሃ አጠጣጥና የሁለት ጣት ልኬት",
      subtitle: "Preventing root rot across Bega and Kiremt seasons",
      keyAdvice:
        "Never water on a rigid calendar. Insert your finger two inches into the potting mix. If moist, wait. If dry, water thoroughly until it drains.",
      body: "Overwatering is the #1 houseplant hazard in Addis. Roots need oxygen just as much as water. In cool rainy Kiremt months, reduce watering frequency.",
      problemSolved: "Direct answer to 110+ comments: 'How often to water?'",
      tiktokQuery: "Watering schedule & soil finger check",
      bgHex: "#0E3424", // Highland Pine Deep
      inkHex: "#F7F5EE", // Pure Ivory Ink
      accentHex: "#78B83D", // Leaf Green
      badgeBg: "rgba(247, 245, 238, 0.12)",
      borderColor: "rgba(247, 245, 238, 0.18)",
    },
    {
      id: "soil",
      stepNumber: "03",
      panelKey: "soil",
      label: "Pumice & Soil",
      heading: "Aerated Highland Potting Mix",
      amharicTitle: "የተመጣጠነ የፖቲንግ አፈር",
      subtitle: "Letting roots breathe freely with pumice and organic compost",
      keyAdvice:
        "Heavy garden red-clay suffocates indoor container roots. Acclimatized plants need a light, free-draining blend of 40% pumice, compost, and loam.",
      body: "Repotting every 12 to 18 months replenishes vital micronutrients and gives expanding root balls room to breathe. Ready-mixed soil available on request.",
      problemSolved: "Guarantees long root lifespan & zero root rot",
      tiktokQuery: "Healthy potting mix for Ethiopia",
      bgHex: "#1A4634", // Highland Volcanic Moss
      inkHex: "#F7F5EE", // Pure Ivory Ink
      accentHex: "#DCE5D3", // Sage
      badgeBg: "rgba(247, 245, 238, 0.12)",
      borderColor: "rgba(247, 245, 238, 0.18)",
    },
  ];

  // Keyboard navigation for accessible panel control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % panels.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + panels.length) % panels.length);
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(panels.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [panels.length]);

  return (
    <section
      id="care"
      ref={containerRef}
      className={`relative w-full py-12 md:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
      }`}
      aria-label="Highland plant care in three steps"
    >
      <div className="max-w-[1128px] mx-auto flex flex-col justify-between">
        {/* Section Headline - begins directly with Simple care for house plants */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[720px]">
            <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] mb-3 ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              <span>{careSection.headlineSans}</span>
              <span className="font-serif italic font-normal text-leaf px-1">
                {careSection.headlineItalic}
              </span>
              <span> plants</span>
            </h2>
            <p className={`text-base font-sans leading-6 ${isDark ? "text-ivory/75" : "text-forest/75"}`}>
              {careSection.subtitle ||
                "Practical, foolproof care guidelines tested specifically for Ethiopian indoor spaces."}
            </p>
          </div>

          {/* Seasonal Highland Quick Toggles */}
          <div className="flex items-center gap-3 flex-wrap shrink-0">
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-mono leading-4 ${
              isDark ? "bg-ivory/10 border-ivory/15 text-ivory/90" : "bg-white/80 border-forest/15 text-forest/90 shadow-xs"
            }`}>
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Bega (Sunny): Mist Weekly</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-mono leading-4 ${
              isDark ? "bg-ivory/10 border-ivory/15 text-ivory/90" : "bg-white/80 border-forest/15 text-forest/90 shadow-xs"
            }`}>
              <Droplets className="w-4 h-4 text-leaf" />
              <span>Kiremt (Rainy): Reduce Water</span>
            </div>
          </div>
        </div>

        {/* Desktop Arco Horizontal Expanding Accordion (lg:flex) */}
        <div className="hidden lg:flex items-stretch gap-4 w-full h-[540px] mb-8">
          {panels.map((panel, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={panel.id}
                role="button"
                aria-expanded={isActive}
                tabIndex={0}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                style={{
                  backgroundColor: panel.bgHex,
                  color: panel.inkHex,
                  borderColor: panel.borderColor,
                }}
                className={`relative overflow-hidden cursor-pointer select-none border transition-all duration-700 ease-[cubic-bezier(0.625,0.05,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf ${
                  isActive
                    ? "flex-1 rounded-[32px] shadow-2xl p-8 border-leaf/40"
                    : "w-20 shrink-0 rounded-[32px] hover:brightness-110 p-4 flex flex-col items-center justify-between"
                }`}
              >
                {/* Collapsed Pill State: Vertical Step Label */}
                {!isActive && (
                  <div className="w-full h-full flex flex-col items-center justify-between py-4">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded-full bg-ivory/15 text-ivory leading-4 border border-ivory/20">
                      {panel.stepNumber}
                    </span>

                    <span
                      className="font-heading font-bold text-base tracking-wider uppercase [writing-mode:vertical-rl] rotate-180 whitespace-nowrap leading-6 text-ivory/90"
                    >
                      {panel.label}
                    </span>

                    <div className="w-8 h-8 rounded-full bg-ivory/10 text-leaf border border-ivory/15 flex items-center justify-center shrink-0">
                      {panel.id === "light" && <Sun className="w-4 h-4" />}
                      {panel.id === "water" && <Droplets className="w-4 h-4" />}
                      {panel.id === "soil" && <Layers className="w-4 h-4" />}
                    </div>
                  </div>
                )}

                {/* Expanded Active Panel Content */}
                {isActive && (
                  <div className="h-full flex flex-col justify-between animate-in fade-in duration-500">
                    {/* Top: Step Header & Badges */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold leading-4 bg-ivory/10 text-ivory border border-ivory/15">
                          <span className="text-leaf">●</span>
                          <span>STEP {panel.stepNumber} · {panel.label.toUpperCase()}</span>
                        </div>
                        <span className="font-serif italic text-base font-semibold text-leaf leading-6">
                          {panel.amharicTitle}
                        </span>
                      </div>

                      <h3
                        className="font-heading font-extrabold text-[32px] sm:text-4xl text-ivory tracking-tight leading-[40px] sm:leading-[44px] mb-2"
                      >
                        {panel.heading}
                      </h3>
                      <p className="font-sans text-xs sm:text-base text-ivory/80 font-medium leading-4 sm:leading-6 max-w-[640px]">
                        {panel.subtitle}
                      </p>
                    </div>

                    {/* Bottom Split Layout: Real Photo Visual on Left + Technical Advice on Right */}
                    <div className="grid grid-cols-12 gap-6 items-end pt-4 border-t border-ivory/15">
                      {/* Left: Authentic Botanical Photo Visual (5 cols) */}
                      <div className="col-span-5">
                        <CarePhotoVisual panelId={panel.id} />
                      </div>

                      {/* Right: Technical Micro-Advice & TikTok Video Guide (7 cols) */}
                      <div className="col-span-7 flex flex-col justify-between">
                        {/* Problem Solved Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 leading-4 w-fit bg-ivory/10 text-ivory border border-ivory/15">
                          <HelpCircle className="w-4 h-4 text-leaf" />
                          <span>{panel.problemSolved}</span>
                        </div>

                        {/* Key Rule Callout Box */}
                        <div className="p-4 rounded-2xl bg-forest-deep/60 border border-ivory/15 mb-3 shadow-xs">
                          <p className="font-heading font-bold text-base text-ivory leading-6">
                            {panel.keyAdvice}
                          </p>
                        </div>

                        {/* Body Details */}
                        <p className="font-sans text-xs text-ivory/80 leading-4 mb-4">
                          {panel.body}
                        </p>

                        {/* TikTok Guide Link */}
                        <a
                          href={content.brand.tiktokUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-leaf hover:text-ivory transition-colors underline underline-offset-4 w-fit leading-4"
                        >
                          <span>{careSection.tiktokLinkText}: &ldquo;{panel.tiktokQuery}&rdquo;</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Vertical Stacked Accordion (lg:hidden) */}
        <div className="flex flex-col gap-3 lg:hidden w-full mb-8">
          {panels.map((panel, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={panel.id}
                role="button"
                aria-expanded={isActive}
                onClick={() => setActiveIndex(idx)}
                style={{
                  backgroundColor: panel.bgHex,
                  color: panel.inkHex,
                  borderColor: panel.borderColor,
                }}
                className={`w-full overflow-hidden transition-all duration-500 rounded-2xl shadow-md border ${
                  isActive ? "p-6 border-leaf/40" : "p-4 cursor-pointer hover:brightness-105"
                }`}
              >
                {/* Mobile Bar Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-ivory/15 text-ivory border border-ivory/20 leading-4">
                      {panel.stepNumber}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-base text-ivory leading-6">
                        {panel.label}
                      </h3>
                      <span className="text-xs text-leaf font-serif italic leading-4">
                        {panel.amharicTitle}
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-ivory/10 text-leaf border border-ivory/15 flex items-center justify-center shrink-0">
                    {panel.id === "light" && <Sun className="w-4 h-4" />}
                    {panel.id === "water" && <Droplets className="w-4 h-4" />}
                    {panel.id === "soil" && <Layers className="w-4 h-4" />}
                  </div>
                </div>

                {/* Mobile Expanded Drawer */}
                {isActive && (
                  <div className="pt-4 mt-4 border-t border-ivory/15 animate-in fade-in duration-300">
                    <h4 className="font-heading font-extrabold text-xl text-ivory tracking-tight leading-7 mb-2">
                      {panel.heading}
                    </h4>

                    {/* Real Photo Visual */}
                    <div className="mb-4">
                      <CarePhotoVisual panelId={panel.id} />
                    </div>

                    {/* Problem Solved Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 leading-4 bg-ivory/10 text-ivory border border-ivory/15">
                      <HelpCircle className="w-4 h-4 text-leaf" />
                      <span>{panel.problemSolved}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-forest-deep/60 border border-ivory/15 mb-3">
                      <p className="font-heading font-bold text-xs text-ivory leading-4">
                        {panel.keyAdvice}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-ivory/80 leading-4 mb-4">
                      {panel.body}
                    </p>

                    <a
                      href={content.brand.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-leaf hover:text-ivory transition-colors underline underline-offset-4 leading-4"
                    >
                      <span>Watch guide: &ldquo;{panel.tiktokQuery}&rdquo;</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Arco Stage Footer Bar */}
        <footer className={`flex items-center justify-between gap-4 pt-6 border-t text-xs font-mono leading-4 ${
          isDark ? "border-ivory/15 text-ivory/70" : "border-forest/15 text-forest/70"
        }`}>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-leaf" />
            <span className="hidden sm:inline">Hover or click a panel to inspect</span>
            <span className="sm:hidden">Tap any panel to expand</span>
          </div>

          <div className="flex items-center gap-4">
            <span className={isDark ? "text-ivory/50" : "text-forest/50"}>Guide</span>
            <span className={`px-3 py-1 rounded-full font-bold border tracking-widest ${
              isDark ? "bg-ivory/10 text-ivory border-ivory/15" : "bg-forest/5 text-forest border-forest/15"
            }`}>
              0{activeIndex + 1} / 0{panels.length}
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Authentic Botanical Photo Visuals for Highland Plant Care
// ---------------------------------------------------------------------------

function CarePhotoVisual({ panelId }: { panelId: string }) {
  const meta = {
    light: {
      src: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80",
      alt: "Lush indoor foliage in gentle morning sunlight",
      tag: "East Window Exposure",
      caption: "Filtered morning sun · Zero scorching highland midday UV",
    },
    water: {
      src: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=1000&q=80",
      alt: "Checking indoor plant potting mix moisture with finger",
      tag: "2-Inch Hydration Test",
      caption: "Feel topsoil depth first · Oxygen is as vital as water",
    },
    soil: {
      src: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1000&q=80",
      alt: "Rich volcanic pumice aerated potting mix",
      tag: "40% Volcanic Pumice",
      caption: "Porous aeration pockets · Guaranteed zero root suffocation",
    },
  }[panelId] || {
    src: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80",
    alt: "Plant care guide",
    tag: "Highland Plant Care",
    caption: "Acclimatized for 2,350m elevation in Addis",
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-forest-deep shadow-md border border-ivory/15 group">
      <Image
        src={meta.src}
        alt={meta.alt}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      {/* Subtle botanical dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-transparent pointer-events-none" />

      {/* Floating tag pill in top-left */}
      <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold backdrop-blur-md bg-forest-deep/85 text-ivory border border-ivory/20 shadow-sm leading-tight">
        <span className="w-1.5 h-1.5 rounded-full bg-leaf" />
        <span>{meta.tag}</span>
      </div>

      {/* Caption at bottom */}
      <div className="absolute bottom-3 inset-x-3 z-10 text-xs font-sans text-ivory/95 font-medium leading-tight">
        {meta.caption}
      </div>
    </div>
  );
}






