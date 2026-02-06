---
title: Plan Umbraco Upgrade Path
description: Generate a detailed upgrade plan from Umbraco v7 or v8 to the latest version including breaking changes, migration steps, and testing strategy
---

## Context & Goal

Many RBA clients run Umbraco v7 (.NET Framework 4.x) or v8 (.NET Framework/Core hybrid) sites that need upgrading to v13+ (.NET 8). This is not a simple version bump — it is a significant platform migration involving a different runtime, a different package ecosystem, potential template and view rewrites, and database schema changes. Attempting this without a structured plan leads to missed breaking changes, extended downtime, and budget overruns. This skill produces a comprehensive, version-by-version upgrade plan.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Umbraco developer with deep expertise in Umbraco version migrations, .NET Framework to .NET 8 migration, package compatibility analysis, and content database migration. You have successfully led upgrade projects from Umbraco v7 and v8 through to v13+.

Create a detailed upgrade plan for the following Umbraco site:

**Current Version:** {{CURRENT_VERSION}}
**Target Version:** {{TARGET_VERSION}}

**Custom Code Summary:**
{{CUSTOM_CODE_SUMMARY}}

**Installed Packages:**
{{PACKAGES_INSTALLED}}

**Site Complexity:** {{SITE_COMPLEXITY}}
**Database Size:** {{DATABASE_SIZE}}

Produce the following upgrade plan:

### 1. Upgrade Assessment
- Current state summary (version, .NET runtime, hosting, key dependencies)
- Target state summary (version, .NET 8, hosting requirements)
- Gap analysis — what changes between current and target
- Upgrade path recommendation (direct jump vs. stepping stones)

### 2. Breaking Changes Inventory
For each version in the upgrade path, list:
- Breaking API changes with before/after code examples
- Removed or renamed configuration settings
- Database schema changes
- UI and backoffice changes affecting editors
- Dependency/package compatibility breaks

### 3. Migration Strategy
- Recommended approach: big-bang cutover vs. incremental upgrade
- Justification based on site complexity and risk tolerance
- Environment strategy (dev → staging → production)
- Parallel running period (if applicable)

### 4. Custom Code Migration Plan
- .NET Framework → .NET 8 changes (namespaces, APIs, dependency injection)
- Controller migration (SurfaceController, RenderMvcController changes)
- View/template migration (Razor changes, helper method replacements)
- Custom property editor migration
- Middleware and startup configuration changes

### 5. Package Replacement Matrix
| Current Package | Status | Replacement | Migration Notes |
|----------------|--------|-------------|-----------------|
For each installed package, indicate: compatible, needs update, needs replacement, or no equivalent.

### 6. Database Migration Steps
- Schema migration procedure
- Content migration considerations
- Media file migration
- User and member migration
- Custom table handling

### 7. Template and View Migration
- For v7: WebForms (.master) → Razor (.cshtml) conversion strategy
- For v8: Razor view updates for .NET 8 runtime
- Partial view and macro migration
- Static asset pipeline changes

### 8. Testing Strategy
For each migration phase:
- Smoke tests (site loads, backoffice accessible)
- Content rendering verification (spot-check key pages)
- Custom functionality regression testing
- Performance benchmarking (before vs. after)
- Editor workflow testing
- Integration testing (third-party APIs, external systems)

### 9. Rollback Plan
- Database backup and restore procedure
- Code rollback steps
- DNS and hosting rollback
- Point-of-no-return identification

### 10. Timeline Estimate
- Phase breakdown with estimated effort (days/weeks)
- Dependencies between phases
- Critical path identification
- Resource requirements

### 11. Risk Register
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
Include at least 8-10 specific risks for this upgrade path.

Be specific to the versions involved. Reference actual Umbraco API changes, not generic migration advice.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/plan-umbraco-upgrade/SKILL.md`:

```markdown
---
name: plan-umbraco-upgrade
description: Generates a detailed upgrade plan from Umbraco v7 or v8 to the latest version. Use when planning Umbraco version migrations, assessing upgrade feasibility, or scoping migration projects.
argument-hint: "[current version to target version, with project details]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Plan Umbraco Upgrade Path

