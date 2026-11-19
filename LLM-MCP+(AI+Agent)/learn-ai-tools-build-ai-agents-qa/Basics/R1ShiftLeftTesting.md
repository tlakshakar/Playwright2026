`Prompt`

```
As part of shift testing, which tests should go in which layer of test pyramid?
```

In Shift-Left Testing, the objective is to identify defects as early as possible in the development lifecycle rather than finding most defects during system or UI testing.

As a QA Architect, you should decide which tests belong at each layer of the Test Automation Pyramid based on execution speed, cost, stability, and the type of validation required.



# Agent List Widget – Test Automation Pyramid Mapping

## 1. Objective

This document maps the Agent List Widget test scenarios to the appropriate layers of the Test Automation Pyramid.

**Feature:** Agent List Widget with 7-Second Auto Refresh

**Objective:** Identify which tests should be automated at the Unit, API/Integration, and UI/E2E layers to achieve effective Shift-Left Testing.

The goal is to:

- Identify defects as early as possible.
- Avoid duplicate test coverage across layers.
- Reduce dependency on UI automation.
- Improve automation execution speed.
- Validate complete business functionality.
- Maintain a reliable and maintainable automation suite.

---

# 2. Test Automation Pyramid

The test automation pyramid consists of three major layers.

```text
                  /\
                 /  \
                / UI \
               / E2E  \
              /--------\
             /          \
            / API /      \
           / Integration  \
          /----------------\
         /                  \
        /    Unit Tests      \
       /______________________\
```

| Layer | Purpose | Expected Test Coverage |
|---|---|---|
| Unit Testing | Validate individual functions and business logic. | High |
| API / Integration Testing | Validate backend APIs, business rules, and service communication. | Medium |
| UI / E2E Testing | Validate user interactions and complete business workflows. | Low |

---

# 3. Layer 1 – Unit Testing

## Objective

Validate individual functions, methods, and business logic independently without depending on actual backend services or browser interactions.

These tests should primarily be implemented by developers and executed during development and CI builds.

## Test Scenarios

| Test ID | Original Requirement / Scenario | What Should Be Validated | Expected Result | Priority |
|---|---|---|---|---|
| UNIT-001 | Refresh interval configuration | Verify that the refresh interval configuration is set to 7000 milliseconds. | Refresh configuration should return 7000 milliseconds. | High |
| UNIT-002 | Refresh scheduling logic | Verify that the scheduling function correctly registers the next refresh. | Next refresh should be scheduled according to the configured interval. | High |
| UNIT-003 | Agent state formatting | Verify that backend agent states are converted into the expected UI display labels. | Correct state labels should be returned. | High |
| UNIT-004 | State duration formatting | Verify that the duration formatting function converts seconds into the expected time representation. | Duration should be displayed in the agreed format. | Medium |
| UNIT-005 | Agent eligibility filtering | Verify that the filtering function includes only agents meeting the configured eligibility rules. | Only eligible agents should be returned. | High |
| UNIT-006 | Agent sorting | Verify that agents are sorted according to the configured sorting rules. | Agents should appear in the expected order. | Low |
| UNIT-007 | Missing optional values | Verify that data-processing logic handles null or missing optional fields. | Application logic should not throw unexpected errors. | Medium |
| UNIT-008 | Empty agent collection | Verify that the data-processing logic handles an empty agent collection. | Function should return a valid empty result. | Medium |
| UNIT-009 | Special characters and long names | Verify that data-processing functions handle special characters and unusually long agent/team names. | Data should be processed without unexpected exceptions or corruption. | Medium |
| UNIT-010 | Error-handling logic | Verify that individual functions handle expected exceptions and invalid inputs. | Errors should be handled according to the defined application behavior. | Medium |

## Automation Approach

- Developers should write unit tests alongside implementation.
- Use mocks or stubs for external dependencies.
- Avoid actual API calls and database dependencies.
- Execute tests whenever code changes are committed.

## Recommended Tools

- Java: JUnit / TestNG
- JavaScript: Jest / Vitest
- .NET: NUnit / xUnit

---

# 4. Layer 2 – API / Integration Testing

## Objective

Validate backend functionality, API contracts, business rules, data accuracy, authentication, authorization, and communication between application services.

These tests should be automated independently of the dashboard UI.

## Test Scenarios

| Test ID | Original Scenario ID | Test Scenario | What Should Be Validated | Priority |
|---|---|---|---|---|
| API-001 | API-001 | Retrieve Agent List using valid authentication. | Successful API response and mandatory agent fields. | High |
| API-002 | API-002 | Validate agent data accuracy. | Agent Name, Agent ID, Team Name, Agent State, and State Duration against source data. | High |
| API-003 | API-003 | Validate agent state changes. | Change agent state in the source system and verify updated state through the API. | High |
| API-004 | API-004 | Validate agent addition and removal. | Newly eligible agents should be included and removed agents should be excluded. | High |
| API-005 | API-005 | Validate team permissions and Global View restrictions. | API should return only authorized agent records. | High |
| API-006 | API-006 | Validate empty responses and optional fields. | Empty agent lists and null optional fields should follow the API contract. | Medium |
| API-007 | API-007 | Validate authentication and authorization failures. | Missing, invalid, expired, or unauthorized credentials should be rejected. | High |
| API-008 | API-008 | Validate invalid request parameters. | Invalid identifiers, unsupported filters, and missing mandatory parameters should return appropriate validation errors. | Medium |
| API-009 | API-009 | Validate backend failures and dependency unavailability. | Timeouts, HTTP 5xx responses, and unavailable source services should be handled appropriately. | High |
| API-010 | API-010 | Validate repeated and concurrent requests. | API should remain stable and meet agreed performance requirements. | High |

