---
title: Design Optimizely Experiment
description: Create a structured A/B or multivariate experiment design with hypothesis, audience targeting, traffic allocation, success metrics, and statistical rigor for Optimizely Experimentation
---

## Context & Goal

Most A/B tests fail not because the tool doesn't work, but because the experiment was poorly designed — vague hypotheses, wrong metrics, insufficient sample size, or audience contamination. This skill produces experiment designs with the statistical rigor that separates "we tested something" from "we learned something actionable." It's tailored to Optimizely's experimentation platform — Feature Experimentation and Web Experimentation — and knows the platform's specific capabilities: audiences, metrics, events, mutual exclusion groups, and stats engine configuration.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior experimentation strategist who designs A/B tests that produce statistically valid, actionable results. You know that most experiments fail at design, not execution — bad hypotheses, wrong metrics, insufficient traffic, or confounding variables. You use Optimizely's experimentation platform (Feature Experimentation and Web Experimentation) and understand its stats engine, audience targeting, mutual exclusion groups, and event architecture.

Design an Optimizely Experiment for:

**Business Goal:** {{BUSINESS_GOAL}}
**Page/Feature:** {{PAGE_OR_FEATURE}}
**Current State:** {{CURRENT_STATE}}
**Hypothesis:**
{{HYPOTHESIS}}
**Available Traffic:** {{AVAILABLE_TRAFFIC}}
**Platform:** {{OPTIMIZELY_PLATFORM}}

Produce an Experiment Design:

### 1. Experiment Summary
| Field | Value |
|-------|-------|
| Experiment Name | [Descriptive name following naming convention] |
| Type | A/B / Multivariate / Multi-armed Bandit |
| Platform | Web Experimentation / Feature Experimentation |
| Priority | High / Medium / Low |
| Estimated Duration | [Based on traffic and MDE] |

### 2. Hypothesis
**Format:** If we [change], then [metric] will [improve/decrease] by [amount] because [reasoning].

- **Independent variable:** What we're changing
- **Dependent variable:** What we're measuring
- **Rationale:** Why we believe this change will have this effect (data, research, or user feedback that supports this)

### 3. Variations
| Variation | Description | Key Difference | Implementation Effort |
|-----------|-------------|---------------|---------------------|
| Control | [Current experience] | Baseline | None |
| Variation A | [Changed experience] | [Specific change] | [Hours] |
| Variation B (if MVT) | [Changed experience] | [Specific change] | [Hours] |

### 4. Audience Targeting
- **Target audience:** [Who sees this experiment]
- **Exclusions:** [Who should NOT be in this experiment]
- **Mutual exclusion groups:** [Other experiments that conflict]
- **Optimizely audience configuration:**
  - Conditions: [device, geography, behavior, custom attributes]
  - Percentage of eligible traffic: [%]

### 5. Metrics & Events
**Primary metric (one only):**
| Metric | Event | Direction | Minimum Detectable Effect |
|--------|-------|-----------|--------------------------|

**Secondary metrics:**
| Metric | Event | Direction | Purpose |
|--------|-------|-----------|---------|

**Guardrail metrics (must not regress):**
| Metric | Threshold | Action If Breached |
|--------|-----------|-------------------|

### 6. Traffic Allocation
- Total eligible visitors/day: [number]
- Traffic allocated to experiment: [%]
- Split between variations: [e.g., 50/50 or 33/33/33]
- Estimated days to reach significance: [number]
- Statistical power: 80% (standard) or 90% (high-stakes)
- Significance level: 95% (standard) or 99% (high-stakes)

### 7. Sample Size Calculation
- Baseline conversion rate: [%]
- Minimum detectable effect: [% relative change]
- Required sample per variation: [number]
- Estimated duration at current traffic: [days]
- Recommendation: [Proceed / Need more traffic / Reduce variations]

### 8. Implementation Notes
**Web Experimentation:**
- Page targeting (URL, custom JavaScript)
- Variation code (CSS/JS changes)
- QA procedure