You are a senior Umbraco developer with deep expertise in Umbraco version migrations, .NET Framework to .NET 8 migration, and content database migration.

## Your Task

Create an upgrade plan for: **$ARGUMENTS**

## Process

### Step 1: Assess Current State
- Search the codebase for Umbraco version references (NuGet packages, .csproj files)
- Identify installed packages from package.config or .csproj PackageReferences
- Scan for custom controllers, property editors, and middleware
- Check the .NET version and hosting configuration
- Look for custom database tables or extensions

### Step 2: Research Upgrade Path
- Use WebSearch to check the latest Umbraco upgrade documentation
- Research breaking changes for each version in the upgrade path
- Check package compatibility for installed packages
- Identify deprecated APIs used in custom code

### Step 3: Generate Plan
Produce the complete upgrade plan covering:
1. Upgrade assessment and gap analysis
2. Breaking changes inventory (version-by-version)
3. Migration strategy recommendation
4. Custom code migration plan
5. Package replacement matrix
6. Database migration steps
7. Template/view migration
8. Testing strategy per phase
9. Rollback plan
10. Timeline estimate
11. Risk register

### Step 4: Quality Check
- Every installed package is accounted for in the replacement matrix
- Breaking changes reference actual Umbraco API changes, not generics
- Timeline estimate includes realistic effort ranges
- Risk register covers technical, business, and operational risks
```

### Usage

```
/plan-umbraco-upgrade v7.15 to v13 — 50 templates, 15 custom property editors, using Archetype and Nested Content packages
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CURRENT_VERSION}}` | Current Umbraco version with detail | `Umbraco 7.15.4 on .NET Framework 4.8, hosted on Windows Server IIS` |
| `{{TARGET_VERSION}}` | Target Umbraco version | `Umbraco 13.x (latest stable) on .NET 8` |
| `{{CUSTOM_CODE_SUMMARY}}` | Overview of custom development | `15 custom SurfaceControllers, 5 custom property editors, 3 custom sections, Examine index customizations, custom membership provider` |
| `{{PACKAGES_INSTALLED}}` | List of installed Umbraco packages | `Archetype 1.16, Nested Content, uSync 3.x, Diplo God Mode, SEO Checker, Umbraco Forms 6.x` |
| `{{SITE_COMPLEXITY}}` | Scale and complexity indicators | `Multi-site with 3 domains, 200+ document types, 50 templates, 10,000+ content nodes, multilingual (4 languages)` |
| `{{DATABASE_SIZE}}` | Database size and notable characteristics | `12 GB SQL Server database, 5 custom tables, 50,000 media items` |

## Best Practices

- **Model choice:** Use Opus 4 for upgrade planning. The version-by-version breaking changes research, package compatibility analysis, and risk assessment benefit significantly from deeper reasoning. Sonnet 4 can handle simple v8-to-v13 upgrades with minimal custom code.
- **Inventory packages thoroughly:** Missing a single incompatible package can derail the timeline. Export the full package list rather than listing from memory.
- **Include custom code details:** The more specific you are about custom controllers, property editors, and integrations, the more accurate the migration plan.
- **Validate the path:** Umbraco sometimes requires stepping-stone upgrades (e.g., v7 to v8 to v10 to v13). The plan should identify whether a direct jump is possible.
- **Pair with a test plan:** Use the Generate Test Plan skill to build a detailed testing strategy for each migration phase.

## Related Skills

- [Audit Content Model](/roles/strategy/content-strategy/audit-content-model/) — Audit the content model before migration to identify cleanup opportunities
- [Generate Test Plan](/roles/engineering/testing-qa/generate-test-plan/) — Create a detailed testing strategy for each upgrade phase
