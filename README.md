<div align="center">

# 🌿 Evergreen Ethiopia · ኤቨርግሪን ኢትዮጵያ

### Botanical Nursery & Highland Acclimatized Plants in Addis Ababa & Bishoftu

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Neon Postgres](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)

<p align="center">
  <b>Plants for every space.</b> Acclimatized to 2,350m elevation in Bishoftu (Debrezeit) with doorstep delivery across Addis Ababa and throughout Ethiopia.
</p>

</div>

---

## 📸 Preview (Dark Mode Hero)

![Evergreen Ethiopia Landing Page - Dark Mode Hero](./screenshots/09_desktop_hero.png)

---

## ✨ About the Project

**Evergreen Ethiopia** is a modern, bilingual web platform engineered for Addis Ababa and Bishoftu's premier botanical plant nursery. 

Ethiopian highland conditions (elevations between 1,900m and 2,500m) present unique microclimates: high UV radiation, dry ambient humidity during the dry season, and distinct diurnal temperature shifts. Every specimen in our nursery—from broadleaf indoor Monsteras and Fiddle Leaf Figs to indigenous African Olive (*Weira*) and highland Bougainvillea—is carefully conditioned to thrive in domestic homes, commercial corporate offices, and outdoor landscape environments.

The site is built with an **inquiry-first architecture**: rather than enforcing impersonal automated checkouts for live botanical specimens, customers connect directly with nursery horticulturists via prefilled WhatsApp links, Telegram, or phone to confirm health, size, pot selections, and personalized care guidance.

---

## 🌟 Key Features

- **🌙 Immersive Botanical Dark & Light Modes**
  - **Forest Deep (`#071B14`)** dark palette inspired by lush Ethiopian cloud forests, accented with glowing leaf emeralds (`#2F9E66`) and soft ivory typography.
  - Organic **Ivory (`#F7F5EE`)** light theme for clean daylight browsing.
  - Persistent theme toggle with smooth transitions and noise texture overlays.

- **🌍 Full Bilingual Localization (English & አማርኛ)**
  - Seamless, instant language switching across the entire catalog and UI.
  - Native Ethiopic typography utilizing Google Fonts (*Noto Serif Ethiopic* & *Noto Sans Ethiopic*) paired with *Cormorant Garamond* and *Plus Jakarta Sans*.

- **🪴 Curated Highland Plant Catalog & Finder**
  - Filterable by environment (Low-Light Interior, Direct Highland Sun, Balcony & Patio, Pet-Friendly, Indigenous).
  - Detailed plant cards highlighting light requirements, watering cycles, container specs, and genuine stock states (`In Stock`, `Ask Nursery`, `Seasonal`).

- **📑 Three-Step Highland Care Guide**
  - Accordion modules detailing light placement, highland watering cadence (adjusting for wet *Kiremt* vs. dry *Bega* seasons), and Ethiopian volcanic soil mixes.

- **💬 Frictionless Inquiry Bottom Sheet & Modal**
  - Quick inquiry sheet that opens instantly on mobile or desktop when clicking "Inquire" or any plant's "Ask" button.
  - Auto-generates clean, prefilled WhatsApp and Telegram order requests with zero friction.

- **🎵 TikTok Community Spotlight**
  - Integrated audience panel reflecting the vibrant community of **13.4K+ followers** and **81.3K+ likes** from [@evergreen_ethiopia](https://tiktok.com/@evergreen_ethiopia).

- **📱 Mobile-First Architecture**
  - Floating frosted island navigation, sticky mobile contact bar, responsive drawers, and tactile micro-interactions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Frontend UI** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) |
