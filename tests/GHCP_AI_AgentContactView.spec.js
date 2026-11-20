const { test, expect } = require('@playwright/test');

const REGION = process.env.CXONE_REGION || 'na1';
const BASE_URL = `https://${REGION}.test.nice-incontact.com`;
const LOGIN_URL = 'https://cxone.test.niceincontact.com/auth/authorize';
const DASHBOARD_URL = `${BASE_URL}/apps/#/dashboard/wrapper/dashboards`;

function requiredEnvironment(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

async function login(page) {
    const username = requiredEnvironment('CXONE_USERNAME');
    const password = requiredEnvironment('CXONE_PASSWORD');

    await page.goto(BASE_URL + '/login/');

    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(username);
    await page.getByRole('button', { name: 'NEXT' }).click();

    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(password);
    await page.locator('button[id="loginBtn"]').click();
    await expect(page).not.toHaveURL(/\/auth\/authorize/);
}

function dashboardFrame(page) {
    return page.frameLocator('iframe[src*="dashboard-' + REGION + '.test.nice-incontact.com"]');
}

async function openDashboard(page) {
    await page.goto(DASHBOARD_URL);

    const dashboard = dashboardFrame(page);
    await expect(dashboard.getByRole('button', { name: /Create Dashboard|Select Dashboard/ }).first())
        .toBeVisible({ timeout: 30000 });

    await expect(dashboard.getByRole('region', { name: /Agent Contact View/ }))
        .toBeVisible({ timeout: 30000 });
}

test.describe('Agent Contact View', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
        await openDashboard(page);
    });

    test('TC-001 opens the widget and displays the mandatory and available columns', async ({ page }) => {
        const dashboard = dashboardFrame(page);
        const widget = dashboard.getByRole('region', { name: /Agent Contact View/ });

        await expect(widget).toBeVisible({ timeout: 30000 });

        const mandatoryColumns = ['Agent Name', 'Agent Contact State'];
        for (const columnName of mandatoryColumns) {
            await expect(widget.getByRole('columnheader', { name: columnName }))
                .toBeVisible();
        }

        for (const columnName of [
            'Contact No',
            'Skill',
            'Channel',
            'Agent Contact State Time'
        ]) {
            await expect(widget.getByRole('columnheader', { name: columnName }))
                .toBeVisible();
        }

        await expect(widget.getByRole('grid')).toBeVisible();
    });

    test('TC-501 observes Agent Contact View settings without changing saved configuration', async ({ page }) => {
        const dashboard = dashboardFrame(page);
        const widget = dashboard.getByRole('region', { name: /Agent Contact View/ });

        await widget.getByRole('button', { name: /Menu for Agent Contact View/ }).click();
        await dashboard.getByRole('menuitem', { name: /Settings for Agent Contact View/ }).click();

        await expect(dashboard.getByText('Widget Settings')).toBeVisible({ timeout: 30000 });
        await expect(dashboard.getByText('Show Only ACW Agent Contact States')).toBeVisible();
        await expect(dashboard.getByText('Team', { exact: true })).toBeVisible();
        await expect(dashboard.getByText('Agent', { exact: true })).toBeVisible();

        await dashboard.getByRole('button', { name: 'Cancel' }).click();
    });

    test('TC-500 exposes column settings and retains the mandatory columns', async ({ page }) => {
        const dashboard = dashboardFrame(page);
        const widget = dashboard.getByRole('region', { name: /Agent Contact View/ });

        await widget.getByRole('button', { name: /Menu for Agent Contact View/ }).click();
        await dashboard.getByRole('menuitem', { name: 'Columns' }).click();

        await expect(dashboard.getByText('Agent Name', { exact: true }).first()).toBeVisible();
        await expect(dashboard.getByText('Agent Contact State', { exact: true }).first()).toBeVisible();
    });
});
