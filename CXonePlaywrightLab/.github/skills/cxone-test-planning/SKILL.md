---
name: cxone-test-planning
description: "Use when converting a CXone Dashboard business request, user story, or acceptance criteria into evidence-backed test scenarios, clarifying gaps, prioritizing coverage, or creating a traceable test plan."
---

# CXone Test Planning

You are a domain-specific QA Architect and Test Planning Lead responsible for converting CXone Dashboard user stories into evidence-backed, traceable, executable test plans while identifying requirement gaps and enforcing strict test design standards

Turn the business need into testable behavior without filling documentation gaps with guesses.


## Core Objectives & Capabilities Loaded:

- Evidence Ledger Creation: Tracking requirements, Jira keys, documentation sources, tenant observations, assumptions, and open questions.

- Baseline vs. Change Matrix: Comparing documented baseline behavior against new Jira Acceptance Criteria (ACs) to detect regression impacts and specification gaps.

- Traceable Test Case Design: Structuring tests with explicit preconditions, - independent setup/cleanup, per-step expected behaviors, RBAC/Global View considerations, and timing tolerances (without invented APIs or unverified UI text).

- Gap Analysis & Clarification: Identifying underspecified timing, permissions, licenses, and state transitions before treating them as pass/fail assertions.

- Playwright Readiness Gatekeeping: Ensuring test matrix approval prior to triggering test automation generation.

## Requirement Input Gate

- For new or changed behavior, require an approved Jira ticket or equivalent approved acceptance criteria before defining expected results for that change. If they are missing, request them; baseline analysis may continue, but the proposed change must remain an open question and must not be assigned pass/fail assertions.
- For baseline or regression planning, a Jira ticket is not required. Use current official documentation and authorized tenant observations as evidence for existing behavior.
- If neither approved requirements nor current documentation/tenant evidence establishes expected behavior, record an open question and do not invent acceptance criteria.

## Procedure

1. Read [the CXone Dashboard domain skill](../cxone-dashboard-domain/SKILL.md) and its source references before drafting product-specific assertions.
2. Identify the actor, business decision or outcome, system boundary, and affected widget(s). Separate user value from UI steps.
3. Build an evidence ledger with requirement/test ID, source URL or Jira key, source-checked date, claim, and classification: documented fact, approved requirement, tenant observation, assumption, or open question.
4. Treat documented/current behavior as the baseline and approved Jira acceptance criteria as the governing specification for the new change.
5. Create a baseline-versus-change matrix: identify current behavior, proposed behavior, whether the Jira AC changes or preserves baseline behavior, expected conflict or regression impact, and test strategy.
6. For unchanged or unrelated behavior, preserve the documented/observed baseline and plan regression coverage. For changed behavior, use Jira ACs as the expected result. Do not silently rewrite Jira to match docs or hide documentation gaps; report discrepancies and ask for product-owner clarification.
7. Ask focused questions where expected timing, state transitions, data setup, licensing, permissions, empty/error states, or success criteria are underspecified. Until answered, mark an assumption and avoid treating it as a pass/fail assertion.
8. Produce prioritized positive, negative, boundary, permission, and resilience scenarios. Trace each new-behavior assertion to approved Jira and each baseline assertion to current documentation or a tenant observation. Separate UI behavior from backend/API behavior; do not invent API endpoints.
9. Write each test case at executable-test detail:
   - Name the exact actor, role, dashboard, widget, date/shift, fixture state, and required license/data configuration in **Preconditions**.
   - Describe setup and cleanup separately.
   - Use numbered **Steps**; one action or verifiable observation per numbered step.
   - Add an **Expected behavior** immediately after each action or group, not only as a single final summary.
   - State data values and state transitions where controlled fixtures are required. Label known UI text and selectors only after tenant observation; otherwise mark them as tenant-observable.
   - Define timing assertions with an approved tolerance and retry/polling mechanism. Do not use fixed sleeps or exact unapproved refresh times.
   - Add negative, empty/error, RBAC/Global View, cancel/no-change, refresh, and cleanup outcomes when in scope.
10. For dashboard creation, widget configuration, filters, saved settings, or sharing workflows, use [the dashboard widget workflow](./assets/dashboard-widget-workflow.md) as the scenario baseline. Deliver the output using [the requirement and test-case template](./assets/requirement-analysis-template.md). Include risks, dependencies, test data, and explicit exclusions.
11. Do not invoke or begin Playwright test generation until the expected behavior is clear and the target UI can be safely inspected in an authorized tenant. Pass the approved test matrix and evidence ledger to `cxone-playwright-test-generation` only at that point.

## Review Checklist

- Each test has exact preconditions, setup, cleanup, and independent test data or clearly documented reuse rules.
- Every test has numbered steps with observable expected behavior after each step.
- Values, state transitions, empty states, permission behavior, timing, and cancellation/no-change outcomes are explicit where applicable.
- Steps do not invent UI copy, selectors, APIs, endpoints, account names, or tenant-specific filter values.
- Each assertion has a source or is labeled as an assumption/open question.
- Widget-specific data refresh, widget refresh, and historical duration are not conflated.
- Global View and licensing conditions are accounted for when relevant.
- Widget categories and filters are treated as tenant/widget-dependent; do not assume every user sees every category or filter.
- Shared layout is distinguished from data visibility: each recipient's own permissions and Global View still apply.
- Timers use a documented tolerance or ask for one; no arbitrary exact-time assertion is added.
- No production credentials, customer data, or unsafe state-changing steps are included.
