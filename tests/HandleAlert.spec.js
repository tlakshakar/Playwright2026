const { test, expect } = require('@playwright/test')

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});

test("Web Popup validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.pause();

    // Handling alert popups/dialogs in Playwright
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();


});