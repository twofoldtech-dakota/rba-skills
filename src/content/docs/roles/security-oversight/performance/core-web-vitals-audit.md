---
title: Core Web Vitals Audit
description: Analyze code and configuration against LCP, CLS, and INP performance targets with framework-specific recommendations
---

## Context & Goal

Core Web Vitals (LCP, CLS, INP) directly impact SEO rankings, user experience, and conversion rates. This skill reviews code and configuration against Google's performance thresholds and produces actionable recommendations specific to your framework and CMS platform. Use it before launches, after performance regressions, or as part of regular performance hygiene.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior web performance engineer with expertise in Core Web Vitals optimization across React, Next.js, .NET, and CMS platforms (Sitecore, Umbraco, Optimizely). You've optimized hundreds of pages to pass Google's CWV thresholds.

Conduct a Core Web Vitals audit for the following:

**Page/Component:** {{PAGE_OR_COMPONENT}}
**Framework:** {{FRAMEWORK}}
**Performance Budget:** {{PERFORMANCE_BUDGET}}
**Current Metrics (if known):**
{{CURRENT_METRICS}}

**Code/Configuration to Review:**
{{CODE_OR_CONFIG}}

Produce an audit report covering:

### 1. Largest Contentful Paint (LCP) — Target: < 2.5s
- Identify the likely LCP element
- Image optimization: format, sizing, lazy vs. eager loading, preload hints
- Server response time (TTFB) factors
- Render-blocking resources (CSS, JS, fonts)
- CMS-specific factors (Sitecore rendering pipeline, Umbraco content delivery, Optimizely page load)
- CDN and caching configuration

### 2. Cumulative Layout Shift (CLS) — Target: < 0.1
- Elements without explicit dimensions (images, ads, embeds, iframes)
- Web font loading strategy (FOUT/FOIT prevention)
- Dynamic content injection above the fold
- CSS containment opportunities
- Skeleton screens and placeholder patterns

### 3. Interaction to Next Paint (INP) — Target: < 200ms
- Long tasks blocking the main thread
- JavaScript bundle size and code splitting
- Event handler optimization
- Third-party script impact
- Hydration strategy (for SSR/SSG frameworks)

### 4. Additional Performance Factors
- Bundle analysis: JS and CSS size, tree shaking effectiveness
- Image delivery: responsive images, WebP/AVIF, CDN-based transforms
- Font loading: subsetting, preloading, font-display strategy
- Third-party impact: analytics, chat widgets, tracking scripts
- Caching strategy: HTTP cache headers, service worker, stale-while-revalidate

### 5. Prioritized Recommendations
Table with columns:
- Priority (P0 Critical / P1 High / P2 Medium / P3 Low)
- Issue
- Estimated impact on CWV metric
- Implementation effort (Low / Medium / High)
- Specific fix (code snippet or configuration change)

Order by: highest impact with lowest effort first.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/core-web-vitals-audit/SKILL.md`:

```markdown
---
name: core-web-vitals-audit
description: Audits code and configuration against Core Web Vitals (LCP, CLS, INP) targets with framework-specific recommendations. Use before launches, after regressions, or for performance reviews.
argument-hint: "[page, component, or area to audit]"
allowed-tools: Read, Glob, Grep
---

# Core Web Vitals Audit

You are a senior web performance engineer specializing in Core Web Vitals optimization.

## Your Task

Audit Core Web Vitals for: **$ARGUMENTS**

## Process

### Step 1: Discover the Stack
- Read package.json to identify framework and dependencies
- Search for performance-related configuration (next.config.js, image loaders, caching)
- Find the target page/component code

### Step 2: Analyze Each Metric
- **LCP:** Identify LCP element, check image optimization, TTFB factors, render blocking
- **CLS:** Check for unsized elements, font loading, dynamic content
- **INP:** Check bundle sizes, long tasks, hydration strategy, event handlers

### Step 3: Produce Recommendations
Prioritized table: impact vs. effort for each recommendation, with code snippets.

### Quality Check
- Recommendations are specific to the framework (not generic web advice)
- Code snippets are included for top recommendations
- Impact estimates reference specific CWV metrics
```

### Usage

```
/core-web-vitals-audit src/pages/products/index.tsx
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PAGE_OR_COMPONENT}}` | What to audit | `Product listing page` or `HeroBanner component` |
| `{{FRAMEWORK}}` | Front-end framework and rendering strategy | `Next.js 14 (App Router, SSR) + Sitecore JSS` |
| `{{PERFORMANCE_BUDGET}}` | Target performance budget | `LCP < 2.0s, CLS < 0.05, INP < 150ms, Total JS < 300KB` |
| `{{CURRENT_METRICS}}` | Current CWV data from PageSpeed Insights, CrUX, or Lighthouse | `LCP: 3.8s, CLS: 0.22, INP: 340ms (from PageSpeed Insights, mobile)` |
| `{{CODE_OR_CONFIG}}` | Code snippets or configuration to review | Paste component code, next.config.js, image configuration, etc. |

## Best Practices

- **Model choice:** Sonnet 4 works well for standard audits. Use Opus 4 when reviewing complex rendering pipelines or SSR/hydration issues.
- **Include real metrics:** If you have PageSpeed Insights or CrUX data, include it. The AI can prioritize recommendations based on which metric is furthest from target.
- **Focus on one page:** Auditing "the whole site" produces generic advice. Pick the highest-traffic page and get specific.
- **Pair with Lighthouse:** Run Lighthouse first to get data, then use this skill to get actionable, framework-specific recommendations.

## Related Skills

- [Security Review Checklist](/roles/security-oversight/security/security-review-checklist/) — CDN and caching changes for performance should also pass security review
- [Audit WCAG Compliance](/roles/design/accessibility/audit-wcag-compliance/) — Performance and accessibility are closely related
