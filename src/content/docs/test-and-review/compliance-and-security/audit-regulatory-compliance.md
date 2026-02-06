---
title: Audit Regulatory Compliance
description: Review a project or system against regulatory requirements like GDPR, HIPAA, SOC 2, CCPA, or ADA with a structured findings report
---

## Context & Goal

RBA delivers solutions for clients in healthcare, financial services, education, and government — all with specific regulatory requirements. Before launch, during periodic reviews, or ahead of a formal audit, teams need a structured compliance assessment tailored to the applicable regulations. This skill produces a regulation-by-regulation audit identifying gaps, rating risks, and recommending remediations before they become audit findings or legal liabilities.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior compliance analyst with expertise in GDPR, HIPAA, SOC 2, CCPA, ADA/Section 508, and PCI DSS as they apply to web applications and CMS platforms (Sitecore, Umbraco, Optimizely). You've conducted regulatory compliance audits for enterprise digital solutions across healthcare, financial services, education, and government sectors.

Conduct a regulatory compliance audit for the following:

**Project Name:** {{PROJECT_NAME}}
**Applicable Regulations:** {{REGULATIONS}}
**System Description:** {{SYSTEM_DESCRIPTION}}
**Data Types Handled:** {{DATA_TYPES_HANDLED}}
**Deployment Environment:** {{DEPLOYMENT_ENVIRONMENT}}
**Existing Controls:** {{EXISTING_CONTROLS}}

Produce a comprehensive compliance audit report with:

1. **Executive Summary** — Overall compliance posture (Compliant / Partially Compliant / Non-Compliant) with a 2-3 sentence assessment and top risks

2. **Compliance Scope** — Define the audit boundary: which systems, data flows, and user interactions are in scope. Identify the specific regulatory articles, sections, or controls that apply based on the system description and data types.

3. **Regulation-by-Regulation Review** — For EACH regulation listed in {{REGULATIONS}}, produce:
   - **Applicable Requirements** — Specific articles, sections, or controls that apply (e.g., GDPR Article 6, HIPAA §164.312)
   - **Current State Assessment** — What the system currently does based on the existing controls described
   - **Gap Analysis** — Specific areas where the system does not meet the requirement
   - **Risk Rating** — Critical / High / Medium / Low for each gap, based on likelihood of enforcement action and impact of non-compliance
   - **Evidence Required** — What documentation or artifacts would demonstrate compliance

4. **Data Handling Review**
   - **Collection** — How data enters the system (forms, APIs, imports), consent mechanisms, minimization practices
   - **Storage** — Where data is stored, encryption at rest, retention policies
   - **Processing** — What processing occurs, lawful basis (GDPR), minimum necessary (HIPAA)
   - **Retention** — Retention schedules by data type, automated deletion processes
   - **Deletion** — Right to erasure procedures, data subject request workflows

5. **Consent and Privacy Controls** — Cookie consent implementation, privacy policy adequacy, user preference management, opt-out mechanisms, data subject rights (access, rectification, portability, erasure)

6. **Access Control Assessment** — Role-based access controls, principle of least privilege, admin access audit trails, multi-factor authentication, service account management

7. **Audit Logging Review** — What events are logged, log retention period, tamper protection, ability to reconstruct user activity, incident detection capability

8. **Third-Party Data Processing** — Inventory of sub-processors, data processing agreements (DPAs), third-party risk assessments, cross-border data transfer mechanisms (SCCs, adequacy decisions, BCRs)

9. **Cross-Border Data Transfer** — Where data is stored geographically, transfer mechanisms, adequacy decisions, supplementary measures

10. **Remediation Roadmap** — Prioritized list of findings organized by:
    - **Critical** (address immediately — active non-compliance with enforcement risk)
    - **High** (address within 30 days — significant gaps)
    - **Medium** (address within 90 days — improvements needed)
    - **Low** (address within 180 days — best practice enhancements)
    For each item: finding ID, regulation, requirement, current gap, recommended action, estimated effort

11. **Documentation Requirements** — List of policies, procedures, and records needed to demonstrate compliance (privacy policy, data processing register, incident response plan, DPIA, BAA, etc.)

For each finding, be specific about the regulatory requirement, the current gap, and the exact remediation needed. Reference specific regulation articles or sections by number.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/audit-regulatory-compliance/SKILL.md`:

```markdown
---
name: audit-regulatory-compliance
description: Conducts a regulatory compliance audit against GDPR, HIPAA, SOC 2, CCPA, ADA/Section 508, or PCI DSS for web applications and CMS platforms. Use before production launches, during periodic compliance reviews, or when preparing for a formal audit.
argument-hint: "[project name and regulations to audit against]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Audit Regulatory Compliance

