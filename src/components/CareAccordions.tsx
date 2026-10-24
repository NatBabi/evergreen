"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  Sun,
  Droplets,
  Layers,
  ArrowUpRight,
  HelpCircle,
  Sprout,
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
                role="region"
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

                    {/* Bottom Split Layout: Vector Visual on Left + Technical Advice on Right */}
                    <div className="grid grid-cols-12 gap-6 items-end pt-4 border-t border-ivory/15">
                      {/* Left: Custom Architectural Botanical SVG Visual (5 cols) */}
                      <div className="col-span-5 rounded-2xl overflow-hidden bg-forest-deep/60 border border-ivory/15 shadow-inner">
                        {panel.id === "light" && <LightDiagramSvg />}
                        {panel.id === "water" && <WaterDiagramSvg />}
                        {panel.id === "soil" && <SoilDiagramSvg />}
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
                role="region"
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

                    {/* SVG Visual */}
                    <div className="rounded-xl overflow-hidden bg-forest-deep/60 border border-ivory/15 mb-4">
                      {panel.id === "light" && <LightDiagramSvg />}
                      {panel.id === "water" && <WaterDiagramSvg />}
                      {panel.id === "soil" && <SoilDiagramSvg />}
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
// Bespoke Architectural SVG Visuals (viewBox 0 0 540 360, Dark Botanical Theme)
// ---------------------------------------------------------------------------

function LightDiagramSvg() {
  return (
    <svg
      viewBox="0 0 540 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto block select-none"
      role="img"
      aria-label="Highland sunlight exposure and window aperture diagram"
    >
      {/* Background Grid */}
      <rect width="540" height="360" fill="#071B14" fillOpacity="0.6" />
      <path d="M40 60h460M40 120h460M40 180h460M40 240h460M40 300h460" stroke="#F7F5EE" strokeOpacity="0.1" strokeDasharray="3 3" />
      <path d="M100 40v280M180 40v280M260 40v280M340 40v280M420 40v280" stroke="#F7F5EE" strokeOpacity="0.1" strokeDasharray="3 3" />

      {/* Architectural Window Aperture */}
      <rect x="70" y="55" width="220" height="250" rx="12" fill="#123D2B" fillOpacity="0.8" stroke="#F7F5EE" strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="180" y1="55" x2="180" y2="305" stroke="#F7F5EE" strokeWidth="1.5" strokeOpacity="0.2" />
      <line x1="70" y1="180" x2="290" y2="180" stroke="#F7F5EE" strokeWidth="1.5" strokeOpacity="0.2" />

      {/* Sheer Linen Curtain Filter Indicator */}
      <path d="M70 55 C 100 120, 100 240, 70 305" stroke="#78B83D" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <text x="80" y="75" fill="#78B83D" fontFamily="monospace" fontSize="11" fontWeight="bold">SHEER FILTER</text>

      {/* Sun Position: Morning 45 deg (Soft Gold) */}
      <circle cx="390" cy="100" r="32" fill="#E5BA69" stroke="#F7F5EE" strokeWidth="1.5" />
      <circle cx="390" cy="100" r="42" stroke="#E5BA69" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />
      <path d="M390 50v-10M390 160v-10M330 100h-10M450 100h-10M345 55l-8-8M435 145l-8-8M345 145l-8 8M435 55l-8 8" stroke="#E5BA69" strokeWidth="2" />

      {/* Light Rays reaching Plant */}
      <path d="M360 125 L 230 220" stroke="#E5BA69" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="225,223 235,215 233,227" fill="#E5BA69" />

      {/* Plant Specimen Silhouette */}
      <path d="M210 280 Q 230 240 240 210 Q 245 225 250 280 Z" fill="#071B14" />
      <circle cx="230" cy="205" r="14" fill="#78B83D" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="255" cy="195" r="18" fill="#78B83D" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="215" cy="225" r="12" fill="#78B83D" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.5" />
      <rect x="220" y="275" width="30" height="30" rx="4" fill="#071B14" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.3" />

      {/* Lux Meter Readout Box */}
      <rect x="330" y="195" width="165" height="110" rx="10" fill="#071B14" stroke="#F7F5EE" strokeWidth="1.5" strokeOpacity="0.3" />
      <rect x="342" y="210" width="141" height="18" rx="4" fill="#F7F5EE" fillOpacity="0.08" />
      <text x="350" y="223" fill="#F7F5EE" fontFamily="monospace" fontSize="10" fontWeight="bold">LUX SPECTRUM</text>
      <text x="350" y="252" fill="#F7F5EE" fontFamily="monospace" fontSize="14" fontWeight="bold">3,500 LUX</text>
      <text x="350" y="272" fill="#78B83D" fontFamily="monospace" fontSize="11" fontWeight="bold">● OPTIMAL INDIRECT</text>
      <text x="350" y="292" fill="#F7F5EE" fillOpacity="0.6" fontFamily="monospace" fontSize="10">EAST APERTURE 45°</text>
    </svg>
  );
}

