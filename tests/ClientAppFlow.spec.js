const { test, expect } = require('@playwright/test')
test('Client App E2E Flow', async ({ page }) => { // Starts an end-to-end test and gives it a browser page.
    const email = "anshikaw@yahoo.com"; 
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client"); // Opens the client shopping website.
    await page.locator("#userEmail").fill(email); // Enters the email in the sign-in form.
    await page.locator("#userPassword").fill("Learning@830$3mK3"); // Enters the password in the sign-in form.
    await page.locator("[value='Login']").click(); // Clicks the Login button.
    await page.waitForLoadState('networkidle'); // Waits until network activity settles after login.
    await page.locator(".card-body b").first().waitFor(); // Waits for the first product name to appear.

    const products = page.locator(".card-body"); // Locates all product cards on the page.
    const titles = await page.locator(".card-body b").allTextContents(); // Reads the names of all listed products.
    console.log("Listed Products:",titles); // Prints the product names to the test output.

    const count = await products.count(); // Counts how many product cards are displayed.
    for (let i = 0; i < count; ++i) { // Checks each product card one at a time.
        if (await products.nth(i).locator("b").textContent() === productName) { // Checks whether this card is the desired product.
            // Adds the matching product to the shopping cart.
            await products.nth(i).locator("text= Add To Cart").click(); // Clicks Add To Cart on the matching card.
            break; // Stops searching after adding the product.
        } 
    } 

    await page.locator("[routerlink*='cart']").click(); // Opens the shopping cart.
    // await page.pause(); // If uncommented, pauses the test so the page can be inspected.

    await page.locator("div li").first().waitFor(); // Waits for a cart item to appear.
    const isChosenProductShownInCart = await page.locator("h3:has-text('" + productName + "')").isVisible(); // Checks whether the chosen product is shown in the cart.
    expect(isChosenProductShownInCart).toBeTruthy(); // Fails the test if the chosen product is not in the cart.
    await page.locator("text=Checkout").click(); // Continues from the cart to checkout.

    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150}); // Types part of the country name with a short delay between letters.
    const dropdown = page.locator(".ta-results"); // Locates the country suggestion list.
    await dropdown.waitFor(); // Waits for the country suggestions to appear.
    const optionsCount = await dropdown.locator("button").count(); // Counts the country choices in the suggestion list.
    for (let i = 0; i < optionsCount; ++i) { // Checks each country choice.
        const text = await dropdown.locator("button").nth(i).textContent(); // Reads the current choice's text.
        if (text === " India") { // Checks whether the current choice is India.
            await dropdown.locator("button").nth(i).click(); // Selects India from the suggestions.
            break; // Stops searching after selecting India.
        } // Ends the check for India.
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email); // Verifies the checkout form shows the signed-in email.
    await page.locator(".action__submit").click(); // Submits the order.
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // Verifies that the order confirmation appears.
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // Reads the newly created order ID.
    console.log(orderId); // Prints the order ID to the test output.

    await page.locator("button[routerlink*='myorders']").click(); // Opens the user's order history.
    await page.locator("tbody").waitFor(); // Waits for the order table to load.
    const rows = await page.locator("tbody tr"); // Locates the rows in the order table.

    for (let i = 0; i < await rows.count(); ++i) { // Checks each row in the order history.
        const rowOrderId = await rows.nth(i).locator("th").textContent(); // Reads the order ID in the current row.
        if (orderId.includes(rowOrderId)) { // Checks whether this row belongs to the order just placed.
            await rows.nth(i).locator("button").first().click(); // Opens the details for the matching order.
            break; // Stops searching after opening the matching order.
        } 
    } 
    const orderIdDetails = await page.locator(".col-text").textContent(); // Reads the order ID shown on the details page.
    expect(orderId.includes(orderIdDetails)).toBeTruthy(); // Verifies the details page shows the order placed earlier.

}); // Ends the end-to-end test.