import type { MetadataRoute } from "next";
import { getLivePlants } from "@/lib/plants";
import { starPlantsEN } from "@/data/content";

const SITE_URL = "https://evergreen-ethiopia.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/plants`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic plant detail routes — database-backed or fallback catalog
  let plants = starPlantsEN;
  try {
    const live = await getLivePlants("en");
    if (live && live.length > 0) {
      plants = live;
    }
  } catch {
    // Graceful fallback to starPlantsEN
  }

  const plantRoutes: MetadataRoute.Sitemap = plants.map((plant) => ({
    url: `${SITE_URL}/plants/${plant.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...plantRoutes];
}
