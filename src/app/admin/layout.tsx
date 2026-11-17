import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAdminSession } from "@/lib/auth";
import { Sprout, LogOut, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Evergreen Ethiopia · Nursery Admin",
  description: "Mobile-first plant inventory management for Evergreen Ethiopia",
  robots: "noindex, nofollow",
};

async function AdminHeaderContent() {
  const session = await getAdminSession();

  return (
    <div className="max-w-5xl mx-auto flex items-center justify-between">
      <Link href="/admin/plants" className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-forest/40 border border-ivory/20 flex items-center justify-center shrink-0">
          <Image
            src="/logo-evergreen.png"
            alt="Evergreen Seal"
            width={28}
            height={28}
            className="object-contain"
            priority
          />
        </div>
        <div>
          <div className="font-heading font-extrabold text-sm sm:text-base tracking-tight leading-none">
            <span>evergreen</span>
            <span className="font-serif italic font-normal text-leaf ml-1">ethiopia</span>
          </div>
          <span className="text-[10px] font-mono text-leaf uppercase tracking-wider block mt-0.5">
            Nursery Manager
          </span>
        </div>
      </Link>

      {session ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden md:flex items-center gap-1.5 text-xs font-mono text-ivory/70 bg-forest/40 px-2.5 py-1 rounded-full border border-ivory/10">
            <ShieldCheck className="w-3.5 h-3.5 text-leaf" />
            <span className="truncate max-w-[140px]">{session.email}</span>
          </span>

          <Link
            href="/plants"
            target="_blank"
            className="p-2 rounded-full bg-forest/50 hover:bg-forest text-ivory/80 hover:text-ivory border border-ivory/10 text-xs flex items-center gap-1 transition-colors min-h-[36px] min-w-[36px]"
            title="View Live Public Catalog"
          >
            <ExternalLink className="w-4 h-4 text-leaf" />
            <span className="hidden sm:inline text-xs">Public Site</span>
          </Link>

          <form action="/api/admin/auth/logout" method="POST">
            <button
              type="submit"
              className="p-2 rounded-full bg-forest/50 hover:bg-red-950/60 text-ivory/80 hover:text-red-300 border border-ivory/10 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="text-xs font-mono text-leaf flex items-center gap-1.5">
          <Sprout className="w-4 h-4" />
          <span>Secure Portal</span>
        </div>
      )}
    </div>
  );
}

function AdminHeaderSkeleton() {
  return (
    <div className="max-w-5xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-forest/40 animate-pulse" />
        <div className="h-4 w-32 bg-forest/40 rounded animate-pulse" />
      </div>
      <div className="h-8 w-24 bg-forest/40 rounded-full animate-pulse" />
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#071B14] text-ivory flex flex-col font-sans selection:bg-leaf selection:text-ivory">
      {/* Top Mobile-First App Header with Suspense Boundary for Partial Prerendering */}
      <header className="sticky top-0 z-40 bg-[#071B14]/90 backdrop-blur-md border-b border-ivory/10 px-4 sm:px-6 py-3">
        <Suspense fallback={<AdminHeaderSkeleton />}>
          <AdminHeaderContent />
        </Suspense>
      </header>

      {/* Main Admin View Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 pb-24 sm:pb-12">
        {children}
      </main>

      {/* Subtle Bottom Status Bar */}
      <footer className="border-t border-ivory/10 py-3 px-4 text-center text-xs font-mono text-ivory/40">
        Evergreen Ethiopia Botanical Nursery · Bishoftu / Addis Ababa · Private Administration
      </footer>
    </div>
  );
}