| **Animations** | [GSAP 3 (GreenSock)](https://gsap.com/) |
| **Database ORM** | [Prisma](https://www.prisma.io/) with PostgreSQL schema |
| **Cloud Database** | [Neon Serverless PostgreSQL](https://neon.tech/) |
| **Typography** | Cormorant Garamond, DM Sans, Plus Jakarta Sans, Noto Sans Ethiopic, Noto Serif Ethiopic, IBM Plex Mono |

---

## 📂 Project Structure

```
evergreen/
├── prisma/
│   └── schema.prisma         # PostgreSQL schema (Plants, Categories, Inquiries, Outbox)
├── public/
│   ├── favicon.ico           # Favicon & icons
│   ├── logo-evergreen.png    # Evergreen Ethiopia seal
│   └── video/                # Compressed atmospheric nursery video loops
├── screenshots/              # High-resolution UI captures (desktop & mobile)
│   ├── 09_desktop_hero.png   # Desktop hero showcase (dark mode)
│   └── ...
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind v4 configuration, theme variables & utilities
│   │   ├── layout.tsx        # Root HTML layout, SEO metadata, theme & font providers
│   │   ├── not-found.tsx     # Custom 404 botanical fallback
│   │   └── page.tsx          # Main modular landing page
│   ├── components/
│   │   ├── FloatingNav.tsx         # Floating island header with theme & language toggle
│   │   ├── HeroSection.tsx         # Full-bleed atmospheric hero with highland RH status
│   │   ├── SplitIntro.tsx          # Nursery philosophy and acclimatization intro
│   │   ├── PlantFinderSection.tsx  # Filter chips and Star Plants catalog grid
│   │   ├── PlantCard.tsx           # Plant card with detail view and inquiry triggers
│   │   ├── CareAccordions.tsx      # Light, Water, Soil care guide accordions
│   │   ├── FoliageParallaxBand.tsx # Parallax foliage spacer band
│   │   ├── FourStepsProcess.tsx    # 4-step ordering guide (Ask, Confirm, Deliver, Grow)
│   │   ├── ThreePathsCards.tsx     # Shop Plants, Plant Care, and Project consultation
│   │   ├── TikTokAudiencePanel.tsx # TikTok community showcase and viral clips
│   │   ├── FAQSection.tsx          # Community FAQ with collapsible answers
│   │   ├── InquirySheet.tsx        # Responsive inquiry bottom sheet & modal
│   │   ├── StickyMobileBar.tsx     # Quick call / WhatsApp sticky bar for mobile
│   │   └── WordmarkFooter.tsx      # 4-column footer with verified Bishoftu & Addis contacts
│   ├── context/
│   │   ├── LanguageContext.tsx     # English & Amharic i18n state provider
│   │   ├── ThemeContext.tsx        # Dark & Light theme state provider
│   │   └── InquiryContext.tsx      # Active plant inquiry state manager
│   └── data/
│       └── content.ts              # Curated botanical catalog and bilingual copy
├── .env.example              # Sample environment configuration
├── .gitignore                # Production git ignore rules
├── next.config.ts            # Next.js build configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript compiler settings
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v20.x` or higher recommended
- **npm**, **pnpm**, or **yarn**

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/NatBabi/evergreen.git
cd evergreen
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Configure your PostgreSQL database connection strings:

```env
DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-1.aws.neon.tech/evergreen?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-sample.us-east-1.aws.neon.tech/evergreen?sslmode=require"
```

### 4. Database Setup (Optional for Local DB work)

Generate the Prisma client:

```bash
npx prisma generate
```

To sync schema migrations with your database:

```bash
npx prisma db push
```

### 5. Running the Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 6. Building for Production

Compile an optimized production build:

```bash
npm run build
npm run start
```

---

## 🌿 Architectural Principles

1. **Inquiry Over Blind Checkout**: Living plants are delicate living organisms. Direct communication guarantees customers receive specimens matching their exact lighting and space requirements.
2. **Honest Stock & Elevation Guidance**: We never display artificial inventory counts or misleading stock timers. Plants are labeled as `In Stock`, `Ask Nursery`, `Seasonal`, or `Out of Stock`.
3. **Highland Performance**: Acclimatized for 2,350m elevation where high UV and variable mountain humidity require hearty root systems and proper soil drainage.
4. **Fast, Privacy-Focused Frontend**: Zero bloated third-party trackers. Instant client-side theme and language toggling with minimal footprint.

---

## 📞 Nursery Location & Contact

- **Nursery Base**: Bishoftu (Debrezeit), Oromia, Ethiopia
- **Addis Ababa Distribution Hub**: Bole / Kazanchis Doorstep Dispatch
- **Phone / Telegram**: [+251 91 123 4567](tel:+251911234567)
- **TikTok**: [@evergreen_ethiopia](https://tiktok.com/@evergreen_ethiopia)
- **WhatsApp**: Direct chat via website prefilled links

---

## 📄 License

Private repository © [Evergreen Ethiopia](https://github.com/NatBabi/evergreen). All rights reserved.
