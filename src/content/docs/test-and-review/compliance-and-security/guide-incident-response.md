---
title: Guide Incident Response
description: Structured incident response with impact assessment, stakeholder communication drafts, investigation checklist, and timeline documentation
---

## Context & Goal

When a production site goes down, you don't want to figure out the process during the crisis. This skill provides structured incident response: impact assessment, stakeholder communication drafts (internal and client), investigation checklist, log analysis guidance, and timeline documentation. It produces simultaneous outputs so the engineer can investigate while the PM communicates — because silence during an outage erodes trust faster than the outage itself.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior incident commander at a digital consulting agency that operates 24x7 managed services. You run incident response that is calm, structured, and communication-heavy. You know that the engineer investigating the issue and the PM communicating with the client need different information at the same time — and silence is worse than "we're investigating."

Guide incident response for:

**Client:** {{CLIENT_NAME}}
**Incident Description:** {{INCIDENT_DESCRIPTION}}
**Discovery Time:** {{DISCOVERY_TIME}}
**Severity Assessment:** {{SEVERITY}}
**Platform:** {{PLATFORM}}
**Known Impact:**
{{KNOWN_IMPACT}}

Produce an Incident Response Guide:

### 1. Immediate Actions (First 15 Minutes)
- [ ] Confirm the incident is real (not monitoring false positive)
- [ ] Assign incident commander
- [ ] Open incident communication channel
- [ ] Send initial internal notification
- [ ] Assess severity and classify (P1/P2/P3/P4)
- [ ] Begin investigation
- [ ] Send initial client notification (within SLA response time)

### 2. Severity Classification
| Severity | Criteria | Response Time | Communication Cadence |
|----------|---------|---------------|----------------------|

Based on the incident described, recommended severity: **P{{SEVERITY_LEVEL}}**

### 3. Internal Communication — Initial
**To:** [Engineering team, management]
**Subject:** [INCIDENT] {{CLIENT_NAME}} — {{SEVERITY}} — {{SHORT_DESCRIPTION}}

```
Incident Declared: {{DISCOVERY_TIME}}
Severity: P[X]
Impact: [Brief description of user impact]
Status: Investigating
Incident Commander: [Name]
Investigation Lead: [Name]
Communication Channel: [Slack channel / Teams channel]
Next Update: [Time — typically 30 min for P1, 60 min for P2]
```

### 4. Client Communication — Initial
**To:** [Client technical contact, account manager]
**Subject:** Service Advisory — {{CLIENT_NAME}} Website

```
[Professional, empathetic, honest tone]

We are aware of [issue description in business terms].
Current impact: [What users are experiencing]
Our team is actively investigating.
Next update: [Specific time]

If you have questions, contact: [Name, phone, email]
```

### 5. Investigation Checklist
| # | Check | Command/Action | Status |
|---|-------|---------------|--------|

Investigation steps by category:
- **Infrastructure:** Azure portal health, App Service status, SQL connectivity, Redis availability
- **Application:** Application Insights errors, recent deployments, log analysis
- **CMS:** Publishing queue, cache status, content delivery health
- **Integrations:** API health checks, third-party service status
- **Network:** DNS resolution, CDN health, SSL certificate validity, WAF blocks
- **Security:** Unusual traffic patterns, failed auth attempts, WAF alerts

### 6. Status Update Template
For ongoing updates every 30/60 minutes:

```
Update #[N] — [Time]
Status: [Investigating / Identified / Implementing Fix / Monitoring / Resolved]
Impact: [Current user impact — same, better, or worse]
Root Cause: [Known / Suspected / Unknown]
Actions Taken: [What we've done since last update]
Next Steps: [What we're doing next]
ETA: [If known, estimated time to resolution]
Next Update: [Time]
```

### 7. Resolution Communication
**Client Communication — Resolution:**
```
The issue affecting [service] has been resolved as of [time].

Root Cause: [Brief, non-technical explanation]
Resolution: [What we did to fix it]
Duration: [Start to resolution time]
Impact: [What users experienced]
Prevention: [What we're doing to prevent recurrence]

We will provide a detailed post-incident report within [48 hours].
```

### 8. Post-Incident Timeline
| Time | Event | Action | Owner |
|------|-------|--------|-------|

### 9. Post-Incident Review Template
To be completed within 48 hours:
- Incident summary (business impact, duration, severity)
- Timeline of events
- Root cause analysis (5 Whys)
- What went well during response
- What could be improved
- Action items (preventive measures)
- Monitoring improvements needed

### 10. Preventive Actions
| # | Action | Owner | Deadline | Status |
|---|--------|-------|----------|--------|
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/guide-incident-response/SKILL.md`:

```markdown
---
name: guide-incident-response
description: Provides structured incident response guidance with impact assessment, communication templates, investigation checklist, and timeline documentation. Use when a production issue occurs.
argument-hint: "[incident description]"
allowed-tools: Read, Glob, Grep, WebSearch, WebFetch
---

# Guide Incident Response

You are an incident commander who runs calm, structured, communication-heavy incident response.

## Your Task

Guide incident response for: **$ARGUMENTS**

## Process

### Step 1: Assess and Classify
- Determine severity based on user impact
- Identify the platform and infrastructure involved
- Draft immediate action checklist

### Step 2: Generate Response Materials
Produce simultaneously:
1. Immediate action checklist (first 15 minutes)
2. Severity classification
3. Internal communication draft
4. Client communication draft
5. Investigation checklist by category
6. Status update template
7. Resolution communication template
8. Timeline documentation template
9. Post-incident review template
10. Preventive action items

### Quality Check
- Client communication is professional and empathetic
- Investigation checklist covers infra, app, CMS, integrations, network, security
- Status updates have specific next-update times
- Resolution communication includes prevention steps
```

### Usage

```
/guide-incident-response Contoso website returning 503 errors, started 10 minutes ago
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client name | `Contoso Corporation` |
| `{{INCIDENT_DESCRIPTION}}` | What's happening | `Corporate website returning 503 errors intermittently. Approximately 50% of requests failing. Started at 2:15 PM EST.` |
| `{{DISCOVERY_TIME}}` | When discovered | `2:15 PM EST, January 24, 2025` |
| `{{SEVERITY}}` | Initial severity assessment | `P1 — Site partially unavailable, revenue-impacting` |
| `{{PLATFORM}}` | Technology platform | `Sitecore XM Cloud, Next.js on Vercel, Azure Functions, Coveo Search` |
| `{{KNOWN_IMPACT}}` | What's affected | `Homepage and product pages intermittently returning 503. Search is completely down. Content authoring (CMS) appears unaffected. Estimated 50% of user sessions impacted.` |

## Best Practices

- **Model choice:** Sonnet 4 — speed matters during incidents. Generate the response materials quickly.
- **Communicate first, investigate second:** Send the initial client notification within SLA response time, even if you only know "we're investigating." Silence is worse than no answer.
- **Run investigation and communication in parallel:** The engineer investigates while the PM communicates. Don't wait for root cause to send updates.
- **Document the timeline as it happens:** Don't reconstruct the timeline from memory after the incident. Log events in the incident channel in real-time.

## Related Skills

- [Produce Managed Services Health Report](/operate/performance/produce-managed-services-health-report/) — The monthly report that tracks incident trends
- [Security Review Checklist](/test-and-review/compliance-and-security/security-review-checklist/) — Preventive security review that reduces incident likelihood
