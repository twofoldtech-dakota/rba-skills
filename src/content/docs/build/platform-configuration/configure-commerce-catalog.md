---
title: Configure Commerce Catalog
description: Design an Optimizely Commerce catalog structure with product types, variations, pricing, and inventory models
---

## Context & Goal

Optimizely Commerce powers e-commerce for enterprise clients. The catalog is the foundation — product types define what can be sold, variations represent the purchasable SKUs, pricing tiers determine what customers pay, and inventory tracks what is available. A poorly designed catalog creates data entry nightmares for merchandisers and integration headaches for developers. This skill designs a catalog architecture that scales with the client's product line, supports their pricing strategy, and integrates cleanly with both the CMS content model and external systems.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior commerce developer with deep expertise in Optimizely Commerce, catalog architecture, product modeling, pricing strategies, and inventory management integration. You understand how catalog design decisions impact merchandiser productivity, site performance, and integration complexity.

Design a commerce catalog architecture for the following requirements:

**Product Categories:**
{{PRODUCT_CATEGORIES}}

**Variation Dimensions:**
{{VARIATION_DIMENSIONS}}

**Pricing Model:** {{PRICING_MODEL}}
**Inventory Sources:** {{INVENTORY_SOURCES}}

**Integration Requirements:**
{{INTEGRATION_REQUIREMENTS}}

Produce the following catalog architecture:

### 1. Catalog Architecture Overview
- High-level catalog structure (catalogs, categories, entries)
- Design philosophy (flat vs. deep hierarchy, shared vs. isolated catalogs)
- Scalability considerations for the projected product count
- How this catalog integrates with the CMS content model

### 2. Catalog Entry Types
For each entry type (product, variation, bundle, package), define:
- C# class inheriting from the appropriate base (ProductContent, VariationContent, BundleContent, PackageContent)
- [CatalogContentType] attribute configuration
- MetaClass name and friendly name
- Entry type purpose and when merchandisers use it

### 3. Product Type Definitions
For each product type:
- C# class with all properties
- Property types: ShortString, LongString, LongHtmlString, Number, FloatNumber, DateTime, Boolean, DictionaryMultiValue, DictionarySingleValue
- [Display] attributes with GroupName for backoffice tabs
- [Required] and [Range] validation
- [Searchable] and [Tokenize] attributes for search indexing
- [IncludeInDefaultSearch] for unified search
- [CultureSpecific] for localizable fields
- Asset group configuration (images, downloads, videos)

### 4. Variation Definitions
- Variation class for each SKU dimension
- SKU code generation strategy (human-readable vs. system-generated)
- Variation matrix design:
  | Product Type | Dimension 1 | Dimension 2 | Example SKU |
  |-------------|-------------|-------------|-------------|
- Maximum variation count considerations
- Variation-level properties (weight, dimensions, GTIN)

### 5. Pricing Model Design
- Price types (list price, sale price, customer-specific)
- Currency support (single vs. multi-currency)
- Customer group pricing tiers
- Quantity-based pricing (volume discounts)
- Pricing service customization:
  - IPriceService usage for standard pricing
  - Custom IPriceOptimizer for complex pricing rules
  - Price caching strategy
- Price import/sync strategy from external systems

### 6. Inventory Model
- Warehouse definitions (single, multi-warehouse, drop-ship)
- Inventory tracking level (product vs. variation)
- Stock status thresholds (in stock, low stock, out of stock, backorder)
- Inventory reservation workflow (cart → checkout → order)
- Pre-order and backorder support
- Inventory sync strategy from ERP/WMS:
  - Real-time API vs. batch import
  - Conflict resolution (what happens when external and Commerce disagree)

