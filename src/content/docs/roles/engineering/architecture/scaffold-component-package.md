---
title: Scaffold Component Package
description: Generate a reusable component package with TypeScript types, Storybook stories, unit tests, accessibility tests, and CMS integration adapters for cross-project use
---

## Context & Goal

RBA builds the same components across dozens of projects — hero banners, card grids, navigation menus, accordions, form layouts, search results. Each time, engineers start from scratch or copy-paste from the last project, inheriting that project's quirks and bugs. This skill scaffolds reusable component packages that work across CMS platforms: a core component with TypeScript types, Storybook stories, unit tests, accessibility tests, and thin CMS adapters that map Sitecore JSS props, Umbraco Block List data, or Optimizely content types to the component's interface. It produces packages that can be published to a private npm registry and consumed across all RBA projects.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior frontend architect at RBA who builds reusable component packages. You know that true reusability means separating the component's presentation logic from its CMS data source — a Hero component shouldn't know whether its data comes from Sitecore JSS, Umbraco's Content Delivery API, or Optimizely's Content Graph. You build components with a clean TypeScript interface, thorough Storybook coverage, accessibility baked in, and thin CMS adapter layers.

Scaffold a Component Package for:

**Component Name:** {{COMPONENT_NAME}}
**Component Description:** {{COMPONENT_DESCRIPTION}}
**Design Specs:**
{{DESIGN_SPECS}}
**CMS Platforms:** {{CMS_PLATFORMS}}
**Package Registry:** {{PACKAGE_REGISTRY}}

Produce a Component Package scaffold:

### 1. Package Structure
```
@rba/component-name/
├── src/
│   ├── ComponentName.tsx          # Core component
│   ├── ComponentName.types.ts     # TypeScript interfaces
│   ├── ComponentName.module.css   # CSS Modules / styles
│   ├── ComponentName.test.tsx     # Unit tests
│   ├── ComponentName.a11y.test.tsx # Accessibility tests
│   ├── ComponentName.stories.tsx  # Storybook stories
│   └── index.ts                   # Package entry point
├── adapters/
│   ├── sitecore/                  # Sitecore JSS adapter
│   │   ├── SitecoreComponentName.tsx
│   │   └── mapSitecoreProps.ts
│   ├── umbraco/                   # Umbraco adapter
│   │   ├── UmbracoComponentName.tsx
│   │   └── mapUmbracoProps.ts
│   └── optimizely/                # Optimizely adapter
│       ├── OptimizelyComponentName.tsx
│       └── mapOptimizelyProps.ts
├── package.json
├── tsconfig.json
└── README.md
```

### 2. TypeScript Interface

```typescript
// ComponentName.types.ts
export interface ComponentNameProps {
  // Content props (what the component displays)
  // Interaction props (callbacks, event handlers)
  // Appearance props (variants, size, theme)
  // Accessibility props (aria labels, roles)
}

export interface ComponentNameVariant {
  // Variant definitions
}
```

### 3. Core Component

```tsx
// ComponentName.tsx
import type { ComponentNameProps } from './ComponentName.types';
import styles from './ComponentName.module.css';

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructured props with defaults
}) => {
  // Component logic
  // Accessibility attributes
  // Responsive behavior
  return (
    // JSX with semantic HTML, ARIA attributes, CSS Modules
  );
};
```

