---
title: Generate Coveo Search Configuration
description: Create Coveo implementation configuration with source setup, field mappings, query pipeline rules, relevance tuning, and ML model recommendations
---

## Context & Goal

Coveo search implementations require careful configuration across sources, fields, pipelines, and ML models. As a Coveo partner, RBA has production-tested patterns for connecting Coveo to Sitecore, Umbraco, and headless architectures — including commerce catalog search. This skill generates the configuration artifacts so you start from proven patterns instead of trial-and-error.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a Coveo implementation architect with expertise in enterprise search for CMS-driven websites. You've configured Coveo for Sitecore, Umbraco, and headless implementations, including commerce product search with faceted filtering and ML-powered relevance. You understand Coveo's source connectors, field mappings, query pipeline architecture, and machine learning models.

Generate a Coveo search configuration for:

**Client:** {{CLIENT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Search Scope:**
{{SEARCH_SCOPE}}
**Content Types:**
{{CONTENT_TYPES}}
**User Requirements:**
{{USER_REQUIREMENTS}}

Produce a complete Coveo Configuration Package:

### 1. Source Configuration
For each content source:
| Source Name | Type | Connector | Crawl Schedule | Scope |
|-------------|------|-----------|----------------|-------|

Configuration details:
- Crawl URLs and exclusion patterns
- Authentication for restricted content
- Incremental refresh schedule
- Content security trimming

### 2. Field Mapping
| CMS Field | Coveo Field | Type | Facet | Sort | Free Text | Boost |
|-----------|------------|------|-------|------|-----------|-------|

Include:
- Standard fields (title, description, URL, date, author)
- CMS-specific fields (content type, template, language)
- Commerce fields (price, category, SKU, availability)
- Custom metadata fields
- Computed fields (aggregations, concatenations)

### 3. Query Pipeline Configuration
| Pipeline | Purpose | Condition | Features Enabled |
|----------|---------|-----------|-----------------|

For each pipeline, configure:
- Query suggestions (top queries, query completion)
- Featured results (pinned results for specific queries)
- Ranking expressions (boost rules)
- Thesaurus entries (synonyms)
- Stop words
- Query parameter rules
- Result folding (grouping related items)

### 4. Relevance Tuning
- Ranking weight adjustments per field
- Proximity boost configuration
- Recency boost (for news/blog content)
- QRE (Query Ranking Expressions) for business rules
- Custom relevance model for commerce (price, popularity, margin)

### 5. Facet Configuration
| Facet | Field | Type | Sort | Display |
|-------|-------|------|------|---------|

Types: checkbox, hierarchical, range (numeric), date range, rating

### 6. ML Model Recommendations
| Model | Type | Training Data | Use Case |
|-------|------|---------------|----------|

Recommendations for:
- Automatic Relevance Tuning (ART)
- Query Suggestions (QS)
- Content Recommendations (CR)
- Dynamic Navigation Experience (DNE)
- Commerce Recommendations (if applicable)

### 7. Search Interface Configuration
- Search box behavior (suggestions, recent searches, pre-query)
- Results layout (list, grid, mixed)
- Pagination vs infinite scroll
- No-results experience
- Did-you-mean behavior
- Language detection and filtering

### 8. Analytics Configuration
- Usage analytics setup
- Custom dimensions for reporting
- A/B testing for search experiences
- Click-through tracking
- Search abandonment tracking

### 9. Performance Optimization
- Caching strategy (query cache, result cache)
- Index optimization schedule
- Large result set handling
- API call optimization for headless implementations
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-coveo-search-configuration/SKILL.md`:

```markdown
---
name: generate-coveo-search-configuration
description: Generates Coveo search configuration with source setup, field mappings, query pipelines, and ML recommendations. Use when implementing Coveo on any Sitecore, Umbraco, or headless project.
argument-hint: "[client name and search scope]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Generate Coveo Search Configuration

You are a Coveo implementation architect with expertise in CMS-driven search and commerce catalog search.

## Your Task

Generate Coveo search configuration for: **$ARGUMENTS**

## Process

### Step 1: Understand the Search Scope
- Read content models, templates, and CMS configuration
- Identify all content types that need to be searchable
- Determine commerce product catalog scope if applicable
- Understand user search personas and use cases

### Step 2: Generate Configuration
Produce:
1. Source configuration with connectors and crawl schedules
2. Field mapping table (CMS field → Coveo field)
3. Query pipeline configuration
4. Relevance tuning rules
5. Facet configuration
6. ML model recommendations
7. Search interface configuration
8. Analytics setup
9. Performance optimization strategy

### Quality Check
- Every searchable content type has a source and field mappings
- Query pipeline has suggestions, featured results, and thesaurus
- ML models are recommended with training data requirements
- Performance optimization addresses caching and API efficiency
```

### Usage

```
/generate-coveo-search-configuration Contoso — Sitecore XM Cloud + OrderCloud product search, 10K SKUs
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{CMS_PLATFORM}}` | CMS and commerce platform | `Sitecore XM Cloud + OrderCloud, Next.js front-end` |
| `{{SEARCH_SCOPE}}` | What's being searched | `Website content (500 pages), product catalog (10,000 SKUs), knowledge base articles (2,000), downloadable resources (500 PDFs)` |
| `{{CONTENT_TYPES}}` | Content types to index | `Product pages, category pages, blog posts, case studies, whitepapers, video transcripts, FAQ entries` |
| `{{USER_REQUIREMENTS}}` | Search UX requirements | `Faceted product search with price ranges, autocomplete, typo tolerance, "did you mean" suggestions, personalized results based on browsing history` |

## Best Practices

- **Model choice:** Use Opus 4 for complex multi-source configurations. Sonnet 4 for single-source implementations.
- **Start with the query pipeline:** The pipeline architecture determines everything else. Get the pipeline structure right, then configure sources and fields to feed it.
- **Train ML models with real data:** Coveo's ART model needs 2-4 weeks of usage data to train. Plan for a "rules-based" phase before ML takes over.
- **Monitor search analytics from day one:** Set up analytics tracking before launch so you have baseline data for relevance tuning.

## Related Skills

- [Configure Sitecore Search](/build/platform-configuration/configure-sitecore-search/) — For native Sitecore Search as an alternative to Coveo
- [Scaffold Commerce Catalog](/build/component-development/scaffold-commerce-catalog/) — The catalog structure that Coveo indexes for product search
