# Chain-of-Thought Prompting – Practical QA Demo

## 1. What is Chain-of-Thought Prompting?

**Chain-of-Thought Prompting means asking AI to analyze a problem systematically, step by step, before providing a final answer.**
**What it means in simple words: Instead of asking the AI to give you the final answer immediately, you explicitly ask it to think step-by-step.**
**Why it works: It forces the AI to show its logic, which reduces mistakes (hallucinations) and lets you verify if its reasoning is correct.**

In simple words:

Instead of asking AI to directly give you an answer, you ask it to break a complex problem into smaller parts, analyze them, and provide a conclusion.

### Simple Example

Imagine you are testing an online shopping application.

You ask AI:

```text
Why might a payment fail?
```

AI may give you a few general reasons.

Instead, ask:

```text
Act as a Senior QA Engineer.

Analyze the payment failure scenario systematically.

Consider:
1. Payment initiation.
2. Payment authorization.
3. Payment processing.
4. Payment gateway response.
5. Order confirmation.

For each stage, identify possible failures,
their impact and suggested test scenarios.

Present the results in a table.
```

Now AI provides a more structured analysis.

### Remember

**Chain-of-Thought = Ask AI to analyze a problem systematically before giving the final answer.**

---

## 2. Practical Demo Using NiCE CXone Dashboard

For our practical examples, we will use **NiCE CXone Dashboard** as our sample application.

Official documentation:

https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm

### Scenario: Dashboard Widget Is Not Refreshing

Imagine you are working as a QA Engineer for NiCE CXone.

During testing, you notice that a dashboard widget is not displaying updated information.

You want to investigate why the widget is not refreshing as expected.

Instead of asking AI only for possible reasons, you want AI to analyze the problem systematically.

---

## 3. Step-by-Step Practical Demo

### Step 1: Understand the Application Behavior

According to the NiCE CXone Dashboard documentation:

- Near Real-Time (NRT) widgets can refresh as quickly as every 7 seconds.
- Historical widgets refresh between 15 and 30 minutes.
- Dashboards enter sleep mode after 20 minutes of inactivity (except wallboard projections).

These are important details when investigating a refresh issue.

### Step 2: Write a Chain-of-Thought Prompt

Copy the following prompt into ChatGPT or Claude:

**Prompt:**

```text
Act as a Senior QA Architect with experience in
testing enterprise SaaS applications.

I am testing the NiCE CXone Dashboard application.

Problem Statement:

A dashboard widget is not displaying updated information.

According to the product documentation:
- Near Real-Time widgets can refresh as quickly as every 7 seconds.
- Historical widgets refresh between 15 and 30 minutes.
- Dashboards enter sleep mode after 20 minutes of inactivity,
  except wallboard projections.

Analyze this problem systematically.

Follow these steps:

Step 1:
Identify the different types of dashboard widgets.

Step 2:
Explain the expected refresh behavior for each widget type.

Step 3:
Identify possible reasons why the widget may not
display updated information.

Step 4:
Suggest troubleshooting checks for each possible reason.

Step 5:
Generate positive, negative and boundary test scenarios.

Step 6:
Prioritize the test scenarios based on risk.

Present the results in separate tables.

Clearly distinguish documented product behavior
from assumptions and possible causes.
Do not invent unsupported product functionality.
```

**Important:** Notice that we are asking AI to analyze the problem through multiple steps rather than simply providing a list of test cases.

This is a Chain-of-Thought style prompting technique.

---

### Step 3: Understand the Expected AI Response

AI may provide a structured response similar to the following.

#### A. Understand the Expected Behavior

| Widget Type | Expected Refresh Behavior |
|---|---|
| Near Real-Time Widget | Can refresh as quickly as every 7 seconds. |
| Historical Widget | Refreshes between 15 and 30 minutes. |

#### B. Identify Possible Causes

| Possible Cause | What QA Should Check |
|---|---|
| Wrong widget type | Verify whether the widget is Near Real-Time or Historical. |
| Expected refresh interval not reached | Check whether enough time has passed for the widget's documented refresh cycle. |
| Dashboard inactivity | Check whether the dashboard has entered sleep mode. |
| Data availability | Verify whether new data is available in the source application. |
| Widget configuration | Review the available widget settings and selected filters. |

*Note: These are troubleshooting hypotheses, not confirmed product defects. Validate them in the actual environment.*

#### C. Generate Test Scenarios

