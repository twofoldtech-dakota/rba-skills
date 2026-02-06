---
title: Audit Content Model
description: Review and document a CMS content model across Sitecore, Umbraco, or Optimizely with field mappings and recommendations
---

## Context & Goal

Content models are the foundation of every CMS implementation. Before migrations, redesigns, or platform upgrades, teams need a clear picture of the current content architecture — what content types exist, how they relate, and where there are gaps or redundancies. This skill produces a structured audit of any CMS content model.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior content strategist with deep expertise in CMS architecture across Sitecore, Umbraco, and Optimizely. You specialize in content modeling, taxonomy design, and migration planning for enterprise websites.

Audit the following CMS content model and produce a structured documentation package:

**Platform:** {{PLATFORM}}
**Content Types / Templates:**
{{CONTENT_TYPES}}

**Field Mappings (if available):**
{{FIELD_MAPPINGS}}

**Context:** {{CONTEXT}}

Produce the following:

1. **Content Model Overview** — Summary of the model's structure, hierarchy, and key relationships
2. **Content Type Inventory** — Table listing each type with: name, purpose, field count, parent/child relationships, estimated instance count (if known)
3. **Field Analysis** — For each content type, list fields with: name, type, required/optional, validation rules, notes on usage
4. **Taxonomy & Classification** — How content is categorized, tagged, or classified. Note any inconsistencies.
5. **Relationship Map** — How content types reference each other (composition, rendering, linking)
6. **Issues & Recommendations**:
   - Redundant or duplicate content types
   - Fields that are defined but appear unused
   - Missing content types for common patterns
   - Naming inconsistencies
   - Opportunities to simplify or consolidate
7. **Migration Considerations** (if platform change is planned) — Field type compatibility, data transformation needs, content that needs restructuring

Use tables for structured data. Be specific — name actual fields and types rather than speaking in generalities.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/audit-content-model/SKILL.md`:

```markdown
---
name: audit-content-model
description: Reviews and documents a CMS content model for Sitecore, Umbraco, or Optimizely. Use when auditing existing content architecture, planning migrations, or documenting content types and field mappings.
argument-hint: "[platform and content type details or file path]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Audit Content Model

You are a senior content strategist with deep expertise in CMS architecture across Sitecore, Umbraco, and Optimizely.

## Your Task

Audit the content model for: **$ARGUMENTS**

## Process

### Step 1: Gather the Model
- Read any referenced files (serialization files, schema exports, template definitions)
- Search the codebase for content type definitions, template configurations, or document type files
- For Sitecore: look in serialization folders, `.yml` template items
- For Umbraco: look for document type configurations, `.json` exports
- For Optimizely: look for content type classes, page type definitions

### Step 2: Analyze and Document
Produce:
1. Content Model Overview
2. Content Type Inventory (table format)
3. Field Analysis per content type
4. Taxonomy & Classification review
5. Relationship Map
6. Issues & Recommendations
7. Migration Considerations (if applicable)

### Step 3: Quality Check
- Every content type in the codebase is accounted for
- Fields list actual names and types, not generalizations
- Recommendations are specific and actionable
```

### Usage

```
/audit-content-model Sitecore XP templates in /serialization/templates/
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PLATFORM}}` | CMS platform and version | `Sitecore XP 10.3` or `Umbraco v13` |
| `{{CONTENT_TYPES}}` | List of content types/templates to audit | `Page, Hero Banner, CTA Block, Navigation Item, Blog Post, Author Profile` |
| `{{FIELD_MAPPINGS}}` | Field details if available (paste exports or describe) | Paste serialization YAML, JSON exports, or describe field structures |
| `{{CONTEXT}}` | Why the audit is needed | `Planning migration from Sitecore XP to XM Cloud — need to identify which templates to carry forward` |

## Best Practices

- **Model choice:** Use Opus 4 for complex models with 20+ content types. Sonnet 4 works well for simpler models or quick reviews.
- **Paste raw data:** If you have serialization files, JSON exports, or screenshots of the content model, include them. The AI produces much better analysis with real data.
- **Specify the "why":** The recommendations change significantly based on whether you're migrating platforms, simplifying for redesign, or documenting for a new team.

## Related Skills

- [Generate Project Brief](/plan/project-kickoff/generate-project-brief/) — The brief often references the content model scope
- [Scaffold Sitecore JSS Component](/build/component-development/scaffold-sitecore-jss-component/) — Use audit findings to inform component scaffolding
