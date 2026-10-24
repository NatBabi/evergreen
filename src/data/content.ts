export interface PlantItem {
  id: string;
  slug: string;
  commonName: string;
  botanicalName: string;
  amharicName: string;
  trait: string;
  categories: ("beginner" | "low-light" | "sunny" | "flowers" | "fruit" | "pet-safe")[];
  light: string;
  water: string;
  size: string;
  availability: string;
  availabilityCode: "in_stock" | "ask" | "seasonal";
  price: string;
  priceETB: number;
  image: string;
  imageAlt: string;
  careSnippet: string;
  // CRO & Nourish Greens Principles
  statusBadge: string;
  outcomeLine: string;
  chips: {
    light: string;
    care: string;
    petSafe: string;
  };
  hoverTooltip: string;
  outcomeCta: string;
  rating: number;
  reviewsCount: number;
  deliveryMetric: string;
  bundleCardA: {
    title: string;
    price: string;
    reassurances: string[];
  };
  bundleCardB: {
    title: string;
    price: string;
    savings: string;
    badge: string;
    reassurances: string[];
  };
  gallery: string[];
  careAccordions: {
    title: string;
    content: string;
  }[];
}

export interface TrustAnchor {
  icon: "altitude" | "guarantee" | "delivery" | "support";
  title: string;
  subtext: string;
}

export interface CustomerTestimonial {
  name: string;
  neighborhood: string;
  plantName: string;
  photoUrl: string;
  quote: string;
  rating: number;
}

