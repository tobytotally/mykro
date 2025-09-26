import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import { join } from 'path';

interface BettingSlipState {
  name: string;
  description: string;
  setup: (page: any) => Promise<void>;
}

const bettingSlipStates: BettingSlipState[] = [
  {
    name: 'empty-state',
    description: 'Empty betting slip - no selections',
    setup: async (page) => {
      // Just wait for page to load - already empty by default
      await page.waitForTimeout(1000);
    }
  },
  {
    name: 'new-to-mykro',
    description: 'New user first encounter with Mykro onboarding',
    setup: async (page) => {
      // Add a bet selection first - click on the first odds button
      await page.click('button:has-text("Home"):first-child');

      // Set stake
      await page.fill('input[type="text"]', '$25.00');

      // Click to expand the Mykro section
      await page.click('text=Discover Mykro');

      // Click Learn More to show onboarding
      await page.click('text=Learn More');

      // Wait for onboarding panel
      await page.waitForSelector('text=Every Payment Has Purpose', { timeout: 5000 });
    }
  },
  {
    name: 'existing-user',
    description: 'Existing user login prompt',
    setup: async (page) => {
      // Add a bet selection
      await page.click('button:has-text("Home"):first-child');

      // Set stake
      await page.fill('input[type="text"]', '$15.00');

      // Set user state to existing via state button
      await page.click('button:has-text("Focus on betting slip")');
      await page.click('button:has-text("Existing User")');

      // Click to expand Mykro section
      await page.click('text=Connect Mykro Account');

      // Click Connect Account to show onboarding
      await page.click('text=Connect Account');

      // Wait for connection panel
      await page.waitForSelector('text=Connect Your Account', { timeout: 5000 });
    }
  },
  {
    name: 'connected-account',
    description: 'Connected user with Mykro enabled',
    setup: async (page) => {
      // Add a bet selection
      await page.click('button:has-text("Away"):first-child');

      // Set stake
      await page.fill('input[type="text"]', '$40.00');

      // Set user state to connected via state button
      await page.click('button:has-text("Focus on betting slip")');
      await page.click('button:has-text("Connected Account")');

      // Expand Mykro section to show donation details
      await page.click('text=Mykro Donation');

      // Wait for expanded content
      await page.waitForSelector('text=If you win:', { timeout: 3000 });
    }
  },
  {
    name: 'you-win',
    description: 'Winning bet confirmation state',
    setup: async (page) => {
      // Add a bet selection
      await page.click('button:has-text("Home"):first-child');

      // Set stake
      await page.fill('input[type="text"]', '$50.00');

      // Set to connected state
      await page.click('button:has-text("Focus on betting slip")');
      await page.click('button:has-text("Connected Account")');

      // Expand Mykro section
      await page.click('text=Mykro Donation');

      // Wait for a moment
      await page.waitForTimeout(1000);

      // Inject winning state modal
      await page.evaluate(() => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
            <div class="text-6xl mb-4">🎉</div>
            <h2 class="text-2xl font-bold text-green-600 mb-4">You Win!</h2>
            <p class="text-gray-600 mb-4">Congratulations! Your bet was successful.</p>
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p class="text-green-800 font-medium">Donation: $7.50</p>
              <p class="text-green-600 text-sm">Making a difference with your win! 🌟</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()"
                    class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-medium">
              Awesome!
            </button>
          </div>
        `;
        document.body.appendChild(modal);
      });
    }
  },
  {
    name: 'you-dont-win',
    description: 'Losing bet with charity contribution',
    setup: async (page) => {
      // Add a bet selection
      await page.click('button:has-text("Draw"):first-child');

      // Set stake
      await page.fill('input[type="text"]', '$30.00');

      // Set to connected state
      await page.click('button:has-text("Focus on betting slip")');
      await page.click('button:has-text("Connected Account")');

      // Expand Mykro section
      await page.click('text=Mykro Donation');

      // Wait for a moment
      await page.waitForTimeout(1000);

      // Inject losing but charitable state modal
      await page.evaluate(() => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
            <div class="text-6xl mb-4">💙</div>
            <h2 class="text-2xl font-bold text-blue-600 mb-4">You Don't Win</h2>
            <p class="text-gray-600 mb-4">Your bet didn't come through this time.</p>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p class="text-blue-800 font-medium">But good news!</p>
              <p class="text-blue-600 text-sm">We're still donating $1.80 to your chosen charity 💝</p>
              <p class="text-blue-500 text-xs mt-1">Paid by BetCo</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()"
                    class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium">
              That's Amazing!
            </button>
          </div>
        `;
        document.body.appendChild(modal);
      });
    }
  }
];

async function takeStatefulScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();
  const screenshotsDir = join(process.cwd(), 'screenshots', 'betting-slip-states');

  // Create screenshots directory
  await fs.mkdir(screenshotsDir, { recursive: true });

  console.log(`📸 Taking betting slip state screenshots...`);

  for (const state of bettingSlipStates) {
    try {
      console.log(`  📸 ${state.name}: ${state.description}`);

      // Navigate to browse bets page
      await page.goto('http://localhost:9002/betco/browse-bets', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for page to load
      await page.waitForTimeout(2000);

      // Setup the specific state
      await state.setup(page);

      // Additional wait for state to settle
      await page.waitForTimeout(2000);

      const screenshotPath = join(screenshotsDir, `${state.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`    ✅ Saved: ${screenshotPath}`);
    } catch (error) {
      console.log(`    ❌ Failed: ${state.name} - ${error}`);
    }
  }

  await browser.close();
  console.log(`\n✨ Betting slip state screenshots completed!`);
}

// Mobile version
async function takeMobileStatefulScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 } // iPhone X
  });

  const page = await context.newPage();
  const screenshotsDir = join(process.cwd(), 'screenshots', 'betting-slip-states', 'mobile');

  await fs.mkdir(screenshotsDir, { recursive: true });

  console.log(`📱 Taking mobile betting slip state screenshots...`);

  for (const state of bettingSlipStates) {
    try {
      console.log(`  📱 ${state.name}: ${state.description}`);

      await page.goto('http://localhost:9002/betco/browse-bets', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(2000);
      await state.setup(page);
      await page.waitForTimeout(2000);

      const screenshotPath = join(screenshotsDir, `${state.name}-mobile.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`    ✅ Saved: ${screenshotPath}`);
    } catch (error) {
      console.log(`    ❌ Failed: ${state.name} - ${error}`);
    }
  }

  await browser.close();
  console.log(`\n✨ Mobile betting slip state screenshots completed!`);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--mobile')) {
    await takeMobileStatefulScreenshots();
  } else if (args.includes('--all')) {
    await takeStatefulScreenshots();
    await takeMobileStatefulScreenshots();
  } else {
    await takeStatefulScreenshots();
  }
}

main().catch(console.error);