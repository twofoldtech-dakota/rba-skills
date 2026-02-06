---
title: Plan Episerver Migration
description: Create a migration plan from legacy Episerver to current Optimizely CMS including namespace changes, API updates, and content migration
---

## Context & Goal

Many RBA clients still run implementations branded as "Episerver" that need migrating to the current "Optimizely" platform. This is more than a rename — it involves .NET version upgrades, namespace changes across every file, deprecated API replacements, Commerce module restructuring, and potentially a shift to Optimizely's DXP hosting. Without a structured plan, teams discover breaking changes mid-migration and blow past deadlines. This skill produces a comprehensive migration plan covering every layer of the upgrade.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Optimizely/Episerver developer with deep expertise in platform migrations, .NET version upgrades, Episerver-to-Optimizely namespace changes, Commerce module migration, and content database migration. You have led multiple enterprise Episerver-to-Optimizely migration projects.

Create a detailed migration plan for the following Episerver implementation:

**Current Version:** {{CURRENT_VERSION}}

**Custom Code Summary:**
{{CUSTOM_CODE_SUMMARY}}

**Commerce Modules:** {{COMMERCE_MODULES}}
**Find/Search Usage:** {{FIND_USAGE}}
**Database Size:** {{DATABASE_SIZE}}
**Hosting Environment:** {{HOSTING_ENVIRONMENT}}

Produce the following migration plan:

### 1. Migration Assessment
- Current state inventory (Episerver version, .NET version, deployed modules)
- Target state definition (Optimizely version, .NET 8, hosting target)
- Scope assessment — what changes, what stays the same
- Feasibility and risk summary

### 2. Version-by-Version Upgrade Path
- Recommended stepping-stone versions (if direct upgrade is not supported)
- For each version hop: prerequisites, database changes, breaking changes
- Decision point: in-place upgrade vs. fresh installation with content migration

### 3. Namespace and Package Rename Inventory
Create a comprehensive mapping table:
| Old (EPiServer.*) | New (Optimizely.*) | Notes |
|-------------------|-------------------|-------|
Include all affected namespaces from:
- EPiServer.Core → Optimizely.Cms.Core
- EPiServer.Commerce → Optimizely.Commerce
- EPiServer.Find → Optimizely.Search
- EPiServer.Framework → Optimizely.Framework
- All sub-namespaces used in the project

### 4. Deprecated API Replacement Guide
For each deprecated API used in the codebase:
- Current usage pattern (code example)
- Replacement pattern (code example)
- Migration difficulty (simple rename, logic change, architectural change)

### 5. Commerce Module Migration
- Product catalog changes (API updates, property type changes)
- Order system migration (if applicable)
- Pricing and inventory API changes
- Payment and shipping provider updates
- Promotion system changes

### 6. Find → Search & Navigation Migration
- Index configuration changes
- Query API migration (EPiServer.Find client → Optimizely.Search)
- Unified search changes
- Custom conventions and projections migration
- Re-indexing strategy

### 7. Content Database Migration
- Schema update procedure
- Content migration scripts (if needed)
- Media and BLOB storage migration
- Scheduled job migration
- Visitor group and personalization data

### 8. .NET Version Upgrade Steps
- .NET Framework → .NET 6/8 migration changes
- project.json / packages.config → .csproj PackageReference migration
- Startup class changes (Global.asax → Program.cs/Startup.cs)
- Dependency injection container changes
- Configuration migration (web.config → appsettings.json)
- Middleware pipeline changes

### 9. Hosting Migration
- Current hosting assessment
- Target hosting options (self-hosted, Optimizely DXP, Azure PaaS)
- If moving to DXP: provisioning, deployment pipeline, environment setup
- DNS and SSL certificate migration
- CDN configuration

### 10. Testing Strategy
For each migration phase:
- Unit test updates and re-execution
- Integration testing (content delivery, commerce flows, search)
- Editor acceptance testing (content editing, publishing, previewing)
- Performance testing (response times, search performance)
- Security validation

### 11. Rollback Plan
- Database snapshot and restore procedure
- Code rollback to pre-migration branch
- Hosting rollback steps
- Clear identification of the point of no return

### 12. Timeline Estimate
- Phase-by-phase effort breakdown
- Parallel work streams
- Critical path and dependencies
- Resource requirements by role (backend dev, frontend dev, QA, content editors)

