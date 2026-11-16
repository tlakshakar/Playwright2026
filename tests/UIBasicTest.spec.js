const { test, expect } = require('@playwright/test')
const CONSTANTS = require('../constants/assertionValues');

const region = 'na1';
const username = 'tanuj@nice.com';
const password = 'M83Kdhe$hdM@dfs83';
const tenantName = 'perm_regression_QA';
const baseUrl = `https://${region}.test.nice-incontact.com`;

/**
 * The browser represents the actual browser instance. 
 * Within that, browser contexts are like isolated browser profiles—they allow multiple independent sessions to run simultaneously without interfering with each other. 
 * And then, pages are the individual tabs or windows within those contexts. 
 * This setup is really useful for achieving session isolation and running tests faster.
 * When you launch a browser in Playwright, you can create multiple browser contexts within it. 
 * Each context acts like a separate, private browser session—it has its own cookies, localStorage, and cache.
 * Then, within each context, you can open pages, which are individual tabs or windows where your tests interact with the application 
 * Each browser context in Playwright operates independently—it has its own cookies, localStorage, and even cache. This means that actions in one context won't affect another, allowing for isolated testing scenarios.
 * 
 * Browser → Context → Page = Browser → User Session → Tab.
 */

/**
 * Browser = Google Chrome application.
 * Context = A separate user session inside Chrome.
 * Page = A tab inside that session.

 * Browser (Chrome)
    │
    ├── Context 1 (User A)
    │   ├── Page 1 (Dashboard)
    │   └── Page 2 (Profile)
    │
    └── Context 2 (User B)
        ├── Page 1 (Dashboard)
        └── Page 2 (Settings)
 */

/**
 * When should we use them?
 * Scenario	                            What to use
 * ----------------------------------------------------------------
 * Open a browser	                    Browser
 * Test a login page	                Page
 * Test two different users	            Multiple Contexts
 * Open multiple tabs	                Multiple Pages
 * Test session isolation	            Multiple Contexts
 * Test pop-up windows	                Pages
 */

test.skip("Browser Context Playwright Test - Invoke Browser", async ({ browser }) => {
    // Create a new incognito browser context.
    const context = await browser.newContext(); // Which browser to choose will be driven from playwright.config.js file
    // Create a new page in a pristine context.
    const page = await context.newPage();

    await page.goto(baseUrl);
});

/**
 * In regular Playwright tests, you don't need to create the browser and context manually. 
 * Playwright provides the page fixture automatically, which is a pre-configured page object that you can use to interact with your application.
 */
test("Page Playwright Test - Invoke Browser", async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(CONSTANTS.NICE_CXONE_SIGN_IN_TITLE);

    var title = await page.title();
    console.log("Page Title is: " + title);
    expect(title).toBe(CONSTANTS.NICE_CXONE_SIGN_IN_TITLE);

    await page.locator('input[name="username"]').clear();
    await page.locator('input[name="username"]').fill(username);

    await page.locator('button[type="submit"]').click();

    await page.locator('input[name="password"]').clear();
    await page.locator('input[name="password"]').fill(password);

    await page.locator('button[id=loginBtn]').click();

    await page.waitForURL(baseUrl + CONSTANTS.ADMIN_URL, { waitUntil: 'networkidle' });
    await page.goto(baseUrl + CONSTANTS.PROFILE_URL);
    await page.waitForLoadState('networkidle');

    console.log("Profile Title is: " + CONSTANTS.MY_PROFILE_TITLE);
    await expect(page).toHaveTitle(CONSTANTS.MY_PROFILE_TITLE);

    var profileText = await page.locator('myprofile-app div span[class="name"]').textContent();
    expect(profileText).toBe(CONSTANTS.PROFILE_TEXT);
    console.log("Profile Text is: " + profileText);

    const inputElements = await page.locator('myprofile-app div input[class="sol-input"]');
    console.log("Total Input Elements are: " + await inputElements.count());
    expect(await inputElements.count()).toBe(5);

    var emailText = await page.locator('myprofile-app div input[class="sol-input"][name="email"]').inputValue();
    console.log("Email Text is: " + emailText);
    expect(emailText).toBe(CONSTANTS.EMAIL_TEXT);

    var usernameText = await page.locator('myprofile-app div input[class="sol-input"]').nth(0).inputValue();
    console.log("Username Text is: " + usernameText);
    expect(usernameText).toBe(CONSTANTS.USERNAME_TEXT);

    var accountText = await page.locator('myprofile-app div input[class="sol-input"]').nth(3).inputValue();
    console.log("Account Text is: " + accountText);
    expect(accountText).toBe(CONSTANTS.ACCOUNT_TEXT);

    var tenantIdText = await page.locator('myprofile-app div input[class="sol-input"]').nth(4).inputValue();
    console.log("Tenant ID Text is: " + tenantIdText);
    expect(tenantIdText).toBe(CONSTANTS.TENANTID_TEXT);

    var userIdText = await page.locator('myprofile-app div input[class="sol-input"]').nth(2).inputValue();
    console.log("User ID Text is: " + userIdText);
    expect(userIdText).toBe(CONSTANTS.USERID_TEXT);

    let allTexts = await inputElements.evaluateAll((elements) => elements.map((el) => { return el.value })); // Print all the text contents of the input elements
    console.log("All Texts are: " + allTexts);
});