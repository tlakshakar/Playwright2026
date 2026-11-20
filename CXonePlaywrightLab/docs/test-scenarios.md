# Agent Contact View Test Scenarios

## Filter Coverage Matrix

| Filter Control/Option | Positive Match | Non-Match/No-Result | Clear/Reset | Scenario(s) |
|---|---|---|---|---|
| Agent Name | Select an approved in-scope fixture | Tenant-observed non-matching or no-access fixture | Clear and restore baseline | TC-002 |
| Contact No | Enter/select matching active contact | No matching contact | Clear and restore baseline | TC-100 |
| Skill | Select authorized Skill fixture | Authorized no-match or unavailable out-of-view Skill | Clear and restore baseline | TC-101 |
| Channel | Select first known Channel; repeat for second | No-result Channel fixture | Clear and restore baseline | TC-102 |
| Agent Contact State | Select one state; repeat for another | No-result state fixture | Clear and restore baseline | TC-103 |
| Agent Contact State Time | Apply matching range | Range with no matching fixture | Clear and restore baseline | TC-400 |
| Multiple filters | Fixture matching all active criteria | Fixture matching only one criterion | Remove one then reset all | TC-105, TC-106 |
| Filter inventory | Map all observed controls/options | Mark unsupported/unobserved options unresolved | Record no state change | TC-501 |

The matrix is evidence-backed only after authorized tenant reconnaissance. Official documentation confirms these available columns; it does not enumerate tenant-specific filter values or prove that every column is exposed as a Settings filter.

### TC-001: Agent Contact View Opens With Near-Real-Time Data
**Category**: Happy Path
**Priority**: P0
**Preconditions**:
- The approved non-production tenant includes ACD and the Agent Contact View widget.
- The authorized account can open a dashboard and has known in-scope agent/contact fixtures.
- The documented widget refresh is 7 seconds and source data refresh is 7-10 seconds.
**Steps**:
1. Open an approved test dashboard containing Agent Contact View.
2. Wait for the widget to reach an observable ready state using retrying assertions.
3. Inspect the mandatory Agent Name and Agent Contact State columns.
4. Observe a known in-scope agent's contact state and state time.
**Expected Results**:
- The widget renders without an application error.
- Agent Name and Agent Contact State remain visible; both are mandatory in the official documentation.
- A known fixture's current state and state time agree with the approved source data within the retry window.
- Only agents and contacts authorized through the user's Global View are displayed.
**Business Rule**: Agent Contact View is near-real-time and must not exceed the user's data scope.
**Suggested Layer**: E2E

### TC-002: Filter by Agent Name
**Category**: Happy Path
**Priority**: P0
**Preconditions**:
- The authorized tenant confirms Agent Name is available as a filter control.
- Two approved synthetic or known agent fixtures are in the current user's scope.
**Steps**:
1. Open the Agent Contact View filter options.
2. Select the first approved Agent Name fixture.
3. Wait for the widget result set to settle.
4. Clear or reset the Agent Name filter.
**Expected Results**:
- Only rows for the selected Agent Name are displayed.
- State and contact details match the selected agent.
- Clearing the filter restores the authorized baseline result set.
- RBAC/Global View restrictions are not widened.
**Business Rule**: Agent Name filtering narrows data only within the user's assigned teams and/or skills.
**Suggested Layer**: E2E

### TC-100: Filter by Contact Number
**Category**: Business Rule
**Priority**: P1
**Preconditions**:
- The authorized tenant confirms Contact No is available as a filter control.
- Known active-contact fixtures include one matching and one non-matching contact number.
**Steps**:
1. Open the Agent Contact View filter options.
2. Enter or select the matching Contact No fixture.
3. Wait for the result set to update.
4. Clear the Contact No filter.
**Expected Results**:
- The matching active contact and authorized agent details are displayed.
- The non-matching contact is absent.
- Clearing the filter restores the baseline active-contact set.
**Business Rule**: Contact No filtering narrows active-contact rows while preserving data-access restrictions.
**Suggested Layer**: E2E

### TC-101: Filter by Skill
**Category**: Business Rule
**Priority**: P0
**Preconditions**:
- The authorized tenant confirms Skill is available as a filter control.
- Known authorized skills have distinct active-agent/contact fixtures.
**Steps**:
1. Open the Agent Contact View filter options.
2. Select one approved Skill fixture.
3. Wait for the widget to refresh.
4. Clear the Skill filter.
**Expected Results**:
- Returned rows belong to the selected Skill and remain within the user's RBAC/Global View.
- Clearing the filter restores the authorized baseline.
- A Skill outside the user's View is not revealed or made selectable as authorized data.
**Business Rule**: Skills are a data-access boundary and a supported widget filter only when exposed by the tenant.
**Suggested Layer**: E2E

### TC-102: Filter by Channel
**Category**: Business Rule
**Priority**: P1
**Preconditions**:
- The authorized tenant confirms Channel is available as a filter control.
- Known fixtures exist for at least two approved channels.
**Steps**:
1. Open the Agent Contact View filter options.
2. Select the first approved Channel fixture.
3. Wait for rows to update.
4. Repeat with the second approved Channel fixture.
5. Clear the Channel filter.
**Expected Results**:
- Rows change according to the selected channel.
- Rows for unselected channels are absent while the filter is active.
- Clearing the filter restores the authorized baseline.
**Business Rule**: Channel filtering narrows the active-contact view without changing RBAC/Global View scope.
**Suggested Layer**: E2E

