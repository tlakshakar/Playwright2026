# Prompt Examples

Use these as starting points. Attach the current story and relevant source excerpts; never ask the model to rely on memory for product behavior.

## Extract Documentation Evidence

> Read the current official CXone Dashboard and ACD Widgets documentation at these URLs: [URLs]. For [widget(s)], create a table of exact documented behavior, including data refresh, widget refresh, historical duration, permissions/licensing, and supported interactions. Include a short source excerpt or section and the date checked for each claim. Separate documented facts from inferences. List contradictions and open questions. Do not invent features or selectors.

## Turn a Business Story into Tests

> Use the attached business story and the evidence ledger. First summarize the business outcome and actor. Then identify unsupported claims and ask the minimum questions needed to make them testable. Draft prioritized UI scenarios with requirement traceability, preconditions, steps, and observable expected results. Label every assumption. Distinguish UI polling from source-data freshness. Do not invent API endpoints or exact timing tolerance.

## Explore an Authorized UI with MCP

> Using the available Playwright MCP tools, inspect [workflow/widget] in the authorized non-production CXone tenant. Begin read-only. Report the visible structure, accessible roles/names, labels, and test IDs that are actually observed. Do not guess selectors or modify dashboard state. Record uncertainty and update the selector inventory without including credentials or personal data.

## Generate a Playwright Test

> Generate a Playwright Test for [approved case IDs] using the observed selector inventory and existing project conventions. Cite the requirement IDs each assertion covers. Use retrying assertions and an approved refresh tolerance. Do not add unsupported assertions, fixed sleeps, credentials, or invented locators. If the evidence is insufficient, list the missing information instead of producing speculative test code.
