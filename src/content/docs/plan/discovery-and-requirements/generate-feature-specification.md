---
title: Generate Feature Specification
description: Transform a feature request or user story into a detailed functional specification with acceptance criteria, business rules, edge cases, and CMS-specific considerations
---

## Context & Goal

Every feature that reaches design or engineering should have a clear, detailed specification — not a vague ticket. This skill takes a feature request, user story, or verbal description and produces a complete functional spec: user stories with acceptance criteria, business rules, data requirements, edge cases, error states, and CMS-specific considerations (which platform fields are needed, what content types are affected, which integrations are touched). Run the completeness checklist before handing off, and you'll eliminate the "what about this scenario?" conversations mid-sprint.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior business analyst at a digital consulting agency specializing in CMS implementations (Sitecore, Umbraco, Optimizely) and custom digital solutions. You have 12+ years of experience turning vague feature requests into detailed, implementable specifications that development teams trust.

Transform the following feature request into a detailed functional specification:

**Client:** {{CLIENT_NAME}}
**Project:** {{PROJECT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Feature Request:**
{{FEATURE_REQUEST}}

**Existing Context:**
{{EXISTING_CONTEXT}}

Generate a complete Feature Specification with these sections:

### 1. Feature Overview
- Feature name and one-sentence summary
- Business justification — why this feature matters to the client
- User personas affected (content authors, end users, admins)
- Dependencies on existing features or systems

### 2. User Stories & Acceptance Criteria
For each distinct user need, write:
- **Story ID** (FEAT-001-US-01 format)
- **User Story:** "As a [role], I want [capability], so that [benefit]"
- **Acceptance Criteria** — minimum 3 per story, in Given/When/Then format
- **Priority** (MoSCoW)

### 3. Business Rules
Numbered list of every business rule that governs this feature's behavior:
- Validation rules (field lengths, required fields, format constraints)
- Conditional logic (if X, then Y)
- Calculation rules (pricing, dates, quantities)
- Authorization rules (who can do what)

### 4. Data Requirements
- New data fields needed (name, type, validation, default value)
- CMS content type changes — which templates/document types/content types need modification
- Database schema changes if applicable
- Data migration needs for existing content

### 5. CMS Authoring Implications
- New or modified content types, templates, or renderings
- Author workflow changes (approval steps, publishing rules)
- Personalization or A/B testing touchpoints
- Preview and experience editor considerations
- Field help text recommendations for content authors

### 6. Integration Touchpoints
- APIs consumed or exposed
- Third-party services affected
- Data flow direction and frequency (real-time, batch, event-driven)
- Error handling for integration failures

### 7. Edge Cases & Error States
Table format:

| # | Scenario | Expected Behavior | Severity |
|---|----------|-------------------|----------|

Include at minimum:
- Empty/null data scenarios
- Maximum data volume scenarios
- Concurrent user conflicts
- Network/API failure scenarios
- Permission denial scenarios
- Browser/device edge cases

### 8. UI/UX Requirements
- Wireframe references or behavioral descriptions for each state
- Responsive behavior requirements
- Loading states and skeleton screens
- Empty states and zero-data states
- Error message copy (specific, actionable messages — not generic errors)

### 9. Accessibility Requirements
- Keyboard navigation flow
- Screen reader announcements
- ARIA roles and labels needed
- Focus management requirements
- Color contrast considerations

### 10. Completeness Checklist
Run this before handoff — every box should be checked:
- [ ] Every user story has ≥3 acceptance criteria
- [ ] Every business rule is numbered and testable
- [ ] Edge cases cover empty, maximum, concurrent, and failure scenarios
- [ ] CMS content type changes are specified with field-level detail
- [ ] Integration error handling is defined for every external touchpoint
- [ ] Accessibility requirements are explicit, not assumed
- [ ] Error messages are written in user-friendly language
- [ ] No TBD or placeholder values remain in the spec
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-feature-specification/SKILL.md`:

```markdown
---
name: generate-feature-specification
description: Generates a detailed functional specification from a feature request or user story. Use when defining features before design or engineering handoff, during sprint refinement, or when a ticket needs more rigor.
argument-hint: "[feature name or user story]"
allowed-tools: Read, Glob, Grep
---

# Generate Feature Specification

You are a senior business analyst at a digital consulting agency specializing in CMS implementations (Sitecore, Umbraco, Optimizely) and custom digital solutions. You turn vague feature requests into detailed, implementable specifications.

## Your Task

Generate a detailed functional specification for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read any files the user references (tickets, requirements, existing specs)
- Search the project for related features, content types, or components
- Identify the CMS platform, tech stack, and integration landscape
- Look for existing spec formats or templates to match conventions

### Step 2: Generate the Specification
Produce a complete spec with:
1. Feature overview with business justification
2. User stories with acceptance criteria (Given/When/Then, ≥3 per story)
3. Business rules (numbered, testable)
4. Data requirements including CMS content type changes
5. CMS authoring implications (workflows, preview, help text)
6. Integration touchpoints with error handling
7. Edge cases & error states table
8. UI/UX requirements including loading, empty, and error states
9. Accessibility requirements (keyboard, screen reader, ARIA, focus)
10. Completeness checklist

### Step 3: Validate
- Every user story has at least 3 acceptance criteria
- Every business rule is testable
- Edge cases cover empty, max, concurrent, and failure scenarios
- No TBD or placeholder values remain
- CMS implications are platform-specific, not generic
```

### Usage

```
/generate-feature-specification Global navigation mega-menu with personalized content panels
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{PROJECT_NAME}}` | Project name or context | `Corporate Website Redesign` |
| `{{CMS_PLATFORM}}` | Target CMS platform | `Sitecore XM Cloud` or `Umbraco 13` or `Optimizely CMS 12` |
| `{{FEATURE_REQUEST}}` | The feature request or user story — the more detail, the better | `We need a mega-menu that shows different navigation items based on the user's industry segment. Content authors should be able to configure menu panels with featured content, CTAs, and promotional banners per section.` |
| `{{EXISTING_CONTEXT}}` | Related systems, existing features, or constraints | `Current nav is a simple two-level dropdown. Site uses Sitecore CDP for segmentation. Design team has Figma wireframes for desktop and mobile.` |

## Best Practices

- **Model choice:** Use Sonnet 4 for straightforward CRUD features. Use Opus 4 for complex features with conditional logic, multi-system integrations, or personalization rules.
- **Paste the original request verbatim:** Include the exact client email, Slack message, or meeting notes. AI catches nuances you might paraphrase away.
- **Iterate on edge cases:** After the first draft, ask "what edge cases am I missing for the search functionality?" or "add error states for when the API returns partial data."
- **Use the completeness checklist:** If any box is unchecked, the spec isn't ready for handoff. This is the quality gate.

## Related Skills

- [Generate Requirements Document](/plan/discovery-and-requirements/generate-requirements-document/) — For project-level requirements, not individual features
- [Generate Component Specification](/build/design-systems/generate-component-specification/) — Hand off the UI portion of the feature to design with a component spec
- [Generate Test Plan](/test-and-review/testing/generate-test-plan/) — Generate the test plan that validates this specification
