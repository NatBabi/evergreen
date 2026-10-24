import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { starPlantsEN } from "@/data/content";
import { PlantDetailClient } from "./PlantDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return starPlantsEN.map((plant) => ({
    slug: plant.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const plant = starPlantsEN.find((p) => p.slug === resolvedParams.slug);

  if (!plant) {
    return {
      title: "Plant Not Found · Evergreen Ethiopia",
    };
  }

  return {
    title: `${plant.commonName} (${plant.amharicName}) · Acclimatized Plants in Addis Ababa · Evergreen Ethiopia`,
    description: `${plant.outcomeLine} Acclimatized to Addis Ababa (2,100m) with 24–48h doorstep delivery and ongoing WhatsApp care support.`,
    openGraph: {
      title: `${plant.commonName} · Evergreen Ethiopia`,
      description: plant.outcomeLine,
      images: [{ url: plant.image, alt: plant.imageAlt }],
    },
  };
}

function PlantDetailSkeleton() {
  return (
    <div className="relative min-h-screen flex flex-col bg-ivory text-forest">
      {/* Header skeleton */}
      <header className="sticky top-0 z-40 w-full bg-ivory/90 backdrop-blur-md border-b border-forest/10 py-4 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1128px] mx-auto flex items-center justify-between gap-4">
          <div className="h-4 w-24 bg-forest/10 rounded animate-pulse" />
          <div className="hidden sm:block h-10 w-64 bg-forest/8 rounded-full animate-pulse" />
          <div className="h-6 w-32 bg-forest/10 rounded animate-pulse" />
          <div className="h-10 w-32 bg-forest/10 rounded-full animate-pulse" />
        </div>
      </header>

      {/* Main product skeleton */}
      <main className="flex-1 w-full max-w-[1128px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        {/* Breadcrumbs skeleton */}
        <div className="mb-6 h-4 w-48 bg-forest/10 rounded animate-pulse" />

        {/* 2-Column Product Layout skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-2xl bg-forest/10 animate-pulse"
                />
              ))}
            </div>
            <div className="flex-1 aspect-[4/5] rounded-3xl bg-forest/10 animate-pulse border border-forest/10" />
          </div>

          {/* Right Column: Information & Selection */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="h-6 w-32 bg-forest/10 rounded-full animate-pulse" />
              <div className="h-10 w-3/4 bg-forest/10 rounded-lg animate-pulse" />
              <div className="h-4 w-1/2 bg-forest/10 rounded animate-pulse" />
            </div>

            {/* Chips row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="h-8 w-28 bg-forest/10 rounded-full animate-pulse" />
              <div className="h-8 w-24 bg-forest/10 rounded-full animate-pulse" />
              <div className="h-8 w-32 bg-forest/10 rounded-full animate-pulse" />
            </div>

            {/* Sizing options */}
            <div className="h-20 bg-forest/5 border border-forest/10 rounded-2xl animate-pulse" />

            {/* Package cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-48 bg-forest/5 border border-forest/10 rounded-2xl animate-pulse" />
              <div className="h-48 bg-leaf/10 border-2 border-leaf/30 rounded-2xl animate-pulse" />
            </div>

            {/* CTA button */}
            <div className="h-12 bg-forest/20 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Explore more plants skeleton */}
        <div className="pt-8 pb-12 border-t border-forest/10 space-y-6">
          <div className="space-y-2 text-center max-w-[720px] mx-auto">
            <div className="h-6 w-48 bg-forest/10 rounded-full animate-pulse mx-auto" />
            <div className="h-8 w-80 bg-forest/10 rounded-lg animate-pulse mx-auto" />
          </div>
          <div className="h-12 max-w-[720px] mx-auto bg-forest/10 rounded-full animate-pulse" />
          <div className="flex justify-center gap-2 overflow-hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-28 bg-forest/10 rounded-full animate-pulse shrink-0" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 bg-forest/5 rounded-3xl animate-pulse border border-forest/10" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

async function PlantContent({ params }: PageProps) {
  const resolvedParams = await params;
  const plant = starPlantsEN.find((p) => p.slug === resolvedParams.slug);

  if (!plant) {
    notFound();
  }

  return <PlantDetailClient plant={plant} />;
}

export default function PlantDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<PlantDetailSkeleton />}>
      <PlantContent params={params} />
    </Suspense>
  );
}
