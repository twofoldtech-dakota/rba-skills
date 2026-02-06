---
title: Draft Managed Services Transition Plan
description: Generate a post-launch transition plan from project delivery to RBA's "Websites Never Close" managed services with SLA tiers and knowledge transfer
---

## Context & Goal

The handoff from project delivery to managed services is where institutional knowledge walks out the door — if you let it. RBA's "Websites Never Close" managed services model requires a structured transition: SLA tier recommendation, monitoring setup, escalation procedures, knowledge transfer, runbook requirements, and a 90-day onboarding timeline. This skill generates that transition plan so nothing falls through the cracks between the team that built it and the team that runs it.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager at RBA who has transitioned dozens of projects from active development to RBA's "Websites Never Close" managed services. You understand the SLA tiers, monitoring requirements, escalation procedures, and knowledge transfer rituals that make the difference between a smooth handoff and a "nobody knows how this works" disaster.

Generate a managed services transition plan for:

**Client:** {{CLIENT_NAME}}
**Project:** {{PROJECT_NAME}}
**Platform:** {{PLATFORM}}
**Go-Live Date:** {{GO_LIVE_DATE}}
**Current Team:**
{{CURRENT_TEAM}}
**System Architecture:**
{{SYSTEM_ARCHITECTURE}}
**Integrations:**
{{INTEGRATIONS}}

Produce a complete Managed Services Transition Plan:

### 1. Executive Summary
- Transition timeline (start date through full handover)
- Recommended SLA tier with justification
- Key risks during transition period
- Success criteria for transition completion

### 2. SLA Tier Recommendation
| Factor | Bronze | Silver | Gold | Recommended |
|--------|--------|--------|------|-------------|
| Response time (P1) | ... | ... | ... | ... |
| Response time (P2) | ... | ... | ... | ... |
| Uptime SLA | ... | ... | ... | ... |
| Monitoring hours | ... | ... | ... | ... |
| Included dev hours/month | ... | ... | ... | ... |
| Monthly retainer | ... | ... | ... | ... |

Justification for the recommended tier based on client's business needs, traffic patterns, and regulatory requirements.

### 3. Knowledge Transfer Plan
| Session | Topic | Presenter | Audience | Duration | Artifacts |
|---------|-------|-----------|----------|----------|-----------|

Cover:
- Architecture and infrastructure overview
- Deployment procedures
- Content authoring workflows
- Integration points and failure modes
- Security configuration and access management
- Performance monitoring and alerting
- Common issues and resolution procedures
- Vendor contacts and escalation paths

### 4. Runbook Requirements
List of runbooks that must be created before transition:
- Deployment runbook (step-by-step deployment procedure)
- Rollback runbook (how to revert a bad deployment)
- Incident response runbook (P1-P4 triage procedures)
- CMS administration runbook (user management, cache clearing, content publishing)
- Integration monitoring runbook (health checks for each integration)
- SSL certificate renewal runbook
- Database maintenance runbook
- Backup and recovery runbook

### 5. Monitoring & Alerting Setup
| Monitor | Tool | Threshold | Alert Channel | Escalation |
|---------|------|-----------|---------------|------------|

Cover:
- Uptime monitoring (per URL)
- Performance monitoring (response time, TTFB)
- Error rate monitoring (5xx, 4xx spike detection)
- Infrastructure monitoring (CPU, memory, disk, queue depth)
- SSL certificate expiry
- Integration health checks
- Security scan schedule
- Content publishing queue health

### 6. 90-Day Onboarding Timeline

**Days 1-30: Shadow Period**
- Managed services team shadows project team
- Access provisioning and security review
- Runbook review and gap identification
- First on-call rotation (with project team backup)

**Days 31-60: Assisted Operations**
- Managed services team takes primary on-call
- Project team available for escalation
- First monthly health report generated
- Process refinements based on actual incidents

**Days 61-90: Full Handover**
- Managed services team fully autonomous
- Project team off-rotation
- Transition retrospective
- Final knowledge gaps addressed
- Transition sign-off

### 7. Access & Security Transition
| System | Current Access | Managed Services Access | Rotation Schedule |
|--------|---------------|------------------------|-------------------|

Include credential rotation plan and security audit of transition.

### 8. Maintenance Windows & Schedules
- Scheduled maintenance windows (when and how communicated)
- Patch management cadence
- CMS version update schedule
- SSL renewal schedule
- Backup verification schedule

