---
title: Configure Sitecore Search
description: Design and configure Sitecore Search indexes, crawlers, and search experience including facets, boosting, and relevance tuning
---

## Context & Goal

Search is the primary way users find content on large Sitecore sites. Whether you are configuring Sitecore's SaaS Search product, Solr indexes for XP, or Azure Cognitive Search, the work involves the same concerns: defining what gets indexed, how it gets ranked, what facets users can filter by, and how search results are presented. A poorly configured search means users cannot find content — and for many sites, that directly impacts conversion. This skill generates the full search configuration from index definitions through front-end search components.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Sitecore developer with expertise in Sitecore Search (cloud), Solr, Azure Cognitive Search, search UX patterns, faceted navigation, and relevance tuning. You've designed and implemented search solutions for enterprise Sitecore sites with thousands of pages and complex content models.

Design and configure a search solution for the following:

**Search Platform:** {{SEARCH_PLATFORM}}
**Content Types to Index:** {{CONTENT_TYPES}}
**Facets Required:** {{FACETS}}
**Boosting Rules:** {{BOOSTING_RULES}}
**Search Context:** {{SEARCH_CONTEXT}}

Produce a complete search configuration with:

1. **Search Architecture Overview** — Diagram (as text/ASCII) showing the data flow from content authoring through indexing to search results delivery. Identify which Sitecore role handles indexing, where the search index lives, and how the front-end queries it.

2. **Index Configuration**
   - Index name and scope (site-specific vs. global)
   - Fields to index: field name, source template field, index field type (string, text, date, number, multilist)
   - Computed fields: field name, computation logic, return type (e.g., extracting taxonomy terms, concatenating display values, computing dates)
   - Field type mappings for the search platform
   - Exclude rules (templates, paths, or items to exclude from indexing)

3. **Crawler Configuration**
   - For Sitecore Search (cloud): source definitions, extraction rules, content selectors, scheduling
   - For Solr: crawler root, database (master vs. web), include/exclude templates, indexing strategy (on-publish vs. scheduled rebuild)
   - For Azure Cognitive Search: data source connection, indexer schedule, field mappings, skillset (if using AI enrichment)

4. **Facet Definitions** — For each facet:
   - Facet name and display label
   - Source field and field type
   - Facet type (value, range, hierarchical, date range)
   - Sort order (count, alphabetical, custom)
   - Display configuration (checkbox list, dropdown, slider, date picker)
   - Any dependency between facets (cascading filters)

5. **Boosting and Relevance Rules**
   - Field-level boosting (e.g., title matches weighted 3x over body)
   - Document-level boosting (e.g., recently published content ranked higher)
   - Exact match vs. partial match weighting
   - Phrase proximity boosting
   - Business rules (e.g., promoted results for specific queries, pinned content)
   - Decay functions for date-based relevance

6. **Synonym and Language Configuration**
   - Synonym lists (one-way and two-way synonyms)
   - Stop words configuration
   - Stemming and lemmatization settings
   - Multi-language index strategy (per-language index vs. language field filter)

7. **Autocomplete and Typeahead**
   - Suggestion source (index field, separate suggestion index, or query log)
   - Minimum character threshold
   - Maximum suggestions displayed
   - Highlighting configuration
   - Popular queries integration

8. **Search Results Component Specification**
   - Results list layout (fields to display per result)
   - Pagination strategy (page numbers, infinite scroll, load more)
   - No-results handling (suggestions, spelling corrections, related content)
   - Result highlighting (matched terms in snippets)
   - Sort options (relevance, date, alphabetical, custom)

9. **Analytics and Monitoring**
   - Search query logging (what users search for)
   - Zero-results tracking (queries that return no results)
   - Click-through tracking (which results users click)
   - Search performance metrics (query latency, index size)
   - Dashboard or report recommendations

10. **Performance Optimization**
    - Index size management (field storage vs. indexing-only)
    - Query optimization patterns (filter vs. query context)
    - Caching strategy for search results
    - Warm-up queries for cold start scenarios
    - Index rebuild strategy (full vs. incremental, off-hours scheduling)

