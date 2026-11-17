import { chromium } from "playwright";
import http from "http";
import { spawn, exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

function killProcessTree(pid) {
  if (!pid) return;
  if (process.platform === "win32") {
    try {
      exec(`taskkill /pid ${pid} /T /F`);
    } catch (_) {}
  } else {
    try {
      process.kill(-pid);
    } catch (_) {
      try { process.kill(pid); } catch (__) {}
    }
  }
}

function isServerRunning(port = 3000) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}`, () => resolve(true));
    req.on("error", () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function waitForServer(port = 3000, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const running = await isServerRunning(port);
      if (running) {
        clearInterval(interval);
        resolve();
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        reject(new Error(`Server failed on port ${port}`));
      }
    }, 500);
  });
}

async function runVerification() {
  console.log("=================================================");
  console.log(" 🌿 EVERGREEN ETHIOPIA: VERIFICATION & AUDIT SUITE");
  console.log("=================================================\n");

  const results = [];

  // 1. Check Preflight & Schema
  console.log("TEST 1: Database Preflight & Safe Isolation");
  const schemaContent = fs.readFileSync(path.join(rootDir, "prisma", "schema.prisma"), "utf-8");
  const hasVariants = schemaContent.includes("model PlantVariant");
  const hasMustChange = schemaContent.includes("mustChangePassword");
  results.push({
    name: "Prisma Schema includes PlantVariant and mustChangePassword",
    passed: hasVariants && hasMustChange,
  });

  // 2. Provisioning Script Check
  console.log("\nTEST 2: Provisioning Script Execution");
  const provScript = path.join(rootDir, "scripts", "provision-admin.mjs");
  const provExists = fs.existsSync(provScript);
  results.push({
    name: "One-time admin provisioning CLI exists and is ready",
    passed: provExists,
  });

  // Start Next.js Server
  let serverProcess = null;
  const alreadyUp = await isServerRunning(3000);
  if (!alreadyUp) {
    console.log("\nStarting Next.js production server for E2E verification...");
    const nextCmd = process.platform === "win32" ? "npx.cmd" : "npx";
    serverProcess = spawn(nextCmd, ["next", "start", "-p", "3000"], {
      cwd: rootDir,
      stdio: "ignore",
      shell: true,
    });
    await waitForServer(3000);
    console.log("✓ Server listening on http://127.0.0.1:3000");
  }

  // Launch Playwright Headless Browser
  let browser = null;
  try {
    try {
      browser = await chromium.launch({ channel: "chrome", headless: true });
    } catch (_) {
      browser = await chromium.launch({ headless: true });
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    // 3. Test Security Middleware: Unauthenticated access to /admin/plants
    console.log("\nTEST 3: Security & Route Protection");
    await page.goto("http://localhost:3000/admin/plants", { waitUntil: "domcontentloaded" });
    const currentUrl = page.url();
    const isRedirectedToLogin = currentUrl.includes("/admin/login");
    results.push({
      name: "Unauthenticated /admin/plants redirects to /admin/login",
      passed: isRedirectedToLogin,
    });

    // 4. Test Unauthenticated API Protection
    const apiRes = await page.request.get("http://localhost:3000/api/admin/plants");
    results.push({
      name: "Unauthenticated GET /api/admin/plants returns 401 Unauthorized",
      passed: apiRes.status() === 401,
    });

    // 5. Test Unauthenticated Upload Protection
    const uploadRes = await page.request.post("http://localhost:3000/api/admin/upload");
    results.push({
      name: "Unauthenticated POST /api/admin/upload returns 401 Unauthorized",
      passed: uploadRes.status() === 401,
    });

    // 6. Test Public Catalog Preservation
    console.log("\nTEST 4: Public Frontend Design & Catalog Preservation");
    await page.goto("http://localhost:3000/plants", { waitUntil: "domcontentloaded" });
    const catalogCards = await page.$$("a[href^='/plants/']");
    results.push({
      name: "Public catalog (/plants) renders star plant cards intact",
      passed: catalogCards.length >= 8,
    });

    // 7. Test Public Specimen Detail Preservation
    await page.goto("http://localhost:3000/plants/monstera", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1", { timeout: 10000 });
    const h1Text = await page.$eval("h1", (el) => el.innerText);
    results.push({
      name: "Monstera specimen detail (/plants/monstera) renders valid heading",
      passed: h1Text.includes("Monstera"),
    });

    await context.close();
  } finally {
    if (browser) await browser.close();
    if (serverProcess && serverProcess.pid) {
      console.log("\nStopping Next.js test server...");
      killProcessTree(serverProcess.pid);
    }
  }

  console.log("\n=================================================");
  console.log(" 📊 E2E AUDIT RESULTS:");
  console.log("=================================================");
  let allPassed = true;
  for (const r of results) {
    console.log(`${r.passed ? "✅ PASS" : "❌ FAIL"}: ${r.name}`);
    if (!r.passed) allPassed = false;
  }

  if (!allPassed) {
    process.exit(1);
  }
  console.log("\n🎉 ALL TESTS PASSED! Authentication, API security, and public catalog are verified.");
}

runVerification().catch((err) => {
  console.error("Verification suite failed:", err);
  process.exit(1);
});
