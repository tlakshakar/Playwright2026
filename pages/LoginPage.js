const CONSTANTS = require('../constants/assertionValues');

class LoginPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.usernameInput = page.locator('input[name="username"]');
        this.nextBtn = page.locator('button[type="submit"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.signInBtn = page.locator('button[id="loginBtn"]');
    }

    // Reusable Login Method
    async login(username, password) {

        await this.page.goto('https://na1.test.nice-incontact.com/login/');

        await this.page.waitForLoadState('networkidle');

        await this.usernameInput.fill(username);
        await this.nextBtn.click();
        await this.passwordInput.fill(password);
        await this.signInBtn.click();
        await this.waitForUrlLoad();
    }

    async waitForUrlLoad() {
        await this.page.waitForURL('https://na1.test.nice-incontact.com' + CONSTANTS.ADMIN_URL, { timeout: 60000 });
    }
}

module.exports = LoginPage;