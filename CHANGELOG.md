# Changelog

All notable changes to the Evergreen Ethiopia botanical nursery platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-10-29

### Removed
- **Landing Page Section Eyebrows**: Removed redundant pill badges and eyebrow text above section headings across `SplitIntro`, `PlantFinderSection`, `ThreePathsCards`, `TikTokAudiencePanel`, and `FAQSection`, allowing sections to lead directly with their primary editorial titles.

## [0.1.1] - 2026-10-27

### Performance Optimizations (Frontend)
- **Eliminated Render-Blocking Font `@import`**: Removed redundant `@import url()` inside `globals.css` to prevent CSSOM parser pauses; fonts load with `preconnect` in layout head.
- **Hero Video & Poster Optimization**: Changed video preload to `preload="metadata"` in `HeroSection.tsx`, preventing 7.68 MB download contention during initial paint. Reduced poster size to `w=1600&q=75` and added high-priority image preloading in `<head>`.
- **Code-Splitting & Dynamic Modal Imports**: Lazy-loaded `InquirySheet` across landing, catalog (`/plants`), and specimen detail pages (`/plants/[slug]`) via `next/dynamic`, deferring modal dialog JavaScript from initial critical path.
- **Enabled Responsive Next.js Image Optimization**: Removed `unoptimized` flag across all plant showcase cards, canopy backgrounds, TikTok panels, and specimen photo galleries, converting Unsplash images to responsive AVIF/WebP. Added `loading="lazy"` on below-the-fold assets.

## [0.1.0] - 2026-10-27

### Added
- **Curated Botanical Catalog (`/plants`)**: Star plant catalog with 6 filter chips (*Total Beginners*, *Low Light*, *Sunny Garden*, *Flowering*, *Fruit at Home*, *Pet-Friendly*) and instant search.
- **Specimen Detail Pages (`/plants/[slug]`)**: Dedicated plant showcases with multi-angle galleries, size variant selectors (*Tabletop*, *Living Room*, *Statement*), and bundle savings.
- **Bilingual English & Amharic Localization**: Full localization across landing page, plant catalog, care guides, and inquiries with Noto Serif Ethiopic & Noto Sans Ethiopic typography.
- **Immersive Botanical Dark & Light Modes**: Deep forest cloud-theme (`#071B14`) and daylight mist (`#F7F5EE`) with seamless persistent toggle.
- **Highland Plant Care Guides**: Three-step guidance tailored for Addis Ababa's 2,350m elevation (lighting, seasonal watering for *Kiremt* vs *Bega*, and volcanic soil mixes).
- **Direct WhatsApp & Telegram Inquiry Sheet**: Frictionless bottom sheet and modal compiling specimen details into prefilled nursery messaging orders.
- **Vercel Speed Insights**: Real-time Core Web Vitals telemetry for user experience monitoring.
- **Custom Production Domain**: Configured and verified `https://evergreen-ethiopia.vercel.app`.

### Changed
- Configured `metadataBase` and OpenGraph URLs in root layout to `https://evergreen-ethiopia.vercel.app`.
- Configured Vercel project framework to Next.js with optimized production build commands.

### Fixed
- Removed platform-specific `@next/swc-win32-x64-msvc` to resolve Linux Vercel CI build failure (`EBADPLATFORM`).
- Resolved Next.js 16 prerender errors by eliminating dynamic runtime date evaluations during static generation.
- Corrected TypeScript types and eliminated unused imports across plant catalog components.
