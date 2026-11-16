const { test, expect } = require('@playwright/test')

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});

test("Some validations", async ({ page }) => {
    await page.goto("http://google.com");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.goBack();
    await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
});