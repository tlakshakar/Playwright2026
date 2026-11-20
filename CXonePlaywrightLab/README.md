# CXone Playwright Lab

A standalone VS Code Copilot skills project for learning how to turn NiCE CXone Dashboard documentation and business requirements into evidence-backed Playwright tests.

## Open This Project

Open `...\Playwright2026\CXonePlaywrightLab` as the workspace folder in VS Code. Skills are stored under `.github/skills/`; their folder names must match the `name` in each `SKILL.md` frontmatter.

The project includes its own `.mcp.json` for the Playwright MCP server. MCP is for interactive browser exploration. Generated, repeatable browser tests use Playwright Test and belong in a test project; this lab does not include guessed CXone locators or tenant credentials.

## Skills

### CXone Testing Workflow & Stage Guide

| Skill | Simple purpose | Use it when |
| :--- | :--- | :--- |
| `cxone-test-planning` | **Understand the requirement and its evidence.** It compares current documented behavior with requested changes, records gaps, and checks readiness. | You have a CXone request, story, or acceptance criteria and need to know what is confirmed, what changed, and what needs clarification. A Jira ticket is needed for changed behavior, but not for baseline/regression planning. |
| `create-scenarios` | **List the situations worth testing.** It uses six lenses: happy path, business rules, security, negative/error, edge cases, and UI states. | Requirements and domain behavior are clear enough to draft test cases. It creates scenario documents, not automated tests. In this CXone project, the skill lives in `cxone-create-scenarios` but its skill name is `create-scenarios`. |
| `test-strategy` | **Choose where each test belongs.** It assigns Unit, API, Component, or E2E and explains why. | You have scenarios and need an efficient test pyramid. |
| `cxone-playwright-test-generation` | **Explore and automate browser tests.** It uses an authorized tenant to observe locators, write Playwright tests, and run targeted checks. | Requirements are approved, the target tenant and test data are authorized, and browser behavior needs validation. |

---

## Workflow Example: Adding a Channel Filter to Agent Contact View

1. **`cxone-test-planning`**: Compare current CXone behavior with the approved request and identify missing details.
2. **`create-scenarios`**: Cover the filter’s success, no-result, reset, security, and error situations.
3. **`test-strategy`**: Determine whether each scenario belongs at Component, API, or E2E layer.
4. **`cxone-playwright-test-generation`**: Inspect and automate the browser scenarios once tenant access and fixtures are ready.


In Copilot Chat, invoke a skill from the `/` menu or ask for the corresponding CXone workflow after opening this folder.

## Product Context

User-provided description: "Consolidates data from across CXone applications into configurable widget-based dashboards for supervisors and managers. Widgets include charts, tables, and KPI displays that can be arranged to surface the metrics and customer sentiment data that matter most."

Use this as high-level product framing only. Confirm widget availability, visualization types, metrics, and customer-sentiment data against current official documentation and the authorized tenant before using them as test assertions.

## Practice Use Case

A supervisor creates a dashboard, adds a widget from a domain available to their tenant and role, checks the data, applies the filters offered by that widget (for example Teams, Agents, or Skills), saves the settings, and verifies the filtered result. The supervisor then shares the dashboard with an eligible colleague. The colleague can access the shared layout, but the data remains governed by that colleague's own permissions and Global View.

The full workflow, acceptance criteria, candidate test cases, and clarification questions are in [the dashboard widget workflow](.github/skills/cxone-test-planning/assets/dashboard-widget-workflow.md). It covers the categories supplied for this use case: ACD, Quality Management, Coaching, Data Insights, Performance Management, WFO, and Analytics. Treat them as tenant-dependent options, not a guarantee that every category is enabled for every user.

Practice sequence:

1. Ask `cxone-dashboard-domain` to check current official docs for the target widget and separate widget refresh from source-data freshness.
2. Ask `cxone-test-planning` to create an evidence ledger, resolve open questions, and derive traceable criteria for dashboard creation, widget setup, filters, saved settings, and recipient RBAC.
3. In an authorized non-production tenant, use `cxone-playwright-test-generation` with Playwright MCP to observe the workflow and record actual locators. Start read-only; perform create/configure/share actions only when explicitly approved for that test tenant.
4. Generate and review Playwright Test code against observed UI behavior and known test data. Verify both owner and recipient views with distinct authorized scopes.
5. Run targeted tests only against approved accounts and data. Refresh documentation evidence when sources change; update tests affected by those changes.

## Source of Truth

Use the official [NiCE CXone Dashboard documentation](https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm) for dashboard-wide behavior and [ACD Widgets documentation](https://help.nicecxone.com/content/dashboardwem/acdreportingwidgets.htm) for widget-specific behavior. Reference notes in this project were checked on 2026-11-20; retrieve the current pages before relying on them because product documentation can change.

Product documentation is not a substitute for tenant-specific UI evidence. Never put passwords, tokens, customer data, or production-only information in prompts, source files, screenshots, or test reports.
