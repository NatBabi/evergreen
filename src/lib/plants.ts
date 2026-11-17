import { prisma, isDatabaseConfigured } from "./db";
import { starPlantsEN, PlantItem } from "@/data/content";
import { requireAdminAuth } from "./auth";

export interface DatabasePlantWithRelations {
  id: number;
  slug: string;
  nameEn: string;
  nameAm: string | null;
  botanicalName: string | null;
  priceEtb: any;
  stockStatus: string;
  sizeNote: string | null;
  light: string | null;
  water: string | null;
  difficulty: string | null;
  descriptionEn: string | null;
  descriptionAm: string | null;
  published: boolean;
  updatedAt: Date;
  variants: Array<{
    id: number;
    nameEn: string;
    nameAm: string | null;
    heightRange: string | null;
    priceEtb: any;
    stockStatus: string;
    isDefault: boolean;
    sortOrder: number;
  }>;
  images: Array<{
    id: number;
    url: string;
    altEn: string | null;
    altAm: string | null;
    sort: number;
  }>;
  category?: {
    id: number;
    slug: string;
    nameEn: string;
    nameAm: string | null;
  };
}

/**
 * Maps database plant records into the exact PlantItem schema
 * consumed by existing frontend components, preserving 100% of the UI design.
 */
function mapDatabaseToPlantItem(dbPlant: DatabasePlantWithRelations, lang: "en" | "am" = "en"): PlantItem {
  const isAm = lang === "am";
  const primaryPrice = Number(dbPlant.priceEtb || 0);
  const primaryImage = dbPlant.images?.[0]?.url || "https://images.unsplash.com/photo-1614594975525-e45190c55d0b";
  const galleryUrls = dbPlant.images?.map((i) => i.url) || [primaryImage];

  // Map stock status to human-readable label
  const statusLabel =
    dbPlant.stockStatus === "in_stock"
      ? isAm ? "በክምችት አለ" : "In stock"
      : dbPlant.stockStatus === "ask"
      ? isAm ? "ያረጋግጡ" : "Ask Nursery"
      : dbPlant.stockStatus === "seasonal"
      ? isAm ? "ወቅታዊ" : "Seasonal"
      : isAm ? "አልቋል" : "Out of stock";

  const statusCode = (
    ["in_stock", "ask", "seasonal"].includes(dbPlant.stockStatus)
      ? dbPlant.stockStatus
      : "ask"
  ) as "in_stock" | "ask" | "seasonal";

  // Check if we have pre-defined matching copy in starPlants to retain rich CRO text
  const match = starPlantsEN.find((p: PlantItem) => p.slug === dbPlant.slug);

  return {
    id: dbPlant.slug,
    slug: dbPlant.slug,
    commonName: isAm && dbPlant.nameAm ? dbPlant.nameAm : dbPlant.nameEn,
    botanicalName: dbPlant.botanicalName || match?.botanicalName || "",
    amharicName: dbPlant.nameAm || match?.amharicName || dbPlant.nameEn,
    trait: (isAm ? dbPlant.descriptionAm : dbPlant.descriptionEn) || match?.trait || "",
    categories: match?.categories || ["beginner"],
    light: dbPlant.light || match?.light || "Bright indirect",
    water: dbPlant.water || match?.water || "Every 7–10 days",
    size: dbPlant.sizeNote || match?.size || "60–100 cm",
    availability: statusLabel,
    availabilityCode: statusCode,
    price: primaryPrice > 0 ? `from ${primaryPrice.toLocaleString()} ETB` : match?.price || "from 850 ETB",
    priceETB: primaryPrice > 0 ? primaryPrice : match?.priceETB || 850,
    image: primaryImage,
    imageAlt: (isAm ? dbPlant.images?.[0]?.altAm : dbPlant.images?.[0]?.altEn) || match?.imageAlt || dbPlant.nameEn,
    careSnippet: match?.careSnippet || (isAm ? "በቀላሉ የሚያድግ ተክል።" : "Highland acclimatized nursery stock."),
    statusBadge: match?.statusBadge || "Highland Acclimatized",
    outcomeLine: match?.outcomeLine || (isAm ? dbPlant.descriptionAm || "" : dbPlant.descriptionEn || ""),
    chips: match?.chips || {
      light: dbPlant.light || "Bright indirect",
      care: dbPlant.difficulty || "Easy care",
      petSafe: "Indoor & Home Safe",
    },
    hoverTooltip: match?.hoverTooltip || "Acclimatized to Addis Ababa elevation.",
    outcomeCta: match?.outcomeCta || (isAm ? "ይህንን ተክል ይጠይቁ" : "Ask about this plant"),
    rating: match?.rating || 4.9,
    reviewsCount: match?.reviewsCount || 45,
    deliveryMetric: match?.deliveryMetric || "Doorstep delivery in Addis Ababa",
    bundleCardA: match?.bundleCardA || {
      title: isAm ? "ተክሉ ብቻ" : "Plant only",
      price: `from ${primaryPrice} birr`,
      reassurances: ["Delivered to Addis", "Healthy grower pot", "Highland acclimatized"],
    },
    bundleCardB: match?.bundleCardB || {
      title: isAm ? "ተክል + ሸክላ + የእንክብካቤ መመሪያ" : "Plant + pot + care guide",
      price: `from ${Math.round(primaryPrice * 1.55)} birr`,
      savings: "save 18% vs. separate",
      badge: "Most Popular",
      reassurances: ["Healthy guarantee", "Glazed ceramic pot", "Care tips on WhatsApp"],
    },
    gallery: galleryUrls.length > 0 ? galleryUrls : match?.gallery || [primaryImage],
    careAccordions: match?.careAccordions || [],
  };
}

