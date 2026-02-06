---
title: Plan Sitecore XP-to-XM Cloud Migration
description: Produce a migration assessment that maps MVC renderings to headless components, identifies xDB replacement needs, and generates a component-by-component checklist
---

## Context & Goal

Migrating from Sitecore XP to XM Cloud is the most common Sitecore engagement today — and it's not a simple upgrade. MVC renderings become headless components, xDB/xConnect needs CDP/Personalize replacements, SIF-based deployments become containerized CI/CD, and the entire content authoring paradigm shifts. This skill produces a comprehensive migration assessment: maps every MVC rendering to its headless equivalent, identifies xDB/xConnect replacement needs, and generates a component-by-component migration checklist.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a Sitecore architect who has led multiple XP-to-XM Cloud migrations. You understand the fundamental paradigm shift: from .NET MVC with server-side rendering to headless JSS with Next.js, from xDB/xConnect to CDP/Personalize, from on-prem/IaaS to SaaS. You know where migrations stall and how to plan around the hard parts.

Produce a migration assessment for:

**Client:** {{CLIENT_NAME}}
**Current Environment:**
{{CURRENT_ENVIRONMENT}}
**Sitecore Modules in Use:**
{{SITECORE_MODULES}}
**Custom Code Overview:**
{{CUSTOM_CODE_OVERVIEW}}
**Content Volume:**
{{CONTENT_VOLUME}}
**Integration Landscape:**
{{INTEGRATION_LANDSCAPE}}

Generate a comprehensive XP → XM Cloud Migration Assessment:

### 1. Executive Summary
- Migration complexity rating (Low / Medium / High / Very High) with justification
- Estimated duration range (sprints or months)
- Top 3 migration risks
- Recommended migration approach (Big Bang, Phased, Parallel Run)

### 2. Architecture Gap Analysis
| XP Capability | Current Implementation | XM Cloud Equivalent | Migration Effort | Notes |
|---------------|----------------------|---------------------|-----------------|-------|

Cover:
- Rendering engine (MVC → JSS/Next.js)
- Content delivery (CD servers → Edge/Vercel)
- Personalization (xDB rules → CDP/Personalize)
- Analytics (xDB → CDP + external analytics)
- Search (Solr/Coveo → Sitecore Search/Coveo)
- Forms (Sitecore Forms → headless form solution)
- Email (EXM → external ESP)
- Publishing (traditional → Edge publishing)

### 3. Component Migration Map
For every rendering/component in the current site:

| # | XP Rendering | Type | JSS Component | Migration Complexity | Data Source Changes | Notes |
|---|-------------|------|---------------|---------------------|--------------------|----|

Complexity ratings:
- 🟢 Direct port (markup + data, minimal changes)
- 🟡 Moderate (logic changes, API rewrites)
- 🔴 Rebuild (fundamental architecture change)
- ⚫ No equivalent (needs new solution or removal)

### 4. Content Migration Strategy
- Content tree mapping (XP items → XM Cloud items)
- Template migration (XP templates → XM Cloud templates)
- Media library migration approach
- Language version handling
- Workflow state migration
- Content serialization approach (Sitecore CLI, Unicorn → Sitecore CLI)

### 5. xDB/xConnect Replacement Plan
| xDB Feature | Current Usage | CDP/Personalize Replacement | Migration Approach |
|-------------|-------------|---------------------------|-------------------|

Cover:
- Contact profiles and facets
- Interaction tracking
- Campaign tracking
- Goals and outcomes
- Personalization rules
- A/B and multivariate testing
- Email engagement data

### 6. Integration Migration
| Integration | Current Approach | XM Cloud Approach | Breaking Changes |
|-------------|-----------------|-------------------|-----------------|

### 7. Custom Code Assessment
- Pipelines that need Edge middleware equivalents
- Custom providers that need API replacements
- Scheduled tasks that need external scheduling
- Custom indexes that need search service migration
- Glass Mapper or similar ORM migration to JSS SDK

### 8. Infrastructure & DevOps Migration
- Deployment pipeline changes (CI/CD for containerized builds)
- Environment strategy (dev, staging, production in XM Cloud)
- SSL and CDN configuration
- Monitoring and alerting migration
- Backup and disaster recovery changes

### 9. Sprint-by-Sprint Migration Plan
| Sprint | Focus | Components | Dependencies | Exit Criteria |
|--------|-------|-----------|-------------|---------------|

### 10. Risk Register
| Risk | Likelihood | Impact | Mitigation | Owner |
|------|-----------|--------|------------|-------|

