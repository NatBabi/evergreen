"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInquiry } from "@/context/InquiryContext";
import { useTheme } from "@/context/ThemeContext";
import { X, Phone, Mail, Copy, Sparkles, Send, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

export function InquirySheet() {
  const { content, lang } = useLanguage();
  const { isOpen, subject, closeInquiry } = useInquiry();
  const { isDark } = useTheme();
  const { inquiryModal, brand } = content;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeInquiry();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Focus name input and reset transient state on open after animation
      const timer = setTimeout(() => {
        setStatusMsg(null);
        setErrors({});
        nameInputRef.current?.focus();
      }, 100);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeInquiry]);

  if (!isOpen) return null;

  const activeSubject = subject || inquiryModal.generalSubject;

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = lang === "am" ? "እባክዎ ስምዎን ያስገቡ" : "Please enter your name";
    }
    if (phone.trim() && !/^(\+251|0)?[79]\d{8}$/.test(phone.replace(/[\s\-()]+/g, ""))) {
      newErrors.phone =
        lang === "am"
          ? "እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ (ለምሳሌ 0942...)"
          : "Please enter a valid phone number (e.g. 0942...)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFullMessageText = () => {
    const greeting = `Hello Evergreen Ethiopia (@evergreen_ethiopia),`;
    const plantLine = `Inquiry regarding: ${activeSubject}`;
    const nameLine = name.trim() ? `Name: ${name.trim()}` : "";
    const phoneLine = phone.trim() ? `Phone: ${phone.trim()}` : "";
    const notesLine = notes.trim()
      ? `Notes: ${notes.trim()}`
      : `Could you please confirm if this specimen is currently available, along with pot size options and delivery details? Thank you!`;

    return [greeting, plantLine, nameLine, phoneLine, notesLine]
      .filter(Boolean)
      .join("\n");
  };

  const handleWhatsApp = () => {
    if (!validate()) {
      setStatusMsg({
        type: "error",
        text: lang === "am" ? "እባክዎ ከመላክዎ በፊት ስምዎን ያስገቡ።" : "Please provide your name before sending.",
      });
      return;
    }

    const message = getFullMessageText();
    const url = `https://wa.me/251942461641?text=${encodeURIComponent(message)}`;
    setStatusMsg({
      type: "success",
      text: lang === "am" ? "መልዕክቱ ተዘጋጅቷል! ወደ ዋትስአፕ በመሄድ ላይ..." : "Inquiry ready! Opening WhatsApp...",
    });

    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 400);
  };

  const handleCopy = async () => {
    try {
      const message = getFullMessageText();
      await navigator.clipboard.writeText(message);
      setStatusMsg({
        type: "success",
        text: lang === "am" ? "መልዕክቱ ተገልብጧል (ኮፒ ተደርጓል)!" : "Inquiry text copied to clipboard!",
      });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({
        type: "error",
        text: lang === "am" ? "ኮፒ ማድረግ አልተቻለም።" : "Unable to copy to clipboard.",
      });
    }
  };

  const emailSubject = encodeURIComponent(`Evergreen Ethiopia Inquiry: ${activeSubject}`);
  const emailBody = encodeURIComponent(getFullMessageText());

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className={`fixed inset-0 z-[200] backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200 ${
        isDark ? "bg-forest-deep/75" : "bg-forest-deep/45"
      }`}
      onClick={closeInquiry}
    >
      <div
        className={`w-full sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl flex flex-col justify-between animate-in slide-in-from-bottom duration-300 transition-colors ${
          isDark
            ? "bg-forest-deep text-ivory border border-ivory/15"
            : "bg-[#FBF9F3] text-forest border border-forest/15"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-2 leading-4 transition-colors ${
                  isDark
                    ? "bg-forest/80 border border-ivory/15 text-ivory"
                    : "bg-forest/10 border border-forest/15 text-forest"
                }`}
              >
                <Sparkles className="w-4 h-4 text-leaf" />
                <span>Evergreen Ethiopia · Addis Ababa</span>
              </div>
              <h2
                id="inquiry-modal-title"
                className={`font-heading font-extrabold text-2xl sm:text-[32px] tracking-tight leading-8 sm:leading-[40px] transition-colors ${
                  isDark ? "text-ivory" : "text-forest"
                }`}
              >
                {inquiryModal.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeInquiry}
              className={`p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf ${
                isDark ? "hover:bg-ivory/10 text-ivory" : "hover:bg-forest/10 text-forest"
              }`}
              aria-label={inquiryModal.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p
            className={`text-xs sm:text-base font-sans leading-4 sm:leading-6 mb-4 transition-colors ${
              isDark ? "text-ivory/75" : "text-forest/75"
            }`}
          >
            {inquiryModal.subtitle}
          </p>

          {/* Plant Subject Pill */}
          <div
            className={`p-4 rounded-2xl mb-4 transition-colors ${
              isDark ? "bg-forest/50 border border-ivory/15" : "bg-white border border-forest/15 shadow-xs"
            }`}
          >
            <span
              className={`text-xs uppercase tracking-wider font-mono block mb-1 leading-4 ${
                isDark ? "text-ivory/60" : "text-forest/60"
              }`}
            >
              {inquiryModal.plantSubjectLabel}
            </span>
            <span
              className={`font-heading font-bold text-base leading-6 ${
                isDark ? "text-ivory" : "text-forest"
              }`}
            >
              {activeSubject}
            </span>
          </div>

          {/* Dynamic Feedback Banner (Success / Error) */}
          {statusMsg && (
            <div
              role="alert"
              className={`p-3 rounded-xl mb-4 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200 leading-4 ${
                statusMsg.type === "success"
                  ? isDark
                    ? "bg-leaf/20 text-ivory border border-leaf/40"
                    : "bg-leaf/15 text-forest border border-leaf/40"
                  : isDark
                  ? "bg-red-950/40 text-red-300 border border-red-500/30"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {statusMsg.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-leaf shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Form Fields with accessible labels, errors and IDs */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="inquiry-name"
                  className={`block text-xs font-semibold font-sans leading-4 transition-colors ${
                    isDark ? "text-ivory" : "text-forest"
                  }`}
                >
                  {inquiryModal.nameLabel} <span className="text-leaf">*</span>
                </label>
                {errors.name && (
                  <span className="text-xs text-red-400 font-sans leading-4">{errors.name}</span>
                )}
              </div>
              <input
                ref={nameInputRef}
                id="inquiry-name"
                type="text"
                aria-required="true"
                aria-invalid={!!errors.name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder={inquiryModal.namePlaceholder}
                className={`w-full px-4 py-3 rounded-2xl border text-base leading-6 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-400 focus:ring-red-400 bg-red-950/20"
                    : isDark
                    ? "bg-forest/40 border-ivory/15 text-ivory placeholder:text-ivory/40 focus:ring-leaf"
                    : "bg-white border-forest/20 text-forest placeholder:text-forest/40 focus:ring-forest shadow-xs"
                }`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="inquiry-phone"
                  className={`block text-xs font-semibold font-sans leading-4 transition-colors ${
                    isDark ? "text-ivory" : "text-forest"
                  }`}
                >
                  {inquiryModal.phoneLabel}
                </label>
                {errors.phone && (
                  <span className="text-xs text-red-400 font-sans leading-4">{errors.phone}</span>
                )}
              </div>
              <input
                id="inquiry-phone"
                type="tel"
                aria-invalid={!!errors.phone}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder={inquiryModal.phonePlaceholder}
                className={`w-full px-4 py-3 rounded-2xl border text-base font-mono leading-6 focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? "border-red-400 focus:ring-red-400 bg-red-950/20"
                    : isDark
                    ? "bg-forest/40 border-ivory/15 text-ivory placeholder:text-ivory/40 focus:ring-leaf"
                    : "bg-white border-forest/20 text-forest placeholder:text-forest/40 focus:ring-forest shadow-xs"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-notes"
                className={`block text-xs font-semibold mb-1 font-sans leading-4 transition-colors ${
                  isDark ? "text-ivory" : "text-forest"
                }`}
              >
                {inquiryModal.notesLabel}
              </label>
              <textarea
                id="inquiry-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={inquiryModal.notesPlaceholder}
                className={`w-full px-4 py-3 rounded-2xl border text-base leading-6 focus:outline-none focus:ring-2 transition-all resize-none ${
                  isDark
                    ? "bg-forest/40 border-ivory/15 text-ivory placeholder:text-ivory/40 focus:ring-leaf"
                    : "bg-white border-forest/20 text-forest placeholder:text-forest/40 focus:ring-forest shadow-xs"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons: WhatsApp Direct, Phone Call, Clickable Email, Copy Message */}
        <div
          className={`space-y-3 pt-3 border-t transition-colors ${
            isDark ? "border-ivory/10" : "border-forest/10"
          }`}
        >
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-3 px-6 rounded-full bg-leaf text-ivory font-semibold text-base leading-6 hover:bg-leaf/90 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest min-h-[48px]"
          >
            <Send className="w-4 h-4" />
            <span>{inquiryModal.whatsappDirectBtn}</span>
          </button>

          {/* Clickable Phone Lines */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${brand.phonePrimaryRaw}`}
              className={`py-3 px-3 rounded-full font-semibold text-xs leading-4 transition-all flex items-center justify-center gap-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[44px] ${
                isDark
                  ? "bg-forest/80 hover:bg-forest border border-ivory/20 text-ivory shadow-sm"
                  : "bg-white hover:bg-forest/5 border border-forest/20 text-forest shadow-xs"
              }`}
            >
              <Phone className="w-4 h-4 text-leaf shrink-0" />
              <span className="truncate">{inquiryModal.callPrimaryBtn}</span>
            </a>

            <a
              href={`tel:${brand.phoneSecondaryRaw}`}
              className={`py-3 px-3 rounded-full font-semibold text-xs leading-4 transition-all flex items-center justify-center gap-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[44px] ${
                isDark
                  ? "bg-forest/80 hover:bg-forest border border-ivory/20 text-ivory shadow-sm"
                  : "bg-white hover:bg-forest/5 border border-forest/20 text-forest shadow-xs"
              }`}
            >
              <Phone className="w-4 h-4 text-leaf shrink-0" />
              <span className="truncate">{inquiryModal.callSecondaryBtn}</span>
            </a>
          </div>

          {/* Clickable Email Option & Copy Action */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`mailto:${brand.email}?subject=${emailSubject}&body=${emailBody}`}
              className={`py-3 px-3 rounded-full font-semibold text-xs leading-4 transition-all flex items-center justify-center gap-2 text-center min-h-[44px] ${
                isDark
                  ? "bg-forest/50 hover:bg-forest/70 text-ivory border border-ivory/15 shadow-sm"
                  : "bg-white hover:bg-forest/5 text-forest border border-forest/15 shadow-xs"
              }`}
            >
              <Mail className="w-4 h-4 text-leaf shrink-0" />
              <span className="truncate">Email Us</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className={`py-3 px-3 rounded-full font-medium text-xs leading-4 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[44px] ${
                isDark
                  ? "bg-forest/50 hover:bg-forest/70 text-ivory border border-ivory/15 shadow-sm"
                  : "bg-white hover:bg-forest/5 text-forest border border-forest/15 shadow-xs"
              }`}
            >
              <Copy className="w-4 h-4 text-leaf shrink-0" />
              <span className="truncate">{inquiryModal.copyInquiryBtn}</span>
            </button>
          </div>

          <p
            className={`text-xs text-center font-mono pt-1 flex items-center justify-center gap-1 leading-4 transition-colors ${
              isDark ? "text-ivory/60" : "text-forest/60"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-leaf" />
            <span>{inquiryModal.privacyNote}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
