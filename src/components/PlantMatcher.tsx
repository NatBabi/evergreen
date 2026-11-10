"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { PlantItem } from "@/data/content";
import {
  Home,
  Briefcase,
  Sun,
  CloudSun,
  Moon,
  Sparkles,
  MessageCircle,
  RotateCcw,
  Check,
  Droplets,
  Layers,
  ArrowRight,
} from "lucide-react";

interface MatchRule {
  plantSlug: string;
  roomName: string;
  lightName: string;
  amharicRoom: string;
  amharicLight: string;
  whyMatched: string;
  whyMatchedAm: string;
  wateringHint: string;
  wateringHintAm: string;
}

const MATCH_DATABASE: MatchRule[] = [
  {
    plantSlug: "monstera",
    roomName: "Living Room",
    lightName: "Bright Indirect",
    amharicRoom: "ሳሎን",
    amharicLight: "ብሩህ የተጣራ ብርሃን",
    whyMatched: "Expansive split leaves create an architectural focal point in highland living rooms.",
    whyMatchedAm: "ሰፋፊ የተሰነጠቁ ቅጠሎቹ በሳሎንዎ ውስጥ አስደናቂ ተፈጥሯዊ ውበት ይፈጥራሉ።",
    wateringHint: "Water every 7–10 days",
    wateringHintAm: "በየ 7–10 ቀኑ ያጠጡ",
  },
  {
    plantSlug: "snake-plant",
    roomName: "Bedroom",
    lightName: "Low Light",
    amharicRoom: "መኝታ ቤት",
    amharicLight: "ደብዛዛ ብርሃን",
    whyMatched: "Continues night-time oxygen production; completely unfazed by dry bedroom air or low light.",
    whyMatchedAm: "በሌሊት ንጹህ አየር ያመነጫል፤ አነስተኛ ብርሃንና ደረቅ አየርን በቀላሉ ይቋቋማል።",
    wateringHint: "Water every 14–20 days",
    wateringHintAm: "በየ 14–20 ቀኑ ያጠጡ",
  },
  {
    plantSlug: "bougainvillea",
    roomName: "Balcony / Veranda",
    lightName: "Direct Sun",
    amharicRoom: "በረንዳ",
    amharicLight: "ቀጥተኛ የፀሐይ ብርሃን",
    whyMatched: "Loves intense Addis Ababa UV at 2,350m elevation; blooms vigorously under open sunlight.",
    whyMatchedAm: "የአዲስ አበባን የደጋ ከፍተኛ የፀሐይ ብርሃን ይወዳል፤ በአስደናቂ አበባዎች ያጌጣል።",
    wateringHint: "Water when top 2 inches dry",
    wateringHintAm: "የላይኛው አፈር ሲደርቅ ያጠጡ",
  },
  {
    plantSlug: "zz-plant",
    roomName: "Office / Desk",
    lightName: "Low Light",
    amharicRoom: "ቢሮ / ጠረጴዛ",
    amharicLight: "ደብዛዛ ብርሃን",
    whyMatched: "Virtually indestructible; glossy waxy foliage tolerates office lighting and forgotten watering.",
    whyMatchedAm: "በጣም ጠንካራ፤ የቢሮ መብራትንና የዘገየ አጠጣጥን ያለምንም ችግር ያልፋል።",
    wateringHint: "Water every 2–3 weeks",
    wateringHintAm: "በየ 2–3 ሳምንቱ ያጠጡ",
  },
  {
    plantSlug: "fiddle-leaf-fig",
    roomName: "Living Room",
    lightName: "Direct Sun",
    amharicRoom: "ሳሎን",
    amharicLight: "ቀጥተኛ የፀሐይ ብርሃን",
    whyMatched: "Stately violin-shaped foliage conditioned in Bishoftu to thrive in bright south or east windows.",
    whyMatchedAm: "በቢሾፍቱ ደጋ አየር የተላመደ ውብ ሰፊ ቅጠል፤ በቂ የጠዋት ብርሃን ይወዳል።",
    wateringHint: "Water when topsoil feels dry",
    wateringHintAm: "የላይኛው አፈር ሲደርቅ ያጠጡ",
  },
  {
    plantSlug: "peace-lily",
    roomName: "Bedroom",
    lightName: "Bright Indirect",
    amharicRoom: "መኝታ ቤት",
    amharicLight: "ብሩህ የተጣራ ብርሃን",
    whyMatched: "Air-purifying highland foliage with elegant white spathes; visibly lets you know when thirsty.",
    whyMatchedAm: "አየር የሚያጣራ፤ ውብ ነጭ አበቦች የሚያወጣና ውሃ ሲጠማው በግልጽ የሚያሳይ።",
    wateringHint: "Water every 5–7 days",
    wateringHintAm: "በየ 5–7 ቀኑ ያጠጡ",
  },
];

