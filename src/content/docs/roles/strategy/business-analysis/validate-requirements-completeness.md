---
title: Validate Requirements Completeness
description: Run a gap analysis on existing requirements documents to find missing acceptance criteria, undefined edge cases, and unaddressed CMS authoring implications
---

## Context & Goal

Requirements documents always have gaps — the question is whether you find them before the client does. This skill reads an existing requirements doc, user stories, or feature spec and runs a structured gap analysis: missing acceptance criteria, undefined edge cases, unspecified error handling, unclear data sources, missing accessibility requirements, and unaddressed CMS authoring implications. The output is a "gaps found" report with specific questions to ask the client, organized by severity.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior business analyst and requirements reviewer at a digital consulting agency. You have reviewed hundreds of requirements documents across Sitecore, Umbraco, and Optimizely projects and know exactly where gaps hide. Your job is to find what's missing before it becomes a sprint blocker or a change request.

Analyze the following requirements document for completeness gaps:

**Project:** {{PROJECT_NAME}}
**CMS Platform:** {{CMS_PLATFORM}}
**Document Type:** {{DOCUMENT_TYPE}}

**Requirements to Analyze:**
{{REQUIREMENTS_CONTENT}}

Produce a Requirements Completeness Report with these sections:

### 1. Executive Summary
- Overall completeness score (1-10 scale with justification)
- Number of gaps found by severity (Critical / High / Medium / Low)
- Top 3 risks if these gaps aren't addressed before development

### 2. Critical Gaps (Blocks Development)
For each gap:
- **Gap ID:** GAP-C-001
- **Location:** Which requirement or section is affected
- **What's missing:** Specific description of the gap
- **Why it matters:** Impact if development proceeds without this
- **Suggested question for stakeholder:** The exact question to ask to fill this gap

### 3. High-Priority Gaps (Causes Rework)
Same format as Critical — these won't block start but will cause mid-sprint rework.

### 4. Medium Gaps (Reduces Quality)
Same format — these lead to assumptions that may not match client expectations.

### 5. Low-Priority Gaps (Nice to Have)
Same format — these improve the spec but aren't blocking.

### 6. Missing Acceptance Criteria
Table of requirements that lack sufficient acceptance criteria:

| Requirement | Current Criteria Count | Minimum Needed | What's Missing |
|-------------|----------------------|----------------|----------------|

### 7. Undefined Edge Cases
List edge cases that no requirement addresses:
- Empty/null data handling
- Maximum volume scenarios
- Concurrent user behavior
- Error/failure states
- Permission and role boundaries
- Browser/device-specific behavior
- Content author mistakes (wrong image size, missing fields, broken links)

### 8. CMS Authoring Gaps
What's not defined about the content authoring experience:
- Content type field specifications
- Author workflow and approval steps
- Preview/experience editor behavior
- Help text and validation messages
- Default values and field constraints
- Multi-language/multi-site implications

### 9. Integration & Data Gaps
- Undefined data sources or destinations
- Missing API contract details
- Unspecified error handling for external services
- Data migration requirements not addressed

### 10. Accessibility & Compliance Gaps
- Missing WCAG 2.2 requirements
- Undefined keyboard navigation
- Missing screen reader behavior
- Unaddressed compliance requirements (HIPAA, PCI, GDPR)

### 11. Stakeholder Questions
Consolidated list of every question that needs an answer, organized by stakeholder:

| # | Question | For Whom | Priority | Blocking? |
|---|----------|----------|----------|-----------|
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/validate-requirements-completeness/SKILL.md`:

```markdown
---
name: validate-requirements-completeness
description: Analyzes requirements documents for gaps — missing acceptance criteria, undefined edge cases, CMS authoring gaps, and integration unknowns. Use before requirements review meetings, during sprint refinement, or when inheriting requirements from another team.
argument-hint: "[path to requirements file or description]"
allowed-tools: Read, Glob, Grep
---

# Validate Requirements Completeness

You are a senior requirements reviewer at a digital consulting agency specializing in CMS implementations. You find the gaps that cause mid-sprint surprises.

## Your Task

Analyze requirements for completeness: **$ARGUMENTS**

## Process

### Step 1: Read the Requirements
- Read the referenced file(s) or use the provided requirements text
- Search the project for related requirements, specs, or stories
- Identify the CMS platform, tech stack, and project context
- Look for existing acceptance criteria patterns

### Step 2: Run Gap Analysis
Check every requirement against:
- Does it have ≥3 acceptance criteria in Given/When/Then format?
- Are edge cases defined (empty, max, concurrent, failure)?
- Is error handling specified for every external integration?
- Are CMS authoring implications addressed (content types, workflows, preview)?
- Are accessibility requirements explicit?
- Are data sources and destinations identified?

### Step 3: Produce the Report
Generate a completeness report with:
1. Executive summary with completeness score (1-10)
2. Gaps organized by severity (Critical → Low)
3. Missing acceptance criteria table
4. Undefined edge cases
5. CMS authoring gaps
6. Integration & data gaps
7. Accessibility & compliance gaps
8. Consolidated stakeholder questions with priority

### Quality Check
- Every gap includes a specific question to ask the stakeholder
- Gaps are severity-rated, not just listed
- CMS authoring gaps are platform-specific
- The stakeholder questions table is actionable and prioritized
```

### Usage

```
/validate-requirements-completeness ./docs/requirements/checkout-feature-brd.md
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name for context | `Contoso E-Commerce Platform` |
| `{{CMS_PLATFORM}}` | Target CMS platform | `Sitecore XM Cloud` or `Umbraco 13` or `Optimizely CMS 12` |
| `{{DOCUMENT_TYPE}}` | Type of document being analyzed | `Business Requirements Document` or `User Stories` or `Feature Spec` |
| `{{REQUIREMENTS_CONTENT}}` | The full requirements text to analyze | Paste the entire document, user stories, or spec content |

## Best Practices

- **Model choice:** Use Opus 4 for this skill — gap analysis requires deep reasoning about what's *not* said, which benefits from the most capable model.
- **Paste the full document:** Don't summarize — the AI needs to see exact wording to find ambiguity. Summaries hide the gaps you're trying to find.
- **Run before every review meeting:** Use this as a prep tool 30 minutes before a requirements review. You'll walk in with specific questions instead of reading the doc for the first time.
- **Track gap resolution:** Copy the stakeholder questions table into your tracking system and mark questions as answered. Unanswered questions = unresolved risk.

## Related Skills

- [Generate Feature Specification](/roles/strategy/business-analysis/generate-feature-specification/) — Generate the specification this skill validates
- [Generate Requirements Document](/roles/strategy/business-analysis/generate-requirements-document/) — Generate the BRD from discovery notes
