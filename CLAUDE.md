# CLAUDE.md — RBA Skills

This repo is RBA Consulting's shared library of Claude Code skills (`.claude/skills/`). Skills automate repeatable workflows for digital experience agency work — CMS development, component scaffolding, documentation, accessibility auditing, content migration, and more.

## Repository Structure

```
.claude/
  skills/
    <skill-name>/
      SKILL.md          # The skill definition (required)
      templates.md      # Skeleton structures for artifacts (optional)
      examples.md       # Complete example outputs (optional)
      reference.md      # Platform-specific docs/schemas (optional)
      components.md     # Component reference material (optional)
  settings.local.json   # Permission allowlists for skill tools
```

## Current Skills

| Skill | Purpose |
|-------|---------|
| `research` | Deep, systematic research on technical or business topics |
| `create-skill` | Scaffolds new Claude Code skills for agency workflows |
| `explain` | Explains what a skill does in plain language |
| `document` | Creates Astro Starlight documentation pages and sites |

## Conventions

### Skill file standards
- `SKILL.md` must stay under 500 lines — move detailed content to supporting files
- Front matter uses YAML with required fields: `name`, `description`
- Skill names are `kebab-case`, lowercase, max 64 characters
- Descriptions include trigger keywords so Claude can match user intent
- `allowed-tools` follows least-privilege — only tools the skill actually needs
- Never grant blanket `Bash` access; use `Bash(specific-command *)` patterns

### Writing style
- Personas are domain-specific experts, never generic ("helpful assistant")
- Every step includes **what** to do and **why** it matters
- Output formats are explicit templates, not vague descriptions
- Quality checks are testable — each one can be verified by reading the output

### Permissions
- When a skill needs tool access beyond read-only, add the permission to `.claude/settings.local.json`
- Use domain-scoped `WebFetch(domain:example.com)` rather than open web access

## Working in This Repo

- **Adding a skill:** Use `/create-skill [description]` to scaffold it properly
- **Understanding a skill:** Use `/explain [skill-name]` for a plain-language breakdown
- **Testing changes:** Read the skill's SKILL.md and verify against the quality checks listed in `create-skill`
- **Committing:** Keep commits focused — one skill per commit when adding new skills
