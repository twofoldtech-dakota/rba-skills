---
title: Scaffold Sitecore Content Hub Configuration
description: Generate Content Hub configuration for DAM, CMP, PCM, or MRM modules with entity definitions, schema configurations, and integration scripts
---

## Context & Goal

Sitecore Content Hub spans four modules — DAM, CMP, PCM, and MRM — each with its own entity schemas, trigger actions, and integration patterns. Setting up a new Content Hub module from scratch means hours of manual configuration and trial-and-error. This skill generates the configuration artifacts: entity definitions, schema configurations, trigger actions, and integration scripts for connecting to XM Cloud or XP — based on RBA's full-suite Content Hub expertise.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a Sitecore Content Hub architect with deep expertise in DAM, CMP, PCM, and MRM module configuration. You've implemented Content Hub for enterprise clients managing millions of digital assets with complex taxonomy, approval workflows, and multi-channel publishing requirements. You understand Content Hub's entity model, schema system, trigger actions, and API integrations.

Generate Content Hub configuration for the following:

**Client:** {{CLIENT_NAME}}
**Content Hub Module(s):** {{MODULES}}
**Integration Target:** {{INTEGRATION_TARGET}}
**Use Case:**
{{USE_CASE}}
**Asset Types:**
{{ASSET_TYPES}}
**Taxonomy Requirements:**
{{TAXONOMY_REQUIREMENTS}}

Produce a complete Content Hub Configuration Package:

### 1. Entity Definitions
For each custom entity needed:
- Entity name and definition name
- Parent entity (if inheriting)
- Member groups (fields organized by function)
- Relations to other entities (parent/child, one-to-many, many-to-many)

### 2. Schema Configuration
For each entity, define the schema:

| Member Group | Field Name | Type | Required | Indexed | Description |
|-------------|------------|------|----------|---------|-------------|

Field types: String, Integer, Boolean, DateTime, Relation, Taxonomy, JSON

### 3. Taxonomy Configuration
- Taxonomy name and structure (flat vs hierarchical)
- Top-level categories and subcategory depth
- Facet configuration for search and filtering
- Auto-classification rules (if applicable)

### 4. Workflow Configuration (CMP/MRM)
- State definitions (Draft, In Review, Approved, Published, Archived)
- Transition rules (who can move content between states)
- Approval gates and notification triggers
- SLA timers for review stages

### 5. Trigger Actions
For each automated action:
- Trigger name and objective
- Trigger type (entity creation, modification, state change, scheduled)
- Conditions (when the trigger fires)
- Action script (JavaScript for Content Hub triggers)
- Error handling approach

### 6. Integration Scripts
For XM Cloud or XP integration:
- Connector configuration (Content Hub to XM Cloud)
- Field mapping (Content Hub fields → Sitecore template fields)
- Media sync configuration (DAM assets → Sitecore media library)
- Publishing trigger (Content Hub approval → Sitecore publish)
- API authentication setup

### 7. Security & Permissions
- User group definitions
- Permission policies per entity type
- Role-based access for different workflow states
- API key scoping for integrations

### 8. Validation Checklist
- [ ] Entity schemas resolve without circular dependencies
- [ ] Taxonomy supports required faceted search patterns
- [ ] Workflows cover all content lifecycle states
- [ ] Trigger actions handle error scenarios gracefully
- [ ] Integration field mappings cover all Sitecore template fields
- [ ] Permissions follow least-privilege principle
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-content-hub-configuration/SKILL.md`:

```markdown
---
name: scaffold-content-hub-configuration
description: Generates Sitecore Content Hub configuration for DAM, CMP, PCM, or MRM modules. Use when setting up a new Content Hub instance or adding modules to an existing one.
argument-hint: "[module and use case]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Scaffold Content Hub Configuration

You are a Sitecore Content Hub architect with expertise across all four modules (DAM, CMP, PCM, MRM).

## Your Task

Generate Content Hub configuration for: **$ARGUMENTS**

## Process

### Step 1: Understand the Scope
- Identify which modules are needed (DAM, CMP, PCM, MRM)
- Read any referenced asset inventories, taxonomy documents, or workflow specs
- Determine the integration target (XM Cloud, XP, or standalone)

### Step 2: Generate Configuration
Produce:
1. Entity definitions with relations
2. Schema configuration with field types and indexing
3. Taxonomy structure (flat vs hierarchical, facets)
4. Workflow configuration with states, transitions, and approvals
5. Trigger action scripts (JavaScript)
6. Integration scripts for XM Cloud/XP connection
7. Security and permissions model
8. Validation checklist

### Quality Check
- Entity schemas have no circular dependencies
- Workflows cover the full content lifecycle
- Trigger actions include error handling
- Integration mappings cover all target template fields
```

### Usage

```
/scaffold-content-hub-configuration DAM + CMP for Contoso — product photography workflow with auto-crop and XM Cloud sync
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{MODULES}}` | Content Hub modules to configure | `DAM + CMP` or `DAM + PCM` or `All four (DAM, CMP, PCM, MRM)` |
| `{{INTEGRATION_TARGET}}` | System to integrate with | `Sitecore XM Cloud` or `Sitecore XP 10.3` or `Standalone (API consumers)` |
| `{{USE_CASE}}` | Business use case driving the configuration | `Centralize product photography for 15 brands. Auto-crop for web/social formats. CMP manages product content from brief through approval. Sync approved assets and content to XM Cloud.` |
| `{{ASSET_TYPES}}` | Types of assets being managed | `Product photography (TIFF, PSD, JPG), product videos (MP4), brand guidelines (PDF), marketing collateral (InDesign, Illustrator)` |
| `{{TAXONOMY_REQUIREMENTS}}` | How assets should be categorized | `By brand (15 brands), product category (3 levels deep), campaign, season, channel (web, social, print, email), usage rights` |

## Best Practices

- **Model choice:** Use Opus 4 — Content Hub entity modeling requires understanding complex relationships and multi-module interactions.
- **Start with DAM, add modules incrementally:** Even if all four modules are needed, configure DAM first as the foundation, then layer CMP, PCM, and MRM.
- **Include real taxonomy examples:** The more specific your taxonomy requirements, the more production-ready the configuration. "Product categories" is vague; "Footwear > Athletic > Running > Trail" is actionable.
- **Test trigger actions in sandbox:** Content Hub trigger scripts run server-side JavaScript. Always test in a non-production instance first.

## Related Skills

- [Configure XM Cloud Component](/technologies/sitecore/xm-cloud/configure-xm-cloud-component/) — Configure the XM Cloud side of the Content Hub integration
- [Scaffold OrderCloud Integration](/technologies/sitecore/commerce/scaffold-ordercloud-integration/) — When PCM connects to OrderCloud for commerce catalog
