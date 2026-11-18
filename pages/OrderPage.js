class OrderPage {
    constructor(page) {
        this.page = page;
        this.myOrdersButton = page.locator("button[routerlink*='myorders']");
        this.orderRows = page.locator('tbody tr');
        this.orderDetailsId = page.locator('.col-text');
    }

    async verifyOrderDetails(orderId) {
        await this.myOrdersButton.click();
        await this.page.locator('tbody').waitFor();

        const count = await this.orderRows.count();
        for (let i = 0; i < count; i++) {
            const rowOrderId = await this.orderRows.nth(i).locator('th').textContent();
            if (orderId.includes(rowOrderId)) {
                await this.orderRows.nth(i).locator('button').first().click();
                break;
            }
        }

        await this.orderDetailsId.waitFor();
        const orderIdDetails = await this.orderDetailsId.textContent();
        return orderId.includes(orderIdDetails);
    }
}

module.exports = OrderPage;