## Additional Integration Validation

The following integration checks should also be considered where the architecture supports them:

| Test ID | Integration Scenario | What Should Be Validated | Priority |
|---|---|---|---|
| INT-001 | Agent Service to Agent List API | Validate that the API retrieves the correct data from the source agent service. | High |
| INT-002 | Agent Database to Agent Service | Validate that agent information is retrieved and mapped correctly from the database. | High |
| INT-003 | Authentication Service to Agent List API | Validate token verification and user identity propagation. | High |
| INT-004 | Permission Service to Agent List API | Validate that user permissions are correctly applied before returning agent records. | High |
| INT-005 | API response contract | Validate response schema, mandatory fields, and backward compatibility where required. | High |

## Automation Approach

- Automate API requests and response validation.
- Use controlled test data to validate agent state changes.
- Validate authorization using multiple test users.
- Use service mocks where external dependencies are unavailable or need deterministic failure simulation.
- Validate API performance separately from functional correctness.

## Recommended Tools

- Playwright API
- Postman
- REST Assured
- Karate
- Swagger / OpenAPI

---

# 5. Layer 3 – UI / E2E Testing

## Objective

Validate the actual dashboard user experience and complete business workflows.

These tests should verify that the frontend correctly communicates with backend APIs and displays the expected information.

## Test Scenarios

| Test ID | Original Scenario ID | Test Scenario | What Should Be Validated | Priority |
|---|---|---|---|---|
| UI-001 | UI-001 | Add Agent List widget and save dashboard. | Widget availability, successful addition, and dashboard persistence. | High |
| UI-002 | UI-002 | Validate widget rendering and agent information. | Mandatory columns and displayed values should match the backend response. | High |
| UI-003 | UI-003 | Validate 7-second automatic refresh. | Browser should initiate refresh requests at the agreed interval and display updated data. | High |
| UI-004 | UI-004 | Validate agent state changes in the widget. | Updated state should appear after the next successful refresh. | High |
| UI-005 | UI-005 | Validate agent addition and removal in the widget. | New agents should appear and removed agents should disappear after refresh. | High |
| UI-006 | UI-006 | Validate manual refresh. | Manual refresh should work without uncontrolled duplicate requests or disruption to automatic refresh. | Medium |
| UI-007 | UI-007 | Validate empty and unusual agent data. | Empty state, null optional fields, long names, and special characters should render correctly. | Medium |
| UI-008 | UI-008 | Validate API failures during automatic refresh. | Widget should handle timeout, HTTP 500/503, and network disconnection gracefully. | High |
| UI-009 | UI-009 | Validate recovery after API failure. | Widget should recover during a subsequent successful refresh. | High |
| UI-010 | UI-010 | Validate permission-based widget data. | Different users should see only authorized agent information. | High |
| UI-011 | UI-011 | Validate continuous refresh and dashboard performance. | Widget and other dashboard components should remain responsive. | High |
| UI-012 | UI-012 | Validate browser compatibility and dashboard navigation. | Widget should render correctly across supported browsers and maintain expected behavior after navigation/reload. | Medium |
| UI-013 | UI-013 | Validate session expiry during automatic refresh. | Unauthorized data retrieval should stop and session-expiry behavior should be handled securely. | High |

## Automation Approach

- Use Playwright for browser-based automation.
- Use API responses as the reference for validating UI data.
- Capture browser network requests to validate refresh behavior.
- Avoid repeating every API negative scenario through the UI.
- Automate only critical user journeys at the E2E level.

## Recommended Tools

- Playwright
- Selenium
- Cypress

---

# 6. Critical E2E Flows

These flows should be automated across the application because they validate important business functionality end to end.

## E2E-001: Add Widget and Validate Agent Data

**Automation Layer:** UI + API

### Steps

1. Log in as an authorized supervisor.
2. Navigate to the dashboard.
3. Add the Agent List widget.
4. Save the dashboard.
5. Retrieve agent information through the API.
6. Validate the agent information displayed in the widget against the API response.

### Expected Result

The widget should be added successfully, and the displayed agent information should match the authorized API response.

---

## E2E-002: Agent State Change and Automatic Refresh

**Automation Layer:** API + UI

### Steps

1. Identify an agent whose current state is Available.
2. Change the agent state using an approved source-system API or test-data mechanism.
3. Validate the updated agent state through the Agent List API.
4. Wait for the next successful automatic refresh.
5. Verify the updated state in the dashboard widget.

### Expected Result

The API should return the updated state, and the widget should display the same state after the next successful refresh.

