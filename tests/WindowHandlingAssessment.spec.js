/**
 * Test Scenario:
 *      Visit the Website: Go to the TestMu AI Selenium Playground website, which provides examples for window and modal handling.
 *      Locate the Multiple Window Popup Section: Scroll down to the section labeled “Open Twitter & Facebook Popup”.
 *      Open the Popups: Click the "Follow Twitter & Facebook" button, and two new windows (Facebook and Twitter) will open in the browser.
 */
const { test, expect } = require('@playwright/test');

test('Window Handling Assessment: Testing Across Multiple Pop-Up Windows', async ({ page }) => {
    const baseUrl = "https://www.testmuai.com/selenium-playground/window-popup-modal-demo/";
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');

    /**
     * Both waitForEvent('page') calls are waiting for a new page event. 
     * However, this approach is not reliable for capturing two separate popups triggered by the same click. 
     * Both listeners may resolve from the same page event.
     * 
     * Recommended solution: Use context.pages()
     */
    // const [newPage1, newPage2] = await Promise.all([
    //     page.context().waitForEvent('page'), // Wait for the first new window (Twitter) to open
    //     page.context().waitForEvent('page'), // Wait for the second new window (Facebook) to open
    //     page.locator('a[title="Follow Twitter & Facebook"]').click(), // Click the link to open the popup
    // ]);

    // console.log('New tab URL:', newPage1.url());
    // console.log('New tab title:', await newPage1.title());

    // console.log('New tab URL:', newPage2.url());
    // console.log('New tab title:', await newPage2.title());

    await page.locator('a[title="Follow Twitter & Facebook"]').click();
    await page.waitForTimeout(3000); // In Playwright, the equivalent of Java's Thread.sleep()

    // Get all opened pages
    const allPages = page.context().pages();
    console.log("Total Pages:", allPages.length);

    // Wait for popup windows to open
    // expect.poll() waiting for more than one page only guarantees that at least one popup opened. It does not guarantee that two opened
    await expect.poll(() => allPages.length).toBeGreaterThan(1);

    // Get all pages except the original page
    const popupPages = allPages.filter(tab => tab !== page);
    console.log("Total Popup Windows:", popupPages.length);
    
    const newPage1 = allPages[1];
    await newPage1.bringToFront(); // Bring the first popup to the front
    console.log('Page 1 - New tab URL:', newPage1.url());
    console.log('Page 1 - New tab title:', await newPage1.title());

    const newPage2 = allPages[2];
    await newPage2.bringToFront(); // Bring the second popup to the front
    console.log('Page 2 - New tab URL:', newPage2.url());
    console.log('Page 2 - New tab title:', await newPage2.title());
});