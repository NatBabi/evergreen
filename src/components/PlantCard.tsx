"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import {
  Star,
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
      className={`group relative backdrop-blur-md rounded-3xl p-4 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${
        isDark
          ? "bg-forest/40 border-ivory/12 text-ivory shadow-md hover:shadow-2xl hover:border-leaf/40 hover:bg-forest/60"
          : "bg-white/90 border-forest/10 text-forest shadow-sm hover:shadow-xl hover:border-forest/30 hover:bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* 1. In-Context Imagery (Dual-State Crossfade on Hover: Specimen -> Lifestyle Context) */}
        <Link
          href={`/plants/${plant.slug}`}
          className={`block relative w-full h-60 rounded-2xl overflow-hidden mb-4 focus:outline-none focus:ring-2 focus:ring-leaf border ${
            isDark ? "bg-forest-deep/60 border-ivory/10" : "bg-forest/5 border-forest/10"
          }`}
          aria-label={`View full details for ${plant.commonName}`}
        >
          {/* Primary Specimen Photo */}
          <Image
            src={plant.image}
            alt={plant.imageAlt}
            fill
            priority={priorityImage}
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-500 ease-out ${
              lifestyleImage && isHovered
                ? "opacity-0 scale-105"
                : "opacity-100 group-hover:scale-105"
            }`}
          />

          {/* Secondary In-Context Lifestyle Photo (Zero-click imagination) */}
          {lifestyleImage && (
            <Image
              src={lifestyleImage}
              alt={`${plant.commonName} in Addis Ababa home context`}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover object-center transition-all duration-500 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}

          {/* Top Status Anchor (Halo Effect) - Positioned with zero collision risk */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md text-xs font-semibold leading-4 shadow-md border ${
              isDark
                ? "bg-forest-deep/90 text-ivory border-ivory/20"
                : "bg-white/95 text-forest border-forest/15 shadow-sm"
            }`}>
              <Star className="w-3 h-3 text-leaf fill-leaf" />
              <span>{plant.statusBadge}</span>
            </span>
          </div>

          {/* Delivery & Acclimatized Proof (Bottom-Left) */}
          <div className={`absolute bottom-3 left-3 z-10 px-3 py-1 rounded-full backdrop-blur-md text-xs font-mono font-medium leading-4 shadow-md flex items-center gap-2 border ${
            isDark
              ? "bg-forest-deep/90 text-ivory border-ivory/20"
              : "bg-white/95 text-forest border-forest/15 shadow-sm"
          }`}>
            <Truck className="w-4 h-4 text-leaf shrink-0" />
            <span>24–48h Addis Delivery</span>
          </div>
        </Link>

        {/* 2. Specific Social Proof & Velocity Strip (Authenticity Anchor) */}
        <div className={`flex items-center gap-2 mb-2 text-xs font-sans leading-4 flex-wrap ${
          isDark ? "text-ivory/70" : "text-forest/70"
        }`}>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3 h-3 fill-current" />
            <span className={`font-bold ${isDark ? "text-ivory" : "text-forest"}`}>{plant.rating}</span>
          </div>
          <span className={`font-mono ${isDark ? "text-ivory/60" : "text-forest/60"}`}>({plant.reviewsCount})</span>
          <span className={isDark ? "text-ivory/30" : "text-forest/30"}>·</span>
          <span className="inline-flex items-center gap-1 font-semibold text-leaf">
            <Flame className="w-3 h-3 text-leaf shrink-0" />
            <span>{plant.deliveryMetric}</span>
          </span>
        </div>

        {/* 3. Name & Botanical Hierarchy (Zero Amharic overflow) */}
        <div className="mb-3">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <Link
              href={`/plants/${plant.slug}`}
              className={`font-heading font-extrabold text-xl tracking-tight leading-7 hover:text-leaf transition-colors ${
                isDark ? "text-ivory" : "text-forest"
              }`}
            >
              {plant.commonName}
            </Link>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 border leading-4 ${
              isDark
                ? "bg-ivory/10 text-ivory border-ivory/15"
                : "bg-forest/5 text-forest border-forest/10"
            }`}>
              {plant.amharicName}
            </span>
          </div>

          <p className={`font-serif italic text-xs mt-1 leading-4 ${
            isDark ? "text-ivory/60" : "text-forest/60"
          }`}>
            {plant.botanicalName}
          </p>
        </div>

        {/* 4. Value & Price Clarity (Loss Aversion & Incentive) */}
        <div className={`flex items-baseline justify-between gap-2 py-2 mb-3 border-y ${
          isDark ? "border-ivory/10" : "border-forest/10"
        }`}>
          <div>
            <span className={`text-xs font-mono block leading-4 ${
              isDark ? "text-ivory/60" : "text-forest/60"
            }`}>Plant only</span>
            <span className={`font-heading font-extrabold text-xl tracking-tight leading-7 ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              {plant.bundleCardA?.price || plant.price || `${plant.priceETB} ETB`}
            </span>
          </div>
          <div className="text-right">
            <span className={`text-xs font-mono block leading-4 ${
              isDark ? "text-ivory/60" : "text-forest/60"
            }`}>Pot + Guide</span>
            <span className="text-xs font-semibold text-leaf font-mono leading-4">
              {plant.bundleCardB?.price || "from 1,350 birr"}
            </span>
          </div>
        </div>

        {/* 5. Persona Trust Micro-Tag (Anxiety Removal) */}
        <div className={`flex items-center gap-2 mb-4 text-xs font-mono leading-4 ${
          isDark ? "text-ivory/70" : "text-forest/70"
        }`}>
          <span className="inline-flex items-center gap-1">
            <Check className="w-3 h-3 text-leaf shrink-0" />
            <span>Addis Acclimatized (2,100m)</span>
          </span>
        </div>
      </div>

      {/* 6. Direct-Action Quick CTA & Pot Bundle Link */}
      <div className={`pt-3 border-t flex flex-col gap-2 ${
        isDark ? "border-ivory/10" : "border-forest/10"
      }`}>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-full bg-leaf text-ivory font-semibold text-xs tracking-wide leading-4 hover:bg-leaf/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
        >
          <MessageCircle className="w-4 h-4 text-ivory" />
          <span>Inquire Now</span>
          <ArrowRight className="w-3 h-3" />
        </a>

        <Link
          href={`/plants/${plant.slug}`}
          className={`w-full py-2 px-4 rounded-full font-semibold text-xs leading-4 transition-colors flex items-center justify-center gap-1 min-h-[36px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-leaf text-center border ${
            isDark
              ? "bg-ivory/10 hover:bg-ivory/20 text-ivory border-ivory/15"
              : "bg-forest/5 hover:bg-forest/10 text-forest border-forest/10"
          }`}
        >
          <span>Plant Details</span>
        </Link>
      </div>
    </article>
  );
}
