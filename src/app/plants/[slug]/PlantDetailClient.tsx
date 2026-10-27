"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ArrowLeft,
  Sun,
  Droplets,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Sprout,
  Flame,
  Search,
  X,
} from "lucide-react";
import {
  PlantItem,
  getWhatsAppPlantUrl,
  getTelegramPlantUrl,
  starPlantsEN,
} from "@/data/content";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WordmarkFooter } from "@/components/WordmarkFooter";
import { InquirySheet } from "@/components/InquirySheet";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { PlantCard } from "@/components/PlantCard";
import {
  PlantFilterBar,
  FilterId,
} from "@/components/PlantFilterBar";

interface PlantDetailClientProps {
  plant: PlantItem;
}

export function PlantDetailClient({ plant }: PlantDetailClientProps) {
  const router = useRouter();
  const { isDark } = useTheme();

  // Active lifestyle photo in gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // Two-card selection: "bundle" (Card B) vs "plant-only" (Card A)
  const [selectedPlan, setSelectedPlan] = useState<"bundle" | "plant-only">("bundle");
  // Progressive disclosure add-on checkboxes
  const [addonPumice, setAddonPumice] = useState(false);
  const [addonMister, setAddonMister] = useState(false);
  // Specimen size variant selector
  const [selectedSize, setSelectedSize] = useState<"tabletop" | "floor" | "statement">("floor");
  // Open accordion states
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  // Attribute tooltip
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Expanding search state in header navbar
  const [isNavSearchOpen, setIsNavSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState("");

  const handleNavSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      router.push(`/plants?q=${encodeURIComponent(navSearchQuery.trim())}`);
    }
  };

  const galleryImages = plant.gallery && plant.gallery.length > 0 ? plant.gallery : [plant.image];

  // Dynamic price calculation
  const basePrice = selectedPlan === "bundle" ? plant.priceETB + 500 : plant.priceETB;
  const sizeMultiplier = selectedSize === "statement" ? 1.4 : selectedSize === "tabletop" ? 0.8 : 1.0;
  const computedBase = Math.round(basePrice * sizeMultiplier);
  const addonTotal = (addonPumice ? 150 : 0) + (addonMister ? 280 : 0);
  const finalPrice = computedBase + addonTotal;

  const bundleDescription =
    selectedPlan === "bundle"
      ? `Plant + pot + care guide bundle (${selectedSize} size)`
      : `Plant only (${selectedSize} size)`;

  const whatsAppUrl = getWhatsAppPlantUrl(
    plant.commonName,
    bundleDescription,
    plant.chips.light
  );

  const telegramUrl = getTelegramPlantUrl(
    plant.commonName,
    bundleDescription
  );

  const toggleAccordion = (idx: number) => {
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

  // Related plants category filter state (clean filter pills, search bar removed)
  const [exploreFilter, setExploreFilter] = useState<FilterId>("all");

  const otherPlants = useMemo(() => {
    return starPlantsEN.filter((p) => p.slug !== plant.slug);
  }, [plant.slug]);

  const categoryCounts = useMemo(() => {
    const counts: Record<FilterId, number> = {
      all: otherPlants.length,
      beginner: 0,
      "low-light": 0,
      sunny: 0,
      flowers: 0,
      fruit: 0,
      "pet-safe": 0,
    };
    otherPlants.forEach((item) => {
      item.categories?.forEach((cat) => {
        if (cat in counts) {
          counts[cat as FilterId] = (counts[cat as FilterId] || 0) + 1;
        }
      });
    });
    return counts;
  }, [otherPlants]);

  const filteredExplorePlants = useMemo(() => {
    if (exploreFilter === "all") {
      return otherPlants;
    }
    return otherPlants.filter((item) =>
      item.categories?.includes(exploreFilter as PlantItem["categories"][number])
    );
  }, [exploreFilter, otherPlants]);

  return (
    <div className={`relative min-h-screen flex flex-col selection:bg-leaf selection:text-ivory transition-colors duration-300 ${
      isDark ? "bg-forest-deep text-ivory" : "bg-ivory text-forest"
    }`}>
      {/* Top Header Navigation */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b py-3 sm:py-4 px-4 sm:px-8 lg:px-12 transition-colors duration-300 ${
        isDark ? "bg-forest-deep/85 border-ivory/15 text-ivory" : "bg-white/85 border-forest/15 text-forest shadow-sm"
      }`}>
        <div className="max-w-[1128px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Back to All Plants */}
          <Link
            href="/plants"
            className={`inline-flex items-center gap-2 text-xs font-semibold hover:text-leaf transition-colors leading-4 min-h-[44px] shrink-0 ${
              isDark ? "text-ivory/80" : "text-forest/80"
            }`}
            aria-label="Back to full plant catalog"
          >
            <ArrowLeft className="w-4 h-4 text-leaf" />
            <span className="hidden sm:inline">All Plants</span>
          </Link>

          {/* Center: Brand Wordmark */}
          <Link
            href="/"
            className={`font-heading font-extrabold text-xl tracking-tight leading-7 transition-all ${
              isNavSearchOpen ? "hidden md:block" : "block"
            } ${isDark ? "text-ivory" : "text-forest"}`}
            aria-label="Evergreen Ethiopia Home"
          >
            <span>evergreen</span>
            <span className="font-serif italic font-normal text-leaf px-1">ethiopia</span>
          </Link>

          {/* Right: Expanding Search + ThemeToggle + WhatsApp CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Smooth Expanding Search Bar Console */}
            {isNavSearchOpen ? (
              <form
                onSubmit={handleNavSearchSubmit}
                className={`relative flex items-center rounded-full border px-3 py-1 shadow-lg animate-in fade-in zoom-in-95 duration-200 ${
                  isDark ? "bg-forest/80 backdrop-blur-md border-leaf/50" : "bg-white backdrop-blur-md border-leaf/50 shadow-md"
                }`}
                role="search"
              >
                <Search className="w-4 h-4 text-leaf shrink-0 mr-2" />
                <input
                  type="search"
                  autoFocus
                  value={navSearchQuery}
                  onChange={(e) => setNavSearchQuery(e.target.value)}
                  placeholder="Search plants..."
                  aria-label="Search catalog"
                  className={`bg-transparent text-xs font-sans focus:outline-none w-32 sm:w-48 md:w-64 leading-4 ${
                    isDark ? "text-ivory placeholder:text-ivory/50" : "text-forest placeholder:text-forest/50"
                  }`}
                />
                {navSearchQuery.trim() && (
                  <button
                    type="submit"
                    className="text-xs font-mono font-bold text-leaf hover:underline ml-1 mr-1"
                  >
                    Go
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsNavSearchOpen(false);
                    setNavSearchQuery("");
                  }}
                  aria-label="Close search input"
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ml-1 ${
                    isDark ? "bg-ivory/10 hover:bg-ivory/20 text-ivory/70 hover:text-ivory" : "bg-forest/10 hover:bg-forest/20 text-forest/70 hover:text-forest"
                  }`}
                >
                  <X className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsNavSearchOpen(true)}
                aria-label="Open plant search"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-medium leading-4 transition-all min-h-[40px] ${
                  isDark ? "bg-forest/60 hover:bg-forest border-ivory/15 text-ivory/80 hover:text-ivory" : "bg-forest/5 hover:bg-forest/10 border-forest/15 text-forest/80 hover:text-forest"
                }`}
              >
                <Search className="w-4 h-4 text-leaf" />
                <span className="hidden sm:inline">Search</span>
              </button>
            )}

            {/* Dark Mode ↔ Light Mode Switcher */}
            <ThemeToggle />

            {/* WhatsApp Help CTA Button */}
            <a
              href={`https://wa.me/251942461641?text=Hi%20Evergreen%20%F0%9F%91%8B%20I'm%20asking%20about%20${encodeURIComponent(plant.commonName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border text-xs font-semibold leading-4 transition-all min-h-[40px] shrink-0 ${
                isDark ? "bg-forest/80 hover:bg-forest border-ivory/20 text-ivory" : "bg-forest/10 hover:bg-forest/15 border-forest/20 text-forest"
              }`}
            >
              <MessageCircle className="w-4 h-4 text-leaf shrink-0" />
              <span className="hidden sm:inline">WhatsApp Help</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Product Page Section */}
      <main className="flex-1 w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className={`mb-6 flex items-center gap-2 text-xs font-mono leading-4 ${
          isDark ? "text-ivory/60" : "text-forest/60"
        }`}>
          <Link href="/" className="hover:text-leaf hover:underline transition-colors">Home</Link>
          <span className={isDark ? "text-ivory/30" : "text-forest/30"}>/</span>
          <Link href="/plants" className="hover:text-leaf hover:underline transition-colors">Plants</Link>
          <span className={isDark ? "text-ivory/30" : "text-forest/30"}>/</span>
          <span className={`font-semibold ${isDark ? "text-ivory" : "text-forest"}`}>{plant.commonName}</span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* LEFT COLUMN: Vertical thumbnail strip + Featured Image on Architectural Plinth */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-start">
            {/* Vertical Thumbnail Strip */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible w-full sm:w-20 shrink-0 pb-2 sm:pb-0">
              {galleryImages.map((imgSrc, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 focus:outline-none ${
                      isActive
                        ? "border-leaf ring-2 ring-leaf/40 shadow-lg opacity-100"
                        : isDark
                          ? "border-ivory/15 hover:border-ivory/40 opacity-70 hover:opacity-100"
                          : "border-forest/15 hover:border-forest/40 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`${plant.commonName} thumbnail ${idx + 1}`}
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </button>
                );
              })}
            </div>

            {/* Featured Image Plinth View */}
            <div className={`relative flex-1 w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border ${
              isDark ? "bg-forest/40 border-ivory/15" : "bg-white border-forest/15"
            }`}>
              <Image
                src={galleryImages[activeImageIndex]}
                alt={plant.imageAlt}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-300"
              />

              {/* Status Badge Tag */}
              <div className="absolute top-4 left-4 z-10 px-3 py-2 rounded-full bg-forest-deep/90 backdrop-blur-md text-ivory text-xs font-semibold leading-4 flex items-center gap-2 shadow-md border border-ivory/20">
                <Star className="w-3 h-3 text-leaf fill-leaf" />
                <span>{plant.statusBadge}</span>
              </div>

              {/* Highland Acclimatized Watermark */}
              <div className="absolute bottom-4 left-4 z-10 px-3 py-2 rounded-full bg-forest-deep/90 backdrop-blur-md text-ivory text-xs font-mono font-medium leading-4 shadow-sm border border-ivory/20 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-leaf shrink-0" />
                <span>Acclimatized to Addis (2,100m)</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CRO Information, Choice Framing, Two-Card Selector, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Status Badge above plant name */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf/20 text-leaf border border-leaf/30 text-xs font-bold uppercase tracking-wider leading-4">
                <Sparkles className="w-3 h-3 text-leaf" />
                <span>{plant.statusBadge}</span>
              </span>
              <span className={`text-xs font-mono leading-4 ${
                isDark ? "text-ivory/60" : "text-forest/60"
              }`}>
                Highland Nursery Stock
              </span>
            </div>

            {/* Plant Common Name & Amharic Badge */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <h1 className={`font-heading font-extrabold text-[32px] sm:text-4xl tracking-tight leading-[40px] sm:leading-[44px] ${
                isDark ? "text-ivory" : "text-forest"
              }`}>
                {plant.commonName}
              </h1>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 leading-4 ${
                isDark ? "bg-forest/60 border-ivory/15 text-ivory" : "bg-forest/5 border-forest/15 text-forest"
              }`}>
                {plant.amharicName}
              </span>
            </div>

            {/* Botanical Subtitle */}
            <p className={`font-serif italic text-base mb-3 leading-6 ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}>
              {plant.botanicalName}
            </p>

            {/* Social Proof Strip */}
            <div className={`flex items-center gap-3 py-2 px-3 rounded-2xl backdrop-blur-md border mb-4 text-xs font-sans leading-4 flex-wrap ${
              isDark ? "bg-forest/40 border-ivory/15 text-ivory" : "bg-white/80 border-forest/15 text-forest shadow-sm"
            }`}>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold">{plant.rating}</span>
              <span className={`font-mono ${isDark ? "text-ivory/70" : "text-forest/70"}`}>
                ({plant.reviewsCount} plant lovers in Addis)
              </span>
              <span className={isDark ? "text-ivory/30" : "text-forest/30"}>|</span>
              <span className="font-semibold text-leaf flex items-center gap-2">
                <Flame className="w-4 h-4 text-leaf shrink-0" />
                <span>{plant.deliveryMetric}</span>
              </span>
            </div>

            {/* One-Line Outcome */}
            <p className={`font-sans text-base mb-6 leading-6 font-medium ${
              isDark ? "text-ivory/90" : "text-forest/90"
            }`}>
              {plant.outcomeLine}
            </p>

            {/* Visual Attribute Chips (light, pet-safe, care level) with Hover Micro-Answers */}
            <div className="mb-6">
              <span className={`text-xs font-mono font-medium uppercase tracking-widest block mb-2 leading-4 ${
                isDark ? "text-ivory/60" : "text-forest/60"
              }`}>
                Plant Attributes & Care
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === "light" ? null : "light")}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-mono leading-4 min-h-[36px] transition-colors ${
                    isDark
                      ? "bg-forest/40 hover:bg-forest/70 border-ivory/15 text-ivory"
                      : "bg-white/80 hover:bg-white border-forest/15 text-forest shadow-sm"
                  }`}
                >
                  <Sun className="w-4 h-4 text-leaf shrink-0" />
                  <span>{plant.chips.light}</span>
                  <HelpCircle className={`w-3 h-3 ${isDark ? "text-ivory/50" : "text-forest/50"}`} />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === "care" ? null : "care")}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-mono leading-4 min-h-[36px] transition-colors ${
                    isDark
                      ? "bg-forest/40 hover:bg-forest/70 border-ivory/15 text-ivory"
                      : "bg-white/80 hover:bg-white border-forest/15 text-forest shadow-sm"
                  }`}
                >
                  <Droplets className="w-4 h-4 text-leaf shrink-0" />
                  <span>{plant.chips.care}</span>
                  <HelpCircle className={`w-3 h-3 ${isDark ? "text-ivory/50" : "text-forest/50"}`} />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === "pet" ? null : "pet")}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-mono leading-4 min-h-[36px] transition-colors ${
                    isDark
                      ? "bg-forest/40 hover:bg-forest/70 border-ivory/15 text-ivory"
                      : "bg-white/80 hover:bg-white border-forest/15 text-forest shadow-sm"
                  }`}
                >
                  {plant.chips.petSafe.includes("Pet-Safe") ? (
                    <ShieldCheck className="w-4 h-4 text-leaf shrink-0" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span>{plant.chips.petSafe}</span>
                  <HelpCircle className={`w-3 h-3 ${isDark ? "text-ivory/50" : "text-forest/50"}`} />
                </button>
              </div>

              {/* Tooltip Micro-Answer Box */}
              {activeTooltip && (
                <div className={`mt-2 p-3 rounded-2xl backdrop-blur-md text-xs font-sans leading-4 shadow-xl border animate-in fade-in duration-150 ${
                  isDark ? "bg-forest-deep/95 border-leaf/40 text-ivory" : "bg-white border-leaf/50 text-forest"
                }`}>
                  <div className="font-semibold text-leaf mb-1">
                    {activeTooltip === "light"
                      ? "Highland Light Advice:"
                      : activeTooltip === "care"
                      ? "Addis Care Advice:"
                      : "Pet & Home Safety Note:"}
                  </div>
                  <div className={isDark ? "text-ivory/90" : "text-forest/90"}>
                    {activeTooltip === "light"
                      ? "Place near an east-facing window or filtered sheer curtains in Addis Ababa for lush growth without leaf burn."
                      : activeTooltip === "care"
                      ? plant.hoverTooltip
                      : plant.chips.petSafe.includes("Pet-Safe")
                      ? "Safe for cats and dogs according to ASPCA non-toxic plant guidelines."
                      : "Contains natural plant calcium oxalate crystals. Keep on a plant stand away from playful pets."}
                  </div>
                </div>
              )}
            </div>

            {/* Specimen Size Selector */}
            <div className="mb-6">
              <span className={`text-xs font-mono font-medium uppercase tracking-widest block mb-2 leading-4 ${
                isDark ? "text-ivory/60" : "text-forest/60"
              }`}>
                Choose Specimen Size:
              </span>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSize("tabletop")}
                  className={`p-3 rounded-2xl border text-left transition-all min-h-[56px] ${
                    selectedSize === "tabletop"
                      ? `border-leaf bg-leaf/20 ring-2 ring-leaf/50 ${isDark ? "text-ivory" : "text-forest"}`
                      : isDark
                        ? "border-ivory/15 hover:border-ivory/30 bg-forest/40 text-ivory/90"
                        : "border-forest/15 hover:border-forest/30 bg-white/80 text-forest shadow-sm"
                  }`}
                >
                  <div className="text-xs font-bold leading-4">Tabletop</div>
                  <div className={`text-xs font-mono leading-4 ${isDark ? "text-ivory/60" : "text-forest/60"}`}>35–45 cm</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSize("floor")}
                  className={`p-3 rounded-2xl border text-left transition-all min-h-[56px] ${
                    selectedSize === "floor"
                      ? `border-leaf bg-leaf/20 ring-2 ring-leaf/50 ${isDark ? "text-ivory" : "text-forest"}`
                      : isDark
                        ? "border-ivory/15 hover:border-ivory/30 bg-forest/40 text-ivory/90"
                        : "border-forest/15 hover:border-forest/30 bg-white/80 text-forest shadow-sm"
                  }`}
                >
                  <div className="text-xs font-bold leading-4 flex items-center justify-between">
                    <span>Living Room</span>
                    <span className="text-xs text-leaf font-bold uppercase leading-4">Best</span>
                  </div>
                  <div className={`text-xs font-mono leading-4 ${isDark ? "text-ivory/60" : "text-forest/60"}`}>70–85 cm</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSize("statement")}
                  className={`p-3 rounded-2xl border text-left transition-all min-h-[56px] ${
                    selectedSize === "statement"
                      ? `border-leaf bg-leaf/20 ring-2 ring-leaf/50 ${isDark ? "text-ivory" : "text-forest"}`
                      : isDark
                        ? "border-ivory/15 hover:border-ivory/30 bg-forest/40 text-ivory/90"
                        : "border-forest/15 hover:border-forest/30 bg-white/80 text-forest shadow-sm"
                  }`}
                >
                  <div className="text-xs font-bold leading-4">Statement</div>
                  <div className={`text-xs font-mono leading-4 ${isDark ? "text-ivory/60" : "text-forest/60"}`}>110–130 cm</div>
                </button>
              </div>
            </div>

            {/* Two Selection Cards */}
            <div className="mb-6">
              <span className={`text-xs font-mono font-medium uppercase tracking-widest block mb-2 leading-4 ${
                isDark ? "text-ivory/60" : "text-forest/60"
              }`}>
                Select Your Package:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card A: Plant only */}
                <div
                  onClick={() => setSelectedPlan("plant-only")}
                  className={`relative p-4 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPlan === "plant-only"
                      ? isDark
                        ? "border-leaf/70 bg-forest/60 shadow-lg ring-1 ring-leaf/40 text-ivory"
                        : "border-leaf/70 bg-white shadow-lg ring-1 ring-leaf/40 text-forest"
                      : isDark
                        ? "border-ivory/15 hover:border-ivory/30 bg-forest/40 text-ivory"
                        : "border-forest/15 hover:border-forest/30 bg-white/80 text-forest shadow-sm"
                  }`}
                >
                  <div>
                    <div className={`text-xs font-mono font-medium uppercase tracking-wider mb-1 leading-4 ${
                      isDark ? "text-ivory/60" : "text-forest/60"
                    }`}>
                      {plant.bundleCardA.title}
                    </div>
                    <div className={`text-2xl font-extrabold font-heading leading-8 mb-2 ${
                      isDark ? "text-ivory" : "text-forest"
                    }`}>
                      {Math.round(plant.priceETB * sizeMultiplier)} Birr
                    </div>
                    <div className={`text-xs font-sans leading-4 mb-3 ${
                      isDark ? "text-ivory/70" : "text-forest/70"
                    }`}>
                      Highland grower nursery pot
                    </div>
                  </div>

                  <div className={`pt-2 border-t space-y-1 ${
                    isDark ? "border-ivory/10" : "border-forest/10"
                  }`}>
                    {plant.bundleCardA.reassurances.map((item, idx) => (
                      <div key={idx} className={`flex items-center gap-2 text-xs leading-4 ${
                        isDark ? "text-ivory/80" : "text-forest/80"
                      }`}>
                        <Check className="w-3 h-3 text-leaf shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card B: Plant + pot + care guide [HIGHLIGHTED: Most Popular] */}
                <div
                  onClick={() => setSelectedPlan("bundle")}
                  className={`relative p-4 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPlan === "bundle"
                      ? isDark
                        ? "border-leaf bg-forest/70 shadow-2xl ring-2 ring-leaf text-ivory"
                        : "border-leaf bg-white shadow-2xl ring-2 ring-leaf text-forest"
                      : isDark
                        ? "border-ivory/20 hover:border-leaf/50 bg-forest/40 text-ivory"
                        : "border-forest/20 hover:border-leaf/50 bg-white/80 text-forest shadow-sm"
                  }`}
                >
                  {/* "Most Popular" Pill Badge */}
                  <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-leaf text-ivory text-xs font-bold tracking-wide shadow-md leading-4">
                    MOST POPULAR
                  </div>

                  <div>
                    <div className="text-xs font-mono font-bold text-leaf uppercase tracking-wider mb-1 leading-4">
                      {plant.bundleCardB.title}
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-2xl font-extrabold font-heading leading-8 ${
                        isDark ? "text-ivory" : "text-forest"
                      }`}>
                        {Math.round((plant.priceETB + 500) * sizeMultiplier)} Birr
                      </span>
                    </div>
                    <div className="inline-block px-2 py-1 rounded-full bg-leaf/20 text-leaf border border-leaf/30 text-xs font-mono font-semibold mb-3 leading-4">
                      {plant.bundleCardB.savings}
                    </div>
                  </div>

                  <div className={`pt-2 border-t space-y-1 ${
                    isDark ? "border-ivory/10" : "border-forest/10"
                  }`}>
                    {plant.bundleCardB.reassurances.map((item, idx) => (
                      <div key={idx} className={`flex items-center gap-2 text-xs font-medium leading-4 ${
                        isDark ? "text-ivory/90" : "text-forest/90"
                      }`}>
                        <Check className="w-3 h-3 text-leaf shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progressive Disclosure: Bundle Add-ons */}
            {selectedPlan === "bundle" && (
              <div className={`mb-6 p-4 rounded-2xl backdrop-blur-md border animate-in fade-in duration-200 ${
                isDark ? "bg-forest/40 border-ivory/15" : "bg-white/85 border-forest/15 shadow-sm"
              }`}>
                <span className={`text-xs font-mono font-medium uppercase tracking-widest block mb-2 leading-4 ${
                  isDark ? "text-ivory/70" : "text-forest/70"
                }`}>
                  Add Recommended Nursery Supplies:
                </span>
                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    isDark ? "bg-forest-deep/60 border-ivory/10 hover:border-ivory/20" : "bg-forest/5 border-forest/10 hover:border-forest/20"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addonPumice}
                        onChange={(e) => setAddonPumice(e.target.checked)}
                        className="rounded text-leaf focus:ring-leaf bg-forest-deep border-ivory/30 w-4 h-4"
                      />
                      <span className={`text-xs font-sans leading-4 font-medium ${
                        isDark ? "text-ivory" : "text-forest"
                      }`}>
                        Aerated Pumice Potting Mix (2kg bag)
                      </span>
                    </div>
                    <span className="text-xs font-mono text-leaf font-bold leading-4">+150 Birr</span>
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    isDark ? "bg-forest-deep/60 border-ivory/10 hover:border-ivory/20" : "bg-forest/5 border-forest/10 hover:border-forest/20"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addonMister}
                        onChange={(e) => setAddonMister(e.target.checked)}
                        className="rounded text-leaf focus:ring-leaf bg-forest-deep border-ivory/30 w-4 h-4"
                      />
                      <span className={`text-xs font-sans leading-4 font-medium ${
                        isDark ? "text-ivory" : "text-forest"
                      }`}>
                        Vintage Brass Plant Mister (Fine mist for Addis humidity)
                      </span>
                    </div>
                    <span className="text-xs font-mono text-leaf font-bold leading-4">+280 Birr</span>
                  </label>
                </div>
              </div>
            )}

            {/* Outcome-Framed CTA Button */}
            <div className="mb-4">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-leaf text-ivory font-bold text-base leading-6 hover:bg-leaf/90 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[56px]"
              >
                <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110 text-ivory" />
                <span>
                  {plant.outcomeCta} on WhatsApp ({finalPrice} Birr) →
                </span>
              </a>

              {/* Telegram secondary option */}
              <div className={`mt-2 flex items-center justify-center gap-4 text-xs font-mono leading-4 ${
                isDark ? "text-ivory/70" : "text-forest/70"
              }`}>
                <span>Or ask via:</span>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-leaf hover:underline font-semibold"
                >
                  Telegram (@evergreen_ethiopia)
                </a>
                <span className={isDark ? "text-ivory/30" : "text-forest/30"}>·</span>
                <a href="tel:+251942461641" className={`hover:text-leaf transition-colors ${
                  isDark ? "text-ivory" : "text-forest"
                }`}>
                  Call 0942 461 641
                </a>
              </div>
            </div>

            {/* Micro-reassurance directly under the CTA */}
            <div className={`p-3 rounded-2xl backdrop-blur-md border flex items-center gap-3 mb-6 ${
              isDark ? "bg-forest/40 border-ivory/15" : "bg-white/80 border-forest/15 shadow-sm"
            }`}>
              <ShieldCheck className="w-5 h-5 text-leaf shrink-0" />
              <p className={`text-xs font-sans leading-4 ${
                isDark ? "text-ivory/80" : "text-forest/80"
              }`}>
                <strong className={isDark ? "text-ivory" : "text-forest"}>No upfront payment required.</strong> We message you photos of the exact plant specimen available before scheduling delivery in Addis.
              </p>
            </div>

            {/* Trust Anchors Row */}
            <div className={`grid grid-cols-2 gap-3 py-4 border-y mb-6 ${
              isDark ? "border-ivory/10" : "border-forest/10"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border text-leaf shrink-0 ${
                  isDark ? "bg-forest/60 border-ivory/15" : "bg-forest/5 border-forest/15"
                }`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-bold leading-4 ${isDark ? "text-ivory" : "text-forest"}`}>Acclimatized at 2,100m</div>
                  <div className={`text-xs font-sans leading-4 ${isDark ? "text-ivory/60" : "text-forest/60"}`}>Not imported shock</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border text-leaf shrink-0 ${
                  isDark ? "bg-forest/60 border-ivory/15" : "bg-forest/5 border-forest/15"
                }`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-bold leading-4 ${isDark ? "text-ivory" : "text-forest"}`}>Healthy-Plant Guarantee</div>
                  <div className={`text-xs font-sans leading-4 ${isDark ? "text-ivory/60" : "text-forest/60"}`}>7-day replacement</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border text-leaf shrink-0 ${
                  isDark ? "bg-forest/60 border-ivory/15" : "bg-forest/5 border-forest/15"
                }`}>
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-bold leading-4 ${isDark ? "text-ivory" : "text-forest"}`}>Delivered Carefully</div>
                  <div className={`text-xs font-sans leading-4 ${isDark ? "text-ivory/60" : "text-forest/60"}`}>24–48h in Addis</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border text-leaf shrink-0 ${
                  isDark ? "bg-forest/60 border-ivory/15" : "bg-forest/5 border-forest/15"
                }`}>
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-bold leading-4 ${isDark ? "text-ivory" : "text-forest"}`}>Free Care Support</div>
                  <div className={`text-xs font-sans leading-4 ${isDark ? "text-ivory/60" : "text-forest/60"}`}>Message anytime</div>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-3">
              {plant.careAccordions.map((acc, aIdx) => {
                const isOpen = openAccordion === aIdx;
                return (
                  <div
                    key={aIdx}
                    className={`rounded-2xl border backdrop-blur-md overflow-hidden transition-all ${
                      isDark ? "bg-forest/40 border-ivory/15" : "bg-white/85 border-forest/15 shadow-sm"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(aIdx)}
                      className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-leaf min-h-[48px]"
                    >
                      <span className={`font-heading font-bold text-base leading-6 ${
                        isDark ? "text-ivory" : "text-forest"
                      }`}>
                        {acc.title}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-leaf shrink-0" />
                      ) : (
                        <ChevronDown className={`w-4 h-4 shrink-0 ${isDark ? "text-ivory/50" : "text-forest/50"}`} />
                      )}
                    </button>

                    {isOpen && (
                      <div className={`px-4 pb-4 text-xs font-sans leading-4 border-t pt-2 animate-in fade-in duration-150 ${
                        isDark ? "border-ivory/10 text-ivory/80" : "border-forest/10 text-forest/80"
                      }`}>
                        {acc.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* In-Context Testimonial Quote */}
        <div className={`p-6 sm:p-8 rounded-3xl backdrop-blur-md border mb-16 max-w-[720px] mx-auto text-center ${
          isDark ? "bg-forest/40 border-ivory/15" : "bg-white/85 border-forest/15 shadow-md"
        }`}>
          <div className="flex items-center justify-center gap-1 mb-2 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className={`font-serif italic text-base sm:text-xl leading-6 sm:leading-[28px] mb-3 ${
            isDark ? "text-ivory" : "text-forest"
          }`}>
            &ldquo;My {plant.commonName} arrived in Bole in a heavy ceramic pot with saucer. It has put out 4 new leaves in two months!&rdquo;
          </p>
          <div className={`text-xs font-mono leading-4 ${
            isDark ? "text-ivory/60" : "text-forest/60"
          }`}>
            Verified Addis Ababa customer · Bole Atlas
          </div>
        </div>

        {/* Explore More Plants Section (Category Filter Pills only, redundant search bar removed) */}
        <section className="pt-8 pb-12" aria-label="Explore more plants in catalog">
          <div className="text-center mb-8 max-w-[720px] mx-auto">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-semibold mb-2 leading-4 ${
              isDark ? "bg-forest/60 border-ivory/15 text-ivory" : "bg-forest/5 border-forest/15 text-forest"
            }`}>
              <Sprout className="w-4 h-4 text-leaf" />
              <span>More Acclimatized Specimens</span>
            </div>
            <h2 className={`font-heading font-extrabold text-2xl sm:text-[32px] tracking-tight leading-8 sm:leading-[40px] ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              Explore more plants for Addis Ababa
            </h2>
            <p className={`text-xs sm:text-base font-sans mt-2 leading-4 sm:leading-6 ${
              isDark ? "text-ivory/75" : "text-forest/75"
            }`}>
              Acclimatized to 2,100m highland conditions, delivered upright to your doorstep.
            </p>
          </div>

          <PlantFilterBar
            hideSearch={true}
            activeFilter={exploreFilter}
            onFilterChange={setExploreFilter}
            totalCount={otherPlants.length}
            filteredCount={filteredExplorePlants.length}
            categoryCounts={categoryCounts}
          />

          {filteredExplorePlants.length === 0 ? (
            <div
              role="status"
              className={`py-12 px-6 text-center rounded-3xl backdrop-blur-md border border-dashed max-w-[720px] mx-auto my-8 ${
                isDark ? "bg-forest/40 border-ivory/20 text-ivory" : "bg-white/80 border-forest/20 text-forest shadow-sm"
              }`}
            >
              <h3 className={`font-heading font-bold text-xl mb-1 leading-7 ${
                isDark ? "text-ivory" : "text-forest"
              }`}>
                No matching plants found
              </h3>
              <p className={`text-xs sm:text-base font-sans mb-4 leading-4 sm:leading-6 ${
                isDark ? "text-ivory/70" : "text-forest/70"
              }`}>
                Try clearing your category filter to see more nursery stock.
              </p>
              <button
                type="button"
                onClick={() => {
                  setExploreFilter("all");
                }}
                className="px-6 py-3 rounded-full bg-leaf text-ivory text-xs font-semibold leading-4 hover:bg-leaf/90 transition-all min-h-[40px]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredExplorePlants.slice(0, 3).map((otherPlant) => (
                <PlantCard key={otherPlant.id} plant={otherPlant} />
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              href="/plants"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs font-semibold leading-4 transition-all min-h-[40px] ${
                isDark
                  ? "bg-forest/80 hover:bg-forest border-ivory/20 text-ivory hover:border-leaf/50"
                  : "bg-forest/10 hover:bg-forest/15 border-forest/20 text-forest hover:border-leaf/50"
              }`}
            >
              <Sparkles className="w-4 h-4 text-leaf" />
              <span>View Full 50+ Plant Catalog →</span>
            </Link>
          </div>
        </section>
      </main>

      <WordmarkFooter />
      <InquirySheet />
      <StickyMobileBar />
    </div>
  );
}
