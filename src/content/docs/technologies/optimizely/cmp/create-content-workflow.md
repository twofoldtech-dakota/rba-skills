---
title: Create Content Marketing Workflow
description: Design a content marketing workflow in Optimizely CMP including campaign structure, approval chains, and publishing orchestration
---

## Context & Goal

Optimizely's Content Marketing Platform (CMP) orchestrates how content moves from idea to published asset across channels. Without well-designed workflows, content bottlenecks at approvals, campaigns ship without brand review, and editors publish to the wrong channels. This skill designs CMP workflows — campaign structures, approval chains, task assignments, and publishing rules — tailored to a client's content operations and team structure.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior content operations specialist with deep expertise in Optimizely CMP, content workflow design, editorial governance, and multi-channel publishing orchestration. You understand how marketing teams create, review, approve, and publish content at scale.

Design a content marketing workflow for the following organization:

**Organization:** {{ORGANIZATION_NAME}}

**Content Types:**
{{CONTENT_TYPES}}

**Team Structure:**
{{TEAM_STRUCTURE}}

**Approval Requirements:**
{{APPROVAL_REQUIREMENTS}}

**Publishing Channels:**
{{PUBLISHING_CHANNELS}}

Produce the following workflow design:

### 1. Workflow Overview
- End-to-end content lifecycle summary (ideation → archive)
- Workflow philosophy — what this design optimizes for (speed, compliance, quality)
- Key design decisions and trade-offs
- How this maps to Optimizely CMP's workflow engine

### 2. Campaign Structure
- Campaign types (product launch, seasonal, always-on, event-driven)
- Campaign naming conventions
- Campaign metadata (objective, audience, budget, KPIs)
- Campaign hierarchy (parent campaigns, sub-campaigns)
- Campaign templates for common patterns
- Editorial calendar integration

### 3. Content Creation Workflow
Define stages with entry/exit criteria:
- **Ideation** — Brief creation, topic assignment, keyword research
- **Draft** — Content creation, asset gathering, SEO optimization
- **Review** — Peer review, subject matter expert review
- **Approval** — Brand, legal, stakeholder sign-off
- **Publish** — Channel-specific formatting, scheduling, go-live
- **Post-Publish** — Performance monitoring, iteration, archival

For each stage specify:
- Who does the work (role)
- What they produce (deliverable)
- What triggers the next stage (transition criteria)
- SLA (expected time in stage)
- Escalation path if SLA is breached

### 4. Role Definitions and Permissions
For each role in the workflow:
- Responsibilities and capabilities within CMP
- Content types they can create/edit
- Approval authority
- Permissions (read, write, approve, publish, delete)
- Dashboard and view configuration

### 5. Approval Chain Design
- Approval workflows by content type (not all content needs the same rigor)
- Sequential vs. parallel approval paths
- Required vs. optional approvers
- Escalation rules (auto-approve after timeout, escalate to manager)
- Exception handling (urgent content, executive override)
- Conditional approvals (legal review only if claims are made)

### 6. Task Templates and Assignments
- Standard task templates for each content type
- Auto-assignment rules (round-robin, by expertise, by region)
- Task dependencies (design assets must be approved before article layout)
- Due date calculation (relative to campaign launch date)
- Notification and reminder configuration

### 7. Editorial Calendar Structure
- Calendar views (monthly, weekly, by channel, by campaign)
- Content slot planning
- Capacity management (team workload visibility)
- Conflict detection (overlapping campaigns, channel saturation)
- Holiday and blackout date handling

### 8. Publishing Orchestration
- Channel-specific publishing rules:
  - Website (CMS integration, page creation/update)
  - Email (ESP integration, send scheduling)
  - Social media (platform-specific formatting, scheduling)
  - Paid media (ad copy and creative handoff)
- Cross-channel coordination (synchronized launches)
- Time zone handling for global publishing
- A/B testing integration for publishable content

### 9. Asset Management Integration
- Digital asset management workflow within CMP
- Image and video approval process
- Brand asset library governance
- Asset versioning and expiry