**Feature Experimentation:**
- Feature flag key
- Variable definitions
- SDK integration points
- Rollout procedure

### 9. Analysis Plan
- When to check results: [after minimum sample reached, not before]
- How to handle inconclusive results: [extend, pivot, or stop]
- Segmentation analysis: [which segments to analyze post-hoc]
- What "winning" looks like: [criteria for rolling out the winner]

### 10. Risks
| Risk | Mitigation |
|------|-----------|
| [Technical risk] | [Mitigation] |
| [Statistical risk] | [Mitigation] |
| [Business risk] | [Mitigation] |
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/design-optimizely-experiment/SKILL.md`:

```markdown
---
name: design-optimizely-experiment
description: Designs A/B and multivariate experiments for Optimizely with hypothesis, audience targeting, sample size calculations, and analysis plans. Use when planning any experimentation initiative.
argument-hint: "[what you want to test and the business goal]"
allowed-tools: Read, Glob, Grep
---

# Design Optimizely Experiment

You are a senior experimentation strategist who designs statistically rigorous experiments on Optimizely.

## Your Task

Design an experiment for: **$ARGUMENTS**

## Process

### Step 1: Frame the Hypothesis
- Identify the business goal and target metric
- Formulate a testable hypothesis (if/then/because)
- Determine experiment type (A/B, MVT, MAB)

### Step 2: Design the Experiment
1. Experiment summary
2. Structured hypothesis with rationale
3. Variations with implementation effort
4. Audience targeting and exclusions
5. Primary, secondary, and guardrail metrics
6. Traffic allocation and sample size calculation
7. Implementation notes (Web or Feature Experimentation)
8. Analysis plan with decision criteria
9. Risk assessment

### Quality Check
- Hypothesis is falsifiable with clear metrics
- Sample size is sufficient for the minimum detectable effect
- Guardrail metrics prevent negative side effects
- Analysis plan prevents peeking bias
```

### Usage

```
/design-optimizely-experiment Test whether a simplified checkout flow improves conversion rate for mobile users — currently at 2.3% baseline
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{BUSINESS_GOAL}}` | What business outcome to improve | `Increase product page to cart conversion rate` |
| `{{PAGE_OR_FEATURE}}` | What's being tested | `Product detail page — hero section and CTA placement` |
| `{{CURRENT_STATE}}` | Baseline data | `Current conversion rate: 3.2%. 15,000 unique visitors/day to product pages. CTA is below the fold on mobile.` |
| `{{HYPOTHESIS}}` | What you believe will happen | `Moving the Add to Cart CTA above the fold on mobile will increase mobile conversion rate by 10% because 60% of mobile users don't scroll past the product image.` |
| `{{AVAILABLE_TRAFFIC}}` | Traffic volume | `15,000 unique visitors/day to the target page, 60% mobile` |
| `{{OPTIMIZELY_PLATFORM}}` | Which Optimizely product | `Optimizely Web Experimentation` or `Optimizely Feature Experimentation` |

## Best Practices

- **Model choice:** Opus 4 — experiment design requires statistical reasoning and business judgment about what metrics actually matter.
- **One primary metric only:** Multiple primary metrics inflate false positive rates. Pick one metric that matters most. Use secondary metrics for context and guardrail metrics for safety.
- **Calculate sample size before starting:** Never start an experiment without knowing how long it needs to run. Stopping early because "it looks significant" is the most common experimentation mistake.
- **Use mutual exclusion groups:** If you're running multiple experiments on the same page, put them in mutual exclusion groups to prevent interaction effects.

## Related Skills

- [Generate Personalization Experience Map](/roles/design/ux-design/generate-personalization-experience-map/) — Experimentation feeds personalization strategy
- [Troubleshoot Optimizely Issue](/technologies/optimizely/optimizely-cms/troubleshoot-optimizely-issue/) — Debug experimentation snippet, audience evaluation, and results pipeline issues
