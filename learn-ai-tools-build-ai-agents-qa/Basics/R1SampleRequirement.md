
# JIRA Requirement: Introduce Agent List Widget with 7-Second Auto Refresh

## 1. JIRA Issue Details

| Field | Value |
|---|---|
| Issue Key | CXDB-102 |
| Issue Type | Story |
| Project | CXone Dashboard |
| Summary | Introduce Agent List Widget with 7-Second Auto Refresh |
| Priority | High |
| Component | Dashboard / Widgets |
| Status | To Do |

---

## 2. User Story

**As a** Dashboard Administrator / Supervisor,

**I want** to add an Agent List widget to my dashboard,

**So that** I can monitor the current status of agents in near real time without manually refreshing the dashboard.

---

## 3. Business Requirement

The system shall introduce a new widget named **Agent List** in the NiCE CXone Dashboard application.

The widget shall display a list of agents along with their relevant information, such as:

- Agent Name
- Agent ID
- Team Name
- Agent State (Available, Unavailable, Working, etc.)
- Current State Duration

The Agent List widget shall automatically refresh its data every **7 seconds** to ensure that users can view updated agent information.

---

## 4. Functional Requirements

### FR-01: Widget Availability

The system shall introduce a new widget named Agent List in the available widget list.

### FR-02: Add Widget

Users with appropriate dashboard permissions shall be able to add the Agent List widget to an existing dashboard.

### FR-03: Agent Information

The widget shall display the following information for each agent:

| Field | Description |
|---|---|
| Agent Name | Name of the agent |
| Agent ID | Unique identifier of the agent |
| Team Name | Team to which the agent belongs |
| Agent State | Current operational state |
| State Duration | Time spent in the current state |

### FR-04: Automatic Refresh

The Agent List widget shall automatically retrieve updated agent information every 7 seconds.

### FR-05: Updated Agent Information

When an agent's state changes in the source application, the updated state shall be reflected in the Agent List widget during the next successful refresh.

### FR-06: New Agent Visibility

When a new agent becomes eligible for the widget's configured scope, the agent shall appear in the widget after the next successful refresh.

### FR-07: Agent State Change

When an agent changes from one state to another, the widget shall display the latest state and corresponding state duration.

### FR-08: Agent Removal

When an agent is no longer eligible for the widget's configured scope, the agent shall no longer be displayed after the next successful refresh.

### FR-09: Manual Refresh

The widget shall provide a manual refresh option so that users can retrieve the latest agent information without waiting for the next automatic refresh.

### FR-10: Loading and Error Handling

- The widget shall display an appropriate loading indicator while retrieving data.
- If the refresh request fails, the widget shall display an appropriate error or stale-data indication.
- A failed refresh shall not cause the entire dashboard to become unavailable.
- The widget shall attempt data retrieval again during the next scheduled refresh.

### FR-11: Dashboard Persistence

The Agent List widget shall remain available on the dashboard after the user saves the dashboard configuration and opens it again.

### FR-12: Data Access

The widget shall respect the logged-in user's applicable data access permissions and Global View restrictions.

---

## 5. Acceptance Criteria

### AC-01: Agent List Widget Availability

**Given** the user has permission to configure a dashboard,

**When** the user opens the available widget list,

**Then** the Agent List widget shall be available for selection.

### AC-02: Add Agent List Widget

**Given** the Agent List widget is available,

**When** the user adds it to the dashboard and saves the dashboard,

**Then** the Agent List widget shall appear on the dashboard.

### AC-03: Display Agent Information

**Given** the Agent List widget has loaded successfully,

**When** the user views the widget,

**Then** the system shall display Agent Name, Agent ID, Team Name, Agent State, and State Duration.

### AC-04: Automatic Refresh Interval

**Given** the Agent List widget is displayed on the dashboard,

**When** the widget is running,

**Then** it shall automatically retrieve updated agent information at 7-second intervals.

### AC-05: Agent State Update

**Given** an agent's current state is Available,

**When** the agent changes its state to Working,

