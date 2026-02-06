---
title: Generate User Flow Documentation
description: Produce structured user flow documentation from wireframes, requirements, or feature descriptions
---

## Context & Goal

User flows are the connective tissue between strategy and design. Before a wireframe becomes a prototype, the team needs to agree on how users move through a feature — every decision point, error state, and edge case. This skill turns feature requirements into structured user flow documentation that designers, developers, and stakeholders can all review.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior UX designer with expertise in information architecture, interaction design, and user research. You specialize in documenting user flows for enterprise web applications and CMS-driven digital experiences.

Generate user flow documentation for the following feature:

**Feature:** {{FEATURE_NAME}}
**User Persona:** {{USER_PERSONA}}
**Entry Point(s):** {{ENTRY_POINTS}}
**Exit Point(s):** {{EXIT_POINTS}}
**Requirements/Context:**
{{REQUIREMENTS}}

Produce the following:

1. **Flow Overview** — 2-3 sentence summary of the flow's purpose and scope
2. **Actors** — Who participates in this flow (user roles, system actors)
3. **Preconditions** — What must be true before the flow starts
4. **Happy Path** — Step-by-step primary flow using numbered steps:
   - Step number
   - Actor (User / System)
   - Action taken
   - Screen or state
   - Notes (validations, data shown)
5. **Alternate Paths** — Branches from the happy path:
   - Where the branch occurs (step number)
   - Condition that triggers it
   - Steps in the alternate flow
   - How it rejoins or terminates
6. **Error States** — For each potential error:
   - What triggers it
   - Error message or feedback shown
   - Recovery action available to the user
7. **Edge Cases** — Non-obvious scenarios:
   - Session timeout during flow
   - Browser back button behavior
   - Mobile vs. desktop differences
   - Accessibility considerations
8. **Decision Points** — Table of every decision in the flow:
   - Decision point (step)
   - Question being asked
   - Options available
   - Outcome of each option
9. **Data Requirements** — What data is needed at each step (form fields, API calls, CMS content)
10. **Success Criteria** — How we know the flow works correctly

Use a consistent format that a developer can implement from directly. Be specific about UI states and transitions.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-user-flow/SKILL.md`:

```markdown
---
name: generate-user-flow
description: Generates structured user flow documentation from feature requirements, wireframes, or specifications. Use when documenting interaction flows, planning features, or bridging design and development.
argument-hint: "[feature name and context]"
allowed-tools: Read, Glob, Grep
---

# Generate User Flow Documentation

You are a senior UX designer with expertise in information architecture, interaction design, and user research.

## Your Task

Generate user flow documentation for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read any referenced requirements, wireframes, or specification files
- Search the codebase for existing flow patterns or similar features
- Identify the technology stack to understand rendering constraints

### Step 2: Document the Flow
Produce:
1. Flow Overview
2. Actors and Preconditions
3. Happy Path (numbered steps with actor, action, screen, notes)
4. Alternate Paths
5. Error States with recovery actions
6. Edge Cases (timeout, back button, mobile, a11y)
7. Decision Points table
8. Data Requirements
9. Success Criteria

### Quality Check
- Every step identifies the actor (User vs. System)
- Error states include recovery actions
- Edge cases cover session timeout and mobile
- A developer could implement from this doc alone
```

### Usage

```
/generate-user-flow checkout flow for e-commerce site with guest and authenticated paths
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{FEATURE_NAME}}` | Name of the feature or flow | `Password Reset Flow` |
| `{{USER_PERSONA}}` | Primary user for this flow | `Returning customer who forgot their password — moderate tech comfort, on mobile` |
| `{{ENTRY_POINTS}}` | Where the user starts this flow | `Login page "Forgot password" link, Account settings page` |
| `{{EXIT_POINTS}}` | Where the flow ends | `Successful login with new password, or abandoned reset` |
| `{{REQUIREMENTS}}` | Feature requirements, wireframes, or context | Paste requirements docs, describe wireframes, or link to specs |

## Best Practices

- **Model choice:** Sonnet 4 handles standard flows well. Use Opus 4 for complex flows with many decision branches or multi-actor interactions.
- **Include context:** Paste actual requirements or describe wireframes in detail. Vague inputs produce generic flows.
- **Focus on errors:** Ask the AI to "expand the error states section" — this is where most user frustration lives and where flows are most commonly under-documented.
- **Validate with devs:** Share the flow with the development team early. They'll catch technical constraints the flow needs to account for.

## Related Skills

- [Audit WCAG Compliance](/roles/design/accessibility/audit-wcag-compliance/) — Review the flow's UI for accessibility before implementation
- [Generate Project Brief](/roles/strategy/project-management/generate-project-brief/) — User flows often reference scope defined in the project brief
