"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      router.push("/admin/plants");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-[#0b241b] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-ivory tracking-tight mb-1">
            Choose Your Permanent Password
          </h1>
          <p className="text-xs text-amber-200/80 font-mono">
            First-time security check: Replace your temporary credentials
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-ivory/70 uppercase tracking-wider mb-1.5">
              New Password (minimum 8 characters)
            </label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf transition-colors min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ivory/70 uppercase tracking-wider mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf transition-colors min-h-[44px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-6 rounded-full bg-leaf text-ivory text-sm font-semibold hover:bg-leaf/90 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 min-h-[48px]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{loading ? "Updating password..." : "Save password and continue"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
