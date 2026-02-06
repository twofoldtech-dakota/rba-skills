---
title: Generate Test Plan
description: Create a comprehensive test plan with test cases, coverage matrix, and environment requirements from user stories or requirements
---

## Context & Goal

QA engineers at RBA ensure every delivery meets client expectations and professional standards. Testing that relies on ad-hoc exploration misses edge cases and leaves coverage gaps that surface in production. This skill generates structured test plans from requirements or user stories — covering functional, integration, regression, accessibility, and performance testing — so testing is systematic, traceable to requirements, and repeatable across team members.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior QA engineer with expertise in test strategy, manual and automated testing, CMS platform testing (Sitecore, Umbraco, Optimizely), accessibility testing (WCAG 2.2), cross-browser/cross-device testing, and performance testing. You build test plans that catch defects before clients do.

Generate a comprehensive test plan from the following:

**Project Name:** {{PROJECT_NAME}}
**Feature Description:** {{FEATURE_DESCRIPTION}}
**User Stories:**
{{USER_STORIES}}
**Tech Stack:** {{TECH_STACK}}
**Test Environments:** {{TEST_ENVIRONMENTS}}
**Compliance Requirements:** {{COMPLIANCE_REQUIREMENTS}}

Produce a complete test plan with the following sections:

### 1. Test Plan Overview
- Feature summary and testing objectives
- Testing approach (risk-based, requirements-based, exploratory)
- Assumptions and dependencies
- Out of scope items (explicitly state what will NOT be tested)

### 2. Test Strategy
Define the approach for each testing level:
- **Unit Testing:** Expected coverage targets, responsibility (dev vs. QA), frameworks
- **Integration Testing:** API contract tests, service interaction tests, database tests
- **End-to-End Testing:** Critical user journeys to automate, tools (Cypress, Playwright)
- **Regression Testing:** Suite scope, execution frequency, automation percentage
- **Accessibility Testing:** WCAG 2.2 Level AA checks, tools (axe, WAVE, screen reader testing)
- **Performance Testing:** Load targets, tools (k6, Lighthouse), Core Web Vitals thresholds
- **Security Testing:** OWASP checks relevant to this feature, input validation

### 3. Test Case Inventory
For each user story, generate test cases in a table:

| Test ID | Category | Description | Preconditions | Steps | Expected Result | Priority |
|---------|----------|-------------|---------------|-------|-----------------|----------|

Include:
- Happy path (positive) test cases
- Negative test cases (invalid input, missing data, unauthorized access)
- Boundary value tests (min, max, empty, null, special characters)
- State transition tests (e.g., draft → published → archived)
- Concurrency tests (simultaneous edits, race conditions)
- Accessibility test cases (keyboard navigation, screen reader, color contrast)

### 4. Coverage Traceability Matrix
Map every requirement/user story to the test cases that verify it:

| Requirement/Story | Test Cases | Coverage Status |
|-------------------|------------|-----------------|

Identify any requirements without test coverage and flag them.

### 5. Environment Matrix
Define testing across:

| Environment | Browser(s) | Device(s) | OS | Resolution |
|-------------|-----------|-----------|-----|------------|

Include:
- Desktop: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Tablet: iPad (Safari), Android tablet (Chrome)
- Mobile: iPhone (Safari), Android phone (Chrome)
- Assistive tech: NVDA + Chrome, VoiceOver + Safari, JAWS + Edge

### 6. Test Data Requirements
- What test data is needed (users, content, configurations)
- How to create or seed test data
- Data privacy considerations (no real PII in test environments)
- Data state requirements (pre-existing content, empty database)

### 7. Entry & Exit Criteria
**Entry Criteria** — what must be true before testing starts:
- Code deployed to test environment
- Unit tests passing at X% coverage
- Test data seeded

**Exit Criteria** — what must be true before testing is "done":
- All Priority 1 and Priority 2 test cases pass
- Zero critical or high-severity open defects
- Accessibility scan shows zero automatic violations
- Performance meets defined thresholds

### 8. Defect Severity Classification
| Severity | Definition | Example | SLA |
|----------|-----------|---------|-----|
| Critical | ... | ... | ... |
| High | ... | ... | ... |
| Medium | ... | ... | ... |
| Low | ... | ... | ... |

### 9. Risk-Based Testing Priorities
Identify the highest-risk areas and allocate testing effort proportionally:
- New code with no prior testing
- Integration points between systems
- Areas with a history of defects
- Features with high business impact
- Performance-sensitive operations

