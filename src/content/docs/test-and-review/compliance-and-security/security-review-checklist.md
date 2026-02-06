---
title: Security Review Checklist
description: Review code and configuration against OWASP Top 10 and platform-specific security best practices
---

## Context & Goal

Every RBA deployment should pass a security review before going to production. This skill generates a structured security review tailored to your tech stack and deployment environment, checking against OWASP Top 10 and platform-specific vulnerabilities. The output is a checklist that a developer or architect can work through systematically.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior application security engineer with expertise in web application security, OWASP Top 10, and CMS platform security (Sitecore, Umbraco, Optimizely). You've conducted security reviews for enterprise deployments on Azure and AWS.

Generate a security review checklist for the following:

**Tech Stack:** {{TECH_STACK}}
**Deployment Environment:** {{DEPLOYMENT_ENVIRONMENT}}
**Compliance Requirements:** {{COMPLIANCE_REQUIREMENTS}}
**Review Scope:** {{REVIEW_SCOPE}}

Produce a comprehensive checklist organized by OWASP Top 10 (2021) categories:

### For each OWASP category:

1. **A01: Broken Access Control**
   - Specific checks for this tech stack
   - Configuration items to verify
   - Code patterns to look for

2. **A02: Cryptographic Failures**
   - TLS/SSL configuration
   - Data encryption at rest and in transit
   - Secret management practices

3. **A03: Injection**
   - SQL injection vectors in this stack
   - XSS prevention measures
   - Template injection risks (specific to CMS)

4. **A04: Insecure Design**
   - Authentication flow review
   - Authorization model validation
   - Business logic security

5. **A05: Security Misconfiguration**
   - Platform-specific configuration (Sitecore/Umbraco/Optimizely hardening)
   - HTTP security headers
   - Error handling and information disclosure

6. **A06: Vulnerable and Outdated Components**
   - Dependency audit guidance
   - Known CVEs for this stack
   - Update strategy

7. **A07: Identification and Authentication Failures**
   - Session management
   - Password policies
   - MFA implementation

8. **A08: Software and Data Integrity Failures**
   - CI/CD pipeline security
   - Deployment integrity
   - Third-party code review

9. **A09: Security Logging and Monitoring Failures**
   - Logging completeness
   - Alert configuration
   - Incident response readiness

10. **A10: Server-Side Request Forgery (SSRF)**
    - URL validation
    - Internal network access controls
    - Webhook/integration security

For each check item, provide:
- [ ] The specific check (as a checkbox)
- What to look for
- What a passing result looks like
- Common failures specific to this tech stack
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/security-review-checklist/SKILL.md`:

```markdown
---
name: security-review-checklist
description: Generates a security review checklist based on OWASP Top 10 tailored to your tech stack and deployment. Use before production deployments, during security audits, or for code review.
argument-hint: "[tech stack and deployment context]"
allowed-tools: Read, Glob, Grep
---

# Security Review Checklist

You are a senior application security engineer with expertise in OWASP Top 10 and CMS platform security.

## Your Task

Generate a security review checklist for: **$ARGUMENTS**

## Process

### Step 1: Discover the Stack
- Read package.json, project files, and configuration to identify the tech stack
- Search for authentication/authorization code patterns
- Check for security headers, CORS configuration, CSP policies
- Identify deployment configuration (Docker, Azure, AWS)

### Step 2: Generate Checklist
Produce checks organized by OWASP Top 10 (2021), tailored to the discovered stack:
- Access control patterns
- Cryptographic configuration
- Injection prevention
- Security configuration
- Dependency vulnerabilities
- Authentication implementation
- Logging and monitoring

### Step 3: Highlight Critical Findings
If any immediate security concerns are found during analysis, flag them prominently at the top of the report.

### Quality Check
- Checks are specific to the actual tech stack (not generic)
- Each item has a clear pass/fail criteria
- Platform-specific hardening items are included
```

### Usage

```
/security-review-checklist Sitecore XM Cloud on Azure with Next.js front-end
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{TECH_STACK}}` | Full technology stack | `Sitecore XM Cloud, Next.js 14, .NET 8 API, Azure App Service` |
| `{{DEPLOYMENT_ENVIRONMENT}}` | Where and how it's deployed | `Azure App Service (Production), Azure Front Door CDN, Azure SQL` |
| `{{COMPLIANCE_REQUIREMENTS}}` | Regulatory or compliance standards | `SOC 2 Type II, HIPAA (PHI in user profiles)` or `None specific` |
| `{{REVIEW_SCOPE}}` | What specifically to review | `Full application review before production launch` or `API layer only — new payment integration` |

## Best Practices

- **Model choice:** Use Opus 4 for security reviews. The thoroughness and reasoning depth matter here — a missed vulnerability is worse than a slower response.
- **Be specific about scope:** A focused review ("API authentication flow only") produces more actionable results than "review everything."
- **Combine with tools:** This checklist is AI-generated guidance. Pair it with automated scanners (OWASP ZAP, Snyk, npm audit) for comprehensive coverage.
- **Document findings:** Use the checklist as a living document — check items off as you verify them and note any exceptions.

## Related Skills

- [Core Web Vitals Audit](/test-and-review/auditing/core-web-vitals-audit/) — Performance and security reviews often overlap (e.g., CDN configuration)
- [Audit WCAG Compliance](/test-and-review/auditing/audit-wcag-compliance/) — Accessibility, security, and performance form the "non-functional trifecta"
