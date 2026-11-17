import { NextResponse } from "next/server";
import { verifyPassword, signAdminToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { prisma, isDatabaseConfigured } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    let adminRecord: { id: number; email: string; passwordHash: string; role: "owner" | "staff"; mustChangePassword: boolean; active: boolean } | null = null;

    if (isDatabaseConfigured()) {
      try {
        const user = await prisma.adminUser.findUnique({
          where: { email: cleanEmail },
        });
        if (user) {
          adminRecord = {
            id: user.id,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role,
            mustChangePassword: user.mustChangePassword,
            active: user.active,
          };
        }
      } catch (dbErr) {
        console.error("Database query error in admin login:", dbErr);
      }
    }

    // Check environment fallback if database record wasn't found
    if (!adminRecord) {
      let fallbackEmail = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
      let fallbackHash = process.env.INITIAL_ADMIN_HASH;

      // Safely read unexpanded hash from .env.local to avoid dotenv-expand mangling '$'
      if (!fallbackHash || fallbackHash.length < 50) {
        try {
          const fs = await import("fs");
          const path = await import("path");
          const envPath = path.join(process.cwd(), ".env.local");
          if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, "utf-8");
            for (const line of content.split("\n")) {
              if (line.startsWith("INITIAL_ADMIN_EMAIL=")) {
                fallbackEmail = line.replace("INITIAL_ADMIN_EMAIL=", "").replace(/["']/g, "").trim().toLowerCase();
              } else if (line.startsWith("INITIAL_ADMIN_HASH=")) {
                fallbackHash = line.replace("INITIAL_ADMIN_HASH=", "").replace(/["']/g, "").trim();
              }
            }
          }
        } catch (_) {}
      }

      if (fallbackEmail && fallbackHash && fallbackEmail === cleanEmail) {
        adminRecord = {
          id: 1,
          email: fallbackEmail,
          passwordHash: fallbackHash,
          role: "owner",
          mustChangePassword: true,
          active: true,
        };
      }
    }

    if (!adminRecord) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!adminRecord.active) {
      return NextResponse.json({ error: "Account is disabled. Contact system administrator." }, { status: 403 });
    }

    const isMatch = await verifyPassword(password, adminRecord.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create session token
    const token = await signAdminToken({
      userId: adminRecord.id,
      email: adminRecord.email,
      role: adminRecord.role,
      mustChangePassword: adminRecord.mustChangePassword,
    });

    // Update lastLoginAt if database is active
    if (isDatabaseConfigured()) {
      try {
        await prisma.adminUser.update({
          where: { id: adminRecord.id },
          data: { lastLoginAt: new Date() },
        });
      } catch (_) {}
    }

    const response = NextResponse.json({
      success: true,
      email: adminRecord.email,
      role: adminRecord.role,
      mustChangePassword: adminRecord.mustChangePassword,
    });

    // Set HttpOnly session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (err: any) {
    console.error("Login route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
