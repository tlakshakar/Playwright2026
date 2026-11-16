const { test, expect } = require('@playwright/test');

test('Web UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");

    // Dropdown can be selected using selectOption() method. You can select by value, label or index.
    await dropdown.selectOption("consult");
    
    /**
     * This will open the Playwright Inspector for debugging. 
     * You can interact with the page and inspect elements.
     */
    // await page.pause();

    const radioButtons = page.locator(".radiotextsty");
    await radioButtons.last().click();
    await page.locator("#okayBtn").click(); // web-based popup alert can be handled using click() method. Playwright automatically handles the alert popups.
    // Checkboxes can be checked or unchecked using the check() and uncheck() methods.
    console.log(await radioButtons.last().isChecked());

    /**
     * Wherever the action is performed on the page in that scope, only the await should be there
     * For example, if you are performing an action on a locator, then the await should be there for that locator and not for the page.
     */

    await expect(radioButtons.last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    // Here, await is written outside as the actual action is performed on the page and not on the locator. The locator is just a reference to the element.
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    await expect(documentLink).toHaveAttribute("href", "https://rahulshettyacademy.com/documents-request"); 
});