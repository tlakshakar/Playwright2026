# Agent List Test Matrix

**Status:** Planning specimen only. No authorized tenant UI has been inspected and no selectors have been observed.

**Baseline source:** [Agent List section](../../cxone-dashboard-domain/references/acd-widget-catalog.md)

**Authoritative rule:** The documented Agent List behavior below is the baseline. There is no Jira change in this specimen.

## Test Scope

- Verify the widget shows current agent state and active-session information.
- Verify agents are grouped by similar state.
- Verify the selected-day state summary and total time spent in each state.
- Verify expansion exposes state, skill, channel, agent contact state/time, and contact number.
- Verify Expand All, Collapse All, individual group controls, sorting, filtering, display modes, and personal settings.
- Verify the options menu provides Agent State Details and Give Reward.
- Verify data refresh is 7-10 seconds and widget refresh is 7 seconds.

## Evidence Ledger

| ID | Claim | Classification | Source | Notes |
|---|---|---|---|---|
| AL-E-01 | Agent List shows current agent state and active-session information | Documented fact | ACD Widget Catalog, Agent List | Baseline |
| AL-E-02 | Agents are grouped by similar state | Documented fact | ACD Widget Catalog, Agent List | Baseline |
| AL-E-03 | The list covers the selected day and summarizes total time per state | Documented fact | ACD Widget Catalog, Agent List | Baseline |
| AL-E-04 | Expanding a contact group exposes Skill, Channel, Agent Contact State, Agent Contact Time, and Contact Number | Documented fact | ACD Widget Catalog, Agent List | Baseline |
| AL-E-05 | Expand All opens only groups with agents in targeted states; Collapse All closes every group | Documented fact | ACD Widget Catalog, Agent List | Tenant state fixtures required |
| AL-E-06 | State sorting is supported; remove column sorting to retain state grouping | Documented fact | ACD Widget Catalog, Agent List | Baseline |
| AL-E-07 | Widget Display supports Table, Chart, or Table and Chart | Documented fact | ACD Widget Catalog, Agent List | Baseline |
| AL-E-08 | Viewer display changes save to personal settings and owner changes later can override them | Documented fact | ACD Widget Catalog, Agent List | Requires viewer and dashboard-owner roles |
| AL-E-09 | Options menu provides Agent State Details and Give Reward | Documented fact | ACD Widget Catalog, Agent List | Availability may depend on tenant permissions |
| AL-E-10 | Data refresh: 7-10 seconds; widget refresh: 7 seconds | Documented fact | ACD Widget Catalog, Agent List | Use a tolerance; do not use fixed sleeps |

## Detailed Test Scenarios

### AL-UI-01: Verify grouped current agent and active-session states

- **Priority:** High
- **Type:** UI / state data
- **Role and actor:** Authorized dashboard viewer with ACD access
- **Preconditions:** Test tenant includes ACD; an approved dashboard contains Agent List; fixture agents are in at least two known states; selected date is the current test day.
- **Setup:** Authenticate, open the dashboard, wait for Agent List to load, and record the fixture agent names and starting states.
- **Cleanup:** Close the widget/dashboard session as required; do not alter agent states unless the state-transition fixture is managed by setup.
- **Traceability:** AL-E-01, AL-E-02

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Open or navigate to the dashboard containing Agent List. | Agent List renders for the authorized tenant and dashboard. |
| 2 | Confirm the selected date is the current test day. | The widget title/date control indicates the test day and no future date is selected. |
| 3 | Inspect the state group headings and agent rows. | Fixture agents are grouped with agents in similar current states. |
| 4 | Inspect an active-session row for a fixture agent. | Current agent state and active-session information are visible for that fixture. |

- **Postconditions:** No dashboard or agent state is changed.
- **Open dependencies:** Exact tenant group labels and locators require MCP observation.

### AL-UI-03: Verify active contact details expand

- **Priority:** High
- **Type:** UI / expansion
- **Role and actor:** Authorized dashboard viewer
- **Preconditions:** Fixture agent has an active contact in a state that allows contact-group expansion.
- **Setup:** Open Agent List and ensure the fixture agent group is visible and collapsed.
- **Cleanup:** Collapse the group after verification.
- **Traceability:** AL-E-04

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Locate the fixture agent contact group. | The fixture agent and collapsed contact group are visible. |
| 2 | Select the group expansion control. | The contact group expands and active-contact details appear. |
| 3 | Inspect the expanded row. | Skill, Channel, Agent Contact State, Agent Contact Time, and Contact Number are visible. |
| 4 | Select the expansion control again. | The contact details collapse. |

- **Postconditions:** Group is restored to its starting collapsed state.
- **Open dependencies:** Exact control role/name and contact fixture require MCP observation.

### AL-REFRESH-01: Verify Agent List state refresh

