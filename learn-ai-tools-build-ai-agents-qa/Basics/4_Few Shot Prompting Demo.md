# Few-Shot Prompting – Practical QA Demo

## 1. What is Few-Shot Prompting?

**Few-Shot Prompting means providing AI with a few examples before asking it to perform a task.**
**Giving the AI a few examples of the exact format or style of output you want before asking it to generate something new.**

In simple words, you first show AI how you want the output to look. Then you give it a new task, and AI follows the same pattern.

### Simple Example

Imagine you want AI to generate test cases in a specific format.

Instead of simply asking:

```text
Generate test cases for a login page.
```

You first provide two sample test cases and then ask AI to generate more test cases using the same format.

### Remember

**Few-Shot = Instructions + Examples → AI Response**

---

## 2. Practical Demo Using NiCE CXone Dashboard

For our practical examples, we will use **NiCE CXone Dashboard** as our sample application.

Official documentation:

https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm

### Scenario: Testing Dashboard Widget Functionality

Imagine you are a QA Engineer testing the NiCE CXone Dashboard.

You want AI to generate test cases for adding and configuring dashboard widgets.

However, your organization follows a specific test case format.

You want AI to follow that format.

This is where Few-Shot Prompting becomes useful.

---

## 3. Step-by-Step Practical Demo

### Step 1: Provide Examples to AI

First, provide two sample test cases.

**Prompt:**

```text
Act as a Senior QA Engineer.

I am testing the NiCE CXone Dashboard application.

Below are two examples of how I want my test cases to be written.

Example 1:

Test Case ID: TC001

Scenario: Verify that a user can add an available widget
to the dashboard.

Expected Result:
The selected widget should be added successfully
and displayed on the dashboard.

Priority: High


Example 2:

Test Case ID: TC002

Scenario: Verify that a user can resize a dashboard widget.

Expected Result:
The widget should resize according to the
supported dashboard layout options.

Priority: Medium
```

Notice that we have provided AI with two examples.

AI can now understand the expected structure and writing style.

### Step 2: Ask AI to Generate New Test Cases

Continue with the following instruction in the same conversation:

```text
Now generate 5 additional test cases for
NiCE CXone Dashboard widget functionality.

Consider these areas:

1. Moving a widget to another position.
2. Adding multiple widgets.
3. Opening widget settings.
4. Updating available widget configurations.
5. Validating widget data after changing a supported filter.

Follow exactly the same format as the two examples.

Continue the test case numbering from TC003.

Include the Expected Result and Priority for every test case.
```

### Step 3: Understand the Expected AI Response

AI may generate an output similar to this:

| Test Case ID | Scenario | Expected Result | Priority |
|---|---|---|---|
| TC003 | Verify that a user can move a widget to another position. | Widget should appear in the selected position. | Medium |
| TC004 | Verify that multiple widgets can be added to a dashboard. | All selected widgets should be displayed. | Medium |
| TC005 | Verify that a user can open widget settings. | Available widget settings should be displayed. | High |
| TC006 | Verify that a user can update supported widget configurations. | Updated configuration should be applied successfully. | High |
| TC007 | Verify that widget data changes after applying a supported filter. | Widget should reflect data according to the selected filter. | High |

*Note: These are illustrative test ideas. Verify actual widget capabilities and configuration options in your CXone environment and official documentation.*

---

## 4. Why Is This Few-Shot Prompting?

Let's understand what we provided to AI.

| Element | What We Provided |
|---|---|
| Role | Senior QA Engineer |
| Context | NiCE CXone Dashboard |
| Examples | Two sample test cases |
| Task | Generate five additional test cases |
| Format | Same format as the examples |
| Expectations | Continue numbering and maintain consistency |

The important difference is that we provided sample outputs before asking AI to generate new outputs.

AI learned the expected pattern from those examples.

That is why it is called Few-Shot Prompting.

---

## 5. Zero-Shot vs Few-Shot Prompting

Let's compare both techniques using the same QA requirement.

| Zero-Shot Prompting | Few-Shot Prompting |
|---|---|
| No examples are provided. | A few examples are provided. |
| AI generates output from instructions. | AI follows the pattern of the examples. |
| Useful for quick test ideas. | Useful for consistent test documentation. |
| Output format may vary. | Output format is easier to standardize. |

### Simple Comparison

**Zero-Shot:**

```text
Generate 5 test cases for dashboard widgets.
```

**Few-Shot:**

```text
Here are 2 sample test cases.

[Provide sample test cases]

Now generate 5 more test cases
using exactly the same format.
```

---

## 6. When Should a QA Engineer Use Few-Shot Prompting?

Few-Shot Prompting is useful when:

1. Your organization follows a standard test case template.
2. You want AI to generate test cases in a consistent format.
3. You have existing test cases and want AI to follow their structure.
4. You want consistent defect descriptions.
5. You want AI to follow a specific reporting format.
6. You want AI to generate test scenarios based on previously written examples.

### Practical QA Use Cases

| QA Activity | Few-Shot Application |
|---|---|
| Test Case Generation | Provide two sample test cases and ask AI to generate more. |
| Defect Reporting | Provide sample defect reports and ask AI to follow the same format. |
| Test Plan Creation | Provide a sample test plan structure. |
| Test Summary Reports | Provide an existing report as a formatting example. |
| Requirement Analysis | Provide examples of how requirement gaps should be documented. |

---

## 7. Practice Assignment

**Application:** NiCE CXone Dashboard

**Feature:** Dashboard Widget Management

### Your Task

1. Ask AI to generate two sample test cases for adding and resizing widgets.
2. Provide those test cases as examples.
3. Ask AI to generate five additional test cases.
4. Ask AI to maintain the same format and numbering.
5. Compare the generated test cases with the original examples.

### Challenge

Now try the same exercise for:

- Dashboard creation.
- Widget configuration.
- Supported Team and Skill filters.
- Dashboard data refresh.

### Objective

Understand how providing examples changes the structure and consistency of AI-generated output.

---

## 8. Key Takeaways

| Question | Answer |
|---|---|
| What is Few-Shot Prompting? | Giving AI a few examples before asking it to perform a task. |
| Do we provide examples? | Yes. |
| How many examples are required? | Usually a small number; there is no fixed number. |
| Why provide examples? | To show AI the expected pattern and format. |
| When should we use it? | When consistent and structured output is required. |

### Remember This Formula

**Few-Shot Prompting = Instructions + A Few Examples → AI Response**

---

## Official Documentation

[NiCE CXone Dashboard – Official Documentation](https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm)

**Important:** Examples teach AI the desired output pattern, but they do not guarantee that the generated test cases are technically correct or complete. Always validate them against actual product requirements and documentation.