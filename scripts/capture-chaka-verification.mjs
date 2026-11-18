import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const ARTIFACT_DIR = "C:/Users/HP/.gemini/antigravity/brain/26afd6ee-66b7-4796-a65d-4d125fa08a06";
const LOCAL_SCREENSHOTS_DIR = path.resolve("./screenshots");
const BASE_URL = process.env.BASE_URL || "http://localhost:3048";

if (!fs.existsSync(LOCAL_SCREENSHOTS_DIR)) {
  fs.mkdirSync(LOCAL_SCREENSHOTS_DIR, { recursive: true });
}

async function capture() {
  console.log(`Verifying Chaka Plants design kit application on ${BASE_URL}/plants...`);
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop Catalog (1440x900)
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();

    await desktopPage.goto(`${BASE_URL}/plants`, { waitUntil: "domcontentloaded" });
    await desktopPage.waitForTimeout(1500);

    const desktopPath = path.join(LOCAL_SCREENSHOTS_DIR, "chaka-catalog-desktop.png");
    await desktopPage.screenshot({
      path: desktopPath,
      fullPage: false,
    });
    fs.copyFileSync(desktopPath, path.join(ARTIFACT_DIR, "chaka-catalog-desktop.png"));
    console.log("Captured chaka-catalog-desktop.png");

    await desktopContext.close();

    // 2. Mobile Catalog (390x844)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(`${BASE_URL}/plants`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1500);

    const mobilePath = path.join(LOCAL_SCREENSHOTS_DIR, "chaka-catalog-mobile.png");
    await mobilePage.screenshot({
      path: mobilePath,
      fullPage: false,
    });
    fs.copyFileSync(mobilePath, path.join(ARTIFACT_DIR, "chaka-catalog-mobile.png"));
    console.log("Captured chaka-catalog-mobile.png");

    await mobileContext.close();

    console.log("Verification screenshots captured successfully!");
  } catch (err) {
    console.error("Capture error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

capture();