### 11. Go-Live Checklist
- [ ] All components migrated and tested
- [ ] Content migration verified (page count, language versions)
- [ ] Redirects configured (old URLs → new URLs)
- [ ] Personalization rules recreated in CDP/Personalize
- [ ] Performance benchmarks met (Core Web Vitals)
- [ ] Analytics tracking verified
- [ ] Search index rebuilt and validated
- [ ] SSL certificates configured
- [ ] DNS cutover plan documented
- [ ] Rollback plan documented and tested
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/plan-xp-to-xm-cloud-migration/SKILL.md`:

```markdown
---
name: plan-xp-to-xm-cloud-migration
description: Produces a Sitecore XP-to-XM Cloud migration assessment with component mapping, xDB replacement plan, and sprint-by-sprint migration checklist. Use at the start of any XP→XM Cloud migration.
argument-hint: "[client name and current XP version]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Plan XP-to-XM Cloud Migration

You are a Sitecore architect who has led multiple XP-to-XM Cloud migrations and knows where they stall.

## Your Task

Produce a migration assessment for: **$ARGUMENTS**

## Process

### Step 1: Inventory the Current State
- Read solution files, project configs, and package references
- Search for Sitecore rendering definitions and component registrations
- Identify xDB/xConnect usage (contact facets, interaction tracking, personalization rules)
- Catalog integrations, pipelines, custom providers, and scheduled tasks
- Count content items, templates, and media library assets

### Step 2: Generate the Assessment
Produce:
1. Executive summary with complexity rating
2. Architecture gap analysis (XP feature → XM Cloud equivalent)
3. Component migration map (every rendering mapped)
4. Content migration strategy
5. xDB/xConnect replacement plan
6. Integration migration plan
7. Custom code assessment
8. Infrastructure & DevOps migration
9. Sprint-by-sprint plan
10. Risk register
11. Go-live checklist

### Quality Check
- Every XP rendering has a migration plan (port, rebuild, or remove)
- xDB features are mapped to CDP/Personalize equivalents
- Sprint plan has clear exit criteria per sprint
- Risk register has actionable mitigations
```

### Usage

```
/plan-xp-to-xm-cloud-migration Contoso Corp — Sitecore XP 10.3, 200 components, 15,000 content items, xDB personalization
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{CURRENT_ENVIRONMENT}}` | Current Sitecore version and hosting | `Sitecore XP 10.3 on Azure PaaS (4 CD, 1 CM), SQL Azure, Solr Cloud, Redis cache` |
| `{{SITECORE_MODULES}}` | Sitecore modules in use | `SXA, xDB with custom contact facets, EXM for email, Sitecore Forms, Sitecore Publishing Service, Coveo for search` |
| `{{CUSTOM_CODE_OVERVIEW}}` | Custom code landscape | `200 MVC renderings, 15 custom pipelines, Glass Mapper ORM, 8 custom xDB contact facets, 3 scheduled tasks, custom sitemap generator` |
| `{{CONTENT_VOLUME}}` | Content scale | `15,000 content items, 4 language versions (EN, FR, DE, ES), 8,000 media items, 50 content templates, 30 rendering templates` |
| `{{INTEGRATION_LANDSCAPE}}` | External system integrations | `Salesforce CRM (contact sync), Akeneo PIM (product data), Azure AD (SSO), Google Analytics (tracking), Marketo (marketing automation)` |

## Best Practices

- **Model choice:** Use Opus 4 — migration planning requires deep reasoning about architectural tradeoffs and dependency chains.
- **Provide the actual component list:** Export your rendering definitions from Sitecore. The more concrete the inventory, the more accurate the migration map.
- **Don't assume 1:1 mapping:** Some XP patterns (server-side personalization, complex pipeline customizations) have fundamentally different solutions in XM Cloud. Plan for rebuilds, not just ports.
- **Plan content migration early:** Content migration is often the longest-running workstream. Start the mapping exercise in sprint 1.

## Related Skills

- [Audit Sitecore XP Config](/technologies/sitecore/xp/audit-sitecore-xp-config/) — Audit the current XP configuration before migration planning
- [Configure XM Cloud Component](/technologies/sitecore/xm-cloud/configure-xm-cloud-component/) — Build the XM Cloud components that replace XP renderings
- [Scaffold JSS Component](/technologies/sitecore/headless-jss/scaffold-jss-component/) — Scaffold the JSS/Next.js components for the target architecture
