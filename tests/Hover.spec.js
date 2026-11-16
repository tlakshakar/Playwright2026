const { test, expect } = require('@playwright/test')

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});

test("Hover", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await page.locator("#mousehover").hover();
    
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});