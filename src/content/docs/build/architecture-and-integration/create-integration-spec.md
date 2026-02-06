---
title: Create Integration Specification
description: Design a system integration specification covering data flow, authentication, error handling, and monitoring between two or more systems
---

## Context & Goal

Full-stack engineers at RBA frequently integrate CMS platforms with third-party systems — CRMs, ERPs, marketing automation, payment processors, and search services. These integrations are where projects fail silently: data mismatches, authentication edge cases, retry storms, and monitoring gaps. This skill produces a complete integration specification that both development teams can build against, covering the handshake between systems end-to-end so nothing falls through the cracks.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior integration architect with expertise in enterprise system integration, middleware patterns, API design, event-driven architecture, and CMS platform APIs (Sitecore, Umbraco, Optimizely). You've designed integrations between CRMs, ERPs, marketing platforms, payment processors, and content management systems for enterprise clients.

Design a complete integration specification:

**Source System:** {{SOURCE_SYSTEM}}
**Target System:** {{TARGET_SYSTEM}}
**Integration Purpose:** {{INTEGRATION_PURPOSE}}
**Data Entities:** {{DATA_ENTITIES}}
**Sync Pattern:** {{SYNC_PATTERN}}
**Authentication Requirements:** {{AUTH_REQUIREMENTS}}

Produce a comprehensive integration specification with the following sections:

### 1. Integration Overview
- Business purpose and value statement
- Systems involved with version numbers
- Integration pattern summary (point-to-point, hub-and-spoke, event-driven)
- Data flow direction (one-way, bidirectional, event-triggered)
- Expected data volume and frequency

### 2. System Context Diagram
- Text-based diagram showing systems, data flows, and middleware
- Label each connection with protocol (REST, SOAP, webhook, message queue)
- Show authentication boundaries
- Mark synchronous vs. asynchronous flows

### 3. Data Flow Mapping
For each data entity, provide a field-level mapping table:
- Source field name and type
- Target field name and type
- Transformation rule (direct map, concatenate, lookup, format conversion, default value)
- Required/optional designation
- Validation rules that apply during transformation
- Conflict resolution strategy for bidirectional sync

### 4. Authentication & Authorization Flow
- Source system authentication method and credential storage
- Target system authentication method and credential storage
- Token refresh/rotation strategy
- Service account vs. user-context authentication
- Secret management approach (Azure Key Vault, AWS Secrets Manager)
- Certificate management if applicable

### 5. Sync Pattern Detail
Based on the specified pattern, define:
- **Real-time (webhook/event):** Event types, payload format, delivery guarantees, webhook registration, signature verification
- **Batch:** Schedule (cron expression), batch size, windowing strategy, delta detection method, full vs. incremental sync
- **Event-driven (message queue):** Topic/queue names, message schema, consumer groups, dead letter queue configuration, ordering guarantees
- Idempotency strategy — how duplicate events are detected and handled
- Ordering guarantees — whether processing order matters and how it's maintained

### 6. Endpoint Specifications
For each API call in the integration:
- HTTP method, URL, and headers
- Request payload with example
- Response payload with example
- Rate limits and throttling behavior
- Timeout configuration

### 7. Error Handling & Retry Strategy
- Transient error classification (network timeouts, 429, 503)
- Permanent error classification (400, 401, 404)
- Retry policy: max attempts, backoff strategy (exponential with jitter), circuit breaker thresholds
- Dead letter queue for failed messages
- Manual intervention workflow for permanent failures
- Data consistency recovery — what happens when one side succeeds and the other fails

### 8. Data Transformation Rules
- Field format conversions (date formats, currency, units)
- Enum/code mappings between systems
- Null/empty value handling
- Character encoding considerations
- Data sanitization and validation

### 9. Monitoring & Alerting
- Health check endpoints
- Key metrics to track (sync latency, error rate, queue depth, throughput)
- Alert thresholds and escalation paths
- Dashboard requirements
- Log format and retention policy

### 10. Testing Strategy
- Unit tests for transformation logic
- Integration tests with sandbox/staging environments
- End-to-end test scenarios with expected outcomes
- Load/performance test plan
- Chaos testing for failure scenarios (network partition, system down, slow response)

### 11. Rollback & Recovery Plan
- How to disable the integration safely
- Data reconciliation procedure after an outage
- Rollback steps if the integration causes data corruption
- Communication plan for downstream system owners

