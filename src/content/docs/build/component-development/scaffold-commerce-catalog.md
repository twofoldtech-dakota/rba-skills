---
title: Scaffold Sitecore Commerce Catalog
description: Generate OrderCloud catalog structure with product hierarchies, specs, price schedules, and multi-brand configurations based on proven patterns
---

## Context & Goal

OrderCloud's flexibility is its greatest strength and biggest setup challenge — there's no "default" catalog structure. This skill generates the catalog architecture: product hierarchies, category relationships, spec definitions, price schedules, and buyer/supplier configurations. Based on multi-brand patterns from RBA's commerce implementations including enterprise retailers processing thousands of orders per hour across 15+ brands.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a Sitecore OrderCloud architect with expertise in multi-brand commerce implementations. You've built catalog structures for enterprise retailers managing thousands of SKUs across multiple brands, with complex pricing, variant management, and supplier integrations. You understand OrderCloud's resource hierarchy (Organization → Seller → Supplier → Buyer) and how to model real-world product catalogs.

Generate an OrderCloud catalog structure for:

**Client:** {{CLIENT_NAME}}
**Business Model:** {{BUSINESS_MODEL}}
**Product Types:**
{{PRODUCT_TYPES}}
**Brand/Channel Structure:**
{{BRAND_STRUCTURE}}
**Pricing Model:**
{{PRICING_MODEL}}
**Integration Requirements:**
{{INTEGRATION_REQUIREMENTS}}

Produce a complete Commerce Catalog Package:

### 1. Organization Hierarchy
- Marketplace structure (seller, suppliers, buyers)
- User group definitions per buyer organization
- Spending account and approval rule structure
- Security profile assignments

### 2. Product Catalog Structure
- Catalog definitions (one per brand or shared)
- Category hierarchy with nesting strategy
- Category assignment rules (products to categories)
- Catalog visibility rules (which buyers see which catalogs)

### 3. Product Model
For each product type:
- Product definition with standard fields
- Extended properties (xp) schema for custom data
- Variant structure (what creates variants — size, color, material)
- Inventory management approach (tracked vs untracked, per-supplier)

### 4. Spec Definitions
| Spec Name | Type | Options | Defines Variant | Required |
|-----------|------|---------|----------------|----------|

For variant-generating specs:
- Spec combination rules
- SKU generation pattern
- Image mapping per variant

### 5. Price Schedule Configuration
| Schedule Name | Type | Currency | Min Qty | Max Qty | Use Case |
|---------------|------|----------|---------|---------|----------|

Include:
- Base price schedules
- Volume discount tiers
- Buyer-specific pricing overrides
- Sale/promotional pricing structure
- Multi-currency handling

### 6. Supplier Configuration
- Supplier definitions and product ownership
- Supplier address and fulfillment setup
- Supplier-level inventory tracking
- Order routing rules (which supplier fulfills which products)

### 7. Buyer Configuration
- Buyer organization structure
- User group hierarchy (admin, purchaser, approver, viewer)
- Approval rules (order value thresholds, category restrictions)
- Spending accounts and budget allocation
- Address book structure

### 8. Integration Points
- PIM sync (Akeneo, Salsify, or Content Hub PCM → OrderCloud)
- ERP integration (order export, inventory sync, pricing updates)
- Search integration (Coveo, Sitecore Search for product discovery)
- CMS integration (XM Cloud product components, buy buttons)
- Payment gateway configuration

### 9. API Configuration
- Webhook definitions for order lifecycle events
- Integration event handlers
- Rate limiting and caching strategy
- Error handling and retry patterns

### 10. Data Migration Plan
- Source data mapping to OrderCloud resources
- Import sequence (catalogs → products → pricing → assignments)
- Validation rules for imported data
- Rollback strategy for failed imports
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-commerce-catalog/SKILL.md`:

```markdown
---
name: scaffold-commerce-catalog
description: Generates OrderCloud catalog structure with product hierarchies, specs, price schedules, and multi-brand config. Use when setting up a new OrderCloud implementation or restructuring an existing catalog.
argument-hint: "[client name and commerce model]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Scaffold Commerce Catalog

You are a Sitecore OrderCloud architect with expertise in multi-brand commerce implementations processing thousands of orders per hour.

## Your Task

Generate a commerce catalog structure for: **$ARGUMENTS**

## Process

### Step 1: Understand the Business Model
- Read any referenced product data, catalogs, or commerce requirements
- Identify the business model (B2B, B2C, D2C, marketplace)
- Determine the brand/channel structure
- Understand pricing complexity (volume, buyer-specific, multi-currency)

### Step 2: Generate the Catalog
Produce:
1. Organization hierarchy (marketplace, sellers, suppliers, buyers)
2. Product catalog structure with categories
3. Product model with xp schema and variants
4. Spec definitions and variant generation rules
5. Price schedule configuration
6. Supplier and buyer configurations
7. Integration points (PIM, ERP, search, CMS)
8. API configuration (webhooks, events, caching)
9. Data migration plan with import sequence

### Quality Check
- Catalog supports the stated brand/channel structure
- Variant model handles all product types
- Pricing covers base, volume, buyer-specific, and promotional
- Integration points have error handling defined
```

### Usage

```
/scaffold-commerce-catalog Contoso Retail — 5 brands, 10K SKUs, B2C with wholesale B2B channel
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Retail Group` |
| `{{BUSINESS_MODEL}}` | Commerce model | `Multi-brand B2C with separate wholesale B2B portal. 5 consumer brands, 200 wholesale accounts.` |
| `{{PRODUCT_TYPES}}` | Types of products sold | `Footwear (sized by gender/width/length), Accessories (one-size), Gift cards (digital, denominated)` |
| `{{BRAND_STRUCTURE}}` | How brands/channels are organized | `5 brands: BrandA (premium athletic), BrandB (casual lifestyle), BrandC (outdoor/hiking), BrandD (kids), BrandE (work/safety). Each has own storefront.` |
| `{{PRICING_MODEL}}` | How pricing works | `MSRP per product, brand-specific margins, wholesale volume discounts (10+ units: 15% off, 50+: 25% off), seasonal sales with date ranges, loyalty tier pricing` |
| `{{INTEGRATION_REQUIREMENTS}}` | Systems that connect to OrderCloud | `Akeneo PIM (product data master), SAP ERP (orders + inventory), Coveo (product search), Sitecore XM Cloud (storefronts), Stripe (payments)` |

## Best Practices

- **Model choice:** Use Opus 4 — catalog modeling requires reasoning about complex hierarchies, multi-dimensional variants, and pricing rules that interact.
- **Start with the product model:** Get the product types, variants, and specs right first. Everything else (pricing, categories, assignments) builds on this foundation.
- **Think about the author/merchant experience:** How will merchants manage 10,000 SKUs? Bulk operations, import/export workflows, and dashboard views matter as much as the data model.
- **Plan the import sequence:** OrderCloud resources have dependencies. Catalogs before categories, categories before product assignments, products before pricing. Get the sequence wrong and imports fail silently.

## Related Skills

- [Scaffold OrderCloud Integration](/build/component-development/scaffold-ordercloud-integration/) — Integration patterns between OrderCloud and other systems
- [Configure XM Cloud Component](/build/platform-configuration/configure-xm-cloud-component/) — Build the storefront components that display catalog data
