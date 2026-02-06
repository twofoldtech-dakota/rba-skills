---
title: Scaffold React Component
description: Generate a production-ready React component with TypeScript, tests, stories, and CSS modules following project conventions
---

## Context & Goal

Front-end engineers at RBA build components across Next.js, React, and headless CMS rendering hosts. Every new component needs the same set of files — a TypeScript component, a props interface, unit tests, Storybook stories, and styles — and each must match the project's existing conventions. This skill scaffolds the complete component from a name and description, so new components are consistent from the start and ready for code review without manual boilerplate.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior front-end engineer with expertise in React, TypeScript, Next.js, and component-driven development. You have deep experience with design systems, testing patterns (Jest + React Testing Library), and Storybook. You build production components that are accessible, performant, and maintainable.

Generate a complete, production-ready React component scaffold:

**Component Name:** {{COMPONENT_NAME}}
**Component Description:** {{COMPONENT_DESCRIPTION}}
**Props:** {{PROPS}}
**Styling Approach:** {{STYLING_APPROACH}}
**Framework Context:** {{FRAMEWORK_CONTEXT}}

Generate each of the following files with its full relative path as a header:

### 1. Component TSX File
- Functional component with TypeScript
- Import the props interface from a separate types file
- Destructure props with sensible defaults where appropriate
- Include JSDoc comment describing the component's purpose and usage
- Apply the specified styling approach (CSS modules, Tailwind, styled-components)
- Use semantic HTML elements (section, article, nav, etc. — not div soup)
- Add appropriate ARIA attributes for accessibility
- Handle edge cases: empty/null props, missing optional fields, loading states
- Export as both named and default export

### 2. TypeScript Props Interface
- Separate `.types.ts` file for the props interface
- Use descriptive JSDoc comments on each prop
- Mark optional props explicitly with `?`
- Use union types for constrained values (e.g., variant: 'primary' | 'secondary')
- Export the interface for external consumption
- Include a `className` prop for style overrides
- Include `children` if the component accepts child content
- Add `data-testid` prop for testing hooks

### 3. Unit Tests (Jest + React Testing Library)
- Test: renders without crashing with minimal required props
- Test: renders all provided content correctly (text, images, links)
- Test: applies the correct CSS class/variant based on props
- Test: handles optional props being undefined/null
- Test: user interactions work (click handlers, toggles, form inputs)
- Test: accessibility — no violations with jest-axe if applicable
- Test: edge cases — empty strings, very long content, special characters
- Use `screen.getByRole` and `screen.getByText` over `getByTestId` where possible
- Include descriptive test names that explain the expected behavior

### 4. Storybook Story (CSF 3.0 Format)
- Meta configuration with title, component, argTypes, and decorators
- **Default** story with realistic, representative content
- **WithAllProps** story demonstrating every prop populated
- **MinimalProps** story with only required props
- **LongContent** story stress-testing with verbose/overflow content
- **Interactive** story demonstrating click/hover/state behavior if applicable
- Include autodocs tag for automatic documentation generation
- Use `args` pattern for all stories to enable Controls panel editing

### 5. Styles File
- If CSS Modules: `.module.css` or `.module.scss` with BEM-inspired class names
- If Tailwind: document utility classes inline in the component
- If styled-components: separate `.styles.ts` file with typed theme access
- Include responsive breakpoints (mobile-first)
- Include focus/hover/active states for interactive elements
- Use CSS custom properties or design tokens where possible

### 6. Barrel Export (index.ts)
- Re-export the component as default and named export
- Re-export the props type for consumers
- This file is the public API of the component folder

Format each file with a clear header showing the file path. Use TypeScript throughout. Follow React best practices, and ensure the component would pass a code review on its first submission.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-react-component/SKILL.md`:

```markdown
---
name: scaffold-react-component
description: Generates a production-ready React component scaffold including TSX component, TypeScript props, unit tests, Storybook stories, styles, and barrel export. Use when creating new components in a React or Next.js project.
argument-hint: "[component name and description]"
allowed-tools: Read, Glob, Grep, Write
---

# Scaffold React Component

You are a senior front-end engineer with expertise in React, TypeScript, Next.js, component-driven development, and design systems.

## Your Task

Scaffold a production-ready React component: **$ARGUMENTS**

## Process

### Step 1: Discover Project Conventions
- Read existing components to identify naming patterns, folder structure, and import conventions
- Check package.json for the styling library (CSS modules, Tailwind, styled-components)
- Identify the test framework (Jest, Vitest) and Storybook version
- Look for a shared types file, theme configuration, or design tokens
- Check for an existing barrel export pattern (index.ts re-exports)

### Step 2: Scaffold Files
Generate these files following discovered conventions:
1. `[ComponentName].tsx` — Functional component with TypeScript and accessibility
2. `[ComponentName].types.ts` — Props interface with JSDoc comments
3. `[ComponentName].test.tsx` — Unit tests covering rendering, props, interactions, edge cases
4. `[ComponentName].stories.tsx` — Storybook stories in CSF 3.0 (default, minimal, stress, interactive)
5. `[ComponentName].module.css` (or equivalent) — Styles with responsive breakpoints
6. `index.ts` — Barrel export for clean imports

### Step 3: Quality Check
- Component uses semantic HTML and appropriate ARIA attributes
- Tests cover rendering, prop variants, interactions, and edge cases
- Stories include default, minimal, long-content, and interactive variants
- Props interface has JSDoc comments and correct optionality
- Styles are responsive and include interactive states
```

### Usage

```
/scaffold-react-component Card component with image, title, description, tags, and CTA button for a Next.js marketing site using CSS modules
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | PascalCase component name | `FeatureCard` |
| `{{COMPONENT_DESCRIPTION}}` | What the component does and where it's used | `A card displaying a feature with icon, title, description, and learn-more link. Used on the homepage features grid.` |
| `{{PROPS}}` | Props the component accepts with types | `title: string, description: string, icon: ReactNode, href: string, variant?: 'default' \| 'highlighted'` |
| `{{STYLING_APPROACH}}` | How styles are applied | `CSS Modules with SCSS` or `Tailwind CSS` or `styled-components with theme` |
| `{{FRAMEWORK_CONTEXT}}` | Project framework and relevant details | `Next.js 14 App Router, React 18, Jest + RTL for tests, Storybook 8, design tokens in CSS custom properties` |

## Best Practices

- **Model choice:** Sonnet 4 handles standard component scaffolds efficiently and produces clean, idiomatic code. Use Opus 4 when the component has complex state management, compound component patterns, or needs to integrate with context providers and custom hooks.
- **Describe your project patterns:** The prompt works best when `{{FRAMEWORK_CONTEXT}}` includes specific details — the CSS methodology, test runner, Storybook version, and any component conventions (e.g., "all components use forwardRef").
- **Review props first:** Before generating, finalize the props interface in `{{PROPS}}`. Changing props after generation means updating every file. Getting props right up front saves rework.
- **Run the tests immediately:** After scaffolding, run the generated tests. They should pass with zero modifications — if they don't, the scaffold missed a convention.
- **Iterate on stories:** The generated Storybook stories are a starting point. Add stories for real-world content your design team provides, not just placeholder text.

## Related Skills

- [Scaffold Sitecore JSS Component](/build/component-development/scaffold-sitecore-jss-component/) — For components that need Sitecore data source integration and JSS field types
- [Generate Design System Documentation](/build/design-systems/generate-design-system-docs/) — Document the generated component as part of a broader design system
