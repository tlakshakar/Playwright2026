# Claude Code Skills - Setup from Scratch

This guide explains how to set up Claude Code and create the first Claude skill for an architect or QA engineer using Claude for the first time.

Claude Code is an AI coding agent that works in a terminal or integrated terminal. A **skill** teaches Claude reusable project knowledge and workflows. It is different from a normal chat prompt because Claude can discover and apply the skill automatically.

Practice application: [EventHub](https://eventhub.rahulshettyacademy.com/)

## Shell Convention

This guide uses Windows Command Prompt and PowerShell. Commands marked **Command Prompt or PowerShell** work in both shells. Commands marked **PowerShell only** require PowerShell syntax.

- Normal setup does **not** require an Administrator terminal.
- Open Command Prompt or PowerShell **as Administrator** only when a command explicitly requires elevated permissions, such as a system-wide installer blocked by Windows policy.
- Prefer the native application installer or a user-level npm installation when possible.
- Claude prompts such as `/init`, `/help`, and `/exit` run inside Claude Code, not in CMD or PowerShell.

## 1. Prerequisites

Install the following:

1. **VS Code** - Use VS Code as the integrated development environment.
2. **Node.js 18 or newer** - Confirm it in the terminal:

   **Command Prompt or PowerShell:**

   ```text
   node --version
   npm --version
   ```

3. **Git for Windows** - Required when Claude opens repositories or applies changes:

   **Command Prompt or PowerShell:**

   ```text
   git --version
   ```

4. **A Claude account** - Use a Claude.ai account, Claude subscription, or supported enterprise authentication.

## 2. Install Claude Code

Open Command Prompt or PowerShell. An ordinary terminal is normally sufficient:

**Command Prompt or PowerShell:**

```text
npm install -g @anthropic-ai/claude-code
claude --version
claude
```

**Administrator required only if the installation reports permission errors** or the organization requires elevated software installation. To open an elevated terminal, right-click Command Prompt or PowerShell and select **Run as administrator**.

On the first launch, Claude guides you through authentication. After authentication, enter `/help` to verify that Claude Code is working.

Official documentation: [Claude Code overview](https://code.claude.com/docs/en/overview)

> Use the native Claude Code installer if npm packages are not permitted by your organization. Run the installer as Administrator only if Windows or your organization explicitly requires elevation.

## 3. Open the Practice Project

Open the EventHub repository in VS Code:

```text
f:\UdemyCertification\Playwright2026\eventhub\eventhub
```

Start Claude from the repository root:

**Command Prompt:**

```text
cd /d f:\UdemyCertification\Playwright2026\eventhub\eventhub
claude
```

**PowerShell:**

```powershell
cd f:\UdemyCertification\Playwright2026\eventhub\eventhub
claude
```

No Administrator terminal is required.

Starting Claude in the repository root ensures it can discover the source files, configuration, and project instructions.

## 4. Generate Project Instructions with CLAUDE.md

Run this command inside the Claude Code prompt:

```text
/init
```

`/init` analyzes the repository and creates or updates `CLAUDE.md` in the repository root. Claude reads this file to understand project conventions. Exit Claude before running PowerShell commands to create the skills folders:

```text
/exit
```

The generated file should be present at:

```text
CLAUDE.md
```

Review the generated instructions and keep them concise. Claude may also create configuration under `.claude/` when project setup is initialized.

Include:

- Project purpose and architecture
- Technology stack
- Important folder locations
- Commands used to start and test the application
- Coding conventions
- Security rules
- Domain or business rules
- Links to relevant skills

Example:

```markdown
# Project Instructions

## Project Overview
EventHub is an event ticket booking application.

## Commands
- npm run dev
- npm run seed
- npm run test

## Testing Rules
- Put tests under tests/
- Prefer Playwright user-facing locators
- Do not use page.waitForTimeout()
- Reuse the documented test accounts

## Architecture
Frontend: Next.js
Backend: Express and Prisma
Database: MySQL
Testing: Playwright
```

Restart Claude after adding or changing `CLAUDE.md`:

**Command Prompt or PowerShell:**

```text
claude
```

## 5. Understand Claude Skills

| Artifact | Location | Purpose |
|---|---|---|
| Project skill | `.claude/skills/<skill-name>/SKILL.md` | Reusable instructions for one project |
| Personal skill | `~/.claude/skills/<skill-name>/SKILL.md` | Reusable instructions on this Windows machine |
| Project instructions | `CLAUDE.md` | Always-available repository context |
| Custom slash command | `.claude/commands/` | Legacy or explicit prompt shortcut |

Skills are preferred over repeating long prompts because Claude can discover and apply them by context.

## 6. Create the First Project Skill

Create this folder and file from the repository root:

```text
.claude\skills\playwright-review\SKILL.md
```

Create the `.claude` and skill folders:

**Command Prompt or PowerShell:**

```text
mkdir .claude\skills\playwright-review
notepad .claude\skills\playwright-review\SKILL.md
```

`mkdir` works in both shells. No Administrator terminal is required. In Command Prompt, use `mkdir` directly. In PowerShell, `mkdir` is also available as a directory-creation alias.

The resulting structure should look like:

```text
Repository
├── CLAUDE.md
└── .claude/
    └── skills/
        └── playwright-review/
            └── SKILL.md
```

Add:

```markdown
---
name: playwright-review
description: Review Playwright tests for locator quality, assertions, isolation, waiting strategies, and test reliability. Use when asked to review or improve an end-to-end test.
argument-hint: [test-file-path]
---

# Playwright Test Reviewer

Review the Playwright test supplied by $ARGUMENTS.

## Review Areas

1. Locator reliability
2. Playwright assertion usage
3. Test isolation and setup
4. Dynamic waits and timeout usage
5. Page Object Model usage
6. Security and test credential handling
7. Readability and maintainability

## Rules

- Never recommend arbitrary sleeps or page.waitForTimeout()
- Prefer test IDs, roles, labels, and placeholders
- Check that every test validates a meaningful result
- Preserve existing project conventions
- Do not change application behavior unless explicitly requested

## Output

Return findings in this order:

1. Critical reliability or correctness issues
2. Maintainability issues
3. Suggested test code
4. Verification command
```

Invoke it in Claude Code:

```text
/playwright-review tests/booking-flow.spec.js
```

Or request it naturally:

```text
Review tests/booking-flow.spec.js using the Playwright test-review skill.
```

## 7. Create the EventHub Domain Skill

The `eventhub-domain` skill is a reusable knowledge and routing skill. Its purpose is to help Claude understand the EventHub application before creating tests, reviewing code, designing scenarios, explaining architecture, or implementing a feature.

Create this skill package:

```text
.claude/
└── skills/
    └── eventhub-domain/
        ├── SKILL.md
        ├── business-rules.md
        ├── api-reference.md
        ├── ui-selectors.md
        └── user-flows.md
```

The main `SKILL.md` should contain stable, frequently needed knowledge. Detailed or specialized knowledge belongs in supporting files.

**Only `SKILL.md` is the skill definition.** The other Markdown files are supporting reference files, not additional skills:

- `SKILL.md` defines the skill name, description, behavior, routing instructions, and overview knowledge.
- `business-rules.md` provides detailed business and validation rules.
- `api-reference.md` provides detailed API endpoint and error knowledge.
- `ui-selectors.md` provides Playwright locator knowledge.
- `user-flows.md` provides journeys, scenarios, test data, and test accounts.

Claude discovers skills through folders containing a file named `SKILL.md`, such as `.claude/skills/eventhub-domain/SKILL.md`. Supporting files are loaded when instructions inside `SKILL.md` route Claude to them.

For a small first skill, keep all of the information in `SKILL.md`. Add supporting `.md` files only when the skill becomes large or when separate topics should be maintained independently. A beginner can start with `SKILL.md` plus one or two supporting files, rather than creating every possible file at once.

### Example Main `SKILL.md`

```markdown
---
name: eventhub-domain
description: EventHub application domain knowledge — business rules, API endpoints, data models, user flows, UI selectors, and error scenarios. Use when writing tests, reviewing code, creating scenarios, or answering questions about how EventHub works.
user-invocable: false
---

# EventHub Domain Knowledge

## Overview
EventHub is a full-stack event ticket booking platform. Users browse events, book tickets, and manage bookings. Each user operates in an isolated sandbox with limits on events and bookings.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, React Query v5
- **Backend**: Express.js 4.21, Prisma ORM 5.22, MySQL 8+
- **Auth**: JWT (7-day expiry), bcryptjs password hashing
- **Testing**: Playwright (E2E), Chromium only
- **API Docs**: Swagger UI at `/api/docs`

## Architecture

```text
frontend/ (Next.js 14)           backend/ (Express.js)
├── app/                         ├── src/
│   ├── page.tsx (Home)          │   ├── routes/       (HTTP layer)
│   ├── login/                   │   ├── controllers/  (Request handling)
│   ├── register/                │   ├── services/     (Business logic)
│   ├── events/                  │   ├── repositories/ (Data access)
│   │   ├── page.tsx (List)      │   ├── validators/   (Input validation)
│   │   └── [id]/page.tsx        │   ├── middleware/    (Auth, errors)
│   ├── bookings/                │   └── utils/        (Error classes)
│   │   ├── page.tsx (List)      ├── prisma/
│   │   └── [id]/page.tsx        │   ├── schema.prisma
│   └── admin/                   │   └── seed.js
│       ├── events/page.tsx      └── app.js
│       └── bookings/page.tsx
├── components/
├── lib/
│   ├── api/ (client, endpoints)
│   └── hooks/ (useAuth, useEvents, useBookings)
└── types/
```

## Data Models

### User
| Field | Type | Notes |
|---|---|---|
| id | Int (PK) | Auto-increment |
| email | String | Unique |
| password | String | bcrypt hashed |
| events | Event[] | User-created events |
| bookings | Booking[] | User bookings |

### Event
| Field | Type | Notes |
|---|---|---|
| id | Int (PK) | Auto-increment |
| title | String | Required |
| description | Text | Optional |
| category | String | Conference/Concert/Sports/Workshop/Festival |
| venue | String | Required |
| city | String | Bangalore/Mumbai/Hyderabad/Delhi/Chennai |
| eventDate | DateTime | Must be in the future |
| price | Decimal | Per ticket, greater than or equal to zero |
| totalSeats | Int | Greater than or equal to one |
| availableSeats | Int | Dynamic for user events |
| isStatic | Boolean | Seeded static events are immutable |
| userId | Int? | Null for static events |

### Booking
| Field | Type | Notes |
|---|---|---|
| id | Int (PK) | Auto-increment |
| eventId | Int (FK) | Cascade delete with Event |
| userId | Int (FK) | Cascade delete with User |
| customerName | String | Minimum two characters |
| customerEmail | String | Valid email format |
| customerPhone | String | Minimum ten digits |
| quantity | Int | 1-10 tickets |
| totalPrice | Decimal | Event price multiplied by quantity |
| status | String | Always `confirmed` |
| bookingRef | String | Unique, format: `[FIRST_LETTER]-[6_RANDOM]` |

## Detailed Knowledge Routing

Load the supporting file for the current task:

- Business rules and validation logic -> `./business-rules.md`
- API endpoints and error codes -> `./api-reference.md`
- UI selectors for test automation -> `./ui-selectors.md`
- User flows, test scenarios, and test data -> `./user-flows.md`
```

### Supporting Skill Workflow

Claude should route EventHub requests this way:

1. Read `SKILL.md` to establish the overview, architecture, and data models.
2. Read `business-rules.md` for limits, ownership, static events, refunds, FIFO replacement, or validation constraints.
3. Read `api-reference.md` for endpoint names, request bodies, response shapes, authentication, or HTTP errors.
4. Read `ui-selectors.md` for Playwright locators and browser automation conventions.
5. Read `user-flows.md` for journeys, test data, and user scenarios.
6. Inspect the current source code before changing behavior.
7. Identify cross-layer impact and explain the affected frontend, API, service, repository, and test components.

### Frontend and Backend Responsibilities

Keep detailed frontend and backend knowledge in the appropriate supporting files:

- Frontend: Next.js pages, React Query hooks, API client calls, authentication state, form validation, loading states, success/error states, and Playwright locators.
- Backend: Express routes, JWT middleware, request validators, controllers, services, repositories, Prisma operations, FIFO limits, seat updates, authorization, and error responses.
- Cross-layer work: Confirm that frontend expectations match backend contracts and database constraints.

### Maintaining the Skill

- Update rules and models when application behavior changes.
- Treat source code as the implementation truth if it differs from documentation.
- Keep supporting files narrowly focused.
- Remove duplicate information instead of maintaining conflicting copies.
- Review stale locators and API contracts after application changes.
- Do not store real credentials or personal information in skill files.

## 8. Create a Personal Skill

Personal skills are available in every project on the same Windows machine.

**Command Prompt:**

```text
mkdir "%USERPROFILE%\.claude\skills\architecture-review"
notepad "%USERPROFILE%\.claude\skills\architecture-review\SKILL.md"
```

**PowerShell:**

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills\architecture-review"
notepad "$HOME\.claude\skills\architecture-review\SKILL.md"
```

No Administrator terminal is required.

Use personal skills for individual preferences. Use project skills for team conventions that should be committed to Git.

## 9. Useful Frontmatter Fields

At the start of `SKILL.md`, add YAML frontmatter:

| Field | Required | Purpose |
|---|---:|---|
| `name` | Yes | Skill name used for invocation |
| `description` | Yes | Explains when Claude should use the skill |
| `argument-hint` | No | Shows an expected argument, such as `[file-path]` |
| `disable-model-invocation` | No | Set to `true` for manual-only workflows |
| `user-invocable` | No | Set to `false` to hide a skill from slash invocation |

Example:

```yaml
---
name: test-strategy
description: Assign test scenarios to unit, API, component, or E2E test layers. Use when planning or reviewing a test pyramid.
argument-hint: [feature-name or scenario-file]
disable-model-invocation: false
---
```

Use a lowercase, hyphen-separated skill name. Make descriptions concrete by naming the trigger and expected output.

## 10. Run and Validate the Skill

Confirm the skill is discovered:

```text
/help
```

Then test explicit invocation:

```text
/playwright-review tests/booking-flow.spec.js
```

Test automatic discovery:

```text
I need to review tests/booking-flow.spec.js for Playwright reliability.
```

The skill is working when Claude:

1. Reads the skill instructions.
2. Reads or references named supporting files.
3. Reviews only the relevant test or feature.
4. Gives findings and a focused verification command.

## 11. Configure Safe First Use

- Ask Claude to propose changes before editing.
- Review every edit in VS Code.
- Use Git diff before accepting broader modifications.
- Approve terminal commands only when their purpose is clear.
- Never provide secrets, passwords, API keys, or personal data in prompts.

Useful Git commands for Command Prompt or PowerShell:

```text
git status
git diff
```

No Administrator terminal is required.

## 12. Recommended First Exercises

Practice in this sequence:

1. Create `CLAUDE.md` for EventHub.
2. Create the `playwright-review` skill.
3. Ask Claude to review an existing Playwright test.
4. Correct the skill if it misses project conventions.
5. Create an `eventhub-domain` skill with business rules.
6. Create a test-scenario skill for one EventHub feature.
7. Use a test-strategy skill to assign scenarios to test layers.
8. Ask Claude to generate and run only the relevant tests.

## 13. Common Troubleshooting

### Claude does not recognize the skill

- Confirm the file is named exactly `SKILL.md`.
- Confirm the folder is under `.claude/skills/` or `~/.claude/skills/`.
- Confirm the file begins with valid YAML frontmatter.
- Restart Claude Code.
- Run `/help` and inspect the slash-command suggestions.

### Claude ignores the skill instructions

- Make the `description` specific and action-oriented.
- Keep the skill focused on one responsibility.
- Replace broad instructions with a clear checklist.
- Reference supporting files in the skill body.
- Explicitly invoke the skill during testing.

### Claude makes unwanted edits

- Stop Claude if a change is unclear.
- Review `git diff` before continuing.
- Ask Claude to explain a proposed change.
- Restore only Claude's unintended change, never unrelated user work.

### Claude cannot run the application

- Verify the repository root.
- Start MySQL and Docker if Docker Compose is used.
- Docker Desktop normally starts as a standard user and should not require an Administrator terminal.
- Run Docker or application startup commands as Administrator only if the Docker Desktop configuration or organizational policy explicitly requires elevation.
- Run the application commands from `CLAUDE.md` manually first.
- Check that ports 3000 and 3001 are available.

## 14. Skills Versus Subagents

Use a **skill** when Claude needs reusable knowledge or a repeatable method.

Use a **subagent** when a task requires an isolated agent with separate context, such as:

- A test architect agent
- A code reviewer agent
- A security reviewer agent
- A functional tester agent

Subagents consume skills and project instructions, but the skill remains the reusable source of specialized knowledge.

## 15. Architecture Best Practice

```text
Repository
├── CLAUDE.md                         # Shared project instructions
├── .claude/
│   └── skills/
│       ├── eventhub-domain/          # Domain knowledge
│       ├── playwright-review/        # Review workflow
│       ├── create-scenarios/         # Scenario generation workflow
│       └── test-strategy/            # Test pyramid workflow
└── tests/                            # Playwright implementation
```

Start with three skills:

1. Domain knowledge
2. Playwright implementation standards
3. Test review or test strategy

Add specialist workflows only after these foundational skills are stable.