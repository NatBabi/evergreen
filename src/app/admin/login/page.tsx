"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.mustChangePassword) {
        router.push("/admin/change-password");
      } else {
        router.push("/admin/plants");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-[#0b241b] border border-ivory/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-leaf/20 text-leaf border border-leaf/30 mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-ivory tracking-tight mb-1">
            Nursery Manager Sign In
          </h1>
          <p className="text-xs text-ivory/60 font-mono">
            Authorized personnel only · Single admin portal
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-ivory/70 uppercase tracking-wider mb-1.5">
              Owner Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ivory/40 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="owner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-ivory/70 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ivory/40 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-forest/40 border border-ivory/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-6 rounded-full bg-leaf text-ivory text-sm font-semibold hover:bg-leaf/90 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 min-h-[48px]"
          >
            <span>{loading ? "Signing in..." : "Sign in to nursery dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-ivory/10 text-center text-[11px] font-mono text-ivory/50">
          First-time provisioning requires CLI command:
          <code className="block mt-1 text-leaf bg-forest-deep px-2 py-1 rounded">
            node scripts/provision-admin.mjs --email your@email.com
          </code>
        </div>
      </div>
    </div>
  );
}
