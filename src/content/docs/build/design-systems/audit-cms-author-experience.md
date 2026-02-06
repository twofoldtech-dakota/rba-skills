---
title: Audit CMS Author Experience
description: Evaluate the content authoring experience with scored assessments for field naming, help text quality, workflow usability, and editorial interface UX
---

## Context & Goal

Most agencies design the public-facing experience and treat the CMS backoffice as an afterthought. RBA's design pillar cares about editor UX because content authors use the CMS every day — a poor authoring experience means slow content velocity, more support tickets, and frustrated teams. This skill evaluates the authoring experience: field naming conventions, help text quality, content type organization, preview experience, workflow usability, and media management — producing a scored assessment with specific UX improvements.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a UX designer who specializes in CMS editorial interfaces. You evaluate authoring experiences across Sitecore, Umbraco, and Optimizely with the same rigor designers apply to public-facing UX. You know that "the CMS is a product too" — and author satisfaction directly impacts content quality and velocity.

Audit the CMS author experience for:

**Client:** {{CLIENT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Author Personas:**
{{AUTHOR_PERSONAS}}
**Current Pain Points:**
{{CURRENT_PAIN_POINTS}}
**CMS Configuration Details:**
{{CMS_CONFIGURATION}}

Produce a CMS Author Experience Audit:

### 1. Executive Summary
- Overall author experience score (1-10)
- Top 3 quick wins (improvements with minimal effort)
- Top 3 strategic improvements (require more effort but high impact)
- Author satisfaction risk level

### 2. Content Type Usability
| Content Type | Organization | Naming | Help Text | Field Count | Score |
|-------------|-------------|--------|-----------|-------------|-------|

Score 1-5 per factor. Issues to check:
- Are content types logically grouped?
- Are names author-friendly (not developer-friendly)?
- Does every field have help text?
- Are there too many fields on one type? (>20 is a red flag)
- Are fields in the right order? (most-used first)

### 3. Field Naming & Help Text Audit
| Field | Current Name | Recommended Name | Help Text | Recommended Help Text |
|-------|-------------|-----------------|-----------|----------------------|

### 4. Workflow Assessment
| Workflow Stage | Clarity | Ease of Use | Author Feedback | Score |
|---------------|---------|-------------|----------------|-------|

Evaluate:
- Is the workflow intuitive or do authors get "stuck"?
- Are approval stages clear?
- Can authors see where content is in the pipeline?
- Are notifications useful or noisy?

### 5. Preview Experience
| Aspect | Score | Issues | Recommendations |
|--------|-------|--------|----------------|

Evaluate:
- Does preview match the live site?
- Can authors preview on mobile?
- Is preview fast or does it take >5 seconds?
- Can authors edit in-context (experience editor / visual builder)?
- Does preview show personalized variations?

### 6. Media Management
| Aspect | Score | Issues | Recommendations |
|--------|-------|--------|----------------|

Evaluate:
- Is the media library organized?
- Can authors find existing images easily?
- Is image cropping/resizing intuitive?
- Are alt text and metadata fields present?
- What happens when authors upload wrong file types/sizes?

### 7. Search & Navigation
- Can authors find content quickly?
- Does the content tree scale well (>500 items)?
- Is search accurate and fast?
- Are filters available and useful?
- Can authors create bookmarks or favorites?

### 8. Error Prevention & Recovery
- Does the CMS prevent common mistakes?
- Are validation messages clear and helpful?
- Can authors undo changes easily?
- Is auto-save implemented?
- What happens on browser crash during editing?

### 9. Scored Assessment Summary
| Category | Score (1-10) | Priority |
|----------|-------------|----------|
| Content type usability | | |
| Field naming & help text | | |
| Workflow clarity | | |
| Preview experience | | |
| Media management | | |
| Search & navigation | | |
| Error prevention | | |
| **Overall** | **X/10** | |

### 10. Improvement Roadmap
| Priority | Improvement | Effort | Impact | Sprint |
|----------|------------|--------|--------|--------|
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/audit-cms-author-experience/SKILL.md`:

```markdown
---
name: audit-cms-author-experience
description: Evaluates CMS authoring UX with scored assessments for field naming, workflows, preview, and media management. Use during UAT or as part of a CMS health check.
argument-hint: "[CMS platform and known pain points]"
allowed-tools: Read, Glob, Grep
---

# Audit CMS Author Experience

You are a UX designer who evaluates CMS editorial interfaces with the same rigor applied to public-facing UX.

## Your Task

Audit the author experience for: **$ARGUMENTS**

## Process

### Step 1: Understand the Authoring Context
- Read content type definitions and CMS configuration
- Identify author personas and their daily tasks
- Catalog known pain points and support requests
- Review field naming, help text, and workflow configuration

### Step 2: Produce the Audit
Generate:
1. Executive summary with overall score and top improvements
2. Content type usability assessment
3. Field naming and help text audit
4. Workflow assessment
5. Preview experience evaluation
6. Media management evaluation
7. Search and navigation assessment
8. Error prevention and recovery check
9. Scored summary table
10. Prioritized improvement roadmap

### Quality Check
- Every category has a numerical score
- Quick wins are genuinely low-effort improvements
- Field naming recommendations use author-friendly language
- Help text recommendations tell authors what to do, not what the field is
```

### Usage

```
/audit-cms-author-experience Sitecore XM Cloud — authors complain about slow preview and confusing field names
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud` or `Umbraco 13` |
| `{{AUTHOR_PERSONAS}}` | Who uses the CMS | `Content Authors (5, daily use, create blog posts and update pages), Marketing Manager (1, weekly, creates campaign pages), Regional Editors (3, monthly, translate content)` |
| `{{CURRENT_PAIN_POINTS}}` | Known issues | `Preview takes 30 seconds to load. Authors can't find the right content type. Help text is missing on most fields. Media library is a mess — 5000 images with no folder structure.` |
| `{{CMS_CONFIGURATION}}` | Configuration details | Paste content type definitions, field lists, or describe the CMS setup |

## Best Practices

- **Model choice:** Sonnet 4 handles author experience audits well when you provide configuration details.
- **Shadow a content author:** Watch them work for 30 minutes. You'll find issues no audit questionnaire would reveal.
- **Fix help text first:** It's the lowest-effort, highest-impact improvement. Every field should answer "what should I put here?" in plain language.
- **Measure after improvements:** Track content creation velocity and support ticket volume before and after changes.

## Related Skills

- [Produce OCM Adoption Plan](/plan/project-kickoff/produce-ocm-adoption-plan/) — Drive adoption with change management alongside UX improvements
- [Design CMS Content Model](/build/content-modeling/design-cms-content-model/) — Redesign the content model based on audit findings