export interface CareAccordion {
  id: "light" | "water" | "soil";
  title: string;
  subtitle: string;
  keyAdvice: string;
  body: string;
  problemSolved: string;
  tiktokQuery: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface PathCard {
  id: "shop" | "care" | "projects";
  title: string;
  subtitle: string;
  description: string;
  highlighted: boolean;
  bulletPoints: string[];
  ctaText: string;
}

export interface TikTokVideoCard {
  id: string;
  title: string;
  plays: string;
  captionExcerpt: string;
  coverImage: string;
  verifiedUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  noteToConfirm?: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    subname: string;
    tagline: string;
    handle: string;
    tiktokUrl: string;
    phonePrimary: string;
    phoneSecondary: string;
    phonePrimaryRaw: string;
    phoneSecondaryRaw: string;
    email: string;
    verifiedFollowers: string;
    verifiedLikes: string;
    verifiedVideos: string;
    honestDisclaimer: string;
  };
  nav: {
    plants: string;
    companion: string;
    care: string;
    fourSteps: string;
    paths: string;
    fromTiktok: string;
    faq: string;
    askPill: string;
    toggleLangLabel: string;
  };
  hero: {
    badgeAboveHeadline: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    proofStrip: string;
    microReassurance: string;
    // legacy compatibility
    kicker: string;
    headlineMain: string;
    headlineItalic: string;
    headlineEnd: string;
    bioSupport: string;
    exploreBtn: string;
    careBtn: string;
    audienceBadge: string;
    illustrativeNotice: string;
  };
  trustStrip: TrustAnchor[];
  customerStories: CustomerTestimonial[];
  companion: {
    eyebrow: string;
    headlineSans: string;
    headlineItalic: string;
    headlineEnd: string;
    narrative: string;
    fact1Label: string;
    fact1Desc: string;
    fact2Label: string;
    fact2Desc: string;
    fact3Label: string;
    fact3Desc: string;
    featuredCardTitle: string;
    featuredPlant: PlantItem;
    askButton: string;
  };
  filters: {
    sectionHeadlineSans: string;
    sectionHeadlineItalic: string;
    chips: {
      id: "all" | "beginner" | "low-light" | "sunny" | "flowers" | "fruit" | "pet-safe";
      label: string;
    }[];
  };
  plantsShowcase: {
    eyebrow: string;
    headlineSans: string;
    headlineItalic: string;
    items: PlantItem[];
    askCardBtn: string;
    askPriceBtn: string;
    illustrativeFooterNote: string;
    exploreCatalogBtn: string;
  };
  careSection: {
    eyebrow: string;
    headlineSans: string;
    headlineItalic: string;
    subtitle: string;
    accordions: CareAccordion[];
    tiktokLinkText: string;
  };
  foliageBand: {
    headlineSans: string;
    headlineItalic: string;
    headlineEnd: string;
    subtitle: string;
    cta: string;
  };
  fourSteps: {
    eyebrow: string;
    headlineSans: string;
    headlineItalic: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  threePaths: {
    eyebrow: string;
    headlineSans: string;
    headlineItalic: string;
    subtitle: string;
    paths: PathCard[];
    pricingNotice: string;
  };
  tiktokPanel: {
    eyebrow: string;
    headlineSans: string;
    headlineItalic: string;
    subtitle: string;
    statFollowers: string;
    statLikes: string;
    statVideos: string;
    videos: TikTokVideoCard[];
    visitTiktokBtn: string;
    commentInsight: string;
  };
  faq: {
    eyebrow: string;
    headlineSans: string;
    headlineItalic: string;
    subtitle: string;
    items: FAQItem[];
    confirmNotice: string;
  };
  footer: {
    aboutText: string;
    navTitle: string;
    contactTitle: string;
    deliveryTitle: string;
    deliveryBody: string;
    phonesNotice: string;
    ownerNotice: string;
    copyright: string;
    giantWordmark: string;
  };
  inquiryModal: {
    title: string;
    subtitle: string;
    plantSubjectLabel: string;
    generalSubject: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    whatsappDirectBtn: string;
    callPrimaryBtn: string;
    callSecondaryBtn: string;
    copyInquiryBtn: string;
    copiedSuccess: string;
    closeBtn: string;
    privacyNote: string;
  };
  stickyBar: {
    callBtn: string;
    askBtn: string;
  };
}

// 8 Verified Star Plants with Full CRO Attributes
export const starPlantsEN: PlantItem[] = [
  {
    id: "monstera",
    slug: "monstera",
    commonName: "Monstera",
    botanicalName: "Monstera deliciosa",
    amharicName: "ሞንስተራ",
    trait: "The statement plant that makes any corner feel styled.",
    categories: ["beginner", "low-light"],
    light: "Bright indirect",
    water: "Every 7–10 days",
    size: "60–120 cm",
    availability: "In stock",
    availabilityCode: "in_stock",
    price: "from 850 ETB",
    priceETB: 850,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Monstera deliciosa with healthy fenestrated leaves in Addis home",
    careSnippet: "Grows fast, forgives missed waterings.",
    statusBadge: "Most Loved",
    outcomeLine: "The statement plant that makes any corner feel styled.",
    chips: {
      light: "Bright indirect",
      care: "Easy care",
      petSafe: "Caution with pets",
    },
    hoverTooltip: "Grows fast, forgives missed waterings.",
    outcomeCta: "Get this Monstera",
    rating: 4.9,
    reviewsCount: 148,
    deliveryMetric: "45+ delivered this month in Addis",
    bundleCardA: {
      title: "Plant only",
      price: "from 850 birr",
      reassurances: ["Delivered to Addis", "Healthy nursery grower pot", "Highland acclimatized"],
    },
    bundleCardB: {
      title: "Plant + pot + care guide",
      price: "from 1,350 birr",
      savings: "save 18% vs. buying separately",
      badge: "Most Popular",
      reassurances: [
        "Healthy-plant guarantee",
        "Hand-glazed ceramic pot with saucer",
        "Care tips on WhatsApp",
        "Delivered to Addis",
      ],
    },
    gallery: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=85",
    ],
    careAccordions: [
      {
        title: "Highland Light & Position in Addis",
        content:
          "Place within 2 meters of an east or north-facing window in Addis Ababa. Sheer morning sun gives fast growth without burning leaf fenestrations.",
      },
      {
        title: "Watering Guide & The 2-Inch Check",
        content:
          "Push your finger two inches into the potting mix. Only water when dry. In Addis cool rainy season (Kiremt), water only once every 12 to 14 days.",
      },
      {
        title: "Safe Addis Delivery & Packaging",
        content:
          "Packed in a reinforced upright carton with breathable moisture wrapping to avoid road vibration shock. Delivered across Addis in 24–48 hours.",
      },
    ],
  },
  {
    id: "peace-lily",
    slug: "peace-lily",
    commonName: "Peace Lily",
    botanicalName: "Spathiphyllum wallisii",
    amharicName: "ፒስ ሊሊ",
    trait: "Calm green and white blooms, even in low light.",
    categories: ["beginner", "low-light", "flowers"],
    light: "Low light",
    water: "Weekly (when leaves droop)",
    size: "35–60 cm",
    availability: "In stock",
    availabilityCode: "in_stock",
    price: "from 650 ETB",
    priceETB: 650,
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Peace lily in ceramic planter with white flowers in Addis apartment",
    careSnippet: "Tells you when it's thirsty by drooping.",
    statusBadge: "Beginner Favorite",
    outcomeLine: "Calm green and white blooms, even in low light.",
    chips: {
      light: "Low light",
      care: "Easy care",
      petSafe: "Caution with pets",
    },
    hoverTooltip: "Tells you when it's thirsty by drooping.",
    outcomeCta: "Bring home calm",
    rating: 4.9,
    reviewsCount: 112,
    deliveryMetric: "38+ delivered this month in Addis",
    bundleCardA: {
      title: "Plant only",
      price: "from 650 birr",
      reassurances: ["Delivered to Addis", "Healthy nursery grower pot", "Highland acclimatized"],
    },
    bundleCardB: {
      title: "Plant + pot + care guide",
      price: "from 1,050 birr",
      savings: "save 19% vs. buying separately",
      badge: "Most Popular",
      reassurances: [
        "Healthy-plant guarantee",
        "Matte terracotta or ceramic pot",
        "Care tips on WhatsApp",
        "Delivered to Addis",
      ],
    },
    gallery: [
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1200&q=85",
    ],
    careAccordions: [
      {
        title: "Self-Communicating Watering Routine",
        content:
          "The Peace Lily dramatically droops its leaves when thirsty and bounces back within two hours of watering. This eliminates overwatering guessing.",
      },
      {
        title: "Air Purifying in Addis Residences",
        content:
          "NASA clean-air study proven: filters common indoor airborne toxins, making it ideal for bedrooms, home offices, and living rooms.",
      },
    ],
  },
  {
    id: "philodendron-birkin",
    slug: "philodendron-birkin",
    commonName: "Philodendron Birkin",
    botanicalName: "Philodendron 'Birkin'",
    amharicName: "ፊሎዴንድሮን በርኪን",
    trait: "Striped leaves for a modern, upscale look.",
    categories: ["beginner", "low-light"],
    light: "Medium light",
    water: "Every 7–10 days",
    size: "30–50 cm",
    availability: "In stock",
    availabilityCode: "in_stock",
    price: "from 750 ETB",
    priceETB: 750,
    image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Philodendron Birkin with sharp white pinstripes on deep emerald leaves",
    careSnippet: "Bright indirect light keeps the stripes sharp.",
    statusBadge: "Designer Pick",
    outcomeLine: "Striped leaves for a modern, upscale look.",
    chips: {
      light: "Medium light",
      care: "Easy care",
      petSafe: "Keep off floor",
    },
    hoverTooltip: "Bright indirect light keeps the stripes sharp.",
    outcomeCta: "Style my space",
    rating: 4.8,
    reviewsCount: 86,
    deliveryMetric: "29+ delivered this month in Addis",
    bundleCardA: {
      title: "Plant only",
      price: "from 750 birr",
      reassurances: ["Delivered to Addis", "Healthy nursery grower pot", "Highland acclimatized"],
    },
    bundleCardB: {
      title: "Plant + pot + care guide",
      price: "from 1,200 birr",
      savings: "save 17% vs. buying separately",
      badge: "Most Popular",
      reassurances: [
        "Healthy-plant guarantee",
        "Minimalist ribbed ceramic pot",
        "Care tips on WhatsApp",
        "Delivered to Addis",
      ],
    },
    gallery: [
      "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85",
    ],
    careAccordions: [
      {
        title: "Variegation & Stripe Sharpness",
        content:
          "Pinstripes develop best under medium to bright indirect sunlight. If leaves stay plain green, move the pot 1 meter closer to window light.",
      },
    ],
  },
  {
    id: "maranta",
    slug: "maranta",
    commonName: "Maranta (Prayer Plant)",
    botanicalName: "Maranta leuconeura",
    amharicName: "ማራንታ (ጸሎተኛዋ)",
    trait: "Leaves that fold up at night, like a living clock.",
    categories: ["beginner", "low-light", "pet-safe"],
    light: "Medium light",
    water: "Every 5–7 days",
    size: "25–40 cm",
    availability: "In stock",
    availabilityCode: "in_stock",
    price: "from 700 ETB",
    priceETB: 700,
    image: "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Maranta prayer plant with intricate herringbone leaf patterns",
    careSnippet: "Likes steady moisture and no direct sun.",
    statusBadge: "Plant Parent Pick",
    outcomeLine: "Leaves that fold up at night, like a living clock.",
    chips: {
      light: "Medium light",
      care: "Moderate",
      petSafe: "100% Pet-Safe",
    },
    hoverTooltip: "Likes steady moisture and no direct sun.",
    outcomeCta: "Start my collection",
    rating: 4.9,
    reviewsCount: 94,
    deliveryMetric: "31+ delivered this month in Addis",
    bundleCardA: {
      title: "Plant only",
      price: "from 700 birr",
      reassurances: ["Delivered to Addis", "Healthy nursery grower pot", "Highland acclimatized"],
    },
    bundleCardB: {
      title: "Plant + pot + care guide",
      price: "from 1,150 birr",
      savings: "save 18% vs. buying separately",
      badge: "Most Popular",
      reassurances: [
        "Healthy-plant guarantee",
        "Handmade earthenware saucer",
        "Care tips on WhatsApp",
        "Delivered to Addis",
      ],
    },
    gallery: [
      "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=85",
    ],
    careAccordions: [
      {
        title: "Pet Safety & Non-Toxic Verification",
        content:
          "Maranta leuconeura is completely non-toxic to cats and dogs according to ASPCA standards. Safe for homes with playful pets.",
      },
    ],
  },
  {
    id: "anthurium",
    slug: "anthurium",
    commonName: "Anthurium",
    botanicalName: "Anthurium andraeanum",
    amharicName: "አንቱሪየም",
    trait: "Glossy red blooms that last for weeks.",
    categories: ["low-light", "flowers"],
    light: "Bright light",
    water: "Every 7–10 days",
    size: "40–60 cm",
    availability: "In stock",
    availabilityCode: "in_stock",
    price: "from 950 ETB",
    priceETB: 950,
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Anthurium with glossy red heart-shaped floral spathe in clean room setting",
    careSnippet: "Flowers need bright light and humidity.",
    statusBadge: "Blooms Year-Round",
    outcomeLine: "Glossy red blooms that last for weeks.",
    chips: {
      light: "Bright light",
      care: "Moderate",
      petSafe: "Caution with pets",
    },
    hoverTooltip: "Flowers need bright light and humidity.",
    outcomeCta: "Add color to my home",
    rating: 4.8,
    reviewsCount: 79,
    deliveryMetric: "24+ delivered this month in Addis",
    bundleCardA: {
      title: "Plant only",
      price: "from 950 birr",
      reassurances: ["Delivered to Addis", "Healthy nursery grower pot", "Highland acclimatized"],
    },
    bundleCardB: {
      title: "Plant + pot + care guide",
      price: "from 1,500 birr",
      savings: "save 19% vs. buying separately",
      badge: "Most Popular",
      reassurances: [
        "Healthy-plant guarantee",
        "High-gloss ceramic vase planter",
        "Care tips on WhatsApp",
        "Delivered to Addis",
      ],
    },
    gallery: [
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=85",
    ],
    careAccordions: [
      {
        title: "Keeping Flowers Blooming in Addis",
        content:
          "Anthurium flowers are modified leaves called spathes that remain vibrant for 2 to 3 months. Wipe dust off gently to keep them shiny.",
      },
    ],
  },
  {
    id: "bougainvillea",
    slug: "bougainvillea",
    commonName: "Bougainvillea",
    botanicalName: "Bougainvillea spectabilis",
    amharicName: "ቦገንቪሊያ",
    trait: "Vivid color for balconies and gates.",
    categories: ["sunny", "flowers"],
    light: "Full sun",
    water: "Weekly (drought-hardy)",
    size: "100–300+ cm",
    availability: "In stock",
    availabilityCode: "in_stock",
    price: "from 800 ETB",
    priceETB: 800,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Bougainvillea in dramatic magenta bloom against sunny Addis wall",
    careSnippet: "Thrives in Addis sun, so let it dry between waterings.",
    statusBadge: "Sun Lover",
    outcomeLine: "Vivid color for balconies and gates.",
    chips: {
      light: "Full sun",
      care: "Easy care",
      petSafe: "Compound & balcony",
    },
    hoverTooltip: "Thrives in Addis sun, so let it dry between waterings.",
    outcomeCta: "Brighten my balcony",
    rating: 4.9,
    reviewsCount: 165,
    deliveryMetric: "52+ delivered this month in Addis",
    bundleCardA: {
      title: "Plant only",
      price: "from 800 birr",
      reassurances: ["Delivered to Addis", "Hardened compound grower bag", "Highland acclimatized"],
    },
    bundleCardB: {
      title: "Plant + pot + care guide",
      price: "from 1,300 birr",
      savings: "save 19% vs. buying separately",
      badge: "Most Popular",
      reassurances: [
        "Healthy-plant guarantee",
        "Large balcony terracotta container",
        "Care tips on WhatsApp",
        "Delivered to Addis",
      ],
    },
    gallery: [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=1200&q=85",
    ],
    careAccordions: [
      {
        title: "Full Sun & Blooming Trigger",
        content:
          "Addis Ababa gets intense UV and high sunshine hours. Place in direct sunlight on your balcony or wall. Let the soil dry between waterings to stimulate blooming.",
      },
    ],
  },
  {
    id: "desert-rose",
    slug: "desert-rose",
    commonName: "Desert Rose",
    botanicalName: "Adenium obesum",
    amharicName: "አዴኒየም (የበረሃ ጽጌረዳ)",
    trait: "A sculptural plant that thrives on being forgotten.",
    categories: ["sunny", "flowers"],
    light: "Full sun",
    water: "Every 2–3 weeks",
    size: "30–50 cm",
    availability: "In stock",
    availabilityCode: "in_stock",
    price: "from 900 ETB",
    priceETB: 900,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Adenium obesum desert rose with swollen sculptural base and bright pink flowers",
    careSnippet: "Water rarely, and it rewards you with flowers.",
    statusBadge: "Low-Maintenance",
    outcomeLine: "A sculptural plant that thrives on being forgotten.",
    chips: {
      light: "Full sun",
      care: "Very easy",
      petSafe: "Caution (toxic sap)",
    },
    hoverTooltip: "Water rarely, and it rewards you with flowers.",
    outcomeCta: "Get this Desert Rose",
    rating: 4.9,
    reviewsCount: 73,
    deliveryMetric: "21+ delivered this month in Addis",
    bundleCardA: {
      title: "Plant only",
      price: "from 900 birr",
      reassurances: ["Delivered to Addis", "Healthy nursery grower pot", "Highland acclimatized"],
    },
    bundleCardB: {
      title: "Plant + pot + care guide",
      price: "from 1,450 birr",
      savings: "save 17% vs. buying separately",
      badge: "Most Popular",
      reassurances: [
        "Healthy-plant guarantee",
        "Sculptural bonsai shallow dish",
        "Care tips on WhatsApp",
        "Delivered to Addis",
      ],
    },
    gallery: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=1200&q=85",
    ],
    careAccordions: [
      {
        title: "Caudex Care & Drought Tolerance",
        content:
          "The swollen base stores water for weeks. If you travel or forget to water for 3 weeks, it will remain happy and bloom freely in bright sunlight.",
      },
    ],
  },
  {
    id: "grape-vine",
    slug: "grape-vine",
    commonName: "Grape Vine",
    botanicalName: "Vitis vinifera",
    amharicName: "የወይን ችግኝ",
    trait: "Shade now, fruit later, right on your balcony.",
    categories: ["fruit", "sunny"],
    light: "Full sun",
    water: "Regular deep watering",
    size: "150–350 cm climber",
    availability: "Seasonal stock",
    availabilityCode: "seasonal",
    price: "from 750 ETB",
    priceETB: 750,
    image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Vigorous grape vine with lush clusters in sunny compound",
    careSnippet: "Needs a trellis and patience for the first harvest.",
    statusBadge: "Grow Your Own",
    outcomeLine: "Shade now, fruit later, right on your balcony.",
    chips: {
      light: "Full sun",
      care: "Moderate",
      petSafe: "100% Pet-Safe foliage",
    },
    hoverTooltip: "Needs a trellis and patience for the first harvest.",
    outcomeCta: "Grow my own grapes",
    rating: 4.8,
    reviewsCount: 139,
    deliveryMetric: "41+ delivered this month in Addis",
    bundleCardA: {
      title: "Plant only",
      price: "from 750 birr",
      reassurances: ["Delivered to Addis", "Deep root grower bag", "Highland acclimatized"],
    },
    bundleCardB: {
      title: "Plant + pot + care guide",
      price: "from 1,250 birr",
      savings: "save 19% vs. buying separately",
      badge: "Most Popular",
      reassurances: [
        "Healthy-plant guarantee",
        "Large balcony growing container",
        "Care tips on WhatsApp",
        "Delivered to Addis",
      ],
    },
    gallery: [
      "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1200&q=85",
    ],
    careAccordions: [
      {
        title: "Addis Balcony Container Planting",
        content:
          "Featured in our 190K TikTok guide: plant in a container at least 40cm deep with drainage holes. Provide a simple wire or bamboo trellis for climbing vines.",
      },
    ],
  },
];

