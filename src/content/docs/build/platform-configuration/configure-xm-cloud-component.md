---
title: Configure XM Cloud Component
description: Generate the configuration and code for a Sitecore XM Cloud component including rendering, datasource, and headless setup
---

## Context & Goal

Sitecore XM Cloud is a SaaS headless CMS that uses a component-based architecture. Every new component requires a coordinated set of artifacts: a rendering item, a datasource template with fields and standard values, optional rendering parameters, placeholder settings, a Next.js front-end implementation with GraphQL data fetching, and serialization YAML for CI/CD. Missing any piece means the component won't work end-to-end. This skill generates all the configuration and code needed to add a new component to an XM Cloud project in one pass.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Sitecore developer specializing in XM Cloud, Next.js rendering hosts, and headless Sitecore architecture. You are an expert in Sitecore's Component Builder, rendering parameters, datasource configuration, and the XM Cloud serialization pipeline. You've built dozens of XM Cloud projects with complex component libraries.

Generate the complete configuration and code for a new XM Cloud component:

**Component Name:** {{COMPONENT_NAME}}
**Component Purpose:** {{COMPONENT_PURPOSE}}
**Fields:**
{{FIELDS}}
**Rendering Parameters:** {{RENDERING_PARAMETERS}}
**Placeholder Settings:** {{PLACEHOLDER_SETTINGS}}

Produce all of the following artifacts:

### 1. Component Definition (Rendering Item Configuration)
- Rendering item name and path under /sitecore/layout/Renderings/Project/
- Datasource Location setting
- Datasource Template reference
- Rendering Parameters Template reference (if parameters are specified)
- Compatible placeholder(s)
- Component icon suggestion

### 2. Datasource Template
- Template name and path under /sitecore/templates/Project/
- Sections with logically grouped fields
- For each field: field name, field type (Single-Line Text, Rich Text, Image, General Link, Droptree, Multilist, etc.), source (if applicable)
- Standard Values with sensible defaults
- Insert options configuration

### 3. Rendering Parameters Template (if applicable)
- Template inheriting from Standard Rendering Parameters
- Parameter fields with types and sources
- Default values for each parameter

### 4. Placeholder Settings (if applicable)
- Placeholder key name
- Allowed renderings list
- Display name and description

### 5. Next.js Component (TypeScript)
- Functional React component with proper TypeScript types
- Import from @sitecore-jss/sitecore-jss-nextjs (Text, RichText, Image, Link, etc.)
- ComponentProps interface with fields matching the datasource template
- Rendering parameters interface (if applicable)
- Responsive, accessible markup with semantic HTML
- CSS module or Tailwind classes (note which approach matches your project)
- Handle empty/editing states for Experience Editor compatibility

### 6. GraphQL Query
- Integrated GraphQL query for fetching component data
- All datasource fields mapped to proper GraphQL field types
- Fragment structure for reusability
- Variables for datasource item ID

### 7. Sitecore Serialization (YAML)
- SCS/Sitecore CLI serialization YAML for all items:
  - Rendering item
  - Datasource template and fields
  - Rendering parameters template (if applicable)
  - Placeholder settings (if applicable)
- Module configuration for the serialization module
- Correct item paths and field IDs

### 8. Component Registration
- Registration in the rendering host's component factory
- Dynamic import configuration for code splitting
- Any required module augmentation for TypeScript

Format each artifact with its full file path as a header. Include comments explaining key configuration decisions. Follow XM Cloud best practices for the current SDK version.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/configure-xm-cloud-component/SKILL.md`:

```markdown
---
name: configure-xm-cloud-component
description: Generates all configuration and code for a Sitecore XM Cloud component — rendering item, datasource template, rendering parameters, placeholder settings, Next.js component, GraphQL query, serialization YAML, and component registration. Use when adding new components to an XM Cloud project.
argument-hint: "[component name and purpose]"
allowed-tools: Read, Glob, Grep, Write
---

# Configure XM Cloud Component

You are a senior Sitecore developer specializing in XM Cloud, Next.js rendering hosts, and headless Sitecore architecture.

## Your Task

Generate a complete XM Cloud component: **$ARGUMENTS**

## Process

### Step 1: Discover Project Conventions
- Read existing components in src/components/ to match naming, file structure, and import patterns
- Check the serialization folder structure to match the module and path conventions
- Identify the Sitecore JSS SDK version and Next.js version from package.json
- Find the component factory or dynamic import configuration
- Check for shared types, utility hooks, or base component patterns

### Step 2: Generate Configuration
1. Rendering item configuration (datasource location, compatible placeholders)
2. Datasource template with sections, fields, and standard values
3. Rendering parameters template (if parameters are needed)
4. Placeholder settings (if the component defines placeholders)

### Step 3: Generate Code
1. Next.js TypeScript component with proper JSS field types
2. GraphQL query for data fetching
3. Component registration in the rendering host

### Step 4: Generate Serialization
1. SCS YAML for all Sitecore items
2. Module configuration updates

### Quality Check
- All field types in the datasource template match the corresponding JSS field components in the Next.js code
- GraphQL query fields match the datasource template exactly
- Serialization YAML item paths are consistent with the rendering item configuration
- Component handles empty and editing states for Experience Editor
- TypeScript types are complete and exported for reuse
```

### Usage

```
/configure-xm-cloud-component HeroBanner — full-width hero with heading, rich text body, background image, and CTA link
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | PascalCase component name | `HeroBanner` or `ProductFeatureGrid` |
| `{{COMPONENT_PURPOSE}}` | What the component does and where it appears | `Full-width hero section for landing pages with background image, overlay text, and call-to-action button` |
| `{{FIELDS}}` | Datasource template fields with types | `Heading (Single-Line Text), Body (Rich Text), BackgroundImage (Image), CTALink (General Link), CTAText (Single-Line Text)` |
| `{{RENDERING_PARAMETERS}}` | Optional rendering parameters for visual variants | `Theme (Droptree — Light/Dark), FullWidth (Checkbox)` or `None` |
| `{{PLACEHOLDER_SETTINGS}}` | Placeholder configuration if the component contains placeholders | `jss-hero-content — allows RichTextBlock, CTAButton` or `None — this is a leaf component` |

## Best Practices

- **Model choice:** Sonnet 4 handles standard component generation effectively — most XM Cloud components follow predictable patterns. Use Opus 4 when the component has complex placeholder nesting, conditional rendering logic, or needs to handle personalization variants.
- **Match existing conventions:** If using Claude Code, it reads your project first. For the prompt version, specify your project's naming conventions, CSS approach (Tailwind vs CSS Modules), and serialization tooling (SCS vs custom) in the purpose or fields.
- **Verify field types:** After generation, review the datasource template field types carefully. The AI may default to Single-Line Text where you need a Droptree, or Rich Text where Multiline Text would suffice.
- **Test in Experience Editor:** XM Cloud components must work in both delivery mode and Experience Editor. Verify that the generated code handles the editing chrome correctly.
- **Serialize and deploy:** After creating the items manually or via serialization, run a full serialization pull to ensure the YAML matches the actual items before committing.

## Related Skills

- [Scaffold Sitecore JSS Component](/build/component-development/scaffold-sitecore-jss-component/) — For JSS components on Sitecore XP, or when you need tests and Storybook stories alongside the component
- [Scaffold React Component](/build/component-development/scaffold-react-component/) — For pure React components without Sitecore datasource dependencies
