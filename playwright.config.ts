import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration File
 * This file defines how our tests will run, which browsers to use, 
 * and where to store reports and screenshots.
 */
export default defineConfig({
  // Directory where our tests are located
  testDir: './tests',
  
  // Maximum time one test can run for (30 seconds)
  timeout: 30 * 1000,
  
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: 'html',
  
  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'https://www.coursera.org',

    // Collect trace when retrying a failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Run in headless mode (no browser window)
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
