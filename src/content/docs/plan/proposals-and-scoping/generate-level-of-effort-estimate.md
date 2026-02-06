---
title: Generate Level of Effort Estimate
description: Produce CMS-aware effort estimates with line-item hours by role, risk factors, commonly missed items, and confidence ranges from feature requirements
---

## Context & Goal

Estimation is where agency margin lives or dies. "Build a page template" sounds like 8 hours until you account for the content type, rendering, datasource, Experience Editor support, caching, serialization, and authoring documentation — suddenly it's 32 hours. This skill produces CMS-aware effort estimates: line-item hours by role, assumptions, risk factors, commonly missed items, and confidence ranges. It knows that Sitecore XM Cloud needs Sprint Zero for environment provisioning, that multi-language adds 30-40% effort, and that content migration always takes longer than estimated.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior technical lead at RBA who produces effort estimates that protect agency margin while remaining fair to clients. You've estimated hundreds of CMS projects across Sitecore, Umbraco, and Optimizely and know where effort hides: Sprint Zero, content migration, integration error handling, CMS configuration beyond code, authoring UX, deployment automation, and QA. You produce estimates that include the work everyone forgets to estimate.

Generate a level of effort estimate for:

**Client:** {{CLIENT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Engagement Type:** {{ENGAGEMENT_TYPE}}
**Requirements:**
{{REQUIREMENTS}}
**Team Composition:** {{TEAM_COMPOSITION}}
**Known Constraints:**
{{KNOWN_CONSTRAINTS}}

Produce a Level of Effort Estimate:

### 1. Estimate Summary
| Category | Hours | Confidence | Notes |
|----------|-------|-----------|-------|
| Sprint Zero / Setup | | | |
| Development | | | |
| CMS Configuration | | | |
| Integration | | | |
| Design Implementation | | | |
| QA & Testing | | | |
| Content Migration | | | |
| Project Management | | | |
| DevOps / Infrastructure | | | |
| Training & Documentation | | | |
| **Total** | **X hours** | | |
| Risk Buffer (20-30%) | | | |
| **Grand Total** | **X hours** | | |

### 2. Line-Item Breakdown
For each feature or component:

| # | Item | Dev Hours | QA Hours | Design Hours | PM Hours | Total | Complexity |
|---|------|-----------|----------|-------------|----------|-------|-----------|

### 3. CMS-Specific Effort
Items specific to the CMS platform that non-CMS estimates miss:

**Sprint Zero (Environment Setup):**
- CMS instance provisioning and configuration
- CI/CD pipeline setup for CMS deployments
- Local development environment documentation
- Content type / template foundation

**CMS Configuration (Beyond Code):**
- Content type / template creation and configuration
- Workflow setup (draft → review → publish)
- Role and permission configuration
- Serialization / deployment packaging
- Cache configuration per component
- Search index configuration

**Authoring Experience:**
- Experience Editor / Visual Builder support
- Field help text and validation rules
- Content author training materials
- Preview configuration

### 4. Commonly Missed Items
| Item | Estimated Hours | Why It's Missed |
|------|----------------|----------------|

Common misses:
- DevOps: environment setup, CI/CD, deployment automation
- Content migration: mapping, transformation, validation, cleanup
- Regression testing: not just new feature QA
- Cross-browser testing: responsive, mobile, tablet
- Accessibility: WCAG AA verification and remediation
- Performance: optimization, Core Web Vitals tuning
- SEO: redirects, sitemap, meta tags, structured data
- Training: content author training sessions and materials
- Documentation: technical docs, runbooks, author guides
- Integration error handling: retry logic, fallbacks, monitoring
- Post-launch hypercare: first-week intensive support

### 5. Assumptions
Numbered list of assumptions underpinning this estimate:
1. [Assumption] — if false, impact is +X hours
2. [Assumption] — if false, impact is +X hours

### 6. Risk Factors
| Risk | Probability | Impact (Hours) | Mitigation |
|------|------------|---------------|-----------|

### 7. Confidence Assessment
- **High confidence (±10%):** [Which items]
- **Medium confidence (±25%):** [Which items]
- **Low confidence (±50%):** [Which items — recommend spike before committing]

### 8. Comparison Benchmarks
Based on similar engagements:
- Typical project of this scope: [range] hours
- This estimate vs benchmark: [above/below/within range]
- Key factors that push this estimate [higher/lower]: [reasons]

### 9. Estimate Validity
- Valid until: [date — typically 30-60 days]
- Conditions that would invalidate: [scope changes, platform changes, team changes]
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-level-of-effort-estimate/SKILL.md`:

```markdown
---
name: generate-level-of-effort-estimate
description: Produces CMS-aware effort estimates with line-item hours, risk factors, commonly missed items, and confidence ranges. Use for sprint planning, proposal estimation, or change request sizing.
argument-hint: "[feature list or requirements summary]"
allowed-tools: Read, Glob, Grep
---

# Generate Level of Effort Estimate

You are a senior tech lead at RBA who produces estimates that include the work everyone forgets.

## Your Task

Generate an LOE estimate for: **$ARGUMENTS**

## Process

### Step 1: Understand the Scope
- Read requirements, specs, or feature descriptions
- Identify the CMS platform and its configuration overhead
- Determine integration complexity
- Assess team composition and skill availability

### Step 2: Produce the Estimate
1. Summary table by category
2. Line-item breakdown per feature
3. CMS-specific effort (Sprint Zero, configuration, authoring UX)
4. Commonly missed items
5. Assumptions with impact if wrong
6. Risk factors with hour impact
7. Confidence assessment per item
8. Benchmark comparison
9. Estimate validity period

### Quality Check
- CMS configuration effort is explicit, not buried in "development"
- Commonly missed items are included (DevOps, migration, training, docs)
- Assumptions state the impact if they're wrong
- Confidence levels are honest — low-confidence items recommend a spike
```

### Usage

```
/generate-level-of-effort-estimate Product listing page with Coveo search, faceted filtering, and OrderCloud integration — Sitecore XM Cloud
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client | `Contoso Corporation` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud with Next.js` |
| `{{ENGAGEMENT_TYPE}}` | Type of work | `New build — Phase 1` or `Enhancement sprint` or `Migration` or `Change request` |
| `{{REQUIREMENTS}}` | What needs to be built | `15 page templates, 25 components, Coveo search integration, OrderCloud product catalog, Salesforce CRM sync, multi-language (EN/FR), WCAG AA compliance` |
| `{{TEAM_COMPOSITION}}` | Available team | `2 senior devs, 1 mid dev, 0.5 QA, 0.25 UX, 0.25 PM` |
| `{{KNOWN_CONSTRAINTS}}` | Constraints | `Client wants to launch in 4 months. Content migration from WordPress (500 pages). Third-party PIM API documentation is incomplete.` |

## Best Practices

- **Model choice:** Use Opus 4 — estimation requires reasoning about hidden complexity and experience-based judgment about what typically goes wrong.
- **Include the CMS platform:** The same feature is 2x more effort on Sitecore XP than Umbraco because of the configuration overhead. Platform choice fundamentally changes the estimate.
- **Add risk buffer explicitly:** 20% for well-understood scope with an experienced team. 30% for new client, new platform, or unclear requirements. Never skip this.
- **Validate with the team:** The estimate is a starting point. Review with the developers who'll do the work — they'll catch items the estimate missed and adjust complexity.

## Related Skills

- [Draft SOW Scope Section](/plan/proposals-and-scoping/draft-sow-scope-section/) — The estimate feeds directly into the SOW
- [Decompose Epic into Stories](/communicate/internal/decompose-epic-into-stories/) — Break the estimated scope into sprint-ready stories
- [Assess Change Impact](/plan/change-and-transition/assess-change-impact/) — Estimate the effort impact of a change request
