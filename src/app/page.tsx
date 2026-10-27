"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
import { FloatingNav } from "@/components/FloatingNav";
import { HeroSection } from "@/components/HeroSection";
import { SplitIntro } from "@/components/SplitIntro";
import { PlantFinderSection } from "@/components/PlantFinderSection";
import { CareAccordions } from "@/components/CareAccordions";
import { FoliageParallaxBand } from "@/components/FoliageParallaxBand";
import { FourStepsProcess } from "@/components/FourStepsProcess";
import { ThreePathsCards } from "@/components/ThreePathsCards";
import { TikTokAudiencePanel } from "@/components/TikTokAudiencePanel";
import { FAQSection } from "@/components/FAQSection";
import { WordmarkFooter } from "@/components/WordmarkFooter";
import { StickyMobileBar } from "@/components/StickyMobileBar";

const InquirySheet = dynamic(
  () => import("@/components/InquirySheet").then((mod) => mod.InquirySheet),
  { ssr: false }
);

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div className={`relative min-h-screen flex flex-col selection:bg-leaf selection:text-ivory transition-colors duration-300 ${
      isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
    }`}>

      {/* Section 1: Floating Nav Island (Transparent on Hero, Frosted on scroll) */}
      <FloatingNav />

      <main className="flex-1 w-full flex flex-col">
        {/* Continuous Highland Hero Atmosphere extending into SplitIntro */}
        <div className={`relative w-full overflow-hidden transition-colors duration-300 ${
          isDark ? "bg-forest-deep" : "bg-ivory"
        }`}>
          {/* Section 2: Full-bleed Hero with drifting leaves & bio support line */}
          <HeroSection />

          {/* Section 3: Meet Your Green Companion (Waveyu Split Intro translation) */}
          <SplitIntro />
        </div>

        {/* Sections 4 & 5: Find a plant that fits you (5 bouncy chips) & Plants people ask for (8 Star Plants) */}
        <PlantFinderSection />

        {/* Section 6: Care in Three Steps (Light, Water, Soil Accordions) */}
        <CareAccordions />

        {/* Continuous Tropical Foliage Canopy across "Your spot is waiting" & "Four Steps" */}
        <div className={`relative w-full overflow-hidden transition-colors duration-300 ${
          isDark ? "bg-forest-deep" : "bg-ivory"
        }`}>
          {/* Background Continuous Tropical Canopy Photo */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=75"
              alt="Lush green tropical leaves canopy in natural light"
              fill
              loading="lazy"
              quality={75}
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
            {/* Seamless Canopy Gradient Overlay:
                In Dark mode: deep forest atmospheric canopy fading into #071B14
                In Light mode: airy ivory mist fading into #F7F5EE
            */}
            <div
              className="absolute inset-0 z-10 transition-all duration-300"
              style={{
                background: isDark
                  ? "linear-gradient(180deg, #071B14 0%, rgba(7, 27, 20, 0.70) 15%, rgba(7, 27, 20, 0.76) 50%, rgba(7, 27, 20, 0.88) 85%, #071B14 100%)"
                  : "linear-gradient(180deg, #F7F5EE 0%, rgba(247, 245, 238, 0.35) 15%, rgba(247, 245, 238, 0.42) 50%, rgba(247, 245, 238, 0.70) 85%, #F7F5EE 100%)",
              }}
            />
          </div>

          <div className="relative z-10">
            {/* Section 7: Foliage Parallax Band ("Your spot is waiting. Let's fill it.") */}
            <FoliageParallaxBand />

            {/* Section 8: Four Steps (Ask, Confirm, Deliver, Grow) */}
            <FourStepsProcess />
          </div>
        </div>

        {/* Section 9: Three Paths (Shop Plants, Plant Care, Projects - highlighted in Forest with Leaf button) */}
        <ThreePathsCards />

        {/* Section 10: From TikTok (13.4K followers, 81.3K likes, 4 real video cards with play counts) */}
        <TikTokAudiencePanel />

        {/* Section 11: FAQ (5 comment-driven questions with confirmation notes) */}
        <FAQSection />
      </main>

      {/* Section 12: Wordmark Footer (4 columns, verified contacts, and oversized 'evergreen' wordmark) */}
      <WordmarkFooter />

      {/* Interactive Bottom Sheet on mobile / centered dialog on desktop for any Ask button */}
      <InquirySheet />

      {/* Sticky Mobile Contact Bar (appears after scrolling past hero) */}
      <StickyMobileBar />
    </div>
  );
}