### 7. Category Hierarchy
- Category tree structure (max recommended depth: 3-4 levels)
- Category content type definition (C# class)
- Category metadata (description, image, SEO fields)
- Product-to-category assignment strategy (primary vs. secondary categories)
- Virtual categories vs. static categories

### 8. Product-Content Relationships
- How CMS pages reference commerce products (ContentReference, product listing blocks)
- How product pages inherit CMS layouts (templates, headers, footers)
- Marketing content on product pages (banners, recommendations, reviews)
- Landing pages that filter/display catalog products

### 9. Media and Asset Management
- Product image management (primary image, gallery, zoom)
- Image naming conventions and organization
- Asset groups for different media types
- CDN configuration for product media
- Image transformation and responsive image strategy

### 10. Import/Export Strategy
- Catalog import format (CSV, XML, custom)
- Import pipeline design (staging → validation → commit)
- Delta import vs. full catalog replace
- Error handling and reporting
- Scheduled import jobs
- Export feeds (Google Shopping, Amazon, affiliates)

### 11. Search and Filtering Configuration
- Catalog search index configuration
- Faceted navigation design (filters by category, price, attributes)
- Search boost rules (promoted products, new arrivals)
- Autocomplete configuration
- Sort options (relevance, price, newest, bestselling)

Include C# code for all type definitions. Use current Optimizely Commerce namespaces and patterns. Indicate where custom implementations are needed vs. out-of-box features.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/configure-commerce-catalog/SKILL.md`:

```markdown
---
name: configure-commerce-catalog
description: Designs an Optimizely Commerce catalog architecture including product types, variations, pricing, inventory, and search configuration. Use when setting up a new commerce catalog or restructuring an existing one.
argument-hint: "[product categories, pricing model, and integration requirements]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Configure Commerce Catalog

You are a senior commerce developer with deep expertise in Optimizely Commerce, catalog architecture, product modeling, pricing strategies, and inventory management.

## Your Task

Design a commerce catalog for: **$ARGUMENTS**

## Process

### Step 1: Assess Current State
- Read existing catalog entry types and category definitions in the codebase
- Check the Optimizely Commerce version from NuGet packages
- Identify existing pricing and inventory customizations
- Look for import/export jobs and external system integrations
- Review the search index configuration

### Step 2: Research Best Practices
- Use WebSearch to check the latest Optimizely Commerce documentation for catalog design
- Verify pricing and inventory API patterns for the installed version
- Check for any deprecated catalog APIs

### Step 3: Design Catalog Architecture
Produce:
1. Catalog architecture overview
2. Entry type definitions (product, variation, bundle, package)
3. Product type C# classes with properties
4. Variation definitions and SKU matrix
5. Pricing model design
6. Inventory model
7. Category hierarchy
8. Product-content relationships
9. Media and asset management plan
10. Import/export strategy
11. Search and filtering configuration

### Step 4: Quality Check
- Product types use current Optimizely Commerce base classes
- Variation dimensions support all required SKU combinations
- Pricing model handles all stated pricing scenarios
- Inventory model accounts for all warehouse sources
- Search configuration enables the required filtering and facets
- Import strategy handles the projected catalog size efficiently
```

### Usage

```
/configure-commerce-catalog Apparel catalog with 5,000 products — size/color variations, tiered pricing for wholesale vs retail, multi-warehouse inventory with ERP sync
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PRODUCT_CATEGORIES}}` | Product types and categories to support | `Outerwear (jackets, coats, vests), Footwear (boots, sneakers, sandals), Accessories (hats, gloves, bags) — approx. 5,000 SKUs` |
| `{{VARIATION_DIMENSIONS}}` | How products vary to create SKUs | `Size (XS-3XL), Color (from a palette of 40 colors), Width (narrow, standard, wide — footwear only)` |
| `{{PRICING_MODEL}}` | How prices are structured | `List price (MSRP), sale price (time-bounded), wholesale pricing for registered B2B customers, volume discounts at 10+ and 50+ units` |
| `{{INVENTORY_SOURCES}}` | Where inventory comes from | `Primary warehouse (Chicago), secondary warehouse (LA), drop-ship from 3 vendor feeds, pre-order for seasonal launches` |
| `{{INTEGRATION_REQUIREMENTS}}` | External systems to integrate with | `SAP ERP for pricing and inventory sync (nightly batch), Google Shopping product feed, Algolia for search, Affirm for financing` |

## Best Practices

- **Model choice:** Use Opus 4 for catalog design. Commerce architectures involve interconnected decisions (pricing affects checkout, inventory affects search, categories affect navigation) where deeper reasoning produces better trade-off analysis. Sonnet 4 works for simple single-catalog, single-pricing-tier designs.
- **Start with the SKU matrix:** The variation dimensions determine catalog complexity more than anything else. Define dimensions before properties.
- **Plan for scale:** A catalog with 5,000 products and 3 variation dimensions can produce 100,000+ SKU entries. Design import and indexing strategies that handle this volume.
- **Separate content from commerce:** Product marketing content (lifestyle images, long descriptions) belongs in CMS content linked to catalog entries, not crammed into catalog properties.
- **Design imports early:** Most commerce projects spend more time on import/export than on the storefront. Design the import pipeline as a first-class deliverable.

## Related Skills

- [Scaffold OrderCloud Integration](/build/component-development/scaffold-ordercloud-integration/) — Alternative commerce approach using Sitecore OrderCloud
- [Generate API Specification](/build/architecture-and-integration/generate-api-specification/) — Define APIs between the commerce engine and front-end
