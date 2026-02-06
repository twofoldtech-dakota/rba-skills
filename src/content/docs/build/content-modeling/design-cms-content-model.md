---
title: Design CMS Content Model
description: Translate wireframes and content requirements into platform-specific content type definitions with field naming conventions, validation rules, and author help text
---

## Context & Goal

The content model is the foundation that every component, every page, and every integration builds on. Getting it wrong means rework across the entire project. This skill takes wireframes, content requirements, or an existing content inventory and produces platform-specific content type definitions: Sitecore templates with field sections, Umbraco document types with tab groupings, or Optimizely content types with property groups — including field naming conventions, validation rules, and author help text.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior content architect who designs CMS content models that balance author flexibility with developer predictability. You've built content models for Sitecore, Umbraco, and Optimizely across hundreds of projects and know the platform-specific patterns that scale: template inheritance in Sitecore, compositions in Umbraco, and property groups in Optimizely. You design for the content author, not just the developer.

Design a content model for:

**Client:** {{CLIENT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Content Requirements:**
{{CONTENT_REQUIREMENTS}}
**Pages/Components:**
{{PAGES_COMPONENTS}}
**Author Personas:**
{{AUTHOR_PERSONAS}}

Produce a complete CMS Content Model:

### 1. Content Model Overview
- Architecture approach (page types, component types, shared data sources)
- Naming convention (prefix, casing, hierarchy)
- Inheritance/composition strategy
- Content reuse patterns

### 2. Page Types
For each page type:

**[Page Type Name]**
- Purpose and usage
- Parent type (if inheriting)
- Available rendering zones / content areas

| Field Name | Display Name | Type | Required | Validation | Default | Help Text |
|-----------|-------------|------|----------|------------|---------|-----------|

### 3. Component Types
For each reusable component:

**[Component Type Name]**
- Purpose and where it's used
- Datasource location

| Field Name | Display Name | Type | Required | Validation | Default | Help Text |
|-----------|-------------|------|----------|------------|---------|-----------|

### 4. Shared Data Sources
Content items reused across pages:
- Navigation items
- Configuration settings
- Lookup lists (categories, tags, regions)
- Global content (footer, header, legal)

### 5. Field Type Reference
| Field Type | When to Use | Platform Implementation |
|-----------|-------------|----------------------|

Platform-specific type mappings:
- **Sitecore:** Single-Line Text, Rich Text, Image, Link, Droptree, Droplink, Multilist, Treelist
- **Umbraco:** Textstring, Rich Text Editor, Media Picker, Content Picker, Dropdown, Tags
- **Optimizely:** string, XhtmlString, ContentReference, LinkCollection, SelectOne

### 6. Validation Rules
| Rule | Fields Applied To | Implementation |
|------|------------------|----------------|

### 7. Author Experience Design
- Tab/section groupings per content type
- Field ordering rationale (most-edited first)
- Conditional fields (show/hide based on other field values)
- Default values and placeholder text
- Tooltip/help text for complex fields

### 8. Taxonomy Structure
| Taxonomy | Type | Levels | Content Types Using It |
|----------|------|--------|----------------------|

### 9. Multi-Language Strategy
- Which fields are localizable vs shared
- Language fallback configuration
- Translation workflow implications

### 10. Content Model Governance
- Who can create new content types
- Change request process for existing types
- Deprecation procedure
- Naming convention enforcement
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/design-cms-content-model/SKILL.md`:

```markdown
---
name: design-cms-content-model
description: Designs platform-specific CMS content types from wireframes or requirements. Use when translating content strategy into implementable CMS structure.
argument-hint: "[CMS platform and content scope]"
allowed-tools: Read, Glob, Grep
---

# Design CMS Content Model

You are a content architect who designs models that balance author flexibility with developer predictability.

## Your Task

Design a content model for: **$ARGUMENTS**

## Process

### Step 1: Understand Content Needs
- Read wireframes, requirements, or content inventories
- Identify page types, component types, and shared data sources
- Determine the CMS platform and its content modeling patterns
- Understand author personas and editing workflows

### Step 2: Generate Content Model
Produce:
1. Content model overview (architecture, naming, inheritance)
2. Page type definitions with fields
3. Component type definitions with fields
4. Shared data sources
5. Field type reference per platform
6. Validation rules
7. Author experience design (tabs, ordering, help text)
8. Taxonomy structure
9. Multi-language strategy
10. Governance model

### Quality Check
- Every field has a display name, help text, and validation
- Naming conventions are consistent
- Inheritance/composition reduces duplication
- Author experience is optimized (most-edited fields first)
```

### Usage

```
/design-cms-content-model Sitecore XM Cloud — corporate site with blog, case studies, team directory, and product catalog
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{CMS_PLATFORM}}` | Target CMS | `Sitecore XM Cloud` or `Umbraco 13` or `Optimizely CMS 12` |
| `{{CONTENT_REQUIREMENTS}}` | Content scope | `Corporate website with 12 page types, component-based page building, multi-language (EN/FR), personalization for 3 industry segments` |
| `{{PAGES_COMPONENTS}}` | Pages and components needed | `Homepage, Landing Page, Blog List/Detail, Case Study List/Detail, Team Directory/Bio, Product Catalog/Detail, Contact, About. Components: Hero, Card Grid, Feature Block, CTA Banner, Testimonial, Stats Counter, Accordion, Tab Set.` |
| `{{AUTHOR_PERSONAS}}` | Who edits content | `Marketing team (weekly blog posts, campaign pages), Content manager (page structure, navigation), Regional marketers (translated content)` |

## Best Practices

- **Model choice:** Use Opus 4 when the content model is complex (many types, inheritance, multi-language). Sonnet 4 for simple sites.
- **Start with wireframes:** Content types should map to what the author needs to create, not what the developer wants to build. Wireframes show author intent.
- **Help text is not optional:** Every field should have help text that tells the author what to put there, not what the field is. "Enter the client's challenge in 2-3 sentences" not "Client challenge."
- **Test with real content:** Create the content types and enter real content before building components. You'll find field type issues immediately.

## Related Skills

- [Audit Content Model](/build/content-modeling/audit-content-model/) — Audit an existing content model for issues
- [Map Content Migration](/build/content-modeling/map-content-migration/) — Map content from source to this new model
- [Generate Component Specification](/build/design-systems/generate-component-specification/) — Spec the components that render this content model
