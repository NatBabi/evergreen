import { chromium } from "playwright";
import path from "path";

const ARTIFACT_DIR = "C:/Users/HP/.gemini/antigravity/brain/f5942042-864f-4bb8-8093-ff5d931d30b9";
const prefix = process.argv[2] || "main";
const BASE_URL = "http://localhost:3000/plants/monstera";

async function capture() {
  console.log(`Capturing detail page screenshots for: ${prefix}...`);
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  try {
    // 1. Desktop
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await desktopPage.waitForTimeout(1500);

    await desktopPage.screenshot({
      path: path.join(ARTIFACT_DIR, `${prefix}-detail-desktop-viewport.png`),
    });

    await desktopPage.screenshot({
      path: path.join(ARTIFACT_DIR, `${prefix}-detail-desktop-full.png`),
      fullPage: true,
    });
    await desktopContext.close();

    // 2. Mobile (iPhone 14)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1500);

    // Mobile Viewport (top / hero image plinth)
    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, `${prefix}-detail-mobile-viewport.png`),
    });

    // Mobile scroll to Options / Bundle / Price area
    const selectorSection = await mobilePage.$("text=Choice 1: Plant Only");
    if (selectorSection) {
      await selectorSection.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(400);
      await mobilePage.screenshot({
        path: path.join(ARTIFACT_DIR, `${prefix}-detail-mobile-options.png`),
      });
    }

    // Mobile Full Page
    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, `${prefix}-detail-mobile-full.png`),
      fullPage: true,
    });
    await mobileContext.close();

    console.log(`Successfully captured screenshots for ${prefix}`);
  } catch (err) {
    console.error("Capture error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

capture();