- **Priority:** High
- **Type:** Refresh / state transition
- **Role and actor:** Authorized dashboard viewer; approved agent-state fixture controller
- **Preconditions:** Agent fixture is controllable; approved refresh tolerance and retry interval exist; starting and destination states are observable.
- **Setup:** Open Agent List and verify the fixture agent is in the starting state. Record the timestamp and widget refresh behavior.
- **Cleanup:** Return the fixture to its original state through the approved safe mechanism.
- **Traceability:** AL-E-10

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Observe and record the fixture agent's starting state. | Agent is shown in the known starting state. |
| 2 | Change the fixture to the approved destination state through the approved mechanism. | Source fixture records the transition without requiring a dashboard reload. |
| 3 | Retry the Agent List assertion using the approved timeout and polling mechanism. | The fixture is shown in the destination state within 7-10 seconds for source data, using the approved tolerance. |
| 4 | Observe widget refresh cadence separately from source-data update. | The widget refresh behavior is consistent with the 7-second widget refresh, with no fixed-sleep assertion. |

- **Postconditions:** Fixture is restored to its original state.
- **Open dependencies:** Fixture control method, precise tolerance, and safe cleanup mechanism require approval.

### AL-UI-02: Verify selected-day state totals

- **Priority:** High
- **Type:** Selected-day summary
- **Role and actor:** Authorized dashboard viewer
- **Preconditions:** At least two controlled agents have known state durations on the selected test day; the day is accessible under the tenant license.
- **Setup:** Open Agent List, select the test date, and record approved expected durations.
- **Cleanup:** Restore the original date selection if the test changes it.
- **Traceability:** AL-E-03

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Open the date control and select the approved test day. | Agent List reloads summary data for the selected test day. |
| 2 | Add or inspect the controlled fixture agents. | The fixture agents appear in their corresponding state groups. |
| 3 | Compare each displayed state duration with the fixture's approved known duration. | Duration and agent/state totals match the controlled fixture without inventing rounding rules. |
| 4 | Verify the group totals. | Total time for the group equals the summed values shown for that state within the approved tolerance. |

- **Postconditions:** Test date remains selected only for the test session or is restored.
- **Open dependencies:** Date control, exact aggregation rounding, and historical range.

### AL-UI-04: Verify Expand All and Collapse All

- **Priority:** High
- **Type:** Group controls
- **Role and actor:** Authorized dashboard viewer
- **Preconditions:** Targeted-state fixtures include at least one agent in an eligible state and one agent outside that state.
- **Setup:** Open Agent List with all groups collapsed.
- **Cleanup:** Collapse all groups.
- **Traceability:** AL-E-05

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Select Expand All. | Eligible targeted-state groups open; ineligible or empty groups do not open. |
| 2 | Inspect an eligible targeted-state group. | Its agent/contact details are visible. |
| 3 | Select Collapse All. | Every Agent List group closes. |
| 4 | Inspect the group headings. | No group remains expanded. |

- **Postconditions:** All groups remain collapsed.
- **Open dependencies:** Exact targeted-state examples available in the live tenant.

### AL-UI-05: Verify individual group expansion

- **Priority:** Medium
- **Type:** Group controls
- **Role and actor:** Authorized dashboard viewer
- **Preconditions:** Multiple state groups are visible and Collapse All leaves them closed.
- **Setup:** Use Collapse All or open the page with all groups closed.
- **Cleanup:** Restore groups to their starting expanded/collapsed state.
- **Traceability:** AL-E-05

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Expand one visible state group. | Only the selected group opens. |
| 2 | Expand a second visible state group. | The second opens while the first remains in its selected state. |
| 3 | Collapse the first group. | Only the first group closes; the second stays open. |

- **Postconditions:** Groups are restored to the starting state.
- **Open dependencies:** Observed expansion controls.

### AL-UI-06: Verify sorting and state grouping

- **Priority:** High
- **Type:** Sorting and filtering
- **Role and actor:** Authorized dashboard viewer
- **Preconditions:** Known agents in at least two states are visible.
- **Setup:** Open Agent List in default state-grouped view and remove existing personal sorting if permitted.
- **Cleanup:** Restore the initial sort/filter view.
- **Traceability:** AL-E-06

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Apply the state filter to include one known state. | Only matching agent rows are shown or the UI clearly indicates the filter result. |
| 2 | Apply a sort to an allowed column. | Rows order according to the selected column without an invented sort order. |
| 3 | Remove column sorting. | State grouping is retained. |
| 4 | Clear the state filter. | Known agents in the prior in-scope states become visible again. |

- **Postconditions:** Original filter and sort settings are restored.
- **Open dependencies:** Filter values, sorting controls, and result count.

### AL-UI-07: Verify Agent List display modes

- **Priority:** Medium
- **Type:** Display mode
- **Role and actor:** Authorized dashboard viewer
- **Preconditions:** Agent List has fixture data and the current tenant exposes Widget Display.
- **Setup:** Open Agent List and record the starting display mode.
- **Cleanup:** Restore the starting display mode.
- **Traceability:** AL-E-07

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Select Table display. | Agent state data renders in table form. |
| 2 | Select Chart display. | The same in-scope fixture data is represented in chart form. |
| 3 | Select Table and Chart display. | Table and chart both render without removing the fixture data context. |

