---
title: Generate Three-Pillar Project Kickoff
description: Create a project kickoff deck structured around RBA's Strategy-Design-Engineering triad with team assignments, RACI matrix, and risk register
---

## Context & Goal

Every RBA engagement starts with a kickoff that establishes the three-pillar operating model — Strategy, Design, and Engineering working as an integrated unit, not siloed handoffs. This skill generates a kickoff package: engagement model context, team structure with pillar assignments, Definition of Done per pillar, communication cadence, RACI matrix, and an initialized risk register. It sets the ground rules so the team and client are aligned from day one.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager at RBA, a digital consulting agency that delivers through three integrated pillars: Strategy, Design, and Engineering. You run kickoffs that set teams up for success by establishing clear roles, communication patterns, and quality standards from day one. You know that the first meeting sets the tone for the entire engagement.

Generate a project kickoff package for:

**Client:** {{CLIENT_NAME}}
**Project:** {{PROJECT_NAME}}
**Engagement Type:** {{ENGAGEMENT_TYPE}}
**Duration:** {{DURATION}}
**Team Members:**
{{TEAM_MEMBERS}}
**Client Stakeholders:**
{{CLIENT_STAKEHOLDERS}}
**Project Scope Summary:**
{{SCOPE_SUMMARY}}

Produce a complete Kickoff Package:

### 1. Engagement Context
- Client overview and industry context
- Business problem being solved
- Project vision statement (2-3 sentences)
- Success criteria and measurable outcomes
- How this project fits RBA's three-pillar model

### 2. Team Structure
**RBA Team:**
| Name | Pillar | Role | Responsibilities | Availability |
|------|--------|------|------------------|-------------|

**Client Team:**
| Name | Role | Decision Authority | Responsibilities | Availability |
|------|------|--------------------|------------------|-------------|

### 3. Three-Pillar Operating Model
For each pillar:

**Strategy Pillar**
- Scope of work for this engagement
- Key deliverables and milestones
- Definition of Done for Strategy artifacts
- Handoff points to Design and Engineering

**Design Pillar**
- Scope of work for this engagement
- Key deliverables and milestones
- Definition of Done for Design artifacts
- Handoff points from Strategy and to Engineering

**Engineering Pillar**
- Scope of work for this engagement
- Key deliverables and milestones
- Definition of Done for Engineering artifacts
- Handoff points from Design and acceptance criteria

### 4. RACI Matrix
| Activity | {{STAKEHOLDER_COLUMNS}} |
|----------|{{DASHES}}|

Activities to include:
- Requirements approval
- Design approval
- Content creation
- Content approval
- Code deployment (staging)
- Code deployment (production)
- UAT sign-off
- Go-live decision
- Change request approval
- Budget approval
- Risk escalation

### 5. Communication Plan
| Ceremony | Frequency | Duration | Attendees | Purpose |
|----------|-----------|----------|-----------|---------|

Include:
- Sprint planning
- Daily standups
- Sprint review / demo
- Sprint retrospective
- Client status meeting
- Steering committee
- Ad-hoc escalation process

### 6. Tools & Access
| Tool | Purpose | Who Needs Access | Setup Owner |
|------|---------|-----------------|-------------|

### 7. Risk Register (Initialized)
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|-----------|--------|------------|-------|--------|

Pre-populate with common risks for this engagement type.

### 8. Definition of Done
**Story-level DoD:**
- [ ] Acceptance criteria met
- [ ] Code reviewed and approved
- [ ] Unit tests written and passing
- [ ] Accessibility requirements verified
- [ ] CMS authoring tested
- [ ] Deployed to staging environment
- [ ] Product owner acceptance

**Sprint-level DoD:**
- [ ] All committed stories meet story-level DoD
- [ ] No critical or high-severity defects open
- [ ] Sprint review demo completed
- [ ] Status report sent to client

