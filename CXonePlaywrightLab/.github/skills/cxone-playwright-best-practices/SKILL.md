---
name: playwright-best-practices
description: Playwright E2E standards for the NiCE CXone Dashboard — observed locators, assertions, wait strategies, tenant isolation, RBAC, filters, dashboard widgets, secrets, and anti-patterns.
user-invocable: false
---

# Playwright Test Automation Best Practices for CXone Dashboard

## Overview

Use these standards when writing, reviewing, or debugging Playwright tests for the NiCE CXone Dashboard and ACD widgets. Follow the consuming Playwright Test project's configuration and conventions. This skill does not establish a local base URL, test account, tenant, browser matrix, or timeout policy.

Before browser automation:

- Confirm the target behavior and approved acceptance criteria.
- Use only an authorized non-production tenant and approved synthetic fixtures.
- Read the CXone Dashboard domain and test-generation skills.
- Use Playwright MCP to observe roles/names/labels/test IDs before writing locators.
- Do not begin state-changing dashboard, widget, filter, saving, or sharing actions unless explicitly approved.

## 1. Project Test Setup

Use the consuming project's existing Playwright configuration instead of defining CXone-wide defaults. Record tenant-specific values in environment configuration or approved secret storage.

- Use descriptive kebab-case test files, such as `agent-list-widget.spec.js` or `contact-list-widget.spec.js`.
- Group related scenarios with `test.describe()`.
- Mark tests as serial only when tenant state cannot be made independently safe.
- Keep setup and cleanup independent from test order.
- Capture screenshots/traces according to the consuming project and tenant data policy.
- Never store passwords, access keys, secrets, customer identifiers, agent personal data, or sensitive screenshots in source files.

## 2. Locator Strategy

Prefer evidence-backed locators in this order:

1. A tenant-observed test ID.
2. An accessible role plus observable accessible name.
3. An associated label or placeholder for a form control.
4. A stable observed property or scoped widget locator if no better locator exists.
5. CSS as a documented last resort only when no accessible or test-ID locator works.

```javascript
await page.getByRole('button', { name: '<tenant-observed name>' }).click();
await page.getByLabel('<tenant-observed label>').fill('approved-fixture-value');
await page.getByTestId('<tenant-observed-test-id>').toBeVisible();
```

Do not guess field names or locators from documentation. Record observed role/name/label/test ID, tenant role, observation date, and uncertainty in the CXone selector inventory.

Never use:

- XPath as the default selector.
- Complex DOM descendant chains tied to generated markup.
- Index-only locators.
- Hidden DOM structure or framework internals as product requirements.
- A locator until it has been observed in the designated tenant.

## 3. Dashboard and Widget Scoping

Scope widget interactions to the observed widget or dashboard region. Assertions should prove data state, not merely that a control or container exists.

```javascript
const dashboard = page.getByRole('main').filter({ hasText: '<observed-widget-name>' });
await expect(dashboard).toBeVisible();

const widget = dashboard.getByRole('region', { name: '<observed-widget-name>' });
await expect(widget).toBeVisible();
```

Only use such examples after the accessible names and regions are tenant-observed. Do not test every filter option through a full dashboard login journey when Component or lower-level coverage is sufficient.

## 4. Assertions

Prefer retrying Playwright assertions for eventual UI updates:

```javascript
await expect(widget).toContainText('<approved-fixture-value>');
await expect(page).toHaveURL(/dashboard|dashboards/);
await expect(row).not.toContainText('<out-of-scope-fixture>');
```

Assert user-visible behavior and only documented or approved timing/data guarantees. One assertion after a state transition is better than fixed delays or broad visual text assertions.

For refresh tests:

- Distinguish source-data update time from widget refresh time.
- Use the selected widget's documented refresh behavior or an approved PO tolerance.
- Use retrying assertions or observable request/state events.
- Do not use fixed sleeps merely to wait for dashboard data.

## 5. Wait Strategies

Use Playwright auto-waiting and retrying assertions. Use navigation waits such as `domcontentloaded` only if the consuming application requires them and the UI provides a better ready-state signal afterward.

Do not use `page.waitForTimeout()` for refresh, filter, or state propagation. A narrow timeout may be appropriate only when testing a documented spinner or elapsed UI state, but it must not replace a retrying final-state assertion.

CXone-specific timing examples:

- A near-real-time widget may have separate source-data and widget-refresh rates.
- Historical widgets can refresh at a much slower rate than near-real-time widgets.
- Dashboards can enter sleep mode after 20 minutes of inactivity except for wall-board projections.
- Never generalize the dashboard-wide 7-second refresh into a promise for every widget.

## 6. Test Structure

Keep setup, actions, and assertions readable:

```javascript
import { test, expect } from '@playwright/test';

test('shows only in-scope active contacts', async ({ page }) => {
  // Setup from approved environment configuration and fixtures.
  await page.goto(process.env.CXONE_DASHBOARD_URL);

  // Execute the user-visible workflow.
  // ... tenant-observed navigation and filter actions ...

  // Assert the final visible state.
  await expect(page.getByRole('region', { name: '<observed-widget-name>' }))
    .toContainText('<approved-in-scope-fixture>');
});
```

Secrets and credentials:

- Read credentials and tenant configuration from environment variables or a secret store.
- Never put passwords, tokens, access keys, or personal data in test source or prompts.
- Never commit `.env` files or secret-bearing Playwright storage state.
- Use separate authorized owner/recipient fixtures only when sharing/RBAC behavior is in scope.

Each test should document setup, fixtures, role/Global View assumptions, cleanup, and the scenario ID. Use scenario names that state the observable behavior rather than implementation details.

## 7. Page Objects

Use Page Objects only when they reduce meaningful duplication. Suitable owners include dashboard navigation, a widget configuration area, or one observed filter workflow.