### 10. Analytics and Reporting
- Content performance dashboards
- Workflow efficiency metrics (time in stage, bottleneck identification)
- Campaign ROI tracking
- Content audit reports (aging content, unpublished drafts)

### 11. Governance Rules
- Content naming and taxonomy standards
- Archival and sunset policies
- Compliance requirements (industry-specific)
- Training and onboarding plan for new team members

Include specific Optimizely CMP configuration recommendations where applicable. Use concrete examples, not abstract descriptions.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/create-content-workflow/SKILL.md`:

```markdown
---
name: create-content-workflow
description: Designs content marketing workflows for Optimizely CMP including campaign structure, approval chains, task templates, and publishing orchestration. Use when setting up or restructuring content operations in Optimizely CMP.
argument-hint: "[organization name and content operations requirements]"
allowed-tools: Read, Glob, Grep
---

# Create Content Marketing Workflow

You are a senior content operations specialist with deep expertise in Optimizely CMP, content workflow design, editorial governance, and multi-channel publishing.

## Your Task

Design a content marketing workflow for: **$ARGUMENTS**

## Process

### Step 1: Understand the Organization
- Read any existing workflow documentation, content strategy docs, or team structure files
- Identify the content types being produced
- Map the team roles involved in content creation
- Understand the publishing channels

### Step 2: Design the Workflow
Produce:
1. End-to-end workflow overview
2. Campaign structure and templates
3. Stage-by-stage content creation workflow with SLAs
4. Role definitions and permissions
5. Approval chain design per content type
6. Task templates with assignment rules
7. Editorial calendar structure
8. Publishing orchestration per channel
9. Asset management integration
10. Analytics and reporting configuration
11. Governance rules

### Step 3: Quality Check
- Every content type has a defined workflow path
- Approval chains are proportionate to content risk (not everything needs legal review)
- SLAs are realistic for the team size
- Publishing orchestration covers all specified channels
- Governance rules are specific and enforceable
```

### Usage

```
/create-content-workflow Enterprise B2B SaaS company with 5-person content team publishing blog posts, whitepapers, case studies, and social content across website, email, LinkedIn, and Twitter
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ORGANIZATION_NAME}}` | Company or business unit name | `Acme Financial Services — Marketing Division` |
| `{{CONTENT_TYPES}}` | Types of content produced | `Blog posts, whitepapers, case studies, product data sheets, social media posts, email newsletters, webinar promotions` |
| `{{TEAM_STRUCTURE}}` | Roles and team size | `Content Director (1), Senior Writers (2), Junior Writers (3), Designer (1), SEO Specialist (1), Social Media Manager (1), Legal Reviewer (1)` |
| `{{APPROVAL_REQUIREMENTS}}` | Who must approve what | `All external content requires brand review. Financial claims require legal sign-off. Product content requires product manager approval. Social posts require marketing director approval.` |
| `{{PUBLISHING_CHANNELS}}` | Where content is published | `Corporate website (Optimizely CMS), Email (Marketo), Social (LinkedIn, Twitter, Facebook), Paid (Google Ads, LinkedIn Ads)` |

## Best Practices

- **Model choice:** Use Opus 4 for workflow design. Content operations involve complex conditional logic, organizational politics, and multi-stakeholder trade-offs that benefit from deeper reasoning. Sonnet 4 works for simple, single-channel workflows.
- **Map the real process first:** Before designing the ideal workflow, document how content actually moves through the organization today. The gap between current and ideal is where the design effort should focus.
- **Right-size approval chains:** Over-approving kills velocity. A social media post should not require the same approval chain as a regulatory whitepaper. Design different chains for different content types.
- **Set realistic SLAs:** Workflows fail when SLAs are aspirational rather than achievable. Base time estimates on actual team capacity and historical throughput.
- **Plan for exceptions:** Every workflow needs an "urgent" fast-track path. Design it intentionally rather than letting people route around the process.

## Related Skills

- [Create Digital Roadmap](/roles/strategy/digital-strategy/create-digital-roadmap/) — Content workflows often align to broader digital strategy roadmaps
- [Audit Content Model](/roles/strategy/content-strategy/audit-content-model/) — The content model must support the content types in the workflow