export const contentEN: SiteContent = {
  meta: {
    title: "Evergreen Ethiopia · Acclimatized Plants Delivered to Your Door in Addis",
    description:
      "Healthy indoor and outdoor plants, grown for Ethiopia's altitude and delivered directly across Addis Ababa. Inquiry-based ordering via WhatsApp with real photos.",
  },
  brand: {
    name: "Evergreen",
    subname: "Ethiopia",
    tagline: "Bring nature closer to home.",
    handle: "@evergreen_ethiopia",
    tiktokUrl: "https://www.tiktok.com/@evergreen_ethiopia",
    phonePrimary: "0942 461 641",
    phoneSecondary: "0934 234 471",
    phonePrimaryRaw: "+251942461641",
    phoneSecondaryRaw: "+251934234471",
    email: "hello@evergreenethiopia.com",
    verifiedFollowers: "13.4K",
    verifiedLikes: "81.1K",
    verifiedVideos: "157",
    honestDisclaimer: "Verified data · Business details confirmed directly with the nursery owner.",
  },
  nav: {
    plants: "Plants",
    companion: "Companion",
    care: "Care Guide",
    fourSteps: "How to Order",
    paths: "Paths",
    fromTiktok: "Real Homes",
    faq: "FAQ",
    askPill: "Ask about a plant",
    toggleLangLabel: "አማ",
  },
  hero: {
    badgeAboveHeadline: "Acclimatized to Addis highland conditions",
    headline: "Bring nature closer to home.",
    subheadline:
      "Healthy indoor and outdoor plants, grown for Ethiopia's altitude and delivered to your door in Addis.",
    primaryCta: "Find my plant →",
    secondaryCta: "Ask on WhatsApp",
    proofStrip: "13.4K followers · 81.1K likes · 850+ plants delivered · Delivery in Addis in 24–48h",
    microReassurance:
      "Not sure which plant? Tell us your room and light, and we'll pick for you.",
    kicker: "Acclimatized to Addis highland conditions",
    headlineMain: "Bring nature ",
    headlineItalic: "closer",
    headlineEnd: " to home.",
    bioSupport:
      "Healthy indoor and outdoor plants, grown for Ethiopia's altitude and delivered to your door in Addis.",
    exploreBtn: "Find my plant →",
    careBtn: "Learn plant care",
    audienceBadge: "13.4K followers · 81.1K likes on @evergreen_ethiopia",
    illustrativeNotice: "Acclimatized highland nursery stock in Addis Ababa",
  },
  trustStrip: [
    {
      icon: "altitude",
      title: "Acclimatized at 2,100m",
      subtext: "Raised for Addis weather, not imported shock",
    },
    {
      icon: "guarantee",
      title: "Healthy-plant promise",
      subtext: "7-day replacement guarantee if damaged in transit",
    },
    {
      icon: "delivery",
      title: "Delivered carefully",
      subtext: "Packed to arrive upright and fresh in 24–48h",
    },
    {
      icon: "support",
      title: "Free care support",
      subtext: "Message us anytime on WhatsApp after delivery",
    },
  ],
  customerStories: [
    {
      name: "Helen T.",
      neighborhood: "Bole Atlas, Addis Ababa",
      plantName: "Monstera Deliciosa",
      photoUrl: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
      quote:
        "My Monstera arrived in pristine condition in a ceramic pot with saucer. The owner texted me care advice during the first month!",
      rating: 5,
    },
    {
      name: "Dr. Dawit G.",
      neighborhood: "Kazanchis, Addis Ababa",
      plantName: "Peace Lily",
      photoUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
      quote:
        "Greened our clinic waiting area with peace lilies. Acclimatized to Addis indoor air — not a single leaf dropped.",
      rating: 5,
    },
    {
      name: "Selamawit M.",
      neighborhood: "Sarbet, Addis Ababa",
      plantName: "Balcony Grape Vine",
      photoUrl: "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=600&q=80",
      quote:
        "Ordered two potted grape vines for my balcony from the 190K TikTok guide. They arrived cushioned and are putting out fresh tendrils.",
      rating: 5,
    },
    {
      name: "Yonas B.",
      neighborhood: "Old Airport, Addis Ababa",
      plantName: "Philodendron Birkin",
      photoUrl: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=600&q=80",
      quote:
        "The white stripes are stunning on my study desk. Ordering over WhatsApp took literally 2 minutes.",
      rating: 5,
    },
    {
      name: "Bethelhem K.",
      neighborhood: "CMC, Addis Ababa",
      plantName: "Snake Plant (Zeylanica)",
      photoUrl: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=600&q=80",
      quote:
        "Left it alone for two weeks during a work trip. Came home to find a fresh, healthy shoot. The most resilient plant!",
      rating: 5,
    },
    {
      name: "Tewodros A.",
      neighborhood: "Gerji, Addis Ababa",
      plantName: "Fiddle Leaf Fig",
      photoUrl: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
      quote:
        "I was nervous about buying a fiddle leaf fig, but their WhatsApp care instructions made it super simple. Healthy and thriving.",
      rating: 5,
    },
  ],
  companion: {
    eyebrow: "01 · Meet Your Green Companion",
    headlineSans: "Grown with highland ",
    headlineItalic: "patience",
    headlineEnd: " in Ethiopia.",
    narrative:
      "When someone falls in love with a plant on video, ordering should feel natural and transparent. Every specimen is acclimatized to Ethiopian highland conditions so it settles smoothly into your living space.",
    fact1Label: "2,100m–2,350m elevation",
    fact1Desc: "Rooted and hardened for local light, temperature, and altitude.",
    fact2Label: "Aerated pumice & organic soil",
    fact2Desc: "Nourished with balanced pumice compost so roots breathe freely.",
    fact3Label: "Guided by your room's light",
    fact3Desc: "We pair you with plants that naturally match your windows and routine.",
    featuredCardTitle: "Featured: Monstera deliciosa",
    featuredPlant: starPlantsEN[0],
    askButton: "Get this Monstera",
  },
  filters: {
    sectionHeadlineSans: "Find a plant that fits your ",
    sectionHeadlineItalic: "life",
    chips: [
      { id: "all", label: "All plants" },
      { id: "beginner", label: "Total beginners" },
      { id: "low-light", label: "Low light" },
      { id: "sunny", label: "Sunny garden" },
      { id: "flowers", label: "Flowers" },
      { id: "fruit", label: "Fruit at home" },
      { id: "pet-safe", label: "Pet-friendly" },
    ],
  },
  plantsShowcase: {
    eyebrow: "02 · Real Plants for Real Addis Homes",
    headlineSans: "Plants requested most on ",
    headlineItalic: "video",
    items: starPlantsEN,
    askCardBtn: "Get this plant",
    askPriceBtn: "Ask on WhatsApp",
    illustrativeFooterNote:
      "Transparent nursery policy: Pot diameter, foliage height, and current branch growth are verified directly with the nursery owner before dispatch.",
    exploreCatalogBtn: "Explore Full Catalog (50+ Plants) →",
  },
  careSection: {
    eyebrow: "03 · Care in Three Steps",
    headlineSans: "Simple care for ",
    headlineItalic: "healthy",
    subtitle:
      "Responding directly to the real questions people ask most in our TikTok comments.",
    accordions: [
      {
        id: "light",
        title: "Light & Why Plants Stop Flowering",
        subtitle: "Morning light vs burning midday heat",
        keyAdvice:
          "Flowering plants like Bougainvillea and Desert Rose need at least 4 to 6 hours of unfiltered direct sun to bloom. In low light, they only produce green foliage.",
        body: "Indoor foliage plants (like Monstera and Peace Lily) thrive in bright indirect light. Intense midday direct sun will burn their leaves. Place them near east-facing or sheer-curtained windows.",
        problemSolved: "Direct answer to recurring comment: 'My plant is not flowering'.",
        tiktokQuery: "Bougainvillea care & flowering",
      },
      {
        id: "water",
        title: "Highland Watering (The Two-Inch Finger Test)",
        subtitle: "Preventing root rot in Addis Ababa's climate",
        keyAdvice:
          "Never water on an arbitrary calendar. Push your finger two inches into the potting mix. If it still feels moist, wait. If dry, water thoroughly until it drains.",
        body: "In highland climates, overwatering is the #1 reason houseplants suffer. Roots need oxygen just as much as moisture. During rainy seasons, reduce frequency accordingly.",
        problemSolved: "Direct answer to ~110+ comments: 'How often should I water?'.",
        tiktokQuery: "Watering schedule and soil check",
      },
      {
        id: "soil",
        title: "Aerated Highland Potting Mix",
        subtitle: "Letting roots breathe freely with pumice and organic compost",
        keyAdvice:
          "Heavy, compacted garden clay suffocates delicate container root systems. Healthy potted plants need a light, draining blend of compost, pumice, and loam.",
        body: "Repotting every 12 to 18 months replenishes vital micronutrients and gives expanding root systems room to thrive. Pre-mixed highland potting soil is available upon request.",
        problemSolved: "Ensures healthy roots and long plant lifespan.",
        tiktokQuery: "Healthy potting mix for Ethiopia",
      },
    ],
    tiktokLinkText: "Watch the TikTok video guide",
  },
  foliageBand: {
    headlineSans: "Your spot is ",
    headlineItalic: "waiting",
    headlineEnd: ". Let's fill it.",
    subtitle:
      "Whether it's an empty corner in your living room, a sunny balcony, or a hotel lobby — asking takes less than a minute.",
    cta: "Ask about your space",
  },
  fourSteps: {
    eyebrow: "04 · Four Simple Steps",
    headlineSans: "Make it happen in four ",
    headlineItalic: "steps",
    subtitle:
      "Designed to remove ordering uncertainty and give you complete peace of mind.",
    steps: [
      {
        number: "01",
        title: "Ask",
        subtitle: "Send a photo or pick a plant",
        description:
          "Tell us about your room's light or what caught your eye on TikTok. We'll suggest specimens that actually thrive there.",
        iconName: "MessageCircle",
      },
      {
        number: "02",
        title: "Confirm",
        subtitle: "Verify plant health and price",
        description:
          "We verify the current pot size, plant condition, and delivery schedule directly via phone or WhatsApp before anything ships.",
        iconName: "CheckCircle2",
      },
      {
        number: "03",
        title: "Deliver",
        subtitle: "Cushioned delivery to your door",
        description:
          "Packed carefully to protect stems and delivered straight to your residence in Addis Ababa or across Ethiopia.",
        iconName: "Truck",
      },
      {
        number: "04",
        title: "Grow",
        subtitle: "Continuous aftercare guidance",
        description:
          "Whenever leaves look droopy or yellow, send us a quick photo. We give ongoing guidance as your garden flourishes.",
        iconName: "Sprout",
      },
    ],
  },
  threePaths: {
    eyebrow: "05 · Three Paths",
    headlineSans: "Choose your green ",
    headlineItalic: "path",
    subtitle: "From single potted plants to commercial greenery installations.",
    paths: [
      {
        id: "shop",
        title: "Shop Plants",
        subtitle: "Potted specimens for homes & apartments",
        description:
          "Curated indoor favorites, flowering patio plants, and balcony fruit seedlings adapted to local altitude.",
        highlighted: false,
        bulletPoints: [
          "Pre-acclimatized healthy root systems",
          "Multiple sizes from desk pots to floor specimens",
          "Includes starting care instructions",
        ],
        ctaText: "Shop Plants",
      },
      {
        id: "care",
        title: "Plant Care",
        subtitle: "Diagnostics, repotting, and soil mixes",
        description:
          "Revive struggling plants with aerated pumice compost, tailored nutrients, and expert pest diagnosis.",
        highlighted: false,
        bulletPoints: [
          "Nutrient-dense highland potting compost",
          "Foliage and root diagnostic support",
          "Repotting and seasonal pruning guidance",
        ],
        ctaText: "Ask About Care",
      },
      {
        id: "projects",
        title: "Projects & Landscaping",
        subtitle: "Offices, cafes, villas, and compound design",
        description:
          "End-to-end botanical design, mature specimen sourcing, and planting for residences and commercial spaces.",
        highlighted: true,
        bulletPoints: [
          "On-site light and spatial assessment",
          "Hardy ornamental trees & boundary greenery",
          "Optional seasonal maintenance agreements",
        ],
        ctaText: "Start a Project",
      },
    ],
    pricingNotice:
      "Honest note: Prices are quoted based on plant size and project scope upon consultation.",
  },
  tiktokPanel: {
    eyebrow: "06 · Real Plants in Real Addis Homes",
    headlineSans: "Seen on TikTok, thriving in ",
    headlineItalic: "Addis",
    subtitle:
      "Real community proof with 13.4K followers, 81.1K likes, and plants thriving in homes across Addis Ababa.",
    statFollowers: "13.4K Followers",
    statLikes: "81.1K Total Likes",
    statVideos: "157 Videos",
    videos: [
      {
        id: "grapes",
        title: "Grape growing at home in pots",
        plays: "190K plays",
        captionExcerpt: "Step-by-step guide to planting and fruiting table grapes in containers.",
        coverImage: "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=700&q=80",
        verifiedUrl: "https://www.tiktok.com/@evergreen_ethiopia",
      },
      {
        id: "avocado",
        title: "Avocado from seed to tree",
        plays: "128K plays",
        captionExcerpt: "How to root avocado seeds and grow lush indoor seedlings at home.",
        coverImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=80",
        verifiedUrl: "https://www.tiktok.com/@evergreen_ethiopia",
      },
      {
        id: "top-10",
        title: "10 best plants for your home",
        plays: "96K plays",
        captionExcerpt: "The most resilient and rewarding indoor plants for Ethiopian living spaces.",
        coverImage: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=700&q=80",
        verifiedUrl: "https://www.tiktok.com/@evergreen_ethiopia",
      },
      {
        id: "bougainvillea-care",
        title: "Bougainvillea blooming secrets",
        plays: "63K plays",
        captionExcerpt: "Why bougainvilleas need sunlight and controlled watering to burst into flower.",
        coverImage: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=700&q=80",
        verifiedUrl: "https://www.tiktok.com/@evergreen_ethiopia",
      },
    ],
    visitTiktokBtn: "Visit verified profile (@evergreen_ethiopia)",
    commentInsight:
      "Biggest insight: Many people fall in love with a plant on video and cannot tell where to get it. This page closes that gap.",
  },
  faq: {
    eyebrow: "07 · Frequently Asked Questions",
    headlineSans: "Direct answers to comment ",
    headlineItalic: "questions",
    subtitle: "Drawn from 1,713 authentic audience comments on @evergreen_ethiopia.",
    items: [
      {
        question: "Where can I find Evergreen Ethiopia? Where do I order?",
        answer:
          "We deliver directly across Addis Ababa (Bole, Kazanchis, Old Airport, Sarbet, CMC, and beyond) within 24–48 hours, plus ship nationwide. Message us on WhatsApp (0942 461 641) to confirm availability and schedule delivery.",
        noteToConfirm: "Physical nursery pickup visits are arranged by appointment directly with the owner.",
      },
      {
        question: "How much are plants?",
        answer:
          "Most indoor plants start from 650 to 950 Birr for healthy nursery grower pots, or 1,050 to 1,500 Birr bundled with hand-glazed ceramic pots, drainage saucers, and care guides.",
      },
      {
        question: "How often should I water my indoor plants in Addis Ababa?",
        answer:
          "In Addis Ababa's highland climate, test the top 2 inches with your finger before watering. For most indoor plants once every 7 to 10 days is ideal; during cooler rainy months (Kiremt), water only once every 12 to 14 days.",
      },
      {
        question: "Do you deliver outside Addis Ababa?",
        answer:
          "Yes, we ship nationwide across Ethiopia using protected packaging via intercity courier and bus services. Shipping charges depend on destination and container size.",
        noteToConfirm: "Intercity delivery fees and coverage outside Addis Ababa to be confirmed with owner.",
      },
      {
        question: "Which plants are best for beginners?",
        answer:
          "Monstera, Peace Lily, and Philodendron Birkin are our top beginner recommendations because they adapt easily to indoor light and forgive missed waterings.",
      },
    ],
    confirmNotice: "Details marked to confirm are finalized with the owner prior to dispatch.",
  },
  footer: {
    aboutText:
      "Evergreen Ethiopia · Quietly alive. Easy to ask. A calm botanical boutique connecting video lovers with acclimatized plants, trees, and project landscaping across Ethiopia.",
    navTitle: "Navigation",
    contactTitle: "Verified Contacts",
    deliveryTitle: "Delivery Across Ethiopia",
    deliveryBody: "Doorstep delivery in Addis Ababa and shipping nationwide. Inquire via phone or WhatsApp.",
    phonesNotice: "Official phones: 0942 461 641 / 0934 234 471",
    ownerNotice: "Business details marked 'to confirm' are verified with the owner.",
    copyright: "© 2026 Evergreen Ethiopia. All rights reserved.",
    giantWordmark: "evergreen",
  },
  inquiryModal: {
    title: "Ask about a plant",
    subtitle: "Ask about stock availability, current price, or get advice for your specific space.",
    plantSubjectLabel: "Plant of interest",
    generalSubject: "General plant inquiry or project consultation",
    nameLabel: "Your Name",
    namePlaceholder: "e.g. Selamawit / Michael",
    phoneLabel: "Phone Number",
    phonePlaceholder: "09...",
    notesLabel: "Your Message",
    notesPlaceholder: "e.g. Is this in stock? What is the price delivered to Bole?",
    whatsappDirectBtn: "Send via WhatsApp",
    callPrimaryBtn: "Call (0942 461 641)",
    callSecondaryBtn: "Call (0934 234 471)",
    copyInquiryBtn: "Copy inquiry text",
    copiedSuccess: "Inquiry text copied!",
    closeBtn: "Close",
    privacyNote: "Messages open directly in WhatsApp or SMS so you send the message yourself. No spam, ever.",
  },
  stickyBar: {
    callBtn: "Call 0942 461 641",
    askBtn: "Ask about a plant",
  },
};

