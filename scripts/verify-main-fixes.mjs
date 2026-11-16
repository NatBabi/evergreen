import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:/Users/HP/.gemini/antigravity/brain/f5942042-864f-4bb8-8093-ff5d931d30b9";
const BASE_URL = "http://localhost:3000";

async function runVerification() {
  console.log("Launching browser for Playwright verification on main branch...");
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  const report = [];

  try {
    // 1. Desktop Tests (1280x800)
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await desktopContext.newPage();
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    // Verify Hero
    const heroH1 = await page.$("section#top h1");
    const heroHasH1 = !!heroH1;
    const heroBottomStats = await page.$("section#top .border-l-\\[3px\\]");
    const heroStatsRemoved = heroBottomStats === null;
    report.push({
      test: "Hero section headline present and bottom stat boxes removed",
      passed: heroHasH1 && heroStatsRemoved,
    });

    // Capture Hero screenshot
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "main-hero-desktop.png"),
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });

    // Verify TikTok Social Proof
    const tiktokSection = await page.$("section#tiktok");
    const tiktokMetricsText = await page.$eval("section#tiktok", (el) => el.innerText);
    const has13K = tiktokMetricsText.includes("13.4K");
    const has850 = tiktokMetricsText.includes("850+");
    const has2448 = tiktokMetricsText.includes("24–48h");
    report.push({
      test: "Relocated metrics (13.4K, 850+, 24–48h) present in real Addis homes section",
      passed: has13K && has850 && has2448,
    });

    // Screenshot of TikTok section
    if (tiktokSection) {
      await tiktokSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "main-tiktok-metrics.png"),
      });
    }

    // Verify Care Section
    const careSection = await page.$("section#care");
    const careCardCount = await page.$$eval("section#care .aspect-\\[4\\/5\\], section#care .aspect-\\[3\\/4\\]", (els) => els.length);
    const careText = await page.$eval("section#care", (el) => el.innerText);
    const careGuideFooterRemoved = !careText.includes("Guide 01 / 03");
    report.push({
      test: "Care section has 3 streamlined full-bleed cards and no Guide 01/03 footer",
      passed: careCardCount === 3 && careGuideFooterRemoved,
    });

    if (careSection) {
      await careSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "main-care-cards.png"),
      });
    }

    // Verify Four Steps Eyebrow Badge Pill removed
    const stepsText = await page.$eval("section#steps", (el) => el.innerText);
    const fourStepsPillRemoved = !stepsText.includes("Four simple steps");
    report.push({
      test: "Four steps process eyebrow badge pill (04 · Four simple steps) removed",
      passed: fourStepsPillRemoved,
    });

    // Verify No Circular Wrapper on Navbar Logo
    const navLogoImg = await page.$("header nav img[alt='Evergreen Ethiopia Logo']");
    const navLogoParentClasses = await navLogoImg?.evaluate((el) => el.parentElement?.className || "");
    const navLogoHasNoCircle = !navLogoParentClasses.includes("rounded-full") && !navLogoParentClasses.includes("border");
    report.push({
      test: "Floating navbar logo has no circular container border or background",
      passed: navLogoHasNoCircle,
    });

    await desktopContext.close();

    // 2. Mobile Tests (iPhone 14 / 390x844)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1000);

    // Check Mobile Nav Logo and text
    const mobileBrandText = await mobilePage.$eval("header nav a[aria-label='Evergreen Ethiopia Home'] > div:nth-child(2)", (el) => {
      const style = window.getComputedStyle(el);
      return style.display;
    }).catch(() => "none");
    report.push({
      test: "On mobile landing page navbar, brand text is hidden (logo-only)",
      passed: mobileBrandText === "none",
    });

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "main-mobile-nav-logo-only.png"),
      clip: { x: 0, y: 0, width: 390, height: 160 },
    });

    // Open Mobile Menu and Check for duplicate X button
    const menuToggle = await mobilePage.$("header nav button[aria-label='Open menu']");
    if (menuToggle) {
      await menuToggle.click();
      await mobilePage.waitForTimeout(400);

      const closeButtonsInsideDrawer = await mobilePage.$$eval(
        "div.fixed.inset-0 button[aria-label='Close menu']",
        (els) => els.length
      );
      report.push({
        test: "Inside mobile menu drawer, duplicate ( X ) close button removed",
        passed: closeButtonsInsideDrawer === 0,
      });

      await mobilePage.screenshot({
        path: path.join(ARTIFACT_DIR, "main-mobile-drawer-single-x.png"),
      });

      // Close menu by clicking the nav toggle button again
      const closeToggle = await mobilePage.$("header nav button[aria-label='Close menu']");
      if (closeToggle) {
        await closeToggle.click();
        await mobilePage.waitForTimeout(300);
      }
    }

    // Check Catalog Page on Mobile
    await mobilePage.goto(`${BASE_URL}/plants`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1000);
    const catalogBrandText = await mobilePage.$eval("header a[aria-label='Evergreen Ethiopia Home'] span", (el) => {
      const style = window.getComputedStyle(el);
      return style.display;
    }).catch(() => "none");
    report.push({
      test: "On mobile catalog header, brand text is hidden (logo-only)",
      passed: catalogBrandText === "none",
    });

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "main-mobile-catalog-header.png"),
      clip: { x: 0, y: 0, width: 390, height: 120 },
    });

    // Check Plant Detail Page on Mobile
    await mobilePage.goto(`${BASE_URL}/plants/monstera`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1000);
    const detailBrandText = await mobilePage.$eval("header a[aria-label='Evergreen Ethiopia Home'] span", (el) => {
      const style = window.getComputedStyle(el);
      return style.display;
    }).catch(() => "none");
    report.push({
      test: "On mobile plant detail header, brand text is hidden (logo-only)",
      passed: detailBrandText === "none",
    });

    // Check Mobile Plinth on Detail Page (Featured image should be above thumbnail strip)
    const featuredPlinthY = await mobilePage.$eval(".h-\\[380px\\], .h-\\[480px\\]", (el) => el.getBoundingClientRect().top);
    const thumbnailsY = await mobilePage.$eval("button[aria-label='View photo 1']", (el) => el.getBoundingClientRect().top);
    report.push({
      test: "On mobile detail page, large featured image is positioned above thumbnail strip",
      passed: featuredPlinthY < thumbnailsY,
    });

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "main-mobile-detail-header-plinth.png"),
      clip: { x: 0, y: 0, width: 390, height: 600 },
    });

    await mobileContext.close();

    console.log("\n================ VERIFICATION RESULTS ON MAIN ================");
    console.table(report);
    const allPassed = report.every((r) => r.passed);
    console.log(`\nALL TESTS PASSED: ${allPassed ? "YES (100%)" : "NO"}`);
    if (!allPassed) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Playwright verification error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
