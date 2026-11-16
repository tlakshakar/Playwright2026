import { test, expect } from '@playwright/test'; // Imports Playwright's test function and assertion tools.

test('Playwright Special locators', async ({ page }) => { 

    await page.goto("https://rahulshettyacademy.com/angularpractice/"); 
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check(); // Finds the employment option by label
    await page.getByLabel("Gender").selectOption("Female"); // Chooses Female from the dropdown labeled Gender.
    await page.getByPlaceholder("Password").fill("abc123"); // Enters text in the field whose placeholder says Password.
    await page.getByRole("button", { name: 'Submit' }).click(); // Finds all buttons showing at webpage and clicks the Submit button available on webpage.
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); // Reads whether the success message is visible; the returned boolean is not asserted here.

    // Sets a 10-second timeout specifically for the following visibility assertion.
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout: 10_000 }); // Verifies the success message becomes visible within 10 seconds. Here we are overriding the default 5 seconds timeout


    await page.getByRole("link", { name: "Shop" }).click(); // Finds all links showing at webpage and clicks the link named Shop.
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click(); // Finds al the cards and locate the card containing Nokia Edge and clicks its button.

    // This is a note about a possible locator wait; no waitFor call is currently active.

});


// The following test uses the timeout configured for the test run.
test('Playwright - Define Timeout at Test level', async ({ page }) => { // Starts another test and provides a browser page.

    const slowExpect = expect.configure({ timeout: 9000 }); // Creates assertions that wait up to 9 seconds.
   
    await page.goto("https://rahulshettyacademy.com/angularpractice/"); // Opens the practice form webpage.
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // Finds the checkbox by its label and clicks it.
    await page.getByLabel("Employed").check(); // Finds the employment option by label and makes sure it is checked.
    await page.getByLabel("Gender").selectOption("Female"); // Chooses Female from the dropdown labeled Gender.
    await page.getByPlaceholder("Password").fill("abc123"); // Enters text in the field whose placeholder says Password.
    // Gives this button click a 7-second timeout.
    await page.getByRole("button", { name: 'Submit' }).click({ timeout: 7000 }); // Finds and clicks Submit, failing if the click takes too long.
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); // Reads whether the success message is visible; the returned boolean is not asserted here.

    // Uses the 9-second timeout configured above for this assertion.
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); // Verifies the success message becomes visible.


    await page.getByRole("link", { name: "Shop" }).click(); // Finds and clicks the link named Shop.
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name"); // Checks that the first element with class my-4 says Shop Name.
    // This note says "2 more" but does not specify what should take two more seconds.
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click(); // Finds the card containing Nokia Edge and clicks its button.

    // This is a note about a possible locator wait; no waitFor call is currently active.

});