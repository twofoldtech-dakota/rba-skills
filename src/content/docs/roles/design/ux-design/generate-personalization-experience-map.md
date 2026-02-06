---
title: Generate Personalization Experience Map
description: Map personalization touchpoints across the customer journey with segments, triggers, content variations, and measurement criteria
---

## Context & Goal

Personalization without a journey-level plan is just random content swapping. This skill maps personalization touchpoints across the customer journey: which segments see what content, at which touchpoints, triggered by which behaviors, measured by which metrics. Designed for Sitecore CDP/Personalize, Optimizely Experimentation, or Coveo-powered implementations.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a UX strategist specializing in personalized digital experiences. You design personalization at the journey level — not random component swaps — mapping which segments see what content at every meaningful touchpoint. You understand Sitecore CDP/Personalize, Optimizely Experimentation, and Coveo AI recommendations and design experiences that are technically implementable and measurably impactful.

Generate a personalization experience map for:

**Client:** {{CLIENT_NAME}}
**Customer Segments:**
{{CUSTOMER_SEGMENTS}}
**Customer Journey Stages:**
{{JOURNEY_STAGES}}
**Personalization Platform:** {{PERSONALIZATION_PLATFORM}}
**Business Goals:**
{{BUSINESS_GOALS}}

Produce a Personalization Experience Map:

### 1. Segment Definitions
For each segment:
| Segment | Definition | Size | Value | Personalization Priority |
|---------|-----------|------|-------|------------------------|

### 2. Journey-Stage Matrix
| Journey Stage | Touchpoint | Default Experience | Segment A | Segment B | Segment C |
|--------------|-----------|-------------------|-----------|-----------|-----------|

For each personalized cell, specify:
- What changes (headline, image, CTA, layout, content recommendations)
- Why (what behavior or data drives this variation)
- Measurement (how we know this variation is working)

### 3. Trigger-Action Map
| # | Trigger Event | Segment Match | Action | Content Change | Measurement |
|---|--------------|---------------|--------|----------------|-------------|

### 4. Content Variation Inventory
| Component | Variations Needed | Content Requirements | Production Effort |
|-----------|------------------|---------------------|------------------|

### 5. Data Requirements
| Data Point | Source | Availability | Quality | Gap |
|-----------|--------|-------------|---------|-----|

### 6. Measurement Framework
| Experience | Primary Metric | Secondary Metric | Target Lift | Test Duration |
|-----------|---------------|-----------------|-------------|---------------|

### 7. Implementation Priority
| Priority | Experience | Segment | Expected Impact | Effort | Phase |
|----------|-----------|---------|----------------|--------|-------|

### 8. Personalization Rules (Technical)
For each experience, translate business intent into platform rules:
- Audience criteria (behavioral + profile)
- Decision model logic
- Fallback behavior
- Frequency capping

### 9. Content Production Plan
How to create and maintain personalized content at scale:
- Content creation workflow per variation
- Review and approval process for personalized content
- Content refresh schedule
- A/B test content requirements
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-personalization-experience-map/SKILL.md`:

```markdown
---
name: generate-personalization-experience-map
description: Maps personalization touchpoints across the customer journey with segments, triggers, and measurement criteria. Use when defining personalization strategy for a CX engagement.
argument-hint: "[client name and personalization scope]"
allowed-tools: Read, Glob, Grep
---

# Generate Personalization Experience Map

You are a UX strategist who designs journey-level personalization, not random content swaps.

## Your Task

Generate a personalization experience map for: **$ARGUMENTS**

## Process

### Step 1: Understand the Journey
- Identify customer segments and their characteristics
- Map the customer journey stages and touchpoints
- Determine available data for personalization triggers
- Understand the personalization platform capabilities

### Step 2: Generate the Map
Produce:
1. Segment definitions with size and value
2. Journey-stage matrix (touchpoint × segment)
3. Trigger-action map
4. Content variation inventory
5. Data requirements and gaps
6. Measurement framework per experience
7. Implementation priority
8. Technical personalization rules
9. Content production plan

### Quality Check
- Every personalized experience has a measurement metric
- Data requirements identify gaps, not just needs
- Implementation priority balances impact with effort
- Fallback behavior is defined for every experience
```

### Usage

```
/generate-personalization-experience-map Contoso — 3 industry segments, awareness through purchase journey, Sitecore CDP
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{CUSTOMER_SEGMENTS}}` | Target audience segments | `Healthcare professionals (high value, research-focused), IT decision makers (comparison shoppers, feature-focused), C-suite executives (ROI-focused, limited time)` |
| `{{JOURNEY_STAGES}}` | Customer journey stages | `Awareness (organic search, social), Consideration (product pages, case studies), Evaluation (demo request, comparison tools), Decision (pricing, contact sales), Retention (support portal, upsell)` |
| `{{PERSONALIZATION_PLATFORM}}` | Personalization technology | `Sitecore CDP/Personalize` or `Optimizely Experimentation` or `Coveo ML recommendations` |
| `{{BUSINESS_GOALS}}` | What personalization should achieve | `Increase demo request conversion by 20%, reduce bounce rate on product pages by 15%, increase content engagement (pages/session) by 30%` |

## Best Practices

- **Model choice:** Use Opus 4 — journey-level personalization design requires reasoning about segment interactions and measurement validity.
- **Start with 2-3 segments:** Over-segmentation with insufficient traffic produces noise. Prove impact with broad segments, then refine.
- **Plan content production:** Each personalized variation requires content. A 3-segment × 5-touchpoint map means 15 content variations. Budget for this.
- **Define fallbacks first:** The default (non-personalized) experience should still be effective. Personalization improves it — it shouldn't be required.

## Related Skills

- [Generate Personalize Rule Set](/technologies/sitecore/xm-cloud/generate-personalize-rule-set/) — Implement the technical rules this experience map defines
- [Generate User Flow](/roles/design/ux-design/generate-user-flow/) — Map the user flows that personalization modifies
