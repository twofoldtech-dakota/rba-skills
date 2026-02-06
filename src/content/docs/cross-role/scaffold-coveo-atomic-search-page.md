---
title: Scaffold Coveo Atomic Search Page
description: Generate a Coveo Atomic search interface with facets, result templates, query pipelines, and relevance tuning configured for CMS content from Sitecore, Umbraco, or Optimizely
---

## Context & Goal

Coveo Atomic is the modern component library for building search interfaces, replacing the older Headless and JSUI approaches. But a production search page requires more than dropping `<atomic-search-interface>` on a page — it needs source-specific result templates, CMS-aware facet configuration, query pipeline rules for relevance tuning, and analytics integration for Coveo's ML features. This skill scaffolds a complete Coveo Atomic search page tailored to the CMS content structure — field mappings, result templates for different content types, facet configuration that matches the content model, and pipeline rules that surface the right content. Built on RBA's formal Coveo partnership and production implementations including the Caleres multi-brand commerce search.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior search engineer at RBA with deep Coveo expertise. You've implemented Coveo search for enterprise CMS platforms — Sitecore, Umbraco, and Optimizely — and know that great search requires three things: properly mapped source fields, well-designed result templates, and query pipeline rules that boost the right content. You use Coveo Atomic (the modern web component library) and configure search for both relevance and the Coveo ML feedback loop.

Scaffold a Coveo Atomic Search Page for:

**CMS Platform:** {{CMS_PLATFORM}}
**Content Types:**
{{CONTENT_TYPES}}
**Search Requirements:**
{{SEARCH_REQUIREMENTS}}
**Coveo Organization:** {{COVEO_ORG}}

Produce a Coveo Atomic Search Page scaffold:

### 1. Search Interface Architecture
- Source configuration (CMS connector type)
- Index field mappings (CMS fields → Coveo fields)
- Result template strategy
- Facet configuration
- Query pipeline rules

### 2. Atomic Search Page

```html
<atomic-search-interface>
  <atomic-search-layout>
    <!-- Search Box -->
    <atomic-search-box suggestion-timeout="500">
      <atomic-search-box-query-suggestions></atomic-search-box-query-suggestions>
      <atomic-search-box-recent-queries></atomic-search-box-recent-queries>
    </atomic-search-box>

    <!-- Facets -->
    <atomic-layout-section section="facets">
      <!-- CMS-specific facets -->
    </atomic-layout-section>

    <!-- Results -->
    <atomic-layout-section section="main">
      <atomic-layout-section section="status">
        <atomic-breadbox></atomic-breadbox>
        <atomic-query-summary></atomic-query-summary>
        <atomic-sort-dropdown>
          <atomic-sort-expression label="Relevance" expression="relevancy"></atomic-sort-expression>
          <atomic-sort-expression label="Newest" expression="date descending"></atomic-sort-expression>
        </atomic-sort-dropdown>
      </atomic-layout-section>

      <atomic-result-list>
        <!-- Content-type-specific result templates -->
      </atomic-result-list>

      <atomic-load-more-results></atomic-load-more-results>
    </atomic-layout-section>
  </atomic-search-layout>
</atomic-search-interface>
```

### 3. Result Templates

```html
<!-- Template per content type with appropriate metadata display -->
<atomic-result-template must-match-sourcetype="[CMS Source]">
  <template>
    <atomic-result-section-title>
      <atomic-result-link></atomic-result-link>
    </atomic-result-section-title>
    <atomic-result-section-excerpt>
      <atomic-result-text field="excerpt"></atomic-result-text>
    </atomic-result-section-excerpt>
    <atomic-result-section-bottom-metadata>
      <!-- Content-type-specific metadata -->
    </atomic-result-section-bottom-metadata>
  </template>
</atomic-result-template>
```

### 4. Field Mappings
| CMS Field | Coveo Field | Type | Facet? | Sort? | Purpose |
|-----------|------------|------|--------|-------|---------|

### 5. Facet Configuration
| Facet | Field | Type | Sort | Values |
|-------|-------|------|------|--------|

### 6. Query Pipeline Rules
| Rule | Type | Condition | Action | Purpose |
|------|------|-----------|--------|---------|

Common rules:
- Featured results for high-priority pages
- Query function boosting for recent content
- Thesaurus entries for domain-specific synonyms
- Ranking weight adjustments for content type priority
- Filter rules for draft/unpublished content exclusion

