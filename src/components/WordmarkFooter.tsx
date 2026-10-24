"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { Phone, Mail, MessageCircle, ArrowUpRight, ShieldCheck, Truck, Sparkles, MapPin } from "lucide-react";

export function WordmarkFooter() {
  const { content, toggleLang } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const { footer, brand, nav } = content;
  const [currentYear, setCurrentYear] = React.useState<number>(2026);
  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const navLinks = [
    { label: nav.plants, href: "#plants" },
    { label: nav.companion, href: "#companion" },
    { label: nav.care, href: "#care" },
    { label: nav.fourSteps, href: "#steps" },
    { label: nav.paths, href: "#paths" },
    { label: nav.fromTiktok, href: "#tiktok" },
    { label: nav.faq, href: "#faq" },
  ];

  return (
    <footer
      className={`relative w-full pt-16 sm:pt-24 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-forest-deep text-ivory" : "bg-[#EDE9DE] text-forest"
      }`}
      aria-label="Site Footer"
    >
      <div className="max-w-[1128px] mx-auto">
        {/* 4 Columns Grid on Desktop, Stack on Mobile */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b ${
          isDark ? "border-ivory/10" : "border-forest/15"
        }`}>
          {/* Column 1: Clickable Brand Identity */}
          <div className="space-y-4">
            <Link
              href="#top"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf rounded-full"
              aria-label="Evergreen Ethiopia Home - Scroll to top"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-ivory flex items-center justify-center p-1 border border-ivory/20 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
                <Image
                  src="/logo-evergreen.png"
                  alt="Evergreen Ethiopia Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain rounded-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-col text-left">
                <span className={`font-heading font-extrabold text-xl tracking-wider uppercase group-hover:text-leaf transition-colors leading-7 ${
                  isDark ? "text-ivory" : "text-forest"
                }`}>
                  {brand.name}
                </span>
                <span className="text-xs tracking-widest uppercase text-leaf font-mono mt-1 leading-4">
                  {brand.subname} · 2,350M
                </span>
              </div>
            </Link>

            <p className={`font-sans text-xs sm:text-base leading-4 sm:leading-6 max-w-sm ${
              isDark ? "text-ivory/75" : "text-forest/75"
            }`}>
              {footer.aboutText}
            </p>

            <div className={`flex items-center gap-2 text-xs font-mono pt-1 leading-4 ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}>
              <MapPin className="w-4 h-4 text-leaf shrink-0" />
              <span>Addis Ababa, Ethiopia</span>
            </div>

            <div>
              <a
                href={brand.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-leaf hover:underline leading-4"
              >
                <span>{brand.handle} on TikTok</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Working Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-leaf font-mono leading-4">
              {footer.navTitle}
            </h4>
            <ul className={`space-y-2 text-xs sm:text-base leading-4 sm:leading-6 ${
              isDark ? "text-ivory/80" : "text-forest/80"
            }`}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-leaf transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-leaf rounded inline-block py-1 leading-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Contacts (Clickable Phone & Email) */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-leaf font-mono leading-4">
              {footer.contactTitle}
            </h4>
            <p className={`text-xs font-sans leading-4 ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}>
              {footer.phonesNotice}
            </p>

            <div className="space-y-3 pt-1">
              {/* Primary Phone */}
              <a
                href={`tel:${brand.phonePrimaryRaw}`}
                className={`flex items-center gap-3 text-xs sm:text-base font-mono hover:text-leaf hover:border-leaf/40 transition-colors p-3 rounded-xl border leading-4 sm:leading-6 ${
                  isDark
                    ? "text-ivory bg-ivory/5 hover:bg-ivory/10 border-ivory/10"
                    : "text-forest bg-white/80 hover:bg-white border-forest/15 shadow-sm"
                }`}
                aria-label={`Call primary phone ${brand.phonePrimary}`}
              >
                <Phone className="w-4 h-4 text-leaf shrink-0" />
                <span className="font-semibold">{brand.phonePrimary}</span>
              </a>

              {/* Secondary Phone */}
              <a
                href={`tel:${brand.phoneSecondaryRaw}`}
                className={`flex items-center gap-3 text-xs sm:text-base font-mono hover:text-leaf hover:border-leaf/40 transition-colors p-3 rounded-xl border leading-4 sm:leading-6 ${
                  isDark
                    ? "text-ivory bg-ivory/5 hover:bg-ivory/10 border-ivory/10"
                    : "text-forest bg-white/80 hover:bg-white border-forest/15 shadow-sm"
                }`}
                aria-label={`Call secondary phone ${brand.phoneSecondary}`}
              >
                <Phone className="w-4 h-4 text-leaf shrink-0" />
                <span className="font-semibold">{brand.phoneSecondary}</span>
              </a>

              {/* Clickable Email */}
              <a
                href={`mailto:${brand.email}`}
                className={`flex items-center gap-3 text-xs sm:text-base font-mono hover:text-leaf hover:border-leaf/40 transition-colors p-3 rounded-xl border leading-4 sm:leading-6 ${
                  isDark
                    ? "text-ivory bg-ivory/5 hover:bg-ivory/10 border-ivory/10"
                    : "text-forest bg-white/80 hover:bg-white border-forest/15 shadow-sm"
                }`}
                aria-label={`Send email to ${brand.email}`}
              >
                <Mail className="w-4 h-4 text-leaf shrink-0" />
                <span className="truncate">{brand.email}</span>
              </a>

              {/* Direct Inquiry Trigger */}
              <button
                type="button"
                onClick={() => openInquiry()}
                className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-leaf text-ivory font-semibold text-xs leading-4 hover:bg-leaf/90 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{nav.askPill}</span>
              </button>
            </div>
          </div>

          {/* Column 4: Delivery Line & Honesty Rules */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-leaf font-mono leading-4">
              {footer.deliveryTitle}
            </h4>
            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDark
                ? "bg-ivory/5 border-ivory/10 text-ivory"
                : "bg-white/80 border-forest/15 text-forest shadow-sm"
            }`}>
              <div className={`flex items-center gap-2 text-xs font-semibold leading-4 ${
                isDark ? "text-ivory" : "text-forest"
              }`}>
                <Truck className="w-4 h-4 text-leaf shrink-0" />
                <span>{footer.deliveryBody}</span>
              </div>
              <div className={`flex items-start gap-2 text-xs font-mono pt-2 border-t leading-4 ${
                isDark ? "text-ivory/60 border-ivory/10" : "text-forest/60 border-forest/10"
              }`}>
                <ShieldCheck className="w-4 h-4 text-leaf shrink-0 mt-1" />
                <span>{footer.ownerNotice}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={toggleLang}
                className={`text-xs underline underline-offset-4 font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-leaf rounded leading-4 ${
                  isDark ? "text-ivory/70 hover:text-ivory" : "text-forest/70 hover:text-forest"
                }`}
              >
                Language / ቋንቋ: {content.nav.toggleLangLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Giant Architectural Wordmark */}
        <div className="pt-8 sm:pt-12 text-center select-none overflow-hidden w-full flex justify-center items-center">
          <span className={`font-heading font-extrabold text-[10vw] sm:text-[11vw] lg:text-[11vw] leading-none tracking-tight uppercase block whitespace-nowrap transition-colors ${
            isDark
              ? "text-ivory/10 hover:text-ivory/15"
              : "text-forest/10 hover:text-forest/15"
          }`}>
            {footer.giantWordmark}
          </span>
        </div>

        {/* Dynamic Copyright & Honesty Disclaimer */}
        <div className={`pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-2 text-center sm:text-left leading-4 ${
          isDark ? "text-ivory/50" : "text-forest/60"
        }`}>
          <span>© {currentYear} Evergreen Ethiopia. All rights reserved.</span>
          <span>{brand.honestDisclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
