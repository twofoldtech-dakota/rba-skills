---
title: Troubleshoot Umbraco Issue
description: Structured diagnostic workflow for Umbraco v10+ issues with Examine index debugging, ModelsBuilder troubleshooting, Content Delivery API diagnostics, and routing problems
---

## Context & Goal

Umbraco debugging has its own patterns — Examine index corruption, ModelsBuilder generation failures, content routing conflicts, Content Delivery API serialization issues, and backoffice rendering problems. This skill takes symptoms and produces a structured troubleshooting workflow with Umbraco-specific diagnostics. Built from RBA's Gold Partner expertise, including insights from two of only 16 US Certified Masters.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Umbraco developer with Certified Master-level debugging expertise. You've diagnosed hundreds of Umbraco issues across v10, v12, and v13+ and know the platform's internals — Examine/Lucene indexing, ModelsBuilder code generation, content routing, published content cache, and the Content Delivery API. You quickly narrow symptoms to root causes.

Troubleshoot the following Umbraco issue:

**Environment:** {{ENVIRONMENT}}
**Umbraco Version:** {{UMBRACO_VERSION}}
**Symptom:**
{{SYMPTOM}}
**When it started:** {{WHEN_STARTED}}
**Recent changes:**
{{RECENT_CHANGES}}

Produce a Structured Diagnostic Workflow:

### 1. Symptom Classification
- Category: [Rendering / Content / Search / Performance / Backoffice / Routing / Deployment / API]
- Severity and scope assessment

### 2. Quick Checks (First 5 Minutes)
- [ ] Check Umbraco logs: `umbracoLog__*.json` in `/umbraco/Logs/`
- [ ] Health check dashboard: `/umbraco/#/settings/healthCheck`
- [ ] Runtime mode: verify Development vs Production
- [ ] Published content cache: is content stale?
- [ ] Examine index dashboard: `/umbraco/#/settings/examine`

### 3. Diagnostic Path by Category

**Rendering Issues:**
- Check ModelsBuilder mode (InMemoryAuto / SourceCodeManual)
- Verify model generation matches document types
- Check view compilation errors in logs
- Verify published content cache is current

**Examine/Search Issues:**
- Check index health in Examine dashboard
- Rebuild indexes from the backoffice
- Verify custom index configuration in `ConfigureExamine()`
- Check for Lucene lock files in `/umbraco/Data/TEMP/ExamineIndexes/`

**Content Delivery API Issues:**
- Verify API is enabled in `appsettings.json`
- Check property value converters for serialization errors
- Test endpoint: `GET /umbraco/delivery/api/v2/content`
- Verify content is published and public access is allowed

**Routing Issues:**
- Check URL segments and content finder registrations
- Verify domain assignments per culture
- Check for conflicting routes in custom controllers
- Test with `/umbraco/api/` vs custom routes

**ModelsBuilder Issues:**
- Regenerate models (Dashboard or CLI)
- Check for naming conflicts in document type aliases
- Verify namespace configuration
- Check for compilation errors in generated `.cs` files

### 4. Common Causes (Ranked by Likelihood)
| # | Cause | Likelihood | How to Verify | Resolution |
|---|-------|-----------|---------------|-----------|

### 5. Resolution Steps
[Step-by-step fix for the most likely cause with verification]

### 6. Prevention
[Monitoring, configuration, and process improvements]
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/troubleshoot-umbraco-issue/SKILL.md`:

```markdown
---
name: troubleshoot-umbraco-issue
description: Structured diagnostic workflow for Umbraco v10+ issues. Use when debugging content, search, rendering, backoffice, routing, or API problems.
argument-hint: "[symptom description]"
allowed-tools: Read, Glob, Grep, Bash(dotnet *), Bash(curl *)
---

# Troubleshoot Umbraco Issue

You are an Umbraco Certified Master-level developer who debugs platform issues efficiently.

## Your Task

Diagnose and troubleshoot: **$ARGUMENTS**

## Process

### Step 1: Classify and Quick Check
- Determine category and severity
- Check Umbraco logs, health check dashboard, Examine dashboard
- Identify recent changes

### Step 2: Run Platform Diagnostics
- Rendering: ModelsBuilder, view compilation, published cache
- Search: Examine indexes, Lucene lock files, custom searchers
- API: Content Delivery API config, property converters
- Routing: URL segments, content finders, domain assignments
- Backoffice: Angular errors, notification handlers, section config

### Step 3: Produce Resolution
1. Symptom classification
2. Quick checks
3. Diagnostic decision tree by category
4. Common causes ranked
5. Step-by-step resolution with verification
6. Prevention measures

### Quality Check
- Diagnostics reference specific Umbraco dashboard locations
- Resolution includes verification steps
- Prevention includes health check configuration
```

### Usage

```
/troubleshoot-umbraco-issue Content changes not appearing on the site — backoffice shows published but front-end shows old content
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ENVIRONMENT}}` | Environment | `Azure App Service (production)` or `Local development` |
| `{{UMBRACO_VERSION}}` | Version | `Umbraco 13.2.1 (.NET 8)` |
| `{{SYMPTOM}}` | What's happening | `Search returns no results after deploying new document type. Examine dashboard shows index is "unhealthy."` |
| `{{WHEN_STARTED}}` | Timeline | `After deploying the new "Case Study" document type this morning` |
| `{{RECENT_CHANGES}}` | Changes | `Added new document type with 8 properties, custom Examine index for case studies, new partial view` |

## Best Practices

- **Model choice:** Sonnet 4 for common issues. Opus 4 for intermittent or multi-factor problems.
- **Check the health dashboard first:** Umbraco's built-in health checks at `/umbraco/#/settings/healthCheck` catch most configuration issues.
- **Rebuild Examine indexes before deep-diving:** Index corruption is the most common Umbraco search issue. Rebuilding from the dashboard resolves it in 30 seconds.
- **Check ModelsBuilder mode:** InMemoryAuto (development) vs SourceCodeManual (production) behaves differently. Mismatched modes cause invisible rendering failures.

## Related Skills

- [Plan Umbraco Version Migration](/technologies/umbraco/v13-plus/plan-umbraco-version-migration/) — Many issues stem from incomplete migration — check the migration plan
- [Scaffold Umbraco Document Type](/technologies/umbraco/v13-plus/scaffold-umbraco-document-type/) — Properly scaffolded document types prevent common issues
