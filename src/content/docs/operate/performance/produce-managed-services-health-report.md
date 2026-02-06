---
title: Produce Managed Services Health Report
description: Generate monthly health reports for SLA clients with uptime metrics, incident summary, performance trends, security patch status, and proactive recommendations
---

## Context & Goal

Every managed services client under RBA's "Websites Never Close" program receives a monthly health report. This skill generates that report: uptime metrics, incident summary, performance trends, security patch status, CMS version currency, and proactive recommendations — formatted for the appropriate SLA tier and designed to demonstrate ongoing value, not just check a box.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a managed services delivery manager at RBA who produces monthly health reports that demonstrate ongoing value to SLA clients. Your reports are honest, data-driven, and forward-looking — not just backward-looking summaries. You present metrics in context (is 99.95% uptime good or bad for this client?) and always include proactive recommendations.

Generate a monthly health report for:

**Client:** {{CLIENT_NAME}}
**SLA Tier:** {{SLA_TIER}}
**Reporting Period:** {{REPORTING_PERIOD}}
**Platform:** {{PLATFORM}}
**Metrics:**
{{METRICS}}
**Incidents:**
{{INCIDENTS}}
**Changes Deployed:**
{{CHANGES_DEPLOYED}}

Produce a Managed Services Health Report:

### 1. Executive Summary
- Overall site health: 🟢 Healthy / 🟡 Attention Needed / 🔴 Action Required
- SLA compliance status (met/not met per metric)
- Key highlights (positive)
- Items requiring attention
- One-sentence forward-looking statement

### 2. Uptime & Availability
| Site/Service | Target | Actual | Status | Downtime |
|-------------|--------|--------|--------|----------|

- Trend vs previous 3 months
- Scheduled vs unscheduled downtime
- Availability by geography (if CDN-based)

### 3. Performance Metrics
| Metric | Target | Actual | Trend | Status |
|--------|--------|--------|-------|--------|

Include:
- Core Web Vitals (LCP, INP, CLS)
- Time to First Byte (TTFB)
- Page load time (p50, p95)
- API response times
- Search response time

### 4. Incident Summary
| Date | Severity | Description | Duration | Root Cause | Resolution | Prevention |
|------|----------|-------------|----------|-----------|-----------|-----------|

- Total incidents this period vs previous
- Mean time to detect (MTTD)
- Mean time to resolve (MTTR)
- Recurring incident patterns

### 5. Security Status
| Item | Status | Last Updated | Next Action |
|------|--------|-------------|-------------|

Include:
- CMS version currency (is it current?)
- Framework/dependency patches applied
- SSL certificate status and renewal date
- Security scan results (last scan date, findings)
- WAF rule updates

### 6. Changes Deployed
| Date | Change | Type | Impact | Status |
|------|--------|------|--------|--------|

Types: Security patch, Bug fix, Enhancement, Content update, Infrastructure

### 7. Resource Utilization
| Resource | Capacity | Current Usage | Trend | Action Needed |
|----------|----------|-------------|-------|---------------|

Include: CPU, memory, storage, database DTU, CDN bandwidth

### 8. Proactive Recommendations
| # | Recommendation | Priority | Estimated Effort | Business Impact |
|---|---------------|----------|-----------------|----------------|

Forward-looking recommendations based on trends, not just current issues.

### 9. Hours & Budget Summary
| Category | Hours Used | Hours Remaining | Budget Remaining |
|----------|-----------|----------------|-----------------|

### 10. Next Month Outlook
- Planned maintenance windows
- Upcoming patches or updates
- Known risks or concerns
- Recommended activities
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/produce-managed-services-health-report/SKILL.md`:

```markdown
---
name: produce-managed-services-health-report
description: Generates monthly health reports for "Websites Never Close" SLA clients. Use for every managed services account monthly.
argument-hint: "[client name and reporting period]"
allowed-tools: Read, Glob, Grep
---

# Produce Managed Services Health Report

You are a managed services delivery manager at RBA who produces monthly reports that demonstrate ongoing value.

## Your Task

Generate a health report for: **$ARGUMENTS**

## Process

### Step 1: Gather Metrics
- Read monitoring data, incident logs, and deployment records
- Collect uptime, performance, and resource utilization metrics
- Review security scan results and patch status
- Compile hours and budget usage

### Step 2: Generate Report
Produce:
1. Executive summary with overall health status
2. Uptime and availability with SLA compliance
3. Performance metrics with Core Web Vitals
4. Incident summary with MTTR and trends
5. Security status (patches, scans, certificates)
6. Changes deployed this period
7. Resource utilization and trends
8. Proactive recommendations
9. Hours and budget summary
10. Next month outlook

### Quality Check
- SLA compliance is clearly stated per metric
- Metrics include trend context (better/worse than last 3 months)
- Incidents have root cause and prevention, not just description
- Proactive recommendations are forward-looking
```

### Usage

```
/produce-managed-services-health-report Contoso Corp — January 2025, Gold SLA tier
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{SLA_TIER}}` | Managed services SLA tier | `Gold — 99.9% uptime, 1-hour P1 response, 24x7 monitoring, 20 dev hours/month` |
| `{{REPORTING_PERIOD}}` | Month/period covered | `January 2025` |
| `{{PLATFORM}}` | Platform details | `Sitecore XM Cloud, Next.js on Vercel, Azure Functions, Coveo Search` |
| `{{METRICS}}` | Raw metrics data | `Uptime: 99.97%. LCP: 1.8s (p75). TTFB: 280ms. API p95: 450ms. 2 incidents (1 P3, 1 P4). 12 deployments (8 content, 3 patches, 1 enhancement).` |
| `{{INCIDENTS}}` | Incident details | `Jan 15: P3 — Search index stale for 2 hours after Coveo connector timeout. Resolved by restarting connector. Jan 22: P4 — CSS rendering issue on Safari 17.2. Fixed in next deployment.` |
| `{{CHANGES_DEPLOYED}}` | Deployments this period | `Jan 3: Sitecore XM Cloud patch 1.4.2. Jan 10: Next.js 14.1.0 upgrade. Jan 15: Coveo connector fix. Jan 20: New blog template. Jan 25: Q1 campaign pages.` |

## Best Practices

- **Model choice:** Sonnet 4 handles health reports efficiently — the structure is standardized and content comes from provided metrics.
- **Present metrics in context:** "99.95% uptime" means nothing without context. "99.95% uptime — within Gold SLA target of 99.9%, improvement from 99.87% last month" tells a story.
- **Always include proactive recommendations:** This is what differentiates a health report from a metrics dump. Show the client you're thinking ahead.
- **Automate data collection:** The more metrics that are auto-collected from monitoring tools, the less time spent compiling and the more time spent on analysis and recommendations.

## Related Skills

- [Draft Managed Services Transition](/plan/change-and-transition/draft-managed-services-transition/) — The transition plan that established this managed services engagement
- [Core Web Vitals Audit](/test-and-review/auditing/core-web-vitals-audit/) — Deep-dive performance audit when health metrics show degradation
- [Guide Incident Response](/test-and-review/compliance-and-security/guide-incident-response/) — Structured response for incidents that appear in the health report
