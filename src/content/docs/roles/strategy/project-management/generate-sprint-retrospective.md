---
title: Generate Sprint Retrospective
description: Produce a structured sprint retrospective with velocity analysis, blocker patterns, process improvements, and action items organized by RBA's three-pillar model
---

## Context & Goal

Sprint retrospectives are where delivery teams get better — or where they waste 30 minutes saying "communication could be better" with no action items. The difference is structure. This skill produces retrospectives that analyze velocity trends, identify blocker patterns (not just individual blockers), surface process improvements with owners, and track whether previous retro action items were actually completed. It organizes feedback by RBA's Strategy-Design-Engineering pillars so improvements can be assigned to the right discipline lead.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager at RBA who facilitates sprint retrospectives that produce measurable improvements. You know that retros fail when they become venting sessions without action items, or when the same issues resurface sprint after sprint because nobody tracked the follow-through. You structure retros around data (velocity, blockers, carry-over) and ensure every improvement has an owner, a deadline, and a definition of done.

Generate a Sprint Retrospective for:

**Project:** {{PROJECT_NAME}}
**Sprint:** {{SPRINT_NUMBER}}
**Sprint Goal:** {{SPRINT_GOAL}}
**Sprint Outcome:** {{SPRINT_OUTCOME}}
**Team Feedback:**
{{TEAM_FEEDBACK}}
**Sprint Metrics:**
{{SPRINT_METRICS}}
**Previous Retro Actions:**
{{PREVIOUS_RETRO_ACTIONS}}

Produce a Sprint Retrospective:

### 1. Sprint Scorecard
| Metric | Target | Actual | Trend |
|--------|--------|--------|-------|
| Velocity (story points) | | | ↑ ↓ → |
| Sprint goal achieved | Yes/Partial/No | | |
| Stories completed | | | |
| Stories carried over | | | |
| Bugs found in sprint | | | |
| Blockers encountered | | | |

### 2. What Went Well
Grouped by pillar:

**Strategy:**
- [Win] — Impact: [what this enabled]

**Design:**
- [Win] — Impact: [what this enabled]

**Engineering:**
- [Win] — Impact: [what this enabled]

**Cross-Pillar:**
- [Win] — Impact: [what this enabled]

### 3. What Didn't Go Well
Grouped by pillar with root cause analysis:

**Strategy:**
- [Issue] — Root cause: [why] — Impact: [hours/stories affected]

**Design:**
- [Issue] — Root cause: [why] — Impact: [hours/stories affected]

**Engineering:**
- [Issue] — Root cause: [why] — Impact: [hours/stories affected]

### 4. Blocker Pattern Analysis
Don't just list blockers — identify patterns:

| Pattern | Occurrences | Root Cause | Systemic Fix |
|---------|------------|-----------|-------------|

Common CMS project patterns:
- Waiting for client content/decisions
- Environment instability
- Integration API changes/downtime
- Unclear acceptance criteria
- Design-to-development handoff gaps

### 5. Previous Retro Action Item Review
| # | Action Item | Owner | Status | Notes |
|---|------------|-------|--------|-------|
| [From last retro] | | | ✅ Done / 🔄 In Progress / ❌ Not Started | |

Completion rate: [X/Y] — If below 80%, discuss why actions aren't being completed.

### 6. Improvement Actions
| # | Action | Owner | Pillar | Due By | Definition of Done |
|---|--------|-------|--------|--------|--------------------|

Rules:
- Maximum 3 actions (focus beats breadth)
- Every action has an owner (not "the team")
- Every action has a definition of done (not "improve communication")
- At least one action addresses the highest-impact blocker pattern

### 7. Team Health Check
Quick pulse on team dynamics:
| Dimension | Rating (1-5) | Trend | Notes |
|-----------|-------------|-------|-------|
| Clarity of requirements | | | |
| Team collaboration | | | |
| Technical confidence | | | |
| Client relationship | | | |
| Sustainable pace | | | |

