const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runVisualScan() {
  const outputDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  console.log('--- SCANNING MOBILE VIEWPORT (390px) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  });

  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(2000); // Allow GSAP hero animation to complete

  // 1. Mobile Hero & Top Navbar
  await mobilePage.screenshot({
    path: path.join(outputDir, '01_mobile_hero.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });
  console.log('Captured: 01_mobile_hero.png');

  // 2. Mobile Nav Drawer open
  const menuBtn = mobilePage.locator('button[aria-label="Toggle navigation menu"]');
  if (await menuBtn.isVisible()) {
    await menuBtn.click({ force: true });
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
      path: path.join(outputDir, '02_mobile_nav_drawer.png'),
    });
    // close drawer using dedicated close button
    const closeBtn = mobilePage.locator('button[aria-label="Close navigation menu"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await menuBtn.click({ force: true });
    }
    await mobilePage.waitForTimeout(400);
  }

  // 3. Mobile Features Dashboard (Plant Finder, Telemetry, Mock Scheduler)
  const featuresSec = mobilePage.locator('#care');
  await featuresSec.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(outputDir, '03_mobile_features.png'),
  });
  console.log('Captured: 03_mobile_features.png');

  // 4. Mobile Philosophy Manifesto
  const philosophySec = mobilePage.locator('section[aria-label="Evergreen Philosophy Manifesto"]');
  await philosophySec.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(outputDir, '04_mobile_philosophy.png'),
  });
  console.log('Captured: 04_mobile_philosophy.png');

  // 5. Mobile Journey Sticky Stacking Archive
  const journeySec = mobilePage.locator('#catalog');
  await journeySec.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(outputDir, '05_mobile_journey.png'),
  });
  console.log('Captured: 05_mobile_journey.png');

  // 6. Mobile Paths & Inquiry Form
  const servicesSec = mobilePage.locator('#services');
  await servicesSec.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(outputDir, '06_mobile_paths_services.png'),
  });
  console.log('Captured: 06_mobile_paths_services.png');

  const inquirySec = mobilePage.locator('#inquiry');
  await inquirySec.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(outputDir, '07_mobile_inquiry_form.png'),
  });
  console.log('Captured: 07_mobile_inquiry_form.png');

  // 7. Mobile Footer
  const footerSec = mobilePage.locator('footer');
  await footerSec.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({
    path: path.join(outputDir, '08_mobile_footer.png'),
  });
  console.log('Captured: 08_mobile_footer.png');

  await mobileContext.close();

  console.log('\n--- SCANNING DESKTOP VIEWPORT (1280px) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });

  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await desktopPage.waitForTimeout(2000);

  // 8. Desktop Hero & Glass Navbar
  await desktopPage.screenshot({
    path: path.join(outputDir, '09_desktop_hero.png'),
    clip: { x: 0, y: 0, width: 1280, height: 900 },
  });
  console.log('Captured: 09_desktop_hero.png');

  // Scroll down slightly to trigger scrolled glassmorphism navbar state
  await desktopPage.evaluate(() => window.scrollBy(0, 150));
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(outputDir, '10_desktop_scrolled_nav.png'),
    clip: { x: 0, y: 0, width: 1280, height: 120 },
  });
  console.log('Captured: 10_desktop_scrolled_nav.png');

  // 9. Desktop Features Dashboard
  await desktopPage.locator('#care').scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(1200);
  await desktopPage.screenshot({
    path: path.join(outputDir, '11_desktop_features.png'),
  });
  console.log('Captured: 11_desktop_features.png');

  // 10. Desktop Philosophy Manifesto
  await desktopPage.locator('section[aria-label="Evergreen Philosophy Manifesto"]').scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(1200);
  await desktopPage.screenshot({
    path: path.join(outputDir, '12_desktop_philosophy.png'),
  });
  console.log('Captured: 12_desktop_philosophy.png');

  // 11. Desktop Journey Cards
  await desktopPage.locator('#catalog').scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(1200);
  await desktopPage.screenshot({
    path: path.join(outputDir, '13_desktop_journey.png'),
  });
  console.log('Captured: 13_desktop_journey.png');

  // 12. Desktop Three Paths & Inquiry Form
  await desktopPage.locator('#services').scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(1200);
  await desktopPage.screenshot({
    path: path.join(outputDir, '14_desktop_paths_services.png'),
  });
  console.log('Captured: 14_desktop_paths_services.png');

  // Test form interaction & validation
  const submitBtn = desktopPage.locator('button[type="submit"]');
  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: path.join(outputDir, '15_desktop_form_validation.png'),
  });
  console.log('Captured: 15_desktop_form_validation.png');

  // Fill valid test data
  await desktopPage.fill('#client-name', 'Dawit Haile');
  await desktopPage.fill('#client-phone', '+251 91 123 4567');
  await desktopPage.fill('#client-location', 'Bole Atlas, Addis Ababa');
  await desktopPage.fill('#client-notes', 'Terrace penthouse styling inquiry with low-light interior species.');
  await submitBtn.click();
  await desktopPage.waitForTimeout(1200); // allow simulated confirmation
  await desktopPage.screenshot({
    path: path.join(outputDir, '16_desktop_form_success.png'),
  });
  console.log('Captured: 16_desktop_form_success.png');

  // 13. Desktop Footer
  await desktopPage.locator('footer').scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({
    path: path.join(outputDir, '17_desktop_footer.png'),
  });
  console.log('Captured: 17_desktop_footer.png');

  await desktopContext.close();
  await browser.close();
  console.log('\n--- SCAN COMPLETED SUCCESSFULLY ---');
}

runVisualScan().catch((err) => {
  console.error('Scan failed:', err);
  process.exit(1);
});
