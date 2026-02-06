---
title: Audit Technical SEO
description: Conduct a technical SEO audit covering crawlability, indexation, structured data, Core Web Vitals, and generative engine optimization (GEO)
---

## Context & Goal

RBA's SEO specialists ensure client sites perform in both traditional search and AI-powered search experiences. As search evolves beyond ten blue links into AI-generated answers (Google AI Overview, Bing Copilot, Perplexity), technical SEO must expand to include generative engine optimization (GEO). This skill produces an actionable audit that covers classic technical SEO fundamentals alongside emerging GEO considerations — giving clients a complete picture of their search visibility posture.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior SEO specialist with expertise in technical SEO for enterprise CMS platforms (Sitecore, Umbraco, Optimizely) and emerging generative engine optimization (GEO). You have 10+ years of experience auditing Fortune 500 and mid-market sites for search performance.

Conduct a comprehensive technical SEO audit based on the following:

**Site URL:** {{SITE_URL}}
**CMS Platform:** {{CMS_PLATFORM}}
**Target Markets:** {{TARGET_MARKETS}}
**Known Issues:**
{{CURRENT_ISSUES}}

**Analytics Data (if available):**
{{ANALYTICS_DATA}}

Produce a structured technical SEO audit with these sections:

1. **Executive Summary** — Overall SEO health score (Good / Needs Improvement / Critical), top 3 findings, and estimated impact of fixing them
2. **Crawlability & Indexation**
   - Robots.txt analysis (blocking critical resources? overly permissive?)
   - XML sitemap review (completeness, format, update frequency, sitemap index structure)
   - Canonical tag implementation (self-referencing, cross-domain, consistency)
   - Pagination handling (rel=next/prev, infinite scroll, load-more patterns)
   - Crawl budget considerations for large sites
3. **On-Page SEO**
   - Meta tags audit (title tags, meta descriptions — length, uniqueness, keyword alignment)
   - Heading hierarchy (H1 uniqueness, logical H2-H6 nesting)
   - Internal linking structure (orphan pages, link depth, anchor text patterns)
   - URL structure (readability, parameter handling, trailing slashes)
4. **Structured Data / Schema Markup**
   - Current implementation review (types in use, validation status)
   - Missing schema opportunities (Organization, BreadcrumbList, FAQ, HowTo, Product, Article)
   - JSON-LD vs microdata assessment
5. **Core Web Vitals Alignment**
   - LCP, FID/INP, CLS assessment approach for the platform
   - CMS-specific performance patterns (Sitecore rendering pipeline, Umbraco surface controllers, etc.)
6. **Mobile Optimization** — Mobile-first indexing readiness, viewport configuration, touch targets, mobile-specific content parity
7. **International SEO** (if applicable) — Hreflang implementation, language/region targeting, content localization signals
8. **GEO Readiness (Generative Engine Optimization)**
   - Content structure for AI answer engines (clear, factual, well-attributed statements)
   - E-E-A-T signals (authorship, citations, expertise indicators, about pages)
   - FAQ and entity markup for AI extraction
   - Content freshness signals and topical authority indicators
   - Structured data that feeds AI knowledge panels
9. **Prioritized Recommendations** — Table with columns: Issue, Category, Impact (High/Medium/Low), Effort (High/Medium/Low), Recommended Action, Priority Rank

Rank recommendations by impact-to-effort ratio. Be specific — reference actual URLs, tags, and configurations rather than generic advice.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/audit-technical-seo/SKILL.md`:

```markdown
---
name: audit-technical-seo
description: Conducts a technical SEO audit covering crawlability, indexation, structured data, Core Web Vitals, and generative engine optimization (GEO). Use when auditing site search performance, preparing for a migration, or evaluating GEO readiness.
argument-hint: "[site URL or project context]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Audit Technical SEO

You are a senior SEO specialist with expertise in technical SEO for enterprise CMS platforms (Sitecore, Umbraco, Optimizely) and emerging generative engine optimization (GEO).

## Your Task

Conduct a technical SEO audit for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read any files the user references (crawl reports, analytics exports, existing audits)
- Search the codebase for SEO-related configurations (robots.txt, sitemap generation, meta tag templates, schema markup)
- Use web search to check current SEO best practices and any platform-specific SEO guidance
- Look for CMS-specific SEO patterns (Sitecore SXA SEO settings, Umbraco SEO extensions, Optimizely SEO configuration)

### Step 2: Audit Each Area

Evaluate and document findings for:
1. Crawlability & Indexation (robots.txt, sitemaps, canonicals, pagination)
2. On-Page SEO (meta tags, headings, internal linking, URL structure)
3. Structured Data (current schema, missing opportunities)
4. Core Web Vitals (platform-specific performance patterns)
5. Mobile Optimization (mobile-first readiness)
6. International SEO (hreflang, localization — if applicable)
7. GEO Readiness (AI answer engine optimization, E-E-A-T signals)

### Step 3: Prioritize and Report
- Create a prioritized recommendations table ranked by impact-to-effort ratio
- Be specific — reference actual files, templates, and configurations found in the codebase
- Include CMS-specific implementation guidance

### Quality Check
- Every recommendation references a specific issue found in the audit
- Impact and effort ratings are justified, not arbitrary
- GEO section addresses at least 3 specific AI search engine considerations
- CMS-specific guidance is included where applicable
```

### Usage

```
/audit-technical-seo https://www.contoso.com — Sitecore XM Cloud site, targeting US and UK markets
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SITE_URL}}` | The site URL to audit | `https://www.contoso.com` |
| `{{CMS_PLATFORM}}` | CMS platform and version | `Sitecore XM Cloud with SXA` or `Umbraco v13` |
| `{{TARGET_MARKETS}}` | Geographic and language targets | `US (English), UK (English), Germany (German), France (French)` |
| `{{CURRENT_ISSUES}}` | Known SEO problems or concerns | `Organic traffic dropped 25% after Q2 platform migration. Multiple duplicate content warnings in Search Console. No structured data implemented.` |
| `{{ANALYTICS_DATA}}` | Traffic, ranking, or crawl data if available | `GSC showing 12K pages indexed (expected 8K), avg position 18.3, 340 pages with soft 404s. CrUX data: LCP 3.2s, CLS 0.18` |

## Best Practices

- **Model choice:** Use Opus 4 for comprehensive audits — it handles the breadth of technical SEO plus GEO analysis well and produces more nuanced prioritization. Sonnet 4 is effective for focused audits on a single area (e.g., "just audit our structured data").
- **Provide crawl data:** If you have Screaming Frog exports, Search Console data, or CrUX reports, paste or reference them. The audit quality improves dramatically with real data versus assumptions.
- **Run GEO and traditional SEO together:** AI search engines still rely on traditional SEO signals. Treating GEO as a separate concern leads to missed connections — the audit intentionally covers both in one pass.
- **CMS context matters:** Always specify the CMS platform. SEO implementation differs significantly between Sitecore SXA's built-in SEO features, Umbraco's SEO packages, and Optimizely's configuration approach.
- **Iterate by priority:** After the initial audit, drill into specific areas: "Expand the structured data recommendations with JSON-LD examples for our product pages" or "Detail the hreflang implementation plan."

## Related Skills

- [Core Web Vitals Audit](/roles/security-oversight/performance/core-web-vitals-audit/) — Deep-dive into performance metrics that directly impact SEO rankings
- [Research Any Topic](/cross-role/research-any-topic/) — Research emerging GEO techniques or platform-specific SEO patterns