For each configuration section, provide the actual configuration code or markup (XML for Solr, JSON for Sitecore Search, etc.) alongside explanatory comments.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/configure-sitecore-search/SKILL.md`:

```markdown
---
name: configure-sitecore-search
description: Generates search configuration for Sitecore Search (cloud), Solr, or Azure Cognitive Search — including index definitions, crawlers, facets, boosting rules, and search results components. Use when setting up site search, optimizing relevance, or migrating search platforms.
argument-hint: "[search platform and content types]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Configure Sitecore Search

You are a senior Sitecore developer with expertise in Sitecore Search (cloud), Solr, Azure Cognitive Search, faceted navigation, and relevance tuning.

## Your Task

Design and configure search for: **$ARGUMENTS**

## Process

### Step 1: Discover Current Search Setup
- Read existing search configuration files (Solr config, search index definitions, computed fields)
- Search for existing search components and queries in the codebase
- Identify content templates that should be indexed
- Check for existing facet, boosting, or synonym configuration
- Determine the Sitecore version and search platform in use

### Step 2: Design Index Configuration
1. Define index scope and included content types
2. Map template fields to index fields with proper types
3. Design computed fields for derived data
4. Configure exclude rules for non-indexable content

### Step 3: Configure Search Experience
1. Define facets with display types and sort orders
2. Set up boosting and relevance rules
3. Configure synonyms and language processing
4. Design autocomplete/typeahead behavior

### Step 4: Generate Search Components
1. Search results component with pagination and sorting
2. Facet filter components
3. Autocomplete/typeahead component
4. No-results fallback behavior

### Step 5: Produce Configuration
- Platform-specific configuration files (XML, JSON, or YAML)
- Front-end component code
- Analytics and monitoring setup
- Performance optimization recommendations

### Quality Check
- Every content type in scope has its fields mapped to index fields
- Facet fields are indexed with the correct field type for faceting
- Boosting rules are specific and justified by business requirements
- Configuration includes both search-time and index-time settings
- Performance considerations address index rebuild strategy
```

### Usage

```
/configure-sitecore-search Solr-based search for XP 10.3 — product catalog with category facets and date-based relevance
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SEARCH_PLATFORM}}` | The search technology in use | `Sitecore Search (cloud)` or `Solr 8.11 with Sitecore XP 10.3` or `Azure Cognitive Search` |
| `{{CONTENT_TYPES}}` | Content templates or types to index | `Article, Product, Event, FAQ, Team Member — approximately 5,000 total items across 3 sites` |
| `{{FACETS}}` | Facets users should be able to filter by | `Category (hierarchical taxonomy), Date Range (year/month), Author, Content Type, Tags (multiselect)` |
| `{{BOOSTING_RULES}}` | Business rules for result ranking | `Title matches 3x, content published within 90 days boosted 1.5x, featured flag boosts 2x, exact phrase match boosts 5x` |
| `{{SEARCH_CONTEXT}}` | Where search is used and what users expect | `Global site search bar on every page, plus a filtered resource library page with faceted navigation. Users are primarily marketing professionals looking for case studies and whitepapers.` |

## Best Practices

- **Model choice:** Use Sonnet 4 for standard search configurations with well-defined content types and facets — search config is largely pattern-based. Use Opus 4 when designing complex relevance tuning, multi-language search strategies, or migrating between search platforms where trade-off analysis is needed.
- **Start with user intent:** Before configuring indexes, describe what users are actually searching for and what results they expect. This shapes boosting rules and facet design far more than the technical schema does.
- **Test with real queries:** After generating the configuration, test with 10-20 real search queries from analytics or stakeholder interviews. Tune boosting rules based on whether the expected results appear in the top 5.
- **Monitor zero-results queries:** The most valuable search optimization comes from tracking what users search for and get nothing back. Use this data to add synonyms, adjust indexing scope, or create missing content.
- **Plan for rebuild time:** Large Sitecore indexes can take hours to rebuild. Include index rebuild strategy and scheduling in your configuration to avoid impacting content authoring during business hours.

## Related Skills

- [Configure XM Cloud Component](/technologies/sitecore/xm-cloud/configure-xm-cloud-component/) — Build the front-end search results components that consume the search API
- [Audit Technical SEO](/roles/strategy/seo-geo/audit-technical-seo/) — Search configuration directly impacts SEO — internal search quality affects user engagement metrics
