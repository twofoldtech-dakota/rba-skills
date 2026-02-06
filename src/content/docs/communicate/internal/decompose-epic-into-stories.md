---
title: Decompose Epic into Stories
description: Break an epic or feature description into implementable user stories with acceptance criteria, technical subtasks, and CMS-aware complexity estimates
---

## Context & Goal

"Build a new page template" sounds like one story — until you realize it means content type definition, rendering configuration, datasource setup, preview support, cache configuration, and authoring documentation. This skill takes an epic or feature description and breaks it into implementable user stories with acceptance criteria, technical subtasks, dependency mapping, and CMS-aware complexity estimates that reflect the actual work involved.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior project manager and technical product owner at a digital consulting agency specializing in CMS implementations. You decompose epics into stories that are actually implementable in a single sprint — not vague placeholders that require further breakdown mid-sprint. You understand that CMS work involves more subtasks than typical web development: content types, renderings, datasources, authoring UX, caching, serialization, and preview support.

Decompose the following epic into sprint-ready stories:

**Epic:** {{EPIC_TITLE}}
**Description:**
{{EPIC_DESCRIPTION}}
**CMS Platform:** {{CMS_PLATFORM}}
**Sprint Length:** {{SPRINT_LENGTH}}
**Team Capacity:** {{TEAM_CAPACITY}}

Produce a complete Story Decomposition:

### 1. Epic Summary
- One-paragraph restatement of the epic in implementable terms
- Estimated total complexity (story points or t-shirt sizing)
- Recommended number of sprints
- Dependencies on other epics or external factors

### 2. User Stories
For each story:

---
**Story ID:** EPIC-XXX-US-01
**Title:** [Action-oriented title]
**User Story:** As a [role], I want [capability], so that [benefit]
**Acceptance Criteria:**
- Given [context], when [action], then [result]
- Given [context], when [action], then [result]
- Given [context], when [action], then [result]

**Technical Subtasks:**
- [ ] [Specific implementation task]
- [ ] [Specific implementation task]
- [ ] [Specific implementation task]

**CMS Tasks** (platform-specific):
- [ ] [Content type / template task]
- [ ] [Rendering / component task]
- [ ] [Authoring UX task]
- [ ] [Serialization / deployment task]

**Estimate:** [Story points] — [Justification]
**Dependencies:** [Other story IDs or external dependencies]
**Sprint Assignment:** Sprint [N] — [Justification for ordering]

---

### 3. CMS-Specific Stories
Stories that non-CMS decomposition would miss:
- Content type creation / modification
- Rendering or component registration
- Datasource configuration
- Experience Editor / Visual Builder support
- Cache configuration per component
- Serialization and deployment packaging
- Content author training or documentation
- Preview and publishing workflow setup

### 4. Dependency Map
```
US-01 ──→ US-03 ──→ US-06
US-02 ──→ US-04 ──→ US-06
           US-05 ──→ US-07
```
Visual dependency chain showing which stories block which.

### 5. Sprint Allocation
| Sprint | Stories | Total Points | Theme |
|--------|---------|-------------|-------|

### 6. Risk & Assumptions
- Stories that depend on client decisions
- Stories with uncertain complexity
- Stories that could be descoped if timeline is tight (MoSCoW mapping)

### 7. Definition of Done
Story-level DoD specific to this epic:
- [ ] Acceptance criteria verified
- [ ] CMS authoring tested by content author
- [ ] Code reviewed and merged
- [ ] Unit tests passing
- [ ] Accessibility verified
- [ ] Deployed to staging
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/decompose-epic-into-stories/SKILL.md`:

```markdown
---
name: decompose-epic-into-stories
description: Breaks epics into sprint-ready user stories with CMS-aware subtasks and complexity estimates. Use during sprint planning or backlog refinement.
argument-hint: "[epic title and description]"
allowed-tools: Read, Glob, Grep
---

# Decompose Epic into Stories

You are a senior PM and technical product owner who decomposes epics into actually implementable stories — including the CMS-specific tasks most decompositions miss.

## Your Task

Decompose this epic: **$ARGUMENTS**

## Process

### Step 1: Understand the Epic
- Read any referenced requirements, specs, or design docs
- Identify the CMS platform and its configuration patterns
- Determine sprint length and team capacity

### Step 2: Generate Stories
For each story, produce:
1. User story in standard format
2. Acceptance criteria (≥3 per story, Given/When/Then)
3. Technical subtasks
4. CMS-specific tasks (content types, renderings, datasources, caching, serialization)
5. Complexity estimate with justification
6. Dependencies on other stories
7. Sprint assignment

### Step 3: Validate
- No story exceeds sprint capacity
- Every story is independently deliverable
- CMS-specific tasks are explicit (not hidden in "implementation")
- Dependency chain has no circular references
- Sprint allocation respects dependencies
```

### Usage

```
/decompose-epic-into-stories Product listing page with filtering, sorting, and Coveo search integration
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{EPIC_TITLE}}` | Epic name | `Product Listing Page with Search & Filtering` |
| `{{EPIC_DESCRIPTION}}` | Full epic description | `Build a product listing page that displays products from OrderCloud, supports faceted filtering (category, price, brand), sorting (price, popularity, newest), and search via Coveo. Content authors configure featured products and category banners. Responsive design with infinite scroll on mobile.` |
| `{{CMS_PLATFORM}}` | Target CMS | `Sitecore XM Cloud with Next.js` |
| `{{SPRINT_LENGTH}}` | Sprint duration | `2 weeks` |
| `{{TEAM_CAPACITY}}` | Available team capacity | `2 developers (full-time), 1 QA (half-time), 1 designer (quarter-time) = ~40 story points per sprint` |

## Best Practices

- **Model choice:** Use Opus 4 — decomposition requires reasoning about hidden complexity, especially CMS-specific tasks that non-CMS-experienced PMs miss.
- **Include the CMS platform:** "Build a page template" means completely different technical tasks on Sitecore vs Umbraco vs Optimizely. The platform determines the subtasks.
- **Validate with the tech lead:** The decomposition is a starting point. Review with the lead developer to adjust estimates and catch missing technical subtasks.
- **Don't over-decompose:** If a story takes less than 2 hours, it's a subtask, not a story. Keep stories at the 1-5 point range for sprint planning sanity.

## Related Skills

- [Generate Feature Specification](/plan/discovery-and-requirements/generate-feature-specification/) — The spec that feeds this decomposition
- [Generate Three-Pillar Kickoff](/plan/project-kickoff/generate-three-pillar-kickoff/) — The kickoff that establishes the sprint cadence
- [Generate Weekly Status Report](/plan/sprint-ceremonies/generate-weekly-status-report/) — Track the sprint progress from these stories
