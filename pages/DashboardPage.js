class DashboardPage {
    constructor(page) {
        this.page = page;
    }

    async goToDashboard() {
        await this.page.goto("https://na1.test.nice-incontact.com/apps/#/dashboard/wrapper/dashboards");
        await this.page.waitForURL("https://na1.test.nice-incontact.com/apps/#/dashboard/wrapper/dashboards", { timeout: 60000 });
    }
}

module.exports = DashboardPage;