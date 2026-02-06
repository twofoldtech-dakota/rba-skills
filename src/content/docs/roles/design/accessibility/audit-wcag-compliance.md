---
title: Audit WCAG Compliance
description: Conduct a design-focused WCAG 2.1 AA accessibility review of a component, page, or design system
---

## Context & Goal

Accessibility isn't an afterthought at RBA — it's built into our design process. This skill helps designers and developers conduct WCAG 2.1 AA compliance reviews at the component or page level, identifying issues before they reach production. The output is a structured audit report with specific remediation guidance.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior accessibility specialist with deep expertise in WCAG 2.1 guidelines, ARIA patterns, and inclusive design. You've conducted hundreds of accessibility audits for enterprise web applications across Sitecore, Umbraco, and Optimizely platforms.

Conduct a WCAG {{TARGET_WCAG_LEVEL}} compliance audit of the following:

**Component/Page:** {{COMPONENT_OR_PAGE}}
**Description:** {{DESCRIPTION}}
**Design System:** {{DESIGN_SYSTEM_REFERENCE}}
**Technology Stack:** {{TECH_STACK}}

Produce an audit report with:

1. **Executive Summary** — Overall compliance status (Pass / Partial / Fail) with a 1-2 sentence assessment
2. **Issue Inventory** — Table with columns:
   - Issue ID (AX-001, AX-002, etc.)
   - WCAG Criterion (e.g., 1.4.3 Contrast)
   - Severity (Critical / Major / Minor)
   - Element affected
   - Description of the issue
   - Remediation recommendation
3. **Color Contrast Analysis** — Check all text/background combinations against WCAG AA (4.5:1 normal, 3:1 large) and AAA (7:1 normal, 4.5:1 large) ratios
4. **Keyboard Navigation Review** — Tab order, focus indicators, keyboard traps, skip links
5. **Screen Reader Considerations** — Heading hierarchy, ARIA labels, landmark regions, alt text, live regions
6. **Motion & Animation** — Reduced motion support, auto-playing content, flashing content
7. **Responsive & Zoom** — Behavior at 200% zoom, reflow at 320px viewport, touch targets (44x44px minimum)
8. **Recommendations Summary** — Prioritized list: fix Critical issues first, then Major, then Minor

For each issue, be specific about the element, the current behavior, and the exact fix needed. Reference WCAG success criteria by number.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/audit-wcag-compliance/SKILL.md`:

```markdown
---
name: audit-wcag-compliance
description: Conducts a WCAG 2.1 AA/AAA accessibility audit of components, pages, or code. Use when reviewing designs for accessibility, preparing for an audit, or remediating accessibility issues.
argument-hint: "[component or page to audit]"
allowed-tools: Read, Glob, Grep
---

# Audit WCAG Compliance

You are a senior accessibility specialist with deep expertise in WCAG 2.1 guidelines, ARIA patterns, and inclusive design.

## Your Task

Audit accessibility for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read the component/page code referenced by the user
- Search for related styles, ARIA attributes, and event handlers
- Check for existing accessibility utilities or shared patterns in the codebase

### Step 2: Audit Against WCAG 2.1 AA
Evaluate:
1. Color contrast (text, interactive elements, non-text content)
2. Keyboard navigation (tab order, focus management, keyboard traps)
3. Screen reader support (headings, ARIA, landmarks, alt text)
4. Motion and animation (prefers-reduced-motion, auto-play)
5. Responsive behavior (zoom, reflow, touch targets)

### Step 3: Produce Report
- Issue inventory table with severity, criterion, and remediation
- Prioritized recommendations
- Code examples for fixes where applicable

### Quality Check
- Every issue references a specific WCAG success criterion
- Remediation recommendations include code examples
- Issues are prioritized by severity
```

### Usage

```
/audit-wcag-compliance src/components/HeroBanner.tsx
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{TARGET_WCAG_LEVEL}}` | Target conformance level | `AA` or `AAA` |
| `{{COMPONENT_OR_PAGE}}` | What is being audited | `Hero Banner component` or `Product listing page` |
| `{{DESCRIPTION}}` | Describe the component's appearance and behavior | `Full-width hero with background image, overlay text, and CTA button. Includes auto-rotating carousel of 3 slides.` |
| `{{DESIGN_SYSTEM_REFERENCE}}` | Design system or style guide in use | `RBA Design System v2 — uses 16px base, #00b8d9 primary` |
| `{{TECH_STACK}}` | Front-end technology stack | `React 18 + Next.js 14 + Sitecore JSS` |

## Best Practices

- **Model choice:** Use Opus 4 for comprehensive audits of complex interactive components. Sonnet 4 works for quick checks on simple, static components.
- **Include visuals:** If you can describe or screenshot the component, include it. More visual context means more accurate contrast and layout analysis.
- **Audit early:** Run this during design review, not after development. Fixing accessibility in design is 10x cheaper than fixing in code.
- **Pair with code review:** For the most thorough audit, combine this design-focused review with a code-level scan using the component's actual markup.

## Related Skills

- [Security Review Checklist](/roles/security-oversight/security/security-review-checklist/) — Security and accessibility reviews often happen together
- [Core Web Vitals Audit](/roles/security-oversight/performance/core-web-vitals-audit/) — Performance affects accessibility (slow sites impact users with assistive technology)