function WaterDiagramSvg() {
  return (
    <svg
      viewBox="0 0 540 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto block select-none"
      role="img"
      aria-label="Highland two-inch soil finger hydration test diagram"
    >
      {/* Background Grid */}
      <rect width="540" height="360" fill="#071B14" fillOpacity="0.6" />
      <path d="M40 70h460M40 140h460M40 210h460M40 280h460" stroke="#F7F5EE" strokeOpacity="0.1" strokeDasharray="3 3" />

      {/* Soil Strata Vessel / Pot */}
      <rect x="80" y="50" width="220" height="260" rx="16" fill="#123D2B" fillOpacity="0.75" stroke="#F7F5EE" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Strata 1: 0–2 inch top soil (Check Zone) */}
      <rect x="82" y="52" width="216" height="75" rx="14" fill="#78B83D" fillOpacity="0.2" stroke="#78B83D" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="96" y="78" fill="#F7F5EE" fontFamily="monospace" fontSize="11" fontWeight="bold">0 – 2 IN (5 CM) ZONE</text>
      <text x="96" y="98" fill="#78B83D" fontFamily="monospace" fontSize="10" fontWeight="bold">TEST WITH FINGER HERE</text>

      {/* Strata 2: 2–6 inch active root hydration zone */}
      <rect x="82" y="127" width="216" height="120" fill="#071B14" fillOpacity="0.4" />
      <text x="96" y="152" fill="#F7F5EE" fillOpacity="0.8" fontFamily="monospace" fontSize="11" fontWeight="bold">ROOT MOISTURE ZONE</text>

      {/* Root graphics branching down */}
      <path d="M190 120 Q 180 160 160 210 Q 150 230 140 240" stroke="#78B83D" strokeWidth="2.5" fill="none" />
      <path d="M190 140 Q 210 180 220 220 Q 230 235 240 245" stroke="#78B83D" strokeWidth="2" fill="none" />
      <path d="M180 170 Q 160 190 150 205" stroke="#78B83D" strokeWidth="1.5" fill="none" />

      {/* Strata 3: Bottom pumice aeration layer */}
      <rect x="82" y="247" width="216" height="61" rx="14" fill="#071B14" fillOpacity="0.7" />
      <circle cx="115" cy="275" r="7" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="145" cy="285" r="9" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="180" cy="272" r="8" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="215" cy="284" r="10" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="250" cy="273" r="8" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.3" />
      <text x="96" y="302" fill="#DCE5D3" fontFamily="monospace" fontSize="9" fontWeight="bold">VOLCANIC PUMICE BASE</text>

      {/* 2-Inch Calibrated Depth Callout Gauge */}
      <line x1="45" y1="52" x2="45" y2="127" stroke="#78B83D" strokeWidth="2" />
      <line x1="38" y1="52" x2="52" y2="52" stroke="#78B83D" strokeWidth="2" />
      <line x1="38" y1="127" x2="52" y2="127" stroke="#78B83D" strokeWidth="2" />
      <text x="25" y="95" fill="#78B83D" fontFamily="monospace" fontSize="12" fontWeight="bold" transform="rotate(-90 25 95)">2.0 IN</text>

      {/* Right Moisture Decision Gauge Card */}
      <rect x="330" y="60" width="165" height="240" rx="12" fill="#071B14" stroke="#F7F5EE" strokeWidth="1.5" strokeOpacity="0.3" />
      <rect x="342" y="75" width="141" height="22" rx="4" fill="#F7F5EE" fillOpacity="0.08" />
      <text x="352" y="90" fill="#F7F5EE" fontFamily="monospace" fontSize="10" fontWeight="bold">HYDRATION STATUS</text>

      {/* State 1: Dry */}
      <rect x="342" y="110" width="141" height="50" rx="8" fill="#E5BA69" fillOpacity="0.15" stroke="#E5BA69" strokeWidth="1" />
      <text x="352" y="128" fill="#E5BA69" fontFamily="monospace" fontSize="11" fontWeight="bold">TOP 2&quot; DRY</text>
      <text x="352" y="146" fill="#F7F5EE" fontFamily="monospace" fontSize="10" fontWeight="bold">→ WATER THOROUGHLY</text>

      {/* State 2: Moist */}
      <rect x="342" y="170" width="141" height="50" rx="8" fill="#78B83D" fillOpacity="0.2" stroke="#78B83D" strokeWidth="1.5" />
      <text x="352" y="188" fill="#78B83D" fontFamily="monospace" fontSize="11" fontWeight="bold">TOP 2&quot; MOIST</text>
      <text x="352" y="206" fill="#F7F5EE" fontFamily="monospace" fontSize="10" fontWeight="bold">→ WAIT 3–4 DAYS</text>

      <text x="352" y="255" fill="#F7F5EE" fillOpacity="0.6" fontFamily="monospace" fontSize="10">FREQUENCY: 7–10D</text>
      <text x="352" y="275" fill="#78B83D" fontFamily="monospace" fontSize="10" fontWeight="bold">KIREMT: REDUCE 50%</text>
    </svg>
  );
}

