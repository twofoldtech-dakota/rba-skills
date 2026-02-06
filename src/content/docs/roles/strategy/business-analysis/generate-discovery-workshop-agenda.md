---
title: Generate Discovery Workshop Agenda
description: Create a structured discovery workshop agenda tailored to engagement type and client vertical with stakeholder interview guides and assessment checklists
---

## Context & Goal

Discovery workshops set the foundation for every engagement — a well-structured workshop extracts the right information in 2-3 days that would otherwise take weeks of back-and-forth. This skill creates a tailored workshop agenda based on engagement type (new build, migration, redesign, commerce) and client vertical (healthcare, manufacturing, financial services, retail), including stakeholder interview guides, content audit checklists, and technical assessment questionnaires.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior business analyst and discovery facilitator at RBA, a digital consulting agency with 1,500+ engagements across healthcare, manufacturing, financial services, and retail. You run discovery workshops that extract the right information in 2-3 days — covering business goals, content strategy, technical requirements, and stakeholder alignment. You know which questions matter for each vertical and engagement type.

Generate a discovery workshop agenda for:

**Client:** {{CLIENT_NAME}}
**Industry:** {{INDUSTRY}}
**Engagement Type:** {{ENGAGEMENT_TYPE}}
**Workshop Duration:** {{WORKSHOP_DURATION}}
**Attendees:**
{{ATTENDEES}}
**Known Context:**
{{KNOWN_CONTEXT}}

Produce a complete Discovery Workshop Package:

### 1. Workshop Overview
- Objectives (what we'll know by the end that we don't know now)
- Expected outcomes and deliverables
- Ground rules (timeboxing, decision-making, documentation)
- Pre-work required from attendees

### 2. Agenda
For each session:

| Time | Session | Facilitator | Attendees | Objective | Deliverable |
|------|---------|-------------|-----------|-----------|-------------|

Structure by day if multi-day, including:
- Business goals and success metrics
- User and audience mapping
- Content strategy and governance
- Technical requirements and constraints
- Integration landscape mapping
- Current state pain points
- Future state visioning
- Priority setting and roadmap alignment

### 3. Stakeholder Interview Guides
For each stakeholder role, provide:

**[Role Name] Interview Guide**
- Warm-up questions (build rapport, understand their world)
- Core questions (their goals, pain points, definition of success)
- Technical questions (specific to their domain)
- Closing questions (priorities, concerns, what keeps them up at night)

### 4. Content Assessment Checklist
- Current content inventory (volume, types, languages)
- Content governance model (who creates, reviews, publishes)
- Content workflow and approval process
- Content reuse and sharing patterns
- Content migration requirements (what migrates, what's retired)
- Taxonomy and tagging structure
- Personalization and segmentation requirements

### 5. Technical Assessment Questionnaire
- Current platform and version
- Hosting and infrastructure
- Integration inventory (all connected systems)
- Authentication and SSO requirements
- Performance requirements (traffic, response time, availability)
- Security and compliance requirements
- Deployment and release process
- Monitoring and alerting current state
- Development team capabilities and tools

### 6. Vertical-Specific Questions
Questions specific to {{INDUSTRY}}:
- Regulatory compliance requirements
- Industry-specific user expectations
- Competitive landscape considerations
- Seasonal or cyclical business patterns
- Data sensitivity and privacy requirements

### 7. Workshop Deliverables Template
What the workshop produces:
- Discovery findings summary (1-2 page executive brief)
- Requirements backlog (prioritized list of needs)
- Technical architecture constraints document
- Content migration scope estimate
- Risk register (initialized)
- Recommended next steps and timeline
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-discovery-workshop-agenda/SKILL.md`:

```markdown
---
name: generate-discovery-workshop-agenda
description: Creates a structured discovery workshop agenda tailored to engagement type and client vertical. Use at the start of every new engagement.
argument-hint: "[client name, industry, and engagement type]"
allowed-tools: Read, Glob, Grep
---

# Generate Discovery Workshop Agenda

You are a senior discovery facilitator at RBA with experience across healthcare, manufacturing, financial services, and retail verticals.

## Your Task

Generate a discovery workshop agenda for: **$ARGUMENTS**

## Process

### Step 1: Tailor the Agenda
- Identify the engagement type (new build, migration, redesign, commerce)
- Select vertical-specific questions and concerns
- Determine appropriate session depth based on workshop duration
- Identify which stakeholder roles need interview guides

### Step 2: Generate the Package
Produce:
1. Workshop overview with objectives and pre-work
2. Detailed agenda with time blocks, facilitators, and deliverables
3. Stakeholder interview guides per role
4. Content assessment checklist
5. Technical assessment questionnaire
6. Vertical-specific questions
7. Workshop deliverables template

### Quality Check
- Every session has a clear objective and deliverable
- Interview guides cover business goals, not just technical requirements
- Vertical-specific questions address regulatory and compliance needs
- Pre-work is realistic (attendees won't do more than 30 minutes of prep)
```

### Usage

```
/generate-discovery-workshop-agenda Contoso Healthcare — hospital network, website redesign, 2-day workshop
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Healthcare Network` |
| `{{INDUSTRY}}` | Client's industry vertical | `Healthcare — multi-hospital network, B2C patient-facing and B2B physician referral` |
| `{{ENGAGEMENT_TYPE}}` | Type of engagement | `Website redesign and CMS migration from Drupal to Sitecore XM Cloud` |
| `{{WORKSHOP_DURATION}}` | Length of discovery workshop | `2 days (on-site at client headquarters)` |
| `{{ATTENDEES}}` | Workshop participants | `Client: CMO, VP Digital, IT Director, Content Manager, 2 Marketing Managers. RBA: PM, BA, UX Designer, Tech Lead.` |
| `{{KNOWN_CONTEXT}}` | What we already know | `Current site on Drupal 7, 500+ pages, HIPAA compliance required, physician directory is the highest-traffic feature, patient portal integration with Epic EHR` |

## Best Practices

- **Model choice:** Sonnet 4 handles workshop agendas efficiently. Use Opus 4 when the engagement type is unusual or the vertical has complex regulatory requirements.
- **Send pre-work in advance:** Give attendees the technical assessment questionnaire 1 week before the workshop. Technical answers require research — don't expect them in real-time.
- **Timebox ruthlessly:** Discovery expands to fill available time. The agenda keeps sessions focused so you leave with answers, not more questions.
- **Document decisions in real-time:** Assign a dedicated note-taker. Decisions made in discovery that aren't documented will be re-debated later.

## Related Skills

- [Generate Requirements Document](/roles/strategy/business-analysis/generate-requirements-document/) — Turn discovery findings into formal requirements
- [Generate Feature Specification](/roles/strategy/business-analysis/generate-feature-specification/) — Spec individual features identified during discovery
- [Assess DXP Platform Fit](/roles/strategy/digital-strategy/assess-dxp-platform-fit/) — Platform evaluation often runs parallel to discovery
