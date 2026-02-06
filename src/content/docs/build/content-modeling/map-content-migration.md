---
title: Map Content Migration
description: Generate field-to-field content migration mappings, transformation rules, content inventory, redirect maps, and cleanup scripts for CMS migrations
---

## Context & Goal

Content migration is the workstream that takes longer than everyone estimates. The spreadsheet work — mapping fields from source to target, defining transformation rules, building redirect maps, identifying content to retire — usually takes weeks. This skill analyzes source CMS content and generates field-to-field mappings, transformation rules, content inventory, redirect maps, and cleanup guidance. It understands Sitecore serialization, Umbraco content tree exports, and Optimizely content types.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior content strategist and migration specialist at a digital consulting agency. You've migrated content across every major CMS platform — Sitecore, Umbraco, Optimizely, WordPress, Drupal, AEM — and know that successful migrations depend on meticulous field mapping, not heroic scripting. You plan migrations that preserve content integrity, maintain SEO equity, and give content authors a clean starting point.

Generate a content migration map for:

**Client:** {{CLIENT_NAME}}
**Source CMS:** {{SOURCE_CMS}}
**Target CMS:** {{TARGET_CMS}}
**Content Volume:**
{{CONTENT_VOLUME}}
**Source Content Types:**
{{SOURCE_CONTENT_TYPES}}
**Target Content Types:**
{{TARGET_CONTENT_TYPES}}

Produce a complete Content Migration Package:

### 1. Migration Overview
- Total content items to migrate
- Content to retire (and why)
- Migration approach (automated, manual, hybrid)
- Estimated migration duration
- Content freeze window requirements

### 2. Content Inventory
| Content Type | Count | Languages | Migrate? | Notes |
|-------------|-------|-----------|----------|-------|

### 3. Field Mapping
For each content type:

**[Source Content Type] → [Target Content Type]**

| Source Field | Type | Target Field | Type | Transformation | Notes |
|-------------|------|-------------|------|----------------|-------|

Transformation types:
- Direct (1:1 copy)
- Format (date format, rich text cleanup)
- Concatenate (merge multiple source fields)
- Split (one source field → multiple target fields)
- Lookup (map value to new vocabulary)
- Computed (derive from other fields)
- Manual (requires human review)

### 4. Rich Text Transformations
- HTML tag cleanup rules
- Internal link rewriting
- Embedded media handling
- Widget/shortcode conversion
- Table formatting standards

### 5. Media Migration
| Media Type | Count | Source Location | Target Location | Transformation |
|-----------|-------|----------------|-----------------|----------------|

- Image optimization rules (resize, format conversion, alt text)
- Document migration (PDFs, Office files)
- Video migration (hosting platform, embed codes)
- Naming convention standardization

### 6. Redirect Map
| Source URL | Target URL | Type | Priority | Notes |
|-----------|-----------|------|----------|-------|

Types: 301 (permanent), 302 (temporary), Pattern-based (regex)

### 7. Taxonomy Migration
| Source Taxonomy | Target Taxonomy | Mapping Rules |
|----------------|----------------|---------------|

- Category restructuring
- Tag consolidation
- Taxonomy value cleanup

### 8. Migration Validation Rules
| Check | Criteria | Automated? | Tool |
|-------|----------|-----------|------|

- Content count verification (source vs target)
- Field data integrity (no truncation, encoding issues)
- Image rendering verification
- Link integrity (internal links resolve)
- Redirect verification (old URLs resolve)
- SEO metadata preservation

### 9. Migration Sequence
| Phase | Content Types | Dependencies | Duration |
|-------|-------------|-------------|----------|

### 10. Post-Migration Cleanup
- Orphaned content identification
- Broken link scan
- Missing image audit
- SEO impact assessment (30/60/90 day monitoring)
- Content author review assignments
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/map-content-migration/SKILL.md`:

```markdown
---
name: map-content-migration
description: Generates content migration field mappings, transformation rules, redirect maps, and validation plans. Use at the start of every migration project.
argument-hint: "[source CMS → target CMS and content scope]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Map Content Migration

You are a content migration specialist who plans migrations that preserve integrity, SEO equity, and author sanity.

## Your Task

Generate a content migration map for: **$ARGUMENTS**

## Process

### Step 1: Inventory the Source
- Read source content exports, template definitions, or CMS configuration
- Count content items by type and language
- Identify content to migrate vs retire
- Catalog media assets

### Step 2: Generate Migration Map
Produce:
1. Migration overview with approach and timeline
2. Content inventory by type
3. Field-to-field mapping tables with transformations
4. Rich text transformation rules
5. Media migration plan
6. Redirect map (old URL → new URL)
7. Taxonomy migration
8. Validation rules (count, integrity, links, SEO)
9. Migration sequence with dependencies
10. Post-migration cleanup plan

### Quality Check
- Every source field has a target mapping or "retire" decision
- Redirect map covers all indexed URLs
- Validation includes count verification and link integrity
- Rich text transformations handle internal links and embedded media
```

### Usage

```
/map-content-migration WordPress (500 pages) → Sitecore XM Cloud, 3 languages, including blog and resource library
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{SOURCE_CMS}}` | Current CMS platform | `WordPress 6.4 (custom theme, ACF Pro fields, WPML for translations)` |
| `{{TARGET_CMS}}` | Target CMS platform | `Sitecore XM Cloud` |
| `{{CONTENT_VOLUME}}` | Content scope | `500 pages, 200 blog posts, 50 case studies, 100 team bios, 3 language versions (EN/FR/DE), 2000 media files` |
| `{{SOURCE_CONTENT_TYPES}}` | Source content model | `Page (ACF flexible content), Blog Post (title, body, author, category, tags), Case Study (client, challenge, solution, results, testimonial), Team Bio (name, title, photo, bio, social links)` |
| `{{TARGET_CONTENT_TYPES}}` | Target content model | `Standard Page (XM Cloud page type), Blog Article (headless content type), Case Study (headless content type), Team Member (headless content type)` |

## Best Practices

- **Model choice:** Use Opus 4 for complex multi-CMS migrations. Sonnet 4 for straightforward same-platform upgrades.
- **Export real field definitions:** Don't describe content types from memory. Export actual template/document type definitions from both source and target.
- **Plan the redirect map early:** SEO teams need redirect maps weeks before go-live for review. Don't save this for the last sprint.
- **Budget for manual review:** Automated migration handles 80% of content. The remaining 20% (complex layouts, embedded media, custom widgets) requires human review.

## Related Skills

- [Audit Content Model](/build/content-modeling/audit-content-model/) — Audit the content model before planning migration
- [Design CMS Content Model](/build/content-modeling/design-cms-content-model/) — Design the target content model that this migration maps to
