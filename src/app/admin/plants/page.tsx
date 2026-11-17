"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  Edit,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  XCircle,
  RefreshCw,
  Search,
} from "lucide-react";

interface Variant {
  id: number;
  nameEn: string;
  nameAm: string | null;
  heightRange: string | null;
  priceEtb: number | string;
  stockStatus: string;
}

interface Plant {
  id: number;
  slug: string;
  nameEn: string;
  nameAm: string | null;
  botanicalName: string | null;
  priceEtb: number | string;
  stockStatus: "in_stock" | "ask" | "seasonal" | "out";
  sizeNote: string | null;
  images: Array<{ url: string; altEn: string | null }>;
  variants: Variant[];
}

const STATUS_CONFIG = {
  in_stock: {
    label: "In Stock",
    labelAm: "በክምችት አለ",
    icon: CheckCircle2,
    color: "bg-emerald-950/70 border-emerald-500/40 text-emerald-300",
    activePill: "bg-emerald-500 text-white shadow-sm",
  },
  ask: {
    label: "Ask Nursery",
    labelAm: "ያረጋግጡ",
    icon: HelpCircle,
    color: "bg-amber-950/70 border-amber-500/40 text-amber-300",
    activePill: "bg-amber-500 text-forest-deep shadow-sm",
  },
  seasonal: {
    label: "Seasonal",
    labelAm: "ወቅታዊ",
    icon: Clock,
    color: "bg-purple-950/70 border-purple-500/40 text-purple-300",
    activePill: "bg-purple-500 text-white shadow-sm",
  },
  out: {
    label: "Out of Stock",
    labelAm: "አልቋል",
    icon: XCircle,
    color: "bg-red-950/70 border-red-500/40 text-red-300",
    activePill: "bg-red-500 text-white shadow-sm",
  },
};

export default function AdminPlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/plants");
      const data = await res.json();
      if (res.ok && data.plants) {
        setPlants(data.plants);
      } else {
        throw new Error(data.error || "Failed to load plants");
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleStockUpdate = async (plantId: number, newStatus: "in_stock" | "ask" | "seasonal" | "out") => {
    setUpdatingId(plantId);
    // Optimistic UI update
    setPlants((prev) =>
      prev.map((p) => (p.id === plantId ? { ...p, stockStatus: newStatus } : p))
    );

    try {
      const res = await fetch("/api/admin/plants/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: plantId, stockStatus: newStatus }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update stock");
      }

      setStatusMessage({
        type: "success",
        text: `Availability updated to ${STATUS_CONFIG[newStatus].label}`,
      });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
      // Revert on error
      fetchPlants();
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredPlants = plants.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.nameEn.toLowerCase().includes(q) ||
      (p.nameAm && p.nameAm.includes(q)) ||
      (p.botanicalName && p.botanicalName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-ivory">
            Plant Inventory & Availability
          </h1>
          <p className="text-xs sm:text-sm font-mono text-ivory/60 mt-0.5">
            Manage real-time availability and prices across Addis Ababa
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-ivory/40 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search nursery stock..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-forest/40 border border-ivory/15 text-xs text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-leaf min-h-[40px]"
          />
        </div>
      </div>

      {/* Floating Status Notification */}
      {statusMessage && (
        <div
          className={`p-3 rounded-2xl text-xs flex items-center justify-between border shadow-lg ${
            statusMessage.type === "success"
              ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-200"
              : "bg-red-950/80 border-red-500/30 text-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-ivory/50 hover:text-ivory p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <RefreshCw className="w-6 h-6 text-leaf animate-spin" />
          <p className="text-xs font-mono text-ivory/60">Loading live stock catalog...</p>
        </div>
      ) : filteredPlants.length === 0 ? (
        <div className="text-center py-16 bg-[#0b241b] rounded-3xl border border-ivory/10 p-8">
          <Sprout className="w-10 h-10 text-leaf mx-auto mb-3 opacity-60" />
          <p className="font-heading font-semibold text-lg text-ivory mb-1">No specimens found</p>
          <p className="text-xs text-ivory/60 font-mono">Try adjusting your search query</p>
        </div>
      ) : (
        /* Mobile-First Plant Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlants.map((plant) => {
            const currentStatus = plant.stockStatus || "ask";
            const imageUrl = plant.images?.[0]?.url || "https://images.unsplash.com/photo-1614594975525-e45190c55d0b";
            const price = Number(plant.priceEtb || 0);

            return (
              <div
                key={plant.id}
                className="bg-[#0b241b] border border-ivory/15 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-md hover:border-ivory/30 transition-colors"
              >
                {/* Header: Thumbnail + Titles + Price */}
                <div className="flex gap-3.5 items-start mb-4">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-forest/60 border border-ivory/15 shrink-0">
                    <Image
                      src={imageUrl}
                      alt={plant.nameEn}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-heading font-bold text-base sm:text-lg text-ivory truncate">
                        {plant.nameEn}
                      </h2>
                      {plant.nameAm && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-forest/80 text-ivory/90 border border-ivory/10 shrink-0">
                          {plant.nameAm}
                        </span>
                      )}
                    </div>

                    <p className="font-serif italic text-xs text-ivory/60 truncate mt-0.5">
                      {plant.botanicalName || "Highland specimen"}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-mono font-bold text-leaf bg-leaf/10 border border-leaf/20 px-2 py-0.5 rounded-full">
                        {price > 0 ? `${price.toLocaleString()} ETB` : "Price on inquiry"}
                      </span>
                      {plant.variants && plant.variants.length > 0 && (
                        <span className="text-[11px] font-mono text-ivory/50">
                          {plant.variants.length} size variants
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Single-Tap Availability Switcher (Touch Targets >= 44px) */}
                <div className="mt-1 pt-3 border-t border-ivory/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ivory/50 block mb-2">
                    Tap to update availability:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map((statusKey) => {
                      const cfg = STATUS_CONFIG[statusKey];
                      const isActive = currentStatus === statusKey;
                      const isUpdating = updatingId === plant.id;

                      return (
                        <button
                          key={statusKey}
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleStockUpdate(plant.id, statusKey)}
                          className={`px-2 py-2 rounded-full text-xs font-semibold leading-tight transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
                            isActive
                              ? cfg.activePill
                              : "bg-forest/40 hover:bg-forest/80 text-ivory/70 border border-ivory/10"
                          } ${isUpdating ? "opacity-50" : ""}`}
                          title={cfg.label}
                        >
                          <cfg.icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{cfg.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="mt-4 pt-3 border-t border-ivory/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-ivory/40">ID #{plant.id}</span>
                  <Link
                    href={`/admin/plants/${plant.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-leaf hover:text-ivory bg-leaf/15 hover:bg-leaf/30 px-3 py-1.5 rounded-full border border-leaf/30 transition-colors min-h-[36px]"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit details & photos</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
