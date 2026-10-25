"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowDown,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Sprout,
  Pause,
  Play,
} from "lucide-react";

export function HeroSection() {
  const { content, lang } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

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

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const whatsappDirectUrl =
    "https://wa.me/251942461641?text=" +
    encodeURIComponent(
      "Hi Evergreen, I'm looking for plants for my home in Addis. Can you help me pick one for my room's light?"
    );

  return (
    <section
      id="top"
      ref={heroRef}
      className={`relative w-full min-h-[92vh] lg:min-h-[94vh] flex flex-col justify-between bg-transparent pt-28 sm:pt-36 pb-12 sm:pb-16 transition-colors duration-300 ${
        isDark ? "text-ivory" : "text-forest"
      }`}
      aria-label="Evergreen Ethiopia Hero"
    >
      {/* Background Cinematic Video: Highland yellow blossoms, stone aperture & sky contrail extended halfway into SplitIntro */}
      <div className="absolute inset-x-0 top-0 h-[145%] z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=2400&q=88"
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
          {/* Status Badge Above Headline */}
          <div className={`hero-stagger inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md mb-6 shadow-sm border ${
            isDark
              ? "bg-forest-deep/85 border-ivory/20 text-ivory/95"
              : "bg-white/90 border-forest/15 text-forest shadow-sm"
          }`}>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-leaf" />
            </span>
            <span className="text-xs font-mono font-medium tracking-wide flex items-center gap-2 leading-4">
              <Sprout className="w-4 h-4 text-leaf shrink-0" />
              <span>{content.hero.badgeAboveHeadline}</span>
            </span>
            <span className={isDark ? "text-ivory/30" : "text-forest/30"}>|</span>
            <span className="text-xs font-sans text-leaf font-semibold leading-4">
              {content.brand.handle}
            </span>
          </div>

          {/* Stately Botanical Headline */}
          <h1 className={`hero-stagger font-heading font-extrabold text-4xl sm:text-5xl md:text-[56px] lg:text-[64px] leading-[44px] sm:leading-[56px] md:leading-[64px] lg:leading-[72px] tracking-tight mb-6 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            <span>{content.hero.headlineMain}</span>
            <span className="font-serif italic font-normal text-leaf tracking-normal px-1">
              {content.hero.headlineItalic}
            </span>
            <span>{content.hero.headlineEnd}</span>
          </h1>

          {/* Subheadline: altitude grown, delivered to door */}
          <p className={`hero-stagger font-sans text-base sm:text-xl leading-6 sm:leading-[28px] font-normal mb-8 max-w-[720px] ${
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
          <div className={`hero-stagger flex items-center gap-2 text-xs font-sans leading-4 mb-8 ${
            isDark ? "text-ivory/80" : "text-forest/80"
          }`}>
            <HeartHandshake className="w-4 h-4 text-leaf shrink-0" />
            <span>{content.hero.microReassurance}</span>
          </div>
        </div>
      </div>

      {/* Specific Social Proof Strip along the base: follower, like, delivery metrics */}
      <div className="relative z-20 w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 pt-4">
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans leading-4 ${
          isDark ? "text-ivory/90" : "text-forest/90"
        }`}>
          <div className={`flex items-center gap-3 p-2 rounded-xl backdrop-blur-sm ${
            isDark
              ? "bg-forest-deep/40 border border-ivory/10"
              : "bg-white/60 border border-forest/10 shadow-xs"
          }`}>
            <div className={`p-2 rounded-lg shrink-0 ${
              isDark ? "bg-ivory/10 text-leaf border border-leaf/20" : "bg-leaf/15 text-leaf border border-leaf/20"
            }`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-mono font-medium">
              13.4K followers · 81.1K likes
            </span>
          </div>

          <div className={`flex items-center gap-3 p-2 rounded-xl backdrop-blur-sm ${
            isDark
              ? "bg-forest-deep/40 border border-ivory/10"
              : "bg-white/60 border border-forest/10 shadow-xs"
          }`}>
            <div className={`p-2 rounded-lg shrink-0 ${
              isDark ? "bg-ivory/10 text-leaf border border-leaf/20" : "bg-leaf/15 text-leaf border border-leaf/20"
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>850+ plants delivered in Addis · 7-day guarantee</span>
          </div>

          <div className={`flex items-center gap-3 p-2 rounded-xl backdrop-blur-sm ${
            isDark
              ? "bg-forest-deep/40 border border-ivory/10"
              : "bg-white/60 border border-forest/10 shadow-xs"
          }`}>
            <div className={`p-2 rounded-lg shrink-0 ${
              isDark ? "bg-ivory/10 text-leaf border border-leaf/20" : "bg-leaf/15 text-leaf border border-leaf/20"
            }`}>
              <Truck className="w-4 h-4" />
            </div>
            <span>Carefully packed delivery in Addis in 24–48h</span>
          </div>
        </div>
      </div>

      {/* Subtle Video Pause/Play Accessibility Pill */}
      <button
        type="button"
        onClick={toggleVideoPlayback}
        aria-label={isPlaying ? "Pause ambient background video" : "Play ambient background video"}
        className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf active:scale-95 border ${
          isDark
            ? "bg-forest-deep/80 border-ivory/20 text-ivory/70 hover:text-ivory hover:bg-forest"
            : "bg-white/90 border-forest/20 text-forest/80 hover:text-forest hover:bg-white"
        }`}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
    </section>
  );
}
