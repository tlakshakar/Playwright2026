const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test("Handle Frames", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    const framesPage = page.frameLocator("#courses-iframe");

    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); // :visible means playwright will focus only on visible locator not hidden ones
    
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]); // Print numbers/subscribers
});

test("CXone Handle Frames - Using FrameLocator", async ({ page }) => {
    const username = 'tanuj@nice.com';
    const password = 'M83Kdhe$hdM@dfs83';

    test.setTimeout(120000); // Set timeout for this test to 120 seconds

    // Create LoginPage, DashboardPage object
    const loginPage = new LoginPage(page);
    const DashboardPage = new DashboardPage(page);
    await loginPage.login(username, password);
    await dashboardPage.goToDashboard();

    await page.pause(); // Pause the test execution for debugging

    const framesPage = page.frameLocator("#host-iframe");
    await framesPage.locator("[class='empty-workspace-message']").waitFor({ state: 'visible' }); // Waits until the element is visible.
    const text2 = await framesPage.locator("[class='empty-workspace-message']").textContent();
    console.log("Dashboard Selected: " + text2);
});