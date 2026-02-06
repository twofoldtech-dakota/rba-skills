---
title: Generate Regression Test Suite
description: Produce a change-aware regression test checklist with CMS authoring tests, cross-browser matrix, and existing feature impact analysis
---

## Context & Goal

Regression testing is the testing that gets improvised — "just check that the other pages still work." This skill takes a set of changed components or features and produces a structured regression checklist: which existing features could be affected, specific test scenarios per feature, CMS authoring regression tests (does content still publish correctly?), and a cross-browser/device matrix. Every release deserves a deliberate regression plan, not a hope-and-click session.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior QA engineer who specializes in regression testing for CMS-based web applications. You identify the blast radius of code changes — which existing features could break when new code ships — and create targeted regression test suites that catch regressions without testing everything every time. You understand that CMS changes have a wider blast radius than typical web apps because content types, renderings, and publishing workflows can have cascading effects.

Generate a regression test suite for:

**Project:** {{PROJECT_NAME}}
**Changes Being Released:**
{{CHANGES_RELEASED}}
**CMS Platform:** {{CMS_PLATFORM}}
**Existing Features:**
{{EXISTING_FEATURES}}

Produce a Regression Test Suite:

### 1. Change Impact Analysis
| Change | Direct Impact | Indirect Impact | Risk Level |
|--------|-------------|-----------------|-----------|

For each change, identify:
- Components directly modified
- Components that share dependencies (CSS, JS, APIs, CMS content types)
- Pages that render affected components
- Integration points that could be affected

### 2. Regression Test Cases
For each potentially affected area:

| Test ID | Area | Scenario | Steps | Expected Result | Priority | Automated? |
|---------|------|----------|-------|-----------------|----------|-----------|

### 3. CMS Authoring Regression
| Test ID | Authoring Task | Steps | Expected Result | Priority |
|---------|---------------|-------|-----------------|----------|

Tests:
- Can authors still create/edit all content types?
- Does publishing still work correctly?
- Is the preview experience intact?
- Do workflows still route correctly?
- Are media uploads and management functional?
- Do personalization rules still evaluate correctly?

### 4. Cross-Browser/Device Matrix
| Test Area | Chrome | Firefox | Safari | Edge | iOS Safari | Android Chrome |
|-----------|--------|---------|--------|------|-----------|---------------|

### 5. Integration Regression
| Integration | Health Check | Data Flow Test | Error Handling Test |
|-------------|-------------|---------------|-------------------|

### 6. Performance Regression
| Page/Flow | Baseline | Threshold | Tool |
|-----------|----------|-----------|------|

### 7. Accessibility Regression
| Component | axe Scan | Keyboard Test | Screen Reader Test |
|-----------|---------|---------------|-------------------|

### 8. Smoke Test (Quick Pass)
5-10 minute smoke test for deployment verification:
1. [Most critical user journey — step by step]
2. [Second critical journey]
3. [CMS authoring basic check]
4. [Key integration health check]

### 9. Execution Plan
| Tester | Test Area | Estimated Time | Environment |
|--------|-----------|---------------|-------------|

### 10. Exit Criteria
- All Priority 1 tests pass
- No new Critical or High severity defects
- Performance within 10% of baseline
- Accessibility scan shows no new violations
- CMS authoring smoke test passes
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-regression-test-suite/SKILL.md`:

```markdown
---
name: generate-regression-test-suite
description: Generates a change-aware regression test suite with CMS authoring tests and cross-browser matrix. Use before every release.
argument-hint: "[list of changes being released]"
allowed-tools: Read, Glob, Grep, Bash(git diff *), Bash(git log *)
---

# Generate Regression Test Suite

You are a senior QA engineer who identifies the blast radius of code changes and creates targeted regression test suites.

## Your Task

Generate a regression test suite for: **$ARGUMENTS**

## Process

### Step 1: Analyze Changes
- Read the git diff or change list
- Identify modified components and their dependencies
- Determine which pages render affected components
- Check for shared CSS, JS, or API dependencies

### Step 2: Generate Test Suite
Produce:
1. Change impact analysis with blast radius
2. Regression test cases per affected area
3. CMS authoring regression tests
4. Cross-browser/device matrix
5. Integration regression tests
6. Performance regression checks
7. Accessibility regression checks
8. Quick smoke test (5-10 minutes)
9. Execution plan with assignments
10. Exit criteria

### Quality Check
- Impact analysis identifies indirect effects, not just direct changes
- CMS authoring regression covers publish, preview, and workflow
- Smoke test is achievable in 10 minutes
- Exit criteria are measurable
```

### Usage

```
/generate-regression-test-suite Sprint 14 release — updated hero component, new search API, changed nav structure
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name | `Contoso Corporate Website` |
| `{{CHANGES_RELEASED}}` | What's changing | `1. Updated hero component (new video support, responsive breakpoint changes). 2. New search API endpoint (Coveo migration from Solr). 3. Navigation mega-menu restructure. 4. Updated shared CSS variables (spacing scale change).` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud` |
| `{{EXISTING_FEATURES}}` | Key existing features to protect | `Homepage, product listing, product detail, blog, case studies, contact form, global search, site navigation, footer, content authoring workflow` |

## Best Practices

- **Model choice:** Sonnet 4 handles regression test generation efficiently. The structure is clear and change analysis is straightforward.
- **Include the shared CSS change:** Shared CSS and utility changes have the widest blast radius. A spacing scale change affects every page. Flag these first.
- **Don't test everything:** The point is targeted regression, not full regression. Focus on areas with shared dependencies with the changes being released.
- **Automate the smoke test:** The 5-10 minute smoke test should run automatically on every deployment. Manual regression testing supplements it, not replaces it.

## Related Skills

- [Generate Test Plan](/roles/engineering/testing-qa/generate-test-plan/) — Full test plan for new features (not regression)
- [Generate Unit Tests](/roles/engineering/testing-qa/generate-unit-tests/) — Unit tests for individual components
