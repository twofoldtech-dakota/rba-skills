---
title: Configure Heartcore Content Delivery
description: Design and configure Umbraco Heartcore content delivery including API structure, webhooks, and front-end integration patterns
---

## Context & Goal

Umbraco Heartcore is a headless SaaS CMS where content is delivered via REST and GraphQL APIs to decoupled front-ends. Unlike self-hosted Umbraco, there is no Razor rendering layer — the front-end framework handles all presentation. This skill designs the content delivery architecture: API query structure, caching strategy, webhook configuration, and front-end integration patterns that keep the site fast and the content fresh.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior developer with deep expertise in Umbraco Heartcore, headless CMS architecture, REST and GraphQL API consumption, and front-end framework integration with Next.js, React, and Vue. You understand CDN caching, webhook-driven revalidation, and the trade-offs of different data fetching strategies.

Design the content delivery architecture for the following Umbraco Heartcore project:

**Project Name:** {{PROJECT_NAME}}
**Front-End Framework:** {{FRONT_END_FRAMEWORK}}

**Content Types:**
{{CONTENT_TYPES}}

**Caching Requirements:** {{CACHING_REQUIREMENTS}}
**Webhook Needs:** {{WEBHOOK_NEEDS}}

Produce the following deliverables:

### 1. Delivery Architecture Overview
- High-level diagram description (Heartcore → API → CDN/Edge → Front-end)
- Data flow for content publish, update, and unpublish events
- Environment topology (preview, staging, production)

### 2. Content Delivery API Structure
- REST API endpoints for each content type (list, detail, children, ancestors)
- Query parameters: filtering, sorting, pagination, field selection
- Content type-specific queries with example request/response pairs
- Nested content and block-level content retrieval
- Media delivery URLs and image crop parameters

### 3. GraphQL Query Design
- GraphQL schema mapping for each content type
- Optimized queries that avoid over-fetching
- Fragment definitions for reusable content type fields
- Pagination with cursor-based or offset approaches
- When to use GraphQL vs. REST for specific use cases

### 4. Content Modeling for Headless Delivery
- Structured content vs. rich text — when to use each
- Link handling (internal content links, external URLs, media links)
- Image and media delivery patterns (responsive images, srcset)
- Multi-language content delivery (if applicable)
- Preview content vs. published content API differences

### 5. Webhook Configuration
- Events to subscribe to (content published, unpublished, deleted, media updated)
- Webhook endpoint design on the front-end hosting platform
- Payload structure and verification
- Retry policy and failure handling
- Webhook-triggered actions (cache purge, ISR revalidation, search index update)

### 6. Caching Strategy
- CDN caching rules (TTL by content type, cache-control headers)
- ISR (Incremental Static Regeneration) configuration if using Next.js
- Stale-while-revalidate patterns
- Cache invalidation via webhooks
- Edge caching for API responses
- Browser caching for media assets

### 7. Front-End Integration Patterns
- API client setup (authentication, base URL, error handling)
- Data fetching layer (server-side, static generation, client-side)
- Preview mode implementation (draft content viewing for editors)
- Live editing support (if using Heartcore's preview API)
- Error boundaries and fallback content
- TypeScript type generation from content types

### 8. Environment Configuration
- API key management (delivery key, preview key, management key)
- CORS configuration
- Rate limiting awareness
- Environment-specific settings (dev, staging, production)

Include code examples for the specified front-end framework. Show actual API calls, not pseudocode.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/configure-heartcore-delivery/SKILL.md`:

```markdown
---
name: configure-heartcore-delivery
description: Designs and configures Umbraco Heartcore content delivery architecture including API structure, webhooks, caching, and front-end integration. Use when setting up a headless Umbraco Heartcore project or optimizing content delivery.
argument-hint: "[project name, front-end framework, and delivery requirements]"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Configure Heartcore Content Delivery

You are a senior developer with deep expertise in Umbraco Heartcore, headless CMS architecture, REST/GraphQL API consumption, and front-end framework integration.

## Your Task

Design the content delivery architecture for: **$ARGUMENTS**

## Process

### Step 1: Assess the Project
- Read the front-end project structure to identify the framework and version
- Check for existing API client code or data fetching utilities
- Look for environment configuration files (.env, config files)
- Identify the content types being used from any documentation or type definitions

### Step 2: Research Current APIs
- Use WebSearch to verify the latest Heartcore Content Delivery API documentation
- Check for any recent API changes or new features
- Review the GraphQL endpoint capabilities

### Step 3: Design and Document
Produce:
1. Delivery architecture overview
2. REST API endpoint structure with example queries
3. GraphQL query designs
4. Webhook configuration
5. Caching strategy
6. Front-end integration code
7. Environment configuration

### Step 4: Quality Check
- All API examples use correct Heartcore endpoint formats
- Caching strategy covers both CDN and application layers
- Webhook configuration includes error handling and retry logic
- Front-end code examples are framework-specific and runnable
- Environment setup covers all three API key types
```

### Usage

```
/configure-heartcore-delivery Next.js 14 site with Blog Posts, Service Pages, and Team Members — needs ISR with webhook revalidation
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Name of the project or site | `Acme Corporate Website` |
| `{{FRONT_END_FRAMEWORK}}` | Front-end framework and version | `Next.js 14 with App Router` or `Nuxt 3` or `React 18 SPA` |
| `{{CONTENT_TYPES}}` | Content types in the Heartcore project | `Home Page, Service Page, Blog Post, Team Member, Office Location, FAQ, Global Settings` |
| `{{CACHING_REQUIREMENTS}}` | How fresh content needs to be | `Blog posts can be cached 1 hour. Service pages should update within 5 minutes. Global nav must be near-real-time.` |
| `{{WEBHOOK_NEEDS}}` | What should happen when content changes | `Revalidate affected pages on publish. Rebuild sitemap on new page creation. Notify Slack on content unpublish.` |

## Best Practices

- **Model choice:** Sonnet 4 handles most Heartcore delivery designs well since the patterns are well-established. Use Opus 4 when designing complex multi-site delivery, custom GraphQL optimization, or sophisticated caching hierarchies.
- **Specify your framework version:** Next.js App Router vs. Pages Router changes the data fetching patterns significantly. Nuxt 3 vs. 2 is equally different. Be precise.
- **Think about preview mode early:** Editors need to preview draft content. The preview API uses a different key and returns unpublished content. Design this into the architecture from the start.
- **Plan cache invalidation before caching:** It is easier to cache aggressively when you have reliable webhook-driven invalidation. Design the webhook flow first, then set cache TTLs.
- **Test with real content:** The API response structure varies by content type configuration. Test your queries against the actual Heartcore project, not just the documentation examples.

## Related Skills

- [Scaffold React Component](/build/component-development/scaffold-react-component/) — Build front-end components that consume the Heartcore API
- [Generate API Specification](/build/architecture-and-integration/generate-api-specification/) — Document the API contract between Heartcore and the front-end
