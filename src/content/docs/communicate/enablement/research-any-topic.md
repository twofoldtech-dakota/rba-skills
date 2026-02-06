---
title: Research Any Topic
description: Conduct deep, systematic research on any technical or business topic with structured findings and source citations
---

## Context & Goal

Research is a cross-role skill used by everyone at RBA — strategists researching competitors, designers evaluating design systems, engineers comparing frameworks, and PMs investigating tools. This skill produces structured, source-cited research reports following a systematic methodology.

Adapted from RBA's internal `/research` Claude Code skill.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior research analyst with expertise across software engineering, cloud infrastructure, business technology, and emerging tech. You produce research that is thorough, balanced, well-sourced, and actionable — not surface-level summaries.

Research the following topic:

**Topic:** {{RESEARCH_TOPIC}}

**Scope:** {{SCOPE}}

**Research Type:** {{RESEARCH_TYPE}}

Follow this methodology:

### Phase 1: Frame the Research
- Restate the topic as a precise, answerable core question
- Break into 3-5 sub-questions that collectively answer it
- Define what's in scope and out of scope

### Phase 2: Gather Evidence
Prioritize sources in this order:
1. Official documentation and specifications (highest weight)
2. Source code and repositories
3. Published benchmarks and peer-reviewed research
4. Technical blog posts from recognized experts
5. Community discussions (context only)

For each finding, track the claim, source, date, and confidence level (High/Medium/Low).

### Phase 3: Analyze and Synthesize
- Compare and contrast findings (don't just list them)
- Identify where sources agree (consensus) and disagree (contradictions)
- Quantify when possible — "3x faster" beats "significantly faster"
- Consider source bias and recency

### Phase 4: Deliver Findings

Structure your report as:

1. **Executive Summary** — 2-3 sentences answering the core question
2. **Key Findings** — Each with evidence, source, and confidence level
3. **Comparison Matrix** (when evaluating options) — Table format
4. **Risks and Considerations** — Caveats and limitations
5. **Recommendations** — Specific, actionable next steps
6. **Sources** — Numbered list with URLs and access dates

Never present speculation as fact. Always cite sources. Acknowledge gaps — say what you couldn't find.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

The Research skill is already available as a Claude Code skill. Install it from this repository:

```bash
# Copy the skill to your project or global skills directory
cp -r .claude/skills/research/ ~/.claude/skills/research/
```

Or for project-level installation:
```bash
cp -r .claude/skills/research/ .claude/skills/research/
```

### Usage

```
/research Sitecore XM Cloud vs. Umbraco Heartcore for headless content delivery
/research Azure Front Door vs. Cloudflare for CDN in Sitecore deployments
/research WCAG 2.2 changes relevant to CMS-driven websites
```

The Claude Code version includes web search and codebase analysis capabilities not available in the copy-paste prompt.

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{RESEARCH_TOPIC}}` | The topic or question to research | `Sitecore XM Cloud vs. Umbraco v13 for headless content delivery` |
| `{{SCOPE}}` | What to include and exclude | `Focus on developer experience, content modeling, and hosting costs. Exclude legacy on-premise comparisons.` |
| `{{RESEARCH_TYPE}}` | Type of research to conduct | `Technology Evaluation`, `Competitive Analysis`, `Feasibility Study`, `Root Cause Analysis`, or `Market Research` |

## Best Practices

- **Model choice:** Use Opus 4 for research. The depth of analysis, source evaluation, and synthesis quality are significantly better with the most capable model.
- **Be specific about scope:** "Research Sitecore" is too broad. "Compare XM Cloud content modeling to Umbraco v13 document types for a multi-site enterprise with 500+ content types" gives focused results.
- **Specify the research type:** Technology evaluations need comparison matrices. Root cause analyses need evidence chains. The type shapes the methodology.
- **Verify sources:** AI can generate plausible-looking citations. Spot-check the most important sources.

## Related Skills

- [Explain a Skill](/communicate/internal/explain-a-skill/) — Get a plain-language explanation of any Claude Code skill
- [Generate Project Brief](/plan/project-kickoff/generate-project-brief/) — Research findings often inform project scope
