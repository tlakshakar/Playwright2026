const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductCataloguePage = require('../pages/ProductCataloguePage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const OrderPage = require('../pages/OrderPage');

const email = 'anshikaw@yahoo.com';
const password = 'Learning@830$3mK3';
const productName = 'ZARA COAT 3';

test.describe('Client App E2E using Page Object Model', () => {
    test.beforeAll(async () => {
        console.log('Starting Client App page object model test suites');
    });

    test.afterAll(async () => {
        console.log('Completed Client App page object model test suites');
    });

    test.beforeEach(async ({ page }) => {
        // Each test gets a fresh browser context and starts from login.
        const loginPage = new LoginPage(page);
        await loginPage.login(email, password, { application: 'client' });
    });

    test.afterEach(async ({ page }) => {
        console.log(`Test completed on page: ${page.url()}`);
    });

    test.describe('Login', () => {
        test.beforeAll(async () => {
            console.log('Verifying login opens the product catalogue');
        });

        test.afterAll(async () => {
            console.log('Login catalogue verification suite completed');
        });

        test('opens the product catalogue', async ({ page }) => {
            await expect(page.locator('.card-body').first()).toBeVisible();
        });
    });

    test.describe('Cart', () => {
        test.beforeAll(async () => {
            console.log('Verifying product selection and cart display');
        });

        test.afterAll(async () => {
            console.log('Product cart verification suite completed');
        });

        test('displays the selected product', async ({ page }) => {
            const productCataloguePage = new ProductCataloguePage(page);
            const cartPage = new CartPage(page);

            await productCataloguePage.addProductToCart(productName);
            await productCataloguePage.goToCart();

            await cartPage.verifyProductInCart(productName);
            await expect(page.locator(`h3:has-text('${productName}')`)).toBeVisible();
        });
    });

    test.describe('Checkout', () => {
        test.beforeAll(async () => {
            console.log('Verifying customer details and order placement');
        });

        test.afterAll(async () => {
            console.log('Checkout and order placement suite completed');
        });

        test('verifies the customer and places an order', async ({ page }) => {
            const productCataloguePage = new ProductCataloguePage(page);
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);

            await productCataloguePage.addProductToCart(productName);
            await productCataloguePage.goToCart();
            await cartPage.verifyProductInCart(productName);
            await cartPage.goToCheckout();

            expect(await checkoutPage.verifyEmail(email)).toBeTruthy();

            const orderId = await checkoutPage.placeOrder();
            await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
            console.log('Order Id:', orderId);
        });
    });

    test.describe('Order', () => {
        test.beforeAll(async () => {
            console.log('Verifying order history and order details');
        });

        test.afterAll(async () => {
            console.log('Order history and details verification suite completed');
        });

        test('shows the placed order in history and details', async ({ page }) => {
            const productCataloguePage = new ProductCataloguePage(page);
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);
            const orderPage = new OrderPage(page);

            await productCataloguePage.addProductToCart(productName);
            await productCataloguePage.goToCart();
            await cartPage.verifyProductInCart(productName);
            await cartPage.goToCheckout();

            const orderId = await checkoutPage.placeOrder();
            await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

            const isOrderDetailsValid = await orderPage.verifyOrderDetails(orderId);
            expect(isOrderDetailsValid).toBeTruthy();
        });
    });
});
