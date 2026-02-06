---
title: Scaffold Multi-Site Architecture
description: Generate multi-site and multi-brand architecture with shared component libraries, brand-specific themes, and content sharing strategies for any CMS platform
---

## Context & Goal

Multi-site and multi-brand implementations are among the most architecturally complex CMS projects. Content sharing, brand-specific theming, shared component libraries, and site-specific overrides create dependency webs that must be carefully designed upfront. This skill generates the architecture: site definitions, shared vs brand-specific components, content sharing strategies, and theme systems — for Sitecore SXA, Umbraco multitenancy, or Optimizely multi-site.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior architect who has designed multi-site and multi-brand CMS implementations for enterprise clients. You understand the tension between "share everything" (efficient but inflexible) and "separate everything" (flexible but expensive to maintain). You've built multi-brand architectures on Sitecore SXA, Umbraco multitenancy, and Optimizely multi-site and know the platform-specific patterns that work at scale.

Generate a multi-site architecture for:

**Client:** {{CLIENT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Sites/Brands:**
{{SITES_BRANDS}}
**Shared Requirements:**
{{SHARED_REQUIREMENTS}}
**Brand-Specific Requirements:**
{{BRAND_SPECIFIC_REQUIREMENTS}}

Produce a complete Multi-Site Architecture:

### 1. Architecture Overview
- Multi-site pattern (shared instance vs separate instances)
- Content sharing model (inheritance, references, syndication)
- Component sharing strategy (shared library with brand overrides)
- URL strategy (subdomains, subdirectories, separate domains)

### 2. Site Definitions
| Site | Domain | Language(s) | Theme | Content Source | Unique Features |
|------|--------|------------|-------|----------------|-----------------|

### 3. Content Architecture
- Shared content (components, media, data sources usable across sites)
- Brand-specific content (content owned by a single brand)
- Content inheritance model (parent → child site relationships)
- Cross-site content references and linking strategy
- Multi-language strategy per site

### 4. Component Library
| Component | Shared? | Brand Override? | Override Type |
|-----------|---------|----------------|---------------|

Override types: Theme only (CSS), Markup variant, Completely separate

### 5. Theme System
- CSS architecture (variables, tokens, brand-specific overrides)
- Theme inheritance model
- Brand asset management (logos, colors, typography per brand)
- Dark mode / high contrast considerations

### 6. Platform-Specific Configuration

**Sitecore SXA:**
- Tenant and site structure
- Shared vs local rendering variants
- Theme module configuration
- Composite rendering patterns

**Umbraco:**
- Content tree multitenancy structure
- Domain configuration per site
- Shared compositions and element types
- Culture and hostname routing

**Optimizely:**
- Site definitions and start pages
- Shared block types vs site-specific
- Content provider configuration
- Multi-site visitor tracking

### 7. Governance Model
- Who can edit shared content vs brand content?
- Approval workflows per brand
- Content publishing coordination (cross-site impacts)
- Component versioning and deprecation process

### 8. Performance Considerations
- Cache strategy per site (shared cache vs isolated)
- CDN configuration (one CDN, multiple origins?)
- Image optimization per brand (different aspect ratios, formats)
- Shared resource loading optimization

### 9. Development Workflow
- Repository structure (monorepo vs multi-repo)
- Branch strategy per brand
- Shared component development and testing
- Brand-specific feature flags

### 10. Deployment Strategy
- Deploy all sites together or independently?
- Zero-downtime deployment per site
- Rollback scope (one site or all?)
- Environment parity across brands
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-multi-site-architecture/SKILL.md`:

```markdown
---
name: scaffold-multi-site-architecture
description: Generates multi-site/multi-brand CMS architecture with shared components, brand themes, and content sharing strategies. Use when architecting any multi-site implementation.
argument-hint: "[client name and brand structure]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Scaffold Multi-Site Architecture

You are a senior architect who designs multi-brand CMS implementations that balance sharing efficiency with brand flexibility.

## Your Task

Generate a multi-site architecture for: **$ARGUMENTS**

## Process

### Step 1: Understand the Brand Landscape
- Read any brand guidelines, site inventories, or requirements
- Identify what's shared and what's brand-specific
- Determine the CMS platform and its multi-site patterns
- Understand the content governance model

### Step 2: Generate Architecture
Produce:
1. Architecture overview (sharing model, URL strategy)
2. Site definitions table
3. Content architecture (shared vs brand-specific, inheritance)
4. Component library with override strategy
5. Theme system architecture
6. Platform-specific configuration
7. Governance model (editing, approval, publishing)
8. Performance considerations (caching, CDN)
9. Development workflow (repo structure, branching)
10. Deployment strategy

### Quality Check
- Shared vs brand-specific boundaries are clearly defined
- Content governance prevents cross-brand editing mistakes
- Theme system supports brand identity without code duplication
- Deployment can be done per-site without cross-site risk
```

### Usage

```
/scaffold-multi-site-architecture Contoso Group — 5 brands on Sitecore SXA, shared product catalog, unique brand identities
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Retail Group` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud with SXA` or `Umbraco 13 multitenancy` or `Optimizely CMS 12` |
| `{{SITES_BRANDS}}` | Brand/site inventory | `5 brands: BrandA (premium athletic, brandA.com), BrandB (casual lifestyle, brandB.com), BrandC (outdoor, brandC.com), BrandD (kids, brandD.com), BrandE (workwear, brandE.com)` |
| `{{SHARED_REQUIREMENTS}}` | What brands share | `Product catalog, checkout flow, customer account, search infrastructure, footer links, legal pages, analytics tracking` |
| `{{BRAND_SPECIFIC_REQUIREMENTS}}` | What's unique per brand | `Brand colors and typography, homepage layout, campaign landing pages, blog content, social media feeds, featured products` |

## Best Practices

- **Model choice:** Use Opus 4 — multi-site architecture involves complex tradeoff reasoning between sharing and isolation.
- **Define "shared" precisely:** "Shared navigation" might mean same structure or same component with different content. Clarify before architecture.
- **Plan for the fifth brand:** Even if you start with 3 brands, design the architecture so adding a new brand is a configuration task, not an architecture task.
- **Test cross-site impacts:** A change to a shared component affects every site. Build this into the testing strategy from day one.

## Related Skills

- [Configure XM Cloud Component](/build/platform-configuration/configure-xm-cloud-component/) — Build shared XM Cloud components for multi-site use
- [Scaffold Commerce Catalog](/build/component-development/scaffold-commerce-catalog/) — Multi-brand catalog architecture for commerce
