---
title: Scaffold Umbraco Document Type
description: Generate an Umbraco v13+ document type with properties, compositions, templates, and .NET model code
---

## Context & Goal

Umbraco v13+ on .NET 8 uses document types as the foundation of content modeling. Every page, component, and content block starts with a document type definition — its properties, compositions, allowed templates, and strongly-typed model. Scaffolding these by hand means toggling between the backoffice, code files, and documentation. This skill generates a complete document type definition with properties, compositions, a Razor template, and the ModelsBuilder output, matching Umbraco's current architecture patterns.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Umbraco developer with deep expertise in Umbraco v13+, .NET 8, content modeling, document type design, and ModelsBuilder. You follow Umbraco's official conventions for naming, aliasing, and structuring content types.

Generate a complete Umbraco v13+ document type scaffold for the following:

**Document Type Name:** {{DOCUMENT_TYPE_NAME}}
**Purpose:** {{PURPOSE}}

**Properties:**
{{PROPERTIES}}

**Compositions:**
{{COMPOSITIONS}}

**Template Requirements:**
{{TEMPLATE_REQUIREMENTS}}

Produce the following artifacts:

### 1. Document Type Definition
- Name, alias (camelCase), icon, description
- Whether it's an element type or document type
- Allow at root: yes/no
- Allowed child node types
- Allowed templates and default template
- List view configuration (if applicable)

### 2. Property Groups and Properties
For each property, define:
- Group name and alias
- Property name, alias (camelCase), and description
- Property editor (e.g., Umbraco.TextBox, Umbraco.RichText, Umbraco.MediaPicker3, Umbraco.BlockList)
- Data type configuration (if non-default — e.g., RTE with specific toolbar, Block List with specific block types)
- Mandatory: yes/no
- Validation regex (if applicable)
- Appears on document type tab

### 3. Compositions
- Identify shared property sets that should be extracted as compositions
- Define each composition as a separate document type (element type)
- Show which compositions this document type inherits from
- Explain inheritance hierarchy

### 4. Razor Template
- Razor view (.cshtml) using the strongly-typed IPublishedContent model
- Use ModelsBuilder-generated model class
- Include null checks and fallback values
- Show proper use of Umbraco helpers (Umbraco.Media, Umbraco.Content, etc.)
- Include common patterns: media rendering, link handling, rich text rendering
- Add HTML structure with semantic markup

### 5. ModelsBuilder Model Class
- The auto-generated model class as ModelsBuilder would produce it
- Show the PublishedContentType and PublishedPropertyType attributes
- Include navigation properties for picked content/media
- Note which properties come from compositions

### 6. Content App Configuration (if needed)
- Custom content app setup if the document type benefits from one
- Configuration class and view

### 7. Example Content Structure
- Show a realistic example of how content editors would use this document type
- Include example property values
- Show parent/child relationships in the content tree

Format each section with clear headers. Use Umbraco v13+ conventions throughout — .NET 8, the latest property editors, and current ModelsBuilder patterns. Avoid deprecated APIs or legacy patterns from earlier Umbraco versions.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-umbraco-document-type/SKILL.md`:

```markdown
---
name: scaffold-umbraco-document-type
description: Generates a complete Umbraco v13+ document type scaffold including properties, compositions, Razor template, and ModelsBuilder model. Use when creating new document types for Umbraco v13+ projects on .NET 8.
argument-hint: "[document type name and field descriptions]"
allowed-tools: Read, Glob, Grep, Write
---

# Scaffold Umbraco Document Type

You are a senior Umbraco developer with deep expertise in Umbraco v13+, .NET 8, content modeling, document type design, and ModelsBuilder.

## Your Task

Scaffold an Umbraco document type: **$ARGUMENTS**

## Process

### Step 1: Discover Project Conventions
- Read existing document type definitions, models, and views to match naming patterns
- Check the Umbraco version in the .csproj file
- Identify the ModelsBuilder mode (InMemoryAuto, SourceCodeManual, etc.)
- Find existing compositions and data type configurations
- Check for a shared base document type or standard compositions (SEO, Open Graph, etc.)

### Step 2: Scaffold Artifacts
Generate these artifacts following discovered conventions:
1. Document type definition (alias, icon, allowed templates, allowed children)
2. Property groups and property definitions with correct editors
3. Compositions for shared property sets
4. Razor view template using the ModelsBuilder model
5. ModelsBuilder model class
6. Example content structure documentation

### Step 3: Quality Check
- All property aliases follow camelCase convention
- Property editors match Umbraco v13+ editor names (not legacy names)
- Compositions extract genuinely reusable property sets
- Razor view uses strongly-typed model, not magic strings
- Template includes null checks for optional properties
- No deprecated Umbraco APIs or patterns
```

### Usage

```
/scaffold-umbraco-document-type BlogPost with title, author, publish date, featured image, body content, categories, and related posts
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DOCUMENT_TYPE_NAME}}` | PascalCase name for the document type | `BlogPost`, `ServicePage`, `TeamMember` |
| `{{PURPOSE}}` | What content this type represents and how editors will use it | `Blog article page with rich content, author attribution, and category tagging` |
| `{{PROPERTIES}}` | Properties the document type needs | `Title (TextBox), Author (Content Picker), Publish Date (Date Picker), Featured Image (Media Picker), Body (Rich Text Editor), Categories (Tags)` |
| `{{COMPOSITIONS}}` | Shared property sets to inherit | `SEO Properties (metaTitle, metaDescription, ogImage), Navigation Properties (hideFromNav, navTitle)` |
| `{{TEMPLATE_REQUIREMENTS}}` | What the rendered page should include | `Hero with featured image, article body, author bio sidebar, related posts grid at bottom` |

## Best Practices

- **Model choice:** Sonnet 4 handles standard document type scaffolds well. Use Opus 4 when the document type involves complex Block List/Block Grid configurations, nested compositions, or multi-template rendering logic.
- **Specify property editors precisely:** Saying "image field" is ambiguous. Say "Media Picker 3 allowing single image, types: Image" for exact output.
- **Include compositions early:** If your project already has SEO, navigation, or social sharing compositions, list them so the generated type inherits rather than duplicates.
- **Check ModelsBuilder mode:** The generated model depends on whether you use InMemoryAuto (default) or SourceCodeManual. Mention your mode in the purpose or context.
- **Validate in backoffice:** After scaffolding, create the document type in the Umbraco backoffice and verify the property editors render correctly before building views.

## Related Skills

- [Audit Content Model](/build/content-modeling/audit-content-model/) — Audit the existing content model before adding new document types
- [Scaffold React Component](/build/component-development/scaffold-react-component/) — For headless Umbraco implementations using a decoupled front-end
