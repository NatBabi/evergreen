import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "evergreen_admin_session";
const SESSION_EXPIRY = "30d"; // 30-day session for mobile owner convenience

export interface AdminSessionPayload {
  userId: number;
  email: string;
  role: "owner" | "staff";
  mustChangePassword: boolean;
}

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_JWT_SECRET environment variable is required in production");
    }
    // Safe deterministic development secret
    return new TextEncoder().encode("evergreen_ethiopia_dev_secret_key_minimum_32_chars_long_123");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Sign an admin session JWT
 */
export async function signAdminToken(payload: AdminSessionPayload): Promise<string> {
  const key = getJwtSecretKey();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(key);
}

/**
 * Verify and decode an admin session JWT
 */
export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const key = getJwtSecretKey();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as "owner" | "staff",
      mustChangePassword: Boolean(payload.mustChangePassword),
    };
  } catch {
    return null;
  }
}

/**
 * Get current admin session from Next.js cookies
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

/**
 * Server-side authorization check for API routes and Server Actions.
 * Throws an Error if unauthorized or if password change is pending.
 */
export async function requireAdminAuth(options?: { allowMustChangePassword?: boolean }): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new AuthError("Unauthorized: Admin session required", 401, "UNAUTHORIZED");
  }

  if (session.mustChangePassword && !options?.allowMustChangePassword) {
    throw new AuthError(
      "Password change required before accessing administration features",
      403,
      "PASSWORD_CHANGE_REQUIRED"
    );
  }

  return session;
}

export class AuthError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 401, code = "UNAUTHORIZED") {
    super(message);
    this.name = "AuthError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Cryptographically hash a plaintext password with bcrypt (12 rounds)
 */
export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, 12);
}

/**
 * Compare plaintext password against stored bcrypt hash
 */
export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
