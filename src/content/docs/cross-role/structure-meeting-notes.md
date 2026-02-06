---
title: Structure Meeting Notes
description: Transform raw meeting notes or transcripts into structured decisions, action items with owners and deadlines, open questions, and follow-up assignments
---

## Context & Goal

Every client meeting, sprint ceremony, and discovery session produces raw notes that need to become structured outputs within minutes. Decisions get forgotten, action items go unassigned, and follow-ups fall through cracks — not because people don't care, but because nobody has time to process meeting notes between back-to-back calls. This skill takes raw notes (handwritten, transcript, or bullet points) and produces distribution-ready summaries: decisions made, action items with owners and deadlines, open questions, and parking lot items — tagged by RBA's three-pillar structure.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager at RBA who turns raw meeting notes into structured, actionable outputs within 15 minutes of a meeting ending. You know that unprocessed meeting notes are worthless — what matters is decisions, action items, and open questions captured with owners and deadlines. You tag action items by RBA's three pillars (Strategy, Design, Engineering) so the right team knows what's theirs.

Structure the following meeting notes:

**Meeting:** {{MEETING_NAME}}
**Date:** {{MEETING_DATE}}
**Attendees:** {{ATTENDEES}}
**Meeting Type:** {{MEETING_TYPE}}

**Raw Notes:**
{{RAW_NOTES}}

Produce structured meeting output:

### Meeting Summary
2-3 sentences capturing the purpose, key outcome, and overall sentiment of the meeting.

### Decisions Made
| # | Decision | Made By | Context | Affects |
|---|----------|---------|---------|---------|

If no decisions were made, state "No decisions made — topics discussed but deferred."

### Action Items
| # | Action | Owner | Pillar | Deadline | Priority |
|---|--------|-------|--------|----------|----------|

Pillar: Strategy / Design / Engineering / Client
Priority: Must-do / Should-do / Nice-to-have

### Open Questions
| # | Question | Needs Answer From | Blocking? | Target Date |
|---|----------|------------------|-----------|-------------|

### Parking Lot
Items raised but explicitly deferred to a future discussion:
- [Item] — deferred because [reason], revisit [when]

### Key Risks Identified
Any risks surfaced during the meeting:
| Risk | Impact | Owner | Next Step |
|------|--------|-------|-----------|

### Next Meeting
- **Date/Time:** [If scheduled]
- **Agenda items to carry forward:** [List]
- **Pre-work required:** [Who needs to prepare what]
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/structure-meeting-notes/SKILL.md`:

```markdown
---
name: structure-meeting-notes
description: Transforms raw meeting notes into structured decisions, action items, open questions, and follow-ups. Use after every client meeting, sprint ceremony, or discovery session.
argument-hint: "[paste raw notes or describe the meeting]"
allowed-tools: Read, Glob, Grep
---

# Structure Meeting Notes

You are a senior PM at RBA who processes meeting notes into actionable outputs within minutes.

## Your Task

Structure these meeting notes: **$ARGUMENTS**

## Process

### Step 1: Read and Parse
- Identify decisions (explicit or implicit)
- Extract action items with owners
- Flag open questions that need answers
- Identify deferred items (parking lot)
- Note any risks surfaced

### Step 2: Structure the Output
Produce:
1. Meeting summary (2-3 sentences)
2. Decisions table (decision, who made it, what it affects)
3. Action items table (action, owner, pillar, deadline, priority)
4. Open questions (who needs to answer, is it blocking?)
5. Parking lot (deferred items with revisit timeline)
6. Risks identified
7. Next meeting prep

### Quality Check
- Every action item has an owner AND a deadline
- Action items are tagged by pillar (Strategy/Design/Engineering/Client)
- Open questions identify whether they're blocking work
- Decisions are attributed to who made them
```

### Usage

```
/structure-meeting-notes [paste your raw notes from the client call]
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{MEETING_NAME}}` | Meeting title | `Contoso Sprint 14 Review` or `Contoso Discovery Workshop — Day 1` |
| `{{MEETING_DATE}}` | When it happened | `January 24, 2025` |
| `{{ATTENDEES}}` | Who was there | `RBA: Sarah (PM), Mike (Tech Lead), Lisa (UX). Client: Jane (VP Marketing), Tom (IT Director), Chris (Content Manager)` |
| `{{MEETING_TYPE}}` | Type of meeting | `Sprint review` or `Discovery workshop` or `Steering committee` or `Technical deep-dive` or `Requirements review` |
| `{{RAW_NOTES}}` | The raw notes | Paste everything — bullet points, sentence fragments, abbreviations. The messier the better — that's what this skill is for. |

## Best Practices

- **Model choice:** Sonnet 4 — speed matters for meeting notes. Process them before the next meeting starts.
- **Paste raw, not polished:** Sentence fragments, abbreviations, and half-thoughts are fine. The AI infers structure from chaos better than you'd expect.
- **Send within 30 minutes:** Meeting notes lose value exponentially. Send the structured output within 30 minutes while context is fresh and attendees can correct errors.
- **Ask attendees to validate decisions:** Before distributing widely, confirm that the "Decisions Made" section is accurate. Misattributed decisions cause problems.

## Related Skills

- [Generate Weekly Status Report](/roles/strategy/project-management/generate-weekly-status-report/) — Status reports draw from accumulated meeting notes and action items
- [Draft Client Communication](/cross-role/draft-client-communication/) — Send meeting follow-ups as professional client communications
