# Zero-Shot Prompting – Practical QA Demo

## 1. What is Zero-Shot Prompting?

**Zero-Shot Prompting means asking AI to perform a task without providing any examples.**

You simply give AI an instruction, and AI generates the response using its existing knowledge.

### Simple Example 1

Imagine you are a QA Engineer testing a login page.

You ask AI:

Vague Prompt: ```Write test cases for login page.```   

Refinement Steps:
```
- Add role: "You are a QA Engineer working on an e-commerce site."   
- Specify functionality: "Write test cases for valid login, invalid login, and forgot password features."
- Add constraints: "Include at least 2 negative scenarios for each feature, cover browser compatibility (Chrome, Firefox)."
- Add format: "Provide results in a table with columns - Test Case ID, Title, Steps, Expected Result."
- Add prioritization: "Mark each test case with priority as High, Medium, or Low."
```

### Simple Example 2

Imagine you are a QA Engineer testing a login page.

You ask AI:

```text
Generate 5 test scenarios for a login page.
Include positive and negative scenarios.
```

AI generates test scenarios without you providing any sample test cases.

### Remember

**Zero-Shot = Instructions only, without examples.**

---

## 2. Practical Demo Using NiCE CXone Dashboard

For our practical examples, we will use the **NiCE CXone Dashboard** as our sample application.

Official documentation:

https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm

### Scenario: Testing Dashboard Widget Functionality

Imagine you are a QA Engineer testing the NiCE CXone Dashboard.

Users can work with dashboards and widgets. For example, they can add widgets, arrange them, resize them and configure available widget settings.

You want AI to generate test scenarios for this functionality.

### Step 1: Write a Prompt

Open ChatGPT or Claude and provide the following prompt:

**Prompt:**

```text
Act as a Senior QA Engineer.

I am testing the NiCE CXone Dashboard application.

Generate 10 test scenarios for dashboard widget functionality.

Consider the following areas:

1. Adding a widget to a dashboard.
2. Adding multiple widgets.
3. Resizing widgets.
4. Moving widgets to different positions.
5. Configuring available widget settings.
6. Applying supported Team and Skill filters.
7. Validating data displayed in widgets.
8. Checking user access permissions.

For each scenario, provide:

- Test Case ID
- Test Scenario
- Expected Result
- Priority

Include positive and negative scenarios.

Present the output in a table.
Clearly mention any assumptions.
Do not invent functionality that is not supported by the application.
```

**Important:** Notice that we have not provided any sample test cases to AI. We have only provided instructions and application context.

This is Zero-Shot Prompting.

---

### Step 2: Understand the AI Response

AI may generate an output similar to the following:

| Test Case ID | Test Scenario | Expected Result | Priority |
|---|---|---|---|
| TC01 | Add an available widget to a dashboard. | The selected widget should be added successfully. | High |
| TC02 | Add multiple widgets to a dashboard. | All selected widgets should be displayed. | Medium |
| TC03 | Resize a widget. | The widget should resize as supported by the interface. | Medium |
| TC04 | Move a widget to another position. | The widget should appear in the selected position. | Medium |
| TC05 | Open widget settings. | Available configuration options should be displayed. | High |
| TC06 | Change a supported Team filter. | Widget data should reflect the selected Team. | High |
| TC07 | Change a supported Skill filter. | Widget data should reflect the selected Skill. | High |
| TC08 | Access data outside the user's permissions. | Unauthorized data should not be displayed. | Critical |
| TC09 | Open a shared dashboard. | Dashboard access should follow the configured sharing permissions. | High |
| TC10 | Check widget behavior when the user lacks access to its configured data. | Restricted data should not be exposed. | Critical |

*Note: These are illustrative test ideas. Validate actual functionality, permissions, and configuration options against your CXone environment and official documentation.*

---

## 3. Why Is This Zero-Shot Prompting?

Let's understand what we provided to AI:

| Element | What We Provided |
|---|---|
| Role | Senior QA Engineer |
| Context | NiCE CXone Dashboard |
| Task | Generate test scenarios |
| Coverage | Widget management, settings, filters and permissions |
| Format | Structured table |
| Expectations | Positive and negative scenarios |

We did not provide any sample test case or sample output.

We simply instructed AI about what we wanted.

That is why it is called Zero-Shot Prompting.

---

## 4. Another Practical Example: Dashboard Data Refresh

Let's take another functionality of NiCE CXone Dashboard.

The documentation describes different refresh behavior for near-real-time and historical widgets.

### Prompt

```text
Act as a QA Engineer.

I am testing the NiCE CXone Dashboard.

Generate 8 test scenarios to validate dashboard widget
data refresh behavior.

Consider:

1. Near-real-time widget refresh.
2. Historical widget refresh.
3. Data updates after refresh.
4. Dashboard monitoring.
5. Data availability.
6. Potential data refresh failures.

For each scenario, provide:

- Test Case ID
- Test Scenario
- Test Steps
- Expected Result
- Priority

Include positive, negative and boundary scenarios.

Mention assumptions separately.
```

AI can generate test ideas based on these instructions.

You should verify exact refresh intervals and other product-specific behavior against the official documentation.

---

## 5. When Should a QA Engineer Use Zero-Shot Prompting?

Zero-Shot Prompting is useful when:

1. You need quick test scenarios.
2. You want an initial set of test cases.
3. You want to analyze a new functionality.
4. You need a first draft of a testing strategy.
5. You want AI to suggest possible testing areas.

### Advantages

- Easy to write.
- No examples are required.
- Saves time in generating initial test ideas.
- Useful for straightforward QA activities.

### Limitation

AI may generate generic or incomplete test scenarios.

Therefore, always validate AI-generated results against actual application behavior and requirements.

---

## 6. Practice Assignment

Try this exercise yourself.

**Application:** NiCE CXone Dashboard

**Feature:** Dashboard Widget Configuration

### Your Task

Write a Zero-Shot prompt asking AI to generate test scenarios covering:

1. Widget configuration.
2. Available filters.
3. Data displayed in widgets.
4. Invalid configurations, where applicable.
5. User permissions.

### Your Objective

- Do not provide any sample test cases.
- Give only instructions to AI.
- Ask AI to generate at least 10 test scenarios.
- Review the output and identify missing scenarios.

---

## 7. Key Takeaways

| Question | Answer |
|---|---|
| What is Zero-Shot Prompting? | Asking AI to perform a task without examples. |
| Do we provide sample test cases? | No. |
| Do we provide instructions? | Yes. |
| Can we provide application context? | Yes. |
| When should we use it? | For quick tasks and initial test ideas. |

### Remember This Formula

**Zero-Shot Prompting = Instructions + Context → AI Response**

No examples are provided to AI.

---

## Official Documentation

- [NiCE CXone Dashboard](https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm)

Always refer to the official documentation to validate product functionality before finalizing your test scenarios.
