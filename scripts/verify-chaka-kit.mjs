import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const ARTIFACT_DIR = "C:/Users/HP/.gemini/antigravity/brain/26afd6ee-66b7-4796-a65d-4d125fa08a06";
const LOCAL_SCREENSHOTS_DIR = path.resolve("./screenshots");
const BASE_URL = process.env.BASE_URL || "http://localhost:3047";

if (!fs.existsSync(LOCAL_SCREENSHOTS_DIR)) {
  fs.mkdirSync(LOCAL_SCREENSHOTS_DIR, { recursive: true });
}

async function capture() {
  console.log(`Launching Playwright to verify Chaka Plants Design Kit on ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop Viewport (1440x900)
    console.log("Capturing Desktop 1440x900...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${BASE_URL}/plants`, { waitUntil: "domcontentloaded" });
    await desktopPage.waitForTimeout(1500);

    const desktopPath = path.join(LOCAL_SCREENSHOTS_DIR, "chaka-catalog-desktop-1440.png");
    await desktopPage.screenshot({ path: desktopPath, fullPage: false });
    fs.copyFileSync(desktopPath, path.join(ARTIFACT_DIR, "chaka-catalog-desktop-1440.png"));
    console.log("Captured chaka-catalog-desktop-1440.png");
    await desktopContext.close();

    // 2. Mobile Viewport (390x844)
    console.log("Capturing Mobile 390x844...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/plants`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1500);

    const mobilePath = path.join(LOCAL_SCREENSHOTS_DIR, "chaka-catalog-mobile-390.png");
    await mobilePage.screenshot({ path: mobilePath, fullPage: false });
    fs.copyFileSync(mobilePath, path.join(ARTIFACT_DIR, "chaka-catalog-mobile-390.png"));
    console.log("Captured chaka-catalog-mobile-390.png");
    await mobileContext.close();

    console.log("All Chaka Design Kit verification screenshots captured!");
  } catch (err) {
    console.error("Playwright capture error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

capture();
