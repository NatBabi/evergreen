"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowDown,
  MessageCircle,
  HeartHandshake,
} from "lucide-react";

export function HeroSection() {
  const { content, lang } = useLanguage();
  const { isDark } = useTheme();
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".hero-stagger", { opacity: 1, y: 0 });
        return;
      }

      gsap.from(".hero-stagger", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.15,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [lang]);

  const whatsappDirectUrl =
    "https://wa.me/251942461641?text=" +
    encodeURIComponent(
      "Hi Evergreen, I'm looking for plants for my home in Addis. Can you help me pick one for my room's light?"
    );

  return (
    <section
      id="top"
      ref={heroRef}
      className={`relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-center bg-transparent pt-28 sm:pt-36 pb-16 sm:pb-24 transition-colors duration-300 ${
        isDark ? "text-ivory" : "text-forest"
      }`}
      aria-label="Evergreen Ethiopia Hero"
    >
      {/* Background Cinematic Video: Highland yellow blossoms, stone aperture & sky contrail extended halfway into SplitIntro */}
      <div className="absolute inset-x-0 top-0 h-[145%] z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1600&q=75"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-[1.01]"
        >
          <source src="/video/natural_warm_image.mp4" type="video/mp4" />
        </video>

        {/* Sophisticated botanical atmosphere gradient:
            Dark Mode: Untouched deep highland forest vignette (#071B14)
            Light Mode: Dimmer white / muted warm ivory veil that gently tones down the bright video and smoothly melts into #F7F5EE
        */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? `
                linear-gradient(90deg, rgba(7, 27, 20, 0.88) 0%, rgba(7, 27, 20, 0.72) 48%, rgba(7, 27, 20, 0.38) 78%, rgba(7, 27, 20, 0.60) 100%),
                linear-gradient(180deg, rgba(7, 27, 20, 0.65) 0%, rgba(7, 27, 20, 0.15) 20%, rgba(7, 27, 20, 0.40) 55%, rgba(7, 27, 20, 0.70) 70%, rgba(7, 27, 20, 0.90) 85%, #071B14 100%),
                radial-gradient(circle at 75% 25%, rgba(250, 204, 21, 0.16) 0%, transparent 60%)
              `
              : `
                linear-gradient(90deg, rgba(247, 245, 238, 0.88) 0%, rgba(247, 245, 238, 0.72) 48%, rgba(247, 245, 238, 0.35) 78%, rgba(247, 245, 238, 0.55) 100%),
                linear-gradient(180deg, rgba(235, 231, 222, 0.55) 0%, rgba(240, 237, 228, 0.40) 20%, rgba(247, 245, 238, 0.55) 55%, rgba(247, 245, 238, 0.82) 75%, #F7F5EE 100%),
                radial-gradient(circle at 75% 25%, rgba(250, 204, 21, 0.12) 0%, transparent 60%)
              `,
          }}
        />
      </div>

      {/* Main Hero Content - Vertically centered in viewport */}
      <div className="relative z-20 w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 my-auto">
        <div className="max-w-[820px] text-left">
          {/* Stately Botanical Headline */}
          <h1 className={`hero-stagger font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[1.04] mb-6 sm:mb-8 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{content.hero.headlineMain}</span>
            <span className="font-serif italic font-normal text-leaf tracking-normal px-1">
              {content.hero.headlineItalic}
            </span>
            <span>{content.hero.headlineEnd}</span>
          </h1>

          {/* Subheadline: altitude grown, delivered to door */}
          <p className={`hero-stagger font-sans text-base sm:text-xl leading-relaxed font-normal mb-8 sm:mb-10 max-w-[680px] ${
            isDark ? "text-ivory/90" : "text-forest/85"
          }`}>
            {content.hero.subheadline}
          </p>

          {/* Primary Action CTAs - Larger balanced pill buttons */}
          <div className="hero-stagger flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
            <a
              href="#plants"
              className="px-8 sm:px-9 py-4 rounded-full bg-leaf text-ivory font-semibold text-base sm:text-lg leading-6 tracking-wide hover:bg-leaf/90 transition-all duration-200 shadow-lg flex items-center gap-2 group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[52px]"
            >
              <span>{content.hero.primaryCta}</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </a>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 sm:px-9 py-4 rounded-full backdrop-blur-md font-semibold text-base sm:text-lg leading-6 tracking-wide transition-all duration-200 flex items-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[52px] border ${
                isDark
                  ? "bg-ivory/12 hover:bg-ivory/20 text-ivory border-ivory/25"
                  : "bg-white/90 hover:bg-white text-forest border-forest/15 shadow-sm"
              }`}
            >
              <MessageCircle className="w-5 h-5 text-leaf" />
              <span>{content.hero.secondaryCta}</span>
            </a>
          </div>

          {/* Micro-reassurance directly under the CTA */}
          <div className={`hero-stagger flex items-center gap-2 text-xs font-sans leading-4 ${
            isDark ? "text-ivory/80" : "text-forest/80"
          }`}>
            <HeartHandshake className="w-4 h-4 text-leaf shrink-0" />
            <span>{content.hero.microReassurance}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
