import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import { join } from 'path';

interface PageRoute {
  path: string;
  name: string;
  waitFor?: string;
}

const routes: PageRoute[] = [
  // Main website pages
  { path: '/', name: 'landing-page' },
  { path: '/industries', name: 'industries' },
  { path: '/impact', name: 'impact' },
  { path: '/partners', name: 'partners' },
  { path: '/about', name: 'about' },
  { path: '/technology', name: 'technology' },
  { path: '/mykro/giving', name: 'mykro-giving' },
  { path: '/mykro/solutions', name: 'mykro-solutions' },

  // Betting app pages
  { path: '/betco', name: 'betco-home' },
  { path: '/betco/sports', name: 'betco-sports' },
  { path: '/betco/browse-bets', name: 'betco-browse-bets' },
  { path: '/betco/browse-bets-live', name: 'betco-browse-bets-live' },
  { path: '/betco/bet-slip', name: 'betco-bet-slip' },
  { path: '/betco/branding', name: 'betco-branding' },

  // Operator admin pages
  { path: '/operator-admin', name: 'operator-admin-dashboard' },
  { path: '/operator-admin/donations', name: 'operator-admin-donations' },
  { path: '/operator-admin/charities', name: 'operator-admin-charities' },
  { path: '/operator-admin/analytics', name: 'operator-admin-analytics' },
  { path: '/operator-admin/configuration', name: 'operator-admin-configuration' },
  { path: '/operator-admin/payment', name: 'operator-admin-payment' },

  // Donor portal pages
  { path: '/donor', name: 'donor-dashboard' },
  { path: '/donor/discover-charities', name: 'donor-discover-charities' },
  { path: '/donor/my-charities', name: 'donor-my-charities' },
  { path: '/donor/impact-stories', name: 'donor-impact-stories' },
  { path: '/donor/settings', name: 'donor-settings' },
];

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();
  const screenshotsDir = join(process.cwd(), 'screenshots');

  // Create screenshots directory
  await fs.mkdir(screenshotsDir, { recursive: true });

  console.log(`📸 Taking screenshots of ${routes.length} pages...`);

  for (const route of routes) {
    try {
      console.log(`  📸 ${route.name} (${route.path})`);

      await page.goto(`http://localhost:9002${route.path}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for specific element if specified
      if (route.waitFor) {
        await page.waitForSelector(route.waitFor, { timeout: 10000 });
      }

      // Additional wait for any animations or loading
      await page.waitForTimeout(2000);

      const screenshotPath = join(screenshotsDir, `${route.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`    ✅ Saved: ${screenshotPath}`);
    } catch (error) {
      console.log(`    ❌ Failed: ${route.name} - ${error}`);
    }
  }

  await browser.close();
  console.log(`\n✨ Screenshots completed! Check the 'screenshots' folder.`);
}

// Mobile screenshots function
async function takeMobileScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 } // iPhone X dimensions
  });

  const page = await context.newPage();
  const screenshotsDir = join(process.cwd(), 'screenshots', 'mobile');

  await fs.mkdir(screenshotsDir, { recursive: true });

  console.log(`📱 Taking mobile screenshots of ${routes.length} pages...`);

  for (const route of routes) {
    try {
      console.log(`  📱 ${route.name} (${route.path})`);

      await page.goto(`http://localhost:9002${route.path}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      if (route.waitFor) {
        await page.waitForSelector(route.waitFor, { timeout: 10000 });
      }

      await page.waitForTimeout(2000);

      const screenshotPath = join(screenshotsDir, `${route.name}-mobile.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`    ✅ Saved: ${screenshotPath}`);
    } catch (error) {
      console.log(`    ❌ Failed: ${route.name} - ${error}`);
    }
  }

  await browser.close();
  console.log(`\n✨ Mobile screenshots completed!`);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--mobile')) {
    await takeMobileScreenshots();
  } else if (args.includes('--all')) {
    await takeScreenshots();
    await takeMobileScreenshots();
  } else {
    await takeScreenshots();
  }
}

main().catch(console.error);