---
title: Explain a Skill
description: Get a plain-language explanation of what any Claude Code skill does, how to use it, and what it produces
---

## Context & Goal

Not everyone is comfortable reading SKILL.md files with YAML front matter and tool permissions. This skill translates any Claude Code skill into a clear, audience-appropriate explanation — so project managers can understand what engineers' skills do, and new team members can get up to speed quickly.

Adapted from RBA's internal `/explain` Claude Code skill.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a developer experience lead who onboards teams onto AI skills and tools. You make technical tools feel approachable — not like opaque magic, but like tools anyone can pick up and use confidently.

Explain the following Claude Code skill in plain language:

**Skill Name:** {{SKILL_NAME}}

**Skill Content (paste the SKILL.md here):**
{{SKILL_CONTENT}}

**Audience:** {{AUDIENCE}}

Produce an explanation with:

1. **What It Does** — One to two sentences. Lead with the outcome, not the mechanism.
2. **When to Use It** — Bullet list of concrete scenarios: "When you need to...", "After you've...", "Before a sprint demo when..."
3. **How to Use It** — Basic invocation with examples showing realistic arguments
4. **What You Get** — Describe the output: files created, report structure, code generated
5. **Good to Know** — Non-obvious behaviors, limitations, tips, and whether it reads your codebase

Adapt the depth and language to the audience:
- **Developer:** Focus on invocation, arguments, and output. Include examples.
- **Tech Lead:** Focus on quality checks, consistency enforcement, and patterns.
- **Non-Technical:** Focus on business value and time saved. Skip all technical details.
- **Skill Author:** Full technical breakdown including suggestions for improvement.

Avoid jargon: don't say "YAML front matter" — say "when you invoke it." Don't say "$ARGUMENTS variable" — say "the argument you pass after the skill name."
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

The Explain skill is already available as a Claude Code skill. Install it from this repository:

```bash
# Copy the skill to your project or global skills directory
cp -r .claude/skills/explain/ ~/.claude/skills/explain/
```

Or for project-level installation:
```bash
cp -r .claude/skills/explain/ .claude/skills/explain/
```

### Usage

```
/explain research
/explain create-skill
/explain path/to/custom/SKILL.md
```

The Claude Code version automatically reads the skill file and any supporting files — no pasting needed.

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SKILL_NAME}}` | Name of the skill to explain | `research` or `scaffold-sitecore-jss-component` |
| `{{SKILL_CONTENT}}` | The full content of the SKILL.md file | Paste the entire SKILL.md content |
| `{{AUDIENCE}}` | Who the explanation is for | `Developer`, `Tech Lead`, `Non-Technical`, or `Skill Author` |

## Best Practices

- **Model choice:** Sonnet 4 handles explanations well — this is a translation task, not a reasoning task.
- **Paste the full SKILL.md:** The more content you provide, the more accurate the explanation. Include supporting files if they exist.
- **Specify the audience:** The explanation changes dramatically between "developer" and "non-technical." Default is developer.

## Related Skills

- [Research Any Topic](/cross-role/research-any-topic/) — Research a topic in depth before or after understanding a skill
