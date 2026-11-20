# Agent Contact View Test Strategy

## 1. Strategy Summary

| Layer | Scenario Count | Core Focus | Target Execution Time |
|---|---:|---|---|
| Unit | 1 | State-time range/predicate logic, only if an isolated implementation exists | Very fast |
| API | 3 | Server-side filtering, combined filters, and RBAC/Global View authorization | Fast |
| Component | 7 | Widget controls, row rendering, reset, columns, and sorting | Medium |
| E2E | 1 | One real-tenant widget opening/smoke journey | Slow |
| Reconnaissance | 1 | Tenant filter inventory and evidence collection; not an automated regression test | Manual |

The 12 executable or actionable scenarios map as 1 Unit, 3 API, 7 Component, and 1 E2E. TC-501 is excluded from the automated pyramid count.

## 2. Detailed Scenario Breakdown

### TC-001: Agent Contact View Opens With Near-Real-Time Data

| Field | Details |
|---|---|
| **Suggested Layer** | E2E |
| **Rationale** | This is the only scenario that needs dashboard navigation, tenant authentication, widget loading, real source data, and browser rendering together. |
| **Primary Assertions** | Agent Name and Agent Contact State remain visible; the six documented columns render as available; active rows load in an approved final state; out-of-scope rows are absent. |
| **Avoid/Do Not Duplicate** | Component tests own isolated rendering states. API tests own authorized data and filtering contracts. |

### TC-002: Filter by Agent Name

| Field | Details |
|---|---|
| **Suggested Layer** | Component |
| **Rationale** | Selecting an Agent Name and rendering the visible subset is widget-local with controlled fixtures. |
| **Primary Assertions** | The matching agent remains visible, nonmatching rows disappear, clearing restores baseline rows, and stale rows are removed. |
| **Avoid/Do Not Duplicate** | Do not repeat every agent in browser tests. Add API coverage if server-side Agent Name filtering is exposed. |

### TC-100: Filter by Contact Number

| Field | Details |
|---|---|
| **Suggested Layer** | Component |
| **Rationale** | The primary defect source is control interaction and visible result behavior. |
| **Primary Assertions** | Matching contacts remain, nonmatches are excluded, no stale rows remain, and clear/reset restores baseline. |
| **Avoid/Do Not Duplicate** | Do not use E2E for every contact number unless server query behavior or real tenant integration is in scope. |

### TC-101: Filter by Skill

| Field | Details |
|---|---|
| **Suggested Layer** | API |
| **Rationale** | Skill data intersects with Global View and is a server authorization boundary. |
| **Primary Assertions** | Authorized Skill fixtures are returned; unauthorized/out-of-view Skill records are absent before and after filtering. |
| **Avoid/Do Not Duplicate** | One Component test verifies the control; browser tests should not enumerate every Skill. |

### TC-102: Filter by Channel

| Field | Details |
|---|---|
| **Suggested Layer** | Component |
| **Rationale** | Channel selection and visible row rendering can be tested with controlled widget fixtures. |
| **Primary Assertions** | Selected channel rows remain, unselected channel rows disappear, and clear/reset restores baseline. |
| **Avoid/Do Not Duplicate** | Add API coverage only if Channel is a server-enforced filter contract. |

### TC-103: Filter by Agent Contact State

| Field | Details |
|---|---|
| **Suggested Layer** | Component |
| **Rationale** | The widget filter control and row presentation are the immediate defect source. |
| **Primary Assertions** | Rows match the selected state, state duration is rendered, mandatory columns remain visible, and reset restores baseline. |
| **Avoid/Do Not Duplicate** | API or integration tests should verify source-state transitions and refresh; do not enumerate every state in E2E. |

### TC-400: Filter by Agent Contact State Time

| Field | Details |
|---|---|
| **Suggested Layer** | Unit |
| **Rationale** | Range boundaries and predicate logic are pure/deterministic if the implementation exposes a shared function or class. |
| **Primary Assertions** | Matching range, no-match range, boundary behavior, units, and clear/reset semantics follow the approved contract. |
| **Avoid/Do Not Duplicate** | Reassign to API if filtering is opaque server behavior. Reassign to Component if only UI state is being changed. Do not invent units or boundaries. |

### TC-105: Combine Multiple Agent Contact View Filters

| Field | Details |
|---|---|
| **Suggested Layer** | API |
| **Rationale** | Combined server filtering and authorized result-set semantics determine the true behavior. |
| **Primary Assertions** | Filter combination follows documented/tenant-observed semantics, removing a filter recalculates results, reset restores baseline, and no unauthorized row is returned. |
| **Avoid/Do Not Duplicate** | Component can verify active control state, but browser tests should not cover the full filter Cartesian product. |

### TC-106: Clear and Reset Agent Contact View Filters

| Field | Details |
|---|---|
| **Suggested Layer** | Component |
| **Rationale** | Resetting local filter state and stale rows is widget behavior. |
| **Primary Assertions** | Active filters clear, stale subset rows disappear, and authorized baseline rows return. |
| **Avoid/Do Not Duplicate** | Cover reset once rather than repeating it in every filter scenario. |

### TC-200: Filtered Agent Contact View Respects RBAC and Global View

| Field | Details |
|---|---|
| **Suggested Layer** | API |
| **Rationale** | Authorization must be enforced before data reaches the widget. |
| **Primary Assertions** | Each account receives only authorized Team/Skill/Agent data; filters do not expand scope; shared layouts do not widen data access. |
| **Avoid/Do Not Duplicate** | Use one limited browser check for safe visible presentation and avoid repeated account/dataset combinations in E2E. |

### TC-500: Mandatory Agent Contact View Columns and Optional Columns

| Field | Details |
|---|---|
| **Suggested Layer** | Component |
| **Rationale** | Mandatory-column, optional-column, and layout behavior are widget-local UI concerns. |
| **Primary Assertions** | Agent Name and Agent Contact State remain visible; optional columns follow the approved tenant settings; layout remains usable. |
| **Avoid/Do Not Duplicate** | Do not run login/dashboard setup for every column permutation. |

### TC-501: Agent Contact View Filter Inventory and Evidence Gap

| Field | Details |
|---|---|
| **Suggested Layer** | Reconnaissance |
| **Rationale** | This records tenant-exposed controls, option values, locators, and evidence gaps before automated regression tests are written. |
| **Primary Assertions** | Filter controls and options are inventoried; unsupported/unobserved values remain unresolved. |
| **Avoid/Do Not Duplicate** | Exclude this activity from the automated test pyramid and do not invent locators or option values. |

## 3. Anti-Pattern Audit

- **E2E overuse:** Move Agent Name, Contact Number, Channel, contact state, reset, and column checks out of full dashboard journeys.
- **Security false-positive:** Do not treat hidden widget rows as proof of RBAC. Authorization belongs in API/integration coverage.
- **Undocumented predicate:** Do not assign TC-400 to Unit until state-time units, boundaries, and implementation ownership are confirmed.
- **Fixed refresh waits:** Use retrying assertions and an approved tolerance rather than `waitForTimeout`.
- **Invented filter assumptions:** Team, Agent, ACW, Skill, and Channel options must come from approved tenant evidence.
- **Execution claims:** No Agent Contact View browser test pass has been executed, so no pass status should be reported.

## 4. Coverage Gaps

- No approved API contract for filters or RBAC responses.
- No controlled Component/Unit harness is identified.
- No exact tenant fixture values or filter combination semantics are approved.
- Refresh tolerance and source-state transition timing remain unapproved.
- The selector inventory remains empty until actual tenant locators are recorded.
