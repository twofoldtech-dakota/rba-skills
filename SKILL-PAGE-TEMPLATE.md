# Skill Page Template

Use this template when creating new skill pages for the RBA Intelligence Hub.

**File location:** `src/content/docs/roles/<pillar>/<discipline>/` or `src/content/docs/technologies/<platform>/<area>/`
**File format:** `.md` (Markdown — no MDX needed for standard skill pages)

---

## Template

```markdown
---
title: "[Action Verb] [What It Does]"
description: "[One sentence explaining what this skill produces and who it's for]"
---

## Context & Goal

[2-3 sentences. What problem does this solve? When would someone on the team reach for this skill? What's the expected outcome?]

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

\`\`\`text
[The full prompt text here]

Use {{VARIABLE_1}} for the first parameter.
Use {{VARIABLE_2}} for the second parameter.
...
\`\`\`

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save the following to `~/.claude/skills/[skill-name]/SKILL.md` (global) or `.claude/skills/[skill-name]/SKILL.md` (project-level):

\`\`\`yaml
---
name: [skill-name]
description: [Matches the prompt purpose above]
argument-hint: "[what the user passes]"
allowed-tools: [list only what's needed — Read, Grep, Glob, WebSearch, etc.]
---
\`\`\`

\`\`\`markdown
[Full SKILL.md body content — the prompt + methodology adapted for Claude Code's skill format]
\`\`\`

### Usage

\`\`\`
/[skill-name] [example argument]
\`\`\`

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{VARIABLE_1}}` | [What this represents] | [Concrete example] |
| `{{VARIABLE_2}}` | [What this represents] | [Concrete example] |

## Best Practices

- **Model choice:** Use Sonnet 4 for quick, routine tasks. Use Opus 4 when depth, nuance, or complex reasoning matters.
- **Iterate:** Review the first output, then ask for refinements — "make the tone more formal" or "add more detail to section 3."
- **Provide context:** The more specific your variables, the better the output. Include links, paste in source material, or describe your constraints.
- [Add 1-2 skill-specific tips here]

## Related Skills

- [Link to complementary skill in same discipline]
- [Link to cross-role skill that pairs well]
- [Link to technology-specific variant if applicable]
```

---

## Conventions

### Naming
- **Title:** Always starts with an action verb: "Generate," "Audit," "Scaffold," "Review," "Create"
- **File name:** `kebab-case.md` matching the skill action, e.g., `generate-project-brief.md`
- **Slug:** Auto-derived from file path — no manual slug needed

### Tone
- Professional and consultative, matching RBA's client-facing voice
- Direct and specific — avoid filler words and marketing language
- Write for practitioners, not beginners — assume domain competence

### Variable Naming
- Use `{{UPPER_SNAKE_CASE}}` for variables in prompts
- Keep names descriptive: `{{CLIENT_NAME}}` not `{{NAME}}`, `{{TARGET_WCAG_LEVEL}}` not `{{LEVEL}}`
- Document every variable in the Variables table

### Quality Criteria
Every skill page must pass these checks:
1. The prompt produces useful output when pasted into ChatGPT with variables filled in
2. The SKILL.md installs and runs correctly in Claude Code
3. All variables are documented with concrete examples
4. Best Practices include model recommendations
5. At least one Related Skill is linked
6. The title starts with an action verb
7. The description fits in one sentence
