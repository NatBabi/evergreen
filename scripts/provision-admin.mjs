import crypto from "crypto";
import bcrypt from "bcryptjs";
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

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--email" && args[i + 1]) {
      options.email = args[i + 1].trim().toLowerCase();
      i++;
    } else if (args[i] === "--temp-password" && args[i + 1]) {
      options.tempPassword = args[i + 1];
      i++;
    }
  }
  return options;
}

function generateSecurePassword() {
  // 16 chars: alphanumeric with clean symbols
  const bytes = crypto.randomBytes(12);
  return bytes.toString("base64").replace(/[+/=]/g, "x") + "!E7";
}

async function provision() {
  console.log("=================================================");
  console.log(" 🌿 EVERGREEN ETHIOPIA: ADMIN USER PROVISIONING  ");
  console.log("=================================================\n");

  const envLocal = loadEnvFile(".env.local");
  const envMain = loadEnvFile(".env");
  const options = parseArgs();

  const email =
    options.email ||
    process.env.INITIAL_ADMIN_EMAIL ||
    envLocal.INITIAL_ADMIN_EMAIL ||
    envMain.INITIAL_ADMIN_EMAIL;

  if (!email || !email.includes("@")) {
    console.error("❌ Error: A valid owner email address is required.");
    console.error("Usage: node scripts/provision-admin.mjs --email owner@example.com [--temp-password CustomTemp123!]");
    console.error("Or set INITIAL_ADMIN_EMAIL in your .env.local file.\n");
    process.exit(1);
  }

  const tempPassword =
    options.tempPassword ||
    process.env.INITIAL_ADMIN_PASSWORD ||
    envLocal.INITIAL_ADMIN_PASSWORD ||
    generateSecurePassword();

  console.log(`Target Owner Email: ${email}`);
  console.log("Hashing password with bcrypt (12 rounds)...");
  const passwordHash = await bcrypt.hash(tempPassword, 12);

  const dbUrl = process.env.DATABASE_URL || envLocal.DATABASE_URL || envMain.DATABASE_URL || "";
  const isDbConfigured = dbUrl && !dbUrl.includes("ep-sample-pooler") && !dbUrl.includes("username:password");

  if (isDbConfigured) {
    try {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      console.log("Connecting to database to provision AdminUser record...");

      const admin = await prisma.adminUser.upsert({
        where: { email },
        update: {
          passwordHash,
          mustChangePassword: true,
          active: true,
          role: "owner",
        },
        create: {
          email,
          passwordHash,
          mustChangePassword: true,
          active: true,
          role: "owner",
        },
      });

      await prisma.$disconnect();
      console.log(`✅ Admin user successfully provisioned in database (ID: ${admin.id})`);
    } catch (err) {
      console.error("⚠️ Database write failed:", err.message);
      console.log("Falling back to local secure environment provisioning...\n");
      saveLocalFallback(email, passwordHash);
    }
  } else {
    console.log("ℹ️ Database is not yet configured or using placeholder.");
    console.log("Saving initial provision credentials into .env.local (git-ignored)...");
    saveLocalFallback(email, passwordHash);
  }

  console.log("\n-------------------------------------------------");
  console.log("🔑 ONE-TIME OWNER LOGIN CREDENTIALS:");
  console.log(`   Email:        ${email}`);
  console.log(`   Temporary Pw: ${tempPassword}`);
  console.log("-------------------------------------------------");
  console.log("⚠️ IMPORTANT:");
  console.log("   - The owner MUST change this password upon their first login.");
  console.log("   - Never commit these credentials to version control.");
  console.log("   - Once logged in and changed, temporary passwords cannot be reused.\n");
}

function saveLocalFallback(email, hash) {
  const envLocalPath = path.join(rootDir, ".env.local");
  let content = "";
  if (fs.existsSync(envLocalPath)) {
    content = fs.readFileSync(envLocalPath, "utf-8");
  }

  const lines = content.split("\n").filter((l) => {
    return !l.startsWith("INITIAL_ADMIN_EMAIL=") && !l.startsWith("INITIAL_ADMIN_HASH=");
  });

  lines.push(`INITIAL_ADMIN_EMAIL="${email}"`);
  lines.push(`INITIAL_ADMIN_HASH="${hash}"`);

  fs.writeFileSync(envLocalPath, lines.join("\n").trim() + "\n", "utf-8");
  console.log("✅ Written INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_HASH to .env.local");
}

provision().catch((err) => {
  console.error("Provisioning error:", err);
  process.exit(1);
});