### TC-103: Filter by Agent Contact State
**Category**: Business Rule
**Priority**: P0
**Preconditions**:
- The authorized tenant confirms Agent Contact State is available as a filter control.
- Controlled fixtures exist for at least two approved contact states, including ACW or Unavailable where available.
**Steps**:
1. Open the Agent Contact View filter options.
2. Select one approved Agent Contact State.
3. Wait for the widget to refresh.
4. Repeat with a second approved state.
5. Clear the state filter.
**Expected Results**:
- Every returned row matches the selected contact state.
- Selected-state duration agrees with near-real-time source data.
- Clearing the filter restores the authorized baseline.
- Agent Name and Agent Contact State remain visible.
**Business Rule**: State filtering reflects the documented current agent/contact state and near-real-time state duration.
**Suggested Layer**: E2E

### TC-400: Filter by Agent Contact State Time
**Category**: Edge Case
**Priority**: P2
**Preconditions**:
- The authorized tenant confirms Agent Contact State Time is a supported filter or range control.
- Approved fixtures have distinguishable state durations.
- Exact range semantics and units are documented or tenant-observed.
**Steps**:
1. Open the Agent Contact View filter options.
2. Apply the approved state-time filter/range to a known fixture.
3. Wait for the result set to update.
4. Apply a range with no matching fixture.
5. Clear the state-time filter.
**Expected Results**:
- Only rows satisfying the observed state-time criterion are displayed.
- No-result behavior is clear and no stale rows remain.
- Units and boundary behavior match the observed UI contract.
- Clearing the filter restores the authorized baseline.
**Business Rule**: State-time filtering is based on current state duration and must not expose unauthorized data.
**Suggested Layer**: E2E

### TC-105: Combine Multiple Agent Contact View Filters
**Category**: Business Rule
**Priority**: P1
**Preconditions**:
- The tenant confirms at least two supported filter controls.
- Known fixtures create one matching combined result and one row matching only an individual criterion.
**Steps**:
1. Apply an approved first filter.
2. Apply an approved second filter.
3. Wait for the widget to update.
4. Remove the second filter and observe the result set.
5. Remove or reset all filters.
**Expected Results**:
- The combined result satisfies every active tenant-observed criterion.
- Removing one criterion expands only to rows satisfying the remaining criterion.
- Reset restores the authorized baseline.
- No result outside RBAC/Global View is displayed.
**Business Rule**: Multiple filters narrow the authorized dataset according to tenant-observed combination semantics.
**Suggested Layer**: E2E

### TC-106: Clear and Reset Agent Contact View Filters
**Category**: Business Rule
**Priority**: P1
**Preconditions**:
- The tenant exposes at least one filter and clear/reset control.
- An active filter produces a subset of the authorized baseline.
**Steps**:
1. Apply an approved filter.
2. Confirm that the filtered subset is displayed.
3. Select the widget's clear or reset control.
4. Wait for the widget to restore baseline data.
**Expected Results**:
- Clear/reset removes all active filter selections.
- No stale subset remains displayed.
- The authorized baseline result set returns.
- Documented personal widget settings change only according to tenant behavior.
**Business Rule**: Resetting filters removes filter selections and preserves authorized dashboard data scope.
**Suggested Layer**: E2E

### TC-200: Filtered Agent Contact View Respects RBAC and Global View
**Category**: Security
**Priority**: P0
**Preconditions**:
- Separate authorized accounts with distinct Teams or Skills scopes are available.
- Both accounts can open the same approved dashboard layout.
- The widget exposes at least one tenant-observed filter.
**Steps**:
1. Sign in with the restricted account and open the dashboard.
2. Record the widget rows before and after applying an approved filter.
3. Sign in with the second account and repeat using the same dashboard and filter.
**Expected Results**:
- Applying a filter never expands access beyond each account's RBAC/Global View.
- Restricted agents or contacts are absent from each account's allowed view.
- Sharing the dashboard layout does not grant data access to the recipient.
**Business Rule**: Dashboard sharing does not grant data access beyond recipient RBAC/Global View.
**Suggested Layer**: E2E

### TC-500: Mandatory Agent Contact View Columns and Optional Columns
**Category**: UI State
**Priority**: P1
**Preconditions**:
- The authorized tenant exposes Agent Contact View column settings.
- Prior personal column settings are known and can be restored after testing.
**Steps**:
1. Open Agent Contact View Columns settings.
2. Attempt to deselect Agent Name.
3. Attempt to deselect Agent Contact State.
4. Verify optional columns remain configurable as supported.
**Expected Results**:
- Agent Name remains visible or the UI prevents deselection.
- Agent Contact State remains visible or the UI prevents deselection.
- Optional columns, such as Contact No, Skill, Channel, and Agent Contact State Time, remain configurable where supported.
- Personalization is restored after the test where required.
**Business Rule**: Agent Name and Agent Contact State are mandatory columns in Agent Contact View.
**Suggested Layer**: E2E

### TC-501: Agent Contact View Filter Inventory and Evidence Gap
**Category**: UI State
**Priority**: P0
**Preconditions**:
- An authorized non-production tenant is available.
- The user has approved read-only or state-changing access to Agent Contact View.
- Approved fixture values are available without exposing sensitive data.
**Steps**:
1. Open Agent Contact View in the authorized tenant.
2. Record every visible Settings filter control and every exposed option value.
3. Confirm whether available columns are only column filters or also supported Settings options.
4. Map every observed filter control and option to TC-002 through TC-106.
5. Record missing, unconfirmed, or unsupported options without changing fixture data.
**Expected Results**:
- Every tenant-exposed filter control and option is identified.
- The inventory does not assume unsupported options or exact text.
- Unsupported or unavailable options are marked unresolved.
- Concrete values are stored as approved fixture identifiers, not credentials or personal data.
**Business Rule**: Tests may assert only documented requirements or authorized tenant observations.
**Suggested Layer**: E2E
