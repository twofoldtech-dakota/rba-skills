---
title: Generate Go-Live Checklist
description: Produce a CMS-platform-specific go-live checklist covering DNS cutover, CDN configuration, cache warming, monitoring, rollback procedures, and hypercare planning
---

## Context & Goal

Go-live is the highest-risk moment in any CMS project. DNS propagation delays, CDN misconfiguration, missed cache warming, forgotten redirect rules, and environment-specific config differences have each individually caused launch failures. This skill produces a platform-specific go-live checklist that covers every phase from pre-launch verification through hypercare — tailored to whether you're launching Sitecore XM Cloud (Edge delivery, JSS rendering host), Umbraco (Azure App Service, Examine indexes), or Optimizely (DXP deployment slots, Content Graph sync). Built from RBA's 1,500+ go-live experiences across its "Websites Never Close" managed services practice.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior DevOps engineer at RBA who has overseen hundreds of CMS go-lives. You know that every failed launch traces back to something that was on a checklist somewhere but got skipped under time pressure. You produce go-live checklists that are so thorough they feel paranoid — because at 2 AM during a DNS cutover, paranoid is exactly right. You tailor checklists to the specific CMS platform because Sitecore XM Cloud launches are fundamentally different from Umbraco Azure deployments.

Generate a Go-Live Checklist for:

