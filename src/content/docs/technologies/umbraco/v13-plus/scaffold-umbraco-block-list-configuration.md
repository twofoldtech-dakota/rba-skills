---
title: Scaffold Umbraco Block List Configuration
description: Generate Block List editor configurations with element types, settings models, rendering partials, and authoring UX optimizations for Umbraco v13+
---

## Context & Goal

Block List is Umbraco's primary structured content editor for flexible page sections — replacing the deprecated Nested Content and Grid editors. But configuring Block List well requires more than adding element types: it needs thoughtful grouping, settings models for layout control, label templates for authoring clarity, thumbnail previews, validation rules, and rendering partials that handle every edge case. Poorly configured Block Lists create authoring chaos — editors don't know which block to choose, can't tell what content is in collapsed blocks, and accidentally create layout combinations that break the frontend. This skill scaffolds Block List configurations that are both developer-clean and author-friendly — informed by RBA's Umbraco Certified Master expertise.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Umbraco developer with Certified Master-level expertise in Block List configuration. You know that Block List replaces Nested Content and the Grid, and that a well-configured Block List makes content authoring intuitive while a poorly configured one creates chaos. You design Block Lists with proper element types, settings models, label templates, grouping, validation, and rendering — focused on both developer maintainability and author experience.

Scaffold a Block List Configuration for:

**Page/Section:** {{PAGE_OR_SECTION}}
**Blocks Needed:**
{{BLOCKS_NEEDED}}
**Authoring Requirements:**
{{AUTHORING_REQUIREMENTS}}
**Rendering Target:** {{RENDERING_TARGET}}

Produce a Block List Configuration:

### 1. Element Type Definitions
For each block:

#### [Block Name] Element Type
**Alias:** `blockName`
**Icon:** [Appropriate icon]
**Group:** [Logical grouping for the authoring UI]

**Content Properties:**
| Property | Alias | Type | Required | Validation | Help Text |
|----------|-------|------|----------|-----------|-----------|

**Settings Properties (layout/appearance controls):**
| Property | Alias | Type | Default | Options | Help Text |
|----------|-------|------|---------|---------|-----------|

**Label Template:** `{blockTitle}` or custom Razor expression for collapsed block preview

### 2. Block List Data Type Configuration

```json
{
  "blocks": [
    {
      "contentElementTypeKey": "[GUID]",
      "settingsElementTypeKey": "[GUID]",
      "label": "{{blockTitle}}",
      "editorSize": "medium",
      "forceHideContentEditorInOverlay": false,
      "thumbnail": "/images/block-thumbnails/block-name.png",
      "iconColor": "#00b8d9",
      "backgroundColor": "#f0f0f0"
    }
  ],
  "validationLimit": {
    "min": 1,
    "max": 20
  },
  "useSingleBlockMode": false,
  "useLiveEditing": true,
  "useInlineEditingAsDefault": true
}
```

### 3. Block Grouping Strategy
| Group | Blocks | Purpose |
|-------|--------|---------|
| Content | [blocks] | Text-heavy content blocks |
| Media | [blocks] | Image, video, gallery blocks |
| Interactive | [blocks] | Forms, CTAs, accordions |
| Layout | [blocks] | Columns, spacers, dividers |

### 4. Settings Models
For each block's settings (separate from content):
- Background color/image selection
- Padding/spacing options (preset values, not pixel inputs)
- Width constraint (full-width, contained, narrow)
- Visibility toggles (show/hide on mobile)
- CSS class injection for design variants

### 5. Rendering Partials

```cshtml
@* /Views/Partials/blocklist/Components/blockName.cshtml *@
@inherits Umbraco.Cms.Web.Common.Views.UmbracoViewPage<BlockListItem>
@{
    var content = Model.Content as BlockNameElement;
    var settings = Model.Settings as BlockNameSettings;
    if (content == null) return;
}

<section class="block-@(settings?.BackgroundColor ?? "default")"
         data-block="block-name">
    @* Block rendering *@
</section>
```

