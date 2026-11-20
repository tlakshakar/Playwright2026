---
name: cxone-dashboard-domain
description: "Use when analyzing NiCE CXone Dashboard or ACD widgets, checking widget refresh and historical-data behavior, understanding Global View restrictions, or verifying whether a proposed test matches current product documentation."
user-invocable: false
---

# CXone Dashboard Domain

Use official documentation as the product authority. This skill contains source-linked notes, not a guarantee that every tenant has the same licenses, configuration, or data.

## Product Context

User-provided summary: CXone consolidates data from its applications into configurable widget-based dashboards for supervisors and managers, including charts, tables, KPI displays, and customer-sentiment data.

Treat this as orientation, not as evidence that a specific widget, visualization, metric, sentiment field, or application integration is available. Verify widget-level claims in current official documentation and tenant-specific claims in an authorized environment.

## Source Authority

- Documented/current behavior is the **baseline**: use current official CXone documentation and, when relevant, an authorized tenant observation to describe behavior that is already in effect.
- Approved Jira acceptance criteria govern a **new or changed behavior**. A Jira criterion supersedes stale or general documentation for the feature it explicitly defines, but does not rewrite unrelated baseline behavior.
- New behavior and baseline behavior must remain separate. If Jira conflicts with current docs or observed behavior, record the conflict and test both: the new criterion and the baseline/regression impact.
- Tenant observations do not prove product-wide behavior. Confirm tenant-specific licenses, role behavior, Global View restrictions, widgets, filters, and data configuration separately.

## Procedure

1. Read [the ACD widget catalog](./references/acd-widget-catalog.md) and [dashboard access and freshness notes](./references/access-and-freshness.md).
2. Before making a baseline product claim, revisit the linked official page and note the date checked. Cite the section or exact statement that supports the claim.
3. Label each item as one of: documented fact, approved requirement, tenant observation, assumption, or open question. Never convert an assumption into a documented product fact or approved Jira criterion.
4. Keep data freshness separate from widget refresh interval and historical duration. Do not generalize one widget's behavior to another.
5. For a test request, load `cxone-test-planning` to create a baseline-versus-change matrix. Load `cxone-playwright-test-generation` only after the expected behavior is clear and the target UI can be safely inspected.
6. If a claim depends on a tenant license, Global View, role, setting, or data configuration, state that dependency and request authorized tenant confirmation.

## Guardrails

- Do not invent widget names, fields, selectors, endpoints, refresh guarantees, or permission behavior.
- Documentation establishes current/baseline product behavior; approved Jira acceptance criteria establish the explicitly requested new or changed behavior.
- Playwright MCP observation establishes only what was visible in the inspected tenant at that time and is not a substitute for approved requirements or documentation.
- Do not expose credentials, tokens, personal data, or production-only data in output.