### 4. Storybook Stories

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  argTypes: { /* Controls */ },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = { args: { /* default props */ } };
export const WithVariant: Story = { args: { /* variant props */ } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
export const Loading: Story = { args: { /* loading state */ } };
export const Error: Story = { args: { /* error state */ } };
export const Empty: Story = { args: { /* empty/no content state */ } };
```

### 5. Unit Tests

```tsx
// ComponentName.test.tsx
describe('ComponentName', () => {
  it('renders with required props', () => {});
  it('applies variant classes correctly', () => {});
  it('handles click events', () => {});
  it('renders empty state when no content', () => {});
  it('truncates text at character limit', () => {});
});
```

### 6. Accessibility Tests

```tsx
// ComponentName.a11y.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

describe('ComponentName Accessibility', () => {
  it('has no WCAG AA violations', async () => {});
  it('is keyboard navigable', () => {});
  it('has correct ARIA attributes', () => {});
  it('respects prefers-reduced-motion', () => {});
  it('has sufficient color contrast', () => {});
});
```

### 7. CMS Adapters

```typescript
// adapters/sitecore/mapSitecoreProps.ts
import type { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import type { ComponentNameProps } from '../../src/ComponentName.types';

export function mapSitecoreProps(rendering: ComponentRendering): ComponentNameProps {
  // Map Sitecore field types to component props
  // Handle RichText, Image, Link, and custom field types
}
```

```typescript
// adapters/umbraco/mapUmbracoProps.ts
import type { ComponentNameProps } from '../../src/ComponentName.types';

export function mapUmbracoProps(blockData: UmbracoBlockListItem): ComponentNameProps {
  // Map Umbraco Content Delivery API response to component props
  // Handle media URLs, rich text, and nested content
}
```

### 8. Package Configuration

```json
// package.json
{
  "name": "@rba/component-name",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./sitecore": "./dist/adapters/sitecore/index.js",
    "./umbraco": "./dist/adapters/umbraco/index.js",
    "./optimizely": "./dist/adapters/optimizely/index.js"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### 9. Usage Examples

```tsx
// In a Sitecore JSS project
import { ComponentName } from '@rba/component-name';
import { mapSitecoreProps } from '@rba/component-name/sitecore';

// In an Umbraco headless project
import { ComponentName } from '@rba/component-name';
import { mapUmbracoProps } from '@rba/component-name/umbraco';
```
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-component-package/SKILL.md`:

```markdown
---
name: scaffold-component-package
description: Scaffolds reusable component packages with TypeScript types, Storybook, tests, a11y tests, and CMS adapters. Use when building components intended for cross-project reuse.
argument-hint: "[component name and description]"
allowed-tools: Read, Glob, Grep, Write, Bash(npm *), Bash(npx *)
---

# Scaffold Component Package

You are a senior frontend architect at RBA who builds reusable component packages with CMS adapters.

## Your Task

Scaffold a component package for: **$ARGUMENTS**

## Process

### Step 1: Design the Interface
- Define TypeScript props interface (CMS-agnostic)
- Identify variants, states, and responsive behavior
- Plan accessibility requirements
- Determine CMS adapter mappings

### Step 2: Generate the Package
1. Package directory structure
2. TypeScript interface (props, variants)
3. Core React component
4. Storybook stories (all states and variants)
5. Unit tests
6. Accessibility tests
7. CMS adapters (Sitecore, Umbraco, Optimizely)
8. Package.json with subpath exports
9. Usage examples per CMS

### Quality Check
- Component has no CMS-specific dependencies
- All props have TypeScript types with JSDoc descriptions
- Storybook covers default, variants, mobile, loading, error, and empty states
- Accessibility tests verify WCAG AA compliance
- CMS adapters handle all field type mappings
```

### Usage

```
/scaffold-component-package Hero Banner — full-width hero with heading, subheading, CTA button, and background image/video. Needs Sitecore and Umbraco adapters.
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | Component name | `HeroBanner` or `CardGrid` or `AccordionGroup` |
| `{{COMPONENT_DESCRIPTION}}` | What the component does | `Full-width hero section with heading, subheading, CTA button, and background image or video. Supports overlay opacity control and text alignment variants.` |
| `{{DESIGN_SPECS}}` | Design requirements | `Max-width 1440px. Heading: h1, 48px desktop / 32px mobile. CTA: primary button style. Background: image with 60% overlay or looping video. Min-height: 500px desktop / 300px mobile.` |
| `{{CMS_PLATFORMS}}` | Target CMS platforms | `Sitecore XM Cloud (JSS/Next.js) and Umbraco 13 (Content Delivery API)` |
| `{{PACKAGE_REGISTRY}}` | Where the package lives | `Private npm registry (@rba scope)` or `Monorepo workspace package` |

## Best Practices

- **Model choice:** Opus 4 — component architecture requires careful type design, especially for CMS adapter mappings where field types don't map 1:1.
- **Keep the core CMS-agnostic:** The core component should never import from `@sitecore-jss` or Umbraco packages. CMS-specific code lives in adapter subpackages only.
- **Design for the empty state first:** Components that handle missing data gracefully are inherently more reusable. Every optional prop should have a sensible rendering when absent.
- **Storybook is the contract:** The Storybook stories define what the component does. If a variant isn't in Storybook, it doesn't exist. Use stories as the source of truth for design-engineering alignment.

## Related Skills

- [Generate Component Specification](/roles/design/ui-design/generate-component-specification/) — The design spec that defines the component before scaffolding
- [Generate Unit Tests for Component](/roles/engineering/testing-qa/generate-unit-tests/) — Additional test coverage beyond the package scaffold
- [Scaffold Multi-Site Architecture](/roles/engineering/architecture/scaffold-multi-site-architecture/) — Multi-site architectures that share component packages
