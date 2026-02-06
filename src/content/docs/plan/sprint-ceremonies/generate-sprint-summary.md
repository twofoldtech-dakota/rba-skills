---
title: Generate Sprint Summary
description: Create a client-friendly sprint summary from git history, tickets, and team notes
---

## Context & Goal

At the end of every sprint, teams need a summary that communicates progress to clients in plain language — not a raw git log or Jira dump. This skill transforms technical artifacts (commits, PRs, tickets) into a polished summary that project managers can share directly with stakeholders.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager at a digital consulting agency. You excel at translating technical work into clear, client-friendly communication. You understand that clients care about outcomes and progress, not implementation details.

Generate a sprint summary from the following inputs:

**Client:** {{CLIENT_NAME}}
**Sprint:** {{SPRINT_NUMBER}}
**Date Range:** {{DATE_RANGE}}
**Sprint Goal:** {{SPRINT_GOAL}}

**Completed Work:**
{{COMPLETED_WORK}}

**In Progress:**
{{IN_PROGRESS}}

**Blockers/Risks:**
{{BLOCKERS}}

Produce a sprint summary with:

1. **Sprint Highlights** — 3-5 bullet points of the most impactful accomplishments, written in plain language a non-technical client would understand
2. **Completed This Sprint** — Grouped by category (Features, Bug Fixes, Infrastructure, Design):
   - What was delivered
   - Why it matters to the client/end-user
3. **In Progress** — What's actively being worked on and expected completion
4. **Upcoming** — What's planned for the next sprint
5. **Risks & Blockers** — Any items that need client attention or decisions, with recommended actions
6. **Metrics** (if applicable):
   - Story points completed vs. committed
   - Velocity trend
   - Defect count
7. **Demo Items** — Features ready for client review with brief descriptions

Tone: Professional, confident, and transparent. Celebrate wins without overselling. Be honest about challenges without being alarming. Write for a VP-level audience.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-sprint-summary/SKILL.md`:

```markdown
---
name: generate-sprint-summary
description: Generates a client-friendly sprint summary from git history, commit messages, and team notes. Use at the end of each sprint to create stakeholder communication.
argument-hint: "[client name] [sprint number or date range]"
allowed-tools: Read, Glob, Grep, Bash(git log *)
---

# Generate Sprint Summary

You are a senior project manager at a digital consulting agency who translates technical work into client-friendly communication.

## Your Task

Generate a sprint summary for: **$ARGUMENTS**

## Process

### Step 1: Gather Sprint Data
- Run `git log` for the date range to see all commits and PRs
- Read any referenced ticket summaries or sprint notes files
- Search for changelog or release notes files

### Step 2: Categorize and Translate
- Group work into: Features, Bug Fixes, Infrastructure, Design
- Translate each item into plain language
- Identify the client impact of each change

### Step 3: Produce Summary
Generate:
1. Sprint Highlights (3-5 bullet points)
2. Completed Work (categorized, client-friendly language)
3. In Progress with expected completion
4. Upcoming next sprint
5. Risks & Blockers needing attention
6. Demo Items ready for review

### Quality Check
- No technical jargon without explanation
- Every completed item describes why it matters
- Risks include recommended actions
- Tone is professional and confident
```

### Usage

```
/generate-sprint-summary Contoso Sprint 14 (Jan 20 - Feb 2)
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{SPRINT_NUMBER}}` | Sprint identifier | `Sprint 14` |
| `{{DATE_RANGE}}` | Sprint start and end dates | `January 20 – February 2, 2025` |
| `{{SPRINT_GOAL}}` | What the team committed to this sprint | `Complete checkout flow redesign and launch product filtering` |
| `{{COMPLETED_WORK}}` | List of completed items (tickets, commits, or descriptions) | Paste Jira tickets, git log output, or bullet list of accomplishments |
| `{{IN_PROGRESS}}` | Work started but not finished | `Search indexing optimization - 80% complete, blocked on API key` |
| `{{BLOCKERS}}` | Issues requiring attention | `Need client approval on revised homepage design before development can start` |

## Best Practices

- **Model choice:** Sonnet 4 handles sprint summaries well — this is a pattern-matching task. Use Opus 4 only if the sprint was unusually complex or contentious.
- **Paste raw data:** Dump your git log, Jira export, or sprint board screenshot description into `{{COMPLETED_WORK}}`. Let the AI do the translation — that's the point.
- **Review tone carefully:** The AI tends toward either too technical or too vague. Ask for revisions: "make it less technical" or "add more specifics about the checkout flow changes."
- **Customize for your client:** Some clients want metrics, others don't. Remove sections that don't apply.

## Related Skills

- [Generate Project Brief](/plan/project-kickoff/generate-project-brief/) — Sprint summaries should reference the original brief's objectives
- [Research Any Topic](/communicate/enablement/research-any-topic/) — Research context for blockers or technical decisions mentioned in the summary
