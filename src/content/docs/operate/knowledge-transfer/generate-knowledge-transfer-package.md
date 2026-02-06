---
title: Generate Knowledge Transfer Package
description: Create a comprehensive KT package for project handoffs with architecture docs, deployment procedures, monitoring guides, and escalation procedures
---

## Context & Goal

Knowledge transfer is the documentation everyone agrees is important and nobody writes until the last day. This skill generates a comprehensive KT package: architecture docs, deployment procedures, monitoring dashboards, content author guides, and escalation procedures. Designed for three scenarios: RBA-to-RBA team rotations, RBA-to-client handoffs, and project-to-managed-services transitions.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior engineer who has delivered and handed off dozens of CMS-based web applications. You write KT documentation that prevents the "nobody knows how this works" problem. You know that the best KT docs are the ones a new team member can follow on day one without calling the original developer.

Generate a knowledge transfer package for:

**Project:** {{PROJECT_NAME}}
**Platform:** {{PLATFORM}}
**Handoff Type:** {{HANDOFF_TYPE}}
**Architecture Overview:**
{{ARCHITECTURE_OVERVIEW}}
**Key Integrations:**
{{KEY_INTEGRATIONS}}
**Team Structure:**
{{TEAM_STRUCTURE}}

Produce a complete Knowledge Transfer Package:

### 1. System Overview
- Architecture diagram description (components, data flows, hosting)
- Technology stack with version numbers
- Repository structure and key directories
- Environment inventory (dev, staging, production URLs)

### 2. Local Development Setup
Step-by-step guide to get the project running locally:
1. Prerequisites (tools, versions, access)
2. Repository clone and setup
3. Environment configuration (.env, secrets, local overrides)
4. Build and run commands
5. Verification steps (what to check to confirm it's working)
6. Common setup issues and resolutions

### 3. Architecture Decisions
Key decisions and why they were made:
| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|

### 4. Deployment Guide
- CI/CD pipeline description (triggers, stages, approvals)
- Environment promotion flow (dev → staging → production)
- Deployment commands and scripts
- Pre-deployment checklist
- Post-deployment verification steps
- Rollback procedure (step-by-step)

### 5. CMS Administration
- Content type inventory with field descriptions
- Content authoring workflows
- User roles and permissions
- Media library structure and conventions
- Publishing and cache clearing procedures
- Common authoring tasks with screenshots/descriptions

### 6. Integration Documentation
For each integration:
| Integration | Direction | Protocol | Auth | Error Handling | Monitoring |
|-------------|-----------|----------|------|----------------|------------|

- Data flow diagram
- API contracts and endpoints
- Authentication and key rotation
- Retry and failure handling
- Health check endpoints

### 7. Monitoring & Alerting
- Dashboard URLs and what each monitors
- Alert definitions and notification channels
- On-call expectations and rotation
- Performance baselines (what "normal" looks like)
- Capacity thresholds and scaling procedures

### 8. Troubleshooting Guide
| Symptom | Likely Cause | Resolution | Runbook |
|---------|-------------|------------|---------|

Common issues the team has encountered and how they were resolved.

### 9. Security & Access
- Access management (who has access to what, how to request)
- Secret management (where secrets are stored, rotation schedule)
- Security scan schedule and tools
- Compliance requirements and verification

### 10. Vendor & Contact Directory
| Service | Vendor | Support Contact | Account Owner | Contract Renewal |
|---------|--------|----------------|---------------|-----------------|

### 11. Known Issues & Technical Debt
| Item | Impact | Workaround | Priority | Notes |
|------|--------|-----------|----------|-------|

### 12. Handoff Checklist
- [ ] All documentation reviewed by receiving team
- [ ] Access provisioned for all environments
- [ ] KT sessions completed (architecture, deployment, CMS admin)
- [ ] On-call rotation transferred
- [ ] Vendor contacts introduced
- [ ] Known issues walkthrough completed
- [ ] First independent deployment verified
- [ ] Emergency contacts exchanged
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-knowledge-transfer-package/SKILL.md`:

```markdown
---
name: generate-knowledge-transfer-package
description: Generates a comprehensive KT package for project handoffs — architecture, deployment, monitoring, troubleshooting, and CMS admin guides. Use at the end of every project phase or team rotation.
argument-hint: "[project name and handoff type]"
allowed-tools: Read, Glob, Grep, Bash(git log *), Bash(git remote *)
---

# Generate Knowledge Transfer Package

You are a senior engineer who writes KT docs that a new team member can follow on day one.

## Your Task

Generate a KT package for: **$ARGUMENTS**

## Process

### Step 1: Inventory the System
- Read project README, package.json, and configuration files
- Search for existing documentation
- Identify deployment scripts and CI/CD configuration
- Catalog integrations and their configuration
- Check for environment-specific configuration

### Step 2: Generate the Package
Produce:
1. System overview with architecture and tech stack
2. Local development setup (step-by-step)
3. Architecture decisions (what and why)
4. Deployment guide with rollback procedure
5. CMS administration guide
6. Integration documentation
7. Monitoring & alerting guide
8. Troubleshooting guide with common issues
9. Security & access management
10. Vendor contact directory
11. Known issues & technical debt
12. Handoff checklist

### Quality Check
- Setup guide is reproducible by someone with no project context
- Deployment guide includes rollback steps
- Every integration has error handling documented
- Known issues have workarounds
```

### Usage

```
/generate-knowledge-transfer-package Contoso website — handoff from project team to managed services
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name | `Contoso Corporate Website` |
| `{{PLATFORM}}` | Technology platform | `Sitecore XM Cloud, Next.js 14, Azure Functions, Coveo Search` |
| `{{HANDOFF_TYPE}}` | Type of handoff | `Project team → Managed services` or `Team A → Team B rotation` or `RBA → Client internal team` |
| `{{ARCHITECTURE_OVERVIEW}}` | High-level architecture | `XM Cloud for CMS, Next.js on Vercel for delivery, Azure Functions for API middleware, Coveo for search, OrderCloud for commerce, Salesforce for CRM sync` |
| `{{KEY_INTEGRATIONS}}` | External integrations | `Salesforce CRM (bi-directional contact sync), Akeneo PIM (product data import), Stripe (payment processing), SendGrid (transactional email)` |
| `{{TEAM_STRUCTURE}}` | Current and receiving teams | `Current: Mike (Tech Lead), Alex (Dev), Pat (QA). Receiving: Managed services team (3 engineers, 1 PM)` |

## Best Practices

- **Model choice:** Sonnet 4 for generating the structure and filling in known details. Use Opus 4 when you need to analyze the actual codebase to identify architecture decisions and integration patterns.
- **Write incrementally:** Don't wait until the last sprint. Start the KT package at project midpoint and update it each sprint.
- **Test the setup guide:** Have someone outside the project follow the local dev setup guide. Every step they get stuck on is a gap.
- **Include the "why" for architecture decisions:** New teams can change implementations but they need to understand the constraints that led to the original decisions.

## Related Skills

- [Draft Managed Services Transition](/plan/change-and-transition/draft-managed-services-transition/) — The transition plan this KT package supports
- [Generate Architecture Decision Record](/build/architecture-and-integration/generate-architecture-decision-record/) — Individual ADRs that feed into the architecture decisions section
