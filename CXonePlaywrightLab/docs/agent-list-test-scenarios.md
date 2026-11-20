### AgentList Widget Tests

```markdown
# Agent List Widget Test Scenarios

### TC-001: Open Agent List Widget With Available Data
**Category**: Happy Path
**Priority**: P0
**Preconditions**:
- An authorized non-production tenant is available.
- The user has dashboard and Agent List Widget access.
- At least one active agent is included in the user's RBAC/Global View.
**Steps**:
1. Sign in with an authorized agent supervisor account.
2. Open a dashboard containing an Agent List Widget.
3. Wait for the widget to finish loading.
4. Observe the agent rows and visible agent details.
**Expected Results**:
- The widget loads without an application error.
- Only agents within the user's assigned access scope are displayed.
- Each displayed row contains the observed agent information and a consistent status.
- Loading, empty, and error states do not overlap the returned data.
**Business Rule**: Agent List Widget data must be constrained by the user's RBAC and Global View.
**Suggested Layer**: E2E

### TC-002: Filter Agents by Status
**Category**: Happy Path
**Priority**: P0
**Preconditions**:
- The tenant fixture has agents in at least two distinguishable statuses.
- The Agent List Widget exposes status filtering.
**Steps**:
1. Open the Agent List Widget.
2. Select a status from the available status filter.
3. Wait for the displayed rows to update.
4. Clear or reset the status filter.
**Expected Results**:
- The widget applies the selected status without reloading the entire page.
- All returned rows match the selected status.
- Clearing the filter restores the widget's allowed baseline results.
- The filter remains within the user's RBAC/Global View scope.
**Business Rule**: Widget filters reduce the visible authorized dataset and must not expand data access.
**Suggested Layer**: E2E

### TC-003: Combine Multiple Available Filters
**Category**: Business Rule
**Priority**: P1
**Preconditions**:
- The tenant fixture has agents across multiple teams or configured groups.
- The widget exposes at least two usable filters.
**Steps**:
1. Open the Agent List Widget.
2. Select values for two available filters.
3. Wait for the widget to update.
4. Remove one filter and observe the results.
**Expected Results**:
- The widget applies filters using AND semantics unless the observed UI documents otherwise.
- Removing a filter does not retain the results of the removed criterion unexpectedly.
- Every result satisfies the currently active filters.
- Resetting filters restores the authorized baseline data.
**Business Rule**: Combined filters must operate consistently and remain data-access constrained.
**Suggested Layer**: E2E

### TC-004: Sort Agent Results
**Category**: Happy Path
**Priority**: P1
**Preconditions**:
- The widget exposes sortable columns.
- The fixture includes varied values for the selected sortable column.
**Steps**:
1. Open the widget.
2. Select an observed sortable column.
3. Sort ascending.
4. Sort descending.
**Expected Results**:
- The column header indicates the active sort direction.
- Data is ordered consistently according to the selected column.
- Sorting does not change the set of agents authorized for the user.
- The widget remains usable after repeated sort changes.
**Business Rule**: Sorting changes presentation only and must not alter filtering or RBAC restrictions.
**Suggested Layer**: E2E

### TC-005: Refresh Agent Status Data
**Category**: Happy Path
**Priority**: P0
**Preconditions**:
- A controlled agent fixture is available.
- The widget has an observable refresh control or automatic refresh behavior.
- Data refresh timing is approved by the Product Owner.
**Steps**:
1. Record the initial status or duration for a controlled agent.
2. Change the agent's status from the approved test application.
3. Wait for the widget to refresh within the approved tolerance.
4. Reopen or navigate away and return to the dashboard.
**Expected Results**:
- The new status appears within the approved refresh tolerance.
- The widget does not display stale status indefinitely.
- The refresh action does not reset unrelated filters or sorting unexpectedly.
- Returning to the dashboard preserves or applies the documented layout state.
**Business Rule**: Widget data refresh is separate from layout or dashboard refresh and must reflect source data within approved guarantees.
**Suggested Layer**: E2E

### TC-006: Agent Status Transition
**Category**: Business Rule
**Priority**: P0
**Preconditions**:
- A controlled agent fixture can transition through approved statuses.
- The tenant records agent status changes during the test window.
**Steps**:
1. Observe the agent in its initial approved status.
2. Trigger a valid status transition.
3. Wait for the Agent List Widget to update.
4. Repeat for one additional approved transition.
**Expected Results**:
- Each valid status transition is represented by the widget within the approved tolerance.
- The row remains associated with the same authorized agent.
- Status duration updates according to observed tenant behavior.
- Invalid or unsupported status transitions are not fabricated in the widget.
**Business Rule**: Displayed status and status duration must correspond to source-system data, not application guesses.
**Suggested Layer**: E2E

### TC-007: Unauthorized Agent or Dashboard Scope
**Category**: Security
**Priority**: P0
**Preconditions**:
- Two test accounts with different teams or RBAC scopes are available.
- Each account has authorized access to the same dashboard.
**Steps**:
1. Sign in with the restricted account.
2. Open the shared dashboard containing the Agent List Widget.
3. Record visible agents.
4. Repeat using the broader authorized account.
**Expected Results**:
- Each account sees only agents included in its own RBAC/Global View.
- Sharing the dashboard does not grant access to agents outside the recipient's scope.
- No unauthorized agent name or identifier is exposed in the widget or accessible data.
**Business Rule**: Dashboard sharing does not grant data access beyond recipient RBAC/Global View.
**Suggested Layer**: E2E

### TC-008: Direct Navigation to Restricted Dashboard
**Category**: Security
**Priority**: P0
**Preconditions**:
- A dashboard fixture is visible only to an authorized owner.
- A separate unauthorized test account is available.
**Steps**:
1. Copy or capture the dashboard URL.
2. Sign out.
3. Sign in with the unauthorized account.
4. Open the restricted dashboard URL.
**Expected Results**:
- The dashboard or widget is denied with an approved authorization state.
- No restricted agent rows are displayed.
- No restricted layout or customer data is exposed through the UI.
**Business Rule**: Tenant, dashboard, and widget access must be enforced independently by authorization rules.
**Suggested Layer**: E2E

### TC-009: Malicious Search or Filter Input
**Category**: Security
**Priority**: P1
**Preconditions**:
- The widget exposes a search or text-filter field.
- A safe test payload is approved for this tenant.
**Steps**:
1. Open the widget.
2. Enter a harmless HTML or script-looking search payload.
3. Submit or apply the filter.
4. Clear the filter.
**Expected Results**:
- The payload is treated as user input, not executable markup or script.
- The widget displays no unexpected alert, execution, or navigation.
- The filter result is consistently empty or safely matched.
- Clearing the filter restores normal results.
**Business Rule**: Tenant-supplied values and user-entered values must be safely rendered and never execute as application code.
**Suggested Layer**: E2E

### TC-010: Search for Special Characters
**Category**: Negative
**Priority**: P2
**Preconditions**:
- The widget exposes search or text filtering.
- The fixture may include approved names containing spaces or punctuation.
**Steps**:
1. Enter a special character into the search field.
2. Apply the filter.
3. Replace it with a known agent name containing punctuation.
4. Clear the filter.
**Expected Results**:
- Special characters do not cause application exceptions or malformed requests.
- Known matching names are found according to the observed search behavior.
- Partial or exact-match behavior remains consistent with tenant implementation.
- Empty or invalid searches display the documented no-results state.
**Business Rule**: Search handling must support the tenant's documented matching behavior without exposing data outside scope.
**Suggested Layer**: E2E

### TC-011: Empty Agent Result Set
**Category**: Edge Case
**Priority**: P1
**Preconditions**:
- A valid account can access the dashboard.
- A filter value is known to return no authorized agents.
**Steps**:
1. Apply the no-result filter.
2. Wait for the widget to finish loading.
3. Remove the filter.
**Expected Results**:
- The widget displays an intentional empty or no-results state.
- No stale agents from the previous filter remain visible.
- The filter can be cleared without an application error.
- The widget returns to the authorized baseline after clearing the filter.
**Business Rule**: An empty authorized dataset must not be represented as a loading or application error state.
**Suggested Layer**: E2E

### TC-012: Widget Loading and Refresh Failure
**Category**: Negative
**Priority**: P1
**Preconditions**:
- The authorized environment is available.
- A safe, approved interruption can be applied to widget data loading.
**Steps**:
1. Open or refresh the dashboard.
2. Interrupt the widget data request using an approved test method.
3. Observe the loading and error states.
4. Restore the approved data source.
**Expected Results**:
- The widget displays a clear loading or retry state when applicable.
- No partial or unauthorized data is displayed.
- Previously shown data is handled consistently with the documented widget behavior.
- Restoring data allows the widget to recover without duplicate rows.
**Business Rule**: Failures must not create false success, duplicate records, or unauthorized data exposure.
**Suggested Layer**: E2E

### TC-013: Concurrent Filter and Refresh Updates
**Category**: Edge Case
**Priority**: P2
**Preconditions**:
- The widget supports filters and automatic or manual refresh.
- A changing agent fixture is available.
**Steps**:
1. Apply an active status filter.
2. Trigger a status change for a matching agent.
3. Trigger a widget refresh.
4. Repeat the refresh after another status transition.
**Expected Results**:
- A row that no longer matches the active filter is removed after refresh.
- A row that now matches is added when it is authorized and within scope.
- The active filter remains selected.
- Refresh does not create duplicate or stale rows.
**Business Rule**: Filter evaluation must be reapplied to the latest authorized dataset after refresh.
**Suggested Layer**: E2E

### TC-014: Widget Remains Usable at Narrow Viewport
**Category**: UI State
**Priority**: P2
**Preconditions**:
- The dashboard is available on a supported responsive viewport.
- The widget contains enough columns or rows to require overflow or responsive behavior.
**Steps**:
1. Open the dashboard at its standard desktop viewport.
2. Resize to an approved narrow viewport.
3. Inspect the widget header, filters, columns, and rows.
4. Restore the standard viewport.
**Expected Results**:
- Controls remain visible or are exposed through an observed, usable responsive pattern.
- Agent information remains readable and is not permanently clipped.
- Rows do not overlap other dashboard widgets.
- Sorting and filtering remain usable after the viewport change.
**Business Rule**: Widget responsiveness must preserve agent data and supported interactions within the tenant UI.
**Suggested Layer**: E2E

### TC-015: Session Expiry During Widget Use
**Category**: Negative
**Priority**: P1
**Preconditions**:
- An authorized test session can be safely expired.
- The dashboard remains open.
**Steps**:
1. Open the Agent List Widget.
2. Expire or invalidate the authenticated session through an approved test method.
3. Attempt to refresh or change a filter.
**Expected Results**:
- The application redirects or displays the documented authenticated-session state.
- No new unauthorized agent data is displayed.
- Resuming authentication returns to a safe, documented state.
**Business Rule**: Widget data access must terminate with the authenticated session.
**Suggested Layer**: E2E
```