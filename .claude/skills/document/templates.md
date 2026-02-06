# Starlight Documentation Templates

All templates produce Starlight-compatible `.md` or `.mdx` files with proper frontmatter and asides.

---

## API Reference Template

```markdown
---
title: "[Resource Name] API"
description: "API reference for [resource] — endpoints, parameters, and response formats."
sidebar:
  badge:
    text: "v2"
    variant: note
---

## Base URL

`https://api.example.com/v1`

## Authentication

How to authenticate (Bearer token, API key, etc.)

```bash title="Authenticated Request"
curl -X GET https://api.example.com/v1/resource \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Endpoints

### `GET` /resource

**Description:** What this endpoint does.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | The resource ID |

**Request Example:**

```bash title="GET /resource/123"
curl -X GET https://api.example.com/v1/resource/123 \
  -H "Authorization: Bearer TOKEN"
```

**Response (`200 OK`):**

```json title="Response"
{
  "id": "123",
  "name": "Example"
}
```

**Error Responses:**

| Status | Code | Description |
|--------|------|-------------|
| 404 | `NOT_FOUND` | Resource does not exist |
| 401 | `UNAUTHORIZED` | Invalid or missing token |

:::caution
Rate limiting applies. See [Rate Limits](#rate-limits) below.
:::

## Rate Limits

Describe rate limiting behavior.

## Changelog

| Date | Change |
|------|--------|
| YYYY-MM-DD | Initial release |
```

---

## Architecture Document Template

```markdown
---
title: "[System Name] Architecture"
description: "System design overview for [system] — components, data flow, and key decisions."
sidebar:
  badge:
    text: "Draft"
    variant: caution
---

## Status

Draft | Review | Approved | Deprecated

## Context

Why does this system exist? What problem does it solve?

## Goals and Non-Goals

**Goals:**
- What this system is designed to do

**Non-Goals:**
- What is explicitly out of scope

## High-Level Design

[ASCII diagram or Mermaid diagram of system components]

## Components

### Component A
- **Responsibility:** What it does
- **Technology:** What it's built with
- **Inputs/Outputs:** What flows in and out

## Data Flow

Step-by-step description of how data moves through the system.

## Key Design Decisions

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| Choice A | Why A | B, C — why they were rejected |

## Security Considerations

How the system handles auth, encryption, access control.

## Failure Modes

What happens when things break and how the system recovers.

:::danger
Describe any known single points of failure.
:::

## Dependencies

External systems and services this depends on.

## Observability

Logging, metrics, alerts, and dashboards.

## References

- [Related ADR](../adrs/001-example.md)
- [API Reference](../api/overview.md)
```

---

## ADR (Architecture Decision Record) Template

```markdown
---
title: "ADR-[NUMBER]: [Title]"
description: "Decision record for [brief description of the decision]."
---

## Status

Proposed | Accepted | Deprecated | Superseded by [ADR-X](./adr-x.md)

## Date

YYYY-MM-DD

## Context

What is the issue that we're seeing that is motivating this decision?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

### Positive
- What becomes easier or better

### Negative
- What becomes harder or worse

### Risks
- Uncertainties and how we plan to mitigate them

:::caution
Highlight the most critical risk here.
:::

## Alternatives Considered

### Alternative A
- Description, pros, cons, why rejected

### Alternative B
- Description, pros, cons, why rejected
```

---

## Runbook Template

```markdown
---
title: "Runbook: [Procedure Name]"
description: "Operational procedure for [brief description]."
sidebar:
  badge:
    text: "Ops"
    variant: danger
---

## Purpose

When and why you would follow this runbook.

## Prerequisites

- Access requirements
- Tools needed
- Knowledge required

## Severity / Impact

What happens if this isn't done / done incorrectly.

:::danger
Describe the blast radius if this goes wrong.
:::

## Steps

### 1. [First Step]

```bash title="Step 1"
exact-command-to-run
```

**Expected output:** What you should see.

:::caution
**If this fails:** What to do instead.
:::

### 2. [Second Step]

...

## Verification

How to confirm the procedure was successful.

## Rollback

How to undo these changes if something goes wrong.

## Escalation

Who to contact if you get stuck.

## History

| Date | Author | Change |
|------|--------|--------|
| YYYY-MM-DD | Name | Created |
```

---

## Onboarding / Getting Started Template (MDX)

