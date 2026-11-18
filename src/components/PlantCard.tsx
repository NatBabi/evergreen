"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import {
  Leaf,
  ArrowRight,
  MessageCircle,
  Truck,
  Flame,
  Check,
} from "lucide-react";
import { PlantItem, getWhatsAppPlantUrl } from "@/data/content";

export interface PlantCardProps {
  plant: PlantItem;
  priorityImage?: boolean;
}

export function PlantCard({ plant, priorityImage = false }: PlantCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isDark } = useTheme();

  const whatsAppUrl = getWhatsAppPlantUrl(
    plant.commonName,
    "Plant + pot + care guide bundle",
    plant.chips?.light || plant.light || "bright indirect"
  );

  const lifestyleImage = plant.gallery && plant.gallery.length > 1 ? plant.gallery[1] : null;

  return (
    <article
      className={`group relative rounded-[14px] p-[18px] border transition-all duration-300 flex flex-col justify-between ${
        isDark
          ? "bg-forest/50 border-ivory/15 text-ivory shadow-md hover:shadow-xl hover:border-leaf/40 hover:bg-forest/70"
          : "bg-white border-[#e2e9e4] text-[#333333] shadow-chaka-card hover:shadow-lg hover:border-[#198754]/40"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* 1. In-Context Imagery */}
        <Link
          href={`/plants/${plant.slug}`}
          className={`block relative w-full h-60 rounded-[10px] overflow-hidden mb-4 focus:outline-none focus:ring-2 focus:ring-[#198754] border ${
            isDark ? "bg-forest-deep/60 border-ivory/10" : "bg-[#f4f7f4] border-[#e2e9e4]"
          }`}
          aria-label={`View full details for ${plant.commonName}`}
        >
          {/* Primary Specimen Photo */}
          <Image
            src={plant.image}
            alt={plant.imageAlt}
            fill
            priority={priorityImage}
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-center transition-[transform,opacity] duration-500 ease-out transform-gpu will-change-[transform,opacity] ${
              lifestyleImage && isHovered
                ? "opacity-0 scale-105"
                : "opacity-100 group-hover:scale-105"
            }`}
          />

          {/* Secondary In-Context Lifestyle Photo */}
          {lifestyleImage && (
            <Image
              src={lifestyleImage}
              alt={`${plant.commonName} in Addis Ababa home context`}
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover object-center transition-[transform,opacity] duration-500 ease-out transform-gpu will-change-[transform,opacity] ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}

          {/* Top Status Anchor (Chaka Badge: #e8f7ef background, #157347 text, 20px corners) */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[20px] text-[11px] font-bold leading-4 shadow-sm ${
              isDark
                ? "bg-forest-deep/90 text-[#78B83D] border border-ivory/20"
                : "bg-[#e8f7ef] text-[#157347] border border-[#157347]/20"
            }`}>
              <Leaf className="w-3 h-3 text-[#157347] dark:text-[#78B83D]" />
              <span>{plant.statusBadge}</span>
            </span>
          </div>

          {/* Delivery Proof (Bottom-Left) */}
          <div className={`absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-[20px] backdrop-blur-md text-[11px] font-medium leading-4 shadow-sm flex items-center gap-1.5 border ${
            isDark
              ? "bg-forest-deep/90 text-ivory border-ivory/20"
              : "bg-white/95 text-[#333333] border-[#e2e9e4]"
          }`}>
            <Truck className="w-3.5 h-3.5 text-[#198754] shrink-0" />
            <span>24–48h Delivery</span>
          </div>
        </Link>

        {/* 2. Specific Social Proof */}
        <div className={`flex items-center gap-2 mb-2 text-xs leading-4 flex-wrap ${
          isDark ? "text-ivory/70" : "text-[#78837c]"
        }`}>
          <span className={`font-bold ${isDark ? "text-ivory" : "text-[#333333]"}`}>{plant.rating}</span>
          <span className={isDark ? "text-ivory/60" : "text-[#a5afa8]"}>({plant.reviewsCount})</span>
          <span className={isDark ? "text-ivory/30" : "text-[#e2e9e4]"}>·</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#198754] dark:text-[#78B83D]">
            <Flame className="w-3 h-3 text-[#198754] dark:text-[#78B83D] shrink-0" />
            <span>{plant.deliveryMetric}</span>
          </span>
        </div>

        {/* 3. Name & Botanical Hierarchy */}
        <div className="mb-3">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <Link
              href={`/plants/${plant.slug}`}
              className={`font-heading font-extrabold text-xl tracking-tight leading-7 transition-colors hover:text-[#198754] ${
                isDark ? "text-ivory" : "text-[#333333]"
              }`}
            >
              {plant.commonName}
            </Link>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-[20px] shrink-0 border leading-4 ${
              isDark
                ? "bg-ivory/10 text-ivory border-ivory/15"
                : "bg-[#f4f7f4] text-[#157347] border-[#e2e9e4]"
            }`}>
              {plant.amharicName}
            </span>
          </div>

          <p className={`font-serif italic text-xs mt-1 leading-4 ${
            isDark ? "text-ivory/60" : "text-[#78837c]"
          }`}>
            {plant.botanicalName}
          </p>
        </div>

        {/* 4. Value & Price Clarity */}
        <div className={`flex items-baseline justify-between gap-2 py-2 mb-3 border-y ${
          isDark ? "border-ivory/10" : "border-[#e2e9e4]"
        }`}>
          <div>
            <span className={`text-[11px] block leading-4 uppercase tracking-wider ${
              isDark ? "text-ivory/60" : "text-[#a5afa8]"
            }`}>Plant only</span>
            <span className={`font-heading font-extrabold text-xl tracking-tight leading-7 ${
              isDark ? "text-[#78B83D]" : "text-[#198754]"
            }`}>
              {plant.bundleCardA?.price || plant.price || `${plant.priceETB} ETB`}
            </span>
          </div>
          <div className="text-right">
            <span className={`text-[11px] block leading-4 uppercase tracking-wider ${
              isDark ? "text-ivory/60" : "text-[#a5afa8]"
            }`}>Pot + Guide</span>
            <span className="text-xs font-semibold text-[#198754] dark:text-[#78B83D] leading-4">
              {plant.bundleCardB?.price || "from 1,350 birr"}
            </span>
          </div>
        </div>

        {/* 5. Acclimatized Proof */}
        <div className={`flex items-center gap-2 mb-4 text-xs leading-4 ${
          isDark ? "text-ivory/70" : "text-[#78837c]"
        }`}>
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#198754] dark:text-[#78B83D] shrink-0" />
            <span>Addis Acclimatized (2,350m)</span>
          </span>
        </div>
      </div>

      {/* 6. Direct-Action Quick CTA Buttons (Chaka Button Recipes) */}
      <div className={`pt-3 border-t flex flex-col gap-2 ${
        isDark ? "border-ivory/10" : "border-[#e2e9e4]"
      }`}>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-[10px] bg-[#198754] hover:bg-[#146c43] text-white font-bold text-[13px] tracking-wide leading-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-chaka-accent hover:shadow-chaka-accent-hover active:scale-95 min-h-[42px] focus-visible:outline-none focus-chaka-ring"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>Inquire Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        <Link
          href={`/plants/${plant.slug}`}
          className={`w-full py-2 px-4 rounded-[8px] font-bold text-[13px] leading-4 transition-colors flex items-center justify-center gap-1 min-h-[38px] focus-visible:outline-none focus-chaka-ring text-center border ${
            isDark
              ? "bg-ivory/10 hover:bg-ivory/20 text-ivory border-ivory/15"
              : "bg-white hover:bg-[#e8f6ee] text-[#198754] border-[#e2e9e4] hover:text-[#157347]"
          }`}
        >
          <span>Plant Details</span>
        </Link>
      </div>
    </article>
  );
  );
}
