import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const ARTIFACT_DIR = "C:/Users/HP/.gemini/antigravity/brain/26afd6ee-66b7-4796-a65d-4d125fa08a06";
const LOCAL_SCREENSHOTS_DIR = path.resolve("./screenshots");
const BASE_URL = process.env.BASE_URL || "http://localhost:3045";

if (!fs.existsSync(LOCAL_SCREENSHOTS_DIR)) {
  fs.mkdirSync(LOCAL_SCREENSHOTS_DIR, { recursive: true });
}

async function capture() {
  console.log(`Launching Chromium to verify on ${BASE_URL}...`);
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    // 1. Desktop Navbar & Full Catalog (1440x900)
    console.log("Capturing Desktop 1440x900...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();

    // Verify Home Page and Navbar
    await desktopPage.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await desktopPage.waitForTimeout(1000);

    const navShotPath = path.join(LOCAL_SCREENSHOTS_DIR, "navbar-updated.png");
    await desktopPage.screenshot({
      path: navShotPath,
      clip: { x: 0, y: 0, width: 1440, height: 120 },
    });
    fs.copyFileSync(navShotPath, path.join(ARTIFACT_DIR, "navbar-updated.png"));
    console.log("Captured navbar-updated.png");

    // Verify Plants Catalog Desktop
    await desktopPage.goto(`${BASE_URL}/plants`, { waitUntil: "domcontentloaded" });
    await desktopPage.waitForTimeout(1500);

    const catalogDesktopPath = path.join(LOCAL_SCREENSHOTS_DIR, "catalog-desktop-3col.png");
    await desktopPage.screenshot({
      path: catalogDesktopPath,
      fullPage: false,
    });
    fs.copyFileSync(catalogDesktopPath, path.join(ARTIFACT_DIR, "catalog-desktop-3col.png"));
    console.log("Captured catalog-desktop-3col.png");

    await desktopContext.close();

    // 2. Mobile Catalog (390x844)
    console.log("Capturing Mobile 390x844...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(`${BASE_URL}/plants`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1500);

    const catalogMobilePath = path.join(LOCAL_SCREENSHOTS_DIR, "catalog-mobile-1col.png");
    await mobilePage.screenshot({
      path: catalogMobilePath,
      fullPage: false,
    });
    fs.copyFileSync(catalogMobilePath, path.join(ARTIFACT_DIR, "catalog-mobile-1col.png"));
    console.log("Captured catalog-mobile-1col.png");

    // Also toggle filter on mobile to capture the open mobile filter drawer/sheet
    const filterToggleBtn = mobilePage.locator("button:has-text('Filter Plants')");
    if (await filterToggleBtn.isVisible()) {
      await filterToggleBtn.click();
      await mobilePage.waitForTimeout(600);
      const catalogMobileFilterOpenPath = path.join(LOCAL_SCREENSHOTS_DIR, "catalog-mobile-filter-open.png");
      await mobilePage.screenshot({
        path: catalogMobileFilterOpenPath,
        fullPage: false,
      });
      fs.copyFileSync(catalogMobileFilterOpenPath, path.join(ARTIFACT_DIR, "catalog-mobile-filter-open.png"));
      console.log("Captured catalog-mobile-filter-open.png");
    }

    await mobileContext.close();

    console.log("All screenshots captured and copied to artifact directory!");
  } catch (err) {
    console.error("Capture failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

capture();
