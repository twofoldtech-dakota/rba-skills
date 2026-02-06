---
title: Scaffold Optimizely Page Type
description: Generate an Optimizely CMS page type with content properties, rendering, and validation using the current SDK patterns
---

## Context & Goal

Optimizely CMS uses .NET-based page types as the content modeling primitive. Every page an editor creates — landing pages, article pages, product pages — is backed by a C# class decorated with Optimizely attributes. This skill scaffolds a complete page type: the C# class with content properties and validation, the rendering controller, the Razor view, and supporting block types. It follows the current Optimizely SDK patterns so the output is ready to drop into a project.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Optimizely developer with deep expertise in Optimizely CMS (current version), .NET 8, content modeling, page types, block types, and the Optimizely SDK. You follow Optimizely's official conventions for content type attributes, property definitions, and rendering patterns.

Generate a complete Optimizely CMS page type scaffold:

**Page Type Name:** {{PAGE_TYPE_NAME}}
**Purpose:** {{PURPOSE}}

**Content Properties:**
{{CONTENT_PROPERTIES}}

**Block References:**
{{BLOCK_REFERENCES}}

**Rendering Requirements:**
{{RENDERING_REQUIREMENTS}}

Produce the following artifacts:

### 1. Page Type Class (C#)
- Class inheriting from PageData (or SitePageData if using a base class)
- [ContentType] attribute with DisplayName, GUID, Description, GroupName
- [Display] attributes for property ordering and grouping
- Properties using Optimizely editor types:
  - XhtmlString for rich text
  - ContentReference for content/media picking
  - ContentArea for flexible content zones
  - LinkItemCollection for link lists
  - Url for single links
  - IList<ContentReference> for multi-select
  - SelectOne/SelectMany for dropdowns
- [Required], [Range], [RegularExpression] validation attributes
- [CultureSpecific] for localizable properties
- Property grouping using SystemTabNames and custom tab names
- Access rights defaults via [DefaultAccessRights] if applicable

### 2. Block Type Definitions
For any block types referenced by this page type:
- Block class inheriting from BlockData
- [ContentType] attribute with proper configuration
- Properties with appropriate editors
- Display template registration

### 3. Page Controller
- Controller inheriting from PageController<T> or PageControllerBase<T>
- Index action returning the page view model
- View model mapping (if using view models vs. direct page model)
- Any required service injection

### 4. Razor View
- Strongly-typed view using @model
- Proper use of @Html.PropertyFor() for on-page editing support
- ContentArea rendering with display options
- Null-safe property access patterns
- Semantic HTML structure
- On-page edit mode considerations (episerver:property tags if applicable)

### 5. Display Templates and Display Options
- Display templates for blocks rendered within content areas
- Display option configuration (full-width, half-width, one-third, etc.)
- Registration in initialization module

### 6. Content Type Initialization Module
- IInitializableModule implementation if custom initialization is needed
- Content type group registration
- Selection factory classes for dropdowns
- Display option registration

### 7. Example Content Structure
- Realistic example of how editors will use this page type
- Example property values
- Content tree placement
- Content area block arrangement

Format each file with its full namespace and path. Use the current Optimizely SDK patterns — not legacy Episerver namespaces. Include XML documentation comments on the page type class and its properties.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-optimizely-page-type/SKILL.md`:

```markdown
---
name: scaffold-optimizely-page-type
description: Generates a complete Optimizely CMS page type scaffold including C# class, controller, Razor view, block types, and display options. Use when creating new page types for Optimizely CMS projects.
argument-hint: "[page type name and property descriptions]"
allowed-tools: Read, Glob, Grep, Write
---

# Scaffold Optimizely Page Type

You are a senior Optimizely developer with deep expertise in Optimizely CMS, .NET 8, content modeling, page types, and the Optimizely SDK.

## Your Task

Scaffold an Optimizely page type: **$ARGUMENTS**

## Process

### Step 1: Discover Project Conventions
- Read existing page type classes to match naming patterns and base classes
- Check the Optimizely CMS version from NuGet packages in .csproj
- Identify the base page class (SitePageData or custom base)
- Find existing block types, selection factories, and display options
- Check whether the project uses view models or direct page models

### Step 2: Scaffold Files
Generate these files following discovered conventions:
1. Page type class with ContentType attribute and properties
2. Block type classes for any referenced blocks
3. Page controller with view model mapping
4. Razor view with PropertyFor helpers and on-page editing support
5. Display templates and display option configuration
6. Initialization module for registrations
7. Example content structure documentation

### Step 3: Quality Check
- ContentType GUID is unique (generate a new one)
- All properties use current Optimizely SDK types, not EPiServer legacy types
- Controller follows the project's existing controller pattern
- View uses @Html.PropertyFor() for editable properties
- Block types have display templates registered
- No EPiServer.* namespaces — use Optimizely.* equivalents
```

### Usage

```
/scaffold-optimizely-page-type ArticlePage with title, hero image, author, publish date, body content area, sidebar content area, and related articles
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PAGE_TYPE_NAME}}` | PascalCase name for the page type | `ArticlePage`, `LandingPage`, `ProductDetailPage` |
| `{{PURPOSE}}` | What this page type represents for editors | `Long-form article page with rich content, author attribution, and a flexible sidebar` |
| `{{CONTENT_PROPERTIES}}` | Properties the page type needs | `Title (string), Hero Image (ContentReference to ImageData), Body (ContentArea), Author Name (string), Publish Date (DateTime), Tags (IList<string>)` |
| `{{BLOCK_REFERENCES}}` | Block types used in content areas | `HeroBlock (heading, image, CTA), TextBlock (rich text), ImageGalleryBlock (images collection, layout), CTABlock (heading, link, style)` |
| `{{RENDERING_REQUIREMENTS}}` | What the rendered page should look like | `Full-width hero at top, two-column layout with body in main column and sidebar on right, related articles grid below` |

## Best Practices

- **Model choice:** Sonnet 4 handles standard page type scaffolds efficiently. Use Opus 4 when the page type has complex content area configurations, multiple block types with display options, or personalization/experimentation integration.
- **Always generate GUIDs:** Every ContentType attribute needs a unique GUID. If using the prompt, generate fresh GUIDs rather than copying from examples.
- **Use PropertyFor for editing:** Forgetting `@Html.PropertyFor()` in views breaks on-page editing. The skill includes this by default, but verify in your output.
- **Check namespace migration:** If your project was migrated from Episerver, some files may still use `EPiServer.*` namespaces. This skill uses current `Optimizely.*` namespaces only.
- **Define display options:** Content areas without display options give editors no layout control. Always scaffold at least full-width, half-width, and one-third options.

## Related Skills

- [Audit Content Model](/build/content-modeling/audit-content-model/) — Audit existing content types before adding new page types
- [Generate Design System Documentation](/build/design-systems/generate-design-system-docs/) — Align page type rendering with the project's design system