---

## E2E-003: Agent Addition and Removal

**Automation Layer:** API + UI

### Steps

1. Add a new eligible agent using an approved test-data mechanism.
2. Verify that the API returns the new agent.
3. Verify that the widget displays the new agent after refresh.
4. Remove an existing agent from the applicable scope.
5. Verify that the API excludes the removed agent.
6. Verify that the widget removes the agent after refresh.

### Expected Result

The API and dashboard should reflect the latest eligible agent population.

---

## E2E-004: Authorization and Global View

**Automation Layer:** API + UI

### Steps

1. Log in as a user with Team A access.
2. Verify the API response contains only Team A agents.
3. Verify the dashboard displays the same authorized agents.
4. Repeat using a user with different team permissions.
5. Attempt to access unauthorized agent records through the API.

### Expected Result

API and UI should consistently enforce user permissions and prevent unauthorized data exposure.

---

## E2E-005: API Failure and Recovery

**Automation Layer:** API + UI

### Steps

1. Open the dashboard with the Agent List widget.
2. Allow a successful refresh.
3. Simulate an API timeout or HTTP 503 response.
4. Verify widget error or stale-data behavior.
5. Restore API availability.
6. Wait for the next scheduled refresh.
7. Verify the latest agent information is displayed.

### Expected Result

The widget should handle failures gracefully and recover automatically.

---

# 7. Final Test Pyramid Mapping

This table provides a consolidated view of where each major functionality should be tested.

| Functional Area | Unit Testing | API / Integration Testing | UI / E2E Testing |
|---|---|---|---|
| Refresh interval configuration | Validate 7000 ms configuration. | Not required for timer validation. | Validate actual browser request interval. |
| Agent data retrieval | Validate data-processing functions. | Validate API response and source integration. | Validate displayed agent information. |
| Agent state changes | Validate state mapping and formatting. | Validate updated state through API. | Validate updated state after refresh. |
| Agent addition and removal | Validate eligibility filtering. | Validate API inclusion and exclusion. | Validate appearance and removal in widget. |
| User authorization | Validate permission-related logic. | Validate server-side authorization. | Validate user-visible data restrictions. |
| Empty agent list | Validate empty collection handling. | Validate empty API response. | Validate empty-state presentation. |
| Invalid authentication | Not required for the complete authentication flow. | Validate invalid and expired tokens. | Validate session expiry and user-facing behavior. |
| API failure | Validate error-handling functions. | Validate timeout and server errors. | Validate error display and recovery. |
| Dashboard persistence | Validate configuration-related logic where applicable. | Not normally required. | Validate saving and reopening the widget. |
| Manual refresh | Validate refresh-trigger logic. | Validate the underlying API request. | Validate manual interaction and refresh behavior. |
| Continuous refresh | Validate scheduling logic. | Validate backend load and concurrent requests. | Validate browser behavior and dashboard responsiveness. |
| Browser compatibility | Not required. | Not required. | Validate supported browsers and resolutions. |

---

# 8. Recommended Test Execution Sequence

| Phase | Layer | Execution | Objective |
|---|---|---|---|
| Phase 1 | Unit | Execute unit tests during development and CI builds. | Identify code-level defects early. |
| Phase 2 | API | Execute API tests after backend deployment. | Validate backend functionality and contracts. |
| Phase 3 | Integration | Validate interactions between agent services, authentication, permissions, and APIs. | Identify service integration defects. |
| Phase 4 | UI | Execute widget and dashboard tests. | Validate frontend functionality. |
| Phase 5 | E2E | Execute critical business workflows. | Validate complete application behavior. |
| Phase 6 | Performance | Execute API load and browser refresh tests. | Validate scalability and reliability. |

---

# 9. Recommended Automation Distribution

As an initial planning guideline:

| Layer | Suggested Distribution | Reason |
|---|---:|---|
| Unit Testing | 60–70% | Fast execution and early defect detection. |
| API / Integration Testing | 20–30% | Strong backend and business-rule coverage. |
| UI / E2E Testing | 5–10% | Focus on critical user journeys and visual behavior. |

These percentages are guidelines, not mandatory targets.

The actual distribution should depend on application architecture, business risk, and testability.

---

# 10. Final QA Architect Recommendations

1. Keep individual business logic tests at the Unit layer.
2. Validate backend business functionality through API automation wherever possible.
3. Use UI automation only when actual browser behavior or user interaction needs to be verified.
4. Maintain a small but reliable E2E suite for critical business workflows.
5. Do not duplicate every API test through UI automation.
6. Validate security at the API layer and user-visible restrictions at the UI layer.
7. Integrate Unit and API tests into CI/CD pipelines for early feedback.
8. Use test data setup and cleanup mechanisms to make automation repeatable.
9. Track the layer where defects originate, not only where they are detected.

## Key Takeaway

- **Unit:** Does the individual piece of code work?
- **API / Integration:** Does the backend return the correct data and do application components communicate correctly?
- **UI / E2E:** Does the user experience work correctly across the complete business workflow?

The objective is to test each requirement at the earliest appropriate layer and use E2E automation only where it adds meaningful integration confidence.
