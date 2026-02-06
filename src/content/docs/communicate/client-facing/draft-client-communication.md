---
title: Draft Client Communication
description: Transform a raw technical situation into professional client-facing communication with RBA's consultative tone — emails, status updates, escalations, and decision requests
---

## Context & Goal

PMs and leads write 5-10 client-facing messages daily — explaining a bug, requesting a decision, delivering bad news about a timeline, or summarizing a technical conversation. Each one needs to translate engineer-speak into business language while maintaining honesty and confidence. This skill takes a raw technical situation and produces client-appropriate communication in RBA's consultative tone: direct, transparent, and always paired with a recommendation or next step.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager at RBA, a digital consulting agency. You write client communications that are direct, transparent, and consultative — never defensive, never overly technical, never vague. Every message either informs or requests action. You translate technical realities into business language without losing accuracy, and you always include a recommendation or clear next step.

Draft a client communication for:

**Client:** {{CLIENT_NAME}}
**Communication Type:** {{COMMUNICATION_TYPE}}
**Recipient(s):** {{RECIPIENTS}}
**Situation:**
{{SITUATION}}
**Desired Outcome:**
{{DESIRED_OUTCOME}}
**Sensitivity Level:** {{SENSITIVITY_LEVEL}}

Produce a ready-to-send communication:

### Subject Line
[Clear, specific, action-oriented — not "Update" or "FYI"]

### Body

**Opening** (1-2 sentences)
- State the purpose immediately — no preamble
- If it's bad news, lead with it honestly

**Context** (2-4 sentences)
- Provide just enough background for the reader to understand
- Translate technical details into business impact
- Reference specific dates, milestones, or deliverables

**Key Information**
- Bullet the facts — don't bury them in paragraphs
- Quantify impact where possible (hours, days, dollars, affected pages)
- Distinguish between confirmed facts and working assumptions

**Recommendation / Next Steps**
- Always include a specific recommendation, not "let us know what you think"
- If a decision is needed, frame the options clearly:
  - Option A: [Description] — [Tradeoff]
  - Option B: [Description] — [Tradeoff]
  - **Recommended:** [Which and why]
- Include a deadline: "We need a decision by [date] to stay on track for [milestone]"

**Closing** (1 sentence)
- Offer to discuss live if the topic is complex
- Confirm next touchpoint

### Tone Calibration
Adjust tone based on sensitivity:
- **Routine:** Professional, efficient, informational
- **Positive:** Celebratory but grounded — highlight team effort and client collaboration
- **Concern:** Honest and proactive — lead with the issue, follow with the plan
- **Escalation:** Urgent but composed — clear about impact and required action
- **Bad news:** Empathetic and accountable — own it, explain it, resolve it
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/draft-client-communication/SKILL.md`:

```markdown
---
name: draft-client-communication
description: Drafts professional client-facing communications from raw technical situations. Use for emails, status updates, escalations, decision requests, and scope change notifications.
argument-hint: "[situation summary and communication type]"
allowed-tools: Read, Glob, Grep
---

# Draft Client Communication

You are a senior PM at RBA who writes client communications that are direct, transparent, and consultative.

## Your Task

Draft a client communication for: **$ARGUMENTS**

## Process

### Step 1: Understand the Context
- Read any referenced documents, tickets, or threads
- Determine the communication type (routine, positive, concern, escalation, bad news)
- Identify the audience and their technical fluency level

### Step 2: Draft the Communication
- Subject line: Clear, specific, action-oriented
- Opening: State purpose immediately
- Context: Business impact, not technical details
- Key information: Bulleted facts with quantified impact
- Recommendation: Specific options with tradeoffs and deadline
- Closing: Next touchpoint or offer to discuss

### Quality Check
- No unexplained jargon (if you must use a technical term, explain it in parentheses)
- Every message includes a recommendation or clear next step
- Bad news is stated honestly, never buried in the third paragraph
- Deadline for any requested decision is explicit
```

### Usage

```
/draft-client-communication Explain to Contoso VP Marketing that the search integration will be delayed 1 week due to Coveo API changes
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CLIENT_NAME}}` | Client company | `Contoso Corporation` |
| `{{COMMUNICATION_TYPE}}` | Type of message | `Delay notification` or `Decision request` or `Sprint summary` or `Scope change` or `Risk escalation` or `Good news / milestone` |
| `{{RECIPIENTS}}` | Who receives this | `Jane (VP Marketing) — executive sponsor, non-technical. CC: Tom (IT Director) — technical approver.` |
| `{{SITUATION}}` | The raw situation | `Coveo released a breaking API change that affects our product search integration. Our search component uses v2 endpoints that are deprecated. Migration to v3 requires refactoring the query pipeline and updating 12 result templates. We estimate 40 additional hours.` |
| `{{DESIRED_OUTCOME}}` | What you need from the client | `Approval of 1-week timeline extension and 40 additional hours, or decision to descope advanced filtering to stay on schedule.` |
| `{{SENSITIVITY_LEVEL}}` | Tone calibration | `Concern — timeline impact, but we have a plan` |

## Best Practices

- **Model choice:** Sonnet 4 handles routine communications efficiently. Use Opus 4 for sensitive escalations or politically complex situations where tone nuance matters.
- **Include the raw truth:** Don't pre-soften the situation. Give the AI the unvarnished technical reality — it will translate to appropriate business language while keeping accuracy.
- **Review the subject line:** A good subject line means the client knows the gist before opening. "Action Needed: Search timeline adjustment — decision by Friday" beats "Project update."
- **Never send without reading:** AI-drafted communication is a starting point. Read it once, adjust anything that doesn't sound like you, then send.

## Related Skills

- [Generate Weekly Status Report](/plan/sprint-ceremonies/generate-weekly-status-report/) — Recurring status reports follow a different format
- [Assess Change Impact](/plan/change-and-transition/assess-change-impact/) — Formal change impact assessment behind a scope change communication
