"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  Play,
  ArrowUpRight,
  Heart,
  Users,
  Video,
  MessageCircle,
  Star,
  Check,
} from "lucide-react";
import { getWhatsAppPlantUrl } from "@/data/content";

export function TikTokAudiencePanel() {
  const { content } = useLanguage();
  const { isDark } = useTheme();
  const { tiktokPanel, brand, customerStories } = content;

  return (
    <section
      id="tiktok"
      className={`relative w-full py-12 md:py-24 px-4 sm:px-8 lg:px-12 transition-colors duration-300 ${
        isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
      }`}
      aria-label="Real plants in real Addis homes and TikTok audience evidence"
    >
      <div className="max-w-[1128px] mx-auto">
        {/* Header + Stats Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-medium tracking-wide mb-3 border leading-4 ${
              isDark
                ? "bg-forest/60 border-ivory/15 text-ivory"
                : "bg-forest/5 border-forest/15 text-forest"
            }`}>
              <Video className="w-4 h-4 text-leaf" />
              <span>{tiktokPanel.eyebrow}</span>
            </div>

            <h2 className={`font-heading font-extrabold text-[32px] sm:text-4xl md:text-5xl tracking-tight leading-[40px] sm:leading-[44px] md:leading-[56px] ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              <span>Real plants in real </span>
              <span className="font-serif italic font-normal text-leaf px-1">
                Addis homes
              </span>
            </h2>

            <p className={`font-sans text-base mt-3 max-w-[720px] leading-6 ${
              isDark ? "text-ivory/75" : "text-forest/75"
            }`}>
              {tiktokPanel.subtitle}
            </p>
          </div>

          {/* Scraped TikTok Stats Strip */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className={`px-4 py-3 rounded-2xl backdrop-blur-md border flex items-center gap-2 min-h-[48px] ${
              isDark ? "bg-forest/40 border-ivory/12 text-ivory" : "bg-white/80 border-forest/12 text-forest shadow-sm"
            }`}>
              <Users className="w-4 h-4 text-leaf" />
              <span className={`font-mono text-xs sm:text-base font-semibold leading-4 sm:leading-6 ${
                isDark ? "text-ivory" : "text-forest"
              }`}>
                {tiktokPanel.statFollowers}
              </span>
            </div>
            <div className={`px-4 py-3 rounded-2xl backdrop-blur-md border flex items-center gap-2 min-h-[48px] ${
              isDark ? "bg-forest/40 border-ivory/12 text-ivory" : "bg-white/80 border-forest/12 text-forest shadow-sm"
            }`}>
              <Heart className="w-4 h-4 text-leaf" />
              <span className={`font-mono text-xs sm:text-base font-semibold leading-4 sm:leading-6 ${
                isDark ? "text-ivory" : "text-forest"
              }`}>
                {tiktokPanel.statLikes}
              </span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-forest/40 backdrop-blur-md border border-ivory/12 flex items-center gap-2 min-h-[48px]">
              <Video className="w-4 h-4 text-leaf" />
              <span className="font-mono text-xs sm:text-base font-semibold text-ivory leading-4 sm:leading-6">
                {tiktokPanel.statVideos}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Video Cards Grid with "Want this plant? Ask on WhatsApp" CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiktokPanel.videos.map((video) => {
            const whatsAppVideoUrl = getWhatsAppPlantUrl(
              video.title,
              "Featured on TikTok video",
              "bright indirect"
            );

            return (
              <div
                key={video.id}
                className="group relative rounded-3xl overflow-hidden bg-forest-deep flex flex-col justify-between border border-ivory/15 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Media Click through to TikTok */}
                <a
                  href={video.verifiedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-80 block overflow-hidden focus:outline-none focus:ring-2 focus:ring-leaf"
                >
                  <Image
                    src={video.coverImage}
                    alt={video.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Atmospheric Gradient */}
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7, 27, 20, 0.20) 0%, rgba(7, 27, 20, 0.75) 60%, rgba(7, 27, 20, 0.98) 100%)",
                    }}
                  />

                  {/* Play & Views Badge */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-forest-deep/85 backdrop-blur-md text-ivory text-xs font-mono font-semibold flex items-center gap-2 border border-white/10 shadow-sm leading-4">
                    <Play className="w-3 h-3 text-leaf fill-leaf" />
                    <span>{video.plays}</span>
                  </div>

                  {/* Verified TikTok Handle */}
                  <div className="absolute top-4 left-4 z-20 text-xs font-mono text-ivory/90 bg-forest/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 leading-4">
                    {brand.handle}
                  </div>

                  {/* Title & Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="font-heading font-bold text-xl text-ivory tracking-tight mb-1 group-hover:text-leaf transition-colors leading-7">
                      {video.title}
                    </h3>
                    <p className="font-sans text-xs text-ivory/80 line-clamp-2 leading-4 mb-2">
                      {video.captionExcerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-leaf font-semibold leading-4">
                      <span>Watch video tutorial</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>

                {/* Direct Conversion CTA: "Want this plant? Ask on WhatsApp" */}
                <div className={`p-3 border-t ${
                  isDark ? "bg-forest-deep border-white/10" : "bg-white border-forest/10"
                }`}>
                  <a
                    href={whatsAppVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full bg-leaf text-ivory font-semibold text-xs tracking-wide leading-4 hover:bg-leaf/90 transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Want this plant? Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Plants in Real Addis Homes: Customer Testimonials Infinite Marquee (Image 2 style) */}
        <div className="mb-16">
          {/* Header Row: Title & Subtitle (left) + Community Trust Badge (right) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div>
              <span className={`text-xs font-mono font-medium uppercase tracking-widest block mb-1 leading-4 ${
                isDark ? "text-ivory/60" : "text-forest/60"
              }`}>
                Addis Ababa Plant Community
              </span>
              <h3 className={`font-heading font-bold text-2xl sm:text-[32px] leading-8 sm:leading-[40px] ${
                isDark ? "text-ivory" : "text-forest"
              }`}>
                What Ethiopian plant parents say
              </h3>
              <p className={`font-sans text-xs sm:text-base mt-2 leading-4 sm:leading-6 ${
                isDark ? "text-ivory/75" : "text-forest/75"
              }`}>
                Real homes in Bole Atlas, Kazanchis, Sarbet, Old Airport, and CMC.
              </p>
            </div>

            {/* Community Rating Trust Badge (TrustScore inspired by Image 2) */}
            <div className="flex flex-col sm:items-end gap-1 shrink-0">
              <div className="flex items-center gap-2">
                <span className={`font-sans font-bold text-base leading-6 flex items-center gap-2 ${
                  isDark ? "text-ivory" : "text-forest"
                }`}>
                  <Star className="w-5 h-5 text-leaf fill-leaf" />
                  <span>Community Verified</span>
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded bg-leaf text-forest-deep flex items-center justify-center font-bold text-xs"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <span className={`text-xs font-mono leading-4 ${
                isDark ? "text-ivory/70" : "text-forest/70"
              }`}>
                TrustScore 4.9 · 150+ happy homes
              </span>
            </div>
          </div>

          {/* Infinite Marquee Scrolling Track */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] py-2">
            <div className="animate-marquee flex gap-6">
              {[...customerStories, ...customerStories].map((story, sIdx) => {
                const avatarColors = [
                  "#7C3AED", // Purple (like Alex M.)
                  "#2563EB", // Blue
                  "#0D9488", // Teal (like Daniel K.)
                  "#D97706", // Amber
                  "#059669", // Emerald
                  "#E11D48", // Rose
                ];
                const avatarBg = avatarColors[sIdx % avatarColors.length];
                const initial = story.name.charAt(0);

                return (
                  <div
                    key={sIdx}
                    className={`w-[320px] sm:w-[380px] shrink-0 rounded-3xl backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all ${
                      isDark
                        ? "bg-forest/50 border border-ivory/15 text-ivory hover:border-leaf/50 hover:bg-forest/70"
                        : "bg-white/90 border border-forest/10 text-forest shadow-md hover:border-leaf/50 hover:bg-white"
                    }`}
                  >
                    <div>
                      {/* Top Row: Circular Quote Plinth + 5 Stars */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-serif font-black text-xl leading-none ${
                          isDark
                            ? "bg-forest-deep/80 border-ivory/15 text-ivory/70"
                            : "bg-forest/5 border-forest/15 text-forest/70"
                        }`}>
                          &ldquo;
                        </div>

                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: story.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Customer Testimonial Quote */}
                      <p className={`font-sans text-base leading-6 mb-6 font-normal ${
                        isDark ? "text-ivory/90" : "text-forest/90"
                      }`}>
                        &ldquo;{story.quote}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Row: Avatar Circle + Name with Verified Checkmark + Neighborhood */}
                    <div className={`flex items-center gap-3 pt-4 border-t ${
                      isDark ? "border-ivory/10" : "border-forest/10"
                    }`}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base text-white shadow-sm shrink-0"
                        style={{ backgroundColor: avatarBg }}
                      >
                        {initial}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-base leading-6 truncate ${
                            isDark ? "text-ivory" : "text-forest"
                          }`}>
                            {story.name}
                          </span>
                          <span
                            className="w-4 h-4 rounded-full bg-leaf text-forest-deep flex items-center justify-center shrink-0"
                            aria-label="Verified Customer"
                            title="Verified Customer"
                          >
                            <Check className="w-3 h-3 text-forest-deep stroke-[3]" />
                          </span>
                        </div>
                        <span className={`text-xs font-sans leading-4 truncate ${
                          isDark ? "text-ivory/60" : "text-forest/60"
                        }`}>
                          {story.neighborhood} · {story.plantName}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Audience Insight Banner */}
        <div className={`rounded-3xl p-6 sm:p-8 backdrop-blur-md border flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark
            ? "bg-forest/50 border-ivory/15 text-ivory"
            : "bg-white/90 border-forest/15 text-forest shadow-md"
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full border text-leaf shrink-0 mt-1 ${
              isDark ? "bg-forest-deep border-ivory/15" : "bg-forest/5 border-forest/15"
            }`}>
              <MessageCircle className="w-4 h-4" />
            </div>
            <p className={`font-sans text-xs sm:text-base leading-4 sm:leading-6 max-w-[720px] ${
              isDark ? "text-ivory/85" : "text-forest/85"
            }`}>
              {tiktokPanel.commentInsight}
            </p>
          </div>

          <a
            href={brand.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-full bg-leaf text-ivory font-semibold text-base leading-6 hover:bg-leaf/90 transition-all shadow-sm flex items-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[48px]"
          >
            <span>{tiktokPanel.visitTiktokBtn}</span>
            <ArrowUpRight className="w-4 h-4 text-ivory" />
          </a>
        </div>
      </div>
    </section>
  );
}
