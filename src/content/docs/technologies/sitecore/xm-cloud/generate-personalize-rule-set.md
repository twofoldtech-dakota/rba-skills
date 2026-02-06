---
title: Generate Sitecore Personalize Rule Set
description: Create CDP/Personalize configuration with audience definitions, decision models, experience variations, and A/B test specs from business requirements
---

## Context & Goal

Sitecore CDP and Personalize replace the old xDB rule-based personalization with a modern experimentation and personalization engine. Translating business requirements ("show different hero content to returning visitors in the healthcare segment") into CDP audience definitions, decision models, and experience variations requires understanding both the business intent and the technical configuration. This skill generates the full configuration package.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a Sitecore CDP/Personalize specialist who translates business personalization requirements into technical configurations. You understand audience segmentation, decision models, full-stack and web experiences, A/B testing methodology, and the CDP data model. You design personalization that is measurable, maintainable, and delivers business results.

Generate a Personalize rule set for:

**Client:** {{CLIENT_NAME}}
**Business Requirements:**
{{BUSINESS_REQUIREMENTS}}
**Available Data Points:**
{{AVAILABLE_DATA_POINTS}}
**Target Pages/Components:**
{{TARGET_COMPONENTS}}
**Success Metrics:**
{{SUCCESS_METRICS}}

Produce a Sitecore Personalize Configuration Package:

### 1. Personalization Strategy Overview
- Personalization maturity level (rules-based → ML-driven)
- Segment prioritization (which segments get personalized first)
- Measurement framework (how we prove it's working)
- Rollout plan (which experiences launch when)

### 2. Audience Definitions
For each audience segment:

| Segment Name | Criteria | Data Source | Size Estimate | Priority |
|-------------|----------|-------------|--------------|----------|

Detailed segment rules:
- Behavioral triggers (pages viewed, actions taken)
- Profile attributes (industry, company size, role)
- Session data (referrer, device, location)
- Historical data (visit frequency, lifetime value)

### 3. Decision Models
For each decision point:

**Decision Model: [Name]**
- Trigger: When this model evaluates
- Inputs: Data points considered
- Variants: Options to choose from
- Decision logic: Rules or ML model
- Fallback: Default when no segment matches
- Traffic allocation: % per variant

### 4. Experience Definitions
For each personalized experience:

**Experience: [Name]**
- Type: Web / Full-Stack / Triggered
- Target: Page URL or component identifier
- Variants:
  | Variant | Audience | Content Changes | Priority |
  |---------|----------|-----------------|----------|
- Scheduling: Start/end dates, day-parting
- Frequency capping: Max impressions per visitor

### 5. A/B Test Specifications
For each experiment:

| Test Name | Hypothesis | Variants | Traffic Split | Duration | Primary Metric | MDE |
|-----------|-----------|----------|---------------|----------|---------------|-----|

MDE = Minimum Detectable Effect (the smallest improvement worth measuring)

### 6. Data Collection Configuration
- Events to track (custom events beyond default page views)
- Guest profile extensions (custom attributes)
- Data retention settings
- Consent management integration
- Identity resolution rules

### 7. Integration Configuration
- XM Cloud component mapping (which components respond to personalization)
- API integration for full-stack experiences
- Analytics integration (CDP → Google Analytics / Adobe Analytics)
- CRM integration (segment sync to Salesforce / HubSpot)

### 8. Content Variation Matrix
| Component | Default | Segment A | Segment B | Segment C |
|-----------|---------|-----------|-----------|-----------|

For each variation, specify exactly what changes (headline, image, CTA, layout).

### 9. Measurement Dashboard
Metrics to track per experience:
- Engagement lift (time on page, scroll depth, interactions)
- Conversion lift (primary goal, micro-conversions)
- Revenue impact (if commerce)
- Statistical significance threshold (95% confidence)

### 10. Governance
- Who can create and modify experiences
- Approval workflow for new experiences
- Experience naming conventions
- Archive policy for ended experiments
- Documentation requirements per experience
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-personalize-rule-set/SKILL.md`:

```markdown
---
name: generate-personalize-rule-set
description: Generates Sitecore CDP/Personalize configuration with audiences, decision models, and A/B test specs. Use when implementing personalization features.
argument-hint: "[personalization requirements]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Generate Sitecore Personalize Rule Set

You are a Sitecore CDP/Personalize specialist who translates business requirements into measurable personalization configurations.

## Your Task

Generate personalization configuration for: **$ARGUMENTS**

## Process

### Step 1: Understand Requirements
- Read personalization requirements and user research
- Identify available data points for segmentation
- Determine target components and pages
- Understand success metrics

### Step 2: Generate Configuration
Produce:
1. Personalization strategy overview
2. Audience definitions with detailed criteria
3. Decision models with logic and fallbacks
4. Experience definitions with variants
5. A/B test specifications with statistical parameters
6. Data collection configuration
7. XM Cloud integration configuration
8. Content variation matrix
9. Measurement dashboard metrics
10. Governance model

### Quality Check
- Every audience has measurable criteria
- Decision models have fallback defaults
- A/B tests have minimum detectable effect defined
- Content variations specify exactly what changes
```

### Usage

```
/generate-personalize-rule-set Homepage personalization — 3 industry segments, returning vs new visitors, campaign-specific hero
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{BUSINESS_REQUIREMENTS}}` | What personalization should achieve | `1. Show industry-specific hero content (healthcare, manufacturing, financial services). 2. Return visitors see "welcome back" with recently viewed products. 3. Campaign landing pages personalize based on UTM source. 4. A/B test CTA copy and color on product pages.` |
| `{{AVAILABLE_DATA_POINTS}}` | Data available for segmentation | `Page views, product views, form submissions, UTM parameters, company size (from Clearbit enrichment), industry (from IP lookup), past purchase history (from OrderCloud)` |
| `{{TARGET_COMPONENTS}}` | Components to personalize | `Homepage hero, product recommendation rail, CTA buttons, content hub featured articles, navigation mega-menu panels` |
| `{{SUCCESS_METRICS}}` | How to measure success | `Primary: conversion rate (demo request form). Secondary: engagement rate (pages per session, time on site). Commerce: average order value, add-to-cart rate.` |

## Best Practices

- **Model choice:** Use Opus 4 — personalization strategy requires reasoning about segment interactions and measurement validity.
- **Start simple:** Launch with 2-3 segments and measure before adding complexity. Over-segmentation with insufficient traffic produces noise, not insights.
- **Define the fallback first:** The "no personalization" default experience should still be good. Personalization improves it — it shouldn't be required for the page to work.
- **Run experiments long enough:** Most personalization A/B tests need 2-4 weeks to reach statistical significance. Don't call winners early.

## Related Skills

- [Plan XP-to-XM Cloud Migration](/technologies/sitecore/xm-cloud/plan-xp-to-xm-cloud-migration/) — Migrating xDB personalization rules to CDP/Personalize
- [Generate Personalization Experience Map](/roles/design/ux-design/generate-personalization-experience-map/) — Design-level personalization touchpoint mapping
