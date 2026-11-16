import { test, expect } from '@playwright/test'; // Imports Playwright's test function and assertion tools.

/**
 * Timeouts:
 * - At Global Level: Configured in playwright.config.js, applies to all tests. 
 *      ...
 *      ...
 *      expect: {
            timeout: 10000
        }
        ...
        ...
 * - At Test Level: Can be set for individual tests, overriding global settings.
 * - At Locator Level: Can be set for specific locators, overriding both global and test-level settings.
 * 
 * Playwright's default timeout for actions and assertions is 5 seconds. This can be adjusted based on test requirements.
 * 
 * Note: The timeout for a specific locator will override the timeout set at the test level, which in turn overrides the global timeout.
 */
test('Playwright Special locators', async ({ page }) => {
    await page.setDefaultTimeout(8000); // Sets a default timeout of 8 seconds for all actions and assertions in this test.

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    // Sets a 10-second timeout specifically for the following visibility assertion.
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout: 10_000 }); // Verifies the success message becomes visible within 10 seconds. Here we are overriding the default 5 seconds timeout


    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

    // This is a note about a possible locator wait; no waitFor call is currently active.

});

// The following test uses the timeout configured for the test run.
test('Playwright - Define Timeout at Test level', async ({ page }) => {

    // Creates assertions that wait up to 9 seconds.
    // This will override the default timeout of 5 seconds for this specific test.
    const slowExpect = expect.configure({ timeout: 9000 });

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    // Gives this button click a 7-second timeout.
    await page.getByRole("button", { name: 'Submit' }).click({ timeout: 7000 }); // step-level timeout for the click action, overriding the test-level timeout of 9 seconds and the global timeout of 5 seconds.
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    // Uses the 9-second timeout configured above for this assertion.
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();


    await page.getByRole("link", { name: "Shop" }).click();
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
    // This note says "2 more" but does not specify what should take 2 more seconds.
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

    // This is a note about a possible locator wait; no waitFor call is currently active.

});

// Set timeout for a single action
test('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev', { timeout: 30000 });
    await page.getByText('Get Started').click({ timeout: 10000 });
}, { timeout: 60000 }); // Sets a 60-second timeout for the entire test, overriding the global timeout. It is at Test Level.