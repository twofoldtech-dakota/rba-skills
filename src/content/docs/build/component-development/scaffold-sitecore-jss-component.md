---
title: Scaffold Sitecore JSS Component
description: Generate a complete Sitecore JSS component with TypeScript, tests, stories, and Sitecore template definition
---

## Context & Goal

Sitecore JSS components follow a predictable structure — a React/Next.js component, TypeScript types for the data source, unit tests, Storybook stories, and a Sitecore template definition. Scaffolding this by hand is tedious and error-prone. This skill generates the full scaffold from a component name and data source description, matching the patterns used in RBA's Sitecore implementations.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Sitecore developer with deep expertise in JSS (JavaScript Services), Next.js rendering hosts, and headless Sitecore architecture. You've built hundreds of JSS components for enterprise Sitecore implementations.

Generate a complete Sitecore JSS component scaffold:

**Component Name:** {{COMPONENT_NAME}}
**Rendering Type:** {{RENDERING_TYPE}}
**Data Source Template Fields:**
{{DATA_SOURCE_FIELDS}}

**Additional Context:** {{CONTEXT}}

Generate the following files:

### 1. Component (TSX)
- TypeScript React component using Sitecore JSS field types
- Import and use appropriate JSS field components (Text, RichText, Image, Link, etc.)
- Include `ComponentProps` type with `ComponentRendering` and `ComponentFields`
- Add `withDatasourceCheck` HOC wrapper
- Support both connected and disconnected modes
- Include JSDoc comment with component purpose

### 2. Type Definitions
- Interface for the component's fields extending `ComponentFields`
- Interface for the component's props extending `ComponentRendering`
- Export all types for reuse

### 3. Unit Tests
- Jest + React Testing Library tests
- Test: renders without crashing
- Test: displays field values correctly
- Test: handles empty/missing fields gracefully
- Mock Sitecore context and field data

### 4. Storybook Story
- Default story with realistic sample data
- Story variant: empty/minimal fields
- Story variant: long content (stress test)
- Use CSF 3.0 format

### 5. Sitecore Template Definition
- Template name and path under /sitecore/templates/Project/
- Section with all fields
- Field types matching JSS field components
- Standard Values suggestions

### 6. Component Registration
- Show the manifest entry for `sitecore-definitions/components/`
- Include display name and fields mapping

Format each file with its full path as a header. Use TypeScript throughout. Follow Sitecore JSS best practices for the current SDK version.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-sitecore-jss-component/SKILL.md`:

```markdown
---
name: scaffold-sitecore-jss-component
description: Generates a complete Sitecore JSS component scaffold including TSX component, types, tests, Storybook stories, and Sitecore template definition. Use when creating new components in a Sitecore JSS/Next.js project.
argument-hint: "[component name]"
allowed-tools: Read, Glob, Grep, Write
---

# Scaffold Sitecore JSS Component

You are a senior Sitecore developer with deep expertise in JSS, Next.js rendering hosts, and headless Sitecore architecture.

## Your Task

Scaffold a Sitecore JSS component: **$ARGUMENTS**

## Process

### Step 1: Discover Project Conventions
- Read existing components to match naming patterns, file structure, and import conventions
- Check for a shared types file or component base class
- Identify the Sitecore JSS SDK version from package.json
- Find the test configuration (Jest/Vitest) and Storybook setup

### Step 2: Scaffold Files
Generate these files following discovered conventions:
1. `src/components/[ComponentName].tsx` — Component with withDatasourceCheck
2. `src/components/[ComponentName].types.ts` — TypeScript interfaces
3. `src/components/[ComponentName].test.tsx` — Unit tests
4. `src/components/[ComponentName].stories.tsx` — Storybook stories (CSF 3.0)
5. Template definition documentation (as markdown or YAML)
6. Manifest entry for component registration

### Step 3: Quality Check
- Component compiles without TypeScript errors
- Tests cover rendering, field display, and empty states
- Stories include default, empty, and stress variants
- Template fields match the TypeScript types exactly
```

### Usage

```
/scaffold-sitecore-jss-component HeroBanner with heading, subheading, background image, and CTA link
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | PascalCase component name | `HeroBanner` |
| `{{RENDERING_TYPE}}` | Sitecore rendering variant | `Component` (standard) or `Container` (with placeholders) |
| `{{DATA_SOURCE_FIELDS}}` | Fields the component needs from its data source | `Heading (Single-Line Text), Body (Rich Text), BackgroundImage (Image), CTALink (General Link), CTAText (Single-Line Text)` |
| `{{CONTEXT}}` | Additional project context | `Next.js 14 rendering host, JSS SDK 22, uses Tailwind CSS for styling` |

## Best Practices

- **Model choice:** Sonnet 4 handles standard component scaffolds well. Use Opus 4 when the component has complex rendering logic (conditional fields, nested placeholders, personalization variants).
- **Check conventions first:** If using Claude Code, it reads your existing components first. For the prompt version, describe your project's naming conventions in `{{CONTEXT}}`.
- **Customize the template:** After generation, always review the Sitecore template definition — field types need to match your content architecture.
- **Run tests:** Generate the scaffold, then immediately run the tests to verify the component renders.

## Related Skills

- [Audit Content Model](/build/content-modeling/audit-content-model/) — Audit the content model before scaffolding components that consume it
- [Audit WCAG Compliance](/test-and-review/auditing/audit-wcag-compliance/) — Review the generated component for accessibility
