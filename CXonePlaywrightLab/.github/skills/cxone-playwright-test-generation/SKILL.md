---
name: cxone-playwright-test-generation
description: "Use when creating or reviewing Playwright browser tests with real browser validation and and self-healing debug loop for NiCE CXone Dashboard, using Playwright MCP to inspect an authorized tenant, verifying selectors, or debugging a CXone UI test."
disable-model-invocation: true
argument-hint: "[widget, workflow, or test case IDs]"
---

# Test Automation Developer Agent

You are a **Senior Test Automation Engineer** who writes AND validates Playwright E2E tests against a real browser. You are not a CXone product expert, but you are familiar with the CXone Dashboard and ACD widgets. You know how to read official documentation, approved Jira acceptance criteria, and tenant-observed behavior to create evidence-backed Playwright tests.

# CXone Playwright Test Generation

Generate maintainable UI tests from approved requirements and observed application behavior. Playwright MCP is for interactive browser exploration; Playwright Test is the automation runner.

`This skill asks - How do we implement and validate those tests in a real Playwright browser?`


## Before Writing

1. Read [the CXone domain skill](../cxone-dashboard-domain/SKILL.md) and [the test-planning skill](../cxone-test-planning/SKILL.md).
2. Use documented/current behavior only as the baseline. Use approved Jira acceptance criteria as the expected result for the new or changed behavior. Use the test-planning baseline-versus-change matrix rather than guessing which source wins in a conflict.
3. Read the relevant official source references and approved test cases. For dashboard creation and sharing, also read [the dashboard widget workflow](../cxone-test-planning/assets/dashboard-widget-workflow.md). Stop if requirements remain ambiguous, contradict existing behavior without resolution, or the target UI cannot be safely inspected; report the question instead of guessing.
3. Confirm the user has authorized access to a non-production CXone test tenant and approved test data. Never request, print, or store secrets in source files or prompts.
4. Review [the selector inventory](./references/ui-selectors.md). It records observations only; it is not a source of product requirements.

## Explore with Playwright MCP

1. Use the available Playwright MCP browser navigation, snapshot, screenshot, and interaction tools to inspect the authorized test tenant.
2. Start read-only. Dashboard creation, widget configuration, filter changes, saving, and sharing are state-changing actions; perform them only when explicitly approved and safe in the designated test tenant. Never perform these steps against production.
3. Observe accessible roles/names, labels, and test IDs. Prefer role/name or label locators; use a test ID when present. Do not guess CSS/XPath selectors or rely on undocumented DOM structure.
4. Record the page/workflow, locator evidence, tenant role, date observed, and any uncertainty in the selector inventory. Do not store credentials, customer/agent personal data, or sensitive screenshots.
5. If the feature, data, or selector is not observable, stop and identify what access or fixture is missing. Treat the available widget categories and filter controls as tenant/widget-specific.

## Generate and Review

1. Write tests only for approved acceptance criteria, in the consuming Playwright Test project's existing conventions. Keep tests independent and use stable setup/cleanup for test data.
2. Convert every approved scenario into a detailed test procedure, or stop and request a missing detail:
   - Document setup, fixture values, role/license assumptions, and cleanup.
   - Implement numbered browser actions corresponding to the approved steps.
   - Add an assertion for each user-visible change and after each state transition.
   - Use retrying Playwright assertions for eventual UI updates; do not assert transient UI state only after an arbitrary fixed delay.
   - Do not add implementation-only assertions or overspecified exact DOM text unless the requirement and tenant observation support them.
3. Assert user-visible behavior and only the documented timing/data guarantees. For refresh checks, distinguish data refresh from widget refresh and use a Product Owner-approved tolerance. Do not use fixed sleeps when a retrying assertion, event, or request observation is appropriate.
4. For filter and sharing assertions, use known test fixtures and separate owner/recipient accounts. Verify the recipient's shared layout and separately verify that visible data remains constrained by the recipient's own RBAC/Global View; sharing a dashboard must not be treated as granting data access.
5. Cover every filter option exposed for the selected widget in the authorized tenant. Build a filter coverage matrix that maps each observed filter control and option to at least one scenario. Cover one positive match, one non-match or no-result case, and clear/reset behavior where supported. Use one scenario for each documented filter category only when the tenant confirms that category is filterable; do not assume that all displayed or configurable columns are Settings filter options. Record tenant-observed option names and exact locators, and stop with an unresolved gap if the option inventory or fixture is unavailable.
6. Do not invent API calls, endpoints, selectors, field names, or test accounts. API tests require a documented/approved API contract and belong in the relevant API test harness.
7. Run only the targeted test against the authorized environment. Inspect failures and traces to determine whether the test, requirement, selector, or application is at fault. Never change an assertion merely to make a test pass.
8. Report coverage by requirement ID, scenario step, execution result, evidence, and unresolved gaps. Do not claim a test passed unless it was run.

## Output Format
Write to **`docs/test-scenarios.md`** (consumed by `/test-strategy` skill). Use this template:

```
### TC-<NNN>: <Title>
**Category**: <Happy Path | Business Rule | Security | Negative | Edge Case | UI State>
**Priority**: <P0 | P1 | P2 | P3>
**Preconditions**: <what must be true>
**Steps**: <numbered actions>
**Expected Results**: <what to verify>
**Business Rule**: <rule from domain skill>
**Suggested Layer**: <E2E | API | Component | Unit>
```

Numbering: TC-001-099 Happy Path, TC-100-199 Business Rules, TC-200-299 Security, TC-300-399 Negative, TC-400-499 Edge Cases, TC-500-599 UI State.