---
title: Generate Bicep Template
description: Create an Azure Bicep infrastructure-as-code template for CMS hosting, App Services, databases, and supporting resources
---

## Context & Goal

RBA deploys Sitecore, Umbraco, and Optimizely solutions on Azure. Infrastructure provisioned by hand is inconsistent across environments, hard to reproduce, and risky to modify. Bicep — Azure's modern infrastructure-as-code language — solves this by defining resources declaratively. This skill generates Bicep templates for common CMS hosting patterns: App Services, SQL databases, Redis, CDN, Application Insights, and Key Vault, with security and cost best practices built in.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Azure cloud engineer with deep expertise in Bicep and ARM templates, Azure App Service, Azure SQL, Azure Front Door, Application Insights, and CMS hosting patterns for Sitecore PaaS, Umbraco on App Service, and Optimizely DXP. You follow Azure Well-Architected Framework principles and design for security, reliability, and cost optimization.

Generate a Bicep infrastructure-as-code template for the following deployment:

**Project Name:** {{PROJECT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Environment:** {{ENVIRONMENT}}

**Resource Requirements:**
{{RESOURCE_REQUIREMENTS}}

**Networking Requirements:**
{{NETWORKING_REQUIREMENTS}}

**Cost Tier:** {{COST_TIER}}

Produce the following deliverables:

### 1. Main Bicep Template (main.bicep)
Include the following resources as applicable:
- **Parameters** with decorators (@description, @allowed, @minLength, @secure)
- **App Service Plan** — SKU based on cost tier, Linux/Windows based on CMS
- **App Service(s)** — Runtime stack, app settings, connection strings, managed identity
- **Deployment Slots** — Staging slot for zero-downtime deployments
- **Azure SQL Server** — Admin credentials from Key Vault, firewall rules, AAD admin
- **Azure SQL Database(s)** — SKU, max size, backup retention, geo-replication if production
- **Redis Cache** — SKU based on environment, non-SSL port disabled
- **Storage Account** — Media/BLOB storage, private endpoint if VNet integrated
- **Application Insights** — Connected to App Service, sampling configuration
- **Log Analytics Workspace** — Centralized logging, retention period
- **Azure Front Door or CDN Profile** — Custom domain, WAF policy, caching rules, compression
- **Key Vault** — Access policies or RBAC, secrets for connection strings and API keys
- **Virtual Network** (if required) — Subnets for App Service, SQL, Redis, private endpoints
- **Private Endpoints** (if VNet) — For SQL, Redis, Storage, Key Vault
- **Diagnostic Settings** — Send logs and metrics to Log Analytics

For each resource include:
- Descriptive resource name following naming convention: `{projectName}-{resourceType}-{environment}`
- Tags: environment, project, managedBy, costCenter
- Security defaults (HTTPS only, TLS 1.2, managed identity)

### 2. Bicep Modules
Break large templates into reusable modules:
- `modules/appService.bicep` — App Service Plan and App Service
- `modules/sql.bicep` — SQL Server and database
- `modules/monitoring.bicep` — Application Insights and Log Analytics
- `modules/networking.bicep` — VNet, subnets, private endpoints (if needed)
- `modules/security.bicep` — Key Vault and role assignments

### 3. Parameter Files
- `parameters/{environment}.bicepparam` — Environment-specific values
- Clearly distinguish what changes per environment (SKU, instance count, features)
- Never include secrets in parameter files — reference Key Vault

### 4. Deployment Script
```bash
# az CLI deployment commands
# Include: resource group creation, what-if preview, deployment, slot swap
```
- What-if command to preview changes before deploying
- Incremental deployment mode
- Slot swap command for zero-downtime deployment
- Post-deployment validation commands

### 5. Cost Estimate Notes
- Estimated monthly cost for the defined resources at the specified tier
- Which resources are the primary cost drivers
- Cost optimization recommendations (reserved instances, auto-scale rules, Dev/Test pricing)
- Scaling triggers and thresholds

### 6. Security Checklist
- Managed identity enabled (no stored credentials)
- HTTPS enforced, TLS 1.2 minimum
- Key Vault for all secrets
- Network isolation via VNet and private endpoints (if applicable)
- SQL firewall rules (no 0.0.0.0/0)
- Storage account public access disabled
- Diagnostic logging enabled

Use Bicep best practices: no hardcoded values, descriptive parameter names, output values for dependent deployments, and comments explaining non-obvious configurations. Target Azure Bicep latest syntax.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-bicep-template/SKILL.md`:

```markdown
---
name: generate-bicep-template
description: Generates Azure Bicep infrastructure-as-code templates for CMS hosting patterns including App Services, SQL, Redis, CDN, and supporting resources. Use when provisioning Azure infrastructure for Sitecore, Umbraco, or Optimizely deployments.
argument-hint: "[project name, CMS platform, environment, and resource requirements]"
allowed-tools: Read, Glob, Grep, Write
---

# Generate Bicep Template

You are a senior Azure cloud engineer with deep expertise in Bicep templates, Azure App Service, Azure SQL, and CMS hosting patterns.

## Your Task

Generate a Bicep template for: **$ARGUMENTS**

## Process

### Step 1: Assess Existing Infrastructure
- Read any existing Bicep, ARM, or Terraform templates in the project
- Check for existing parameter files and deployment scripts
- Identify the naming convention used for Azure resources
- Look for existing resource group or subscription configuration

### Step 2: Design the Template
Based on the CMS platform and requirements:
- Select appropriate resource SKUs for the target environment
- Design the module structure for reusability
- Plan networking (public vs. VNet-integrated)
- Configure security defaults (managed identity, Key Vault, TLS)

### Step 3: Generate Files
1. Main Bicep template with all required resources
2. Modules for reusable resource groups (app service, SQL, monitoring, etc.)
3. Environment-specific parameter files
4. Deployment script with what-if preview and slot swap
5. Cost estimate and security checklist

### Step 4: Quality Check
- Template compiles without errors (az bicep build)
- No hardcoded values — all configurable via parameters
- Security defaults enforced (HTTPS, TLS 1.2, managed identity)
- Tags applied consistently across all resources
- Outputs defined for values needed by downstream deployments
- Parameter files do not contain secrets
```

### Usage

```
/generate-bicep-template Umbraco v13 production deployment — App Service, Azure SQL, Redis, CDN, Application Insights, Key Vault on Standard tier
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name used in resource naming | `acme-corporate` (lowercase, alphanumeric-hyphen) |
| `{{CMS_PLATFORM}}` | CMS being deployed | `Umbraco v13 (.NET 8)`, `Sitecore XM Cloud`, `Optimizely CMS (.NET 8)` |
| `{{ENVIRONMENT}}` | Target environment | `dev`, `staging`, `production` |
| `{{RESOURCE_REQUIREMENTS}}` | What Azure resources are needed | `App Service (Windows, .NET 8), Azure SQL (single DB, 50 GB), Redis Cache, Blob Storage for media, Application Insights, CDN for static assets` |
| `{{NETWORKING_REQUIREMENTS}}` | Network design | `VNet integration with private endpoints for SQL and Redis, public CDN endpoint, IP restriction on App Service SCM endpoint` |
| `{{COST_TIER}}` | Budget level | `Development (minimal cost)`, `Standard (production baseline)`, `Premium (high availability, geo-redundancy)` |

## Best Practices

- **Model choice:** Sonnet 4 generates Bicep templates effectively for standard patterns (App Service + SQL + CDN). Use Opus 4 for complex multi-region deployments, advanced networking (VNet with private endpoints, ExpressRoute), or when combining multiple CMS platforms in a single template.
- **Always use what-if:** Run `az deployment group what-if` before every deployment. The generated script includes this step, but make it a team habit.
- **Start with dev, promote to prod:** Generate the dev environment first, validate it works, then create staging and production parameter files. The template stays the same — only parameters change.
- **Reference Key Vault for secrets:** Never put connection strings, API keys, or passwords in parameter files. The template should reference Key Vault secrets.
- **Review cost estimates:** Azure pricing changes frequently. Use the Azure Pricing Calculator to validate the cost estimate in the generated output before committing to a tier.
- **Tag everything:** Tags make cost tracking and resource management possible. The template includes standard tags, but add project-specific tags as needed.

## Related Skills

- [Security Review Checklist](/test-and-review/compliance-and-security/security-review-checklist/) — Validate the deployed infrastructure against security requirements
- [Audit Sitecore XP Configuration](/test-and-review/auditing/audit-sitecore-xp-config/) — For Sitecore-specific hosting configurations on Azure
