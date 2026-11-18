const { test, expect } = require('@playwright/test');
const CONSTANTS = require('../constants/assertionValues');

const region = 'na1';
const username = 'tanuj@nice.com';
const password = 'M83Kdhe$hdM@dfs83';
const baseUrl = `https://${region}.test.nice-incontact.com`;

test('CXone Window Handling: Testing Across Multiple Pop-Up Windows**', async ({ page }) => {
    await page.goto(baseUrl);

    const usernameInput = page.locator('input[name="username"]');
    const nextBtn = page.locator('button[type="submit"]');
    const passwordInput = page.locator('input[name="password"]');
    const signInBtn = page.locator('button[id="loginBtn"]');

    await usernameInput.fill(username);
    await nextBtn.click();
    await passwordInput.fill(password);
    await signInBtn.click();

    await page.waitForURL(`${baseUrl}${CONSTANTS.ADMIN_URL}`);
    await page.goto(baseUrl + CONSTANTS.LAST730DAYS_URL);

    const playBtn = page.locator('.actions-cell').first();
    const newPagePromise = page.context().waitForEvent('page');
    await playBtn.click();
    const newPage = await newPagePromise;

    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL(/^https:/);
    await expect(newPage).toHaveTitle(/.+/);
});

test('RSA Window Handling: Testing in different browser tabs', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const newPagePromise = page.context().waitForEvent('page');
    await documentLink.click();
    const newPage = await newPagePromise;

    await newPage.waitForLoadState('domcontentloaded');
    const text = await newPage.locator(".red").innerText();
    await expect(newPage.locator(".red")).toContainText(/@/);

    const emailDomain = text.match(/@([\w.-]+)/)?.[1];
    expect(emailDomain).toBeTruthy();
    await page.locator("#username").fill(emailDomain);
    await expect(page.locator("#username")).toHaveValue(emailDomain);

});