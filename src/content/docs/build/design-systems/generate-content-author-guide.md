---
title: Generate Content Author Guide
description: Create a CMS-specific content author guide with field-by-field instructions, content rules, image specs, workflow steps, and publishing checklists
---

## Context & Goal

Content authors are the most important users of every CMS project — and the most underserved. Engineers build the system, designers polish the public experience, but the people who use the CMS 8 hours a day get a 30-minute training session and a "you'll figure it out." This skill produces content author guides that are actually useful: field-by-field instructions for each content type, image specifications, content rules, workflow steps, and publishing checklists. It understands that Sitecore's Experience Editor works differently from Umbraco's backoffice, which works differently from Optimizely's editorial interface — and writes instructions accordingly.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior UX designer at RBA who creates content author guides that make CMS editorial teams self-sufficient. You know that authors don't read documentation linearly — they search for "how do I add a hero banner?" at the moment they need it. You structure guides as task-based reference material, not tutorials. You write for marketing managers and content editors who are smart but not technical.

Generate a Content Author Guide for:

**CMS Platform:** {{CMS_PLATFORM}}
**Content Types:**
{{CONTENT_TYPES}}
**Audience:** {{AUTHOR_AUDIENCE}}
**Workflow:** {{WORKFLOW}}

Produce a Content Author Guide:

### 1. Quick Start
- How to log into the CMS
- Dashboard orientation (what each section does)
- How to find content (search, tree, bookmarks)
- How to preview changes before publishing

### 2. Content Type Reference
For each content type, produce:

#### [Content Type Name]
**Purpose:** What this content type is for and where it appears on the site.

**Fields:**
| Field | Type | Required | Character Limit | Instructions | Example |
|-------|------|----------|-----------------|-------------|---------|

**Image Specifications:**
| Image Field | Dimensions | Format | Max Size | Focal Point? |
|------------|-----------|--------|----------|-------------|

**Content Rules:**
- [Rule 1 — e.g., "Title must be under 60 characters for SEO"]
- [Rule 2 — e.g., "Always include alt text for images"]

**Step-by-Step: Creating a [Content Type]**
1. [Step with screenshot reference]
2. [Step]
3. [Step]

### 3. Component Library
For each reusable component:

#### [Component Name]
- **What it looks like:** [Description or screenshot reference]
- **When to use it:** [Editorial guidance]
- **Fields:** [Field instructions]
- **Dos and Don'ts:** [Common mistakes to avoid]

### 4. Workflow Guide
- **Draft → Review → Publish** flow
- Who approves what
- How to request review
- How to schedule publication
- How to unpublish or archive content

### 5. Media Management
- Supported file types and size limits
- Image naming conventions
- Folder organization structure
- How to replace an existing image
- How to find and reuse existing media

### 6. Publishing Checklist
Before hitting publish, verify:
- [ ] All required fields are filled
- [ ] Images have alt text
- [ ] Links work (internal and external)
- [ ] Preview looks correct on desktop and mobile
- [ ] SEO fields are complete (meta title, description)
- [ ] Content has been reviewed/approved per workflow

### 7. Troubleshooting
| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| [Common author issue] | [Why it happens] | [How to fix it] |

### 8. Glossary
| Term | Definition |
|------|-----------|
| [CMS-specific term] | [Plain-language explanation] |
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-content-author-guide/SKILL.md`:

```markdown
---
name: generate-content-author-guide
description: Creates CMS-specific content author guides with field-by-field instructions, content rules, and publishing checklists. Use when delivering author training materials or documentation.
argument-hint: "[CMS platform and content types]"
allowed-tools: Read, Glob, Grep
---

# Generate Content Author Guide

You are a senior UX designer at RBA who creates author guides that make editorial teams self-sufficient.

## Your Task

Generate a content author guide for: **$ARGUMENTS**

## Process

### Step 1: Identify Content Types
- List all content types and their fields
- Identify reusable components
- Document image specifications
- Map the editorial workflow

### Step 2: Produce the Guide
1. Quick start (login, navigation, preview)
2. Content type reference (field-by-field instructions)
3. Component library (usage guidance)
4. Workflow guide (draft → review → publish)
5. Media management (specs, naming, folders)
6. Publishing checklist
7. Troubleshooting common issues
8. CMS glossary

### Quality Check
- Instructions are task-based ("How do I..."), not feature-based
- Every field has character limits and examples
- Image specs include dimensions, format, and max size
- Troubleshooting covers the top 5 author pain points
```

### Usage

```
/generate-content-author-guide Sitecore XM Cloud — Hero Banner, Product Listing, Article Page, FAQ Accordion, CTA Block
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud` or `Umbraco 13` or `Optimizely CMS 12` |
| `{{CONTENT_TYPES}}` | Content types to document | `Hero Banner (heading, subheading, CTA, background image), Article Page (title, author, date, body, category, featured image), Product Listing (title, filters, sort options)` |
| `{{AUTHOR_AUDIENCE}}` | Who will use the guide | `Marketing team of 5 — experienced with WordPress, new to Sitecore. Mix of content editors and marketing managers.` |
| `{{WORKFLOW}}` | Editorial workflow | `Draft → Editor Review → Legal Review (for regulated content only) → Marketing Manager Approval → Publish` |

## Best Practices

- **Model choice:** Sonnet 4 — author guides need clarity and consistency, not complex reasoning. Speed matters because you often need to produce these quickly before training sessions.
- **Include the CMS platform:** Sitecore Experience Editor instructions are completely different from Umbraco backoffice instructions. Generic "click publish" guidance is useless.
- **Write for the moment of need:** Authors don't read guides cover-to-cover. Structure content so someone can search "how do I add a hero banner?" and find the answer in 30 seconds.
- **Add the "don'ts":** Authors learn faster from "Don't paste from Word — it brings hidden formatting" than from "Use plain text formatting."

## Related Skills

- [Audit CMS Author Experience](/build/design-systems/audit-cms-author-experience/) — Audit the editorial interface before writing the guide — fix UX issues rather than documenting workarounds
- [Design CMS Content Model](/build/content-modeling/design-cms-content-model/) — The content model defines the types the author guide documents
- [Generate Knowledge Transfer Package](/operate/knowledge-transfer/generate-knowledge-transfer-package/) — The author guide is one component of the full KT package
