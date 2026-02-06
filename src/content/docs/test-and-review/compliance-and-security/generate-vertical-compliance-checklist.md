---
title: Generate Vertical Compliance Checklist
description: Produce compliance checklists for HIPAA, PCI-DSS, SOX, or FERPA tailored to CMS and Azure configurations for regulated-industry clients
---

## Context & Goal

Compliance requirements differ dramatically by industry, and generic checklists miss the CMS-specific and Azure-specific configuration items that auditors actually check. This skill produces compliance checklists tailored to RBA's core verticals — HIPAA for healthcare, PCI-DSS for retail/commerce, SOX for financial services, FERPA for education — with requirements mapped to specific CMS and Azure configuration items.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior security and compliance consultant at a digital consulting agency. You map regulatory requirements to specific CMS and Azure configuration items — not generic security advice, but "check this Azure setting" and "configure this CMS permission" level detail. You understand HIPAA, PCI-DSS, SOX, FERPA, and GDPR requirements as they apply to web applications, CMS platforms, and cloud infrastructure.

Generate a compliance checklist for:

**Client:** {{CLIENT_NAME}}
**Industry:** {{INDUSTRY}}
**Compliance Framework(s):** {{COMPLIANCE_FRAMEWORKS}}
**CMS Platform:** {{CMS_PLATFORM}}
**Azure Resources:**
{{AZURE_RESOURCES}}
**Data Handling:**
{{DATA_HANDLING}}

Produce a Vertical Compliance Checklist:

### 1. Compliance Overview
- Applicable regulations and standards
- Scope of compliance (which systems and data are in scope)
- Key compliance contacts (client DPO, legal, IT security)
- Audit frequency and next expected audit date

### 2. Data Classification
| Data Type | Classification | Storage | Encryption | Retention | Disposal |
|-----------|---------------|---------|------------|-----------|----------|

### 3. CMS Platform Compliance Items
| # | Requirement | Regulation Ref | CMS Configuration | Status |
|---|------------|----------------|-------------------|--------|

Cover:
- User authentication and password policies
- Role-based access control configuration
- Content approval workflows
- Audit logging (who changed what, when)
- PII handling in content fields
- Media file access controls
- Session management and timeout
- Multi-factor authentication

### 4. Azure Infrastructure Compliance Items
| # | Requirement | Regulation Ref | Azure Configuration | Status |
|---|------------|----------------|---------------------|--------|

Cover:
- Encryption at rest (Azure SQL TDE, Blob encryption)
- Encryption in transit (TLS 1.2+, forced HTTPS)
- Network security (NSGs, private endpoints, WAF)
- Identity management (Azure AD, Conditional Access)
- Key management (Key Vault, key rotation)
- Logging and monitoring (Azure Monitor, Activity Log)
- Backup and recovery (geo-redundant, tested restores)
- Patch management (update management solution)
- Access reviews (periodic permission reviews)

### 5. Application Security Items
| # | Requirement | Regulation Ref | Implementation | Status |
|---|------------|----------------|----------------|--------|

Cover:
- Input validation and output encoding
- CSRF protection
- Content Security Policy headers
- Secure cookie configuration
- API authentication and rate limiting
- File upload validation
- Error handling (no sensitive data in errors)
- Dependency vulnerability scanning

### 6. Vertical-Specific Requirements

**HIPAA (Healthcare):**
- BAA (Business Associate Agreement) status with all vendors
- PHI access logging and monitoring
- Minimum necessary access principle
- Breach notification procedure
- Patient consent management in CMS

**PCI-DSS (Retail/Commerce):**
- Cardholder data environment scope
- Payment page security (iframe isolation, CSP)
- Tokenization vs encryption for card data
- Quarterly vulnerability scans
- Annual penetration testing

**SOX (Financial Services):**
- Change management controls
- Separation of duties
- Financial data integrity controls
- Audit trail for financial transactions
- Access certification reviews

**FERPA (Education):**
- Student record access controls
- Directory information opt-out handling
- Third-party data sharing agreements
- Parental consent workflows

### 7. Third-Party and Integration Compliance
| Integration | Data Shared | DPA/BAA Status | Compliance Certification |
|-------------|-------------|----------------|------------------------|

### 8. Incident Response Requirements
- Breach detection requirements
- Notification timelines by regulation
- Documentation requirements
- Regulatory reporting contacts

### 9. Evidence Collection Guide
For each checklist item, what evidence the auditor will request:
| Checklist Item | Evidence Required | Where to Find It |
|---------------|-------------------|-----------------|

### 10. Remediation Priority Matrix
| Finding | Compliance Risk | Effort | Priority |
|---------|----------------|--------|----------|
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-vertical-compliance-checklist/SKILL.md`:

```markdown
---
name: generate-vertical-compliance-checklist
description: Produces compliance checklists for HIPAA, PCI-DSS, SOX, or FERPA mapped to CMS and Azure configuration items. Use at project kickoff and before go-live for regulated-industry clients.
argument-hint: "[client industry and compliance framework]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Generate Vertical Compliance Checklist

You are a compliance consultant who maps regulations to specific CMS and Azure configuration items.

## Your Task

Generate a compliance checklist for: **$ARGUMENTS**

## Process

### Step 1: Determine Scope
- Identify applicable regulations based on industry and data types
- Read any existing security documentation or compliance assessments
- Inventory CMS platform configuration and Azure resources
- Determine which data types are in scope

### Step 2: Generate Checklist
Produce:
1. Compliance overview with scope and contacts
2. Data classification table
3. CMS platform compliance items with specific configurations
4. Azure infrastructure compliance items
5. Application security items
6. Vertical-specific requirements (HIPAA/PCI/SOX/FERPA)
7. Third-party integration compliance
8. Incident response requirements
9. Evidence collection guide
10. Remediation priority matrix

### Quality Check
- Every checklist item maps to a specific regulation reference
- CMS items reference actual configuration settings
- Azure items reference specific Azure features and settings
- Evidence guide tells auditors exactly where to find proof
```

### Usage

```
/generate-vertical-compliance-checklist Contoso Healthcare — HIPAA compliance for Sitecore XM Cloud on Azure
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Healthcare Network` |
| `{{INDUSTRY}}` | Client's industry | `Healthcare — hospital network, patient-facing web portal` |
| `{{COMPLIANCE_FRAMEWORKS}}` | Applicable regulations | `HIPAA, GDPR (EU patients), WCAG 2.2 AA` |
| `{{CMS_PLATFORM}}` | CMS platform | `Sitecore XM Cloud` |
| `{{AZURE_RESOURCES}}` | Azure infrastructure | `App Service, Azure SQL, Blob Storage, Redis Cache, Front Door, Key Vault, Azure AD B2C` |
| `{{DATA_HANDLING}}` | Types of data processed | `Patient appointment requests (name, DOB, insurance ID), physician directory, health content, location information, job applications` |

## Best Practices

- **Model choice:** Use Opus 4 — compliance requires careful reasoning about regulatory requirements and their technical implementations.
- **Run at kickoff AND pre-launch:** The kickoff checklist identifies what to build. The pre-launch checklist verifies it's built correctly.
- **Engage client legal early:** Compliance decisions (especially data residency and consent management) need legal input that takes time to get.
- **Keep the evidence guide updated:** Auditors follow the evidence. If you know where to find it, audits go smoothly.

## Related Skills

- [Audit Regulatory Compliance](/test-and-review/compliance-and-security/audit-regulatory-compliance/) — Broader regulatory compliance audit beyond vertical-specific checklists
- [Security Review Checklist](/test-and-review/compliance-and-security/security-review-checklist/) — Security review that feeds into compliance evidence
