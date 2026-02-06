---
title: Generate Design System Documentation
description: Create structured documentation for a design system including component inventory, token definitions, and usage guidelines
---

## Context & Goal

Design systems bring consistency to multi-team, multi-project environments — but only if they are well-documented. A component library without documentation is just a folder of code. This skill generates comprehensive design system documentation from existing artifacts — Figma files, component libraries, style guides, or token exports — producing specs that developers can implement from directly and designers can reference for consistency.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior UI designer and design systems lead with expertise in design token architecture, component API design, cross-platform governance, and documentation. You have built and maintained design systems serving 50+ developers across multiple product teams.

Create structured design system documentation based on the following:

**Design System Name:** {{DESIGN_SYSTEM_NAME}}
**Platform Context:** {{PLATFORM_CONTEXT}}
**Brand Guidelines:** {{BRAND_GUIDELINES}}

**Components:**
{{COMPONENT_LIST}}

**Design Tokens:**
{{DESIGN_TOKENS}}

Generate comprehensive design system documentation with these sections:

1. **Design System Overview** — Purpose, audience, guiding philosophy, and how to get started using the system
2. **Design Principles** — 4-6 core principles that guide design decisions (e.g., "Clarity over decoration," "Accessible by default"). Each with a short description and a concrete example
3. **Token Documentation**
   - **Color** — Semantic color tokens (primary, secondary, surface, text, status), raw palette, dark mode mappings
   - **Typography** — Font families, scale (size/weight/line-height per level), responsive behavior
   - **Spacing** — Spacing scale with named tokens and pixel values
   - **Elevation** — Shadow tokens with use cases (card, modal, dropdown)
   - **Breakpoints** — Named breakpoints with pixel values and usage guidance
4. **Component Inventory** — Table with columns: Component Name, Status (Stable / Beta / Deprecated), Variants, Primary Use Case, Accessibility Notes
5. **Per-Component Specification** — For each component:
   - Description and when to use it
   - Anatomy diagram description (labeled parts)
   - Props / Variants (table: prop name, type, default, description)
   - Do / Don't examples (at least 2 each)
   - Accessibility notes (keyboard interaction, ARIA attributes, focus management)
   - Code usage example
6. **Layout Patterns** — Common page layouts, grid system, container behavior, responsive strategies
7. **Contribution Guidelines** — How to propose new components, the review process, versioning approach, and deprecation policy

Use clear, scannable formatting. Every section should be useful to both designers and developers. Include specific token values, prop types, and accessibility requirements — not vague descriptions.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-design-system-docs/SKILL.md`:

```markdown
---
name: generate-design-system-docs
description: Generates structured design system documentation including component inventory, token definitions, and usage guidelines. Use when documenting a new design system, updating existing docs after a design refresh, or creating developer handoff specs.
argument-hint: "[design system name or component to document]"
allowed-tools: Read, Glob, Grep
---

# Generate Design System Documentation

You are a senior UI designer and design systems lead with expertise in design token architecture, component API design, cross-platform governance, and documentation.

## Your Task

Generate design system documentation for: **$ARGUMENTS**

## Process

### Step 1: Gather Source Material
- Read any files the user references (token JSON files, component source code, style guides, Figma export notes)
- Search the codebase for design token definitions (CSS custom properties, SCSS variables, JSON token files)
- Look for component files, story files (Storybook), and existing documentation
- Identify the technology stack (React, Vue, Web Components, etc.) to tailor code examples

### Step 2: Document the System

Generate these sections:

1. **Design System Overview** — Purpose, audience, getting started
2. **Design Principles** — 4-6 principles with examples
3. **Token Documentation** — Color, typography, spacing, elevation, breakpoints with actual values
4. **Component Inventory** — Table with status, variants, and accessibility notes
5. **Per-Component Specification** — Description, anatomy, props, do/don't, accessibility, code example
6. **Layout Patterns** — Grid, containers, responsive strategies
7. **Contribution Guidelines** — Proposal process, review, versioning

### Step 3: Quality Check
- Every token references its actual value (hex codes, pixel values, font stacks)
- Component props include types and defaults, not just names
- Accessibility notes are specific (ARIA roles, keyboard interactions), not generic ("make it accessible")
- Do/Don't examples are concrete and illustrate common mistakes
- Code examples match the project's actual technology stack
```

### Usage

```
/generate-design-system-docs RBA Design System — document the token layer and core component library
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DESIGN_SYSTEM_NAME}}` | Name of the design system | `RBA Design System v2` or `Contoso Brand System` |
| `{{COMPONENT_LIST}}` | Components to document with current status | `Button (Stable), Card (Stable), Modal (Beta), DataTable (Beta), Navigation (Stable), Hero (Stable), Form Inputs (Stable), Tabs (Deprecated — use SegmentedControl)` |
| `{{DESIGN_TOKENS}}` | Token definitions — paste JSON, CSS variables, or describe the token structure | `Primary: #0066CC, Secondary: #00B8D9, Error: #DC2626, Surface: #FFFFFF / Dark: #1A1A2E. Type scale: 14/16/18/20/24/32/40px. Spacing: 4px base unit (4/8/12/16/24/32/48/64)` |
| `{{PLATFORM_CONTEXT}}` | Technology stack and target platforms | `React 18 + TypeScript, Storybook 8, consumed by 3 product teams building on Next.js` |
| `{{BRAND_GUIDELINES}}` | Brand rules that constrain design decisions | `Contoso brand: Inter for headings, System UI for body. Primary blue #0066CC must meet AAA contrast on white. No rounded corners above 8px.` |

## Best Practices

- **Model choice:** Use Opus 4 for full design system documentation — it handles the breadth of tokens, components, and accessibility requirements with greater consistency across sections. Sonnet 4 works well for documenting individual components or updating a single section.
- **Start with tokens, then components:** If documenting a system from scratch, generate the token documentation first, then reference those tokens in component specs. This ensures consistency and catches token gaps early.
- **Include real values:** Paste actual token JSON, CSS custom properties, or Figma export data. The documentation is only useful if it contains real hex codes, pixel values, and font stacks — not placeholder text.
- **Pair with accessibility audit:** Run the WCAG compliance audit on key components alongside this documentation. Design system docs that include tested accessibility specs are far more valuable than those with generic "should be accessible" notes.
- **Keep it maintainable:** Design system docs go stale fast. Generate them from source (token files, component code) whenever possible so they can be regenerated as the system evolves.

## Related Skills

- [Audit WCAG Compliance](/roles/design/accessibility/audit-wcag-compliance/) — Audit components for accessibility before documenting them
- [Generate User Flow Documentation](/roles/design/ux-design/generate-user-flow/) — Document user flows that reference design system components