- **Postconditions:** Starting display mode is restored.
- **Open dependencies:** Display control locators and chart semantics.

### AL-UI-08: Verify personal display settings

- **Priority:** Medium
- **Type:** Personal settings / ownership
- **Role and actor:** Viewer account and dashboard-owner account
- **Preconditions:** Separate approved viewer and owner accounts share access to the test dashboard; starting display mode is recorded.
- **Setup:** Sign in as the viewer and open the test dashboard.
- **Cleanup:** Restore both accounts' settings to starting values through approved UI actions.
- **Traceability:** AL-E-08

| Step | Action | Expected behavior |
|---|---|---|
| 1 | As viewer, change the Agent List display setting. | The viewer's personal setting is applied. |
| 2 | Leave and reopen the dashboard as the same viewer. | The viewer's personal setting persists. |
| 3 | As owner, change the shared dashboard/widget setting. | The owner change is saved. |
| 4 | Reopen the dashboard as the viewer. | The later owner change overrides the viewer personal setting, as documented. |

- **Postconditions:** Original owner/dashboard and viewer settings are restored.
- **Open dependencies:** Available settings, account isolation, and save confirmation.

### AL-UI-09: Verify agent options

- **Priority:** Medium
- **Type:** Options / permission
- **Role and actor:** Authorized viewer for the fixture agent
- **Preconditions:** Tenant permission allows viewing agent options; options menu is visible on the fixture agent.
- **Setup:** Open Agent List and locate the fixture agent.
- **Cleanup:** Close the menu without selecting a state-changing action.
- **Traceability:** AL-E-09

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Open the options menu beside the fixture agent. | The menu opens. |
| 2 | Inspect the menu entries. | Agent State Details and Give Reward are available only if permitted. |
| 3 | Select Agent State Details. | The documented agent-state detail view opens; no reward/state change occurs. |
| 4 | Close the detail view. | The Agent List remains in the same state. |

- **Postconditions:** No reward or agent state is changed.
- **Open dependencies:** Permission behavior and exact detail view.

### AL-NEG-01: Verify empty filter result

- **Priority:** Medium
- **Type:** Negative / empty state
- **Role and actor:** Authorized dashboard viewer
- **Preconditions:** A filter criterion is known to have no matching fixture data; exact tenant empty-state copy is not assumed.
- **Setup:** Open Agent List and record the unfiltered result.
- **Cleanup:** Clear the filter and verify the prior view returns.
- **Traceability:** AL-E-01, AL-E-06

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Apply the approved no-match filter. | The widget updates or clearly indicates no matching agents. |
| 2 | Inspect the table/chart area. | No fixture agent is shown as matching; stale in-scope data is not presented. |
| 3 | Clear the filter. | The known fixture agents and prior data scope return. |

- **Postconditions:** Filter is cleared.
- **Open dependencies:** Empty-state UI and filter locator.

### AL-PERM-01: Verify restricted agent options

- **Priority:** High
- **Type:** Permission
- **Role and actor:** Restricted viewer and authorized viewer
- **Preconditions:** Separate approved accounts differ only in the permission under test; fixture agent is visible to both.
- **Setup:** Open Agent List as the restricted account.
- **Cleanup:** Close menus/details and end test sessions.
- **Traceability:** AL-E-09

| Step | Action | Expected behavior |
|---|---|---|
| 1 | Open Agent List as the restricted account. | The fixture agent is visible according to that account's data permissions. |
| 2 | Inspect the agent options menu. | Restricted Agent State Details or Give Reward actions are not exposed or are unusable; no change occurs. |
| 3 | Open Agent List as the authorized account. | The fixture agent remains visible under that account's permissions. |
| 4 | Inspect the options menu. | Permitted actions are available according to the tenant role. |

- **Postconditions:** No state or reward action is executed.
- **Open dependencies:** Exact RBAC behavior and whether restricted actions are hidden or disabled.

## Risks and Open Questions

- Current official documentation must be rechecked before automation.
- Agent states and channels vary by tenant; fixtures must be approved and controlled.
- Personal settings require separate viewer and dashboard-owner accounts.
- Give Reward and Agent State Details availability may depend on permissions.
- Chart, table, and empty-state locators/selectors are not known until MCP reconnaissance.
- Refresh assertions need a product-approved timing tolerance and an event/polling mechanism.
- Tenant license and ACD availability must be confirmed.

## Playwright Generation Gate

Do not write final executable Playwright Test code until:

1. An authorized, non-production tenant is available.
2. Target Agent List test data and role accounts are approved.
3. The target UI is interactively observed with Playwright MCP.
4. Stable accessible-role/name or test-ID locators are recorded.
5. The refresh assertion mechanism and timing tolerance are approved.

The next safe step is MCP reconnaissance, starting read-only on Agent List and stopping before state-changing dashboard actions unless explicitly approved.
