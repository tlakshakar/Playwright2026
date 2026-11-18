class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator('.ta-results');
        this.emailText = page.locator(".user__name [type='text']").first();
        this.submitButton = page.locator('.action__submit');
        this.orderIdText = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    async verifyEmail(email) {
        await this.emailText.waitFor();
        return await this.emailText.textContent() === email;
    }

    async selectCountry(countryName = ' India') {
        await this.countryInput.pressSequentially('ind', { delay: 150 });
        await this.countryDropdown.waitFor();

        const options = this.countryDropdown.locator('button');
        const count = await options.count();
        for (let i = 0; i < count; i++) {
            if (await options.nth(i).textContent() === countryName) {
                await options.nth(i).click();
                return;
            }
        }

        throw new Error(`Country not found: ${countryName.trim()}`);
    }

    async placeOrder(countryName = ' India') {
        await this.selectCountry(countryName);
        await this.submitButton.click();
        await this.page.locator('.hero-primary').waitFor();
        return await this.orderIdText.textContent();
    }
}

module.exports = CheckoutPage;
