"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export function WordmarkFooter() {
  const { content, toggleLang } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const { footer, brand } = content;

  return (
    <footer
      className={`relative w-full pt-16 sm:pt-24 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-forest-deep text-ivory" : "bg-[#EDE9DE] text-forest"
      }`}
      aria-label="Site Footer"
    >
      <div className="max-w-[1128px] mx-auto">
        {/* Responsive 12-Column Grid on Desktop, 2 on Tablet, Stacked on Mobile */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b ${
          isDark ? "border-ivory/10" : "border-forest/15"
        }`}>
          {/* Column 1: Brand Identity & Mission Statement (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <Link
              href="#top"
              className="inline-flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf rounded-2xl"
              aria-label="Evergreen Ethiopia Home - Scroll to top"
            >
              {/* Logo in light rounded card badge */}
              <div className={`relative w-13 h-13 rounded-2xl border transition-all duration-300 group-hover:scale-105 shrink-0 flex items-center justify-center p-2 shadow-sm ${
                isDark
                  ? "bg-[#F4F1EA] border-white/20"
                  : "bg-white border-forest/15"
              }`}>
                <Image
                  src="/logo-evergreen.png"
                  alt="Evergreen Ethiopia Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center font-heading font-extrabold text-2xl sm:text-[26px] tracking-tight leading-none">
                <span className={isDark ? "text-ivory" : "text-forest"}>Evergreen</span>
                <span className="text-leaf ml-1.5 font-bold">Ethiopia</span>
              </div>
            </Link>

            <p className={`font-sans text-sm leading-relaxed max-w-sm ${
              isDark ? "text-ivory/80" : "text-forest/80"
            }`}>
              {footer.aboutText}
            </p>

            {/* Social Icon Pills: TikTok, Instagram, Telegram, WhatsApp */}
            <div className="flex items-center gap-3 pt-1">
              {/* TikTok */}
              <a
                href={brand.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evergreen Ethiopia on TikTok"
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                  isDark
                    ? "bg-white/[0.08] hover:bg-white/[0.18] border-white/12 hover:border-white/30 text-ivory hover:text-white"
                    : "bg-forest/5 hover:bg-forest/10 border-forest/15 hover:border-forest/30 text-forest"
                }`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/evergreen_ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evergreen Ethiopia on Instagram"
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                  isDark
                    ? "bg-white/[0.08] hover:bg-white/[0.18] border-white/12 hover:border-white/30 text-ivory hover:text-white"
                    : "bg-forest/5 hover:bg-forest/10 border-forest/15 hover:border-forest/30 text-forest"
                }`}
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/evergreen_ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evergreen Ethiopia on Telegram"
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                  isDark
                    ? "bg-white/[0.08] hover:bg-white/[0.18] border-white/12 hover:border-white/30 text-ivory hover:text-white"
                    : "bg-forest/5 hover:bg-forest/10 border-forest/15 hover:border-forest/30 text-forest"
                }`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.66-2.89 8.01-3.46 3.81-1.6 4.6-.1 4.67-.1z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/251942461641?text=Hi%20Evergreen%20Ethiopia%20%F0%9F%8C%BF"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evergreen Ethiopia on WhatsApp"
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                  isDark
                    ? "bg-white/[0.08] hover:bg-white/[0.18] border-white/12 hover:border-white/30 text-ivory hover:text-white"
                    : "bg-forest/5 hover:bg-forest/10 border-forest/15 hover:border-forest/30 text-forest"
                }`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.277-.1-.479-.15-.68.15-.202.301-.78 1.978-.956 1.178-.175.2-.351.226-.652.075-.3-.15-1.267-.467-2.413-1.488-.893-.796-1.496-1.778-1.671-2.079-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.68-1.64-.931-2.244-.246-.588-.495-.508-.68-.518-.176-.01-.377-.01-.577-.01-.202 0-.528.076-.804.376-.277.302-1.056 1.033-1.056 2.519 0 1.486 1.082 2.922 1.233 3.123.15.201 2.13 3.253 5.161 4.563.721.312 1.284.498 1.723.638.724.23 1.383.197 1.904.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.577-.351zM12.04 21.737h-.005a9.71 9.71 0 0 1-4.954-1.353l-.355-.21-3.682.966.983-3.59-.231-.367a9.718 9.718 0 0 1-1.49-5.148c0-5.368 4.368-9.736 9.741-9.736 2.6 0 5.045 1.013 6.883 2.851a9.68 9.68 0 0 1 2.848 6.882c-.003 5.37-4.372 9.74-9.74 9.74zm7.946-16.586A11.164 11.164 0 0 0 12.04 1.862c-6.186 0-11.22 5.034-11.22 11.222 0 1.978.516 3.909 1.496 5.607L.727 23.336l4.802-1.26a11.19 11.19 0 0 0 5.508 1.442h.005c6.185 0 11.218-5.035 11.22-11.223 0-2.997-1.167-5.814-3.276-7.924z" />
                </svg>
              </a>
            </div>

            <div className={`flex items-center gap-2 text-xs font-sans pt-1 leading-4 ${
              isDark ? "text-ivory/70" : "text-forest/70"
            }`}>
              <MapPin className="w-4 h-4 text-leaf shrink-0" />
              <span>{footer.elevationTag}</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className={`font-heading font-bold text-base tracking-tight pb-2 border-b-2 border-leaf w-fit leading-none ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2.5 pt-1 text-sm">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-leaf rounded ${
                      isDark ? "text-ivory/80 hover:text-leaf" : "text-forest/80 hover:text-leaf"
                    }`}
                  >
                    <span className="text-leaf/60 group-hover:text-leaf group-hover:translate-x-0.5 transition-all">›</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services (3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className={`font-heading font-bold text-base tracking-tight pb-2 border-b-2 border-leaf w-fit leading-none ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              {footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5 pt-1 text-sm">
              {footer.services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`group inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-leaf rounded ${
                      isDark ? "text-ivory/80 hover:text-leaf" : "text-forest/80 hover:text-leaf"
                    }`}
                  >
                    <span className="text-leaf/60 group-hover:text-leaf group-hover:translate-x-0.5 transition-all">›</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-leaf/20 text-leaf border border-leaf/30 leading-none">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch (3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className={`font-heading font-bold text-base tracking-tight pb-2 border-b-2 border-leaf w-fit leading-none ${
              isDark ? "text-ivory" : "text-forest"
            }`}>
              {footer.contactTitle}
            </h4>

            <div className="space-y-3 pt-1 text-sm">
              {/* Location */}
              <div className={`flex items-start gap-2.5 leading-snug ${
                isDark ? "text-ivory/85" : "text-forest/85"
              }`}>
                <MapPin className="w-4 h-4 text-leaf shrink-0 mt-0.5" />
                <span>{footer.locationText}</span>
              </div>

              {/* Phone Numbers */}
              <div className={`flex items-start gap-2.5 leading-snug ${
                isDark ? "text-ivory/85" : "text-forest/85"
              }`}>
                <Phone className="w-4 h-4 text-leaf shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href={`tel:${brand.phonePrimaryRaw}`}
                    className="hover:text-leaf transition-colors font-medium"
                    aria-label={`Call primary phone ${brand.phonePrimary}`}
                  >
                    {brand.phonePrimary}
                  </a>
                  <a
                    href={`tel:${brand.phoneSecondaryRaw}`}
                    className="hover:text-leaf transition-colors text-xs opacity-80"
                    aria-label={`Call secondary phone ${brand.phoneSecondary}`}
                  >
                    {brand.phoneSecondary}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className={`flex items-center gap-2.5 leading-snug ${
                isDark ? "text-ivory/85" : "text-forest/85"
              }`}>
                <Mail className="w-4 h-4 text-leaf shrink-0" />
                <a
                  href={`mailto:${brand.email}`}
                  className="hover:text-leaf transition-colors break-all"
                  aria-label={`Send email to ${brand.email}`}
                >
                  {brand.email}
                </a>
              </div>

              {/* Chat on WhatsApp CTA Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/251942461641?text=Hi%20Evergreen%20Ethiopia%2C%20I%20have%20an%20inquiry%20about%20plants%20or%20landscaping."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-leaf text-ivory font-semibold text-sm leading-none hover:bg-leaf/90 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[44px] active:scale-95"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{footer.chatWhatsAppBtn}</span>
                </a>
              </div>

              {/* Language Switcher */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={toggleLang}
                  className={`text-xs underline underline-offset-4 font-sans transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-leaf rounded ${
                    isDark ? "text-ivory/70 hover:text-ivory" : "text-forest/70 hover:text-forest"
                  }`}
                >
                  Language / ቋንቋ: {content.nav.toggleLangLabel}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Architectural Wordmark (Preserved as requested) */}
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
        <div className={`pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans gap-2 text-center sm:text-left leading-4 ${
          isDark ? "text-ivory/60" : "text-forest/65"
        }`}>
          <span>{footer.copyright}</span>
          <span>{footer.trustNote}</span>
        </div>
      </div>
    </footer>
  );
}
