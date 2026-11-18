import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  // If it contains the template dummy placeholders, consider it unconfigured
  if (url.includes("ep-sample-pooler") || url.includes("username:password")) {
    return false;
  }
  return true;
}

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

let _client: PrismaClient | null = null;

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!isDatabaseConfigured()) {
      throw new Error(
        "Database is not configured. Please supply a valid DATABASE_URL in .env.local to query the database."
      );
    }
    if (!_client) {
      if (globalThis.prismaGlobal) {
        _client = globalThis.prismaGlobal;
      } else {
        const connectionString = process.env.DATABASE_URL || "";
        const adapter = new PrismaPg({ connectionString });
        _client = new PrismaClient({
          adapter,
          log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
        });
        if (process.env.NODE_ENV !== "production") {
          globalThis.prismaGlobal = _client;
        }
      }
    }
    return (_client as any)[prop];
  },
});
