const { test, expect } = require('@playwright/test');
const CONSTANTS = require('../constants/assertionValues');

const region = 'na1';
const username = 'tanuj@nice.com';
const password = 'M83Kdhe$hdM@dfs83';
const baseUrl = `https://${region}.test.nice-incontact.com`;

test('CXone Window Handling: Testing Across Multiple Pop-Up Windows**', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');

    const usernameInput = page.locator('input[name="username"]');
    const nextBtn = page.locator('button[type="submit"]');
    const passwordInput = page.locator('input[name="password"]')
    const signInBtn = page.locator('button[id=loginBtn]')

    await usernameInput.clear();
    await usernameInput.fill(username);
    await nextBtn.click();
    await passwordInput.clear();
    await passwordInput.fill(password);
    await signInBtn.click();

    // await page.waitForURL(baseUrl + CONSTANTS.ADMIN_URL, { waitUntil: 'networkidle' });
    await page.goto(baseUrl + CONSTANTS.LAST730DAYS_URL);
    await page.waitForURL(baseUrl + CONSTANTS.LAST730DAYS_URL, { waitUntil: 'networkidle' });

    const playBtn = page.locator('.actions-cell').first();

    /**
     * In Playwright, if there are some actions I need to do asynchronously or in-parallel then I can use Promise.all() to wait for multiple promises to resolve. 
     * In this case, I want to wait for a new page (tab) to open after clicking the play button.
     */
    const [newPage] = await Promise.all([
        page.context() // Gets the browser context (the session in which your current page is running).
            .waitForEvent('page'), // Wait for a new tab to open. Listens when any page is opened in the background

        // The action that triggers the new page (e.g., clicking a link or button)
        playBtn.click()
    ]);

    // TODO: Add assertions or interactions with the newPage as needed
    await newPage.waitForLoadState('networkidle');
    console.log('New tab title:', await newPage.title());
    console.log('New tab URL:', newPage.url());
});

test('RSA Window Handling: Testing in different browser tabs', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log('Current tab URL:', page.url());
    console.log('Current tab title:', await page.title());
    const documentLink = page.locator("[href*='documents-request']");

    // Tell playwright to wait for a new page (tab) to open after clicking the link
    // Always keep click operation at last because we need to 1st listen for the new page event before the click action is performed. 
    // Otherwise, we might miss the event if the click happens before we make ourselves in listen mode.
    const [newPage] = await Promise.all([
        page.context() // Gets the browser context (the session in which your current page is running).
            .waitForEvent('page'), // Wait for a new tab to open. Listens when any page is opened in the background
        documentLink.click(), // This action triggers the new tab to open
    ]);
    console.log();

    // Work with the newly opened tab
    await newPage.waitForLoadState();
    console.log('New tab URL:', newPage.url());
    console.log('New tab title:', await newPage.title());

    const text = await newPage.locator(".red").textContent();
    console.log("Text from new tab: " + text);

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log("Extracted domain from new tab:" + domain);

    // Switch back to the original tab and use the extracted domain
    await page.locator("#username").fill(domain);
    console.log("Extracted email from new tab and using the same in main page:",await page.locator("#username").inputValue());

});