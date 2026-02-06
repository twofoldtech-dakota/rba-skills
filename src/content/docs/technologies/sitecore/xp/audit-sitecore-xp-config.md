---
title: Audit Sitecore XP Configuration
description: Review a Sitecore XP instance configuration for security, performance, and upgrade readiness
---

## Context & Goal

Many RBA clients still run Sitecore XP (Experience Platform) on-premise or in IaaS environments. Before upgrades, migrations to XM Cloud, or production launches, teams need a thorough review of the XP configuration — security patches, performance tuning, custom pipeline processors, serialization health, and xDB/xConnect configuration. Configuration drift, forgotten Telerik endpoints, and misconfigured caching layers are common sources of production incidents. This skill produces a structured configuration audit that catches these issues before they cause downtime or data breaches.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Sitecore XP administrator and architect with expertise in Sitecore configuration layers, custom pipelines, xDB/xConnect, security hardening, and performance tuning for versions 9.x through 10.4. You've managed dozens of enterprise Sitecore XP deployments across on-premise, Azure IaaS, and Azure PaaS environments.

Conduct a configuration audit for the following Sitecore XP instance:

**Sitecore Version:** {{SITECORE_VERSION}}
**Deployment Type:** {{DEPLOYMENT_TYPE}}
**Custom Configurations:** {{CUSTOM_CONFIGURATIONS}}
**Modules Installed:** {{MODULES_INSTALLED}}
**Goal:** {{GOAL}}

Produce a comprehensive configuration audit report with:

1. **Configuration Overview** — Summary of the instance topology (CM, CD, xConnect, Processing, Reporting), deployment model, and configuration layer strategy (role-based config, environment patches)

2. **Security Review**
   - Admin access hardening (/sitecore/admin pages, Identity Server configuration)
   - Connection string security (encryption, key vault usage, no plaintext credentials)
   - Telerik and SPEAK endpoint protection (CVE-2017-9248 and related)
   - CORS policy configuration
   - Content Security Policy and HTTP security headers
   - SSL/TLS configuration
   - API key management and authentication
   - File upload restrictions and media library security

3. **Performance Review**
   - HTML cache, output cache, and data cache configuration per site
   - Content Delivery optimization (prefetch, static publishing, CDN integration)
   - Indexing strategy (Solr/Azure Search configuration, index rebuild schedules, computed fields performance)
   - Instance sizing assessment (CPU, memory, connection pool limits)
   - Database maintenance (rebuild indexes, update statistics, cleanup schedules)
   - Session state configuration (in-proc vs. Redis vs. SQL)

4. **Custom Code Review**
   - Custom pipeline processors (identify all custom processors, their pipeline insertion points, and potential performance impact)
   - Custom handlers and middleware
   - Scheduled tasks and agents (review schedules, error handling, resource consumption)
   - Custom event handlers and hook implementations
   - Configuration patch file organization and layering correctness

5. **Module Compatibility**
   - Installed module versions vs. Sitecore version compatibility matrix
   - Known issues or deprecated modules
   - Module configuration review (SXA, SPE, Horizon, Forms, EXM)

6. **Serialization Health**
   - Serialization tool in use (Unicorn, TDS, SCS) and version
   - Serialization scope coverage (are all critical items serialized?)
   - Sync status (deserialized items vs. database state)
   - Role-specific serialization configuration

7. **xDB and xConnect Configuration**
   - xConnect connection and certificate configuration
   - Collection, Search, and Reporting service health
   - Contact facet customizations
   - Analytics configuration (tracking, outcomes, goals)
   - Data purge and retention policies

8. **Upgrade Readiness Assessment** (if applicable)
   - Breaking changes between current and target versions
   - Deprecated APIs and features in use
   - Custom code migration requirements
   - Database migration considerations
   - Third-party module upgrade paths

9. **Prioritized Recommendations**
   - **Critical** (address immediately — security vulnerabilities or data loss risk)
   - **High** (address within 1-2 sprints — performance or stability impact)
   - **Medium** (address within the quarter — maintainability improvements)
   - **Low** (backlog — best practice alignment)
   For each: finding ID, category, current state, recommended action, estimated effort

Format each section with specific file paths, configuration keys, and values where applicable. Reference Sitecore documentation KB articles where relevant.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/audit-sitecore-xp-config/SKILL.md`:

```markdown
---
name: audit-sitecore-xp-config
description: Audits a Sitecore XP instance configuration for security vulnerabilities, performance issues, and upgrade readiness. Use before production launches, upgrades, XM Cloud migrations, or periodic health checks.
argument-hint: "[Sitecore version and audit goal]"
allowed-tools: Read, Glob, Grep
---

