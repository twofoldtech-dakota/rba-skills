---
title: Generate Staff Augmentation Onboarding Kit
description: Create onboarding materials for RBA team members embedding in client environments with tech stack orientation, quality standards, and communication protocols
---

## Context & Goal

When an RBA team member embeds in a client environment for staff augmentation, they need to maintain RBA's quality standards while adapting to the client's tools, processes, and culture. This skill creates onboarding materials: client tech stack orientation, RBA quality standards to maintain in client codebases, communication protocols, and the "RBA Way" quality checklist that ensures every RBA team member delivers at a consistent standard regardless of where they're working.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior delivery manager at RBA who onboards team members for staff augmentation engagements. You ensure that every RBA engineer, designer, or strategist who embeds in a client environment represents RBA's quality standard — while integrating smoothly into the client's existing team and processes.

Generate an onboarding kit for:

**RBA Team Member:** {{TEAM_MEMBER}}
**Client:** {{CLIENT_NAME}}
**Client Environment:**
{{CLIENT_ENVIRONMENT}}
**Engagement Scope:** {{ENGAGEMENT_SCOPE}}
**Duration:** {{DURATION}}
**Client Team Structure:**
{{CLIENT_TEAM_STRUCTURE}}

Produce a Staff Augmentation Onboarding Kit:

### 1. Engagement Overview
- Client context and business domain
- Your role and expected contributions
- Success criteria (what "great" looks like in this engagement)
- Reporting structure (client-side and RBA-side)

### 2. Client Tech Stack Orientation
| Technology | Version | Purpose | Key Docs | RBA Experience Level |
|-----------|---------|---------|----------|---------------------|

- Local development setup specifics
- Build and deployment workflow
- Testing frameworks and requirements
- Code review process and standards

### 3. Client Process & Ceremonies
| Ceremony | Frequency | Your Role | Preparation Needed |
|----------|-----------|-----------|-------------------|

- Sprint cadence and planning process
- Standup format and expectations
- Code review and approval workflow
- Deployment process and permissions
- Communication channels (Slack, Teams, email norms)

### 4. RBA Quality Standards to Maintain
Regardless of client process, maintain these RBA standards:

**Code Quality:**
- [ ] All code has appropriate test coverage
- [ ] Accessibility requirements met (WCAG 2.2 AA minimum)
- [ ] No security vulnerabilities introduced (OWASP Top 10)
- [ ] Performance budgets respected
- [ ] Code is clean, well-named, and maintainable

**Communication:**
- [ ] Proactive status updates (don't wait to be asked)
- [ ] Risks surfaced early with proposed mitigations
- [ ] Technical decisions documented with rationale
- [ ] Knowledge sharing with client team members

**Professional Standards:**
- [ ] Billable hours tracked accurately and submitted on time
- [ ] Client-facing communication is professional and constructive
- [ ] RBA confidential information kept separate from client work
- [ ] Weekly check-in with RBA delivery manager

### 5. Communication Protocol
| Channel | When to Use | Response Time | Example |
|---------|-------------|---------------|---------|
| Client Slack | Day-to-day work | Same day | Sprint questions, PR reviews |
| Client email | Formal communication | 24 hours | Meeting notes, decisions |
| RBA check-in | Weekly status | Scheduled | Engagement health, concerns |
| RBA escalation | Blockers, concerns | Same day | Scope creep, ethical issues |

### 6. First-Week Checklist
- [ ] Access provisioned for all required systems
- [ ] Local development environment working
- [ ] Introduced to all team members
- [ ] First code contribution submitted (even if small)
- [ ] Sprint ceremonies attended
- [ ] Client coding standards reviewed
- [ ] RBA check-in scheduled
- [ ] Emergency contacts exchanged

### 7. Engagement Boundaries
- What's in scope for your role vs what to escalate to RBA
- How to handle requests that expand beyond your engagement scope
- Client IP and confidentiality expectations
- When and how to say "that's outside my engagement scope"

### 8. Knowledge Capture
- Document learnings that benefit RBA's broader practice
- Identify patterns that could become RBA skills or templates
- Share anonymized insights in RBA knowledge-sharing channels
- Flag technologies or approaches RBA should evaluate
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-staff-augmentation-onboarding-kit/SKILL.md`:

```markdown
---
name: generate-staff-augmentation-onboarding-kit
description: Creates onboarding materials for RBA team members embedding in client environments. Use every time someone starts a staff augmentation engagement.
argument-hint: "[team member name and client context]"
allowed-tools: Read, Glob, Grep
---

# Generate Staff Augmentation Onboarding Kit

You are a senior delivery manager at RBA who ensures every embedded team member represents RBA's quality standard.

## Your Task

Generate an onboarding kit for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read any engagement documentation, SOW, or client onboarding materials
- Identify the client's tech stack, tools, and processes
- Determine the team member's role and expected contributions

### Step 2: Generate the Kit
Produce:
1. Engagement overview with success criteria
2. Client tech stack orientation
3. Client process and ceremonies guide
4. RBA quality standards checklist
5. Communication protocol
6. First-week checklist
7. Engagement boundaries
8. Knowledge capture expectations

### Quality Check
- Quality standards are actionable checkboxes
- Communication protocol covers both client and RBA channels
- First-week checklist is achievable in 5 business days
- Boundaries are clear about scope and escalation paths
```

### Usage

```
/generate-staff-augmentation-onboarding-kit Alex (Senior Dev) joining Contoso's .NET team for Umbraco 13 migration
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{TEAM_MEMBER}}` | RBA team member name and role | `Alex Chen, Senior Software Engineer` |
| `{{CLIENT_NAME}}` | Client company | `Contoso Corporation` |
| `{{CLIENT_ENVIRONMENT}}` | Client's tech stack and tools | `Umbraco 13, .NET 8, Azure DevOps, Visual Studio 2022, Teams for communication, Jira for project management` |
| `{{ENGAGEMENT_SCOPE}}` | What the team member is doing | `Backend development for Umbraco 13 migration — converting v8 document types and custom code to v13 patterns` |
| `{{DURATION}}` | Engagement length | `6 months, starting February 1` |
| `{{CLIENT_TEAM_STRUCTURE}}` | Client's team | `Tech Lead: Sarah (client), 3 developers (client), 1 QA (client), PM: Tom (client). Alex reports to Sarah for daily work, weekly check-in with RBA PM.` |

## Best Practices

- **Model choice:** Sonnet 4 handles this efficiently — the structure is clear and content is drawn from provided context.
- **Customize for each engagement:** Don't send a generic kit. Include the client's actual tools, actual ceremonies, and actual team members.
- **Review with the team member:** Walk through the kit together. They'll have questions that improve the document.
- **Update the kit at midpoint:** After 3 months, update based on what actually works. The day-one kit is always partially wrong.

## Related Skills

- [Generate Knowledge Transfer Package](/roles/engineering/devops/generate-knowledge-transfer-package/) — KT package for when the augmentation engagement ends
- [Review Pull Request](/roles/engineering/architecture/review-pull-request/) — Maintain code quality standards in client codebases