**Then** the widget shall display the updated Working state during the next successful refresh.

### AC-06: New Agent Addition

**Given** the Agent List widget is displayed,

**When** a new eligible agent is added to the configured scope,

**Then** the new agent shall appear in the widget after the next successful refresh.

### AC-07: Agent Removal

**Given** an agent is displayed in the widget,

**When** the agent is removed from the configured scope,

**Then** the agent shall no longer appear after the next successful refresh.

### AC-08: Manual Refresh

**Given** the widget is displayed,

**When** the user clicks the manual refresh option,

**Then** the widget shall initiate a data retrieval request without waiting for the next scheduled refresh.

### AC-09: Refresh Failure

**Given** the Agent List widget is displayed,

**When** the data retrieval request fails,

**Then** the widget shall handle the failure gracefully without affecting other dashboard widgets.

### AC-10: Dashboard Persistence

**Given** the Agent List widget has been added and saved,

**When** the user navigates away and opens the dashboard again,

**Then** the Agent List widget shall remain available.

---

## 6. Out of Scope

- Creating new agent states.
- Modifying agent state transitions.
- Changing agent configuration in the source application.
- Generating historical agent performance reports.
- Introducing new agent management functionality.

---

## 7. Dependencies

- Agent data source/API.
- Agent state information availability.
- Dashboard widget framework.
- User authentication and authorization.

---

## 8. Sample Test Scenarios

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| TC-01 | Verify Agent List in widget catalogue | Widget is available |
| TC-02 | Add Agent List widget | Widget is added successfully |
| TC-03 | Verify agent information | All required columns are displayed |
| TC-04 | Verify automatic refresh | Refresh occurs every 7 seconds |
| TC-05 | Change agent state | Updated state appears after refresh |
| TC-06 | Add a new agent | New agent appears after refresh |
| TC-07 | Remove an agent | Removed agent disappears |
| TC-08 | Verify manual refresh | Data retrieval starts immediately |
| TC-09 | Simulate API failure | Widget handles error gracefully |
| TC-10 | Verify dashboard persistence | Widget remains after reopening |
| TC-11 | Verify Global View restrictions | Only authorized agent data appears |
| TC-12 | Verify multiple refresh cycles | Refresh continues consistently |
| TC-13 | Verify other widgets during refresh | Other widgets remain functional |
| TC-14 | Verify simultaneous users | Each user sees permitted agent data |

---

## 9. Open Questions / Requirement Clarifications

Before development starts, the following questions should be clarified with the Product Owner.

1. Does 7 seconds mean request initiation or successful data update?
2. Should the timer restart after a failed API request?
3. Should refresh continue when the dashboard is inactive?
4. Should manual refresh reset the 7-second timer?
5. What happens when there are thousands of agents?
6. Should agent states be displayed using different colors?
7. Should users be able to filter by team or agent state?
8. Should pagination or scrolling be supported?
9. What should be displayed if no agents are available?
10. Should the widget display the last successful refresh timestamp?

---

## 10. QA Architect Testing Approach

### UI Testing
- Verify widget availability.
- Verify widget configuration and rendering.
- Verify agent information.
- Verify automatic refresh behavior.
- Verify manual refresh behavior.

### API Testing
- Verify agent list API response.
- Verify data updates after 7 seconds.
- Verify response structure and mandatory fields.
- Verify authorization and Global View restrictions.
- Verify API failure handling.

### Performance Testing
- Validate continuous refresh behavior.
- Validate API request frequency.
- Validate widget performance with a large agent list.
- Validate multiple widgets refreshing simultaneously.

### Security Testing
- Verify unauthorized agent data is not exposed.
- Verify Global View restrictions.
- Verify API-level authorization.

### Automation Testing
- Use Playwright for UI validation.
- Use API testing to validate data retrieval.
- Validate refresh intervals and updated agent information.
- Validate error handling and recovery scenarios.

---

**Note:** This is a sample product requirement created for QA practice. Agent fields and additional widget behaviors are proposed assumptions and should be confirmed with the Product Owner.