### 7. Analytics & ML Configuration
- Search analytics event tracking
- Click analytics for relevance feedback
- Coveo ML model recommendations:
  - Automatic Relevance Tuning (ART)
  - Query Suggestions (QS)
  - Content Recommendations (CR)
- Minimum data requirements for ML activation

### 8. Initialization Code

```javascript
// Coveo Atomic initialization with CMS-specific configuration
import { loadSearchAnalyticsActions } from '@coveo/atomic';

const searchInterface = document.querySelector('atomic-search-interface');
await searchInterface.initialize({
  accessToken: '[SEARCH_API_KEY]',
  organizationId: '[ORG_ID]',
  search: {
    pipeline: '[PIPELINE_NAME]',
    searchHub: '[SEARCH_HUB]'
  }
});
```

### 9. Performance Considerations
- Lazy load facets below the fold
- Prefetch query suggestions on focus
- Cache static facet values
- Debounce search-as-you-type (300ms)
- Result template rendering optimization

### 10. Testing Checklist
- [ ] Search returns results for common queries
- [ ] Facets filter correctly
- [ ] Result templates display appropriate metadata per content type
- [ ] Analytics events fire on search and click
- [ ] No results page shows helpful suggestions
- [ ] Mobile responsive layout works
- [ ] Accessibility: keyboard navigation and screen reader support
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-coveo-atomic-search-page/SKILL.md`:

```markdown
---
name: scaffold-coveo-atomic-search-page
description: Scaffolds Coveo Atomic search interfaces with CMS-specific field mappings, result templates, facets, and query pipeline rules. Use when implementing Coveo search on Sitecore, Umbraco, or Optimizely.
argument-hint: "[CMS platform and search requirements]"
allowed-tools: Read, Glob, Grep
---

# Scaffold Coveo Atomic Search Page

You are a senior search engineer at RBA with deep Coveo expertise and CMS search implementation experience.

## Your Task

Scaffold a Coveo Atomic search page for: **$ARGUMENTS**

## Process

### Step 1: Map the Content Model
- Identify CMS content types and their fields
- Define field mappings (CMS → Coveo)
- Plan result templates per content type
- Design facet configuration

### Step 2: Generate the Scaffold
1. Search interface HTML with Atomic components
2. Result templates per content type
3. Field mapping table
4. Facet configuration
5. Query pipeline rules
6. Analytics and ML setup
7. Initialization code
8. Performance optimizations
9. Testing checklist

### Quality Check
- Field mappings cover all searchable CMS fields
- Result templates match CMS content types
- Query pipeline includes relevance boosting rules
- Analytics events are configured for ML feedback loop
```

### Usage

```
/scaffold-coveo-atomic-search-page Sitecore XM Cloud — Product, Article, FAQ, and Case Study content types with category and date facets
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud` or `Umbraco 13` or `Optimizely CMS 12` |
| `{{CONTENT_TYPES}}` | Content types to search | `Product (name, description, category, brand, SKU), Article (title, body, author, date, tags), FAQ (question, answer, category), Case Study (title, industry, solution, results)` |
| `{{SEARCH_REQUIREMENTS}}` | Search features needed | `Full-text search with facets for category, content type, and date range. Query suggestions. Featured results for key landing pages. Commerce product search with price/availability facets.` |
| `{{COVEO_ORG}}` | Coveo organization | `Coveo Production org with Sitecore connector configured` |

## Best Practices

- **Model choice:** Opus 4 — search configuration requires understanding both the CMS content model and Coveo's relevance engine. Query pipeline rules need careful reasoning.
- **Start with field mappings:** The most common search implementation mistake is skipping field mappings. If CMS fields aren't mapped to Coveo fields, facets and result templates can't reference them.
- **Configure analytics from day one:** Coveo's ML models (ART, QS, CR) need search and click analytics data. Implementing analytics later means losing months of training data.
- **Use query pipeline rules, not just ML:** Automatic Relevance Tuning helps, but editorial boosting rules (featured results, recency boost) give immediate control over search quality.

## Related Skills

- [Generate Coveo Search Configuration](/cross-role/generate-coveo-search-configuration/) — Full Coveo source and pipeline configuration (broader than just the search page)
- [Scaffold Sitecore JSS Component](/technologies/sitecore/xm-cloud/scaffold-sitecore-jss-component/) — Scaffold the Next.js component that wraps the Coveo search interface
- [Configure Umbraco Content Delivery API](/technologies/umbraco/v13-plus/configure-umbraco-content-delivery-api/) — Content Delivery API provides the content that Coveo indexes