**Release-level DoD:**
- [ ] All sprint-level DoD criteria met
- [ ] Regression test suite passed
- [ ] Performance benchmarks met
- [ ] Security scan clear
- [ ] Client UAT sign-off received

### 9. Assumptions & Dependencies
- Project assumptions that need client validation
- External dependencies with expected timelines
- Client deliverables with due dates

### 10. Next Steps
- Immediate actions per pillar (next 2 weeks)
- First milestone target
- Key decisions needed before work begins
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-three-pillar-kickoff/SKILL.md`:

```markdown
---
name: generate-three-pillar-kickoff
description: Generates a project kickoff package structured around RBA's Strategy-Design-Engineering model. Use at the start of every engagement.
argument-hint: "[client name and project type]"
allowed-tools: Read, Glob, Grep
---

# Generate Three-Pillar Project Kickoff

You are a senior PM at RBA who runs kickoffs that establish the three-pillar operating model from day one.

## Your Task

Generate a kickoff package for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read any referenced SOW, project brief, or discovery documents
- Identify team members, client stakeholders, and their roles
- Determine the engagement type and timeline

### Step 2: Generate the Kickoff Package
Produce:
1. Engagement context with vision and success criteria
2. Team structure tables (RBA + client)
3. Three-pillar scope breakdown with Definition of Done per pillar
4. RACI matrix for key activities
5. Communication plan with ceremonies
6. Tools & access requirements
7. Initialized risk register
8. Definition of Done (story, sprint, release levels)
9. Assumptions & dependencies
10. Next steps with immediate actions per pillar

### Quality Check
- Every team member appears in both the team table and RACI
- Definition of Done is measurable, not subjective
- Risk register has specific mitigations, not "monitor"
- Communication plan specifies frequency, attendees, and purpose
```

### Usage

```
/generate-three-pillar-kickoff Contoso Corp — Sitecore XM Cloud build, 6-month engagement
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{PROJECT_NAME}}` | Project name | `Corporate Website Redesign — Sitecore XM Cloud` |
| `{{ENGAGEMENT_TYPE}}` | Type of engagement | `New build` or `Migration` or `Redesign` or `Staff Augmentation` |
| `{{DURATION}}` | Project timeline | `6 months, 12 two-week sprints` |
| `{{TEAM_MEMBERS}}` | RBA team with roles | `Sarah (PM), Mike (Tech Lead/Eng), Lisa (UX/Design), James (BA/Strategy), Alex (Senior Dev/Eng), Pat (QA/Eng)` |
| `{{CLIENT_STAKEHOLDERS}}` | Client team with roles | `Jane (VP Marketing, Executive Sponsor), Tom (IT Director, Technical Approver), Chris (Content Manager, Day-to-Day Contact)` |
| `{{SCOPE_SUMMARY}}` | Project scope in 3-5 sentences | `Redesign and migrate the corporate website from WordPress to Sitecore XM Cloud. 150 pages, 3 language versions, integration with Salesforce CRM and Akeneo PIM. Personalization for 3 industry segments. WCAG AA compliance required.` |

## Best Practices

- **Model choice:** Sonnet 4 handles kickoff packages well — the format is structured and the content is drawn directly from provided context.
- **Customize the RACI for each engagement:** The generic RACI is a starting point. Adjust activities and responsibility assignments based on the actual engagement model.
- **Send the kickoff deck before the meeting:** Give clients 24 hours to review so the meeting is about questions and alignment, not reading slides for the first time.
- **Track assumptions actively:** Unvalidated assumptions become risks. Move every assumption to either "confirmed" or "risk register" within the first two sprints.

## Related Skills

- [Generate Project Brief](/plan/project-kickoff/generate-project-brief/) — The brief that precedes this kickoff
- [Generate Weekly Status Report](/plan/sprint-ceremonies/generate-weekly-status-report/) — The recurring report that starts after kickoff
- [Decompose Epic into Stories](/communicate/internal/decompose-epic-into-stories/) — Break the scope into sprint-ready stories after kickoff
