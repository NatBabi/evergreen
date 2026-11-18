import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const SESSION_COOKIE_NAME = "evergreen_admin_session";

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || "evergreen_ethiopia_secure_jwt_secret_key_2026_at_least_32_chars_long";
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Redirect alternate hostnames to the canonical origin in production
  const CANONICAL_HOST = "evergreen-ethiopia.vercel.app";
  const isPreview = process.env.VERCEL_ENV === "preview";
  if (
    !isPreview &&
    hostname !== CANONICAL_HOST &&
    hostname !== "localhost" &&
    !hostname.startsWith("localhost:") &&
    !hostname.startsWith("127.0.0.1")
  ) {
    const canonicalUrl = new URL(`https://${CANONICAL_HOST}${pathname}${search}`);
    return NextResponse.redirect(canonicalUrl, 308);
  }

  // 1. Exclude public admin routes (login page & login api)
  if (pathname === "/admin/login" || pathname === "/api/admin/auth/login") {
    return NextResponse.next();
  }

  // 2. Protect /admin/* frontend pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const key = getSecretKey();
      const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });

      // If owner must change temporary password, force redirect to /admin/change-password
      if (payload.mustChangePassword && pathname !== "/admin/change-password") {
        return NextResponse.redirect(new URL("/admin/change-password", request.url));
      }

      return NextResponse.next();
    } catch {
      // Invalid/expired token -> clear and redirect
      const loginUrl = new URL("/admin/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }
  }

  // 3. Protect /api/admin/* API routes
  if (pathname.startsWith("/api/admin")) {
    // change-password API is allowed if session has mustChangePassword
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Missing session token" }, { status: 401 });
    }

    try {
      const key = getSecretKey();
      const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });

      if (payload.mustChangePassword && pathname !== "/api/admin/auth/change-password") {
        return NextResponse.json(
          { error: "Password change required", code: "PASSWORD_CHANGE_REQUIRED" },
          { status: 403 }
        );
      }

      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next.js internals and static assets.
     * The hostname redirect needs to run on every public route,
     * and admin auth protection runs on /admin/* and /api/admin/*.
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|logo-evergreen\\.png|apple-touch-icon\\.png|icon-192\\.png|icon-512\\.png|icon\\.svg|vercel\\.svg|file\\.svg|globe\\.svg|next\\.svg|window\\.svg|video/).*)",
  ],
};
