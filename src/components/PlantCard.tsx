"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import {
  MessageCircle,
  Truck,
  Eye,
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
      className={`group relative rounded-[14px] p-[18px] border transition-all duration-300 flex flex-col justify-between shadow-chaka hover:shadow-chaka-hover font-chaka ${
        isDark
          ? "bg-[#1B1D19] border-[#2C2F29] text-ivory hover:border-leaf/40"
          : "bg-white border-[#e2e9e4] text-[#333333] hover:border-[#198754]/40"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* 1. In-Context Imagery with Chaka 10px rounded container */}
        <Link
          href={`/plants/${plant.slug}`}
          className={`block relative w-full h-56 rounded-[10px] overflow-hidden mb-3.5 focus:outline-none focus-chaka border ${
            isDark ? "bg-[#121311] border-[#2C2F29]" : "bg-[#f4f7f4] border-[#e2e9e4]"
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-[transform,opacity] duration-500 ease-out transform-gpu will-change-[transform,opacity] ${
              lifestyleImage && isHovered
                ? "opacity-0 scale-105"
                : "opacity-100 group-hover:scale-105"
            }`}
          />

          {/* Secondary Lifestyle Photo */}
          {lifestyleImage && (
            <Image
              src={lifestyleImage}
              alt={`${plant.commonName} in Addis Ababa home context`}
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover object-center transition-[transform,opacity] duration-500 ease-out transform-gpu will-change-[transform,opacity] ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}

          {/* Top Status Badge: Chaka Recipe (#e8f7ef bg, #157347 text, 20px radius, 11px font) */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className={`inline-flex items-center gap-1 px-[9px] py-[4px] rounded-[20px] text-[11px] font-bold leading-none shadow-sm ${
              isDark
                ? "bg-[#157347]/30 text-[#78B83D] border border-[#157347]/40"
                : "bg-[#e8f7ef] text-[#157347] border border-[#157347]/20"
            }`}>
              <Check className="w-3 h-3 stroke-[2.5]" />
              <span>Available</span>
            </span>
          </div>

          {/* Delivery & Acclimatized Proof (Bottom-Left Pill) */}
          <div className={`absolute bottom-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full text-[11px] font-medium leading-none shadow-sm flex items-center gap-1.5 backdrop-blur-md ${
            isDark
              ? "bg-[#121311]/90 text-ivory/90 border border-ivory/15"
              : "bg-white/95 text-[#333333] border border-[#e2e9e4]"
          }`}>
            <Truck className="w-3 h-3 text-[#198754] shrink-0" />
            <span>Addis Delivery</span>
          </div>
        </Link>

        {/* 2. Plant Botanical Name & Amharic Pill */}
        <div className="mb-2">
          <div className="flex items-baseline justify-between gap-1.5 flex-wrap">
            <Link
              href={`/plants/${plant.slug}`}
              className={`font-heading font-bold text-[17px] tracking-tight leading-snug hover:text-[#198754] transition-colors ${
                isDark ? "text-ivory" : "text-[#333333]"
              }`}
            >
              {plant.commonName}
            </Link>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 border leading-none ${
              isDark
                ? "bg-ivory/10 text-ivory/80 border-ivory/15"
                : "bg-[#f4f7f4] text-[#78837c] border-[#e2e9e4]"
            }`}>
              {plant.amharicName}
            </span>
          </div>

          <p className={`text-[12px] italic mt-0.5 leading-tight ${
            isDark ? "text-ivory/60" : "text-[#78837c]"
          }`}>
            {plant.botanicalName}
          </p>
        </div>

        {/* 3. Price Block: Chaka Plants Style ("Starting from" + bold ETB price) */}
        <div className={`pt-2 pb-2.5 mb-2 border-y ${
          isDark ? "border-[#2C2F29]" : "border-[#e2e9e4]"
        }`}>
          <div className="flex items-baseline justify-between">
            <div>
              <span className={`text-[11px] block leading-none mb-1 ${
                isDark ? "text-ivory/60" : "text-[#78837c]"
              }`}>
                Starting from
              </span>
              <span className={`font-heading font-extrabold text-[18px] tracking-tight leading-none ${
                isDark ? "text-leaf" : "text-[#198754]"
              }`}>
                {plant.priceETB ? `${plant.priceETB.toLocaleString()} ETB` : plant.price}
              </span>
            </div>
            <div className="text-right">
              <span className={`text-[11px] block leading-none mb-1 ${
                isDark ? "text-ivory/50" : "text-[#a5afa8]"
              }`}>
                Light
              </span>
              <span className={`text-[12px] font-medium leading-none ${
                isDark ? "text-ivory/80" : "text-[#78837c]"
              }`}>
                {plant.chips?.light || plant.light || "Bright Indirect"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons (Chaka 2-button row: View [8px] + Inquire/Cart [10px]) */}
      <div className="pt-2 flex items-center gap-2">
        {/* Secondary: View Plant Details */}
        <Link
          href={`/plants/${plant.slug}`}
          className={`flex-1 py-2 px-3 rounded-[8px] font-bold text-[13px] leading-none transition-colors flex items-center justify-center gap-1.5 min-h-[38px] text-center border focus-chaka ${
            isDark
              ? "bg-[#121311] hover:bg-[#1B1D19] text-ivory border-[#2C2F29]"
              : "bg-white hover:bg-[#e8f6ee] text-[#198754] hover:text-[#157347] border-[#e2e9e4]"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </Link>

        {/* Primary: Inquire via WhatsApp */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 rounded-[10px] bg-[#198754] text-white font-bold text-[13px] leading-none hover:bg-[#146c43] transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-chaka-btn active:scale-95 min-h-[38px] focus-chaka"
        >
          <MessageCircle className="w-3.5 h-3.5 text-white" />
          <span>Add to cart</span>
        </a>
      </div>
    </article>
  );
}
