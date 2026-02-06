---
title: Generate Requirements Document
description: Transform stakeholder interviews and discovery notes into a structured business requirements document (BRD)
---

## Context & Goal

Business analysts bridge the gap between client needs and technical delivery. Before a single line of code is written, the team needs a clear, traceable set of requirements that everyone has agreed on. This skill converts raw inputs — meeting notes, emails, whiteboard photos, stakeholder interviews — into a formal business requirements document (BRD) with user stories, acceptance criteria, and traceability back to business objectives.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior business analyst at a digital consulting agency specializing in CMS implementations (Sitecore, Umbraco, Optimizely) and custom digital solutions. You have 12+ years of experience translating stakeholder needs into actionable, testable requirements for enterprise web projects.

Transform the following discovery inputs into a structured business requirements document (BRD):

**Client:** {{CLIENT_NAME}}
**Project:** {{PROJECT_NAME}}
**System Context:** {{SYSTEM_CONTEXT}}
**Key Stakeholders:**
{{STAKEHOLDER_LIST}}

**Discovery Notes:**
{{DISCOVERY_NOTES}}

Generate a complete BRD with these sections:

1. **Executive Summary** — 2-3 paragraphs summarizing the business need, proposed solution approach, and expected outcomes
2. **Business Objectives** — Numbered list tying each objective to a measurable outcome (OKR format preferred)
3. **Scope**
   - **In Scope** — Specific capabilities, integrations, and deliverables included
   - **Out of Scope** — What is explicitly excluded from this engagement
4. **Functional Requirements** — Each requirement in user story format:
   - ID (REQ-001, REQ-002, etc.)
   - User Story: "As a [role], I want [capability], so that [benefit]"
   - Acceptance Criteria (Given/When/Then format, at least 2 per story)
   - Priority (Must Have / Should Have / Could Have / Won't Have — MoSCoW)
5. **Non-Functional Requirements** — Performance, security, accessibility (WCAG AA), browser support, uptime SLAs, and compliance needs
6. **Assumptions** — What must be true for these requirements to be valid
7. **Dependencies** — External systems, third-party services, client deliverables, or decisions that block progress
8. **Traceability Matrix** — Table mapping each requirement ID to its source business objective, stakeholder, and acceptance test
9. **Sign-Off Section** — Table with columns for stakeholder name, role, approval status, date, and signature line

Use professional language suitable for both technical and non-technical stakeholders. Number every requirement for traceability. Be specific — reference actual system names, data fields, and user roles rather than speaking in generalities.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-requirements-document/SKILL.md`:

```markdown
---
name: generate-requirements-document
description: Generates a structured business requirements document (BRD) from discovery notes, stakeholder interviews, and meeting transcripts. Use when formalizing requirements, preparing for development handoff, or documenting scope for client sign-off.
argument-hint: "[client name and project context]"
allowed-tools: Read, Glob, Grep
---

# Generate Requirements Document

You are a senior business analyst at a digital consulting agency specializing in CMS implementations (Sitecore, Umbraco, Optimizely) and custom digital solutions. You have 12+ years of experience translating stakeholder needs into actionable, testable requirements.

## Your Task

Generate a business requirements document for: **$ARGUMENTS**

## Process

### Step 1: Gather Context
- Read any files the user references (discovery notes, meeting transcripts, emails, existing requirements)
- Search the project for existing BRDs or requirements docs to match format conventions
- Identify the technology stack, client industry, stakeholder roles, and engagement scope

### Step 2: Structure the BRD

Generate these sections:

1. **Executive Summary** — Business need, proposed solution, expected outcomes
2. **Business Objectives** — Measurable objectives in OKR format
3. **Scope** — In Scope and Out of Scope
4. **Functional Requirements** — User story format with acceptance criteria (Given/When/Then) and MoSCoW priority
5. **Non-Functional Requirements** — Performance, security, accessibility, compliance
6. **Assumptions** — What must be true for requirements to be valid
7. **Dependencies** — External blockers and client deliverables
8. **Traceability Matrix** — Requirements mapped to objectives, stakeholders, and tests
9. **Sign-Off Section** — Stakeholder approval table

### Step 3: Quality Check
- Every requirement has a unique ID and is traceable to a business objective
- Acceptance criteria use Given/When/Then format with at least 2 criteria per story
- Out of Scope section is substantive and specific
- Non-functional requirements include measurable targets (response times, uptime %)
- Traceability matrix accounts for every requirement ID
```

### Usage

```
/generate-requirements-document Contoso Corp — Sitecore XM Cloud migration with PIM integration
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company name | `Contoso Corporation` |
| `{{PROJECT_NAME}}` | Name or short description of the project | `Corporate Website Redesign & CMS Migration` |
| `{{DISCOVERY_NOTES}}` | Raw notes from discovery sessions, interviews, or emails | Paste meeting transcripts, email threads, whiteboard notes, or requirements lists |
| `{{STAKEHOLDER_LIST}}` | Key stakeholders with roles and interests | `Jane Smith (VP Marketing) — owns brand & content; Tom Lee (IT Director) — owns infrastructure & security; Sarah Chen (Product Owner) — owns feature priorities` |
| `{{SYSTEM_CONTEXT}}` | Current and target systems, integrations, and technical landscape | `Migrating from Sitecore XP 10.3 to XM Cloud. Integrations: Salesforce CRM, Akeneo PIM, Azure AD SSO` |

## Best Practices

- **Model choice:** Sonnet 4 handles straightforward BRDs with clear discovery notes effectively. Use Opus 4 when discovery notes are extensive, unstructured, or contradictory — it excels at resolving ambiguity and inferring implicit requirements.
- **Paste everything:** Include raw meeting notes, email threads, and even informal Slack messages. The AI produces far better requirements when it has access to the actual source material rather than pre-summarized inputs.
- **Iterate on acceptance criteria:** After the first draft, ask "add edge case acceptance criteria for REQ-003" or "strengthen the non-functional requirements around performance." The first pass gets the structure right; subsequent passes add rigor.
- **Validate MoSCoW priorities:** AI tends to mark too many requirements as "Must Have." Review the priority assignments and push back: "reclassify REQ-007 through REQ-012 as Should Have."
- **Cross-reference with stakeholders:** The traceability matrix is only valuable if it maps to real conversations. Verify that each stakeholder attribution is accurate before presenting.

## Related Skills

- [Generate Project Brief](/roles/strategy/project-management/generate-project-brief/) — Create the project brief that precedes the BRD
- [Audit Content Model](/roles/strategy/content-strategy/audit-content-model/) — Audit the content architecture that requirements often reference
