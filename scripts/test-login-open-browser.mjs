import { chromium } from "playwright";

async function main() {
  console.log("Launching visible Chrome browser window...");

  const browser = await chromium.launch({
    channel: "chrome",
    headless: false, // Visible open browser!
    slowMo: 100,     // Slight delay so the user can watch every action
  });

  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
  });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:3000/admin/login ...");
  await page.goto("http://localhost:3000/admin/login", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  console.log("Filling owner email: ntile312@gmail.com ...");
  await page.fill('input[type="email"]', "ntile312@gmail.com");
  await page.waitForTimeout(600);

  console.log("Filling temporary password: wzB5KMl32jbplszV!E7 ...");
  await page.fill('input[type="password"]', "wzB5KMl32jbplszV!E7");
  await page.waitForTimeout(800);

  console.log("Submitting login form...");
  await page.click('button[type="submit"]');

  console.log("Waiting for automatic security redirect to /admin/change-password ...");
  await page.waitForURL("**/admin/change-password", { timeout: 10000 });
  await page.waitForTimeout(1500);

  console.log("✓ Successfully reached permanent password setup page!");
  console.log("Current URL:", page.url());

  // Keep browser open for 12 seconds so the user can inspect it
  console.log("Keeping browser visible for inspection (12 seconds)...");
  await page.waitForTimeout(12000);

  await browser.close();
  console.log("Browser test complete.");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