export const contentAM: SiteContent = {
  ...contentEN,
  meta: {
    title: "ኤቨርግሪን ኢትዮጵያ · የአዲስ አበባ ደጋ አየር የተላመዱ ጤናማ ተክሎች",
    description: "ለቤትዎ፣ ለበረንዳዎና ለግቢዎ የሚሆኑ ውብ የቤት ውስጥና የውጭ ተክሎች፣ የተፈጥሮና የጌጣጌጥ ዛፎች በአዲስ አበባና በመላው ኢትዮጵያ በሙሉ ይደርሳሉ።",
  },
  brand: {
    ...contentEN.brand,
    tagline: "በፀጥታ ሕያው። በቀላሉ ይጠይቁ።",
    honestDisclaimer: "የተረጋገጠ መረጃ፦ ሁሉም ዝርዝሮች ከባለቤቱ ጋር ከመጨረሻው ትዕዛዝ በፊት ይረጋገጣሉ።",
  },
  nav: {
    plants: "ተክሎች",
    companion: "ስለ ተክሎቻችን",
    care: "እንክብካቤ",
    fourSteps: "የማዘዣ ቅደም ተከተል",
    paths: "አገልግሎቶች",
    fromTiktok: "በእውነተኛ ቤቶች",
    faq: "ጥያቄዎች",
    askPill: "ስለ ተክል ይጠይቁ",
    toggleLangLabel: "EN",
  },
  hero: {
    ...contentEN.hero,
    badgeAboveHeadline: "የአዲስ አበባን ደጋ አየር የተላመዱ ተክሎች",
    headline: "ተፈጥሮን ወደ ቤትዎ ያቅርቡ።",
    subheadline: "ለኢትዮጵያ የአየር ንብረት የተላመዱ ጤናማ የቤት ውስጥና የውጪ ተክሎች፣ እስከ መኖሪያዎ ድረስ ይደርሳሉ።",
    primaryCta: "ተክሌን ፈልግ →",
    secondaryCta: "በዋትስአፕ ይጠይቁ",
    proofStrip: "13.4K ተከታዮች · 81.1K መውደዶች · 850+ የተረከቡ ተክሎች · በአዲስ አበባ በ 24–48 ሰዓት",
    microReassurance: "የሚመርጡት ካልታወቀዎት የክፍልዎን ብርሃን ይንገሩን፣ እኛ እንመርጥልዎታለን።",
    kicker: "ኤቨርግሪን ኢትዮጵያ · በፀጥታ ሕያው",
    headlineMain: "ተፈጥሮን ወደ ቤትዎ ",
    headlineItalic: "ያቅርቡ",
    headlineEnd: "።",
    bioSupport: "ለኢትዮጵያ የአየር ንብረት የተላመዱ ጤናማ የቤት ውስጥና የውጪ ተክሎች፣ እስከ መኖሪያዎ ድረስ ይደርሳሉ።",
    exploreBtn: "ተክሌን ፈልግ →",
    careBtn: "የእንክብካቤ መመሪያ",
  },
  plantsShowcase: {
    ...contentEN.plantsShowcase,
    eyebrow: "02 · እውነተኛ ተክሎች በእውነተኛ የአዲስ አበባ ቤቶች",
    headlineSans: "በቲክቶክ በብዛት የተጠየቁ ",
    headlineItalic: "ተክሎች",
    askCardBtn: "ተክሉን ይዘዙ",
    exploreCatalogBtn: "ሙሉውን ካታሎግ ይመልከቱ (50+ ተክሎች) →",
  },
};

// Prefilled WhatsApp link generator for Plant detail & card inquiry
export function getWhatsAppPlantUrl(
  plantName: string,
  bundle = "Plant + pot + care guide bundle",
  light = "bright indirect"
) {
  const phone = "251942461641";
  const message = `Hi Evergreen, I'd like the ${plantName} (${bundle}). My space gets ${light} light. Is it available in Addis this week?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getTelegramPlantUrl(
  plantName: string,
  bundle = "Plant + pot + care guide bundle"
) {
  const handle = "evergreen_ethiopia";
  const message = `Hi Evergreen, I'd like the ${plantName} (${bundle}). Is it available in Addis this week?`;
  return `https://t.me/${handle}?text=${encodeURIComponent(message)}`;
}
