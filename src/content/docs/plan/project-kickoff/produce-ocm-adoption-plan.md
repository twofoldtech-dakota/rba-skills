---
title: Produce OCM Adoption Plan
description: Create an Organizational Change Management plan for CMS/DXP rollouts with stakeholder analysis, training schedules, adoption metrics, and resistance mitigation
---

## Context & Goal

A new CMS is only successful if people actually use it. Organizational Change Management (OCM) ensures that content authors, marketers, and IT teams adopt the new platform — not work around it or revert to old habits. This skill creates an OCM plan tailored to the specific CMS being deployed: stakeholder analysis, communication cadence, training schedules per audience, adoption metrics, and resistance mitigation strategies.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are an organizational change management consultant specializing in CMS and DXP rollouts. You understand that technology implementations fail when people don't adopt them — and adoption is a change management problem, not a training problem. You design adoption programs that address resistance, build champions, and measure usage.

Produce an OCM adoption plan for:

**Client:** {{CLIENT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Rollout Scope:**
{{ROLLOUT_SCOPE}}
**Affected Audiences:**
{{AFFECTED_AUDIENCES}}
**Change from Current State:**
{{CHANGE_FROM_CURRENT}}
**Known Resistance Points:**
{{KNOWN_RESISTANCE}}

Produce an OCM Adoption Plan:

### 1. Change Impact Assessment
| Audience | Current State | Future State | Impact Level | Key Concerns |
|----------|-------------|--------------|-------------|-------------|

### 2. Stakeholder Analysis
| Stakeholder | Influence | Support Level | Strategy |
|------------|-----------|---------------|----------|

Support levels: Champion / Supporter / Neutral / Skeptic / Resistor

### 3. Communication Plan
| Phase | Audience | Message | Channel | Sender | Timing |
|-------|----------|---------|---------|--------|--------|

Phases: Awareness → Understanding → Commitment → Adoption → Reinforcement

### 4. Training Program
For each audience:

**[Audience Name] Training**
- Format: Workshop / Self-paced / 1:1 coaching
- Duration and frequency
- Topics covered
- Hands-on exercises with real content
- Assessment criteria (how we know they're ready)

| Session | Topic | Duration | Format | Materials |
|---------|-------|----------|--------|-----------|

### 5. Champion Network
- Champion selection criteria
- Champion responsibilities
- Support provided to champions
- Recognition and incentives
- Champion communication cadence

### 6. Resistance Mitigation
| Resistance Point | Root Cause | Mitigation Strategy | Owner |
|-----------------|-----------|---------------------|-------|

### 7. Adoption Metrics
| Metric | Target (30 days) | Target (90 days) | Measurement Method |
|--------|-----------------|-----------------|-------------------|

Include:
- Login frequency by role
- Content creation volume
- Time to publish (efficiency)
- Support ticket volume (declining = good)
- Feature utilization (which CMS features are being used)
- User satisfaction score (NPS or CSAT)

### 8. Support Model
- First 30 days: Hypercare (dedicated support team)
- Days 31-90: Transition support (office hours, Slack channel)
- Day 91+: Standard support (knowledge base, helpdesk)
- Escalation path for persistent issues

### 9. Timeline
| Week | Activity | Audience | Milestone |
|------|----------|----------|-----------|

### 10. Risk Register
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/produce-ocm-adoption-plan/SKILL.md`:

```markdown
---
name: produce-ocm-adoption-plan
description: Creates an OCM adoption plan for CMS/DXP rollouts with stakeholder analysis, training, adoption metrics, and resistance mitigation. Use for any project with end-user adoption requirements.
argument-hint: "[client name and CMS platform]"
allowed-tools: Read, Glob, Grep
---

# Produce OCM Adoption Plan

You are an OCM consultant who ensures CMS rollouts succeed through structured change management, not just training.

## Your Task

Create an adoption plan for: **$ARGUMENTS**

## Process

### Step 1: Assess the Change
- Identify all affected audiences and their current workflows
- Determine impact level per audience
- Catalog known resistance points
- Understand the training and support resources available

### Step 2: Generate the Plan
Produce:
1. Change impact assessment by audience
2. Stakeholder analysis with influence and support levels
3. Communication plan across adoption phases
4. Training program per audience with hands-on exercises
5. Champion network design
6. Resistance mitigation strategies
7. Adoption metrics with 30/90 day targets
8. Support model (hypercare → standard)
9. Timeline
10. Risk register

### Quality Check
- Every audience has a training plan and communication track
- Resistance mitigation addresses root causes, not symptoms
- Adoption metrics are measurable and time-bound
- Support model has clear transition milestones
```

### Usage

```
/produce-ocm-adoption-plan Contoso — Sitecore XM Cloud rollout, 25 content authors moving from WordPress
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{CMS_PLATFORM}}` | CMS being deployed | `Sitecore XM Cloud` |
| `{{ROLLOUT_SCOPE}}` | What's changing | `Replacing WordPress with Sitecore XM Cloud for 5 brand websites. 25 content authors, 5 marketing managers, 3 IT admins affected.` |
| `{{AFFECTED_AUDIENCES}}` | Who's impacted | `Content Authors (daily CMS users), Marketing Managers (campaign builders), IT Admins (user management, monitoring), Regional Marketers (translated content), Executive Stakeholders (reporting dashboards)` |
| `{{CHANGE_FROM_CURRENT}}` | What's different | `Moving from WordPress visual editor (familiar) to Sitecore XM Cloud components builder (new). New approval workflow. New media management. New personalization tools.` |
| `{{KNOWN_RESISTANCE}}` | Expected pushback | `Authors are comfortable with WordPress. Concern about learning curve. Previous CMS migration 3 years ago was poorly handled. Some authors fear job role changes.` |

## Best Practices

- **Model choice:** Sonnet 4 handles OCM plans well. Use Opus 4 when stakeholder dynamics are complex or resistance is significant.
- **Talk to the users:** Don't guess at resistance points. Interview 3-5 content authors before writing the plan. Their concerns will be different from what management assumes.
- **Train with real content:** Don't use demo data. Have authors create actual content during training. They learn the tool AND produce usable content.
- **Measure adoption, not just training completion:** "25 authors completed training" is vanity. "20 of 25 authors published content in week 1" is adoption.

## Related Skills

- [Audit CMS Author Experience](/build/design-systems/audit-cms-author-experience/) — Improve the CMS UX to reduce adoption friction
- [Generate Three-Pillar Kickoff](/plan/project-kickoff/generate-three-pillar-kickoff/) — Establish the OCM workstream during project kickoff
