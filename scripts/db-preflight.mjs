import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

function loadEnvFile(filename) {
  const filePath = path.join(rootDir, filename);
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[match[1].trim()] = val;
    }
  }
  return env;
}

async function runPreflight() {
  console.log("=================================================");
  console.log(" 🌿 EVERGREEN ETHIOPIA: DATABASE PREFLIGHT CHECK  ");
  console.log("=================================================\n");

  const envLocal = loadEnvFile(".env.local");
  const envMain = loadEnvFile(".env");
  const dbUrl = process.env.DATABASE_URL || envLocal.DATABASE_URL || envMain.DATABASE_URL || "";

  console.log("1. Checking Environment Configuration:");
  if (!dbUrl) {
    console.log("   ❌ DATABASE_URL is not set.");
    console.log("   Status: Database is unconfigured. Public site will use static fallback.\n");
    return { status: "missing" };
  }

  const isPlaceholder = dbUrl.includes("ep-sample-pooler") || dbUrl.includes("username:password");
  if (isPlaceholder) {
    console.log("   ⚠️  DATABASE_URL is currently using template placeholder credentials:");
    console.log(`      ${dbUrl.replace(/:[^:@]+@/, ":****@")}`);
    console.log("   Status: Valid placeholder detected. Live migrations safely blocked until owner supplies real credentials.\n");
    return { status: "placeholder" };
  }

  console.log("   ✅ DATABASE_URL is configured (non-placeholder format):");
  console.log(`      ${dbUrl.replace(/:[^:@]+@/, ":****@")}`);

  // Test live connection if Prisma Client is available
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    console.log("\n2. Testing Neon Database Connection...");
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log("   ✅ Successfully connected to PostgreSQL / Neon database!");
    console.log("   Query output:", result);

    // Check existing tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log("\n3. Inspecting Existing Tables in Database:");
    console.log("   Found", tables.length, "tables:");
    for (const t of tables) {
      console.log(`     - ${t.table_name}`);
    }

    await prisma.$disconnect();
    return { status: "connected", tables };
  } catch (err) {
    console.log("   ❌ Database connection attempt failed:", err.message);
    return { status: "error", error: err.message };
  }
}

runPreflight();
