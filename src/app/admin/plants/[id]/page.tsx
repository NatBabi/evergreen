"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Upload,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";

interface VariantForm {
  id?: number;
  nameEn: string;
  nameAm?: string;
  heightRange?: string;
  priceEtb: number;
  stockStatus: "in_stock" | "ask" | "seasonal" | "out";
  isDefault: boolean;
  sortOrder: number;
}

function PlantEditClient() {
  const router = useRouter();
  const params = useParams();
  const plantId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"en" | "am">("en");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [nameEn, setNameEn] = useState("");
  const [nameAm, setNameAm] = useState("");
  const [botanicalName, setBotanicalName] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAm, setDescriptionAm] = useState("");
  const [priceEtb, setPriceEtb] = useState<number>(0);
  const [stockStatus, setStockStatus] = useState<"in_stock" | "ask" | "seasonal" | "out">("ask");
  const [sizeNote, setSizeNote] = useState("");
  const [images, setImages] = useState<Array<{ url: string; altEn?: string }>>([]);
  const [variants, setVariants] = useState<VariantForm[]>([]);

  useEffect(() => {
    if (!plantId) return;
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/plants/${plantId}`);
        const data = await res.json();

        if (!res.ok || !data.plant) {
          throw new Error(data.error || "Failed to load plant details");
        }

        const p = data.plant;
        setNameEn(p.nameEn || "");
        setNameAm(p.nameAm || "");
        setBotanicalName(p.botanicalName || "");
        setDescriptionEn(p.descriptionEn || "");
        setDescriptionAm(p.descriptionAm || "");
        setPriceEtb(Number(p.priceEtb || 0));
        setStockStatus(p.stockStatus || "ask");
        setSizeNote(p.sizeNote || "");
        setImages(p.images || []);
        setVariants(
          p.variants?.map((v: any) => ({
            id: v.id,
            nameEn: v.nameEn,
            nameAm: v.nameAm || "",
            heightRange: v.heightRange || "",
            priceEtb: Number(v.priceEtb || 0),
            stockStatus: v.stockStatus || "in_stock",
            isDefault: Boolean(v.isDefault),
            sortOrder: v.sortOrder || 0,
          })) || []
        );
      } catch (err: any) {
        setMessage({ type: "error", text: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [plantId]);

  // Handle Photo Upload (Direct from Phone Camera or File System)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side quick validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: "error", text: "Please select a JPEG, PNG, or WebP photo." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Photo is larger than 5MB. Please choose a smaller photo." });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setImages((prev) => [...prev, { url: data.url, altEn: nameEn || "Plant photo" }]);
      setMessage({ type: "success", text: "Photo uploaded and added to gallery!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        nameEn: "Tabletop",
        nameAm: "የጠረጴዛ",
        heightRange: "30–45 cm",
        priceEtb: priceEtb || 850,
        stockStatus: "in_stock",
        isDefault: prev.length === 0,
        sortOrder: prev.length + 1,
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateVariant = (index: number, field: keyof VariantForm, value: any) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const payload = {
        nameEn,
        nameAm,
        botanicalName,
        descriptionEn,
        descriptionAm,
        priceEtb: Number(priceEtb),
        stockStatus,
        sizeNote,
        variants,
      };

      const res = await fetch(`/api/admin/plants/${plantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }

      setMessage({ type: "success", text: "Plant details saved successfully!" });
      setTimeout(() => {
        router.push("/admin/plants");
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <RefreshCw className="w-8 h-8 text-leaf animate-spin" />
        <p className="text-sm font-mono text-ivory/60">Loading plant specifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/plants"
          className="inline-flex items-center gap-2 text-xs font-mono text-ivory/70 hover:text-ivory bg-forest/40 px-3 py-1.5 rounded-full border border-ivory/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-leaf" />
          <span>Back to stock list</span>
        </Link>
        <span className="text-xs font-mono text-ivory/40">Specimen #{plantId}</span>
      </div>

      <div className="bg-[#0b241b] border border-ivory/15 rounded-3xl p-5 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-ivory/10">
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-ivory tracking-tight">
              Edit Specimen: {nameEn || "New Plant"}
            </h1>
            <p className="font-serif italic text-xs text-ivory/60">{botanicalName}</p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-leaf text-ivory text-xs font-semibold hover:bg-leaf/90 transition-colors shadow-md disabled:opacity-50 min-h-[44px]"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save changes"}</span>
          </button>
        </div>

        {/* Status Notification */}
        {message && (
          <div
            className={`mb-6 p-3 rounded-2xl text-xs flex items-center justify-between border ${
              message.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-200"
                : "bg-red-950/80 border-red-500/30 text-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
            <button type="button" onClick={() => setMessage(null)} className="text-ivory/50 p-1">
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Photo Gallery & Direct Camera Upload */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ivory/70 mb-2">
              Specimen Photography (Tap photo to snap or choose)
            </label>
            <div className="flex flex-wrap gap-3 items-center">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-2xl overflow-hidden border border-ivory/20 group bg-forest/60"
                >
                  <Image
                    src={img.url}
                    alt={img.altEn || "Plant photo"}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-red-300 hover:text-red-100 opacity-90 group-hover:opacity-100 transition-opacity"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Upload & Camera Buttons */}
              <label
                className={`relative w-20 h-20 rounded-2xl border-2 border-dashed border-ivory/20 hover:border-leaf/60 bg-forest/30 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  uploading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  capture="environment"
                  onChange={handlePhotoUpload}
                  className="sr-only"
                />
                {uploading ? (
                  <RefreshCw className="w-5 h-5 text-leaf animate-spin" />
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-leaf mb-1" />
                    <span className="text-[10px] font-mono text-ivory/60 text-center leading-tight">
                      Camera
                    </span>
                  </>
                )}
              </label>

              <label
                className={`relative w-20 h-20 rounded-2xl border-2 border-dashed border-ivory/20 hover:border-leaf/60 bg-forest/30 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  uploading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handlePhotoUpload}
                  className="sr-only"
                />
                <Upload className="w-5 h-5 text-leaf mb-1" />
                <span className="text-[10px] font-mono text-ivory/60 text-center leading-tight">
                  Upload
                </span>
              </label>
            </div>
          </div>

          {/* Bilingual Information Tabs */}
          <div className="pt-2">
            <div className="flex border-b border-ivory/15 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`py-2 px-4 text-xs font-semibold rounded-t-xl transition-colors ${
                  activeTab === "en"
                    ? "bg-leaf/20 text-leaf border-b-2 border-leaf"
                    : "text-ivory/60 hover:text-ivory"
                }`}
              >
                English Information
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("am")}
                className={`py-2 px-4 text-xs font-semibold rounded-t-xl transition-colors ${
                  activeTab === "am"
                    ? "bg-leaf/20 text-leaf border-b-2 border-leaf"
                    : "text-ivory/60 hover:text-ivory"
                }`}
              >
                የአማርኛ መረጃ (Amharic)
              </button>
            </div>

            {activeTab === "en" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-ivory/70 uppercase mb-1">
                    Common Name (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full px-4 py-2 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm focus:outline-none focus:border-leaf min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-ivory/70 uppercase mb-1">
                    Botanical Name (Latin)
                  </label>
                  <input
                    type="text"
                    value={botanicalName}
                    onChange={(e) => setBotanicalName(e.target.value)}
                    placeholder="e.g. Monstera deliciosa"
                    className="w-full px-4 py-2 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm italic focus:outline-none focus:border-leaf min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-ivory/70 uppercase mb-1">
                    Description & Placement Trait (English)
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-forest/40 border border-ivory/20 text-ivory text-sm focus:outline-none focus:border-leaf"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-ivory/70 uppercase mb-1">
                    የተክሉ መጠሪያ ስም (Amharic Name)
                  </label>
                  <input
                    type="text"
                    value={nameAm}
                    onChange={(e) => setNameAm(e.target.value)}
                    placeholder="ለምሳሌ፡ ሞንስተራ"
                    className="w-full px-4 py-2 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm focus:outline-none focus:border-leaf min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-ivory/70 uppercase mb-1">
                    የተክሉ ማብራሪያና እንክብካቤ (Amharic Description)
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionAm}
                    onChange={(e) => setDescriptionAm(e.target.value)}
                    placeholder="ስለ ተክሉ አጭር መግለጫ እዚህ ያስገቡ..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-forest/40 border border-ivory/20 text-ivory text-sm focus:outline-none focus:border-leaf"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Stock Settings */}
          <div className="pt-2 border-t border-ivory/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-ivory/70 uppercase mb-1">
                Base Price (ETB)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={priceEtb}
                onChange={(e) => setPriceEtb(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm focus:outline-none focus:border-leaf min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-ivory/70 uppercase mb-1">
                Stock Status
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as any)}
                className="w-full px-4 py-2 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm focus:outline-none focus:border-leaf min-h-[44px]"
              >
                <option value="in_stock" className="bg-forest-deep text-ivory">In Stock (በክምችት አለ)</option>
                <option value="ask" className="bg-forest-deep text-ivory">Ask Nursery (ያረጋግጡ)</option>
                <option value="seasonal" className="bg-forest-deep text-ivory">Seasonal (ወቅታዊ)</option>
                <option value="out" className="bg-forest-deep text-ivory">Out of Stock (አልቋል)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-ivory/70 uppercase mb-1">
                Size Range
              </label>
              <input
                type="text"
                placeholder="e.g. 60–100 cm"
                value={sizeNote}
                onChange={(e) => setSizeNote(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm focus:outline-none focus:border-leaf min-h-[44px]"
              />
            </div>
          </div>

          {/* Size Variants Table / Manager */}
          <div className="pt-4 border-t border-ivory/10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-ivory/70 block">
                  Size & Pot Variants (Optional)
                </span>
                <span className="text-[11px] font-mono text-ivory/50">
                  Different heights and prices for this specimen
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddVariant}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-forest/60 hover:bg-forest text-leaf text-xs font-semibold border border-ivory/15 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add size variant</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {variants.map((v, i) => (
                <div
                  key={i}
                  className="bg-forest/30 border border-ivory/15 rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 justify-between"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1 w-full">
                    <input
                      type="text"
                      placeholder="Size name (e.g. Living Room)"
                      value={v.nameEn}
                      onChange={(e) => handleUpdateVariant(i, "nameEn", e.target.value)}
                      className="px-3 py-1.5 rounded-full bg-forest/50 border border-ivory/15 text-xs text-ivory min-h-[36px]"
                    />
                    <input
                      type="text"
                      placeholder="Height (e.g. 70–85 cm)"
                      value={v.heightRange || ""}
                      onChange={(e) => handleUpdateVariant(i, "heightRange", e.target.value)}
                      className="px-3 py-1.5 rounded-full bg-forest/50 border border-ivory/15 text-xs text-ivory min-h-[36px]"
                    />
                    <input
                      type="number"
                      placeholder="Price (ETB)"
                      value={v.priceEtb}
                      onChange={(e) => handleUpdateVariant(i, "priceEtb", Number(e.target.value))}
                      className="px-3 py-1.5 rounded-full bg-forest/50 border border-ivory/15 text-xs text-ivory font-mono font-semibold text-leaf min-h-[36px]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(i)}
                    className="p-2 rounded-full text-red-300 hover:text-red-100 hover:bg-red-950/40 transition-colors self-end sm:self-center"
                    title="Remove variant"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-ivory/10 flex items-center justify-end gap-3">
            <Link
              href="/admin/plants"
              className="px-5 py-2.5 rounded-full border border-ivory/20 text-xs font-semibold text-ivory/70 hover:text-ivory transition-colors min-h-[44px] flex items-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-leaf text-ivory text-xs font-semibold hover:bg-leaf/90 transition-colors shadow-md disabled:opacity-50 min-h-[44px]"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save all changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditPlantPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <RefreshCw className="w-8 h-8 text-leaf animate-spin" />
          <p className="text-sm font-mono text-ivory/60">Loading editor...</p>
        </div>
      }
    >
      <PlantEditClient />
    </Suspense>
  );
}