```mdx
---
title: "Getting Started"
description: "Set up your development environment and start working with [project]."
---

import { Steps, Tabs, TabItem } from '@astrojs/starlight/components';

Brief intro — what this project does and your role in it.

## Prerequisites

- [ ] Accounts you need (list each with signup links)
- [ ] Software to install
- [ ] Access to request

## Setup

<Steps>
1. **Clone and Install**

   ```bash title="Clone the repository"
   git clone <repo-url>
   cd <project>
   npm install
   ```

2. **Environment Configuration**

   ```bash title="Configure environment"
   cp .env.example .env
   # edit .env with your values
   ```

   :::tip
   Ask your team lead for the shared development secrets.
   :::

3. **Run Locally**

   <Tabs syncKey="pkg">
     <TabItem label="npm">
       ```bash
       npm run dev
       ```
     </TabItem>
     <TabItem label="pnpm">
       ```bash
       pnpm dev
       ```
     </TabItem>
   </Tabs>

4. **Verify It Works**

   ```bash title="Run health check"
   npm run test
   ```
</Steps>

## Project Structure

Key directories and what they contain.

## Development Workflow

How to make changes, run tests, submit PRs.

## Key Concepts

Terms and concepts you need to know.

## Common Issues

| Problem | Solution |
|---------|----------|
| Error X | Do Y |

## Resources

- [Architecture Overview](../architecture/overview.md)
- [API Reference](../api/overview.md)
```

---

## Guide / Tutorial Template (MDX)

```mdx
---
title: "[Guide Title]"
description: "How to [accomplish specific task] with [technology/tool]."
---

import { Steps } from '@astrojs/starlight/components';

One-sentence summary of what the reader will accomplish.

## Overview

What this guide covers and who it's for.

:::note[Prerequisites]
List what the reader needs before starting.
:::

<Steps>
1. **[First Step]**

   Explanation of what this step does and why.

   ```bash title="[Descriptive title]"
   command-to-run
   ```

2. **[Second Step]**

   ...

3. **[Third Step]**

   ...
</Steps>

## What You Built

Summary of what was accomplished.

## Next Steps

- [Related Guide A](./related-a.md)
- [Related Guide B](./related-b.md)

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Error A | Reason | Fix |
```

---

## Landing / Splash Page Template (MDX)

```mdx
---
title: "[Site/Section Name]"
description: "[What this section of docs covers]."
template: splash
hero:
  title: "[Headline]"
  tagline: "[One-line value proposition]"
  image:
    file: ../../assets/hero.png
    alt: "[Image description]"
  actions:
    - text: Get Started
      link: /guides/getting-started/
      icon: right-arrow
      variant: primary
    - text: View on GitHub
      link: https://github.com/...
      icon: external
      variant: secondary
---

import { Card, CardGrid, LinkCard } from '@astrojs/starlight/components';

## Features

<CardGrid stagger>
  <Card title="Feature One" icon="star">
    Description of the first key feature.
  </Card>
  <Card title="Feature Two" icon="rocket">
    Description of the second key feature.
  </Card>
  <Card title="Feature Three" icon="pencil">
    Description of the third key feature.
  </Card>
  <Card title="Feature Four" icon="setting">
    Description of the fourth key feature.
  </Card>
</CardGrid>

## Quick Links

<CardGrid>
  <LinkCard title="Getting Started" href="/guides/getting-started/" description="Set up your environment and build your first page." />
  <LinkCard title="API Reference" href="/reference/api/" description="Complete API documentation with examples." />
  <LinkCard title="Core Concepts" href="/guides/concepts/" description="Key ideas you need to understand." />
  <LinkCard title="Changelog" href="/changelog/" description="See what's new in the latest release." />
</CardGrid>
```

---

## Changelog Template

```markdown
---
title: "Changelog"
description: "All notable changes to [project name]."
sidebar:
  order: 999
---

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/).

## [Version] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing functionality

### Fixed
- Bug fixes

### Removed
- Removed features

### Security
- Vulnerability fixes

### Deprecated
- Features that will be removed in future versions
```

---

## Internal / RFC / Proposal Template

```markdown
---
title: "RFC: [Proposal Title]"
description: "[Brief description of what is being proposed]."
draft: true
sidebar:
  badge:
    text: "RFC"
    variant: note
---

## Summary

One-paragraph summary of the proposal.

## Motivation

Why are we doing this? What problem does it solve?

## Detailed Design

Technical details of the proposed solution.

## Drawbacks

Why should we *not* do this?

## Alternatives

What other designs have been considered and why were they not chosen?

## Unresolved Questions

What parts of the design are still to be determined?

## Implementation Plan

| Phase | Scope | Timeline |
|-------|-------|----------|
| 1 | ... | ... |
| 2 | ... | ... |

:::caution
Identify the riskiest phase and mitigation strategy.
:::
```
