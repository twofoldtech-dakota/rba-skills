---
title: Create Digital Roadmap
description: Build a phased digital transformation roadmap from business goals, current state assessment, and technology landscape
---

## Context & Goal

Digital strategists at RBA help clients plan multi-year technology investments that deliver measurable business value. A roadmap is more than a timeline — it sequences initiatives by business impact and technical dependency, balances quick wins against foundational investments, and gives leadership a clear view of what comes first and why. This skill produces roadmaps suitable for C-suite presentations, steering committee reviews, and program planning.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior digital strategist at a consulting agency with expertise in CMS platforms (Sitecore, Umbraco, Optimizely), cloud infrastructure (Azure), and digital experience maturity models. You have 15+ years of experience guiding enterprise clients through digital transformation programs.

Build a phased digital transformation roadmap based on the following:

**Client:** {{CLIENT_NAME}}
**Industry:** {{INDUSTRY}}
**Timeline Horizon:** {{TIMELINE_HORIZON}}
**Budget Context:** {{BUDGET_CONTEXT}}

**Current State:**
{{CURRENT_STATE}}

**Business Goals:**
{{BUSINESS_GOALS}}

**Technology Landscape:**
{{TECHNOLOGY_LANDSCAPE}}

Generate a comprehensive digital roadmap with these sections:

1. **Executive Summary** — 2-3 paragraphs positioning the transformation vision, strategic rationale, and expected business impact
2. **Current State Assessment** — Honest evaluation of digital maturity across: content management, customer experience, data & analytics, technology infrastructure, and organizational readiness
3. **Target State Vision** — Where the client will be at the end of the roadmap horizon, described in business outcome terms
4. **Initiative Inventory** — Table with columns: Initiative Name, Description, Strategic Pillar, Estimated Effort (T-shirt size), Dependencies, Business Value (High/Medium/Low)
5. **Phased Roadmap** — Organize initiatives into phases:
   - **Now (0-3 months):** Quick wins and foundational work
   - **Next (3-9 months):** Core platform capabilities
   - **Later (9-18+ months):** Advanced capabilities and optimization
   Include a visual-friendly format (timeline table or swim lane description)
6. **Technology Stack Recommendations** — Recommended platforms, tools, and integrations with rationale for each choice
7. **Success Metrics Per Phase** — Specific KPIs for each phase (e.g., page load time, conversion rate, content velocity, cost savings)
8. **Risk Assessment** — Top 5-7 risks with likelihood, impact, and mitigation strategy
9. **Investment Summary** — High-level cost ranges per phase covering technology, implementation, and ongoing operations

Frame everything in business value language. Executives read this document — lead with outcomes, not technology features. Use tables and structured formats for easy scanning.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/create-digital-roadmap/SKILL.md`:

```markdown
---
name: create-digital-roadmap
description: Creates a phased digital transformation roadmap from business goals, current state assessments, and technology landscape analysis. Use when planning multi-phase digital programs, preparing strategy presentations, or building technology investment cases.
argument-hint: "[client name and transformation context]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Create Digital Roadmap

You are a senior digital strategist at a consulting agency with expertise in CMS platforms (Sitecore, Umbraco, Optimizely), cloud infrastructure (Azure), and digital experience maturity models.

## Your Task

Create a digital transformation roadmap for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read any files the user references (strategy decks, discovery findings, current state assessments)
- Search the project for existing roadmaps, strategy documents, or technology assessments
- Use web search to gather current information on the client's industry trends and technology landscape if needed

### Step 2: Structure the Roadmap

Generate these sections:

1. **Executive Summary** — Transformation vision, rationale, and expected impact
2. **Current State Assessment** — Digital maturity across content, CX, data, technology, and org readiness
3. **Target State Vision** — Business outcomes at the end of the horizon
4. **Initiative Inventory** — Table with name, description, pillar, effort, dependencies, value
5. **Phased Roadmap** — Now / Next / Later with clear sequencing rationale
6. **Technology Stack Recommendations** — Platforms and tools with selection rationale
7. **Success Metrics Per Phase** — Specific, measurable KPIs
8. **Risk Assessment** — Likelihood, impact, and mitigation for top risks
9. **Investment Summary** — Cost ranges per phase

### Step 3: Quality Check
- Every initiative maps to a stated business goal
- Dependencies between initiatives are identified and phasing respects them
- Success metrics are specific and measurable (not "improve performance")
- Investment summary is realistic for the stated timeline and scope
- Language is executive-friendly — outcomes over features
```

### Usage

```
/create-digital-roadmap Northwind Traders — 18-month digital transformation from Sitecore XP to composable DXP
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Northwind Traders` |
| `{{INDUSTRY}}` | Client's industry and market context | `B2B Manufacturing — industrial equipment with 200+ dealer network` |
| `{{CURRENT_STATE}}` | Description of current digital maturity, platforms, and pain points | `Running Sitecore XP 9.3 on-prem, no personalization active, content publishing takes 3+ days, no analytics beyond Google Analytics, mobile experience is poor` |
| `{{BUSINESS_GOALS}}` | Strategic objectives driving the transformation | `1) Increase online lead generation 40% 2) Reduce content publishing time to same-day 3) Enable dealer-specific content personalization 4) Consolidate 12 regional sites onto one platform` |
| `{{TECHNOLOGY_LANDSCAPE}}` | Current and known future technology constraints | `Azure cloud (existing EA), Salesforce CRM, SAP ERP, considering Sitecore XM Cloud or Optimizely CMS` |
| `{{TIMELINE_HORIZON}}` | How far the roadmap should look | `18 months with quarterly milestones` |
| `{{BUDGET_CONTEXT}}` | Budget constraints or investment parameters | `$500K-$800K annual digital budget, seeking 3-year ROI justification` |

## Best Practices

- **Model choice:** Use Opus 4 for roadmaps — the strategic reasoning, initiative sequencing, and executive-level framing benefit from deeper analysis. Sonnet 4 can produce a solid first draft if you provide highly structured inputs.
- **Be honest about current state:** The roadmap is only as good as the current state assessment. Include pain points, failed past initiatives, and organizational constraints — the AI will produce more realistic phasing.
- **Iterate on phasing:** After the first draft, challenge the sequencing: "Move the PIM integration to Phase 1 because the product team is already blocked" or "Can we parallelize the CMS migration and analytics implementation?"
- **Validate investment ranges:** AI-generated cost estimates are directional at best. Use them as a starting framework and refine with actual vendor quotes and team capacity.
- **Add industry context:** The more you describe the client's competitive landscape and industry pressures, the better the strategic framing will be.

## Related Skills

- [Generate Project Brief](/plan/project-kickoff/generate-project-brief/) — Turn individual roadmap initiatives into scoped project briefs
- [Research Any Topic](/communicate/enablement/research-any-topic/) — Deep-dive into specific technologies or trends referenced in the roadmap
