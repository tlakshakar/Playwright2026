---
name: test-strategy
description: Analyze test scenarios and assign the optimal Unit, API, Component, or E2E test-pyramid layer.
disable-model-invocation: true
argument-hint: feature-name or blank for full analysis
---

# Test Scenario Layer Analysis

Act as a Test Strategist to evaluate test scenarios and assign each to its optimal layer in the Test Pyramid.

## Objective

Assign each scenario to the **lowest practical layer** that:
- Detects defects closest to their source.
- Uses the smallest necessary environment and fixture scope.
- Provides reliable coverage without redundant browser or integration overhead.

> **Golden Rule**: Do not assign to E2E merely because a scenario mentions UI elements or user actions. Always push tests DOWN the pyramid whenever feasible.

---

## Knowledge Sources

Read these BEFORE making decisions:
1. `docs/test-scenarios.md` — Test Scenarios
2. `playwright-best-practices` skill — E2E Standards
3. `tests/*.spec.js` (if existing) — Current Automation Suite
4. Output from `create-scenarios` skill — Generated Test Cases

---

## Task & Scope

Analyze and assign test layers for: `$ARGUMENTS` *(If blank, analyze all application scenarios)*.

---

## Quick-Decision Rules

1. **Pure function / No I/O** $\rightarrow$ **Unit**
2. **Backend rule / API contract / Server validation** $\rightarrow$ **API**
3. **Single component rendering / UI local state** $\rightarrow$ **Component**
4. **Multi-page workflow / Full-stack journey** $\rightarrow$ **E2E**
5. **Could work at a lower layer?** $\rightarrow$ **Push it DOWN**
6. **In doubt?** $\rightarrow$ Select the lowest adequate layer

---

## Test Layer Assignment Matrix

| Layer | Primary Scope | Typical Use Cases | Exclusions / When NOT to Use |
| :--- | :--- | :--- | :--- |
| **Unit** | Isolated logic & pure data transformations | • Math, calculations & derived values<br>• Parsing, formatting & string manipulation<br>• Validation logic & pure functions<br>• Model state transitions & comparator rules | • Any real application UI<br>• Network or external dependencies |
| **API** | Data contracts & server-enforced behavior | • HTTP request/response contracts<br>• Auth, RBAC & tenant isolation<br>• Server-side filtering, sorting & pagination<br>• Database persistence & HTTP error codes | • Visual rendering behavior<br>• Missing/unapproved API contracts |
| **Component** | Isolated UI rendering & local state | • Controlled widget rendering & props<br>• Form visual validation & UI state (loading/empty/error)<br>• Accessibility labels & keyboard focus<br>• Component-level interactions (dialogs, dropdowns) | • Multi-component/multi-page workflows<br>• Persisted API data or real auth requirements |
| **E2E** | Multi-system & user-visible journeys | • Multi-page navigation & session flows<br>• Full dashboard composition & cross-widget updates<br>• Real tenant isolation & browser-specific features<br>• Critical path user-facing validation | • Isolated business rules & pure logic<br>• API error code checks or basic input validation |

---

## Edge Case Handling

| Domain | Recommended Primary Layer | When to Escalate to E2E |
| :--- | :--- | :--- |
| **Security & RBAC** | **API** (Authorization, tenant boundaries, object access) | Only to verify that the UI safely hides or denies access. |
| **Errors & Validation** | **Unit / API** (Input validation, service exceptions) | Only to check UI error recovery, page impact, or session expiry. |
| **Sorting & Filtering** | **Unit** (Comparators) / **API** (Server query) | Only for multi-page workflow or end-to-end data propagation. |
| **Responsive UI** | **Component** (Isolated viewport/rendering checks) | Only if cross-widget layout overlap or navigation menu breaks. |
| **Data Refresh** | **API** (Update contract) / **Component** (Visual update) | Only when browser-level timing or eventual consistency is required. |

---

## Anti-Patterns to Flag

- **Ice Cream Cone**: Concentrating most tests at E2E level instead of Unit/API.
- **E2E Overkill**: Testing input validations, API HTTP error codes, or pure logic in browser tests.
- **Missing Core E2E**: Having zero E2E tests for mission-critical user journeys.
- **Redundant Coverage**: Testing the exact same validation branch across Unit, Component, and E2E.
- **Fragile Tests**: Using arbitrary `sleep()` delays instead of deterministic lower-layer hooks or API assertions.

---

## Execution & Decision Process

For each scenario:
1. Identify the core behavior and defect source.
2. Select the lowest practical layer capable of detecting the defect.
3. Add a higher-layer test **only** if required to verify real integration or user outcome.
4. Document the selection rationale.

---

## Output Format

Save the complete analysis to **`docs/test-strategy.md`**.

### 1. Strategy Summary Table
Include a summary table detailing: `Layer | Scenario Count | Core Focus | Target Execution Time`.

### 2. Detailed Scenario Breakdown
Format every scenario as follows:

### <Scenario ID>: <Scenario Title>
<br>

| Field | Details |
| :--- | :--- |
| **Suggested Layer** | Component |
| **Rationale** | Selection, displayed rows, and clearing are widget interactions that can be tested using controlled data. The tenant must first confirm this is an actual supported filter, not merely a displayed column. |
| **Primary Assertions** | A matching fixture remains, nonmatching fixtures disappear, and clearing restores baseline rows. |
| **Avoid/Do Not Duplicate** | Avoid repeating the same filter behavior through a full login/dashboard journey. |

### 3. Anti-Pattern Audit
List any anti-patterns identified in existing tests or scenarios with recommended refactoring actions.