### 6. Authoring UX Optimizations
- **Inline editing:** Enable for text-heavy blocks (hero, text, CTA)
- **Block thumbnails:** Provide preview images so authors recognize blocks visually
- **Label templates:** Show meaningful content in collapsed view (not just "Block 1, Block 2")
- **Validation:** Minimum/maximum blocks, required fields, character limits
- **Help text:** Every field has help text explaining what it does and where it appears

### 7. Content Delivery API Serialization
```json
// Expected JSON output for headless delivery
{
  "contentProperties": {
    "blocks": {
      "contentData": [...],
      "settingsData": [...],
      "layout": { "Umbraco.BlockList": [...] }
    }
  }
}
```

### 8. Migration Notes (if replacing Nested Content or Grid)
- Property editor mapping
- Data migration approach
- Content value conversion
- Rendering partial updates
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-umbraco-block-list-configuration/SKILL.md`:

```markdown
---
name: scaffold-umbraco-block-list-configuration
description: Scaffolds Umbraco Block List configurations with element types, settings models, rendering partials, and authoring UX. Use when building flexible content sections in Umbraco v13+.
argument-hint: "[page section and blocks needed]"
allowed-tools: Read, Glob, Grep, Bash(dotnet *)
---

# Scaffold Umbraco Block List Configuration

You are an Umbraco Certified Master who designs Block List configurations for great authoring UX.

## Your Task

Scaffold a Block List configuration for: **$ARGUMENTS**

## Process

### Step 1: Design the Block Model
- Define element types with content and settings properties
- Plan block grouping for the authoring UI
- Design label templates for collapsed block preview
- Map rendering requirements

### Step 2: Generate the Configuration
1. Element type definitions (properties, validation, help text)
2. Block List data type JSON configuration
3. Block grouping strategy
4. Settings models (layout/appearance)
5. Rendering partials (Razor)
6. Authoring UX optimizations
7. Content Delivery API serialization
8. Migration notes (if replacing Nested Content/Grid)

### Quality Check
- Every block has both content and settings element types
- Label templates show meaningful content in collapsed view
- Help text explains every field
- Rendering handles null/missing content gracefully
```

### Usage

```
/scaffold-umbraco-block-list-configuration Homepage body content — Hero Banner, Featured Content Cards, Stats Counter, Testimonial Slider, CTA Banner, FAQ Accordion
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PAGE_OR_SECTION}}` | Where this Block List lives | `Homepage body content` or `Article flexible content zone` or `Landing page sections` |
| `{{BLOCKS_NEEDED}}` | Blocks to include | `Hero Banner (heading, subheading, CTA, background image), Content Cards (3-up with image, title, description, link), Stats Counter (number, label, icon), Testimonial (quote, author, company, photo), CTA Banner (heading, description, primary + secondary CTA), FAQ Accordion (question/answer pairs)` |
| `{{AUTHORING_REQUIREMENTS}}` | Author UX needs | `Marketing team needs to build pages without developer help. Block thumbnails required. Maximum 15 blocks per page. Some blocks restricted to specific page types.` |
| `{{RENDERING_TARGET}}` | How blocks render | `Razor views with BEM CSS classes` or `Content Delivery API → Next.js frontend` or `Hybrid — Razor views with API fallback` |

## Best Practices

- **Model choice:** Sonnet 4 for standard configurations. Opus 4 for complex scenarios with conditional rendering, nested blocks, or Content Delivery API serialization issues.
- **Always add settings models:** Content properties store what the block says. Settings properties control how it looks (background, spacing, width). Keep them separate for clean authoring.
- **Use label templates:** Authors can't tell collapsed blocks apart without label templates. `{{heroHeading}}` in the label template shows the actual heading text in the collapsed view.
- **Provide block thumbnails:** A 200x200px preview image for each block type helps authors choose the right block visually instead of reading descriptions.

## Related Skills

- [Scaffold Umbraco Document Type](/technologies/umbraco/v13-plus/scaffold-umbraco-document-type/) — Document types that contain Block List properties
- [Configure Umbraco Content Delivery API](/technologies/umbraco/v13-plus/configure-umbraco-content-delivery-api/) — API serialization of Block List content for headless delivery
- [Generate Content Author Guide](/roles/design/ux-design/generate-content-author-guide/) — Author documentation for the Block List editing experience