### 8. Next Sprint Outlook
- Key risks for next sprint
- Dependencies to resolve this week
- Capacity changes (PTO, allocation shifts)
- Recommendations for sprint planning
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-sprint-retrospective/SKILL.md`:

```markdown
---
name: generate-sprint-retrospective
description: Produces structured sprint retrospectives with velocity analysis, blocker patterns, and improvement actions. Use after every sprint to drive continuous improvement.
argument-hint: "[sprint number and team feedback]"
allowed-tools: Read, Glob, Grep
---

# Generate Sprint Retrospective

You are a senior PM at RBA who facilitates retros that produce measurable improvements.

## Your Task

Generate a sprint retrospective for: **$ARGUMENTS**

## Process

### Step 1: Analyze Sprint Data
- Review velocity and completion metrics
- Identify blocker patterns (not just individual blockers)
- Check previous retro action item completion
- Gather team feedback by pillar

### Step 2: Produce the Retrospective
1. Sprint scorecard with metrics and trends
2. What went well (by pillar)
3. What didn't go well (with root causes)
4. Blocker pattern analysis
5. Previous action item review
6. New improvement actions (max 3, with owners)
7. Team health check
8. Next sprint outlook

### Quality Check
- Every improvement action has an owner AND definition of done
- Blocker analysis identifies patterns, not just incidents
- Previous retro actions are reviewed (accountability loop)
- Maximum 3 new actions (focus over breadth)
```

### Usage

```
/generate-sprint-retrospective Sprint 14 — Contoso XM Cloud — completed 34/40 points, 2 stories carried over, blocked 3 days on Content Hub API
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project | `Contoso Corporate Website — Sitecore XM Cloud` |
| `{{SPRINT_NUMBER}}` | Sprint | `Sprint 14 (Jan 20 – Feb 2)` |
| `{{SPRINT_GOAL}}` | What the sprint aimed to deliver | `Complete product listing page with Coveo search and faceted filtering` |
| `{{SPRINT_OUTCOME}}` | What actually happened | `Product listing page complete. Coveo facets partially done — blocked by missing field mappings. 2 stories carried over.` |
| `{{TEAM_FEEDBACK}}` | Raw team input | `Dev: "Coveo field mapping took longer than estimated — docs were wrong." QA: "Testing started late because dev was blocked." PM: "Client was slow to approve search facet design." Design: "Handoff was smooth this sprint."` |
| `{{SPRINT_METRICS}}` | Sprint data | `Planned: 40 points. Completed: 34 points. Carried over: 6 points (2 stories). Velocity trend: 34, 38, 36, 34 (last 4 sprints). Blockers: 2 (Coveo docs, client approval delay).` |
| `{{PREVIOUS_RETRO_ACTIONS}}` | Last retro's action items | `1. Add Coveo sandbox to dev environment (Chris) — Done. 2. Create design handoff template (Lisa) — In progress. 3. Schedule weekly client sync for approvals (Sarah) — Done.` |

## Best Practices

- **Model choice:** Sonnet 4 — retros need fast turnaround while the sprint is fresh. Don't overthink the model choice; iterate on the output instead.
- **Limit to 3 action items:** Teams that commit to 8 improvements complete none. Three focused actions with owners and deadlines create real change.
- **Review previous actions first:** The retrospective loses credibility if the team never checks whether last sprint's actions were completed. Start the retro by reviewing the action item tracker.
- **Identify patterns, not incidents:** "We were blocked by the client" is an incident. "Client approval is the bottleneck in 3 of the last 4 sprints" is a pattern that demands a systemic fix.

## Related Skills

- [Generate Weekly Status Report](/roles/strategy/project-management/generate-weekly-status-report/) — Status reports and retros draw from the same sprint data
- [Decompose Epic into Stories](/roles/strategy/project-management/decompose-epic-into-stories/) — Better story decomposition prevents the carry-over pattern
- [Generate Sprint Summary](/roles/engineering/architecture/generate-sprint-summary/) — The engineering sprint summary feeds the retrospective
