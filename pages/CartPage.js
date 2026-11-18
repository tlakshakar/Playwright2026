class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItem = page.locator('div li').first();
        this.checkoutButton = page.locator('text=Checkout');
    }

    async verifyProductInCart(productName) {
        await this.cartItem.waitFor();
        await this.page.locator(`h3:has-text('${productName}')`).waitFor();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;
