# **Four Important Concepts of Prompt Engineering**

These four concepts help you understand how to give instructions to AI more effectively. Let's understand each concept with simple explanations and practical QA examples.

## **1. Zero-Shot Prompting**

**Meaning:** Asking AI to perform a task without providing any examples.

You directly tell AI what you want, and AI uses its existing knowledge to generate the response.

**Simple example:**

```
Generate 10 test cases for a login page.
Include positive and negative scenarios.
```

**What happens?**

AI generates test cases without you showing it any sample test cases.

**QA practical example:**

You are testing a login page and want AI to generate test scenarios.

```
Act as a Senior QA Engineer.

Generate test scenarios for a login page covering:
1. Valid login
2. Invalid password
3. Empty username
4. Empty password
5. Account lockout

Provide Scenario ID, Scenario Description and Expected Result.
```

**When to use it?**

- When the task is simple.
- When you don't have sample outputs.
- When you want quick results.



Remember

&#x20;Zero-shot = Instruction only, no examples.



## **2. Few-Shot Prompting**

**Meaning:** Providing AI with a few examples before asking it to perform a task.

You show AI the format or pattern you expect, and AI follows that pattern for new inputs.

**Simple example:**

Suppose you want AI to generate test cases in a particular format.

First, provide a sample:

```
Example 1:

Input:
Feature: Login with valid credentials

Output:
Test Case: Verify login with valid credentials
Expected Result: User should successfully log in.

Example 2:

Input:
Feature: Login with invalid password

Output:
Test Case: Verify login with invalid password
Expected Result: Error message should be displayed.
```

Now give AI a new task:

```
Follow the same format used in the examples.

Generate test cases for:
1. Empty username
2. Empty password
3. Account lockout
```

**What happens?**

AI understands your expected format from the examples and generates similar outputs.

**When to use it?**

- When you need a consistent test case format.
- When your organization follows a specific documentation standard.
- When you want AI to follow your existing testing patterns.



Remember

&#x20;Few-shot = Instruction + A few examples.



## **3. Chain-of-Thought Prompting**

**Meaning:** Asking AI to approach a problem step by step rather than jumping directly to the final answer.

In QA, this is useful when analyzing complex requirements, identifying risks, or designing testing strategies.

**Simple example:**

Instead of asking:

```
Identify risks in an online payment application.
```

Ask:

```
Act as a Senior QA Architect.

Analyze the online payment functionality systematically.

Consider:
1. Payment initiation
2. Payment authorization
3. Payment processing
4. Payment failure
5. Payment confirmation
6. Refund processing

For each area:
- Identify possible failure scenarios.
- Explain the potential customer impact.
- Suggest appropriate testing approaches.
- Prioritize the risks.

Present the findings in a table.
```

**What happens?**

AI works through the different parts of the problem and provides a structured analysis.

**When to use it?**

- Complex requirement analysis.
- Risk-based testing.
- Root cause investigation.
- Test strategy preparation.
- Release readiness assessment.



Remember

&#x20;Chain-of-Thought = Ask AI to analyze systematically, step by step.



*Note: You don't need to ask AI to reveal its private internal reasoning. Ask for a concise explanation, assumptions, evidence, and conclusions.*

## **4. Iterative Prompting**

**Meaning:** Improving AI's response by asking follow-up questions and refining the instructions.

You don't expect the perfect answer in the first attempt. You gradually improve the result.

**Practical QA example:**

Prompt 1 — Initial request

**You:**

Generate test cases for an online shopping application's checkout functionality.

AI response

AI generates basic checkout test cases covering address, payment and order confirmation.

Prompt 2 — Improve coverage

**You:**

Your test cases are good, but you missed negative scenarios. Add invalid payment details, insufficient balance and network failure scenarios.

AI response

AI adds negative test scenarios.

Prompt 3 — Improve further

**You:**

Now identify boundary conditions, duplicate payment scenarios and cases where payment succeeds but order creation fails.

Final outcome

You get more comprehensive checkout test coverage through multiple interactions.

**When to use it?**

- When the initial AI response is incomplete.
- When you need better test coverage.
- When preparing a detailed test strategy.
- When reviewing test cases or test plans.



Remember

&#x20;Iterative = Ask → Review → Refine → Improve.



## **5. Quick Comparison**

| Concept          | What you provide to AI                   | Main purpose           |
| ---------------- | ---------------------------------------- | ---------------------- |
| Zero-Shot        | Instructions only                        | Get a quick response   |
| Few-Shot         | Instructions + Examples                  | Get consistent output  |
| Chain-of-Thought | A problem with structured analysis steps | Solve complex problems |
| Iterative        | Initial prompt + Follow-up prompts       | Improve the response   |

## **6. When Should a QA Engineer Use Which Technique?**

Consider this real-world example: You need to test a payment application.

- **Zero-Shot:** Generate 10 payment test cases.
- **Few-Shot:** Generate payment test cases using your organization's existing test case format.
- **Chain-of-Thought:** Analyze the payment workflow systematically and identify potential failure points and risks.
- **Iterative:** Generate payment test cases, review them, identify missing scenarios and ask AI to improve coverage.

### **Practice Assignment**

Try these four prompts in ChatGPT or Claude using the same feature: **Online Shopping Checkout**.

Your objective is to understand how the output changes with each prompting technique.

**My recommendation:** Learn these four techniques practically rather than just memorizing their definitions. They are useful foundations for using AI in day-to-day QA activities.