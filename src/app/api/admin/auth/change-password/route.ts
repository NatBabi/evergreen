import { NextResponse } from "next/server";
import { requireAdminAuth, hashPassword, signAdminToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    // Authorize caller (allow session with mustChangePassword = true)
    const session = await requireAdminAuth({ allowMustChangePassword: true });

    const body = await request.json();
    const { newPassword, confirmPassword } = body;

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json({ error: "New password is required" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long for security" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const newHash = await hashPassword(newPassword);

    if (isDatabaseConfigured()) {
      try {
        await prisma.adminUser.update({
          where: { id: session.userId },
          data: {
            passwordHash: newHash,
            mustChangePassword: false,
            passwordChangedAt: new Date(),
          },
        });
      } catch (err: any) {
        console.error("Database password update failed:", err);
        return NextResponse.json({ error: "Failed to update password in database" }, { status: 500 });
      }
    } else {
      // Update local fallback .env.local
      try {
        const envLocalPath = path.join(process.cwd(), ".env.local");
        let content = "";
        if (fs.existsSync(envLocalPath)) {
          content = fs.readFileSync(envLocalPath, "utf-8");
        }
        const lines = content.split("\n").filter((l) => !l.startsWith("INITIAL_ADMIN_HASH="));
        lines.push(`INITIAL_ADMIN_HASH="${newHash}"`);
        fs.writeFileSync(envLocalPath, lines.join("\n").trim() + "\n", "utf-8");
      } catch (fileErr) {
        console.error("Local env password update failed:", fileErr);
      }
    }

    // Issue refreshed token with mustChangePassword = false
    const updatedToken = await signAdminToken({
      userId: session.userId,
      email: session.email,
      role: session.role,
      mustChangePassword: false,
    });

    const response = NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: updatedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (err: any) {
    if (err.name === "AuthError") {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("Password change error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
