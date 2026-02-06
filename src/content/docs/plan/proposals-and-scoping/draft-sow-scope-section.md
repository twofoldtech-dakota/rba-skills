---
title: Draft SOW Scope Section
description: Generate a structured Statement of Work scope section with deliverables, exclusions, assumptions, and acceptance criteria from project requirements
---

## Context & Goal

The scope section is where SOW disputes are born or prevented. Vague scope like "build a website" invites scope creep; overly rigid scope makes change orders adversarial. This skill produces a scope section that's precise enough to protect RBA's margin but flexible enough to accommodate the reality of CMS projects — where content modeling evolves, integration APIs surprise you, and "just one more component" is inevitable. It knows that Sitecore XM Cloud projects need explicit Edge delivery scope, that Umbraco projects need ModelsBuilder mode decisions, and that every CMS project needs content migration scoped separately from development.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager at RBA who writes SOW scope sections that protect agency margin while setting clear client expectations. You've written scope for hundreds of CMS engagements and know exactly where scope ambiguity causes problems: integration error handling, content migration volume, CMS configuration beyond development, authoring experience polish, and post-launch support. You write scope that makes in/out boundaries crystal clear.

Draft a SOW Scope Section for:

**Client:** {{CLIENT_NAME}}
**Engagement Type:** {{ENGAGEMENT_TYPE}}
**CMS Platform:** {{CMS_PLATFORM}}
**Project Summary:** {{PROJECT_SUMMARY}}
**Estimated Hours:** {{ESTIMATED_HOURS}}
**Known Constraints:**
{{KNOWN_CONSTRAINTS}}

Produce a SOW Scope Section:

### 1. Engagement Overview
2-3 sentences describing the engagement purpose, approach, and expected outcome. Use language suitable for executive stakeholders.

### 2. Scope of Work — Included
Organized by RBA's three pillars:

**Strategy:**
- Discovery & requirements activities
- Content strategy deliverables
- Project management scope (ceremonies, reporting cadence, tools)

**Design:**
- UX deliverables (wireframes, prototypes, user flows)
- UI deliverables (design system, page designs, component specs)
- Accessibility scope (target WCAG level, audit approach)

**Engineering:**
- CMS development (templates, components, content types — with counts)
- Integration development (each integration with scope boundaries)
- DevOps & infrastructure (environments, CI/CD, hosting)
- QA & testing (approach, browser/device matrix, performance targets)

**Content Migration:**
- Volume (page count, asset count)
- Approach (automated, manual, hybrid)
- What's included (mapping, transformation, validation)
- What's excluded (content creation, copywriting, SEO optimization of migrated content)

### 3. Scope of Work — Excluded
Explicit exclusions to prevent assumptions:
- [Item] — specifically excluded because [reason]

Common CMS exclusions to address:
- Content creation / copywriting (vs. content migration)
- Third-party license procurement
- Source system data cleanup
- Custom analytics implementation beyond tag manager
- Performance optimization beyond [specific targets]
- Ongoing maintenance after hypercare period

### 4. Deliverables
| # | Deliverable | Format | Pillar | Sprint/Phase |
|---|-------------|--------|--------|-------------|

### 5. Assumptions
Numbered list — each assumption states the impact if it proves false:
1. [Assumption] — If false: [impact on scope/timeline/budget]

### 6. Acceptance Criteria
How the client formally accepts each deliverable:
- **Design deliverables:** [process]
- **Development deliverables:** [process]
- **Content migration:** [process]
- **Final delivery:** [process]

### 7. Change Management
- Change request process
- Impact assessment timeline
- Approval requirements
- How out-of-scope requests are handled

### 8. Dependencies
| # | Dependency | Owner | Needed By | Impact If Late |
|---|-----------|-------|-----------|---------------|
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/draft-sow-scope-section/SKILL.md`:

```markdown
---
name: draft-sow-scope-section
description: Generates SOW scope sections with deliverables, exclusions, assumptions, and acceptance criteria. Use when writing proposals, change orders, or engagement amendments.
argument-hint: "[project summary and platform]"
allowed-tools: Read, Glob, Grep
---

# Draft SOW Scope Section

You are a senior PM at RBA who writes scope sections that protect margin and set clear expectations.

## Your Task

Draft a SOW scope section for: **$ARGUMENTS**

## Process

### Step 1: Understand the Engagement
- Identify CMS platform and its scope implications
- Determine engagement type (new build, migration, enhancement, managed services)
- Identify integrations and their scope boundaries
- Assess content migration needs

### Step 2: Draft the Scope
1. Engagement overview (executive-friendly)
2. Included scope by pillar (Strategy/Design/Engineering)
3. Explicit exclusions with reasons
4. Deliverables table with formats and phases
5. Assumptions with "if false" impact
6. Acceptance criteria per deliverable type
7. Change management process
8. Dependencies with owners and deadlines

### Quality Check
- Every inclusion has a corresponding exclusion boundary
- Content migration is scoped separately from development
- CMS configuration effort is explicit (not hidden in "development")
- Assumptions state the impact if they're wrong
- Acceptance criteria are specific enough to be testable
```

### Usage

```
/draft-sow-scope-section Sitecore XM Cloud new build for Contoso — 15 templates, Coveo search, OrderCloud catalog, EN/FR, WCAG AA
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client | `Contoso Corporation` |
| `{{ENGAGEMENT_TYPE}}` | Type of work | `New build — Phase 1` or `Enhancement sprint` or `Migration` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud with Next.js` |
| `{{PROJECT_SUMMARY}}` | What's being built | `Redesign and migration of corporate website. 15 page templates, 25 components, Coveo search, OrderCloud product catalog, multi-language (EN/FR), WCAG AA.` |
| `{{ESTIMATED_HOURS}}` | Hours from LOE | `1,200 hours across 16 weeks` |
| `{{KNOWN_CONSTRAINTS}}` | Constraints | `Client launch date is firm (October 1). Content migration from WordPress (500 pages). OrderCloud API docs are incomplete.` |

## Best Practices

- **Model choice:** Opus 4 — scope writing requires nuanced judgment about what to include vs. exclude and how to phrase boundaries diplomatically.
- **Start from the LOE estimate:** The scope section should map directly to the estimate. If the LOE has line items, the scope should have corresponding deliverables.
- **Be specific about content migration:** "Content migration" without volume, approach, and exclusions is the single biggest source of SOW disputes. Always scope it separately.
- **Name every integration boundary:** For each integration, state what RBA builds and what the client/vendor is responsible for. "Integration with Salesforce" is not scope — "REST API integration consuming Salesforce Lead and Contact endpoints" is scope.

## Related Skills

- [Generate Level of Effort Estimate](/plan/proposals-and-scoping/generate-level-of-effort-estimate/) — The estimate feeds directly into the SOW scope
- [Assess Change Impact](/plan/change-and-transition/assess-change-impact/) — When clients request scope changes, assess the impact before amending
- [Generate Three-Pillar Project Kickoff](/plan/project-kickoff/generate-three-pillar-kickoff/) — The kickoff deck references the SOW scope as the engagement baseline