**POM Rules:**

- One class per page or major reusable component.
- Store tenant-observed locators and setup actions in the POM.
- Methods represent user actions, not implementation-only DOM operations.
- Keep pass/fail assertions in test files.
- Do not hide required tenant evidence, role assumptions, or fixture cleanup inside a POM.
- Store no credentials or personal data in POM source.

Example shape:

```javascript
class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async openDashboard() {
    await this.page.goto(process.env.CXONE_DASHBOARD_URL);
  }

  async widget(name) {
    return this.page.getByRole('region', { name });
  }
}
```

Only use the `name` after tenant observation and inventory it with the selector evidence.

## 8. Filters and Data Scope

For filters:

- Confirm in the authorized tenant whether a control and option are actually exposed.
- Build a matrix for every exposed filter control/option.
- Test positive match, non-match or no-result, and clear/reset behavior where supported.
- Do not treat displayed columns as Settings filters unless tenant observation confirms that behavior.
- Use known approved synthetic fixtures and cleanup rules.
- Test multiple active filters only when the tenant confirms the combination semantics.

For security:

- Prefer API coverage for enforced RBAC, tenant isolation, and filter/query authorization.
- Keep a limited E2E check for the browser's visible denial or constrained data presentation.
- Use distinct owner and recipient accounts only with approved fixtures.
- Dashboard sharing changes layout access, not recipient data access.
- Shared data must remain constrained by the recipient's own RBAC/Global View.

## 9. API and Mocking Boundaries

Do not invent CXone API endpoints, response shapes, selector values, or test accounts.

Use API mocking or route fulfillment only when the consuming application and contract permit controlled UI-state testing. Mocking should isolate a Component or browser renderer, not create false evidence that real CXone authorization or tenant data behavior passed.

For real CXone E2E tests:

- Exercise the authorized application, not a fabricated API substitute.
- Do not claim RBAC passed merely because a UI filter hid a row.
- Validate server/RBAC behavior through an approved API or integration harness when available.
- Verify actual widget presentation separately in the designated tenant.

## 10. Dynamic and Isolated Data

Use unique synthetic identifiers only when the approved fixture system supports them:

```javascript
const fixtureName = `ContactListFixture-${Date.now()}`;
```

Each test should define setup and cleanup or clearly reuse an approved shared fixture. Never create or modify production data. Use synthetic or approved non-sensitive contact/agent data and restore dashboard/widget settings changed during testing.


### DO: Use auto-waiting with expect

```javascript
await expect(widget).toContainText('<approved-final-state>');
```

### DO: Verify an observable ready state

```javascript
await page.goto(process.env.CXONE_DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
await expect(page.getByRole('region', { name: '<observed-widget-name>' })).toBeVisible();
```

### DON'T: Use arbitrary sleeps

```javascript
// BAD - Never do this
await page.waitForTimeout(2000);
```

### Exception: Measuring a documented elapsed UI state

When the requirement explicitly includes a timed UI state, assert visible enter/exit states with a requirement-approved timeout and a retrying final-state assertion.

---

## 11. Debugging and Evidence

Inspect failures using Playwright traces and HTML reports. Determine whether the failure belongs to test setup, a tenant/fixture mismatch, a locator/requirement issue, or application behavior. Never weaken an assertion merely to obtain a pass.

Run only a targeted test against the authorized environment:

```bash
npx playwright test tests/<tenant-approved-widget>.spec.js --reporter=line
npx playwright test --ui
npx playwright show-report
```

Evidence should include:

- Scenario or requirement ID.
- Test action and observed result.
- Locator evidence and tenant role where relevant.
- Refresh/data timing basis.
- Execution result and trace/report location.
- Unresolved tenant, fixture, contract, or access gaps.

Do not claim pass status unless the test was executed successfully.

## 12. Anti-Patterns

| Anti-Pattern | Why It Is Bad | Do Instead |
|---|---|---|
| Using `waitForTimeout` for CXone refresh | Flaky and not evidence of current data | Use retrying assertions and approved event/request/state evidence |
| Guessing CXone selectors or field names | Breaks across tenants and violates evidence rules | Observe and record role/name/label/test ID |
| Hardcoding credentials or tenant secrets | Security and compliance risk | Use approved environment or secret storage |
| Repeating every branch in E2E | Creates an ice-cream-cone test suite | Push local logic to Component and server rules to API |
| Treating hidden UI rows as RBAC evidence | A filter can hide rather than block data | Verify authorization at API/integration and user-visible scope in E2E |
| Testing every filter option in browser | Expensive and redundant | Build tenant filter inventory; use lower layers for branch combinations |
| Inferring all filters from visible columns | Tenant/widget behavior is not guaranteed | Confirm tenant-observed Settings/filter controls |
| Assuming one widget refresh interval for all widgets | Widget and source refresh differ | Use the selected widget's documented or approved timing |
| Leaving `test.only()` in code | Skips other tests in CI | Remove before commit |
| Shared mutable dashboard state | Tests become order-dependent | Independent setup/cleanup or documented shared-fixture rules |
| Testing implementation details | Refactors cause false failures | Assert user-visible behavior and documented contracts |
| Using data that reveals personal or customer information | Privacy risk | Use approved synthetic or nonsensitive fixtures |

## 13. Execution Gate

Start browser automation only when:

- The expected behavior is clear and approved.
- A designated non-production tenant and approved accounts are available.
- Fixture setup and cleanup are defined.
- Filter controls and selectors have been observed or the gap is explicitly unresolved.
- Refresh tolerances or state-transition timing are documented.
- State-changing actions are explicitly approved.

If access, contracts, selectors, or fixtures are missing, stop and report the unresolved gap rather than inventing a test.
