const { test, expect } = require('@playwright/test')
const CONSTANTS = require('../constants/assertionValues');

const region = 'na1';
const username = 'tanuj@nice.com';
const password = 'M83Kdhe$hdM@dfs83';
const tenantName = 'perm_regression_QA';
const baseUrl = `https://${region}.test.nice-incontact.com`;

/**
 * How to run this test:npx playwright test tests/CXoneApp.spec.js
 */

test("CXone App Test", async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(CONSTANTS.NICE_CXONE_SIGN_IN_TITLE);

    var title = await page.title();
    expect(title).toBe(CONSTANTS.NICE_CXONE_SIGN_IN_TITLE);

    await page.locator('input[name="username"]').clear();
    await page.locator('input[name="username"]').fill(username);

    await page.locator('button[type="submit"]').click();

    await page.locator('input[name="password"]').clear();
    await page.locator('input[name="password"]').fill(password);

    await page.locator('button[id=loginBtn]').click();

    await page.waitForURL(baseUrl + CONSTANTS.ADMIN_URL, { waitUntil: 'networkidle' });
    await page.goto(baseUrl + CONSTANTS.PROFILE_URL);
    await page.waitForLoadState('networkidle'); // DISCOURAGED as sometimes it becomes flaky and fails the test. Use waitForURL instead of waitForLoadState

    console.log("Profile Title is: " + CONSTANTS.MY_PROFILE_TITLE);
    await expect(page).toHaveTitle(CONSTANTS.MY_PROFILE_TITLE);

    var profileText = await page.locator('myprofile-app div span[class="name"]').textContent();
    expect(profileText).toBe(CONSTANTS.PROFILE_TEXT);

    const inputElements = await page.locator('myprofile-app div input[class="sol-input"]');
    let allTexts = await inputElements.evaluateAll((elements) => elements.map((el) => { return el.value })); // Print all the text contents of the input elements
    console.log("All Texts are: [" + allTexts + "]");
});