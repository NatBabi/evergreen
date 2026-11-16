import { chromium } from "playwright";
import path from "path";

const ARTIFACT_DIR = "C:/Users/HP/.gemini/antigravity/brain/f5942042-864f-4bb8-8093-ff5d931d30b9";
const BASE_URL = "http://localhost:3000";

async function capture() {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  try {
    // 1. Mobile (iPhone 14 / 390x844)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    // Landing Page Navbar
    await mobilePage.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "main-mobile-nav-evergreen.png"),
      clip: { x: 0, y: 0, width: 390, height: 110 },
    });

    // Catalog Page Header
    await mobilePage.goto(`${BASE_URL}/plants`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "main-mobile-catalog-evergreen.png"),
      clip: { x: 0, y: 0, width: 390, height: 100 },
    });

    // Detail Page Header
    await mobilePage.goto(`${BASE_URL}/plants/monstera`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "main-mobile-detail-evergreen.png"),
      clip: { x: 0, y: 0, width: 390, height: 100 },
    });

    await mobileContext.close();

    // 2. Desktop (1280x800)
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({
      path: path.join(ARTIFACT_DIR, "main-desktop-nav-evergreen.png"),
      clip: { x: 0, y: 0, width: 1280, height: 120 },
    });
    await desktopContext.close();

    console.log("Captured all navbar screenshots successfully!");
  } catch (err) {
    console.error("Capture error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

capture();