| Test Case ID | Test Scenario | Expected Result | Priority |
|---|---|---|---|
| TC001 | Verify Near Real-Time widget refresh behavior. | Widget should update according to its documented refresh behavior. | High |
| TC002 | Verify Historical widget refresh behavior. | Widget should refresh according to its documented refresh interval. | High |
| TC003 | Verify dashboard behavior after 20 minutes of inactivity. | Dashboard should enter sleep mode as documented, except wallboard projections. | High |
| TC004 | Verify widget data after the dashboard becomes active again. | Validate that the widget resumes displaying current available data. | High |
| TC005 | Verify widget data after changing supported filters. | Widget should display data according to the selected configuration. | Medium |
| TC006 | Verify widget behavior when no new source data is available. | Widget should not be expected to show new data when no new source data exists. | Medium |

*The expected results above are test expectations to validate in your environment, not guarantees of behavior for every widget.*

---

## 4. Why Is This Chain-of-Thought Prompting?

Let's understand what we asked AI to do.

| Step | What AI Was Asked to Do |
|---|---|
| Step 1 | Identify widget types. |
| Step 2 | Understand refresh behavior. |
| Step 3 | Identify possible causes. |
| Step 4 | Suggest troubleshooting checks. |
| Step 5 | Generate test scenarios. |
| Step 6 | Prioritize scenarios. |

Instead of asking AI for a direct answer, we asked it to approach the problem systematically.

This helps produce a more organized and useful response.

---

## 5. Another Practical Example: Release Risk Analysis

Imagine you are a QA Architect preparing for a release.

You have the following information:

- 100 test cases executed.
- 85 passed.
- 10 failed.
- 5 blocked.
- 3 critical defects are still open.

You want AI to analyze the release risks.

### Prompt

```text
Act as a Senior QA Architect.

I am preparing for a product release.

Here is the testing status:

Total test cases: 100
Passed: 85
Failed: 10
Blocked: 5
Open Critical Defects: 3

Analyze the release readiness systematically.

Step 1:
Calculate the test execution and pass percentages.

Step 2:
Identify the major quality risks.

Step 3:
Explain the potential business impact.

Step 4:
Suggest additional testing or investigation.

Step 5:
Prepare a release readiness assessment.

Present the result in a structured table.

Do not make the final release decision.
Clearly mention missing information and assumptions.
```

### What Can AI Help You Identify?

- Test execution percentage.
- Pass percentage.
- Failed and blocked test impact.
- Risk associated with open critical defects.
- Additional testing recommendations.
- Information required before release readiness can be assessed.

**Important:** AI can provide a release readiness assessment, but the final release decision should follow your organization's governance process.

---

## 6. When Should a QA Engineer Use Chain-of-Thought Prompting?

It is useful when:

1. Analyzing complex requirements.
2. Investigating production defects.
3. Performing root cause analysis.
4. Preparing risk-based testing strategies.
5. Analyzing release readiness.
6. Identifying gaps in test coverage.
7. Evaluating complex business workflows.

### Advantages

- Encourages structured problem analysis.
- Helps break complex problems into smaller tasks.
- Produces organized outputs.
- Helps identify possible risks and missing information.
- Supports better QA decision-making.

### Limitation

A step-by-step response does not guarantee that AI's analysis is correct.

Always validate its assumptions, calculations and recommendations against actual application behavior and evidence.

---

## 7. Practice Assignment

**Application:** NiCE CXone Dashboard

**Feature:** Dashboard Data Refresh

### Your Task

Imagine you have received a customer complaint:

"The dashboard is showing outdated agent information."

Write a prompt asking AI to:

1. Understand the problem.
2. Identify possible reasons.
3. Separate documented behavior from assumptions.
4. Suggest troubleshooting steps.
5. Generate test scenarios.
6. Prioritize the scenarios.

### Objective

Learn how to use AI for systematic investigation instead of simply asking it to generate test cases.

---

## 8. Zero-Shot vs Few-Shot vs Chain-of-Thought

| Technique | What You Do | QA Example |
|---|---|---|
| Zero-Shot | Give instructions without examples. | Generate 10 dashboard test cases. |
| Few-Shot | Give a few examples first. | Generate test cases using an existing test case format. |
| Chain-of-Thought | Ask AI to analyze a problem systematically. | Investigate why dashboard data is not refreshing. |

---

## 9. Key Takeaways

| Question | Answer |
|---|---|
| What is Chain-of-Thought Prompting? | Asking AI to approach a problem systematically. |
| Do we provide examples? | Not necessarily. |
| What is the main purpose? | Structured analysis of complex problems. |
| When should we use it? | Root cause investigation, risk analysis and complex QA tasks. |

### Remember This Formula

**Problem + Structured Analysis Steps → AI Response**

The goal is to get a well-organized explanation, supporting evidence, assumptions and conclusions.

---

## Official Documentation

[NiCE CXone Dashboard – Official Documentation](https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm)

Always validate AI-generated recommendations against the official product documentation and actual application behavior.