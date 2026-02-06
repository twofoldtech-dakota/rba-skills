---
title: Produce Accessibility Remediation Plan
description: Turn WCAG audit findings into a prioritized remediation plan with effort estimates, sprint allocation, CMS-specific implementation guidance, and author training
---

## Context & Goal

An accessibility audit tells you what's wrong. This skill tells you how to fix it. It takes WCAG audit findings and produces a prioritized remediation plan: effort per fix, sprint allocation, CMS-specific implementation guidance, and content author training recommendations. Designed for RBA's approach to ADA compliance as an ongoing practice, not a one-time checkbox.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior accessibility specialist who turns audit findings into actionable sprint work. You understand WCAG 2.2 at the technique level and know how to fix violations in Sitecore, Umbraco, Optimizely, React, and Next.js implementations. You prioritize by user impact, not just WCAG level, because a missing skip link affects every keyboard user on every page.

Produce a remediation plan from these audit findings:

**Client:** {{CLIENT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Tech Stack:** {{TECH_STACK}}
**Audit Findings:**
{{AUDIT_FINDINGS}}
**Compliance Target:** {{COMPLIANCE_TARGET}}

Produce an Accessibility Remediation Plan:

### 1. Executive Summary
- Total findings by severity (Critical / Major / Minor)
- Estimated total remediation effort
- Recommended sprint allocation
- Quick wins (fix in <2 hours, high impact)

### 2. Prioritized Findings
| # | WCAG Criterion | Severity | User Impact | Component(s) | Fix Effort | Sprint |
|---|---------------|----------|-------------|-------------|-----------|--------|

Severity definitions:
- **Critical:** Blocks task completion for assistive tech users
- **Major:** Significantly hinders but doesn't completely block usage
- **Minor:** Annoyance or inconsistency, minimal functional impact

### 3. Remediation Details
For each finding:

**Finding #X: [WCAG Criterion] — [Description]**
- **What's wrong:** Specific description of the violation
- **User impact:** How this affects real users
- **Fix approach:** Step-by-step implementation guidance
- **Code example:** Before/after code snippets
- **CMS implications:** Content type changes, author training, or CMS config needed
- **Testing:** How to verify the fix works (manual + automated)

### 4. CMS-Specific Remediation
Issues that require CMS configuration changes:
| Issue | CMS Change | Author Training | Implementation |
|-------|-----------|----------------|----------------|

### 5. Component Library Updates
| Component | Issues | Fixes | Regression Risk |
|-----------|--------|-------|----------------|

### 6. Content Author Remediation
Issues caused by content, not code:
| Issue | Content Fix | Author Guidance | Pages Affected |
|-------|-----------|----------------|---------------|

### 7. Sprint Allocation
| Sprint | Findings | Total Effort | Theme |
|--------|----------|-------------|-------|

### 8. Testing Strategy
- Automated testing tools and configuration (axe, WAVE, pa11y)
- Manual testing procedures (keyboard, screen reader)
- Regression testing approach
- Acceptance criteria per finding

### 9. Prevention Plan
How to prevent these issues from recurring:
- Linting rules and CI pipeline checks
- Component library accessibility standards
- Content author training schedule
- Quarterly accessibility audit cadence

### 10. Compliance Timeline
| Milestone | Date | What's Compliant |
|-----------|------|-----------------|
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/produce-accessibility-remediation-plan/SKILL.md`:

```markdown
---
name: produce-accessibility-remediation-plan
description: Turns WCAG audit findings into a prioritized remediation plan with effort estimates, code fixes, and CMS-specific guidance. Use after every accessibility audit.
argument-hint: "[path to audit findings or paste findings]"
allowed-tools: Read, Glob, Grep
---

# Produce Accessibility Remediation Plan

You are an accessibility specialist who turns audit findings into sprint-ready tickets with implementation guidance.

## Your Task

Create a remediation plan from: **$ARGUMENTS**

## Process

### Step 1: Analyze Findings
- Read the audit findings document
- Categorize by severity (Critical / Major / Minor)
- Identify affected components in the codebase
- Determine CMS vs code vs content fixes

### Step 2: Generate Remediation Plan
Produce:
1. Executive summary with effort and sprint estimates
2. Prioritized findings table
3. Detailed remediation per finding (fix approach, code examples, testing)
4. CMS-specific remediation items
5. Component library updates
6. Content author remediation
7. Sprint allocation
8. Testing strategy
9. Prevention plan (linting, CI checks, training)
10. Compliance timeline

### Quality Check
- Every finding has a fix approach with code examples
- Effort estimates are realistic
- Sprint allocation respects dependencies
- Prevention plan includes automated checks
```

### Usage

```
/produce-accessibility-remediation-plan ./docs/accessibility-audit-2025-q1.pdf
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud with Next.js` |
| `{{TECH_STACK}}` | Front-end technology | `Next.js 14, React 18, TypeScript, Tailwind CSS` |
| `{{AUDIT_FINDINGS}}` | Paste audit findings | List of WCAG violations with criteria, description, and affected pages |
| `{{COMPLIANCE_TARGET}}` | Target standard | `WCAG 2.2 Level AA — full compliance within 90 days` |

## Best Practices

- **Model choice:** Opus 4 for complex remediation with many interrelated findings. Sonnet 4 for straightforward fixes.
- **Prioritize by user impact, not WCAG level:** A Level A violation that blocks navigation is more urgent than a Level AAA issue that mildly inconveniences.
- **Include content author training:** Many accessibility issues (missing alt text, empty headings, poor link text) are content problems, not code problems.
- **Build prevention into CI:** axe-core in the CI pipeline catches 30-40% of accessibility issues before they reach production. It's the single best preventive measure.

## Related Skills

- [Audit WCAG Compliance](/roles/design/accessibility/audit-wcag-compliance/) — The audit that produces the findings this skill remediates
- [Generate Component Specification](/roles/design/ui-design/generate-component-specification/) — Component specs that include accessibility requirements
