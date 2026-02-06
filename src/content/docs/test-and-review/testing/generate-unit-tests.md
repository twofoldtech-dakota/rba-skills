---
title: Generate Unit Tests for Component
description: Generate unit and integration tests for existing components with realistic CMS data fixtures, platform-specific mocks, and edge case coverage
---

## Context & Goal

Test coverage is the first thing to slip when sprints get tight. This skill takes an existing component and generates unit/integration tests: test fixtures with realistic CMS data, mocks for Sitecore/Umbraco/Optimizely context, edge case coverage, and snapshot tests. It follows the testing patterns already in the project so the generated tests fit naturally alongside hand-written ones.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior software engineer specializing in test-driven development for CMS-backed web applications. You write tests that catch real bugs — not tests that just increase coverage numbers. You have deep experience with Jest, React Testing Library, Vitest, Playwright, and testing patterns for Sitecore JSS, Umbraco, and Optimizely headless implementations.

Generate comprehensive tests for the following component:

**Component Name:** {{COMPONENT_NAME}}
**Component Code:**
{{COMPONENT_CODE}}

**Tech Stack:** {{TECH_STACK}}
**Testing Framework:** {{TESTING_FRAMEWORK}}
**CMS Platform:** {{CMS_PLATFORM}}

Generate a complete test file with these sections:

### 1. Test Fixtures
Create realistic test data that matches CMS field shapes:
- Default props fixture (happy path, all fields populated)
- Minimal props fixture (only required fields)
- Empty/null fixture (tests graceful degradation)
- Maximum data fixture (longest text, most items, largest image)
- CMS-specific fixtures (Sitecore field types with editable/value shapes, Umbraco IPublishedContent mocks, Optimizely content area mocks)

### 2. Rendering Tests
- Renders correctly with default props
- Renders correctly with minimal props
- Renders nothing or fallback with empty/null props
- Renders all variants (if the component has variants)
- Matches snapshot (visual regression baseline)

### 3. Interaction Tests
- Click handlers fire with correct arguments
- Form inputs update state correctly
- Toggle/expand/collapse behavior works
- Navigation/link behavior (internal vs external)
- Keyboard interaction (Enter, Space, Escape, Tab)

### 4. Accessibility Tests
- Has correct ARIA roles and labels
- Keyboard navigation works in correct tab order
- Screen reader announcements fire for dynamic content
- Focus management on open/close/submit
- No accessibility violations (axe integration test)

### 5. Edge Case Tests
- Extremely long text content (does it overflow or truncate?)
- Missing image (does it show fallback?)
- Slow/failed API response (does it show loading/error state?)
- Concurrent renders (React strict mode double-render)
- Empty arrays/collections (does it hide the section?)

### 6. Integration Tests (if applicable)
- CMS context provider renders correctly
- API calls are made with correct parameters
- Data transformations produce expected output
- Cache behavior works as expected

### 7. Test Utilities
- Custom render wrapper with required providers (theme, CMS context, router)
- Helper functions for common assertions
- Mock factories for CMS data types

Follow these conventions:
- Use descriptive test names: "renders fallback image when src is null" not "test case 1"
- Group tests with describe blocks by behavior category
- Each test should test one thing
- Use realistic data, not "test" or "foo"
- Mock external dependencies, not internal logic
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-unit-tests/SKILL.md`:

```markdown
---
name: generate-unit-tests
description: Generates unit and integration tests for existing components with CMS data fixtures, edge case coverage, and accessibility tests. Use after scaffolding a component or when backfilling test coverage.
argument-hint: "[component file path or name]"
allowed-tools: Read, Glob, Grep
---

# Generate Unit Tests for Component

You are a senior engineer who writes tests that catch real bugs in CMS-backed web applications.

## Your Task

Generate tests for: **$ARGUMENTS**

## Process

### Step 1: Understand the Component
- Read the component file in full
- Find the component's type definitions and prop interfaces
- Search for existing tests in the project to match patterns and conventions
- Identify the testing framework (Jest, Vitest, React Testing Library, Playwright)
- Check for test utilities, custom render wrappers, or mock factories
- Identify the CMS platform and how CMS data enters the component

### Step 2: Generate Tests
Create a complete test file with:
1. Test fixtures (default, minimal, empty, maximum, CMS-specific)
2. Rendering tests (all prop combinations and variants)
3. Interaction tests (clicks, inputs, keyboard)
4. Accessibility tests (ARIA, keyboard nav, axe integration)
5. Edge case tests (overflow, missing data, errors, empty collections)
6. Integration tests if the component fetches data or uses CMS context
7. Test utilities (custom render wrapper, mock factories)

### Step 3: Validate
- Every exported prop has at least one test
- Edge cases cover empty, null, max, and error scenarios
- Test names are descriptive and behavior-focused
- Mocks match the project's existing patterns
- No tests depend on implementation details (test behavior, not internals)

### Quality Check
- Test file follows project naming conventions
- All imports resolve correctly
- Fixtures use realistic data, not "test" or "foo"
- Accessibility tests include axe integration
```

### Usage

```
/generate-unit-tests src/components/HeroBanner/HeroBanner.tsx
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | Component name | `ProductComparisonTable` |
| `{{COMPONENT_CODE}}` | Full component source code | Paste the entire component file |
| `{{TECH_STACK}}` | Technologies in use | `Next.js 14, React 18, TypeScript, Tailwind CSS` |
| `{{TESTING_FRAMEWORK}}` | Testing tools used in the project | `Vitest + React Testing Library + axe-core` |
| `{{CMS_PLATFORM}}` | CMS platform if applicable | `Sitecore XM Cloud (JSS)` or `Umbraco 13 (Content Delivery API)` |

## Best Practices

- **Model choice:** Sonnet 4 generates thorough test files efficiently. Use Opus 4 when the component has complex conditional rendering logic or multi-step interaction flows.
- **Paste the full component:** Include imports, type definitions, and the complete implementation. The AI generates better mocks and edge cases when it can see every code path.
- **Include existing test examples:** If the project has established test patterns, paste one example test file. The generated tests will match the conventions.
- **Run the tests immediately:** Don't review the generated tests visually — run them. Fix import paths and mock issues, then verify assertions match actual behavior.

## Related Skills

- [Generate Test Plan](/test-and-review/testing/generate-test-plan/) — Project-level test strategy that these unit tests implement
- [Generate Component Specification](/build/design-systems/generate-component-specification/) — The spec that defines what behavior these tests should verify
- [Scaffold React Component](/build/component-development/scaffold-react-component/) — Scaffold a component that this skill then tests
