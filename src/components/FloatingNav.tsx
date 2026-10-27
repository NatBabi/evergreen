"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MessageCircle, Menu, X, Globe, Leaf, Phone, Mail } from "lucide-react";

export function FloatingNav() {
  const { content, toggleLang } = useLanguage();
  const { openInquiry } = useInquiry();
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop or on Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: content.nav.plants, href: "#plants" },
    { label: content.nav.companion, href: "#companion" },
    { label: content.nav.care, href: "#care" },
    { label: content.nav.fourSteps, href: "#steps" },
    { label: content.nav.paths, href: "#paths" },
    { label: content.nav.fromTiktok, href: "#tiktok" },
    { label: content.nav.faq, href: "#faq" },
  ];

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-[100] flex justify-center px-4 sm:px-6 pointer-events-none transition-all duration-300">
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full max-w-[1128px] rounded-full px-4 sm:px-6 py-3 transition-all duration-300 ease-out flex items-center justify-between ${
            scrolled
              ? isDark
                ? "glass-nav-scrolled text-ivory shadow-xl border border-ivory/15"
                : "bg-ivory/90 backdrop-blur-md text-forest shadow-xl border border-forest/15"
              : isDark
                ? "glass-nav-top text-ivory shadow-lg border border-white/15"
                : "bg-white/85 backdrop-blur-md text-forest shadow-lg border border-forest/10"
          }`}
        >
          {/* Logo & Botanical Brand */}
          <Link
            href="#top"
            className="flex items-center gap-3 group py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf rounded-full"
            aria-label="Evergreen Ethiopia Home"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-ivory flex items-center justify-center p-1 border border-forest/20 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
              <Image
                src="/logo-evergreen.png"
                alt="Evergreen Ethiopia Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain rounded-full"
                unoptimized
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xs sm:text-base tracking-wider uppercase leading-4 sm:leading-6">
                Evergreen
              </span>
              <span className="text-xs tracking-widest uppercase opacity-80 mt-1 font-mono font-semibold leading-4 hidden sm:block">
                Ethiopia · 2,350m
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold tracking-wide transition-colors duration-200 hover:text-leaf relative py-1 leading-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf rounded ${
                  isDark
                    ? scrolled ? "text-ivory/85" : "text-ivory/90"
                    : "text-forest/85 hover:text-leaf"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            {/* Dark / Light Mode Toggle Button */}
            <ThemeToggle />

            {/* Language Switcher (Amharic / English) */}
            <button
              type="button"
              onClick={toggleLang}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold tracking-wide leading-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf ${
                isDark
                  ? scrolled
                    ? "bg-forest/60 text-ivory hover:bg-forest/80 border border-ivory/15"
                    : "bg-white/15 text-ivory hover:bg-white/25 border border-white/15"
                  : "bg-forest/5 text-forest hover:bg-forest/10 border border-forest/15"
              }`}
              title="Toggle Language / ቋንቋ ይቀይሩ"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4" />
              <span>{content.nav.toggleLangLabel}</span>
            </button>

            {/* "Ask about a plant" Pill Button */}
            <button
              type="button"
              onClick={() => openInquiry()}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide leading-4 bg-leaf text-ivory hover:bg-leaf/90 transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-1 min-h-[40px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{content.nav.askPill}</span>
            </button>
          </div>

          {/* Mobile Actions: 100% responsive, zero overflow, perfectly proportioned */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle className="w-8 h-8 min-h-[32px]" />

            <button
              type="button"
              onClick={toggleLang}
              className={`px-3 py-1 rounded-full text-xs font-semibold leading-4 transition-colors min-h-[32px] ${
                isDark
                  ? scrolled ? "bg-forest/60 text-ivory border border-ivory/15" : "bg-white/20 text-ivory"
                  : "bg-forest/5 text-forest border border-forest/15"
              }`}
              aria-label="Toggle Language"
            >
              {content.nav.toggleLangLabel}
            </button>

            <button
              type="button"
              onClick={() => openInquiry()}
              className="flex items-center justify-center p-2 rounded-full text-xs font-semibold leading-4 bg-leaf text-ivory hover:bg-leaf/90 shadow-sm min-h-[32px] min-w-[32px]"
              aria-label={content.nav.askPill}
              title={content.nav.askPill}
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
                isDark ? "text-ivory hover:bg-white/10" : "text-forest hover:bg-forest/10"
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className={`fixed inset-0 z-[95] backdrop-blur-md flex flex-col justify-start pt-20 px-4 sm:px-6 pb-8 md:hidden animate-in fade-in duration-200 ${
            isDark ? "bg-forest-deep/80" : "bg-forest/40"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`w-full rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border ${
              isDark
                ? "bg-forest-deep text-ivory border-ivory/15"
                : "bg-ivory text-forest border-forest/15 shadow-2xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between pb-4 border-b ${
              isDark ? "border-ivory/10" : "border-forest/10"
            }`}>
              <div>
                <span className={`font-heading font-extrabold text-base tracking-wider uppercase block leading-6 ${
                  isDark ? "text-ivory" : "text-forest"
                }`}>
                  Evergreen Ethiopia
                </span>
                <span className={`text-xs font-mono leading-4 ${
                  isDark ? "text-ivory/60" : "text-forest/60"
                }`}>
                  Addis Ababa · 2,350m Elevation
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 rounded-full ${
                  isDark ? "hover:bg-ivory/10 text-ivory" : "hover:bg-forest/10 text-forest"
                }`}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2 px-3 rounded-xl transition-colors flex items-center justify-between leading-6 ${
                    isDark
                      ? "text-ivory hover:text-leaf hover:bg-ivory/5"
                      : "text-forest hover:text-leaf hover:bg-forest/5"
                  }`}
                >
                  <span>{link.label}</span>
                  <Leaf className="w-4 h-4 text-leaf opacity-80" />
                </a>
              ))}
            </nav>

            <div className={`pt-4 border-t flex flex-col gap-3 ${
              isDark ? "border-ivory/10" : "border-forest/10"
            }`}>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInquiry();
                }}
                className="w-full py-4 rounded-full bg-leaf text-ivory font-semibold text-base leading-6 flex items-center justify-center gap-2 shadow-sm active:scale-95 min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{content.nav.askPill}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${content.brand.phonePrimaryRaw}`}
                  className={`py-3 px-3 rounded-xl font-semibold text-xs leading-4 flex items-center justify-center gap-2 border shadow-sm truncate min-h-[48px] ${
                    isDark
                      ? "bg-forest/80 text-ivory border-ivory/15"
                      : "bg-white text-forest border-forest/15"
                  }`}
                  aria-label={`Call ${content.brand.phonePrimary}`}
                >
                  <Phone className="w-4 h-4 text-leaf shrink-0" />
                  <span className="truncate">{content.brand.phonePrimary}</span>
                </a>

                <a
                  href={`tel:${content.brand.phoneSecondaryRaw}`}
                  className={`py-3 px-3 rounded-xl font-semibold text-xs leading-4 flex items-center justify-center gap-2 border shadow-sm truncate min-h-[48px] ${
                    isDark
                      ? "bg-forest/80 text-ivory border-ivory/15"
                      : "bg-white text-forest border-forest/15"
                  }`}
                  aria-label={`Call ${content.brand.phoneSecondary}`}
                >
                  <Phone className="w-4 h-4 text-leaf shrink-0" />
                  <span className="truncate">{content.brand.phoneSecondary}</span>
                </a>
              </div>

              {/* Clickable Email in Mobile Drawer */}
              <a
                href={`mailto:${content.brand.email}`}
                className={`py-3 px-3 rounded-xl font-semibold text-xs leading-4 flex items-center justify-center gap-2 border min-h-[48px] ${
                  isDark
                    ? "bg-forest/50 text-ivory border-ivory/15"
                    : "bg-white text-forest border-forest/15"
                }`}
                aria-label={`Email ${content.brand.email}`}
              >
                <Mail className="w-4 h-4 text-leaf shrink-0" />
                <span className="truncate">{content.brand.email}</span>
              </a>

              <div className={`flex items-center justify-between pt-2 text-xs font-mono leading-4 ${
                isDark ? "text-ivory/70" : "text-forest/70"
              }`}>
                <span>Addis Ababa, Ethiopia</span>
                <span className="text-leaf font-semibold">{content.brand.handle}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
