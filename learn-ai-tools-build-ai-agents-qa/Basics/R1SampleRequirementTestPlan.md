`Prompt:`
```
Act as a QA Architect, generate a test plan for this requirement. Test plan should clearly mention what test coverage via API and via UI
```

Below is the complete QA Test Plan in standard Markdown format. 

```

# QA Test Plan – Agent List Widget with 7-Second Auto Refresh

## 1. Document Information

| Field             | Details                |
|------------------ |------------------------|
| Project           | NiCE CXone Dashboard   |
| Feature           | Agent List Widget      |
| JIRA Requirement  | CXDB-102               |
| Document Type     | QA Test Plan           |
| Application       | NiCE CXone Dashboard   |
| Testing Approach  | API + UI + Integration |
| Priority          | High                   |

---

## 2. Objective

The objective of this test plan is to validate the functionality, data accuracy, authorization, refresh behavior, and performance of the newly introduced Agent List widget.

The widget should:

- Display a list of agents.
- Display relevant agent information.
- Automatically refresh agent information every 7 seconds.
- Reflect agent state changes.
- Display newly added eligible agents.
- Remove agents who are no longer eligible.
- Respect user permissions and Global View restrictions.
- Handle API failures without affecting the entire dashboard.

### Primary Testing Objective

Validate the feature through two major testing approaches:

1. API Testing
2. UI Testing

Additionally, perform Integration and Performance Testing.

---

# 3. Test Strategy

The recommended testing approach is to perform the majority of backend validation through API testing and user-facing validation through UI testing.

### Recommended Test Coverage Distribution

| Testing Type | Recommended Coverage |
|---|---|
| API Testing | 70% |
| UI Testing | 30% |

**Note:** These percentages represent a suggested allocation of testing effort, not a mandatory industry standard.

### 3.1 API Testing Strategy

API testing will primarily validate backend functionality, data accuracy, authorization, error handling, and performance.

The following areas should be covered:

| Area | What Needs to Be Validated |
|---|---|
| API Contract | Request parameters, response schema, mandatory fields and data types |
| Agent Data | Agent Name, Agent ID, Team Name, Agent State and State Duration |
| Data Accuracy | API data matches the source application |
| Refresh | Subsequent API requests return updated agent information |
| New Agent | Newly eligible agents appear in the API response |
| Agent Removal | Ineligible agents are excluded |
| Authorization | Global View and user permission restrictions |
| Negative Testing | Invalid parameters, missing tokens and unauthorized requests |
| Error Handling | 4xx/5xx responses, timeout and unavailable service |
| Performance | Response time, concurrent requests and load behavior |
| Data Consistency | No duplicate agents, incorrect records or stale data |

### 3.2 UI Testing Strategy

UI testing will primarily validate the actual user experience and dashboard functionality.

The following areas should be covered:

| Area | What Needs to Be Validated |
|---|---|
| Widget Availability | Agent List appears in the widget catalogue |
| Widget Configuration | User can add and save the widget |
| Widget Rendering | Widget loads and displays correctly |
| Agent Information | All required columns and values are displayed |
| Auto Refresh | Widget refreshes automatically every 7 seconds |
| State Change | Updated agent state appears without manual intervention |
| New Agent | New agent appears after refresh |
| Agent Removal | Removed agent disappears after refresh |
| Manual Refresh | Manual refresh action works correctly |
| Error Handling | Appropriate error or stale-data indication |
| Dashboard Persistence | Widget remains after reopening dashboard |
| Multiple Widgets | Other widgets continue working during refresh |
| Responsive UI | Widget layout works at supported screen sizes |
| Accessibility | Keyboard navigation and accessible labels |

---

# 4. Detailed API Test Coverage

API testing should validate the backend functionality independently of the dashboard UI.

The following test scenarios should be covered.

| API ID | Test Scenario | Expected Result | Priority |
|---|---|---|---|
| API-01 | Verify Agent List API endpoint | API responds successfully | High |
| API-02 | Verify response schema | All mandatory fields are present with correct data types | High |
| API-03 | Verify agent records | Agent details match source data | High |
| API-04 | Verify Agent ID uniqueness | No duplicate agent records | High |
| API-05 | Verify agent state values | Only supported agent states are returned | High |
| API-06 | Verify state duration | Duration is valid and consistent with source data | High |
| API-07 | Verify team association | Each agent has the correct team association | High |
| API-08 | Verify data refresh | Subsequent requests return the latest available data | High |
| API-09 | Verify agent state transition | Updated state is returned after source state changes | High |
| API-10 | Verify new agent addition | Newly eligible agent appears in response | High |
| API-11 | Verify agent removal | Removed or ineligible agent is excluded | High |
| API-12 | Verify Global View restrictions | Only authorized agents are returned | Critical |
| API-13 | Verify unauthorized team access | Unauthorized team data is not returned | Critical |
| API-14 | Verify unauthorized user | Request is rejected appropriately | Critical |
| API-15 | Verify invalid request parameters | Appropriate validation response is returned | Medium |
| API-16 | Verify missing authentication token | Request is rejected appropriately | Critical |
| API-17 | Verify expired authentication token | Appropriate authentication error is returned | High |
| API-18 | Verify service timeout | Timeout is handled gracefully | High |
| API-19 | Verify server error | Appropriate error response is returned | High |
| API-20 | Verify concurrent API requests | Requests are processed without data corruption | High |
| API-21 | Verify large agent dataset | API handles expected data volume | High |
| API-22 | Verify API response time | Response meets agreed performance SLA | High |
| API-23 | Verify repeated requests | Repeated calls do not cause unexpected failures | High |
| API-24 | Verify response consistency | No unexpected duplicate or missing records | High |

### Important API Architecture Consideration

The 7-second refresh interval may be controlled by the dashboard frontend rather than the backend API.

Therefore:

- API testing should validate that subsequent requests return updated data.
- UI and integration testing should validate that the frontend initiates requests every 7 seconds.
- Do not assume that the API itself has an automatic 7-second polling mechanism.

---

# 5. Detailed UI Test Coverage

UI testing should validate the Agent List widget from the end user's perspective.

| UI ID | Test Scenario | Expected Result | Priority |
|---|---|---|---|
| UI-01 | Open widget catalogue | Agent List widget is available | High |
| UI-02 | Add Agent List widget | Widget is added successfully | High |
| UI-03 | Save dashboard | Dashboard saves successfully | High |
| UI-04 | Verify widget rendering | Widget loads without UI errors | High |
| UI-05 | Verify column headers | All required columns are displayed | High |
| UI-06 | Verify agent information | Correct agent details are displayed | High |
| UI-07 | Verify automatic refresh | Data retrieval starts at 7-second intervals | Critical |
| UI-08 | Verify state update | Changed agent state appears after refresh | Critical |
| UI-09 | Verify new agent | Newly eligible agent appears after refresh | High |
| UI-10 | Verify agent removal | Ineligible agent disappears after refresh | High |
| UI-11 | Verify state duration | Duration updates correctly | High |
| UI-12 | Verify manual refresh | Data retrieval starts immediately | High |
| UI-13 | Verify failed refresh | Appropriate error or stale-data indication appears | High |
| UI-14 | Verify refresh recovery | Widget recovers after API becomes available | High |
| UI-15 | Verify dashboard persistence | Widget remains after reopening dashboard | High |
| UI-16 | Verify Global View | Only authorized agent data is displayed | Critical |
| UI-17 | Verify multiple widgets | Other widgets remain functional | High |
| UI-18 | Verify continuous refresh | Refresh continues over multiple cycles | High |
| UI-19 | Verify large agent list | Widget handles large data volume correctly | High |
| UI-20 | Verify empty agent list | Appropriate empty-state message is displayed | Medium |
| UI-21 | Verify network interruption | Widget handles connectivity loss gracefully | High |
| UI-22 | Verify multiple dashboard users | Each user sees permitted data | High |
| UI-23 | Verify responsive layout | Widget layout adapts to supported screen sizes | Medium |
| UI-24 | Verify browser console | No unexpected JavaScript errors | Medium |

---

# 6. Detailed Testing of the 7-Second Refresh Requirement

This is the most important functionality of the feature.

A dedicated test suite should be created to validate the refresh behavior.

## Scenario 1: Automatic Refresh Interval

**Objective:** Verify that the Agent List widget initiates data retrieval every 7 seconds.

### Test Steps

1. Login to the CXone Dashboard.
2. Open a dashboard containing the Agent List widget.
3. Open browser Developer Tools.
4. Navigate to the Network tab.
5. Identify the API request responsible for retrieving agent information.
6. Record the timestamp of the first request.
7. Record timestamps of subsequent requests.
8. Compare the time difference between consecutive requests.
9. Continue observing for at least 10 refresh cycles.

### Expected Result

- Agent data retrieval is initiated at 7-second intervals.
- No unexpected duplicate requests are generated.
- The widget continues refreshing without interruption.

### Example

| Request | Timestamp | Difference |
|---|---|---|
| Request 1 | 10:00:00 | Initial |
| Request 2 | 10:00:07 | 7 seconds |
| Request 3 | 10:00:14 | 7 seconds |
| Request 4 | 10:00:21 | 7 seconds |
| Request 5 | 10:00:28 | 7 seconds |

**Important:** The acceptable timing tolerance must be agreed with the Product Owner.

Also clarify whether the 7-second interval is measured from request initiation or request completion.

---

## Scenario 2: Agent State Update

**Objective:** Verify that the widget displays the latest agent state.

### Test Steps

1. Login to the dashboard.
2. Open the Agent List widget.
3. Identify an agent currently in Available state.
4. Change the agent state to Working in the source application.
5. Wait for the next successful refresh.
6. Observe the agent state in the widget.

### Expected Result

The agent state should change from Available to Working without manually refreshing the dashboard.

---

## Scenario 3: API Failure During Automatic Refresh

**Objective:** Verify refresh failure and recovery.

### Test Steps

1. Open the Agent List widget.
2. Allow the widget to refresh successfully.
3. Simulate an API failure during a subsequent refresh.
4. Observe the widget.
5. Restore API availability.
6. Wait for the next scheduled refresh.

### Expected Result

- The widget should not crash.
- Appropriate error or stale-data indication should appear.
- Previously loaded data should be handled according to the agreed design.
- The widget should recover when API availability is restored.

---

## Scenario 4: Manual Refresh

**Objective:** Verify that manual refresh works independently of the automatic refresh timer.

### Test Steps

1. Open the Agent List widget.
2. Wait for the widget to load.
3. Click the manual refresh button.
4. Monitor the corresponding API request.
5. Verify the updated information.

### Expected Result

The widget should initiate data retrieval immediately without waiting for the next scheduled refresh.

---

# 7. API vs UI – Requirement Traceability Matrix

This matrix ensures that every functional requirement has appropriate test coverage.

| Requirement | API Coverage | UI Coverage |
|---|---|---|
| FR-01 Widget Availability | Not required | Yes |
| FR-02 Add Widget | Not required | Yes |
| FR-03 Agent Information | Yes | Yes |
| FR-04 Automatic Refresh | Validate repeated data retrieval | Validate 7-second interval |
| FR-05 Updated Agent Information | Yes | Yes |
| FR-06 New Agent Visibility | Yes | Yes |
| FR-07 Agent State Change | Yes | Yes |
| FR-08 Agent Removal | Yes | Yes |
| FR-09 Manual Refresh | Validate data endpoint | Yes |
| FR-10 Loading and Error Handling | Yes | Yes |
| FR-11 Dashboard Persistence | Validate persistence API if applicable | Yes |
| FR-12 Data Access | Yes | Yes |

---

# 8. Test Data Requirements

Prepare the following test data before execution.

| Test Data | Description |
|---|---|
| User A | User with access to Team Alpha |
| User B | User with access to Team Bravo |
| User C | User with access to multiple teams |
| User D | User without assigned Global Views |
| Agent A | Agent in Available state |
| Agent B | Agent in Working state |
| Agent C | Agent in Unavailable state |
| Agent D | Newly added agent |
| Agent E | Agent removed from configured scope |

### Additional Test Data

- Empty agent list.
- Large agent dataset.
- Invalid agent identifier.
- Unauthorized team identifier.
- Expired authentication token.
- API timeout response.
- API server error response.

---

# 9. Non-Functional Testing

Non-functional testing validates how the feature performs under different conditions.

| Testing Type | Coverage |
|---|---|
| Performance Testing | Validate API response time and widget rendering |
| Load Testing | Validate concurrent users accessing Agent List |
| Stress Testing | Validate behavior under higher-than-expected agent volumes and request load |
| Security Testing | Validate authentication, authorization and data access restrictions |
| Reliability Testing | Validate continuous refresh over an extended duration |
| Compatibility Testing | Validate supported browsers and screen resolutions |

## Performance Consideration

With a 7-second refresh interval:

- One widget initiates approximately 8.57 refreshes per minute.
- 100 simultaneously active widgets could initiate approximately 857 requests per minute.
- 1,000 simultaneously active widgets could initiate approximately 8,571 requests per minute.

These are theoretical request rates assuming one request per widget per refresh cycle, with no caching, batching or request suppression.

This should be evaluated during performance testing because frequent polling can increase backend load.

---

# 10. Test Environment and Tools

| Area | Recommended Tool |
|---|---|
| UI Automation | Playwright |
| API Automation | Postman / Playwright API |
| API Exploration | Swagger / Browser Network |
| Performance Testing | JMeter / k6 |
| Defect Tracking | Jira |
| Test Management | Jira / Xray |
| Browser Validation | Chrome / Edge |
| Log Analysis | Application Logs / Browser Developer Tools |

---

# 11. Entry and Exit Criteria

## 11.1 Entry Criteria

Testing can begin when:

- Requirement is reviewed and approved.
- API specification is available.
- UI design or wireframe is available.
- Development build is deployed to QA.
- Test environment and test accounts are available.
- Agent test data is configured.
- Global View permissions are configured.

## 11.2 Exit Criteria

Testing can be considered complete when:

- All critical and high-priority test scenarios are executed.
- All critical and high-priority defects are resolved or formally accepted.
- API and UI test suites are executed successfully.
- 7-second refresh behavior is validated.
- Authorization and Global View validation is completed.
- No unresolved critical security issues remain.
- Test execution report is shared with stakeholders.

---

# 12. Recommended Automation Strategy

Divide automation into three independent test suites.

## Suite 1: API Automation

**Recommended Tools:** Postman / Playwright API

Test coverage:

- API contract validation.
- Agent data validation.
- Agent state change validation.
- Authorization validation.
- Negative test scenarios.
- API error handling.
- Response time validation.

## Suite 2: UI Automation

**Recommended Tool:** Playwright

Test coverage:

- Widget availability.
- Add and save widget.
- Agent data rendering.
- Automatic refresh.
- Manual refresh.
- Dashboard persistence.
- Error message validation.

## Suite 3: Integration Automation

**Recommended Tools:** Playwright + API

Test coverage:

1. Change agent state through an authorized source API.
2. Verify updated data through the Agent List API.
3. Verify updated state in the dashboard UI.
4. Validate consistency across API and UI.

---

# 13. QA Architect Recommendations

Before considering this feature ready for release, prioritize the following five areas.

### 1. Data Accuracy

The widget must display the correct agent information.

### 2. Refresh Accuracy

Data retrieval must happen every 7 seconds according to the agreed timing definition.

### 3. Data Security

Users must never see unauthorized agent information.

### 4. Refresh Reliability

API failures must not break the dashboard or permanently stop refreshing.

### 5. Performance

Continuous refresh must not negatively affect dashboard responsiveness or backend stability.

### Important Architectural Recommendation

Do not automate every possible scenario through the UI.

API automation should handle the majority of data, authorization, and negative scenarios.

Reserve UI automation for:

- User journeys.
- Widget rendering.
- User interactions.
- Visual validation.
- End-to-end refresh validation.

This approach reduces test execution time and makes automation easier to maintain.

---

# 14. Proposed Test Suite Breakdown

| Test Suite | Suggested Test Cases |
|---|---:|
| Agent List – API | 24 |
| Agent List – UI | 24 |
| Agent List – Integration | 5–8 |
| Agent List – Performance | 4–6 |
| **Total** | **57–62** |

These are proposed test-case targets, not mandatory unique test cases. Some scenarios can be combined or expanded based on the API specification.

---

# 15. Next Steps

The following activities can be performed after completing the test plan:

1. Convert API-01 to API-24 into detailed API test cases.
2. Convert UI-01 to UI-24 into detailed UI test cases.
3. Identify API endpoints and request payloads.
4. Prepare positive, negative and boundary test data.
5. Implement API automation using Postman or Playwright.
6. Implement UI automation using Playwright.
7. Execute integration tests to validate API and UI data consistency.
8. Execute performance tests to validate continuous 7-second refresh.

**Final QA Architect Recommendation:**

For this feature, API testing should provide confidence in backend correctness, while UI testing should provide confidence in the end-user experience.

The most important end-to-end validation is to change an agent's state in the source application and verify that the Agent List widget displays the updated state during its next successful 7-second refresh cycle.

---

**Document Status:** Sample QA Test Plan

**Requirement Reference:** CXDB-102

**Note:** This test plan is based on proposed sample requirements. Actual API endpoints, response schemas, timing tolerances, UI designs and performance SLAs must be confirmed with the development team and Product Owner before execution.

```

**Suggested VS Code folder structure:**

```
Agent-List-Widget/
│
├── Requirements/
│   └── Agent_List_Widget_Requirement.md
│
├── Test-Plan/
│   └── Agent_List_Widget_QA_Test_Plan.md
│
├── Test-Cases/
│   ├── Agent_List_API_Test_Cases.md
│   ├── Agent_List_UI_Test_Cases.md
│   └── Agent_List_Integration_Test_Cases.md
│
└── Automation/
    ├── API/
    └── UI/
```

This structure will help you maintain the requirement, test plan, detailed test cases, and automation work as a single practical QA Architect project.