Provide enough detail that a developer could implement this integration without additional design meetings.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/create-integration-spec/SKILL.md`:

```markdown
---
name: create-integration-spec
description: Generates a complete system integration specification covering data flow, authentication, error handling, retry strategy, and monitoring. Use when integrating CMS platforms with third-party systems (CRMs, ERPs, payment processors, search services).
argument-hint: "[source system] to [target system] integration"
allowed-tools: Read, Glob, Grep, WebSearch
---

# Create Integration Specification

You are a senior integration architect with expertise in enterprise system integration, middleware patterns, event-driven architecture, and CMS platform APIs.

## Your Task

Create an integration specification for: **$ARGUMENTS**

## Process

### Step 1: Discover System Context
- Read project configuration to identify systems, versions, and existing integrations
- Search for API client code, webhook handlers, or message queue consumers
- Check for existing integration documentation or ADRs (Architecture Decision Records)
- Look for environment configuration that reveals third-party service connections
- Research the target system's API documentation for rate limits, auth patterns, and data formats

### Step 2: Design the Integration
Produce a specification covering:
1. Integration overview with business purpose and data flow direction
2. System context diagram (text-based)
3. Field-level data mapping tables (source → target with transformation rules)
4. Authentication and authorization flow for both systems
5. Sync pattern detail (real-time, batch, or event-driven)
6. Endpoint specifications with request/response examples
7. Error handling with retry policy and circuit breaker configuration
8. Monitoring metrics, alert thresholds, and dashboard requirements
9. Testing strategy including integration tests and chaos scenarios
10. Rollback and recovery plan

### Step 3: Validate Completeness
- Every data entity has a complete field mapping
- Error handling covers transient and permanent failures
- Monitoring covers latency, error rate, and queue depth
- Testing strategy includes failure scenario coverage

### Quality Check
- Specification is implementation-ready — a developer could build from it
- Both systems' constraints (rate limits, auth, data formats) are addressed
- Idempotency and ordering guarantees are explicitly defined
- Rollback plan exists for data corruption scenarios
```

### Usage

```
/create-integration-spec Sitecore XM Cloud to Salesforce CRM — sync form submissions as leads with bi-directional status updates
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SOURCE_SYSTEM}}` | The system initiating or sending data | `Sitecore XM Cloud (Next.js rendering host, Sitecore Forms)` |
| `{{TARGET_SYSTEM}}` | The system receiving or responding to data | `Salesforce CRM (REST API v58, Marketing Cloud)` |
| `{{INTEGRATION_PURPOSE}}` | Business reason for the integration | `Sync website form submissions to Salesforce as leads, push lead status back to Sitecore for personalization` |
| `{{DATA_ENTITIES}}` | What data moves between systems | `Form Submission → Lead (name, email, company, source, interests), Lead Status → Visitor Profile (status, score, last activity)` |
| `{{SYNC_PATTERN}}` | How data moves | `Real-time webhook for form→lead, batch hourly for status→profile` |
| `{{AUTH_REQUIREMENTS}}` | Authentication for both systems | `Sitecore: API key for webhooks; Salesforce: OAuth 2.0 client credentials flow with refresh token` |

## Best Practices

- **Model choice:** Use Opus 4 for integration specifications. These require careful reasoning about failure modes, data consistency, and edge cases that benefit from deeper analysis. Sonnet 4 works for simple one-way, single-entity integrations.
- **Research the target API first:** Before running the prompt, check the target system's API documentation for rate limits, authentication quirks, and pagination patterns. Include these constraints in `{{AUTH_REQUIREMENTS}}` or `{{SYNC_PATTERN}}`.
- **Map fields before generating:** Draft the field-level mapping in `{{DATA_ENTITIES}}` with as much specificity as possible. The more precise your input, the more accurate the transformation rules in the output.
- **Plan for failure first:** The most valuable part of this spec is sections 7 (Error Handling) and 11 (Rollback). Review these sections most carefully — they determine what happens at 2 AM when the integration breaks.
- **Validate with both teams:** Share the spec with engineers on both sides of the integration. Each team should confirm their system's constraints are accurately represented.

## Related Skills

- [Generate API Specification](/build/architecture-and-integration/generate-api-specification/) — Define the API contract for any custom middleware layer in the integration
- [Security Review Checklist](/test-and-review/compliance-and-security/security-review-checklist/) — Review authentication flows, secret management, and data handling in the integration
