---
title: Plan Umbraco Version Migration
description: Plan Umbraco version migrations with breaking change analysis, dependency audit, .NET upgrade path, and test coverage requirements from Certified Master expertise
---

## Context & Goal

Umbraco version migrations — especially v8→v10→v13+ — involve more than running an upgrade wizard. The .NET Framework to .NET Core transition, Examine/Lucene search changes, package ecosystem shifts, and breaking API changes require careful planning. This skill produces migration plans informed by RBA's Certified Master expertise: breaking change analysis, dependency audit, search migration, .NET upgrade path, and test coverage requirements.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Umbraco developer with Certified Master-level expertise. You've migrated dozens of Umbraco sites across major version boundaries (v7→v8, v8→v10, v10→v13) and understand the breaking changes, deprecated APIs, and migration gotchas at each boundary. You know the difference between "officially supported" migration paths and what actually works in production.

Plan a version migration for:

**Client:** {{CLIENT_NAME}}
**Current Version:** {{CURRENT_VERSION}}
**Target Version:** {{TARGET_VERSION}}
**Site Profile:**
{{SITE_PROFILE}}
**Custom Code:**
{{CUSTOM_CODE}}
**Packages:**
{{PACKAGES}}
**Hosting:** {{HOSTING}}

Produce an Umbraco Migration Plan:

### 1. Executive Summary
- Migration complexity (Low / Medium / High / Very High)
- Estimated effort in developer-days
- Recommended approach (direct upgrade, stepping stones, rebuild)
- Top 3 risks

### 2. Migration Path
Recommended version stepping stones (not all versions can be skipped):
```
Current ({{CURRENT_VERSION}}) → v? → v? → Target ({{TARGET_VERSION}})
```
Justification for each intermediate step.

### 3. .NET Framework / .NET Upgrade
| Aspect | Current | Target | Migration Steps |
|--------|---------|--------|----------------|
| .NET version | ... | ... | ... |
| Project format | ... | ... | ... |
| Dependency injection | ... | ... | ... |
| Configuration | ... | ... | ... |
| Middleware pipeline | ... | ... | ... |

### 4. Breaking Change Analysis
| Breaking Change | Affected Code | Severity | Migration Path |
|----------------|---------------|----------|---------------|

Organize by:
- Core API changes (ContentService, MediaService, MemberService)
- Razor view changes (syntax, helpers, tag helpers)
- Backoffice customizations (AngularJS → Lit in v14+)
- Route and controller changes
- Configuration changes (web.config → appsettings.json)

### 5. Package Compatibility Audit
| Package | Current Version | Target Compatible? | Alternative | Notes |
|---------|----------------|-------------------|-------------|-------|

For each incompatible package:
- Is there an updated version?
- Is there a compatible alternative?
- Does the functionality need to be rebuilt custom?

### 6. Search Migration (Examine / Lucene)
- Current search configuration
- Index migration approach
- Custom searcher migration
- External search (Azure Search / Elasticsearch) migration if applicable

### 7. Content Migration
- Content node migration approach
- Document type changes needed
- Media migration (file system → blob storage if applicable)
- Member migration
- Dictionary items and translations

### 8. Custom Code Migration Checklist
For each custom component:
- [ ] Controllers (Surface, API, Render)
- [ ] Composers and components
- [ ] Content finders and URL providers
- [ ] Notification handlers (replacing events)
- [ ] Custom dashboards
- [ ] Custom sections
- [ ] Custom trees
- [ ] Scheduled tasks
- [ ] Custom middleware

### 9. Testing Strategy
- Automated test migration (framework changes)
- Content regression testing (every template renders correctly)
- Form and workflow testing
- Integration testing (APIs, third-party services)
- Performance benchmarking (before vs after)
- Accessibility regression testing

### 10. Sprint Plan
| Sprint | Focus | Tasks | Exit Criteria |
|--------|-------|-------|---------------|

### 11. Rollback Plan
- How to rollback if migration fails at each stage
- Database backup and restore procedure
- DNS failover if running parallel
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/plan-umbraco-version-migration/SKILL.md`:

```markdown
---
name: plan-umbraco-version-migration
description: Plans Umbraco version migrations with breaking change analysis, package audit, and .NET upgrade path. Use at the start of any Umbraco upgrade project.
argument-hint: "[current version → target version]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Plan Umbraco Version Migration

You are an Umbraco Certified Master who has migrated dozens of sites across major version boundaries.

## Your Task

Plan a migration for: **$ARGUMENTS**

## Process

### Step 1: Inventory Current State
- Read project files to determine exact Umbraco version and packages
- Search for custom code patterns (controllers, composers, event handlers)
- Identify Examine/Lucene search configuration
- Check .NET version and project format

### Step 2: Generate Migration Plan
Produce:
1. Executive summary with complexity rating
2. Migration path with stepping stones
3. .NET upgrade plan
4. Breaking change analysis with affected code
5. Package compatibility audit
6. Search migration plan
7. Content migration approach
8. Custom code migration checklist
9. Testing strategy
10. Sprint plan
11. Rollback plan

### Quality Check
- Migration path follows supported upgrade routes
- Breaking changes reference specific code locations
- Package audit includes alternatives for incompatible packages
- Sprint plan has clear exit criteria per sprint
```

### Usage

```
/plan-umbraco-version-migration Contoso — Umbraco 8.18 → Umbraco 13, 50 document types, 12 custom packages
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{CURRENT_VERSION}}` | Current Umbraco version | `Umbraco 8.18.13 (.NET Framework 4.8)` |
| `{{TARGET_VERSION}}` | Target Umbraco version | `Umbraco 13 LTS (.NET 8)` |
| `{{SITE_PROFILE}}` | Site scope | `Corporate site, 200 pages, 50 document types, 30 templates, 5 language variants, 15 content editors` |
| `{{CUSTOM_CODE}}` | Custom development | `12 surface controllers, 8 API controllers, custom URL provider, custom sitemap generator, 4 Examine indexes with custom searchers, notification handler for content publishing` |
| `{{PACKAGES}}` | Installed packages | `uSync, Articulate (blog), SEOChecker, Our.Umbraco.GMaps, Terratype, Slimsy (image cropping), uMarkdownEditor` |
| `{{HOSTING}}` | Current hosting | `Azure App Service (Windows), Azure SQL, Azure Blob Storage for media` |

## Best Practices

- **Model choice:** Use Opus 4 — migration planning requires deep knowledge of version-specific breaking changes and their interactions.
- **Export the package list:** Don't list packages from memory. Export from the backoffice or `packages.config` / `.csproj` to ensure completeness.
- **Don't skip stepping stones:** v8→v13 requires going through v10 first. Skipping intermediate versions leads to silent data corruption.
- **Budget 30% extra for surprises:** Every migration uncovers custom code that nobody remembers writing. Budget accordingly.

## Related Skills

- [Plan Umbraco Upgrade](/plan/change-and-transition/plan-umbraco-upgrade/) — For legacy v7→v8 upgrade planning
- [Scaffold Umbraco Document Type](/build/component-development/scaffold-umbraco-document-type/) — Build v13+ document types after migration
