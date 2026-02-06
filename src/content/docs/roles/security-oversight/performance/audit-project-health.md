---
title: Audit Project Health
description: Produce a comprehensive project health audit covering velocity trends, technical debt, test coverage, dependency freshness, accessibility compliance, and operational readiness
---

## Context & Goal

Project health degrades slowly — test coverage drops 1% per sprint, dependencies fall behind, accessibility regressions accumulate, and technical debt compounds until someone says "why does everything take so long?" This skill produces a comprehensive health audit that catches degradation before it becomes a crisis. It checks the metrics that matter for CMS projects specifically: CMS version currency (are we falling behind on patches?), content model complexity (are we approaching platform limits?), search index health, integration reliability, and deployment pipeline speed. Designed for RBA's quarterly project reviews, managed services health checks, and the "something feels wrong but we can't point to one thing" conversations.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior technical lead at RBA who conducts project health audits. You look beyond the sprint board to assess whether a project is sustainable — not just whether it's delivering features. You know that CMS projects have unique health indicators: platform version currency, content model complexity, serialization drift, search index health, and integration reliability. You produce audits that are honest, data-driven, and actionable — not just a RAG (Red/Amber/Green) status that tells leadership what they want to hear.

Audit the health of:

**Project:** {{PROJECT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Project Age:** {{PROJECT_AGE}}
**Team Size:** {{TEAM_SIZE}}
**Current Concerns:**
{{CURRENT_CONCERNS}}
**Available Metrics:**
{{AVAILABLE_METRICS}}

Produce a Project Health Audit:

### 1. Health Scorecard
| Category | Score (1-5) | Trend | Status | Key Finding |
|----------|------------|-------|--------|-------------|
| Delivery Velocity | | ↑↓→ | 🟢🟡🔴 | |
| Code Quality | | ↑↓→ | 🟢🟡🔴 | |
| Test Coverage | | ↑↓→ | 🟢🟡🔴 | |
| Technical Debt | | ↑↓→ | 🟢🟡🔴 | |
| Dependency Health | | ↑↓→ | 🟢🟡🔴 | |
| Platform Currency | | ↑↓→ | 🟢🟡🔴 | |
| Accessibility | | ↑↓→ | 🟢🟡🔴 | |
| Performance | | ↑↓→ | 🟢🟡🔴 | |
| Security | | ↑↓→ | 🟢🟡🔴 | |
| Operational Readiness | | ↑↓→ | 🟢🟡🔴 | |
| **Overall** | | | | |

### 2. Delivery Health
- **Velocity trend:** [Last 6 sprints — is it stable, improving, or declining?]
- **Carry-over rate:** [% of stories carried between sprints]
- **Bug escape rate:** [Bugs found in production vs. caught in QA]
- **Cycle time:** [Average time from "in progress" to "done"]
- **Estimation accuracy:** [Planned vs. actual across recent sprints]

### 3. Code Quality
- **Static analysis results:** [SonarQube/SonarCloud metrics]
- **Code duplication:** [% and trend]
- **Complexity hotspots:** [Files/classes with highest complexity]
- **Code review coverage:** [% of changes reviewed]
- **Coding standard adherence:** [Linting error trends]

### 4. Test Coverage
- **Unit test coverage:** [% and trend — target varies by project]
- **Integration test coverage:** [Key integration paths covered?]
- **E2E test coverage:** [Critical user journeys automated?]
- **CMS authoring tests:** [Content publishing, workflow, preview tested?]
- **Accessibility test automation:** [axe-core or similar in CI?]

### 5. Technical Debt Inventory
| # | Debt Item | Category | Impact | Effort to Fix | Priority |
|---|----------|----------|--------|--------------|----------|

Categories: Architecture / Dependencies / Testing / Documentation / Infrastructure

### 6. Dependency Health
- **CMS version:** [Current vs. latest — how many versions behind?]
- **Framework version:** [.NET / Node.js / React version currency]
- **Known vulnerabilities:** [npm audit / dotnet audit results]
- **End-of-life dependencies:** [Any dependencies approaching EOL?]
- **Upgrade path complexity:** [Easy patch vs. breaking changes]

### 7. CMS-Specific Health

**Sitecore:**
- Serialization consistency (SCS/TDS vs. database drift)
- Publishing queue health
- Solr/Search index health
- Cache hit ratios
- Experience Editor rendering reliability

**Umbraco:**
- Examine index health
- ModelsBuilder consistency
- Content Delivery API reliability (if headless)
- NuGet package currency
- Umbraco health check dashboard results

**Optimizely:**
- Scheduled job health
- Content Graph sync reliability
- Commerce catalog consistency
- DXP deployment slot health

### 8. Performance Health
- **Core Web Vitals:** LCP, FID/INP, CLS — current vs. targets
- **Server response time:** TTFB P50 and P95
- **API response times:** Per integration endpoint
- **Database query performance:** Slow query log analysis
- **CDN cache hit ratio:** [%]

### 9. Security Health
- **Dependency vulnerabilities:** [Critical/High/Medium counts]
- **Security header configuration:** [CSP, HSTS, etc.]
- **Authentication/authorization audit:** [Last reviewed date]
- **Secret management:** [Are secrets in code, config, or Key Vault?]
- **SSL certificate expiry:** [Days until renewal]

### 10. Operational Readiness
- **Monitoring coverage:** [What's monitored, what's not]
- **Alerting configuration:** [Are alerts actionable? False positive rate?]
- **Runbook currency:** [Last updated, covers current architecture?]
- **Disaster recovery:** [RTO/RPO defined? DR tested?]
- **On-call rotation:** [Defined? Documented?]

### 11. Recommendations
| Priority | Recommendation | Category | Effort | Impact | Timeline |
|----------|---------------|----------|--------|--------|----------|
| P1 — Critical | | | | | |
| P2 — Important | | | | | |
| P3 — Improvement | | | | | |

### 12. Trend Analysis
Compare current health to previous audit (if available):
- Improvements since last audit
- Areas that degraded
- Persistent issues that need escalation
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/audit-project-health/SKILL.md`:

```markdown
---
name: audit-project-health
description: Produces comprehensive project health audits covering velocity, code quality, technical debt, dependencies, accessibility, performance, security, and operational readiness. Use for quarterly reviews, managed services health checks, or when a project "feels off."
argument-hint: "[project name and current concerns]"
allowed-tools: Read, Glob, Grep, Bash(npm audit *), Bash(dotnet list *), Bash(npx lighthouse *)
---

# Audit Project Health

You are a senior tech lead at RBA who conducts honest, data-driven project health audits.

## Your Task

Audit the health of: **$ARGUMENTS**

## Process

### Step 1: Gather Data
- Check dependency versions and known vulnerabilities
- Review test coverage reports
- Analyze code quality metrics
- Check CMS platform version currency
- Review deployment pipeline health

### Step 2: Produce the Audit
1. Health scorecard (10 categories, scored 1-5)
2. Delivery health (velocity, carry-over, cycle time)
3. Code quality (static analysis, complexity, duplication)
4. Test coverage (unit, integration, E2E, accessibility)
5. Technical debt inventory
6. Dependency health (versions, vulnerabilities, EOL)
7. CMS-specific health checks
8. Performance (Core Web Vitals, TTFB, API times)
9. Security (vulnerabilities, headers, secrets)
10. Operational readiness (monitoring, runbooks, DR)
11. Prioritized recommendations
12. Trend analysis vs. previous audit

### Quality Check
- Scores are honest — don't inflate to make the project look healthy
- Every finding includes evidence (metrics, not opinions)
- Recommendations are prioritized with effort and impact
- CMS-specific checks are included (not just generic web health)
```

### Usage

```
/audit-project-health Contoso XM Cloud — 8 months in, velocity declining, client concerned about release quality
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project | `Contoso Corporate Website — Sitecore XM Cloud` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud with Next.js` or `Umbraco 13 (.NET 8)` |
| `{{PROJECT_AGE}}` | How long the project has been running | `8 months (Sprint 16 of estimated 20)` |
| `{{TEAM_SIZE}}` | Current team | `2 senior devs, 1 mid dev, 0.5 QA, 0.25 UX, 0.5 PM` |
| `{{CURRENT_CONCERNS}}` | What prompted the audit | `Velocity declining for 3 sprints. Bug escape rate increasing. Client expressing concern about release quality. Team morale seems low.` |
| `{{AVAILABLE_METRICS}}` | Data you have access to | `Jira velocity reports, SonarCloud dashboard, Azure Application Insights, npm audit output, Lighthouse scores` |

## Best Practices

- **Model choice:** Opus 4 — health audits require pattern recognition across multiple data sources and honest assessment of systemic issues.
- **Be honest, not diplomatic:** A health audit that says "everything is green" when velocity is declining and bugs are escaping is worse than useless — it prevents the team from addressing real problems.
- **Check CMS version currency:** CMS platforms release security patches regularly. Being 3+ versions behind on Sitecore, Umbraco, or Optimizely is a security and supportability risk that non-CMS health checks miss.
- **Compare to previous audits:** A single audit is a snapshot. Trend analysis across audits reveals whether the project is getting healthier or degrading.

## Related Skills

- [Produce Managed Services Health Report](/roles/security-oversight/performance/produce-managed-services-health-report/) — Monthly health reports for SLA clients use the same framework
- [Generate Vertical Compliance Checklist](/roles/security-oversight/compliance/generate-vertical-compliance-checklist/) — Compliance checks that complement the security health section
- [Review Pull Request](/roles/engineering/architecture/review-pull-request/) — PR reviews prevent the code quality degradation that health audits detect
