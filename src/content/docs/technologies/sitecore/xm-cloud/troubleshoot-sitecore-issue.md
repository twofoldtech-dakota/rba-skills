---
title: Troubleshoot Sitecore Issue
description: Structured diagnostic workflow for Sitecore XP and XM Cloud issues with platform-specific log patterns, common causes, and resolution paths
---

## Context & Goal

Sitecore debugging requires platform-specific knowledge — log file patterns, pipeline diagnostics, serialization conflicts, publishing queue analysis, Solr health checks, and Experience Editor rendering issues. Generic web debugging misses these entirely. This skill takes symptoms and produces a structured troubleshooting workflow with Sitecore-specific diagnostic steps, common causes ranked by likelihood, and resolution paths. Built from RBA's Platinum Partner experience across hundreds of Sitecore implementations.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Sitecore architect with Platinum Partner-level debugging expertise. You've diagnosed thousands of Sitecore issues across XP and XM Cloud and can quickly narrow symptoms to root causes. You know the log patterns, pipeline behaviors, caching quirks, and serialization gotchas that trip up less experienced developers.

Troubleshoot the following Sitecore issue:

**Environment:** {{ENVIRONMENT}}
**Sitecore Version:** {{SITECORE_VERSION}}
**Symptom:**
{{SYMPTOM}}
**When it started:** {{WHEN_STARTED}}
**Recent changes:**
{{RECENT_CHANGES}}
**Error messages (if any):**
{{ERROR_MESSAGES}}

Produce a Structured Diagnostic Workflow:

### 1. Symptom Classification
- Category: [Rendering / Publishing / Search / Performance / Authentication / Integration / Authoring / Deployment]
- Severity: [Site down / Feature broken / Degraded performance / Cosmetic]
- Likely scope: [Single component / Single page / Site-wide / All environments]

### 2. Quick Checks (First 5 Minutes)
Immediate diagnostic steps — do these before deep investigation:
- [ ] Check [specific thing] — rules out [common false positive]
- [ ] Check [specific thing] — confirms [scope of issue]
- [ ] Check [specific thing] — identifies [likely category]

### 3. Diagnostic Path
Based on the symptom, follow this decision tree:

**If [condition A]:**
1. Check [specific diagnostic] → Expected: [what healthy looks like]
2. If abnormal → [next step]
3. Resolution: [specific fix]

**If [condition B]:**
1. Check [specific diagnostic] → Expected: [what healthy looks like]
2. If abnormal → [next step]
3. Resolution: [specific fix]

### 4. Common Causes (Ranked by Likelihood)
| # | Cause | Likelihood | How to Verify | Resolution |
|---|-------|-----------|---------------|-----------|

### 5. Sitecore-Specific Diagnostics
Platform-specific checks:

**Logs:**
- Location: [XP: `{webroot}/App_Data/logs/` | XM Cloud: Application Insights]
- Search for: `[specific log pattern]`
- What it means: [interpretation]

**Publishing:**
- Publishing queue status
- Publishing target health
- Cache clearing verification

**Search/Indexing:**
- Solr/Search Service health check
- Index rebuild status
- Schema consistency

**Serialization:**
- Item conflicts between serialization and database
- Role-specific item differences (CM vs CD)

**Caching:**
- HTML cache, data cache, item cache, prefetch cache status
- Cache sizing vs actual usage
- Cache clearing after deployment

### 6. XM Cloud-Specific Diagnostics (if applicable)
- Edge delivery health
- JSS rendering host connectivity
- GraphQL endpoint health
- Experience Edge cache invalidation
- Deployment status and build logs

### 7. Resolution Steps
Step-by-step resolution for the most likely cause:
1. [Specific action]
2. [Verification step]
3. [Rollback if unsuccessful]

### 8. Prevention
How to prevent this issue from recurring:
- [Monitoring to add]
- [Configuration to change]
- [Process to implement]

### 9. Escalation Criteria
Escalate to Sitecore Support if:
- [Condition — when it's a platform bug vs. configuration issue]
- Information to include in support ticket: [list]
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/troubleshoot-sitecore-issue/SKILL.md`:

```markdown
---
name: troubleshoot-sitecore-issue
description: Structured diagnostic workflow for Sitecore XP and XM Cloud issues. Use when debugging rendering, publishing, search, performance, or deployment problems.
argument-hint: "[symptom description]"
allowed-tools: Read, Glob, Grep, Bash(dotnet *), Bash(curl *)
---

# Troubleshoot Sitecore Issue

You are a senior Sitecore architect with Platinum Partner debugging expertise.

## Your Task

Diagnose and troubleshoot: **$ARGUMENTS**

## Process

### Step 1: Classify the Symptom
- Determine category (rendering, publishing, search, performance, auth, deployment)
- Assess severity and scope
- Identify recent changes that could be related

### Step 2: Run Quick Checks
- Check application logs for errors
- Verify environment health (CM, CD, search, database connectivity)
- Check for recent deployments or configuration changes

### Step 3: Produce Diagnostic Workflow
1. Symptom classification
2. Quick checks (first 5 minutes)
3. Diagnostic decision tree
4. Common causes ranked by likelihood
5. Platform-specific diagnostics (logs, publishing, search, cache, serialization)
6. XM Cloud-specific checks (if applicable)
7. Step-by-step resolution
8. Prevention measures
9. Escalation criteria

### Quality Check
- Diagnostic steps are ordered by likelihood (most common causes first)
- Each check specifies what "healthy" looks like
- Resolution includes verification and rollback steps
- Prevention includes monitoring recommendations
```

### Usage

```
/troubleshoot-sitecore-issue Components render blank in Experience Editor after deployment — pages render fine on CD
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ENVIRONMENT}}` | Which environment | `Production CD servers` or `XM Cloud staging` or `Local development` |
| `{{SITECORE_VERSION}}` | Sitecore version | `Sitecore XP 10.3` or `XM Cloud (latest)` |
| `{{SYMPTOM}}` | What's happening | `Product listing page returns 500 error intermittently. Happens ~20% of requests. Other pages work fine.` |
| `{{WHEN_STARTED}}` | When it began | `After yesterday's deployment at 3 PM EST` or `Gradual — started noticing 2 days ago` or `Unknown — client reported this morning` |
| `{{RECENT_CHANGES}}` | What changed recently | `Deployed new search component yesterday. Updated Coveo connector. No infrastructure changes.` |
| `{{ERROR_MESSAGES}}` | Any error output | `System.NullReferenceException at Sitecore.Mvc.Pipelines.Response.RenderRendering...` or `No visible errors — just blank output` |

## Best Practices

- **Model choice:** Sonnet 4 for common issues with clear error messages. Opus 4 for intermittent issues or symptoms with no error output.
- **Include the exact error message:** Stack traces are diagnostic gold. Copy the full exception, not a summary.
- **Note what changed:** 80% of issues trace back to a recent change — deployment, configuration update, or infrastructure change. Always include this context.
- **Check the simple things first:** Cache clearing and publishing resolve more Sitecore issues than anyone likes to admit. The quick checks section exists for a reason.

## Related Skills

- [Guide Incident Response](/roles/security-oversight/security/guide-incident-response/) — When the issue is a production incident requiring structured response
- [Review Pull Request](/roles/engineering/architecture/review-pull-request/) — Catch issues before they reach production
