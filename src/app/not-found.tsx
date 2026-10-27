"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, MessageCircle, Phone, Mail, Sparkles, Sprout } from "lucide-react";

export default function NotFound() {
  const year = 2026;
  return (
    <div className="min-h-screen bg-ivory text-forest flex flex-col justify-between selection:bg-leaf selection:text-ivory">
      {/* Top Bar with Logo */}
      <header className="w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-forest/10">
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf rounded-full"
          aria-label="Evergreen Ethiopia Home"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-ivory flex items-center justify-center p-1 border border-forest/20 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
            <Image
              src="/logo-evergreen.png"
              alt="Evergreen Ethiopia Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base tracking-wider uppercase leading-6">
              Evergreen
            </span>
            <span className="text-xs tracking-widest uppercase opacity-80 mt-1 font-mono font-semibold leading-4">
              Ethiopia · 2,350m
            </span>
          </div>
        </Link>

        <a
          href="https://wa.me/251942461641?text=Hello%20Evergreen%20Ethiopia%2C%20I%20have%20an%20inquiry%20regarding%20your%20plants."
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-leaf text-ivory text-xs font-semibold hover:bg-leaf/90 transition-all flex items-center gap-2 shadow-sm leading-4 min-h-[40px]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp</span>
        </a>
      </header>

      {/* Main 404 Botanical Content */}
      <main className="max-w-[720px] mx-auto px-4 sm:px-8 py-16 sm:py-24 flex-1 flex flex-col items-center justify-center text-center">
        {/* Botanical Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/8 text-forest text-xs font-mono font-medium tracking-wide mb-6 leading-4">
          <Sprout className="w-4 h-4 text-leaf" />
          <span>404 · Plant Not Found / ገጹ አልተገኘም</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-[64px] text-forest tracking-tight leading-[44px] sm:leading-[72px] mb-6">
          This cutting hasn&apos;t{" "}
          <span className="font-serif italic font-normal text-leaf">rooted</span> yet.
        </h1>

        <p className="font-sans text-base sm:text-xl text-forest/75 max-w-[720px] leading-6 sm:leading-7 mb-8">
          The page or botanical specimen you are searching for might have moved, or the link has changed. Return to our live highland plant catalog or message our nursery team directly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-forest text-ivory font-semibold text-base leading-6 tracking-wide hover:bg-forest/90 transition-all flex items-center gap-2 shadow-sm active:scale-95 min-h-[48px]"
          >
            <Home className="w-4 h-4 text-leaf" />
            <span>Return to Catalog</span>
          </Link>

          <Link
            href="/#care"
            className="px-6 py-3 rounded-full bg-sage/50 text-forest border border-forest/15 font-semibold text-base leading-6 tracking-wide hover:bg-sage transition-all flex items-center gap-2 active:scale-95 min-h-[48px]"
          >
            <Sparkles className="w-4 h-4 text-leaf" />
            <span>Highland Care Guide</span>
          </Link>
        </div>

        {/* Direct Help Callout */}
        <div className="w-full max-w-md p-6 rounded-2xl bg-sage/35 border border-forest/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-forest/80 font-mono leading-4">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-leaf" />
            <a href="tel:+251942461641" className="hover:text-leaf transition-colors font-semibold">
              0942 461 641
            </a>
          </div>
          <div className="hidden sm:block text-forest/30">|</div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-leaf" />
            <a href="mailto:hello@evergreenethiopia.com" className="hover:text-leaf transition-colors font-semibold">
              hello@evergreenethiopia.com
            </a>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 py-6 border-t border-forest/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-forest/60 gap-3 leading-4">
        <span>© {year} Evergreen Ethiopia. All rights reserved.</span>
        <span>Addis Ababa, Ethiopia · @evergreen_ethiopia</span>
      </footer>
    </div>
  );
}