/**
 * Public: Get all published plants with database-first fallback
 */
export async function getLivePlants(lang: "en" | "am" = "en"): Promise<PlantItem[]> {
  if (isDatabaseConfigured()) {
    try {
      const dbPlants = await prisma.plant.findMany({
        where: { published: true },
        include: {
          variants: { orderBy: { sortOrder: "asc" } },
          images: { orderBy: { sort: "asc" } },
          category: true,
        },
        orderBy: { id: "asc" },
      });

      if (dbPlants && dbPlants.length > 0) {
        return dbPlants.map((p: any) => mapDatabaseToPlantItem(p, lang));
      }
    } catch (err) {
      console.warn("Database plant fetch failed, using fallback catalog:", err instanceof Error ? err.message : err);
    }
  }

  // Graceful fallback to verified existing static catalog
  return starPlantsEN;
}

/**
 * Public: Get a single plant by slug
 */
export async function getLivePlantBySlug(slug: string, lang: "en" | "am" = "en"): Promise<PlantItem | null> {
  if (isDatabaseConfigured()) {
    try {
      const dbPlant = await prisma.plant.findUnique({
        where: { slug },
        include: {
          variants: { orderBy: { sortOrder: "asc" } },
          images: { orderBy: { sort: "asc" } },
          category: true,
        },
      });

      if (dbPlant) {
        return mapDatabaseToPlantItem(dbPlant as any, lang);
      }
    } catch (err) {
      console.warn(`Database plant fetch failed for slug "${slug}", using fallback:`, err instanceof Error ? err.message : err);
    }
  }

  const match = starPlantsEN.find((p: PlantItem) => p.slug === slug);
  return match || null;
}

/**
 * Admin: Get all plants for the dashboard with variants and raw database fields
 * Protected by server-side authorization check.
 */
export async function adminGetAllPlants(): Promise<DatabasePlantWithRelations[]> {
  await requireAdminAuth();

  if (isDatabaseConfigured()) {
    try {
      const dbPlants = await prisma.plant.findMany({
        include: {
          variants: { orderBy: { sortOrder: "asc" } },
          images: { orderBy: { sort: "asc" } },
          category: true,
        },
        orderBy: { id: "asc" },
      });
      return dbPlants as any;
    } catch (err) {
      console.error("Admin plant fetch failed:", err);
    }
  }

  // If DB not yet migrated, map starPlantsEN into database representation for preview
  return starPlantsEN.map((p, idx) => ({
    id: idx + 1,
    slug: p.slug,
    nameEn: p.commonName,
    nameAm: p.amharicName || null,
    botanicalName: p.botanicalName || null,
    priceEtb: p.priceETB,
    stockStatus: p.availabilityCode === "in_stock" ? "in_stock" : p.availabilityCode === "seasonal" ? "seasonal" : "ask",
    sizeNote: p.size,
    light: p.light,
    water: p.water,
    difficulty: p.chips?.care || "Easy",
    descriptionEn: p.trait,
    descriptionAm: null,
    published: true,
    updatedAt: new Date(),
    variants: [
      {
        id: idx * 10 + 1,
        nameEn: "Tabletop",
        nameAm: "የጠረጴዛ",
        heightRange: "35–45 cm",
        priceEtb: p.priceETB,
        stockStatus: "in_stock",
        isDefault: true,
        sortOrder: 1,
      },
      {
        id: idx * 10 + 2,
        nameEn: "Living Room",
        nameAm: "የሳሎን",
        heightRange: "70–85 cm",
        priceEtb: Math.round(p.priceETB * 1.55),
        stockStatus: "in_stock",
        isDefault: false,
        sortOrder: 2,
      },
    ],
    images: (p.gallery || [p.image]).map((url, imgIdx) => ({
      id: idx * 10 + imgIdx + 1,
      url,
      altEn: `${p.commonName} image ${imgIdx + 1}`,
      altAm: null,
      sort: imgIdx,
    })),
  }));
}