You are a senior compliance analyst with expertise in GDPR, HIPAA, SOC 2, CCPA, ADA/Section 508, and PCI DSS as they apply to web applications and CMS platforms.

## Your Task

Conduct a regulatory compliance audit for: **$ARGUMENTS**

## Process

### Step 1: Discover the System
- Read configuration files, environment setup, and deployment manifests to understand the system architecture
- Search for data handling code: forms, API endpoints, database queries, user authentication
- Check for existing privacy controls: cookie consent, privacy policy links, data subject request flows
- Identify third-party integrations and data processors (analytics, CDNs, payment gateways)
- Look for logging configuration, access control patterns, and encryption settings

### Step 2: Map Data Flows
- Trace how personal data enters the system (forms, APIs, imports)
- Identify where data is stored (databases, file storage, caches, logs)
- Document processing activities and their lawful basis
- Check for cross-border data transfers (CDN endpoints, third-party services)

### Step 3: Audit Against Each Regulation
For each applicable regulation:
1. Identify the specific requirements that apply
2. Assess current controls against those requirements
3. Document gaps with risk ratings
4. Specify evidence needed for compliance

### Step 4: Produce Report
- Executive summary with overall compliance posture
- Regulation-by-regulation findings
- Prioritized remediation roadmap (Critical > High > Medium > Low)
- Documentation requirements checklist

### Quality Check
- Every finding references a specific regulation article or section
- Risk ratings are justified by enforcement likelihood and impact
- Remediation actions are specific and actionable (not generic advice)
- Data flow mapping covers collection, storage, processing, retention, and deletion
- Third-party processors are inventoried with DPA status
```

### Usage

```
/audit-regulatory-compliance HealthCo patient portal — HIPAA and SOC 2 compliance review
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Name of the project or system being audited | `HealthCo Patient Portal` or `Contoso E-Commerce Platform` |
| `{{REGULATIONS}}` | Comma-separated list of applicable regulations | `GDPR, CCPA` or `HIPAA, SOC 2 Type II, ADA Section 508` |
| `{{SYSTEM_DESCRIPTION}}` | What the system does, its architecture, and user interactions | `Patient portal built on Sitecore XM Cloud with Next.js front-end. Users create accounts, view lab results, schedule appointments, and message providers. Hosted on Azure App Service with Azure SQL backend.` |
| `{{DATA_TYPES_HANDLED}}` | Types of personal or sensitive data the system processes | `PHI (lab results, diagnoses, medications), PII (name, DOB, SSN, address), payment card data for copays` |
| `{{DEPLOYMENT_ENVIRONMENT}}` | Where and how the system is deployed | `Azure App Service (East US), Azure SQL, Azure Blob Storage, Cloudflare CDN` |
| `{{EXISTING_CONTROLS}}` | Current security and compliance controls already in place | `Azure AD SSO with MFA, TLS 1.2 everywhere, Azure SQL TDE, cookie consent banner (OneTrust), annual penetration test` |

## Best Practices

- **Model choice:** Use Opus 4 for compliance audits. Regulatory analysis requires deep reasoning about how specific code and configuration patterns map to legal requirements — Opus handles nuance and cross-regulation conflicts significantly better than Sonnet 4. Use Sonnet 4 only for quick gap checks against a single, well-defined regulation.
- **Be exhaustive with data types:** The more specific you are about what data the system handles, the more precise the audit findings. "User data" is too vague — specify "email, name, DOB, SSN, lab results, payment card number."
- **Include existing controls:** Listing what you already have prevents the audit from flagging solved problems. This keeps the report focused on actual gaps.
- **Pair with legal review:** AI-generated compliance audits are a starting point, not legal advice. Use this output to prepare for a review with your compliance officer or outside counsel.
- **Iterate by regulation:** If the initial report covers five regulations, follow up with "expand the HIPAA section — include all §164.312 technical safeguards" to go deeper on specific areas.

## Related Skills

- [Security Review Checklist](/test-and-review/compliance-and-security/security-review-checklist/) — Security controls underpin most compliance requirements
- [Audit WCAG Compliance](/test-and-review/auditing/audit-wcag-compliance/) — ADA/Section 508 compliance overlaps with WCAG accessibility audits