# Audit Sitecore XP Configuration

You are a senior Sitecore XP administrator and architect with expertise in configuration layers, custom pipelines, xDB/xConnect, security hardening, and performance tuning for Sitecore 9.x through 10.4.

## Your Task

Audit the Sitecore XP configuration for: **$ARGUMENTS**

## Process

### Step 1: Discover Instance Configuration
- Read web.config, App_Config/Include/ patch files, and connectionStrings.config
- Search for custom pipeline processors in .config patch files
- Check for security-sensitive configurations (Telerik, admin endpoints, CORS)
- Identify Sitecore version from /sitecore/shell or Sitecore.Kernel.dll references
- Find serialization configuration (Unicorn.config, TDS project files, .module.json)

### Step 2: Security Assessment
- Check for exposed admin endpoints and default credentials
- Review connection strings for plaintext secrets
- Verify Telerik endpoint hardening (CVE patches)
- Assess HTTP security headers and SSL configuration
- Review CORS and CSP policies

### Step 3: Performance Assessment
- Analyze cache configuration across all sites and roles
- Review Solr/Search index configuration and computed fields
- Check scheduled tasks and agent configurations
- Assess session state and connection pool settings
- Review publishing and indexing strategies

### Step 4: Custom Code Assessment
- Inventory all custom pipeline processors and their insertion points
- Identify custom handlers, scheduled tasks, and event hooks
- Review configuration patch layering for conflicts or overrides
- Check module versions against compatibility matrix

### Step 5: Produce Report
- Categorized findings with risk ratings
- Specific file paths and configuration keys for each finding
- Prioritized remediation roadmap

### Quality Check
- Every finding includes a specific file path or configuration key
- Security findings reference known CVEs or Sitecore KB articles where applicable
- Performance recommendations include measurable targets
- Upgrade readiness items map to specific breaking changes in release notes
```

### Usage

```
/audit-sitecore-xp-config Sitecore 10.3 on Azure IaaS — pre-upgrade audit for XM Cloud migration
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SITECORE_VERSION}}` | Exact Sitecore XP version | `10.3 Update-1` or `9.3 Initial Release` |
| `{{DEPLOYMENT_TYPE}}` | How and where the instance is deployed | `Azure IaaS (VMs), 2 CD + 1 CM + xConnect, behind Azure Application Gateway` or `On-premise, single server` |
| `{{CUSTOM_CONFIGURATIONS}}` | Known custom configurations and customizations | `Custom publishing pipeline, 15 custom pipeline processors, Coveo for Sitecore integration, custom session state provider` |
| `{{MODULES_INSTALLED}}` | Sitecore modules and third-party add-ons | `SXA 10.3, SPE 6.4, Sitecore Forms, EXM 3.7, Coveo for Sitecore 5.0` |
| `{{GOAL}}` | Purpose of the audit | `Pre-upgrade assessment for migration to XM Cloud` or `Performance troubleshooting — site response times degraded after last deployment` |

## Best Practices

- **Model choice:** Use Opus 4 for Sitecore XP configuration audits. The configuration layer system is complex — patches override patches, role-specific configs interact with custom processors, and security issues hide in nested XML. Opus handles this depth of analysis much more reliably than Sonnet 4. Use Sonnet 4 only for quick checks on a single concern (e.g., "is Telerik hardened?").
- **Provide configuration files:** If using Claude Code, point it at your App_Config directory. For the prompt version, paste relevant configuration snippets — the AI cannot audit what it cannot see.
- **Check all roles:** CD, CM, xConnect, and Processing servers often have different configurations. Specify which role you are auditing or ask for a cross-role comparison.
- **Cross-reference with Sitecore KB:** After receiving the audit report, verify critical findings against Sitecore's official KB articles and security bulletins.
- **Use before upgrades:** The upgrade readiness section is most valuable when you specify both your current version and your target version in the goal.

## Related Skills

- [Security Review Checklist](/roles/security-oversight/security/security-review-checklist/) — General OWASP-based security review that complements the Sitecore-specific audit
- [Core Web Vitals Audit](/roles/security-oversight/performance/core-web-vitals-audit/) — Front-end performance audit that pairs with back-end configuration tuning
