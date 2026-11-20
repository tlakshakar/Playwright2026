# Business Use Case: Configure and Share a CXone Dashboard Widget

## Scenario

A contact-center supervisor creates a dashboard for operational monitoring or analysis. They add a widget from an application domain available to their tenant and role, verify its data, configure the filters supported by that widget (for example Teams, Agents, or Skills), save the settings, and verify that the displayed data reflects those filters. The supervisor then shares the dashboard with an eligible colleague. The colleague sees the shared dashboard layout but only the data allowed by their own permissions and Global View.

This is a user-provided workflow. It is not a claim that every tenant exposes every domain, widget, filter, or sharing action. Validate the current tenant and relevant official documentation before turning an item into an assertion.

## Entry Points

The user supplied these test-tenant entry points on 2026-11-20:

- Login: `https://na1.test.nice-incontact.com/login/`
- Dashboards: `https://na1.test.nice-incontact.com/apps/#/dashboard/wrapper/dashboards`

Treat these as tenant-specific configuration, not general CXone URLs. Use approved environment configuration for automation and never commit credentials.

## User Journey

1. Sign in to the approved non-production tenant as a user permitted to create dashboards.
2. Open the Dashboards page and create a new dashboard.
3. Wait for an observable dashboard-ready condition; avoid a fixed sleep.
4. Open a widget domain/category available to the tenant and user, such as ACD, Quality Management, Coaching, Data Insights, Performance Management, WFO, or Analytics.
5. Add a widget that is available to that user.
6. Verify the widget renders the expected data for known test data and the user's access scope. Use the widget's current documentation for columns, metrics, and freshness.
7. Open that widget's settings and apply supported filters, such as Teams, Agents, or Skills. Do not assume every filter is available on every widget.
8. Save the widget settings.
9. Verify displayed data reflects the selected filters, and that data outside the user's allowed scope is absent.
10. Save the dashboard if the UI requires a separate dashboard save, then reopen it and verify the configured widget/settings persist.
11. Share the dashboard with a permitted recipient, within the owner's sharing scope.
12. Sign in as the recipient and verify the shared layout is available while displayed data remains limited by the recipient's own permissions and Global View.
13. Verify sharing is unavailable or rejected for a recipient outside the owner's permitted scope, if that negative path is supported and safe to test.

## Acceptance Criteria

| ID | Given | When | Then | Evidence / notes |
|---|---|---|---|---|
| DW-AC-01 | A user has dashboard-create permission | The user opens Dashboards and creates a dashboard | The dashboard is created and reaches an observable ready state | Verify the actual create flow and ready indicator in the tenant |
| DW-AC-02 | The dashboard is ready and the user has access to a widget category | The user selects that category and chooses an available widget | The widget is added to the dashboard | Category and widget availability depend on tenant apps, license, and role |
| DW-AC-03 | The widget has loaded and test data is known | The user views the widget | Displayed metrics/rows match the widget's documented behavior and authorized test data | Use current per-widget source documentation; don't infer data from labels alone |
| DW-AC-04 | The widget offers settings and a supported filter | The user selects a filter value and saves settings | The setting is accepted and the widget reflects the selected scope | Record which filters are actually offered for the selected widget |
| DW-AC-05 | The selected filters correspond to known, authorized fixtures | The widget has refreshed after the settings change | Matching records/metrics are shown and nonmatching records are excluded | Account for the widget's documented data and widget refresh intervals |
| DW-AC-06 | The dashboard/widget configuration has been saved | The user reopens the dashboard | The widget and its saved settings persist | Confirm whether settings persistence is personal, dashboard-wide, or owner-controlled |
| DW-AC-07 | The owner has permission to share with a recipient in scope | The owner shares the dashboard and the recipient opens it | The recipient can access the shared layout; their displayed data is still governed by their own data permissions | Validate the recipient's role and Global View separately |
| DW-AC-08 | The candidate recipient is outside the owner's sharing scope | The owner attempts to share, if the UI supports this attempt | The out-of-scope recipient cannot be granted access | Verify tenant policy; don't infer from layout/data visibility alone |

## Candidate Test Scenarios

| ID | Priority | Scenario | Type | Preconditions |
|---|---|---|---|---|
| DW-T01 | High | Create a dashboard and wait for its ready state | UI / positive | Authorized dashboard creator |
| DW-T02 | High | Verify only available categories/widgets can be selected | UI / permission | Tenant app/license and user role known |
| DW-T03 | High | Add a widget and verify its documented data | UI / data | Known test records and widget-specific source facts |
| DW-T04 | High | Apply a supported Team, Agent, or Skill filter and verify the result set | UI / filtering | Filter and test data supported by the selected widget |
| DW-T05 | High | Save settings, reopen dashboard, and verify persistence | UI / persistence | Clarify personal vs dashboard-wide settings behavior |
| DW-T06 | Critical | Share within scope and verify recipient's access/data are permission-limited | UI / RBAC | Owner and recipient test accounts with distinct authorized scopes |
| DW-T07 | High | Attempt out-of-scope sharing and verify it is prevented | UI / negative RBAC | Explicitly approved test case and safe tenant setup |
| DW-T08 | Medium | Verify an empty/no-match filtered result is handled clearly | UI / boundary | Widget-specific empty-state behavior confirmed |

## Questions to Resolve Before Automation

- Which category and widget are the first target for the exercise? ACD is the best first slice because the official ACD widget catalog provides explicit examples and refresh behavior.
- Which categories and widgets are available under the test tenant's licenses and the test user's role?
- Which settings are saved per viewer, per dashboard, or by the owner? Does saving widget settings also save the dashboard?
- Which filters does the selected widget actually support, and are Teams, Agents, and Skills available together or separately?
- What stable test records exist for each filter, and how can they be reset without changing production data?
- Which roles/Global Views should the owner and recipient use? What is the approved expected behavior for sharing outside the owner's scope?
- What source-data refresh and widget-refresh tolerance should the tests allow for the selected widget?

## Test Data and Safety

- Use only a designated non-production tenant and approved test accounts.
- Keep credentials in a local ignored environment file or secret store; never put them in this document, prompts, screenshots, or source control.
- Use synthetic/non-sensitive team, agent, and skill data where possible.
- Do not share, delete, or change dashboards unless that operation is approved for the test tenant.
- Stop and report missing permissions, test fixtures, or observable selectors rather than guessing.
