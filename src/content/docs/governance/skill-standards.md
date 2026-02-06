---
title: Skill Standards
description: Quality standards and conventions for RBA Intelligence Hub skill pages
---

Every skill page in the Intelligence Hub follows consistent standards so that any team member — from a project manager to a senior architect — gets a predictable, high-quality experience.

## Page Structure

Every skill page includes these sections in order:

| Section | Required | Purpose |
|---------|----------|---------|
| **Frontmatter** | Yes | Title (action verb), description (one sentence) |
| **Context & Goal** | Yes | 2-3 sentences on what problem this solves |
| **The Prompt** | Yes | Copyable prompt in a `tip` aside with `text` code fence |
| **Install as Claude Code Skill** | Yes | Collapsible SKILL.md with install instructions |
| **Variables** | Yes | Table of all `{{VARIABLES}}` with descriptions and examples |
| **Best Practices** | Yes | Model recommendations and iteration tips |
| **Related Skills** | Yes | Links to at least one complementary skill |

See the [SKILL-PAGE-TEMPLATE.md](https://github.com/rbaconsulting/rba-skills/blob/main/SKILL-PAGE-TEMPLATE.md) for the complete template.

## Naming Conventions

### Page Titles
- Always start with an **action verb**: Generate, Audit, Scaffold, Review, Create, Analyze
- Be specific: "Audit WCAG Compliance" not "Accessibility Skill"
- Keep under 60 characters

### File Names
- Use `kebab-case.md`: `generate-project-brief.md`, `audit-wcag-compliance.md`
- Match the action in the title

### Variable Names
- Use `{{UPPER_SNAKE_CASE}}` inside prompts
- Be descriptive: `{{CLIENT_NAME}}` not `{{NAME}}`
- Document every variable — no undocumented placeholders

## Writing Style

### Tone
- **Professional and consultative** — matching RBA's client-facing voice
- **Direct and specific** — no filler, no marketing language
- **Practitioner-level** — assume domain competence, don't over-explain basics

### Prompt Writing
- Start with the role or persona the AI should adopt
- Clearly state the task and expected output format
- Include all variables with descriptive names
- End with quality constraints or formatting requirements

### Descriptions
- One sentence maximum
- Lead with what it produces, not how it works
- Include the target audience when helpful

## Quality Criteria

Every skill page must pass these checks before merging:

1. **Prompt works standalone** — Copy the prompt into ChatGPT with variables filled in. Does it produce useful output?
2. **SKILL.md installs correctly** — Save the SKILL.md to `.claude/skills/` and invoke it. Does it run?
3. **Variables are complete** — Every `{{VARIABLE}}` in the prompt appears in the Variables table with a concrete example
4. **Model recommendations are included** — Best Practices mentions when to use Sonnet vs. Opus
5. **Related Skills are linked** — At least one cross-reference to a complementary skill
6. **Title starts with action verb** — Generate, Audit, Scaffold, Review, Create, Analyze
7. **Description is one sentence** — No multi-sentence descriptions in frontmatter

## Sidebar Badges

Pages use badges to indicate their category:

| Badge | Variant | Used For |
|-------|---------|----------|
| Role | `tip` (green) | Skills organized by team role |
| Tech | `note` (blue) | Skills organized by technology platform |
| Shared | `success` (green) | Cross-role skills usable by anyone |
| Coming Soon | `caution` (yellow) | Placeholder pages awaiting content |

## Dual-Format Requirement

Every skill must be available in **two formats**:

1. **Copyable Prompt** — Works in any AI platform (ChatGPT, Claude web, Gemini). This is the primary format and should be prominent on the page.
2. **Claude Code SKILL.md** — Installable skill for CLI power users. This is a secondary format in a collapsible section.

The prompt and SKILL.md should produce equivalent results. The SKILL.md may include additional methodology (phased approach, quality checks) that benefits from Claude Code's tool access.
