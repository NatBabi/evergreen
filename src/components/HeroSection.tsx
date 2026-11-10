"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowDown,
  MessageCircle,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Truck,
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
      className={`relative w-full min-h-screen flex flex-col justify-between bg-transparent pt-32 sm:pt-40 pb-8 sm:pb-12 transition-colors duration-300 ${
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

      {/* Main Hero Content */}
      <div className="relative z-20 w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="max-w-[720px]">
          {/* Stately Botanical Headline */}
          <h1 className={`hero-stagger font-heading font-extrabold text-4xl sm:text-5xl md:text-[56px] lg:text-[64px] leading-[44px] sm:leading-[56px] md:leading-[64px] lg:leading-[72px] tracking-tight mb-10 sm:mb-14 lg:mb-16 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{content.hero.headlineMain}</span>
            <span className="font-serif italic font-normal text-leaf tracking-normal px-1">
              {content.hero.headlineItalic}
            </span>
            <span>{content.hero.headlineEnd}</span>
          </h1>

          {/* Subheadline: altitude grown, delivered to door */}
          <p className={`hero-stagger font-sans text-base sm:text-xl leading-relaxed sm:leading-[32px] font-normal mb-10 sm:mb-12 max-w-[720px] ${
            isDark ? "text-ivory/90" : "text-forest/85"
          }`}>
            {content.hero.subheadline}
          </p>

          {/* Primary Action CTAs - streamlined to 2 high-converting actions */}
          <div className="hero-stagger flex flex-wrap items-center gap-4 mb-4">
            <a
              href="#plants"
              className="px-6 py-3 rounded-full bg-leaf text-ivory font-semibold text-base leading-6 tracking-wide hover:bg-leaf/90 transition-all duration-200 shadow-lg flex items-center gap-2 group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[48px]"
            >
              <span>{content.hero.primaryCta}</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </a>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-full backdrop-blur-md font-semibold text-base leading-6 tracking-wide transition-all duration-200 flex items-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[48px] border ${
                isDark
                  ? "bg-ivory/12 hover:bg-ivory/20 text-ivory border-ivory/25"
                  : "bg-white/90 hover:bg-white text-forest border-forest/15 shadow-sm"
              }`}
            >
              <MessageCircle className="w-4 h-4 text-leaf" />
              <span>{content.hero.secondaryCta}</span>
            </a>
          </div>

          {/* Micro-reassurance directly under the CTA */}
          <div className={`hero-stagger flex items-center gap-2 text-xs font-sans leading-4 mb-10 sm:mb-12 ${
            isDark ? "text-ivory/80" : "text-forest/80"
          }`}>
            <HeartHandshake className="w-4 h-4 text-leaf shrink-0" />
            <span>{content.hero.microReassurance}</span>
          </div>
        </div>
      </div>

      {/* Social Proof Stats along the base: matching requested layered-circle + accent-bar style in theme colors */}
      <div className="hero-stagger relative z-20 w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-20 pb-4 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {/* Stat 1: Followers & Likes */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center -space-x-3">
              <span className={`w-8 h-8 rounded-full border ${isDark ? "bg-leaf/20 border-leaf/30" : "bg-leaf/15 border-leaf/30"}`} />
              <span className={`w-8 h-8 rounded-full border ${isDark ? "bg-leaf/40 border-leaf/40" : "bg-leaf/30 border-leaf/40"}`} />
              <span className="w-8 h-8 rounded-full bg-leaf text-ivory flex items-center justify-center shadow-sm z-10">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            <div className="border-l-[3px] border-leaf pl-3 py-0.5">
              <div className={`font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-none ${isDark ? "text-ivory" : "text-forest"}`}>
                13.4K
              </div>
              <div className={`text-xs font-sans mt-1.5 font-medium leading-tight ${isDark ? "text-ivory/70" : "text-forest/70"}`}>
                {lang === "am" ? "የቲክቶክ ማህበረሰብ · 81K+ መውደዶች" : "TikTok community · 81K+ likes"}
              </div>
            </div>
          </div>

          {/* Stat 2: Delivered */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center -space-x-3">
              <span className={`w-8 h-8 rounded-full border ${isDark ? "bg-leaf/20 border-leaf/30" : "bg-leaf/15 border-leaf/30"}`} />
              <span className={`w-8 h-8 rounded-full border ${isDark ? "bg-leaf/40 border-leaf/40" : "bg-leaf/30 border-leaf/40"}`} />
              <span className="w-8 h-8 rounded-full bg-leaf text-ivory flex items-center justify-center shadow-sm z-10">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="border-l-[3px] border-leaf pl-3 py-0.5">
              <div className={`font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-none ${isDark ? "text-ivory" : "text-forest"}`}>
                850+
              </div>
              <div className={`text-xs font-sans mt-1.5 font-medium leading-tight ${isDark ? "text-ivory/70" : "text-forest/70"}`}>
                {lang === "am" ? "የተላመዱ የተረከቡ ተክሎች" : "Acclimatized plants delivered"}
              </div>
            </div>
          </div>

          {/* Stat 3: Speed */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center -space-x-3">
              <span className={`w-8 h-8 rounded-full border ${isDark ? "bg-leaf/20 border-leaf/30" : "bg-leaf/15 border-leaf/30"}`} />
              <span className={`w-8 h-8 rounded-full border ${isDark ? "bg-leaf/40 border-leaf/40" : "bg-leaf/30 border-leaf/40"}`} />
              <span className="w-8 h-8 rounded-full bg-leaf text-ivory flex items-center justify-center shadow-sm z-10">
                <Truck className="w-4 h-4" />
              </span>
            </div>
            <div className="border-l-[3px] border-leaf pl-3 py-0.5">
              <div className={`font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-none ${isDark ? "text-ivory" : "text-forest"}`}>
                24–48h
              </div>
              <div className={`text-xs font-sans mt-1.5 font-medium leading-tight ${isDark ? "text-ivory/70" : "text-forest/70"}`}>
                {lang === "am" ? "በአዲስ አበባ በጥንቃቄ ማድረስ" : "Careful doorstep delivery in Addis"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
