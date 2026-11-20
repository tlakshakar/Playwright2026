# Integrate VS Code with Playwright MCP

## Steps:

- Open VS Code and open the Command Palette (Ctrl+Shift+P on Windows/Linux or Cmd+Shift+P on macOS)
- Type `MCP: Add Server` and select it.

- Choose the transport type the server uses:

    - Command (stdio) for a local command (for example, npx -y @playwright/mcp@latest).

- Enter a unique Server ID (such as playwright), then choose whether to save it Global (available across workspaces) or in your Workspace.

- Accept the trust/authentication prompt if requested, and verify that the server starts without errors.

Once Playwright MCP is connected in VS Code, GitHub Copilot Chat uses its built-in browser automation capabilities. Copilot controls the browser via structured accessibility snapshots—navigating pages, clicking buttons, filling forms, and reading DOM elements—to scan user flows and output ready-to-run Playwright tests.

# How?

## Phase 1: Scan & Explore Application Flows

Start your application locally or open your target web app URL, then prompt GitHub Copilot in Agent Mode (or standard Copilot Chat).

1. Launch & Explore Flow
Prompt Copilot to initiate a real browser session and walk through a targeted workflow:

`Use Playwright to navigate to http://localhost:3000/login, log in with username testuser and password password123, then click through to the user profile dashboard.`

2. Capture Snapshot & Page State
Ask Copilot to analyze the elements present on the page

`Inspect the profile page using Playwright MCP snapshots. List all form inputs, interactive buttons, and primary headings found on the page.`

3. Inspect Network & Console Errors
Check for silent front-end regressions or missing endpoints

`Run through the checkout flow and check if there are any failed network requests or console log errors`

## Phase 2: Generate Playwright Test Files

Once Copilot completes the UI navigation sequence, ask it to convert the execution trace and DOM locator data directly into a `.spec.ts` test file

1. Generate an End-to-End Test Spec

`Based on the workflow you just navigated, generate a complete Playwright Javascript test file (tests/login.spec.js) using @playwright/test. Use user-visible locators like getByRole or getByLabel.`

Example Generated Spec:

```
import { test, expect } from '@playwright/test';

test.describe('Authentication and User Profile Flow', () => {
  test('user can log in successfully and view dashboard', async ({ page }) => {
    // 1. Navigate to page
    await page.goto('http://localhost:3000/login');

    // 2. Fill credentials
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 3. Verify successful navigation
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });
});
```

Verification: Run npx playwright test in your VS Code integrated terminal to confirm the generated spec executes and passes

## Phase 3: Advanced Workflows

If your app requires logging in every time, tell Playwright MCP to save storage state or run with `--user-data-dir`

`Save the current browser storage state to playwright/.auth/user.json so generated tests can reuse authentication.`