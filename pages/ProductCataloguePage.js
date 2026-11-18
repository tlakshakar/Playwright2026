class ProductCataloguePage {
    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.cartButton = page.locator("[routerlink*='cart']");
    }

    async addProductToCart(productName) {
        await this.products.first().waitFor();

        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            const product = this.products.nth(i);
            if (await product.locator('b').textContent() === productName) {
                await product.locator('text= Add To Cart').click();
                return;
            }
        }

        throw new Error(`Product not found: ${productName}`);
    }

    async goToCart() {
        await this.cartButton.click();
    }
}

module.exports = ProductCataloguePage;
