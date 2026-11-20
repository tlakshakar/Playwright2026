# ACD Widget Facts

**Source checked:** 2026-11-20. Re-fetch the official page before using these details in a requirement or test; the product documentation can change.

**Primary source:** [NiCE CXone ACD Widgets](https://help.nicecxone.com/content/dashboardwem/acdreportingwidgets.htm)

## Shared ACD Facts

- ACD widgets provide contact-center performance data. The page says widgets can be dragged onto a dashboard or added by double-clicking; widget settings can be used to apply filters.
- ACD widgets are not available if the tenant's NiCE CXone applications do not include ACD.
- The page states that Performance Management (Native) license holders can access up to 95 days of historical data within a 25-month lookback. Dashboard-only license access is limited to same-day data. Verify the tenant's license before asserting historical range.
- Data refresh and widget refresh are separate facts. Where the source gives both, retain both; do not infer a widget refresh interval where the page does not provide one.
- The source describes widget Settings and filter controls but does not enumerate every filter choice for every widget in the text available here. Do not assume every widget supports Teams, Agents, and Skills together; inspect the current documentation and authorized tenant.

## Widget Summary

| Widget | Purpose / data | Data refresh | Widget refresh | Duration support |
|---|---|---|---|---|
| Agent Contact View | Current agent contact state, especially ACW and Unavailable time | 7-10 seconds | 7 seconds | Near real-time |
| Agent State Counter | Counts of signed-in agents by state and total signed-in agents for the current day | 7-10 seconds | 7 seconds | Near real-time |
| Agent List | Current agent state and active-session information, grouped by state | 7-10 seconds | 7 seconds | Near real-time |
| Agent State Summary | Agent state duration and percentage for a selected duration | 5-10 minutes after the agent state ends | 5 minutes | Historical, 90 days |
| Contact States by Skill | Active contact states grouped by skill | 7-10 seconds | 7 seconds | Near real-time |
| Contact List | Active contacts, state time, skill, handling agent, and channel | 7-10 seconds | 7 seconds | Near real-time |
| Interaction Summary | Completed interactions and interaction details | 5-10 minutes after the interaction ends | 5 minutes | Historical; no specific duration stated in this widget section |
| Service Level | Ended contacts meeting or not meeting a skill's service-level threshold | 90 seconds | 90 seconds | Historical, 1 day |
| Queue Counter | Current queued contact count and longest time in a contact's current state | 7-10 seconds | 7 seconds | Near real-time |
| Callback Requests | Current-day in-queue, successful, and failed callback counts | In-queue: 7-10 seconds; successful/failed: 5-10 minutes after contact ends | 7 seconds | Near real-time; current day |
| Dispositions | Disposition categories and performance data | 4 hours; new dispositions may take up to 24 hours to appear | Not stated in this widget section | 25 months |

## Agent Contact View

- Displays real-time agent states, highlighting After Call Work (ACW) and Unavailable time, with time spent in those states and other state details for the current day.
- Available columns: Agent Name, Contact No, Skill, Channel, Agent Contact State, and Agent Contact State Time. Agent Name and Agent Contact State are mandatory and cannot be hidden.
- Options include selecting columns, auto-sizing a column or all columns, and filtering. Column size, sort, filter, and arrangement can be personalized and saved.
- Columns can be sorted; hold Shift while sorting to add a secondary sort.
- Refresh: data 7-10 seconds; widget 7 seconds; near real-time.

## Agent State Counter

- Shows the different states of signed-in agents for the current day, the number of agents in each state, and the total signed-in agents.
- Opens in Chart view. Widget Display can change it to Table or Table and Chart side by side. Hovering over pie-chart state colors displays the percentage of agents in that state.
- The documented state descriptions include Available (prepared to handle contacts), Working Contacts & Dialer (includes agents actively handling a contact and agents in ACW), Logged Out, Unavailable, Available & Dialer, and Working Contacts (includes active contacts and ACW). Consult the source for the complete current legend.
- Widget Settings can filter the data. The page does not enumerate every available setting value in its text.
- Refresh: data 7-10 seconds; widget 7 seconds; near real-time.

## Agent List

- Shows agents' current state and active-session information. Agents are grouped by similar state; the list covers the selected day and summarizes total time spent in each state.
- Expanding an agent contact group exposes Skill, Channel, Agent Contact State, Agent Contact Time, and Contact Number.
- Expand All opens only groups with agents in targeted states (examples in the documentation include Working Contacts & Dialer, Unavailable, or Custom Unavailable). Collapse All closes every group; individual groups can still be expanded or collapsed.
- Supports sorting and filtering by agent state. To retain grouping by state, remove column sorting. Widget Display supports Table, Chart, or Table and Chart.
- Viewer table-display changes are saved to personal settings. Later dashboard-owner changes override those personal settings.
- The options menu beside an agent provides Agent State Details and Give Reward options.
- Widget Settings can filter the data. The page does not enumerate every available setting value in its text.
- Refresh: data 7-10 seconds; widget 7 seconds; near real-time.

## Agent State Summary

- Shows agent states for a selected duration, including the percentage and duration spent in each state. Totals show total duration and the sum of state percentages.
- Can show percentage and total duration for each unavailable state, such as break, lunch, or meeting.
- Widget Settings can filter the data.
- Data refreshes 5-10 minutes after an agent state ends; widget refresh is 5 minutes; historical duration support is 90 days.

## Contact States by Skill

- Shows states of contacts currently active in the system, grouped by skill.
- The documented contact-state groups are:
	- **InQueue:** customer is waiting in a queue for an agent or system response.
	- **With Agent:** customer is engaged with an agent, including handling, hold, or conference.
	- **PostQueue:** after-queue states such as transfers or escalations before an agent takes over.
	- **PreQueue:** before-queue states such as IVR and pre-routing.
	- **OutQueue:** outbound states such as dialing, connecting, or handling calls.
- Widget Settings can filter the data.
- Refresh: data 7-10 seconds; widget 7 seconds; near real-time.

## Contact List

- Shows active (not closed) contacts, their states and time in state, skill, handling agent, and channel.
- Shows all active contacts when there are fewer than 10,000. Above 10,000, it shows the 10,000 most recently updated contacts first.
- Selecting Contact ID opens a contact zoom with the contact's states, start time, and duration. Ongoing contact-zoom data refreshes in 5-7 seconds.
- The Columns option includes examples: Contact No, State Name, Contact Date, State Time, Contact Time, Agent Name, Skill Name, Campaign Name, Channel, Company#, Customer #, Direction, and Interaction Id. Widget Settings can filter the data.
- Refresh: data 7-10 seconds; widget 7 seconds; near real-time.

## Interaction Summary

- Shows completed interactions, one row per interaction, with attributes such as interaction ID, contact number, channel, skill, and timing.
- Expanding an interaction opens CXone Interaction Details, with header/timeline information and transcript or recording when available. Transcripts are currently supported only for digital channels.
- The details view can include CXone Recording when available. Availability is not guaranteed for every interaction.
- Column examples: Interaction ID, Contact No, Channel, Skill, Agent, Start Time, End Time, and Duration. Options include column selection, auto-size, filtering, and saved column size/sort/filter/arrangement. Shift-sort supports secondary sorting.
- Data refreshes 5-10 minutes after an interaction ends; widget refresh is 5 minutes. The widget is historical; this section does not state a specific duration range.

## Service Level

- Shows the percentage and number of contacts for a particular skill that met or did not meet the defined service-level threshold for the current day.
- Includes only ended contacts. Data updates once a contact ends; live contacts are excluded from the widget and from InSLA/OutSLA calculations.
- Opens in Chart view. Widget Display can change it to Table or Table and Chart side by side. Widget Settings can filter the data.
- Data and widget refresh are both 90 seconds; historical duration support is 1 day.

## Queue Counter

- Shows the current number of contacts in queue and the longest duration a contact has waited to connect to an agent.
- Longest waiting time is measured from entry into the contact's current state. It is not the total time the contact has spent waiting. The timer resets when the contact moves to a new state, so a contact may have waited longer overall than the displayed value.
- Widget Settings can filter the data. The documented use is to help decide whether to increase agent coverage or allow agents more time with customers.
- Refresh: data 7-10 seconds; widget 7 seconds; near real-time.

## Callback Requests

- Shows current-day callback interactions and their status: In Queue (callback requested but not yet made), Successful (connected with an agent), and Failed (for example, busy signal or no customer response).
- Opens in Chart view. Widget Display can change it to Table or Table and Chart side by side. Widget Settings can filter the data.
- In-queue data refresh is 7-10 seconds. Successful/failed data refreshes 5-10 minutes after the contact ends. Widget refresh is 7 seconds; duration support is near real-time/current day.
- Do not infer that a 7-second widget refresh makes completed outcome data available in 7 seconds.

## Dispositions

- Organizes customer interactions into disposition categories to support performance analysis.
- Data refresh is 4 hours; duration support is 25 months. New dispositions can take up to 24 hours to appear.
- Widget Display supports Table, Chart, or Table and Chart. Column examples include Disposition, Disposition %, Handled, and AHT. Widget Settings can filter data.
- The page includes a Permissions and license heading for this widget. Confirm current tenant permission/license requirements in the live documentation and tenant; do not infer them from the heading alone.
- This widget section does not state a separate widget-refresh interval.

## Test Authoring Rules

- Test only documented columns, chart/table options, and behavior, or label additional assertions as product requirements or tenant observations.
- Refresh validation must distinguish source-data update time from widget refresh time. Use test data and timing tolerances appropriate to the selected widget.
- For state/data totals, use controlled test fixtures and verify the metric definition. In particular, do not assert Queue Counter as total end-to-end wait time.
- Historical range depends on license. Confirm license and supported date range before asserting a period.
- Recheck the source page before producing tests; this catalog is a dated summary, not a substitute for the current official documentation.
