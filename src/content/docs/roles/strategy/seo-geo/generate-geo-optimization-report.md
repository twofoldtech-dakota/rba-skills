---
title: Generate GEO Optimization Report
description: Assess content readiness for AI-powered search with schema markup, content atomization, FAQ structure, and E-E-A-T signal analysis
---

## Context & Goal

Generative Engine Optimization (GEO) is the next frontier beyond traditional SEO. As users increasingly find information through AI-powered search (Google AI Overviews, ChatGPT, Perplexity, Coveo AI answers), content needs to be structured for machine comprehension, not just keyword matching. This skill assesses how well content is structured for AI consumption — analyzing schema markup, content atomization, FAQ structure, E-E-A-T signals, and citation-worthiness. Leverages RBA's Coveo partnership for AI-search-specific recommendations.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior SEO/GEO strategist who understands both traditional search optimization and the emerging field of Generative Engine Optimization. You know how AI models consume, evaluate, and cite web content — and you optimize for citation in AI-generated answers, not just organic rankings. You understand Coveo AI, Google AI Overviews, and LLM-based search patterns.

Generate a GEO optimization report for:

**Client:** {{CLIENT_NAME}}
**Website:** {{WEBSITE_URL}}
**Content Focus:**
{{CONTENT_FOCUS}}
**Current SEO Status:**
{{CURRENT_SEO_STATUS}}
**Target AI Search Platforms:**
{{TARGET_PLATFORMS}}

Produce a GEO Optimization Report:

### 1. Executive Summary
- Overall GEO readiness score (1-10)
- Top 3 opportunities for AI search visibility
- Traditional SEO vs GEO gap analysis
- Priority recommendations

### 2. Content Atomization Assessment
| Content Type | Atomized? | Machine-Readable? | Recommendation |
|-------------|-----------|-------------------|----------------|

Evaluate:
- Are long-form pages broken into answerable units?
- Can AI extract specific answers without reading entire pages?
- Are definitions, steps, and comparisons clearly structured?
- Are data points formatted as structured data, not embedded in prose?

### 3. Schema Markup Audit
| Page Type | Current Schema | Recommended Schema | Priority |
|-----------|---------------|-------------------|----------|

Prioritize:
- FAQ schema (most citation-friendly)
- HowTo schema (step-by-step content)
- Article schema (author, date, organization)
- Product schema (commerce content)
- LocalBusiness schema (service providers)
- BreadcrumbList schema (site structure)

### 4. E-E-A-T Signal Assessment
| Signal | Current State | Recommendation |
|--------|-------------|----------------|

Evaluate:
- **Experience:** First-hand experience demonstrated in content?
- **Expertise:** Author credentials visible and linked?
- **Authoritativeness:** Industry recognition, citations, awards?
- **Trustworthiness:** Contact info, privacy policy, security indicators?

### 5. Content Structure for AI Consumption
| Pattern | Current | Recommended |
|---------|---------|-------------|

Patterns that improve AI citation:
- Question-answer format (Q: What is X? A: X is...)
- Definition blocks (clear, concise definitions at content start)
- Comparison tables (structured data AI can reference)
- Numbered steps (procedural content in list format)
- Statistics with sources (citable data points)
- Expert quotes with attribution

### 6. Citation Worthiness Assessment
| Content Area | Citation Potential | Current Quality | Recommendations |
|-------------|-------------------|----------------|----------------|

What makes content citable by AI:
- Unique data or research
- Clear, authoritative definitions
- Comprehensive comparisons
- Step-by-step procedures
- Expert perspectives with credentials

### 7. Coveo AI / Site Search Optimization
- Content connector optimization for Coveo AI
- Query pipeline rules for AI-generated answers
- Content tagging strategy for Coveo ML models
- Knowledge base structure for AI retrieval

### 8. Technical Recommendations
- Page speed optimization (AI crawlers are time-limited)
- Semantic HTML structure (headings, lists, tables)
- Internal linking for topic clustering
- Sitemap optimization for crawl efficiency
- Robots.txt and AI crawler directives

### 9. Content Roadmap
| Priority | Content Type | GEO Impact | Effort |
|----------|-------------|-----------|--------|

### 10. Measurement Framework
| Metric | Tool | Baseline | Target |
|--------|------|----------|--------|

Including:
- AI Overview appearances (Search Console)
- Coveo AI answer quality (Coveo Analytics)
- Citation tracking in AI chat products
- Organic search vs AI search traffic split
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-geo-optimization-report/SKILL.md`:

```markdown
---
name: generate-geo-optimization-report
description: Assesses content readiness for AI-powered search — schema markup, content atomization, E-E-A-T signals, citation worthiness. Use as part of any SEO/content strategy engagement.
argument-hint: "[website URL and content focus]"
allowed-tools: Read, Glob, Grep, WebSearch, WebFetch
---

# Generate GEO Optimization Report

You are a GEO strategist who optimizes content for AI-powered search citation, not just traditional rankings.

## Your Task

Generate a GEO optimization report for: **$ARGUMENTS**

## Process

### Step 1: Assess Current State
- Fetch and analyze key pages for schema markup
- Evaluate content structure for machine readability
- Check E-E-A-T signals (author pages, credentials, citations)
- Review technical SEO baseline

### Step 2: Generate Report
Produce:
1. Executive summary with GEO readiness score
2. Content atomization assessment
3. Schema markup audit with recommendations
4. E-E-A-T signal assessment
5. Content structure recommendations for AI consumption
6. Citation worthiness assessment
7. Coveo AI / site search optimization
8. Technical recommendations
9. Content roadmap by priority
10. Measurement framework

### Quality Check
- Recommendations are specific to the client's content types
- Schema recommendations use correct schema.org vocabulary
- E-E-A-T improvements are actionable, not generic
- Measurement includes AI-specific metrics
```

### Usage

```
/generate-geo-optimization-report contoso.com — B2B manufacturing, product pages and knowledge base
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{WEBSITE_URL}}` | Website to assess | `contoso.com` |
| `{{CONTENT_FOCUS}}` | Primary content types | `Product pages (500), knowledge base articles (200), case studies (50), blog posts (300), FAQ pages (25)` |
| `{{CURRENT_SEO_STATUS}}` | Current SEO performance | `Domain Rating 55, 10K organic keywords, 50K monthly organic visits. Basic title/meta optimization done. No schema markup. No structured FAQ content.` |
| `{{TARGET_PLATFORMS}}` | AI search platforms to optimize for | `Google AI Overviews, Coveo AI answers (site search), ChatGPT citations, Perplexity references` |

## Best Practices

- **Model choice:** Use Opus 4 — GEO assessment requires reasoning about how AI models evaluate and cite content, which benefits from the most capable model.
- **GEO complements SEO, doesn't replace it:** Traditional SEO fundamentals (page speed, mobile, crawlability) still matter. GEO adds AI-specific optimization on top.
- **FAQ schema is the quick win:** Adding FAQ schema to existing content is the single fastest way to increase AI search visibility.
- **Measure AI-specific metrics:** Google Search Console now shows AI Overview impressions. Track them alongside traditional metrics.

## Related Skills

- [Audit Technical SEO](/roles/strategy/seo-geo/audit-technical-seo/) — Traditional SEO audit that this GEO report builds on
- [Generate Coveo Search Configuration](/cross-role/generate-coveo-search-configuration/) — Coveo configuration for AI-powered site search
