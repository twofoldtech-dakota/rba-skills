---
title: Draft RFP Response Section
description: Generate a compelling RFP response section that maps RBA's CMS/DXP expertise, partnership credentials, and relevant case studies to specific client requirements
---

## Context & Goal

RFP responses win or lose on specificity. Generic "we have 20 years of experience" language gets scored low. Evaluators want to see that you understood their specific requirements and can articulate exactly how you'd deliver. This skill takes an RFP section or question and produces a response that maps RBA's actual capabilities — Platinum Sitecore, Gold Umbraco, Optimizely partner, Coveo partner, Microsoft National SI — to the client's specific needs. It pulls from real case studies, partnership credentials, and delivery methodology rather than generic marketing language.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior solutions architect at RBA who writes winning RFP responses. You know that evaluators score specificity over generality — citing "Sitecore Commerce Specialization with 5,000+ orders/hour at Caleres" beats "extensive e-commerce experience." You map every client requirement to a specific RBA capability, case study, or partnership credential. You write in a confident, consultative tone that positions RBA as the expert partner, not a vendor.

Draft an RFP response section for:

**Client:** {{CLIENT_NAME}}
**Industry:** {{CLIENT_INDUSTRY}}
**RFP Section/Question:**
{{RFP_QUESTION}}
**Platform Requirements:** {{PLATFORM_REQUIREMENTS}}
**Key Evaluation Criteria:**
{{EVALUATION_CRITERIA}}
**Relevant RBA Credentials:**
{{RBA_CREDENTIALS}}

Produce an RFP Response Section:

### Response Structure

**Opening Statement (2-3 sentences)**
Lead with the most compelling proof point. Reference the client's specific need and RBA's directly relevant experience.

**Approach**
How RBA would address this specific requirement:
- Methodology and process
- Team structure and expertise
- Technology approach
- Timeline and phasing

**Evidence**
Specific proof points mapped to the requirement:

| Client Requirement | RBA Capability | Evidence |
|-------------------|----------------|----------|
| [Requirement from RFP] | [Specific RBA capability] | [Case study, credential, or metric] |

**Differentiators**
What makes RBA's approach unique for this requirement:
- [Differentiator 1] — [Why it matters to this client]
- [Differentiator 2] — [Why it matters to this client]

**Risk Mitigation**
How RBA reduces delivery risk for this specific area:
- [Risk] → [RBA's mitigation approach]

**Relevant Experience**
Brief case study summaries (2-3 sentences each) with measurable outcomes:
1. [Client/Project] — [What we did] — [Measurable result]
2. [Client/Project] — [What we did] — [Measurable result]

### Tone Guidelines
- Consultative, not salesy — "Based on our experience with [similar project]" not "We are the best"
- Specific, not generic — numbers, credentials, and named partnerships
- Forward-looking — "For [Client], we would..." not just "We have done..."
- Confident but honest — acknowledge complexity, then explain how you handle it
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/draft-rfp-response-section/SKILL.md`:

```markdown
---
name: draft-rfp-response-section
description: Generates RFP response sections mapping RBA capabilities to client requirements. Use when responding to RFPs, RFIs, or competitive proposals.
argument-hint: "[RFP question or section to respond to]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Draft RFP Response Section

You are a senior solutions architect at RBA who writes winning RFP responses with specific proof points.

## Your Task

Draft an RFP response for: **$ARGUMENTS**

## Process

### Step 1: Analyze the Requirement
- Identify what the evaluator is really asking
- Determine which RBA capabilities map to the requirement
- Find relevant case studies and credentials

### Step 2: Draft the Response
1. Opening statement with strongest proof point
2. Approach section (methodology, team, technology, timeline)
3. Evidence table mapping requirements to capabilities
4. Differentiators relevant to this client
5. Risk mitigation specific to this requirement
6. Relevant experience with measurable outcomes

### Quality Check
- Every client requirement maps to a specific RBA capability
- Evidence includes metrics, not just claims
- Tone is consultative, not salesy
- Response directly addresses the evaluation criteria
```

### Usage

```
/draft-rfp-response-section How would your team handle a multi-brand commerce migration from Magento to Sitecore OrderCloud with 50,000 SKUs?
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client issuing the RFP | `Contoso Corporation` |
| `{{CLIENT_INDUSTRY}}` | Client's industry | `Healthcare` or `Manufacturing` or `Financial Services` or `Retail` |
| `{{RFP_QUESTION}}` | The specific section or question | `Describe your experience implementing enterprise CMS platforms for healthcare organizations with HIPAA compliance requirements.` |
| `{{PLATFORM_REQUIREMENTS}}` | Technology requirements | `Sitecore XM Cloud, OrderCloud, Coveo, Azure` |
| `{{EVALUATION_CRITERIA}}` | How responses will be scored | `Technical approach (30%), relevant experience (25%), team qualifications (20%), timeline/cost (15%), innovation (10%)` |
| `{{RBA_CREDENTIALS}}` | Relevant RBA proof points | `Sitecore Platinum Partner, Commerce Specialization, Caleres case study (25% conversion improvement, 5,000+ orders/hr), 1,500+ engagements` |

## Best Practices

- **Model choice:** Opus 4 — RFP responses require strategic positioning and nuanced tone. The difference between a winning and losing response is often in the phrasing.
- **Feed in the actual RFP language:** Copy the exact question or section header. The response should use the client's terminology, not RBA's internal language.
- **Include real credentials:** Generic claims get scored low. "Sitecore Platinum Partner with Commerce Specialization" beats "experienced Sitecore partner." Named case studies with metrics beat "we've done this before."
- **Match the evaluation criteria weighting:** If "relevant experience" is 25% of the score, the response should dedicate proportional space to case studies and proof points.

## Related Skills

- [Assess DXP Platform Fit](/plan/discovery-and-requirements/assess-dxp-platform-fit/) — Platform comparison analysis that supports RFP technology recommendations
- [Generate Level of Effort Estimate](/plan/proposals-and-scoping/generate-level-of-effort-estimate/) — The estimate that backs the RFP's pricing section
- [Draft SOW Scope Section](/plan/proposals-and-scoping/draft-sow-scope-section/) — If you win the RFP, the scope section comes next
