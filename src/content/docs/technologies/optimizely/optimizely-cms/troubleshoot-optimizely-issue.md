---
title: Troubleshoot Optimizely Issue
description: Structured diagnostic workflow for Optimizely CMS 12+ issues with content loader caching, scheduled job failures, Commerce catalog sync, and Content Graph debugging
---

## Context & Goal

Optimizely CMS debugging requires understanding the content loader cache, scheduled job system, Commerce event pipeline, Content Graph sync, and visitor group evaluation. This skill takes symptoms and produces an Optimizely-specific diagnostic workflow with common causes, resolution paths, and prevention strategies.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Optimizely developer who debugs CMS 12+ issues efficiently. You understand the content loader pipeline, scheduled job system, Commerce catalog synchronization, Content Graph delivery, and the experimentation engine. You quickly narrow symptoms to root causes.

Troubleshoot the following Optimizely issue:

**Environment:** {{ENVIRONMENT}}
**Optimizely Version:** {{OPTIMIZELY_VERSION}}
**Symptom:**
{{SYMPTOM}}
**When it started:** {{WHEN_STARTED}}
**Recent changes:**
{{RECENT_CHANGES}}

Produce a Structured Diagnostic Workflow:

### 1. Symptom Classification
- Category: [Content / Commerce / Search / Experimentation / Scheduled Jobs / Content Graph / Performance / Deployment]

### 2. Quick Checks (First 5 Minutes)
- [ ] Check application logs in DXP Management Portal
- [ ] Verify scheduled jobs status: Admin → Scheduled Jobs
- [ ] Check content version status (published vs draft)
- [ ] Verify site definition and hostname bindings
- [ ] Test Content Graph endpoint (if headless)

### 3. Diagnostic Path by Category

**Content Issues:**
- Content loader cache behavior (IContentLoader vs IContentRepository)
- Published content version vs working copy
- Content provider configuration
- Access rights and visitor group evaluation
- Language branch and fallback settings

**Commerce Issues:**
- Catalog entry cache invalidation
- Price and inventory sync status
- Market and currency configuration
- Order workflow state transitions
- Payment gateway connectivity

**Content Graph / Headless:**
- Sync status: DXP → Content Graph
- Schema validation (missing/renamed properties)
- Webhook delivery status
- GraphQL query performance
- Cache invalidation timing

**Experimentation Issues:**
- Snippet installation verification
- Project and experiment activation status
- Audience targeting evaluation
- Traffic allocation configuration
- Results data pipeline health

**Scheduled Job Failures:**
- Job execution history in Admin
- Timeout configuration
- Dependency availability (DB, external APIs)
- Concurrent job execution conflicts

### 4. Common Causes (Ranked by Likelihood)
| # | Cause | Likelihood | How to Verify | Resolution |
|---|-------|-----------|---------------|-----------|

### 5. Resolution and Prevention
[Step-by-step fix with verification and preventive measures]
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/troubleshoot-optimizely-issue/SKILL.md`:

```markdown
---
name: troubleshoot-optimizely-issue
description: Structured diagnostic workflow for Optimizely CMS 12+ issues. Use when debugging content, commerce, experimentation, Content Graph, or scheduled job problems.
argument-hint: "[symptom description]"
allowed-tools: Read, Glob, Grep, Bash(dotnet *), Bash(curl *)
---

# Troubleshoot Optimizely Issue

You are a senior Optimizely developer who diagnoses CMS, Commerce, and Content Graph issues efficiently.

## Your Task

Diagnose and troubleshoot: **$ARGUMENTS**

## Process

### Step 1: Classify and Quick Check
- Determine category and severity
- Check DXP Management Portal logs, scheduled jobs, content status
- Identify recent changes

### Step 2: Run Diagnostics
By category: Content loader, Commerce sync, Content Graph, Experimentation, Scheduled jobs

### Step 3: Produce Resolution
Common causes ranked, step-by-step fix, verification, prevention

### Quality Check
- Diagnostics reference Optimizely Admin/DXP portal locations
- Resolution includes cache invalidation steps (most common fix)
- Prevention includes monitoring recommendations
```

### Usage

```
/troubleshoot-optimizely-issue Content Graph not syncing — new content types not appearing in GraphQL schema
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ENVIRONMENT}}` | Environment | `DXP Integration` or `DXP Production` or `Local development` |
| `{{OPTIMIZELY_VERSION}}` | Version | `Optimizely CMS 12.24, Commerce 14.x` |
| `{{SYMPTOM}}` | What's happening | `Commerce prices showing stale data. Catalog entries updated 2 hours ago but storefront shows old prices.` |
| `{{WHEN_STARTED}}` | Timeline | `Since the scheduled price sync job started failing yesterday` |
| `{{RECENT_CHANGES}}` | Changes | `Updated price import scheduled job to handle new currency (EUR). No other changes.` |

## Best Practices

- **Model choice:** Sonnet 4 for common issues. Opus 4 for Commerce pipeline or Content Graph sync problems.
- **Check scheduled jobs first:** Many Optimizely issues trace back to a failed or hung scheduled job. Check Admin → Scheduled Jobs before deep-diving.
- **Content loader caching causes most "stale content" issues:** Understand the difference between `IContentLoader` (cached) and `IContentRepository` (uncached). Most "content not updating" issues are cache-related.
- **Content Graph has a sync delay:** Content Graph updates are not instant. Allow 1-2 minutes for sync before investigating a "missing content" report.

## Related Skills

- [Scaffold Optimizely Page Type](/technologies/optimizely/optimizely-cms/scaffold-optimizely-page-type/) — Properly scaffolded types prevent common issues
- [Plan Episerver Migration](/technologies/optimizely/episerver-legacy/plan-episerver-migration/) — Many issues stem from incomplete migration patterns
