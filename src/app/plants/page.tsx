import type { Metadata } from "next";
import PlantsCatalogClient from "./PlantsCatalogClient";

export const metadata: Metadata = {
  title: "Plant catalog — Indoor and outdoor plants in Addis Ababa",
  description:
    "Browse Evergreen Ethiopia's highland-acclimatized plant catalog. Monstera, Bougainvillea, succulents, fruit trees, and native greenery with prices and 24–48 h delivery in Addis Ababa.",
  alternates: {
    canonical: "/plants",
  },
  openGraph: {
    title: "Plant catalog · Evergreen Ethiopia",
    description:
      "Indoor and outdoor plants acclimatized to Addis Ababa's highland conditions. Browse our catalog with prices and delivery details.",
    url: "https://evergreen-natbabi.vercel.app/plants",
    images: [
      {
        url: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Evergreen Ethiopia plant catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plant catalog · Evergreen Ethiopia",
    description:
      "Browse highland-acclimatized plants for Addis Ababa with prices and delivery info.",
  },
};

export default function PlantsCatalogPage() {
  return <PlantsCatalogClient />;
}