interface PlantMatcherProps {
  plants: PlantItem[];
}

export function PlantMatcher({ plants }: PlantMatcherProps) {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const { openInquiry } = useInquiry();

  const [selectedRoom, setSelectedRoom] = useState<string>("Living Room");
  const [selectedLight, setSelectedLight] = useState<string>("Bright Indirect");

  const rooms = [
    { id: "Living Room", label: lang === "am" ? "ሳሎን" : "Living Room", icon: Home },
    { id: "Bedroom", label: lang === "am" ? "መኝታ ቤት" : "Bedroom", icon: Moon },
    { id: "Office / Desk", label: lang === "am" ? "ቢሮ / ጠረጴዛ" : "Office / Desk", icon: Briefcase },
    { id: "Balcony / Veranda", label: lang === "am" ? "በረንዳ" : "Balcony / Veranda", icon: Sun },
  ];

  const lights = [
    { id: "Bright Indirect", label: lang === "am" ? "ብሩህ የተጣራ ብርሃን" : "Bright Indirect", icon: CloudSun, desc: lang === "am" ? "መስኮት አጠገብ" : "Near a window" },
    { id: "Direct Sun", label: lang === "am" ? "ቀጥተኛ የፀሐይ ብርሃን" : "Direct Sun", icon: Sun, desc: lang === "am" ? "4+ ሰዓት ፀሐይ" : "4+ hours sun" },
    { id: "Low Light", label: lang === "am" ? "ደብዛዛ ብርሃን" : "Low / Gentle Light", icon: Moon, desc: lang === "am" ? "ከመስኮት የራቀ" : "Farther from window" },
  ];

  // Match resolution
  const matchedData = useMemo(() => {
    const directRule = MATCH_DATABASE.find(
      (r) => r.roomName === selectedRoom && r.lightName === selectedLight
    );

    const fallbackRule = MATCH_DATABASE.find((r) => r.lightName === selectedLight) || MATCH_DATABASE[0];
    const rule = directRule || fallbackRule;

    const plant =
      plants.find((p) => p.slug === rule.plantSlug) ||
      plants.find((p) => p.slug === "monstera") ||
      plants[0];

    return { rule, plant };
  }, [selectedRoom, selectedLight, plants]);

  const { rule, plant } = matchedData;

  const roomLabel = rooms.find((r) => r.id === selectedRoom)?.label || selectedRoom;
  const lightLabel = lights.find((l) => l.id === selectedLight)?.label || selectedLight;

  const whatsappInquiryUrl =
    "https://wa.me/251942461641?text=" +
    encodeURIComponent(
      `Hi Evergreen! Your website quiz matched me with the ${plant.commonName} for my ${selectedRoom} with ${selectedLight}. Could you please confirm if this specimen is in stock and delivery details in Addis?`
    );

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 shadow-xl transition-all ${
        isDark
          ? "bg-forest/50 border-ivory/15 text-ivory"
          : "bg-white/95 border-forest/12 text-forest shadow-md"
      }`}
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-ivory/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide uppercase mb-2 border bg-leaf/15 text-leaf border-leaf/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "am" ? "ፈጣን የተክል መምረጫ" : "2-Step Room & Light Matcher"}</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-8">
            {lang === "am" ? "ለቤትዎ ትክክለኛውን ተክል ይምረጡ" : "Find the plant built for your space"}
          </h3>
          <p className={`text-xs sm:text-sm font-sans mt-1 leading-5 ${isDark ? "text-ivory/70" : "text-forest/70"}`}>
            {lang === "am"
              ? "የክፍልዎን ዓይነትና የብርሃን መጠን ይምረጡ፤ የአዲስ አበባን ደጋ አየር የተላመደ ተክል ወዲያውኑ ይጠቁምዎታል።"
              : "Pick where it will live and the natural light available. We'll show you which highland-acclimatized specimen will flourish."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedRoom("Living Room");
            setSelectedLight("Bright Indirect");
          }}
          className={`self-start sm:self-auto text-xs font-mono font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
            isDark
              ? "border-ivory/20 text-ivory/70 hover:text-ivory hover:border-ivory/40"
              : "border-forest/20 text-forest/70 hover:text-forest hover:border-forest/40"
          }`}
          title="Reset quiz"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{lang === "am" ? "ዳግም ጀምር" : "Reset"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Step 1 & 2 Selectors (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Question 1: Space */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider font-bold mb-3 block text-leaf">
              {lang === "am" ? "ደረጃ 1፡ ተክሉ የት ይቀመጣል?" : "Step 1: Where will it live?"}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {rooms.map((room) => {
                const Icon = room.icon;
                const isSelected = selectedRoom === room.id;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setSelectedRoom(room.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 min-h-[76px] ${
                      isSelected
                        ? "bg-leaf text-ivory border-leaf shadow-md scale-[1.02]"
                        : isDark
                          ? "bg-forest-deep/60 border-ivory/12 text-ivory/85 hover:border-ivory/25 hover:bg-forest-deep"
                          : "bg-forest/5 border-forest/10 text-forest/85 hover:border-forest/25 hover:bg-forest/10"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-2 ${isSelected ? "text-ivory" : "text-leaf"}`} />
                    <span className="text-xs font-heading font-semibold leading-4">
                      {room.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Light */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider font-bold mb-3 block text-leaf">
              {lang === "am" ? "ደረጃ 2፡ የቦታው የብርሃን መጠን ምን ይመስላል?" : "Step 2: Natural light available"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {lights.map((light) => {
                const Icon = light.icon;
                const isSelected = selectedLight === light.id;
                return (
                  <button
                    key={light.id}
                    type="button"
                    onClick={() => setSelectedLight(light.id)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                      isSelected
                        ? "bg-leaf text-ivory border-leaf shadow-md scale-[1.02]"
                        : isDark
                          ? "bg-forest-deep/60 border-ivory/12 text-ivory/85 hover:border-ivory/25 hover:bg-forest-deep"
                          : "bg-forest/5 border-forest/10 text-forest/85 hover:border-forest/25 hover:bg-forest/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-4 h-4 ${isSelected ? "text-ivory" : "text-leaf"}`} />
                      {isSelected && <Check className="w-4 h-4 text-ivory" />}
                    </div>
                    <div>
                      <span className="text-xs font-heading font-bold block leading-4">
                        {light.label}
                      </span>
                      <span className={`text-[11px] font-sans block mt-0.5 leading-3 ${isSelected ? "text-ivory/85" : isDark ? "text-ivory/60" : "text-forest/60"}`}>
                        {light.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active selection summary pill */}
          <div className={`p-3 rounded-xl border flex items-center gap-3 text-xs font-mono ${
            isDark ? "bg-forest-deep/40 border-ivory/10 text-ivory/80" : "bg-forest/5 border-forest/10 text-forest/80"
          }`}>
            <span className="font-semibold text-leaf">Matched for:</span>
            <span>{roomLabel}</span>
            <span>·</span>
            <span>{lightLabel}</span>
          </div>
        </div>

        {/* Live Result Specimen Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className={`h-full rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
            isDark ? "bg-forest-deep/80 border-ivory/15" : "bg-white border-forest/15 shadow-lg"
          }`}>
            <div>
              {/* Top result badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-leaf flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === "am" ? "የተመረጠ ተክል" : "Recommended Specimen"}</span>
                </span>
                <span className="text-xs font-mono font-bold text-leaf">
                  {plant.price}
                </span>
              </div>

              {/* Plant preview */}
              <div className="flex gap-4 items-center mb-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-ivory/15 shadow-sm">
                  <Image
                    src={plant.image}
                    alt={plant.imageAlt || plant.commonName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-xl leading-6 tracking-tight">
                    {lang === "am" && plant.amharicName ? plant.amharicName : plant.commonName}
                  </h4>
                  <span className="text-xs font-serif italic text-sage block mt-0.5">
                    {plant.botanicalName}
                  </span>
                  <div className="flex items-center gap-2 mt-2 text-[11px] font-mono">
                    <span className="inline-flex items-center gap-1 text-leaf">
                      <Droplets className="w-3 h-3" />
                      <span>{lang === "am" ? rule.wateringHintAm : rule.wateringHint}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Acclimatization reasoning */}
              <p className={`text-xs font-sans leading-5 p-3 rounded-xl border mb-4 ${
                isDark ? "bg-forest/50 border-ivory/10 text-ivory/85" : "bg-forest/5 border-forest/10 text-forest/85"
              }`}>
                {lang === "am" ? rule.whyMatchedAm : rule.whyMatched}
              </p>
            </div>

            {/* Direct Conversion Actions */}
            <div className="space-y-2 pt-2">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-leaf text-ivory font-semibold text-xs leading-4 tracking-wide hover:bg-leaf/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-98 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === "am" ? "ይህን ተክል በዋትስአፕ ይዘዙ" : "Claim on WhatsApp"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={() =>
                  openInquiry(
                    `${plant.commonName} (Matched via Room & Light Quiz: ${selectedRoom}, ${selectedLight})`
                  )
                }
                className={`w-full py-2.5 px-4 rounded-xl border text-xs font-medium leading-4 transition-all flex items-center justify-center gap-2 min-h-[40px] ${
                  isDark
                    ? "border-ivory/15 text-ivory/80 hover:text-ivory hover:bg-ivory/5"
                    : "border-forest/15 text-forest/80 hover:text-forest hover:bg-forest/5"
                }`}
              >
                <span>{lang === "am" ? "የስልክ ጥሪ ወይም ቅጽ ይሙሉ" : "Or open website inquiry sheet"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
