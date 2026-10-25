const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureAllScreenshots() {
  const outputDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  const hideDevStyles = async (page) => {
    await page.addStyleTag({
      content: `
        nextjs-portal,
        #__next-build-watcher,
        [data-nextjs-toast],
        [data-nextjs-dialog-overlay] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `,
    });
  };

  console.log('====================================================');
  console.log(' 1. CAPTURING DESKTOP LANDING (DARK & LIGHT MODES)  ');
  console.log('====================================================');

  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await desktopContext.newPage();

  // Ensure default Dark Mode first
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.setItem('evergreen_theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await hideDevStyles(page);
  await page.waitForTimeout(1500);

  // 1. Desktop Hero (Dark Mode)
  await page.screenshot({
    path: path.join(outputDir, '09_desktop_hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  await page.screenshot({
    path: path.join(outputDir, 'hero-dark.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('✓ Captured: 09_desktop_hero.png & hero-dark.png (Dark Mode)');

  // 2. Desktop Scrolled Nav (showing frosted island navbar)
  await page.evaluate(() => window.scrollTo(0, 260));
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outputDir, '10_desktop_scrolled_nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 400 },
  });
  console.log('✓ Captured: 10_desktop_scrolled_nav.png');

  // 3. Desktop Philosophy / Meet Your Green Companion (#companion)
  const companionSection = page.locator('#companion');
  if (await companionSection.isVisible()) {
    await companionSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outputDir, '12_desktop_philosophy.png'),
    });
    console.log('✓ Captured: 12_desktop_philosophy.png');
  }

  // 4. Desktop Features / Care Guide (#care)
  const careSection = page.locator('#care');
  if (await careSection.isVisible()) {
    await careSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outputDir, '11_desktop_features.png'),
    });
    console.log('✓ Captured: 11_desktop_features.png');
  }

  // 5. Desktop Four Steps (#steps)
  const stepsSection = page.locator('#steps');
  if (await stepsSection.isVisible()) {
    await stepsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outputDir, '13_desktop_journey.png'),
    });
    console.log('✓ Captured: 13_desktop_journey.png');
  }

  // 6. Desktop Three Paths (#paths)
  const pathsSection = page.locator('#paths');
  if (await pathsSection.isVisible()) {
    await pathsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outputDir, '14_desktop_paths_services.png'),
    });
    console.log('✓ Captured: 14_desktop_paths_services.png');
  }

  // 7. Desktop Inquiry Form Modal (Validation error & Success states)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const askBtn = page.locator('button:has-text("Ask about a plant")').first();
  if (await askBtn.isVisible()) {
    await askBtn.click();
    await page.waitForTimeout(700);

    // Click submit empty to trigger validation error state
    const sendWhatsappBtn = page.locator('button:has-text("Send via WhatsApp")').first();
    if (await sendWhatsappBtn.isVisible()) {
      await sendWhatsappBtn.click();
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(outputDir, '15_desktop_form_validation.png'),
      });
      console.log('✓ Captured: 15_desktop_form_validation.png');
    }

    // Now fill valid information for success state
    const nameInput = page.locator('input[placeholder*="Abebe"], input[placeholder*="name"]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill('Bethlehem Tilahun');
    }
    const phoneInput = page.locator('input[placeholder*="09"], input[placeholder*="phone"]').first();
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('0911234567');
    }
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outputDir, '16_desktop_form_success.png'),
    });
    console.log('✓ Captured: 16_desktop_form_success.png');

    // Close inquiry modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  }

  // 8. Desktop Footer
  const footer = page.locator('footer[aria-label="Site Footer"]');
  if (await footer.isVisible()) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outputDir, '17_desktop_footer.png'),
    });
    console.log('✓ Captured: 17_desktop_footer.png');
  }

  // ----------------------------------------------------------------
  // SWITCH TO LIGHT MODE ON LANDING PAGE
  // ----------------------------------------------------------------
  console.log('\n--- SWITCHING LANDING PAGE TO LIGHT MODE ---');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const themeToggle = page.locator('button[title="Switch to Light Mode"]').first();
  if (await themeToggle.isVisible()) {
    await themeToggle.click();
  } else {
    await page.evaluate(() => {
      localStorage.setItem('evergreen_theme', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.reload({ waitUntil: 'networkidle' });
  }
  await hideDevStyles(page);
  await page.waitForTimeout(1000);

  // 9. Desktop Hero (Light Mode)
  await page.screenshot({
    path: path.join(outputDir, 'hero-light.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('✓ Captured: hero-light.png (Light Mode)');

  // 10. Desktop Split Intro (Light Mode)
  if (await companionSection.isVisible()) {
    await companionSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outputDir, 'split-intro-light.png'),
    });
    console.log('✓ Captured: split-intro-light.png (Light Mode)');
  }

  // ================================================================
  // 2. CAPTURING CATALOG PAGE (/plants) (LIGHT & DARK MODES)
  // ================================================================
  console.log('\n====================================================');
  console.log(' 2. CAPTURING CATALOG PAGE (/plants)                ');
  console.log('====================================================');

  await page.goto('http://localhost:3000/plants', { waitUntil: 'networkidle' });
  await hideDevStyles(page);
  await page.waitForTimeout(1500);

  // Catalog in Light Mode
  await page.screenshot({
    path: path.join(outputDir, 'catalog-light.png'),
  });
  console.log('✓ Captured: catalog-light.png (Light Mode)');

  // Toggle Catalog to Dark Mode
  const catalogToggle = page.locator('button[title="Switch to Dark Mode"]').first();
  if (await catalogToggle.isVisible()) {
    await catalogToggle.click();
    await page.waitForTimeout(1000);
  } else {
    await page.evaluate(() => {
      localStorage.setItem('evergreen_theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
  }
  await hideDevStyles(page);

  await page.screenshot({
    path: path.join(outputDir, 'catalog-dark.png'),
  });
  console.log('✓ Captured: catalog-dark.png (Dark Mode)');

  // ================================================================
  // 3. CAPTURING PLANT DETAIL PAGE (/plants/monstera)
  // ================================================================
  console.log('\n====================================================');
  console.log(' 3. CAPTURING PLANT DETAIL PAGE (/plants/monstera)   ');
  console.log('====================================================');

  await page.goto('http://localhost:3000/plants/monstera', { waitUntil: 'networkidle' });
  await hideDevStyles(page);
  await page.waitForTimeout(2000);

  // Detail in Dark Mode
  await page.screenshot({
    path: path.join(outputDir, 'detail-dark.png'),
  });
  console.log('✓ Captured: detail-dark.png (Dark Mode)');

  // Switch Detail to Light Mode
  const detailToggle = page.locator('button[title="Switch to Light Mode"]').first();
  if (await detailToggle.isVisible()) {
    await detailToggle.click();
    await page.waitForTimeout(1000);
  } else {
    await page.evaluate(() => {
      localStorage.setItem('evergreen_theme', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
  }
  await hideDevStyles(page);

  await page.screenshot({
    path: path.join(outputDir, 'detail-light.png'),
  });
  console.log('✓ Captured: detail-light.png (Light Mode)');

  await desktopContext.close();

  // ================================================================
  // 4. CAPTURING MOBILE VIEWPORTS (390px iPhone)
  // ================================================================
  console.log('\n====================================================');
  console.log(' 4. CAPTURING MOBILE VIEWPORTS (390px iPhone)       ');
  console.log('====================================================');

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  });

  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.evaluate(() => {
    localStorage.setItem('evergreen_theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await mobilePage.reload({ waitUntil: 'networkidle' });
  await hideDevStyles(mobilePage);
  await mobilePage.waitForTimeout(1500);

  // 1. Mobile Hero
  await mobilePage.screenshot({
    path: path.join(outputDir, '01_mobile_hero.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });
  console.log('✓ Captured: 01_mobile_hero.png');

  // 2. Mobile Nav Drawer
  const hamburgerBtn = mobilePage.locator('button[aria-label="Open menu"]').first();
  if (await hamburgerBtn.isVisible()) {
    await hamburgerBtn.click();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
      path: path.join(outputDir, '02_mobile_nav_drawer.png'),
    });
    console.log('✓ Captured: 02_mobile_nav_drawer.png');
    // Close drawer
    const closeBtn = mobilePage.locator('button[aria-label="Close menu"]').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await mobilePage.waitForTimeout(400);
    }
  }

  // 3. Mobile Philosophy (#companion)
  const mCompanion = mobilePage.locator('#companion');
  if (await mCompanion.isVisible()) {
    await mCompanion.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
      path: path.join(outputDir, '04_mobile_philosophy.png'),
    });
    console.log('✓ Captured: 04_mobile_philosophy.png');
  }

  // 4. Mobile Care Guide (#care)
  const mCare = mobilePage.locator('#care');
  if (await mCare.isVisible()) {
    await mCare.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
      path: path.join(outputDir, '03_mobile_features.png'),
    });
    console.log('✓ Captured: 03_mobile_features.png');
  }

  // 5. Mobile Four Steps (#steps)
  const mSteps = mobilePage.locator('#steps');
  if (await mSteps.isVisible()) {
    await mSteps.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
      path: path.join(outputDir, '05_mobile_journey.png'),
    });
    console.log('✓ Captured: 05_mobile_journey.png');
  }

  // 6. Mobile Three Paths (#paths)
  const mPaths = mobilePage.locator('#paths');
  if (await mPaths.isVisible()) {
    await mPaths.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
      path: path.join(outputDir, '06_mobile_paths_services.png'),
    });
    console.log('✓ Captured: 06_mobile_paths_services.png');
  }

  // 7. Mobile Inquiry Sheet (bottom sheet modal)
  // Trigger from plant card or sticky mobile bar
  await mobilePage.evaluate(() => window.scrollTo(0, 900));
  await mobilePage.waitForTimeout(600);
  const mInquireBtn = mobilePage.locator('button:has-text("Ask Nursery"), button:has-text("Inquire Now"), button[aria-label*="Ask"]').first();
  if (await mInquireBtn.isVisible()) {
    await mInquireBtn.click();
    await mobilePage.waitForTimeout(700);
    await mobilePage.screenshot({
      path: path.join(outputDir, '07_mobile_inquiry_form.png'),
    });
    console.log('✓ Captured: 07_mobile_inquiry_form.png');
    // Close inquiry sheet
    await mobilePage.keyboard.press('Escape');
    await mobilePage.waitForTimeout(400);
  }

  // 8. Mobile Footer
  const mFooter = mobilePage.locator('footer[aria-label="Site Footer"]');
  if (await mFooter.isVisible()) {
    await mFooter.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
      path: path.join(outputDir, '08_mobile_footer.png'),
    });
    console.log('✓ Captured: 08_mobile_footer.png');
  }

  await mobileContext.close();
  await browser.close();

  console.log('\n🎉 ALL SCREENSHOTS SUCCESSFULLY CAPTURED AND STORED IN screenshots/ DIRECTORY!');
}

captureAllScreenshots().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