Be specific to the Episerver version and modules involved. Reference actual namespace changes and API replacements, not generic migration advice.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/plan-episerver-migration/SKILL.md`:

```markdown
---
name: plan-episerver-migration
description: Generates a migration plan from legacy Episerver to current Optimizely CMS. Use when planning Episerver-to-Optimizely migrations, assessing upgrade feasibility, or scoping migration projects.
argument-hint: "[current Episerver version and project details]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Plan Episerver Migration

You are a senior Optimizely/Episerver developer with deep expertise in platform migrations, namespace changes, and .NET version upgrades.

## Your Task

Create a migration plan for: **$ARGUMENTS**

## Process

### Step 1: Assess Current State
- Search the codebase for EPiServer.* namespace imports to inventory affected files
- Check .csproj or packages.config for Episerver NuGet package versions
- Identify Commerce, Find, and other module usage
- Scan for deprecated API calls
- Check the .NET version and hosting configuration

### Step 2: Research Migration Path
- Use WebSearch to verify the latest Optimizely migration documentation
- Check for version-specific migration guides
- Research package rename mappings for the specific version
- Identify any known migration blockers

### Step 3: Generate Plan
Produce the complete migration plan covering:
1. Migration assessment
2. Version-by-version upgrade path
3. Namespace/package rename inventory
4. Deprecated API replacement guide
5. Commerce module migration (if applicable)
6. Find → Search & Navigation migration (if applicable)
7. Content database migration
8. .NET version upgrade steps
9. Hosting migration
10. Testing strategy
11. Rollback plan
12. Timeline estimate

### Step 4: Quality Check
- Namespace mappings are complete for all EPiServer.* imports found in the codebase
- Deprecated API replacements include before/after code examples
- Timeline includes realistic effort ranges based on codebase size
- Commerce and Find sections are included only if those modules are in use
```

### Usage

```
/plan-episerver-migration Episerver CMS 11.20 with Commerce 13.x and Find 13.x on .NET Framework 4.8
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CURRENT_VERSION}}` | Current Episerver version with all modules | `Episerver CMS 11.20, Commerce 13.31, Find 13.3 on .NET Framework 4.8` |
| `{{CUSTOM_CODE_SUMMARY}}` | Overview of custom development | `40 page types, 25 block types, 10 custom controllers, 3 scheduled jobs, custom order processing pipeline, personalization visitor groups` |
| `{{COMMERCE_MODULES}}` | Commerce modules in use | `Product catalog, checkout, order management, Klarna payment provider, custom shipping calculator` |
| `{{FIND_USAGE}}` | How Episerver Find is used | `Unified search with 3 custom conventions, product search with facets, autocomplete endpoint` |
| `{{DATABASE_SIZE}}` | Database size and characteristics | `Content DB: 8 GB, Commerce DB: 15 GB, 3 custom tables, 200K order records` |
| `{{HOSTING_ENVIRONMENT}}` | Current hosting setup | `Azure App Service, Azure SQL, Azure Blob Storage, custom deployment via Azure DevOps` |

## Best Practices

- **Model choice:** Use Opus 4 for migration planning. The namespace mapping, deprecated API analysis, and multi-module migration sequencing require deep reasoning. Sonnet 4 can handle simpler CMS-only migrations without Commerce or Find.
- **Run a namespace scan first:** Before writing the prompt, run `grep -r "EPiServer" --include="*.cs" | wc -l` on your codebase to quantify the scope. Include this count in your summary.
- **Be explicit about modules:** Commerce and Find migrations are the most complex parts. If you use them, describe exactly which features (catalog, orders, checkout, faceted search, etc.).
- **Consider hosting early:** Moving to Optimizely DXP changes the deployment model fundamentally. Decide on hosting target before starting the code migration.
- **Plan for editor training:** The backoffice UI changes between versions. Budget time for editor re-training even though the migration plan focuses on technical changes.

## Related Skills

- [Plan Umbraco Upgrade Path](/technologies/umbraco/v7-v8-legacy/plan-umbraco-upgrade/) — Similar upgrade planning methodology for Umbraco projects
- [Generate Test Plan](/roles/engineering/testing-qa/generate-test-plan/) — Build detailed test plans for each migration phase
