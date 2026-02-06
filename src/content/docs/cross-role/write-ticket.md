---
title: Write or Refine Ticket
description: Convert raw context from Slack threads, bug reports, or vague requests into properly structured Jira/ADO tickets with acceptance criteria and CMS-aware subtasks
---

## Context & Goal

Poorly written tickets are the #1 source of sprint friction. "Build the hero component" isn't actionable — it's missing acceptance criteria, CMS configuration subtasks, accessibility requirements, and a definition of done. This skill takes raw context — a Slack conversation, a bug screenshot, a vague client request, a standup note — and produces a well-structured ticket with acceptance criteria, CMS-specific subtasks, and a complexity hint.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior business analyst at a digital consulting agency who writes tickets that developers can pick up and start working on without asking clarifying questions. You know that CMS work (Sitecore, Umbraco, Optimizely) involves more subtasks than typical web development — content types, renderings, datasources, authoring UX, caching, serialization, and preview support — and you surface these explicitly so they aren't discovered mid-sprint.

Write a ticket from the following raw context:

**Ticket Type:** {{TICKET_TYPE}}
**CMS Platform:** {{CMS_PLATFORM}}
**Raw Context:**
{{RAW_CONTEXT}}
**Priority:** {{PRIORITY}}

Produce a structured ticket:

### Title
[Action-oriented: "Implement...", "Fix...", "Update...", "Configure..."]

### Type
[Story / Bug / Task / Spike]

### Description
**Summary:** 1-2 sentence overview of what needs to happen and why.

**Background:** Context that the developer needs to understand the "why" behind this work. Reference related tickets, design decisions, or client requirements.

### User Story (if Story type)
As a [role], I want [capability], so that [benefit].

### Acceptance Criteria
- [ ] Given [precondition], when [action], then [expected result]
- [ ] Given [precondition], when [action], then [expected result]
- [ ] Given [precondition], when [action], then [expected result]
- [ ] Accessibility: [Specific a11y requirement]
- [ ] CMS: Content author can [authoring action] in [CMS editor]

### Bug Details (if Bug type)
- **Steps to reproduce:** Numbered steps
- **Expected behavior:** What should happen
- **Actual behavior:** What actually happens
- **Environment:** Browser, device, environment URL
- **Frequency:** Always / Intermittent / One-time
- **Screenshots/Logs:** [Reference]

### Technical Subtasks
- [ ] [Implementation subtask]
- [ ] [Implementation subtask]

### CMS-Specific Subtasks
For Sitecore:
- [ ] Create/update template with fields
- [ ] Create rendering and configure datasource
- [ ] Configure Experience Editor support
- [ ] Add serialization (Sitecore CLI)
- [ ] Configure caching settings
- [ ] Update site search index

For Umbraco:
- [ ] Create/update document type
- [ ] Create/update element type (if Block List)
- [ ] Create partial view / view component
- [ ] Update ModelsBuilder models
- [ ] Configure Examine index (if searchable)

For Optimizely:
- [ ] Create/update content type
- [ ] Create block component
- [ ] Configure content area restrictions
- [ ] Update Content Graph schema (if headless)

### Definition of Done
- [ ] Acceptance criteria verified
- [ ] Code reviewed and approved
- [ ] Unit tests written and passing
- [ ] Accessibility verified (keyboard + screen reader)
- [ ] CMS authoring tested in [Experience Editor / Backoffice / Edit Mode]
- [ ] Deployed to staging
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)

### Complexity Estimate
**Suggested:** [1/2/3/5/8/13] story points
**Rationale:** [Why this complexity — what drives it]

### Dependencies
- [Other tickets, API availability, design decisions, client content]

### Notes
- [Anything the developer should know but doesn't fit above]
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/write-ticket/SKILL.md`:

```markdown
---
name: write-ticket
description: Converts raw context (Slack threads, bug reports, vague requests) into structured tickets with acceptance criteria and CMS-aware subtasks. Use when writing stories, bugs, or tasks.
argument-hint: "[raw context or paste the Slack message / bug report]"
allowed-tools: Read, Glob, Grep
---

# Write or Refine Ticket

You are a senior BA who writes tickets developers can start without clarifying questions — including CMS-specific subtasks.

## Your Task

Write a ticket from: **$ARGUMENTS**

## Process

### Step 1: Understand the Intent
- Read the raw context (Slack message, bug report, meeting notes, or description)
- Determine ticket type (Story, Bug, Task, Spike)
- Identify the CMS platform for platform-specific subtasks
- Search the project for related components or existing patterns

### Step 2: Write the Ticket
Produce:
1. Action-oriented title
2. Description with summary and background
3. User story (if applicable)
4. Acceptance criteria (Given/When/Then, minimum 3)
5. Bug details (if bug: steps to reproduce, expected vs actual)
6. Technical subtasks
7. CMS-specific subtasks (platform-aware)
8. Definition of Done
9. Complexity estimate with rationale
10. Dependencies and notes

### Quality Check
- A developer can start working without asking questions
- CMS subtasks are explicit (not "implement component" — list every CMS artifact)
- Acceptance criteria are testable
- Complexity estimate is justified
```

### Usage

```
/write-ticket Client says "the search results page looks broken on mobile — the filters overlap the results and you can't scroll"
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{TICKET_TYPE}}` | Type of ticket | `Story` or `Bug` or `Task` or `Spike` or `Not sure — determine from context` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud` or `Umbraco 13` or `Optimizely CMS 12` |
| `{{RAW_CONTEXT}}` | The raw input | Paste the Slack message, bug report, meeting note, client email, or verbal description |
| `{{PRIORITY}}` | Priority level | `High — blocks content authoring` or `Medium — impacts user experience` or `Low — cosmetic` |

## Best Practices

- **Model choice:** Sonnet 4 for straightforward tickets. Use Opus 4 when the raw context is ambiguous and requires inferring requirements from vague descriptions.
- **Paste the raw source verbatim:** Don't summarize the Slack thread. The AI catches details you'd paraphrase away — specific error messages, browser versions, user actions.
- **Include the CMS platform:** "Build a component" means completely different subtasks on Sitecore vs Umbraco vs Optimizely. The platform determines the technical work.
- **Let the team refine estimates:** The complexity estimate is a starting suggestion. Use it as a conversation starter in planning, not a final commitment.

## Related Skills

- [Decompose Epic into Stories](/roles/strategy/project-management/decompose-epic-into-stories/) — Break a full epic into multiple tickets
- [Generate Feature Specification](/roles/strategy/business-analysis/generate-feature-specification/) — When the ticket needs a full spec before writing stories
