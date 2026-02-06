---
title: Review Process
description: How skill contributions are reviewed, tested, and approved for the Intelligence Hub
---

Every skill page goes through peer review before it's published. This ensures consistent quality and that skills actually work when team members use them.

## Review Checklist

Reviewers verify each item before approving:

### Content Quality
- [ ] Title starts with an action verb (Generate, Audit, Scaffold, Review, Create)
- [ ] Description is one sentence and accurately summarizes the skill
- [ ] Context & Goal explains when and why to use this skill
- [ ] Writing matches RBA's professional, consultative tone

### Prompt Testing
- [ ] Copied the prompt into ChatGPT (or Claude/Gemini) with variables filled in
- [ ] Output was useful and matched the skill's stated purpose
- [ ] Tried at least two different variable combinations
- [ ] No hallucinated or misleading instructions in the prompt

### Claude Code SKILL.md
- [ ] SKILL.md front matter has valid `name`, `description`, and `allowed-tools`
- [ ] Saved to `.claude/skills/` and invoked successfully with `/skill-name`
- [ ] `allowed-tools` follows least-privilege (only tools actually needed)

### Variables & Documentation
- [ ] Every `{{VARIABLE}}` in the prompt has a row in the Variables table
- [ ] Each variable has a concrete, realistic example
- [ ] Best Practices includes model recommendations (Sonnet vs. Opus)
- [ ] At least one Related Skill is linked

### Placement
- [ ] File is in the correct directory for its primary role or technology
- [ ] File name is `kebab-case.md` matching the title action
- [ ] If technology-specific, a pointer page exists under `technologies/`

## Who Reviews

Any team member can review a skill contribution. Ideal reviewers are:

- **Domain expert** — Someone who does this type of work and can judge if the output is useful
- **Different role** — Someone from a different discipline who can test if the instructions are clear to non-experts

Both perspectives are valuable. When possible, get one of each.

## Testing Before Submitting

Before submitting your PR, test the skill yourself:

1. **Prompt test:** Paste the prompt into ChatGPT with real variable values. Does the output help?
2. **Variable test:** Try different values for each variable. Does the prompt still work?
3. **SKILL.md test:** Install the SKILL.md locally and invoke it. Does it run without errors?
4. **Build test:** Run `npm run build` to verify the page renders without errors

## Versioning

Skills evolve as teams discover better prompts and patterns:

- **Minor updates** (wording tweaks, additional examples) can be merged with a single reviewer
- **Major updates** (new variables, changed methodology, restructured prompt) need two reviewers
- **New skills** always need at least one reviewer who works in the target domain

When updating an existing skill, note what changed and why in the PR description.