### 10. Automation Candidates
Identify which test cases should be automated:
- Repetitive regression scenarios
- Data-driven tests with many input combinations
- Cross-browser/cross-device compatibility checks
- Smoke test suite for deployment verification
- API contract tests

For each candidate, recommend the tool (Cypress, Playwright, Jest, k6) and estimated effort.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-test-plan/SKILL.md`:

```markdown
---
name: generate-test-plan
description: Generates a comprehensive test plan with test cases, coverage matrix, environment requirements, and automation recommendations from user stories or requirements. Use when planning QA for a new feature, sprint, or release.
argument-hint: "[feature or project name]"
allowed-tools: Read, Glob, Grep
---

# Generate Test Plan

You are a senior QA engineer with expertise in test strategy, CMS platform testing, accessibility testing, and cross-browser/cross-device testing.

## Your Task

Generate a comprehensive test plan for: **$ARGUMENTS**

## Process

### Step 1: Understand the Feature
- Read requirement documents, user stories, or feature specs in the project
- Search for existing test files to understand current coverage and patterns
- Check package.json for test frameworks and configuration
- Look for accessibility configuration (axe, pa11y) and performance budgets
- Identify the tech stack and deployment targets

### Step 2: Generate the Test Plan
Produce a complete plan with:
1. Test plan overview with objectives and scope
2. Test strategy by level (unit, integration, E2E, accessibility, performance)
3. Test case inventory table (ID, category, description, steps, expected result, priority)
4. Coverage traceability matrix (requirement → test cases)
5. Environment matrix (browsers, devices, OS, assistive technology)
6. Test data requirements
7. Entry/exit criteria
8. Defect severity classification
9. Risk-based testing priorities
10. Automation candidates with tool recommendations

### Step 3: Validate Coverage
- Verify every user story or requirement has at least one test case
- Confirm negative, boundary, and accessibility test cases exist
- Check that high-risk areas have proportionally more test coverage

### Quality Check
- Every requirement maps to at least one test case
- Test cases include happy path, negative, boundary, and accessibility scenarios
- Environment matrix covers the project's actual browser/device targets
- Entry and exit criteria are measurable, not subjective
```

### Usage

```
/generate-test-plan Checkout flow redesign — multi-step form with payment integration, address validation, and order confirmation
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project or feature name | `Contoso E-Commerce Checkout Redesign` |
| `{{FEATURE_DESCRIPTION}}` | What the feature does | `Multi-step checkout with address validation, payment processing (Stripe), order confirmation email, and guest checkout option` |
| `{{USER_STORIES}}` | User stories or requirements to test against | `As a customer, I can enter my shipping address and see real-time validation. As a customer, I can pay with credit card or PayPal. As a guest, I can check out without creating an account.` |
| `{{TECH_STACK}}` | Technologies used in the feature | `Next.js 14, React 18, Stripe Elements, Azure Functions API, Sitecore XM Cloud for content` |
| `{{TEST_ENVIRONMENTS}}` | Available test environments | `Local (dev), Azure Dev (shared), Azure Staging (client UAT), Production` |
| `{{COMPLIANCE_REQUIREMENTS}}` | Regulatory or accessibility standards | `WCAG 2.2 Level AA, PCI DSS (payment handling), GDPR (EU customers)` |

## Best Practices

- **Model choice:** Sonnet 4 generates thorough, well-structured test plans for most features. Use Opus 4 when the feature involves complex business logic (multi-step workflows, conditional rules, financial calculations) where test case completeness requires deeper reasoning about edge cases.
- **Paste real user stories:** The test plan quality is directly proportional to the specificity of `{{USER_STORIES}}`. Paste the actual acceptance criteria, not summaries. Every acceptance criterion becomes a test case.
- **Start with risks:** Before generating, identify the three highest-risk areas. Mention them in `{{FEATURE_DESCRIPTION}}` so the AI allocates more test cases to those areas.
- **Prune for your sprint:** The generated plan is comprehensive by design. Remove sections that don't apply to your timeline — a one-week sprint doesn't need a full performance test suite.
- **Track traceability:** The coverage matrix is the most valuable artifact. Keep it updated as requirements change — untested requirements are unverified assumptions.

## Related Skills

- [Audit WCAG Compliance](/test-and-review/auditing/audit-wcag-compliance/) — Deep-dive into accessibility testing beyond what the test plan covers at a surface level
- [Generate Requirements Document](/plan/discovery-and-requirements/generate-requirements-document/) — Generate the requirements that feed into this test plan
