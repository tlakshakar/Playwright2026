// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 30000, // Maximum time for overall tests. It is defined at test level. If a test exceeds this time, it will be marked as failed. This is a global setting that applies to all tests unless overridden at the test level.
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     * It is set at global level
     */
    timeout: 10000 // Auto-retrying assertions like expect(locator).toHaveText() have a separate timeout, 5 seconds by default.
  },
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: false, // Run tests in headless mode. false means launch browser instance. Set to true for CI/CD pipelines.
    browserName: 'chromium', // Default browser to use for tests. Can be overridden in the test file or in the command line.

    actionTimeout: 10 * 1000, // All actions (like click, fill, check, submit) have a default timeout of 10 seconds. If an action takes longer than this, it will throw an error. This is a global setting that applies to all actions unless overridden at the action level.
    navigationTimeout: 30 * 1000, // All navigation actions (like goto, reload, back, forward) have a default timeout of 30 seconds. If a navigation takes longer than this, it will throw an error. This is a global setting that applies to all navigation actions unless overridden at the action level.
  },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

