---
title: Contributing
description: How to propose, create, and submit new skills to the RBA Intelligence Hub
---

The Intelligence Hub grows through contributions from every team at RBA. Whether you're a project manager with a prompt that saves hours or an engineer with a scaffolding workflow, your skills belong here.

## How to Contribute

### 1. Identify a Repeatable Workflow

Good skill candidates are tasks you do repeatedly that follow a predictable pattern:

- "I write the same type of project brief for every new engagement"
- "I run the same accessibility checks on every component review"
- "I scaffold the same file structure for every new Sitecore component"

If you find yourself copy-pasting from previous work or following the same mental checklist, that's a skill waiting to be documented.

### 2. Draft the Prompt

Start with the prompt itself — the text you'd paste into ChatGPT or Claude:

1. Define the **role** the AI should adopt (e.g., "You are a senior Sitecore architect...")
2. State the **task** clearly with expected output format
3. Add **variables** using `{{UPPER_SNAKE_CASE}}` for anything that changes per use
4. Include **quality constraints** — what makes the output good vs. bad?

Test the prompt by pasting it into your preferred AI with real values. Iterate until the output is consistently useful.

### 3. Use the Skill Page Template

Copy the [SKILL-PAGE-TEMPLATE.md](https://github.com/rbaconsulting/rba-skills/blob/main/SKILL-PAGE-TEMPLATE.md) and fill in every section:

- Place the file in the correct directory based on the primary role (`roles/`) or technology (`technologies/`)
- Follow the [Skill Standards](/governance/skill-standards/) for naming, tone, and formatting
- Include both the copyable prompt and the Claude Code SKILL.md

### 4. Submit a Pull Request

1. Create a branch: `skill/[skill-name]` (e.g., `skill/generate-project-brief`)
2. Add your skill page to the appropriate directory
3. Update any index pages if adding to a new discipline area
4. Submit a PR with a description of what the skill does and when to use it

### 5. Review Process

Every skill goes through [peer review](/governance/review-process/) before merging. Reviewers check that:

- The prompt produces useful output when tested
- The page follows the skill standards
- Variables are documented with examples
- The skill is placed in the correct category

## Choosing the Right Category

### By Role (Primary)

Place the skill under the role that would **most commonly use it**:

| If the primary user is... | Place it under... |
|---------------------------|-------------------|
| A project manager or BA | `roles/strategy/` |
| A UX/UI designer | `roles/design/` |
| A developer or architect | `roles/engineering/` |
| Anyone doing security/compliance/perf | `roles/security-oversight/` |

### By Technology (Cross-listing)

If a skill is specific to a technology platform (e.g., Sitecore, Umbraco), also create a **pointer page** under `technologies/` that links to the primary page. This keeps content DRY while making skills discoverable from both navigation paths.

### Cross-Role

Skills that any team member can use regardless of role go in `cross-role/`. These are typically meta-skills like research, explanation, or documentation.

## Questions?

If you're unsure where a skill belongs or whether your idea is a good fit, start a conversation in the team's channel. We'd rather help shape a contribution than miss a good one.