### 9. Escalation Matrix
| Severity | Description | Response Time | Resolution Time | Escalation Path |
|----------|-------------|---------------|-----------------|-----------------|
| P1 | Site down | ... | ... | ... |
| P2 | Major feature broken | ... | ... | ... |
| P3 | Minor issue | ... | ... | ... |
| P4 | Enhancement request | ... | ... | ... |

### 10. Transition Completion Checklist
- [ ] All runbooks written and reviewed
- [ ] Monitoring and alerting configured and tested
- [ ] Managed services team has all required access
- [ ] Knowledge transfer sessions completed
- [ ] On-call rotation established
- [ ] First monthly health report delivered
- [ ] Client communication cadence established
- [ ] Project team off-call rotation
- [ ] Transition retrospective completed
- [ ] Client sign-off on transition
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/draft-managed-services-transition/SKILL.md`:

```markdown
---
name: draft-managed-services-transition
description: Generates a post-launch transition plan from project delivery to RBA's "Websites Never Close" managed services. Use 4-6 weeks before go-live.
argument-hint: "[client name and platform]"
allowed-tools: Read, Glob, Grep
---

# Draft Managed Services Transition Plan

You are a senior PM at RBA who has transitioned dozens of projects to managed services under the "Websites Never Close" model.

## Your Task

Generate a transition plan for: **$ARGUMENTS**

## Process

### Step 1: Understand the System
- Read architecture documentation, deployment guides, and integration specs
- Identify the platform, hosting model, and monitoring tools
- Catalog integrations and their failure modes
- Assess complexity for SLA tier recommendation

### Step 2: Generate the Transition Plan
Produce:
1. Executive summary with timeline and SLA recommendation
2. SLA tier comparison with recommendation
3. Knowledge transfer plan with sessions and artifacts
4. Runbook requirements list
5. Monitoring & alerting setup
6. 90-day onboarding timeline (shadow → assisted → full handover)
7. Access & security transition
8. Maintenance windows & schedules
9. Escalation matrix (P1-P4)
10. Transition completion checklist

### Quality Check
- SLA recommendation is justified by business needs
- Every integration has a monitoring check
- Runbook list covers deployment, rollback, incident, and maintenance
- 90-day timeline has clear exit criteria per phase
```

### Usage

```
/draft-managed-services-transition Contoso Corp — Sitecore XM Cloud on Azure, go-live March 1
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{PROJECT_NAME}}` | Project name | `Corporate Website — Sitecore XM Cloud` |
| `{{PLATFORM}}` | CMS platform and hosting | `Sitecore XM Cloud, Next.js on Vercel, Azure Functions` |
| `{{GO_LIVE_DATE}}` | Planned launch date | `March 1, 2025` |
| `{{CURRENT_TEAM}}` | Project team members | `Sarah (PM), Mike (Tech Lead), Alex (Dev), Lisa (Designer), James (BA)` |
| `{{SYSTEM_ARCHITECTURE}}` | Architecture overview | `XM Cloud for CMS, Next.js on Vercel for delivery, Azure Functions for API integrations, Coveo for search, OrderCloud for commerce` |
| `{{INTEGRATIONS}}` | External system integrations | `Salesforce CRM, Akeneo PIM, Stripe payments, SendGrid email, Google Analytics 4, Azure AD SSO` |

## Best Practices

- **Model choice:** Sonnet 4 handles transition plans well — the structure is clear and content is drawn from provided context.
- **Start 6 weeks before go-live:** The managed services team needs time to shadow, learn the system, and build confidence before they're on-call solo.
- **Write runbooks during development, not after:** Every deployment procedure, every integration troubleshooting step — document it as you build it. Retro-documenting is always incomplete.
- **Test the escalation path:** Run a mock P1 incident during the shadow period. You'll find gaps in the process before a real incident reveals them.

## Related Skills

- [Generate Knowledge Transfer Package](/roles/engineering/devops/generate-knowledge-transfer-package/) — The comprehensive KT package that feeds this transition
- [Produce Managed Services Health Report](/roles/security-oversight/performance/produce-managed-services-health-report/) — The monthly health report the managed services team produces
- [Guide Incident Response](/roles/security-oversight/security/guide-incident-response/) — The incident response process used during managed services