/**
 * Admin: Get single plant by ID
 */
export async function adminGetPlantById(id: number): Promise<DatabasePlantWithRelations | null> {
  await requireAdminAuth();

  if (isDatabaseConfigured()) {
    const plant = await prisma.plant.findUnique({
      where: { id },
      include: {
        variants: { orderBy: { sortOrder: "asc" } },
        images: { orderBy: { sort: "asc" } },
        category: true,
      },
    });
    return plant as any;
  }

  const all = await adminGetAllPlants();
  return all.find((p) => p.id === id) || null;
}

/**
 * Admin: Quick-update stock status
 * Protected by server-side authorization check.
 */
export async function adminUpdateStockStatus(id: number, stockStatus: "in_stock" | "ask" | "seasonal" | "out") {
  const session = await requireAdminAuth();

  if (!isDatabaseConfigured()) {
    throw new Error("Database connection not configured. Please supply DATABASE_URL in .env.local to persist changes.");
  }

  const updated = await prisma.plant.update({
    where: { id },
    data: { stockStatus: stockStatus as any },
  });

  // Log audit
  await prisma.auditLog.create({
    data: {
      adminId: session.userId || null,
      action: "UPDATE_STOCK_STATUS",
      entity: "Plant",
      entityId: String(id),
    },
  });

  return updated;
}

/**
 * Admin: Update full plant details
 * Protected by server-side authorization check.
 */
export async function adminUpdatePlant(
  id: number,
  data: {
    nameEn?: string;
    nameAm?: string;
    botanicalName?: string;
    priceEtb?: number;
    stockStatus?: "in_stock" | "ask" | "seasonal" | "out";
    descriptionEn?: string;
    descriptionAm?: string;
    sizeNote?: string;
    published?: boolean;
    variants?: Array<{
      id?: number;
      nameEn: string;
      nameAm?: string;
      heightRange?: string;
      priceEtb: number;
      stockStatus: "in_stock" | "ask" | "seasonal" | "out";
      isDefault: boolean;
      sortOrder: number;
    }>;
  }
) {
  const session = await requireAdminAuth();

  if (!isDatabaseConfigured()) {
    throw new Error("Database connection not configured. Please supply DATABASE_URL in .env.local to persist changes.");
  }

  const updateData: any = {};
  if (data.nameEn !== undefined) updateData.nameEn = data.nameEn;
  if (data.nameAm !== undefined) updateData.nameAm = data.nameAm;
  if (data.botanicalName !== undefined) updateData.botanicalName = data.botanicalName;
  if (data.priceEtb !== undefined) updateData.priceEtb = data.priceEtb;
  if (data.stockStatus !== undefined) updateData.stockStatus = data.stockStatus;
  if (data.descriptionEn !== undefined) updateData.descriptionEn = data.descriptionEn;
  if (data.descriptionAm !== undefined) updateData.descriptionAm = data.descriptionAm;
  if (data.sizeNote !== undefined) updateData.sizeNote = data.sizeNote;
  if (data.published !== undefined) updateData.published = data.published;

  const updated = await prisma.plant.update({
    where: { id },
    data: updateData,
  });

  // Handle variants if provided
  if (data.variants && Array.isArray(data.variants)) {
    for (const v of data.variants) {
      if (v.id) {
        await prisma.plantVariant.update({
          where: { id: v.id },
          data: {
            nameEn: v.nameEn,
            nameAm: v.nameAm || null,
            heightRange: v.heightRange || null,
            priceEtb: v.priceEtb,
            stockStatus: v.stockStatus as any,
            isDefault: v.isDefault,
            sortOrder: v.sortOrder,
          },
        });
      } else {
        await prisma.plantVariant.create({
          data: {
            plantId: id,
            nameEn: v.nameEn,
            nameAm: v.nameAm || null,
            heightRange: v.heightRange || null,
            priceEtb: v.priceEtb,
            stockStatus: v.stockStatus as any,
            isDefault: v.isDefault,
            sortOrder: v.sortOrder,
          },
        });
      }
    }
  }

  // Audit log
  await prisma.auditLog.create({
    data: {
      adminId: session.userId || null,
      action: "UPDATE_PLANT",
      entity: "Plant",
      entityId: String(id),
    },
  });

  return updated;
}
