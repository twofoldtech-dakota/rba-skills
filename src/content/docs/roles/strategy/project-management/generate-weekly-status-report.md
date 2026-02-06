---
title: Generate Weekly Status Report
description: Create a client-facing status report from sprint data with executive summary, milestone tracking, risk register, and three-pillar progress format
---

## Context & Goal

Project managers spend 2-3 hours every Friday compiling status reports — pulling data from Jira, synthesizing sprint progress, and translating engineer-speak into business language. This skill takes raw sprint data and produces a polished client-facing status report in RBA's three-pillar format (Strategy/Design/Engineering progress), complete with executive summary, milestone tracking, velocity trends, risk register, and decisions needed.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager at RBA, a digital consulting agency that delivers through three integrated pillars: Strategy, Design, and Engineering. You write status reports that give clients confidence in progress while surfacing risks early. Your reports are concise, honest, and action-oriented — never padded with filler.

Generate a client-facing weekly status report from the following:

**Client:** {{CLIENT_NAME}}
**Project:** {{PROJECT_NAME}}
**Report Date:** {{REPORT_DATE}}
**Sprint:** {{SPRINT_INFO}}

**This Week's Progress:**
{{WEEKLY_PROGRESS}}

**Blockers & Risks:**
{{BLOCKERS_AND_RISKS}}

**Upcoming Work:**
{{UPCOMING_WORK}}

Produce a status report with these sections:

### 1. Executive Summary
3-4 sentences maximum. State the overall project health (On Track / At Risk / Off Track), the most important progress this week, and the single most important thing the client needs to know or decide.

### 2. Three-Pillar Progress

**Strategy**
- Key activities completed (discovery, requirements, content strategy, analytics)
- Decisions made or pending
- Artifacts delivered

**Design**
- Key activities completed (wireframes, prototypes, design system, accessibility)
- Review status (approved, in review, revisions needed)
- Artifacts delivered

**Engineering**
- Stories completed this sprint (count and summary)
- Stories in progress
- Technical milestones hit or approaching
- Environment/deployment updates

### 3. Milestone Tracker
| Milestone | Target Date | Status | Notes |
|-----------|-------------|--------|-------|

Use status indicators: ✅ Complete, 🟢 On Track, 🟡 At Risk, 🔴 Off Track

### 4. Sprint Metrics
- Stories completed: X of Y planned
- Story points completed: X of Y planned
- Velocity trend: [improving / stable / declining] vs. last 3 sprints
- Burndown assessment: [ahead / on track / behind]

### 5. Risk Register
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|-----------|--------|------------|-------|--------|

For each risk, provide a specific mitigation action — not "monitor the situation."

### 6. Decisions Needed
| # | Decision | Context | Needed By | Impact of Delay |
|---|----------|---------|-----------|-----------------|

### 7. Next Week Preview
Bullet list of planned activities by pillar, with any client dependencies highlighted.

### 8. Budget & Timeline Summary
- Hours consumed: X of Y total (Z%)
- Timeline status: On Track / Ahead / Behind by N days
- Change orders pending: [list or "none"]

Keep the entire report under 2 pages. Every sentence should either inform or request action — eliminate filler.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-weekly-status-report/SKILL.md`:

```markdown
---
name: generate-weekly-status-report
description: Generates a client-facing weekly status report from sprint data, using RBA's three-pillar format. Use every Friday to turn raw sprint data into a polished status report.
argument-hint: "[client name and sprint context]"
allowed-tools: Read, Glob, Grep
---

# Generate Weekly Status Report

You are a senior project manager at RBA who writes concise, honest, action-oriented status reports in the three-pillar format (Strategy/Design/Engineering).

## Your Task

Generate a weekly status report for: **$ARGUMENTS**

## Process

### Step 1: Gather Data
- Read any referenced sprint data, Jira exports, or notes
- Search the project for previous status reports to match format
- Identify the project phase, active sprint, and team structure

### Step 2: Generate the Report
Produce a client-facing report with:
1. Executive summary (3-4 sentences, overall health, key progress, key decision)
2. Three-pillar progress (Strategy / Design / Engineering)
3. Milestone tracker table with status indicators
4. Sprint metrics (velocity, burndown, completion rates)
5. Risk register with specific mitigations
6. Decisions needed with deadlines and delay impact
7. Next week preview by pillar
8. Budget & timeline summary

### Quality Check
- Report is under 2 pages
- Every sentence informs or requests action
- Risks have specific mitigations, not "monitoring"
- Sprint metrics include trend context
- Decisions have clear deadlines and delay consequences
```

### Usage

```
/generate-weekly-status-report Contoso Corp — Sprint 14, XM Cloud migration
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{PROJECT_NAME}}` | Project name | `Website Redesign & XM Cloud Migration` |
| `{{REPORT_DATE}}` | Date for the report | `January 24, 2025` |
| `{{SPRINT_INFO}}` | Sprint number and dates | `Sprint 14 (Jan 13-24), 3 of 8 sprints complete` |
| `{{WEEKLY_PROGRESS}}` | Raw sprint progress — paste from Jira, standup notes, team updates | `Completed: PROJ-234 hero component, PROJ-236 search API integration, PROJ-241 content migration script for blog posts. In progress: PROJ-245 checkout flow, PROJ-247 performance optimization. Design approved header/footer comps.` |
| `{{BLOCKERS_AND_RISKS}}` | Current blockers, risks, and concerns | `Waiting on client SSO credentials for Azure AD integration. Design team needs brand guidelines for mobile nav. Performance budget may need revision based on third-party scripts.` |
| `{{UPCOMING_WORK}}` | Next sprint or next week's planned work | `Start checkout flow implementation, begin UAT environment setup, finalize content migration mapping for products section.` |

## Best Practices

- **Model choice:** Sonnet 4 handles status reports efficiently. The format is well-defined and the reasoning required is straightforward.
- **Paste raw data, not polished notes:** Dump in Jira ticket titles, standup notes, and Slack messages. The AI handles the translation to business language.
- **Be honest about risks:** Don't soften blockers before pasting them in. The AI will frame them professionally — your job is to include them.
- **Customize the template once:** After the first report, save the output format and use it as the template going forward. Clients appreciate consistency.

## Related Skills

- [Generate Project Brief](/roles/strategy/project-management/generate-project-brief/) — The project brief that establishes the milestones this report tracks
- [Assess Change Impact](/roles/strategy/project-management/assess-change-impact/) — When a client request needs scope assessment before the next status report
- [Generate Sprint Summary](/roles/engineering/devops/generate-sprint-summary/) — Engineering-focused sprint summary for internal use
