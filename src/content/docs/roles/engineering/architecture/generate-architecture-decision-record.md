---
title: Generate Architecture Decision Record
description: Create ADRs from decision context — documents alternatives considered, links to affected components, and creates a permanent searchable record
---

## Context & Goal

Six months from now, someone will ask "why did we use Redis instead of Azure Cache?" and nobody will remember. Architecture Decision Records (ADRs) capture the decision, the context, the alternatives considered, and the rationale — creating a permanent, searchable record that prevents revisiting settled decisions and helps new team members understand the system's evolution.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior software architect at a digital consulting agency. You write Architecture Decision Records that are concise, complete, and actually useful 6 months later. You follow the Nygard format (or MADR) but keep entries practical — no academic overhead, just the decision and why it matters.

Generate an ADR for the following decision:

**Project:** {{PROJECT_NAME}}
**Decision Title:** {{DECISION_TITLE}}
**Decision Context:**
{{DECISION_CONTEXT}}
**Options Considered:**
{{OPTIONS_CONSIDERED}}
**Decision Made:** {{DECISION_MADE}}
**Decision Makers:** {{DECISION_MAKERS}}

Produce an Architecture Decision Record:

### ADR-XXX: {{DECISION_TITLE}}
**Date:** {{DECISION_DATE}}
**Status:** Accepted / Proposed / Deprecated / Superseded
**Decision Makers:** {{DECISION_MAKERS}}

### Context
What is the issue that we're seeing that is motivating this decision or change?
- Business context (what the project needs)
- Technical context (what the system looks like today)
- Constraints (budget, timeline, team skills, client requirements)
- Forcing functions (what makes this decision necessary now)

### Decision Drivers
- [driver 1: e.g., "Must integrate with existing Sitecore XM Cloud instance"]
- [driver 2: e.g., "Team has no Go experience"]
- [driver 3: e.g., "Client requires Azure-hosted solutions"]

### Options Considered

**Option 1: {{OPTION_1_NAME}}**
- Description: What this option involves
- Pros: [list]
- Cons: [list]
- Effort estimate: [relative sizing]
- Risk: [key risk]

**Option 2: {{OPTION_2_NAME}}**
- Description: What this option involves
- Pros: [list]
- Cons: [list]
- Effort estimate: [relative sizing]
- Risk: [key risk]

**Option 3: {{OPTION_3_NAME}}** (if applicable)
- Description: What this option involves
- Pros: [list]
- Cons: [list]
- Effort estimate: [relative sizing]
- Risk: [key risk]

### Decision
We chose [option] because [concise rationale, 2-3 sentences maximum].

### Consequences
**Positive:**
- [What becomes easier or better]
- [What capabilities this enables]

**Negative:**
- [What becomes harder or more constrained]
- [What tradeoffs we're accepting]

**Neutral:**
- [Things that change but aren't clearly better or worse]

### Affected Components
| Component | Impact | Changes Needed |
|-----------|--------|---------------|

### Follow-Up Actions
- [ ] [Action needed to implement this decision]
- [ ] [Action needed to implement this decision]

### Related ADRs
- ADR-XXX: [Related decision that influenced or is influenced by this one]
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-architecture-decision-record/SKILL.md`:

```markdown
---
name: generate-architecture-decision-record
description: Creates Architecture Decision Records from decision context. Use after every significant technical decision to create a permanent, searchable record.
argument-hint: "[decision title and context]"
allowed-tools: Read, Glob, Grep
---

# Generate Architecture Decision Record

You are a senior architect who writes ADRs that are concise, complete, and useful 6 months later.

## Your Task

Generate an ADR for: **$ARGUMENTS**

## Process

### Step 1: Understand the Decision
- Read any referenced documents, PRs, or discussion threads
- Search the project for existing ADRs to match format and numbering
- Identify affected components in the codebase
- Understand the constraints that shaped the decision

### Step 2: Generate the ADR
Produce:
1. Context (business + technical + constraints)
2. Decision drivers (numbered list)
3. Options considered with pros/cons/effort/risk
4. Decision statement with rationale
5. Consequences (positive, negative, neutral)
6. Affected components table
7. Follow-up actions
8. Related ADRs

### Step 3: File the ADR
- Use the next sequential ADR number
- Save to the project's ADR directory (typically `docs/adr/` or `decisions/`)
- Update the ADR index if one exists

### Quality Check
- Context explains why the decision was needed, not just what it is
- At least 2 options were genuinely considered
- Consequences include negatives (every decision has tradeoffs)
- Affected components are specific, not vague
```

### Usage

```
/generate-architecture-decision-record Use Coveo instead of Sitecore Search for product discovery
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name | `Contoso E-Commerce Platform` |
| `{{DECISION_TITLE}}` | What was decided | `Use Coveo for Product Search Instead of Sitecore Search` |
| `{{DECISION_CONTEXT}}` | Why this decision was needed | `We need a search solution for the product catalog (10K SKUs). The site uses Sitecore XM Cloud with OrderCloud commerce. Search needs faceted filtering, typo tolerance, and ML-powered relevance.` |
| `{{OPTIONS_CONSIDERED}}` | Options that were evaluated | `1. Sitecore Search (native), 2. Coveo (RBA partner), 3. Algolia (third-party), 4. Custom Elasticsearch` |
| `{{DECISION_MADE}}` | The chosen option | `Coveo — based on RBA's partnership, proven commerce search patterns, and ML relevance tuning capabilities` |
| `{{DECISION_MAKERS}}` | Who made the decision | `Mike (Tech Lead), Sarah (Architect), Jane (Client IT Director)` |

## Best Practices

- **Model choice:** Sonnet 4 handles ADRs efficiently when you provide the decision context. Use Opus 4 when you need help reasoning about tradeoffs between options.
- **Write the ADR when you make the decision:** Not a week later, not at sprint end. Context fades fast. Write it in the meeting or immediately after.
- **Include the options you rejected:** The most valuable part of an ADR is knowing why you *didn't* choose the alternatives. This prevents future teams from re-evaluating the same options.
- **Keep it short:** If an ADR exceeds 2 pages, it's trying to be a design document. ADRs capture the decision and rationale, not the implementation plan.

## Related Skills

- [Generate Knowledge Transfer Package](/roles/engineering/devops/generate-knowledge-transfer-package/) — ADRs feed into the architecture decisions section of KT packages
- [Review Pull Request](/roles/engineering/architecture/review-pull-request/) — PRs should reference relevant ADRs when implementing architectural decisions
