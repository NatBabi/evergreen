import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { LanguageProvider } from "@/context/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "Evergreen Ethiopia · Botanical Nursery & Plants in Addis Ababa",
    template: "%s | Evergreen Ethiopia",
  },
  description:
    "Addis Ababa's trusted highland botanical nursery. Indoor and outdoor plants, potted Monstera, Bougainvillea, fruit trees, and native greenery acclimatized to 2,350m elevation. Order requests via WhatsApp and phone with careful door delivery across Ethiopia (@evergreen_ethiopia).",
  keywords: [
    "Evergreen Ethiopia",
    "Ethiopian plant nursery",
    "Addis Ababa plants",
    "indoor plants Ethiopia",
    "monstera ethiopia",
    "bougainvillea ethiopia",
    "botanical Ethiopia",
    "potted plants Addis Ababa",
    "trees delivered Addis Ababa",
  ],
  authors: [{ name: "Evergreen Ethiopia" }],
  metadataBase: new URL("https://evergreen-ethiopia.vercel.app"),
  openGraph: {
    title: "Evergreen Ethiopia · Botanical Nursery & Plants in Addis Ababa",
    description:
      "Indoor and outdoor plants, native and ornamental trees acclimatized to Ethiopian highland conditions. Order requests via phone and WhatsApp with doorstep delivery.",
    url: "https://evergreen-ethiopia.vercel.app",
    siteName: "Evergreen Ethiopia",
    locale: "en_US",
    alternateLocale: ["am_ET"],
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Evergreen Ethiopia Botanical Nursery Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evergreen Ethiopia · Botanical Nursery & Plants in Addis Ababa",
    description:
      "Indoor and outdoor plants, native and ornamental trees delivered across Ethiopia. Follow @evergreen_ethiopia.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo-evergreen.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#123D2B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { InquiryProvider } from "@/context/InquiryContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,600&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+Ethiopic:wght@400;500;600;700&family=Noto+Serif+Ethiopic:wght@400;600;700&family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
        />
      </head>
      <body className="min-h-screen bg-forest-deep text-ivory font-sans antialiased selection:bg-leaf selection:text-ivory transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <InquiryProvider>
              <NoiseOverlay />
              {children}
            </InquiryProvider>
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
