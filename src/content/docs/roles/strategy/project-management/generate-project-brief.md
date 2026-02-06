---
title: Generate Project Brief
description: Create a structured project brief or SOW from discovery notes, client conversations, or rough requirements
---

## Context & Goal

Project managers kick off every RBA engagement with a clear brief that aligns the team on scope, timeline, and success criteria. This skill turns raw discovery notes — meeting transcripts, emails, client requirements — into a structured project brief ready for internal review or client presentation.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior digital project manager at a consulting agency specializing in CMS implementations (Sitecore, Umbraco, Optimizely) and custom digital solutions. You have 10+ years of experience scoping and delivering enterprise web projects.

Create a structured project brief based on the following inputs:

**Client:** {{CLIENT_NAME}}
**Industry:** {{INDUSTRY}}
**Scope Summary:** {{SCOPE_SUMMARY}}
**Timeline:** {{TIMELINE}}
**Budget Range:** {{BUDGET_RANGE}}
**Key Stakeholders:** {{STAKEHOLDERS}}
**Discovery Notes:**
{{DISCOVERY_NOTES}}

Generate a project brief with these sections:

1. **Executive Summary** — 2-3 sentences positioning the project and its business value
2. **Project Objectives** — Numbered list of specific, measurable objectives
3. **Scope of Work** — Broken into phases (Discovery, Design, Development, QA, Launch)
4. **Out of Scope** — Explicitly list what is NOT included to prevent scope creep
5. **Timeline & Milestones** — Key dates and deliverables per phase
6. **Team Composition** — Roles needed (PM, BA, UX, Dev, QA) with estimated allocation
7. **Assumptions & Dependencies** — What must be true for the project to succeed
8. **Risks & Mitigations** — Top 3-5 risks with proposed mitigations
9. **Success Criteria** — How we'll measure project success

Format as a professional document suitable for client presentation. Use clear, direct language. Avoid jargon unless industry-standard.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-project-brief/SKILL.md`:

```markdown
---
name: generate-project-brief
description: Generates a structured project brief from discovery notes, client requirements, or meeting transcripts. Use when starting a new engagement, formalizing scope, or preparing SOW documentation.
argument-hint: "[client name and project context]"
allowed-tools: Read, Glob, Grep
---

# Generate Project Brief

You are a senior digital project manager at a consulting agency specializing in CMS implementations (Sitecore, Umbraco, Optimizely) and custom digital solutions. You have 10+ years of experience scoping and delivering enterprise web projects.

## Your Task

Generate a project brief for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read any files the user references (discovery notes, emails, requirements docs)
- Search the project for existing briefs or SOWs to match format conventions
- Identify the technology stack, client industry, and engagement model

### Step 2: Structure the Brief

Generate these sections:

1. **Executive Summary** — 2-3 sentences positioning the project and its business value
2. **Project Objectives** — Numbered list of specific, measurable objectives
3. **Scope of Work** — Broken into phases (Discovery, Design, Development, QA, Launch)
4. **Out of Scope** — Explicitly list what is NOT included
5. **Timeline & Milestones** — Key dates and deliverables per phase
6. **Team Composition** — Roles needed with estimated allocation
7. **Assumptions & Dependencies** — What must be true for success
8. **Risks & Mitigations** — Top 3-5 risks with proposed mitigations
9. **Success Criteria** — Measurable outcomes

### Step 3: Quality Check
- Every objective is specific and measurable
- Out of Scope section exists and is substantive
- Risks have corresponding mitigations
- Timeline is realistic for the stated scope
```

### Usage

```
/generate-project-brief Contoso Corp redesign of their Sitecore XM Cloud marketing site
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{INDUSTRY}}` | Client's industry vertical | `Healthcare / Medical Devices` |
| `{{SCOPE_SUMMARY}}` | 1-2 sentence overview of the project | `Redesign and migrate the corporate website from Sitecore XP to XM Cloud with headless front-end` |
| `{{TIMELINE}}` | Expected duration or deadline | `16 weeks, targeting Q3 2025 launch` |
| `{{BUDGET_RANGE}}` | Approximate budget (if known) | `$250K-$350K` |
| `{{STAKEHOLDERS}}` | Key client contacts and their roles | `Jane Smith (VP Marketing), Tom Lee (IT Director)` |
| `{{DISCOVERY_NOTES}}` | Raw notes from discovery sessions | Paste meeting notes, email threads, or requirements docs |

## Best Practices

- **Model choice:** Sonnet 4 handles standard briefs well. Use Opus 4 for complex multi-phase engagements or when discovery notes are extensive and unstructured.
- **Iterate:** After the first draft, ask "make the scope more specific" or "add a content migration phase."
- **Include raw notes:** The more context you paste into `{{DISCOVERY_NOTES}}`, the more specific the brief. Don't summarize — paste the actual meeting notes.
- **Review Out of Scope:** This section prevents the most common engagement problems. Always review it carefully.

## Related Skills

- [Audit Content Model](/roles/strategy/content-strategy/audit-content-model/) — Review and document the CMS content model that the brief references
- [Generate Sprint Summary](/roles/engineering/devops/generate-sprint-summary/) — Summarize progress once the project is underway
