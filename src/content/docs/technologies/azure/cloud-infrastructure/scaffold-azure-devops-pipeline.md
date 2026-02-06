---
title: Scaffold Azure DevOps Pipeline
description: Generate a CMS-aware Azure DevOps YAML pipeline with build, test, deploy stages, environment-specific configs, and approval gates for Sitecore, Umbraco, or Optimizely projects
---

## Context & Goal

Every CMS project needs CI/CD, and every CMS platform has deployment quirks that generic pipeline templates miss. Sitecore XM Cloud uses the Sitecore CLI for serialization push and the XM Cloud Deploy API. Umbraco needs NuGet restore, ModelsBuilder generation, and Examine index handling. Optimizely uses the DXP Deployment API with slot swapping. This skill produces Azure DevOps YAML pipelines tailored to the specific CMS platform — with proper build caching, environment-specific variable groups, approval gates, and deployment strategies that account for CMS-specific concerns like serialization sync, index rebuilds, and cache invalidation.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior DevOps engineer at RBA who builds Azure DevOps pipelines for CMS projects. You know that CMS deployments are not standard web deployments — they need serialization sync (Sitecore SCS/TDS), Examine index management (Umbraco), DXP slot swapping (Optimizely), cache invalidation, and content freeze coordination. You produce pipelines that are reliable, fast, and safe — with proper approval gates so nobody accidentally deploys to production on a Friday afternoon.

Scaffold an Azure DevOps Pipeline for:

**CMS Platform:** {{CMS_PLATFORM}}
**Solution Structure:** {{SOLUTION_STRUCTURE}}
**Environments:** {{ENVIRONMENTS}}
**Hosting:** {{HOSTING}}
**Branch Strategy:** {{BRANCH_STRATEGY}}
**Quality Gates:**
{{QUALITY_GATES}}

Produce an Azure DevOps YAML Pipeline:

### 1. Pipeline Overview
- Trigger configuration (branches, paths)
- Variable groups per environment
- Agent pool selection
- Pipeline stages overview

### 2. Build Stage
```yaml
# Build stage with CMS-specific steps
stages:
- stage: Build
  jobs:
  - job: BuildAndTest
    steps:
    # [CMS-specific build steps]
    # [Unit test execution]
    # [Code quality analysis]
    # [Artifact publishing]
```

### 3. Quality Gate Stage
```yaml
- stage: QualityGate
  jobs:
  - job: Analysis
    steps:
    # [SonarQube/SonarCloud analysis]
    # [Security scanning (OWASP, dependency check)]
    # [Accessibility linting]
    # [Bundle size check]
```

### 4. Deploy Stages (per environment)
```yaml
- stage: Deploy_Dev
  jobs:
  - deployment: DeployToDev
    environment: 'dev'
    strategy:
      runOnce:
        deploy:
          steps:
          # [CMS-specific deployment steps]
          # [Serialization sync]
          # [Cache invalidation]
          # [Smoke tests]
```

### 5. CMS-Specific Pipeline Concerns

**Sitecore XM Cloud:**
- `sitecore cloud deployment create` for CM deployment
- JSS app deployment to Vercel/Netlify
- Experience Edge cache purge
- Serialization push via Sitecore CLI

**Umbraco:**
- NuGet restore with private feeds
- ModelsBuilder generation mode handling
- Examine index rebuild post-deploy
- SMIDGE cache clearing
- Zero-downtime deployment with Azure deployment slots

**Optimizely:**
- DXP Deployment API integration
- Slot swap with traffic warmup
- Scheduled job pause during deployment
- Content Graph schema sync verification

### 6. Variable Groups
```yaml
variables:
- group: '[project]-common'
- group: '[project]-[env]'
# Environment-specific secrets and configuration
```

### 7. Approval Gates
- Dev: automatic
- Staging: tech lead approval
- Production: tech lead + PM approval
- Production (hotfix): single approver with justification
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-azure-devops-pipeline/SKILL.md`:

```markdown
---
name: scaffold-azure-devops-pipeline
description: Generates CMS-aware Azure DevOps YAML pipelines with build, test, deploy stages, and platform-specific deployment steps. Use when setting up CI/CD for Sitecore, Umbraco, or Optimizely projects.
argument-hint: "[CMS platform and deployment target]"
allowed-tools: Read, Glob, Grep
---

# Scaffold Azure DevOps Pipeline

You are a senior DevOps engineer at RBA who builds CI/CD pipelines for CMS projects.

## Your Task

Scaffold an Azure DevOps pipeline for: **$ARGUMENTS**

## Process

### Step 1: Assess the Project
- Identify CMS platform and its deployment requirements
- Determine solution structure (.NET, Node.js, monorepo)
- Map environments and approval gates
- Identify quality gates (tests, scanning, analysis)

### Step 2: Generate the Pipeline
1. Trigger and variable group configuration
2. Build stage with CMS-specific steps
3. Quality gate stage (tests, security, accessibility)
4. Deploy stages per environment with approval gates
5. CMS-specific post-deploy steps (serialization, cache, indexes)
6. Rollback procedure

### Quality Check
- Pipeline includes CMS-specific deployment steps (not just generic web deploy)
- Each environment has its own variable group
- Production has approval gates
- Post-deploy includes cache invalidation and smoke tests
```

### Usage

```
/scaffold-azure-devops-pipeline Sitecore XM Cloud with Next.js — deploy CM via Sitecore Cloud, frontend to Vercel, 3 environments
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud with Next.js` or `Umbraco 13 (.NET 8)` or `Optimizely CMS 12` |
| `{{SOLUTION_STRUCTURE}}` | Project structure | `.NET 8 solution with 5 projects, Next.js frontend in /src/app` or `Single .NET 8 web project with Razor views` |
| `{{ENVIRONMENTS}}` | Target environments | `Dev (auto-deploy), Staging (approval), Production (dual approval)` |
| `{{HOSTING}}` | Hosting target | `Azure App Service (B2), Azure SQL, Azure Blob Storage` or `Sitecore Cloud (CM), Vercel (frontend)` |
| `{{BRANCH_STRATEGY}}` | Branching model | `GitFlow: develop → release/* → main` or `Trunk-based: main with feature flags` |
| `{{QUALITY_GATES}}` | Required checks | `Unit tests (>80% coverage), SonarCloud quality gate, OWASP dependency check, Lighthouse CI (>90 performance)` |

## Best Practices

- **Model choice:** Sonnet 4 — pipeline YAML follows predictable patterns. Use Opus 4 only for complex multi-stage deployments with custom orchestration.
- **Use variable groups, not inline secrets:** Every environment should have its own variable group in Azure DevOps. Never hardcode connection strings or API keys in the YAML.
- **Include CMS-specific post-deploy steps:** Generic pipelines miss serialization sync, cache invalidation, and index rebuilds. These are not optional — they're required for CMS deployments.
- **Test the rollback:** Include a rollback stage or document the manual rollback procedure. Azure deployment slots make this easy for Umbraco and Optimizely.

## Related Skills

- [Scaffold Azure PaaS Architecture](/technologies/azure/cloud-infrastructure/scaffold-azure-paas-architecture/) — The infrastructure the pipeline deploys to
- [Generate Go-Live Checklist](/roles/engineering/devops/generate-go-live-checklist/) — The go-live checklist references the pipeline for deployment verification
- [Generate Knowledge Transfer Package](/roles/engineering/devops/generate-knowledge-transfer-package/) — Pipeline documentation is part of the KT package
