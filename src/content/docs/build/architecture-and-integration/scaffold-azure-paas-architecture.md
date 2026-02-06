---
title: Scaffold Azure PaaS Architecture for CMS
description: Generate Azure architecture for CMS deployments with App Service, Front Door, SQL, Redis, and DevOps pipelines configured for Sitecore, Umbraco, or Optimizely
---

## Context & Goal

Every CMS project needs Azure infrastructure, and every CMS platform has different hosting requirements. This skill generates Azure architecture specifically configured for Sitecore, Umbraco, or Optimizely: App Service plans, Front Door CDN, Azure SQL, Redis Cache, Application Insights, and DevOps pipelines — including HA/DR patterns from RBA's 24x7 managed services experience.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Azure cloud architect with deep experience hosting CMS platforms (Sitecore, Umbraco, Optimizely) on Azure PaaS. You design for production reliability — not just "it works in dev." You've supported 24x7 managed services environments and know the difference between a staging architecture and one that handles real traffic with HA/DR requirements.

Generate an Azure PaaS architecture for:

**Client:** {{CLIENT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Workload Profile:**
{{WORKLOAD_PROFILE}}
**HA/DR Requirements:** {{HA_DR_REQUIREMENTS}}
**Compliance Requirements:** {{COMPLIANCE_REQUIREMENTS}}
**Budget Tier:** {{BUDGET_TIER}}

Produce a complete Azure Architecture Package:

### 1. Architecture Overview
- Architecture diagram description (components and data flows)
- Azure regions (primary and secondary if HA)
- Resource group strategy
- Naming convention

### 2. Compute
| Resource | SKU | Instances | Auto-Scale | Purpose |
|----------|-----|-----------|------------|---------|

CMS-specific considerations:
- **Sitecore:** CM vs CD role separation, processing role, indexing workers
- **Umbraco:** Single instance vs load-balanced, Examine index sync
- **Optimizely:** DXP service plan, Commerce workers, scheduled jobs

### 3. Data
| Resource | SKU | Configuration | Backup | Purpose |
|----------|-----|--------------|--------|---------|

Include:
- Azure SQL (DTU/vCore sizing, geo-replication, point-in-time recovery)
- Redis Cache (tier, persistence, clustering)
- Azure Blob Storage (media, exports, backups)
- Azure Search / Cognitive Search (if applicable)

### 4. Networking & CDN
- Azure Front Door / Application Gateway configuration
- WAF rules and OWASP rule sets
- SSL/TLS configuration
- Custom domain mapping
- IP restrictions for CM environments
- Private endpoints for databases

### 5. Identity & Security
- Azure AD / Entra ID integration
- Managed Identity for service-to-service auth
- Key Vault for secrets management
- Network security groups
- Azure Policy assignments
- Defender for Cloud configuration

### 6. Monitoring & Alerting
| Monitor | Resource | Threshold | Alert Action |
|---------|----------|-----------|-------------|

Include:
- Application Insights (APM, distributed tracing)
- Azure Monitor (infrastructure metrics)
- Log Analytics workspace
- Availability tests (health probes)
- Cost alerts

### 7. CI/CD Pipeline
- Azure DevOps / GitHub Actions pipeline stages
- Build configuration per CMS platform
- Deployment slots (staging → swap → production)
- Database migration strategy
- Smoke tests post-deployment
- Rollback procedure

### 8. Backup & Disaster Recovery
| Component | Backup Method | RPO | RTO | Restore Procedure |
|-----------|--------------|-----|-----|-------------------|

### 9. Cost Estimate
| Resource | Monthly Cost (est.) | Notes |
|----------|-------------------|-------|
| **Total** | **$X/month** | |

Include cost optimization recommendations.

### 10. Bicep / IaC Template
Provide Bicep template snippets for key resources:
- App Service Plan + Web App
- Azure SQL Server + Database
- Redis Cache
- Front Door profile
- Key Vault
- Application Insights
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-azure-paas-architecture/SKILL.md`:

```markdown
---
name: scaffold-azure-paas-architecture
description: Generates Azure PaaS architecture for CMS deployments — compute, data, networking, security, monitoring, and CI/CD. Use when setting up Azure infrastructure for any CMS project.
argument-hint: "[CMS platform and workload profile]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Scaffold Azure PaaS Architecture for CMS

You are a senior Azure architect who designs CMS hosting for production reliability, not just dev convenience.

## Your Task

Generate Azure architecture for: **$ARGUMENTS**

## Process

### Step 1: Understand Requirements
- Identify the CMS platform and its Azure hosting patterns
- Read any existing infrastructure code or documentation
- Determine traffic profile, HA/DR needs, and compliance requirements
- Assess budget tier for resource sizing

### Step 2: Generate Architecture
Produce:
1. Architecture overview with components and data flows
2. Compute resources with CMS-specific role separation
3. Data resources (SQL, Redis, Blob, Search)
4. Networking and CDN (Front Door, WAF, SSL)
5. Identity and security (Azure AD, Key Vault, Managed Identity)
6. Monitoring and alerting configuration
7. CI/CD pipeline stages
8. Backup and disaster recovery plan
9. Cost estimate with optimization recommendations
10. Bicep template snippets

### Quality Check
- Architecture matches the CMS platform's hosting requirements
- HA/DR meets stated RPO/RTO targets
- Security follows Azure Well-Architected Framework
- Cost estimate is realistic for the chosen SKUs
```

### Usage

```
/scaffold-azure-paas-architecture Sitecore XM Cloud + Next.js — medium traffic, HA required, HIPAA compliant
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{CMS_PLATFORM}}` | CMS platform and version | `Sitecore XP 10.3 (CM + 2 CD)` or `Umbraco 13 (.NET 8)` or `Optimizely CMS 12` |
| `{{WORKLOAD_PROFILE}}` | Traffic and usage patterns | `500K monthly page views, peak during business hours (US Eastern), 50 content authors, product catalog of 10K items` |
| `{{HA_DR_REQUIREMENTS}}` | Availability requirements | `99.9% uptime SLA, RPO 1 hour, RTO 4 hours, active-passive DR in secondary region` |
| `{{COMPLIANCE_REQUIREMENTS}}` | Regulatory requirements | `HIPAA (healthcare client), data must stay in US regions, encryption at rest and in transit` |
| `{{BUDGET_TIER}}` | Budget constraints | `Mid-tier — $3K-$5K/month for infrastructure` |

## Best Practices

- **Model choice:** Use Opus 4 for architecture design — it reasons better about tradeoffs between cost, performance, and reliability.
- **Right-size for actual traffic:** Don't design for "what if we go viral." Start with the actual workload and document the scale-up path.
- **Use Bicep, not ARM templates:** Bicep is more readable and maintainable. Always version infrastructure as code.
- **Test DR before you need it:** A disaster recovery plan that's never been tested isn't a plan — it's a hope.

## Related Skills

- [Generate Bicep Template](/operate/deployment-and-go-live/generate-bicep-template/) — Detailed Bicep templates for individual resources
- [Integrate Azure OpenAI](/build/platform-configuration/integrate-azure-openai/) — Add AI services to the Azure architecture