function SoilDiagramSvg() {
  return (
    <svg
      viewBox="0 0 540 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto block select-none"
      role="img"
      aria-label="Highland volcanic pumice and organic compost potting ratio diagram"
    >
      {/* Background Grid */}
      <rect width="540" height="360" fill="#071B14" fillOpacity="0.6" />
      <path d="M40 70h460M40 140h460M40 210h460M40 280h460" stroke="#F7F5EE" strokeOpacity="0.1" strokeDasharray="3 3" />

      {/* Composition Ratio Bar Container */}
      <rect x="70" y="55" width="230" height="250" rx="14" fill="#123D2B" fillOpacity="0.75" stroke="#F7F5EE" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Layer 1: 40% Volcanic Pumice */}
      <rect x="72" y="57" width="226" height="95" rx="12" fill="#DCE5D3" fillOpacity="0.2" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="105" cy="85" r="10" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="145" cy="100" r="14" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="195" cy="80" r="12" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="240" cy="105" r="15" fill="#DCE5D3" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.4" />
      <text x="85" y="135" fill="#DCE5D3" fontFamily="monospace" fontSize="11" fontWeight="bold">40% VOLCANIC PUMICE</text>

      {/* Layer 2: 40% Organic Forest Compost */}
      <rect x="72" y="152" width="226" height="95" fill="#78B83D" fillOpacity="0.15" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.2" />
      <path d="M100 180 q 15 -10 30 0 t 30 0" stroke="#78B83D" strokeWidth="1.5" fill="none" />
      <path d="M180 200 q 15 -10 30 0 t 30 0" stroke="#78B83D" strokeWidth="1.5" fill="none" />
      <text x="85" y="230" fill="#78B83D" fontFamily="monospace" fontSize="11" fontWeight="bold">40% ORGANIC COMPOST</text>

      {/* Layer 3: 20% Highland Loam */}
      <rect x="72" y="247" width="226" height="56" rx="12" fill="#071B14" fillOpacity="0.5" stroke="#F7F5EE" strokeWidth="1" strokeOpacity="0.2" />
      <text x="85" y="285" fill="#F7F5EE" fillOpacity="0.8" fontFamily="monospace" fontSize="11" fontWeight="bold">20% MOUNTAIN LOAM</text>

      {/* Oxygen / Root Aeration Vector */}
      <path d="M315 150 Q 325 105 340 100" stroke="#78B83D" strokeWidth="2" strokeDasharray="4 3" />

      {/* Right Technical Specification Card */}
      <rect x="330" y="55" width="165" height="250" rx="12" fill="#071B14" stroke="#F7F5EE" strokeWidth="1.5" strokeOpacity="0.3" />
      <rect x="342" y="70" width="141" height="22" rx="4" fill="#F7F5EE" fillOpacity="0.08" />
      <text x="350" y="85" fill="#F7F5EE" fontFamily="monospace" fontSize="10" fontWeight="bold">ROOT SPECIFICATION</text>

      <text x="350" y="120" fill="#F7F5EE" fontFamily="monospace" fontSize="13" fontWeight="bold">DRAINAGE RATE</text>
      <text x="350" y="138" fill="#78B83D" fontFamily="monospace" fontSize="11" fontWeight="bold">&lt; 15 SECONDS</text>

      <line x1="342" y1="155" x2="483" y2="155" stroke="#F7F5EE" strokeOpacity="0.2" />

      <text x="350" y="180" fill="#F7F5EE" fontFamily="monospace" fontSize="13" fontWeight="bold">ROOT AERATION</text>
      <text x="350" y="198" fill="#78B83D" fontFamily="monospace" fontSize="11" fontWeight="bold">40% O₂ POCKETS</text>

      <line x1="342" y1="215" x2="483" y2="215" stroke="#F7F5EE" strokeOpacity="0.2" />

      <text x="350" y="240" fill="#F7F5EE" fontFamily="monospace" fontSize="13" fontWeight="bold">REPOT TIMELINE</text>
      <text x="350" y="258" fill="#F7F5EE" fillOpacity="0.75" fontFamily="monospace" fontSize="11" fontWeight="bold">EVERY 12–18 MO</text>
      <text x="350" y="285" fill="#78B83D" fontFamily="monospace" fontSize="9" fontWeight="bold">ZERO CLAY SUFFOCATION</text>
    </svg>
  );
}