**Project:** {{PROJECT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Hosting:** {{HOSTING_ENVIRONMENT}}
**Launch Date/Time:** {{LAUNCH_DATETIME}}
**Launch Type:** {{LAUNCH_TYPE}}
**Integrations:**
{{INTEGRATIONS}}
**Team:**
{{TEAM_CONTACTS}}

Produce a Go-Live Checklist:

### 1. Pre-Launch (T-5 Days)
**Content & Data:**
- [ ] All content migrated and verified
- [ ] Redirect map imported and tested (sample 10%)
- [ ] Media assets verified (no broken images)
- [ ] Forms tested end-to-end (submission, notification, storage)

**Technical:**
- [ ] Production environment provisioned and configured
- [ ] SSL certificates installed and verified
- [ ] CDN configured (caching rules, purge access verified)
- [ ] DNS TTL lowered to 300 seconds (prepare for cutover)
- [ ] Environment-specific configuration verified (API keys, connection strings)
- [ ] Search indexes built and verified
- [ ] Performance baseline recorded (Core Web Vitals, TTFB)

**Integrations:**
- [ ] All integrations tested against production endpoints
- [ ] API rate limits confirmed with vendors
- [ ] Error handling and fallback behavior verified
- [ ] Monitoring alerts configured for integration failures

**Security:**
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] Authentication/authorization tested
- [ ] Sensitive data exposure checked
- [ ] WAF rules configured and tested

### 2. Pre-Launch (T-1 Day)
- [ ] Full regression test pass completed
- [ ] Cross-browser/device testing completed
- [ ] Accessibility audit passed (WCAG target level)
- [ ] Load test completed against production infrastructure
- [ ] Rollback procedure documented and tested
- [ ] Stakeholder go/no-go decision recorded
- [ ] War room / communication channel established
- [ ] On-call rotation confirmed for launch window

### 3. Launch Day (T-0)
**DNS Cutover Sequence:**
- [ ] Notify all stakeholders: launch starting
- [ ] Enable maintenance page on old site (if applicable)
- [ ] Final content sync (if delta migration needed)
- [ ] Update DNS records
- [ ] Verify DNS propagation (check from multiple regions)
- [ ] Verify site loads from new infrastructure
- [ ] Run smoke tests (critical paths)

**Post-Cutover Verification:**
- [ ] Homepage loads correctly
- [ ] Navigation works (all levels)
- [ ] Search returns results
- [ ] Forms submit successfully
- [ ] Integrations return data
- [ ] Images and media load
- [ ] SSL certificate shows correctly (no mixed content)
- [ ] Analytics tracking fires
- [ ] CDN serving cached content
- [ ] Redirect rules working (test top 20)

**CMS Platform Verification:**
[Platform-specific checks for content publishing, cache invalidation, Edge delivery, etc.]

### 4. Hypercare (T+1 to T+5 Days)
- [ ] Monitor error rates (target: < baseline + 1%)
- [ ] Monitor performance (Core Web Vitals within targets)
- [ ] Monitor integration health
- [ ] Monitor search index freshness
- [ ] Daily standup with launch team
- [ ] Client feedback channel active
- [ ] Bug triage process defined (P1: 1hr, P2: 4hr, P3: next sprint)

### 5. Post-Launch (T+2 Weeks)
- [ ] DNS TTL restored to normal (3600+)
- [ ] Old infrastructure decommissioned
- [ ] Launch retrospective conducted
- [ ] Documentation updated (runbooks, architecture diagrams)
- [ ] Monitoring transitioned to managed services team
- [ ] Hypercare period closed — transition to SLA support

### 6. Rollback Procedure
If launch fails:
1. [Step 1 — immediate action]
2. [Step 2 — revert DNS]
3. [Step 3 — verify old site]
4. [Step 4 — communicate to stakeholders]
5. [Step 5 — assess and replan]

**Rollback triggers:**
- Site unavailable for > 15 minutes
- Critical functionality broken (checkout, forms, search)
- Data integrity issue discovered
- Security vulnerability identified

### 7. Communication Plan
| Event | Audience | Channel | Owner |
|-------|---------|---------|-------|
| Launch starting | All stakeholders | [channel] | [owner] |
| Launch complete | All stakeholders | [channel] | [owner] |
| Issue detected | Tech team | [channel] | [owner] |
| Rollback initiated | All stakeholders | [channel] | [owner] |
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-go-live-checklist/SKILL.md`:

```markdown
---
name: generate-go-live-checklist
description: Produces CMS-platform-specific go-live checklists covering pre-launch, launch day, hypercare, and rollback. Use before every production deployment.
argument-hint: "[project name, CMS platform, launch date]"
allowed-tools: Read, Glob, Grep
---

# Generate Go-Live Checklist

You are a senior DevOps engineer at RBA who has overseen hundreds of CMS go-lives.

## Your Task

Generate a go-live checklist for: **$ARGUMENTS**

## Process

### Step 1: Identify Launch Parameters
- CMS platform and hosting environment
- Integration dependencies
- Launch type (new site, migration, major release)
- Team and communication channels

### Step 2: Produce the Checklist
1. Pre-launch T-5 (content, technical, integrations, security)
2. Pre-launch T-1 (testing, rollback, go/no-go)
3. Launch day (DNS cutover, verification, platform checks)
4. Hypercare T+1 to T+5 (monitoring, triage)
5. Post-launch T+2 weeks (decommission, retrospective)
6. Rollback procedure with triggers
7. Communication plan

### Quality Check
- Checklist is platform-specific (Sitecore vs Umbraco vs Optimizely)
- Rollback procedure is documented with clear triggers
- Communication plan covers all stakeholder groups
- Hypercare includes specific monitoring targets
```

### Usage

```
/generate-go-live-checklist Contoso corporate site — Sitecore XM Cloud on Vercel — launching March 15 at 6 AM EST
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project | `Contoso Corporate Website Redesign` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud with Next.js on Vercel` or `Umbraco 13 on Azure App Service` |
| `{{HOSTING_ENVIRONMENT}}` | Hosting details | `Vercel (frontend), Sitecore Cloud (CM), Experience Edge (CDN)` or `Azure App Service (P2v3), Azure Front Door, Azure SQL` |
| `{{LAUNCH_DATETIME}}` | Launch window | `Saturday, March 15, 2025 at 6:00 AM EST (low-traffic window)` |
| `{{LAUNCH_TYPE}}` | Type of launch | `New site launch — migration from WordPress` or `Major release — redesigned checkout flow` |
| `{{INTEGRATIONS}}` | Active integrations | `Coveo search, OrderCloud commerce, Salesforce CRM, Google Analytics 4, HubSpot forms` |
| `{{TEAM_CONTACTS}}` | Launch team | `Tech Lead: Mike (on-call), PM: Sarah (comms), DevOps: Chris (infrastructure), Client IT: Tom (DNS)` |

## Best Practices

- **Model choice:** Sonnet 4 — checklists need thoroughness and consistency, not complex reasoning. Generate quickly and review with the team.
- **Customize for the platform:** A Sitecore XM Cloud launch needs Experience Edge cache invalidation checks. An Umbraco launch needs Examine index rebuild verification. A generic checklist misses these.
- **Lower DNS TTL early:** Change TTL to 300 seconds at T-5 days. This ensures fast DNS propagation on launch day and fast rollback if needed. Forgetting this is the most common go-live mistake.
- **Test the rollback:** A rollback procedure that hasn't been tested is not a rollback procedure. Run through it at least once before launch day.

## Related Skills

- [Generate Knowledge Transfer Package](/roles/engineering/devops/generate-knowledge-transfer-package/) — Post-launch, transition operational knowledge to the managed services team
- [Draft Managed Services Transition Plan](/roles/strategy/project-management/draft-managed-services-transition/) — The go-live checklist feeds into the managed services transition
- [Guide Incident Response](/roles/security-oversight/security/guide-incident-response/) — If something goes wrong during launch, follow the incident response process
