---
title: Generate Component Specification
description: Create a developer-ready component spec from a design with prop definitions, responsive behavior, interaction states, accessibility requirements, and CMS field mappings
---

## Context & Goal

The gap between "here's a Figma file" and "here's a buildable component" is where most design-to-dev handoff friction lives. This skill takes a component design — whether described, referenced from Figma, or shown as a screenshot — and generates a developer-ready specification: prop definitions, responsive breakpoints, interaction states, animation behavior, accessibility requirements, content flexibility ranges (min/max character counts, optional vs required fields), and CMS authoring field mappings.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior UI designer and design technologist at a digital consulting agency. You bridge design and engineering by writing component specifications that leave zero ambiguity. You've shipped component libraries for Sitecore JSS, Next.js, and headless CMS implementations and understand both design intent and developer constraints.

Generate a developer-ready component specification from the following:

**Component Name:** {{COMPONENT_NAME}}
**Design Reference:** {{DESIGN_REFERENCE}}
**CMS Platform:** {{CMS_PLATFORM}}
**Design System:** {{DESIGN_SYSTEM}}
**Component Context:** {{COMPONENT_CONTEXT}}

Produce a complete Component Specification:

### 1. Component Overview
- Component name and atomic design level (atom / molecule / organism / template)
- Purpose and usage context — where this component appears and why
- Component variants (if multiple visual states exist)

### 2. Props / Data Contract
Table of every configurable property:

| Prop | Type | Required | Default | Description | CMS Field |
|------|------|----------|---------|-------------|-----------|

Include:
- Display text fields with character limits (min/max)
- Image fields with aspect ratio and size requirements
- Link fields with target behavior
- Boolean toggles for optional elements
- Enum values for variants
- Array/collection fields with min/max items

### 3. Content Flexibility
For each text field:

| Field | Min Characters | Max Characters | Truncation Behavior | What Happens When Empty |
|-------|---------------|----------------|---------------------|------------------------|

### 4. Responsive Behavior
| Breakpoint | Width | Layout Changes | Hidden Elements | Interaction Changes |
|------------|-------|---------------|-----------------|---------------------|
| Mobile | 320-767px | ... | ... | ... |
| Tablet | 768-1023px | ... | ... | ... |
| Desktop | 1024-1439px | ... | ... | ... |
| Wide | 1440px+ | ... | ... | ... |

### 5. Interaction States
For each interactive element:

| Element | Default | Hover | Focus | Active | Disabled | Loading |
|---------|---------|-------|-------|--------|----------|---------|

Include visual description, cursor behavior, and timing for each state.

### 6. Animation & Transitions
- Entry animations (scroll-triggered, page load)
- State transition timing and easing
- Reduced motion behavior (`prefers-reduced-motion`)
- Loading skeleton appearance

### 7. Accessibility Specification
- **Semantic HTML:** Required elements and ARIA roles
- **Keyboard navigation:** Tab order, keyboard shortcuts, focus trap behavior
- **Screen reader:** Announcement text for dynamic content, aria-live regions
- **Focus management:** Where focus moves on open/close/submit actions
- **Color contrast:** Minimum ratios for text and interactive elements
- **Touch targets:** Minimum tap target size (44x44px)

### 8. CMS Authoring Configuration
- Content type or template this component maps to
- Field names, types, and validation rules for the CMS
- Author help text for each field
- Default values and placeholder content
- Preview behavior in the experience editor / visual builder
- Datasource location and naming convention

### 9. Error & Empty States
| State | Visual Treatment | Message | Behavior |
|-------|-----------------|---------|----------|
| No data | ... | ... | ... |
| Partial data | ... | ... | ... |
| API error | ... | ... | ... |
| Image broken | ... | ... | ... |
| Slow loading | ... | ... | ... |

### 10. Developer Notes
- Performance considerations (lazy loading, image optimization, code splitting)
- SEO implications (heading hierarchy, structured data)
- Testing requirements (visual regression, unit test expectations)
- Known constraints or platform limitations
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-component-specification/SKILL.md`:

```markdown
---
name: generate-component-specification
description: Generates a developer-ready component spec from a design — props, responsive behavior, states, accessibility, CMS field mappings. Use for every component before engineering handoff.
argument-hint: "[component name and context]"
allowed-tools: Read, Glob, Grep
---

# Generate Component Specification

You are a senior UI designer and design technologist who bridges design and engineering with zero-ambiguity component specs.

## Your Task

Generate a component specification for: **$ARGUMENTS**

## Process

### Step 1: Understand the Component
- Read any referenced design files, existing components, or specs
- Search the project for similar components to match patterns
- Identify the design system, CMS platform, and component library conventions
- Check for existing prop patterns, naming conventions, and data contracts

### Step 2: Generate the Specification
Produce a complete spec with:
1. Component overview (atomic level, variants, usage context)
2. Props/data contract table with CMS field mappings
3. Content flexibility ranges (min/max characters, empty state behavior)
4. Responsive behavior by breakpoint
5. Interaction states for every interactive element
6. Animation and transition specs (including reduced motion)
7. Accessibility specification (semantic HTML, keyboard, screen reader, focus)
8. CMS authoring configuration (content types, help text, preview behavior)
9. Error and empty states
10. Developer notes (performance, SEO, testing)

### Quality Check
- Every prop has a type, default value, and CMS field mapping
- Responsive behavior covers mobile through wide desktop
- Accessibility includes keyboard, screen reader, and focus management
- Content flexibility defines min/max characters and empty state behavior
- Error states are specific, not generic
```

### Usage

```
/generate-component-specification Hero banner with video background, CTA overlay, and personalized headline
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | Name of the component | `Hero Banner with Video Background` |
| `{{DESIGN_REFERENCE}}` | Link to Figma, screenshot, or detailed description | `Figma link or describe: Full-width hero with autoplay video, gradient overlay, headline, subhead, and CTA button. Mobile falls back to static image.` |
| `{{CMS_PLATFORM}}` | Target CMS platform | `Sitecore XM Cloud` or `Umbraco 13` or `Optimizely CMS 12` |
| `{{DESIGN_SYSTEM}}` | Design system or component library in use | `Custom design system based on Tailwind CSS` or `Sitecore XM Cloud component library` |
| `{{COMPONENT_CONTEXT}}` | Where and how this component is used | `Homepage hero position, also used on campaign landing pages. Content authors swap video/image and CTA per campaign.` |

## Best Practices

- **Model choice:** Sonnet 4 handles standard component specs well. Use Opus 4 for complex components with many interaction states, conditional rendering logic, or multi-platform CMS considerations.
- **Describe the design in detail:** If you can't share a Figma link, describe every visual element, interaction, and responsive behavior. The spec quality mirrors the description quality.
- **Include content examples:** Provide real headline text, not "Lorem ipsum." The AI uses actual content to set realistic character limits and test content flexibility.
- **Review with engineering first:** Share the spec with the lead developer before finalizing. They'll flag props that don't match the framework or CMS patterns that won't work.

## Related Skills

- [Generate Design System Docs](/build/design-systems/generate-design-system-docs/) — Document the full design system this component belongs to
- [Generate Feature Specification](/plan/discovery-and-requirements/generate-feature-specification/) — The feature spec that defines the business requirements this component fulfills
- [Scaffold React Component](/build/component-development/scaffold-react-component/) — Scaffold the actual component code from this spec
