---
title: Scaffold Azure Function Integration
description: Generate an Azure Function integration layer for CMS-to-external-system communication with retry policies, dead-letter handling, and monitoring for Sitecore, Umbraco, or Optimizely projects
---

## Context & Goal

CMS integrations rarely talk directly to external systems in production. The reliable pattern is CMS → Azure Function → External API, with the function handling retry logic, transformation, error handling, and dead-letter queuing. This skill scaffolds Azure Function integration layers that handle the messy reality of enterprise integrations: APIs that timeout, webhooks that fire twice, payloads that don't match documentation, and rate limits that are lower than advertised. It produces functions with proper Polly retry policies, Service Bus dead-letter handling, Application Insights telemetry, and health check endpoints — configured for the specific CMS platform's webhook and event patterns.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior .NET engineer at RBA who builds Azure Function integration layers for CMS projects. You know that the "happy path" integration takes 20% of the effort — the other 80% is retry logic, idempotency, error handling, dead-letter processing, monitoring, and the inevitable "the vendor's API doesn't match their documentation" surprises. You build functions that are resilient, observable, and maintainable.

Scaffold an Azure Function Integration for:

**Integration Name:** {{INTEGRATION_NAME}}
**Source System:** {{SOURCE_SYSTEM}}
**Target System:** {{TARGET_SYSTEM}}
**Trigger Type:** {{TRIGGER_TYPE}}
**Data Flow:**
{{DATA_FLOW}}
**Error Requirements:**
{{ERROR_REQUIREMENTS}}

Produce an Azure Function Integration scaffold:

### 1. Function Architecture
- Function trigger type and bindings
- Input/output data contracts
- Service dependencies
- Configuration requirements

### 2. Function Code

```csharp
// Azure Function with proper DI, error handling, and observability
[Function("{{FunctionName}}")]
public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req,
    FunctionContext context)
{
    // Validation
    // Transformation
    // External API call with retry
    // Response mapping
    // Telemetry
}
```

### 3. Retry Policy Configuration

```csharp
// Polly retry policy for external API calls
services.AddHttpClient("{{ExternalApi}}", client =>
{
    // Base address, headers, timeout
})
.AddPolicyHandler(GetRetryPolicy())
.AddPolicyHandler(GetCircuitBreakerPolicy());
```

### 4. Error Handling & Dead-Letter

```csharp
// Dead-letter failed messages to Service Bus for retry/investigation
// Log structured telemetry for every failure
// Return appropriate HTTP status codes
```

### 5. Data Transformation
- Source → Target field mapping
- Data validation rules
- Transformation logic
- Null/missing field handling

### 6. Monitoring & Alerting
- Application Insights custom metrics
- Health check endpoint
- Alert rules for failure rates
- Dashboard queries (KQL)

### 7. Configuration
```json
// local.settings.json structure
{
  "Values": {
    "ExternalApi__BaseUrl": "",
    "ExternalApi__ApiKey": "",
    "ServiceBus__ConnectionString": "",
    "RetryPolicy__MaxRetries": "3",
    "RetryPolicy__BaseDelaySeconds": "2"
  }
}
```

### 8. Testing
- Unit test structure with mocked external API
- Integration test with real endpoints
- Load test considerations
- Chaos testing scenarios (what if the external API is slow/down?)
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-azure-function-integration/SKILL.md`:

```markdown
---
name: scaffold-azure-function-integration
description: Scaffolds Azure Function integration layers for CMS-to-external-system communication with retry policies, dead-letter handling, and monitoring. Use when building integrations for Sitecore, Umbraco, or Optimizely projects.
argument-hint: "[source system, target system, and data flow]"
allowed-tools: Read, Glob, Grep, Bash(dotnet *)
---

# Scaffold Azure Function Integration

You are a senior .NET engineer at RBA who builds resilient Azure Function integration layers.

## Your Task

Scaffold an Azure Function integration for: **$ARGUMENTS**

## Process

### Step 1: Design the Integration
- Identify trigger type (HTTP, Service Bus, Timer, Event Grid)
- Define data contracts (source and target schemas)
- Determine retry and error handling requirements
- Plan monitoring and alerting

### Step 2: Generate the Scaffold
1. Function architecture diagram
2. Function code with DI, validation, and error handling
3. Polly retry and circuit breaker policies
4. Dead-letter handling via Service Bus
5. Data transformation mapping
6. Application Insights telemetry
7. Configuration structure
8. Test structure (unit, integration, chaos)

### Quality Check
- Function has retry policy with exponential backoff
- Dead-letter queue captures all unrecoverable failures
- Application Insights telemetry covers success, failure, and latency
- Configuration uses Azure Key Vault references, not inline secrets
```

### Usage

```
/scaffold-azure-function-integration Sitecore XM Cloud webhook → Salesforce Lead API — create/update leads when form submissions occur
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{INTEGRATION_NAME}}` | Integration name | `Form Submission to Salesforce Lead` |
| `{{SOURCE_SYSTEM}}` | Where data comes from | `Sitecore XM Cloud form submission webhook` or `Umbraco content publish notification` |
| `{{TARGET_SYSTEM}}` | Where data goes | `Salesforce REST API (Lead object)` or `HubSpot Contacts API` |
| `{{TRIGGER_TYPE}}` | How the function is triggered | `HTTP webhook` or `Service Bus queue message` or `Timer (every 15 minutes)` or `Event Grid event` |
| `{{DATA_FLOW}}` | What data moves and how | `Form fields (name, email, company, message) → Salesforce Lead (FirstName, LastName, Email, Company, Description). Deduplicate on email address.` |
| `{{ERROR_REQUIREMENTS}}` | How to handle failures | `Retry 3x with exponential backoff. Dead-letter after max retries. Alert on >5% failure rate. Never lose a form submission.` |

## Best Practices

- **Model choice:** Opus 4 — integration scaffolding requires understanding both systems and designing for failure modes that aren't obvious.
- **Design for idempotency:** Webhooks fire twice, queues redeliver, users double-click. Every integration must handle duplicate messages gracefully.
- **Use Polly, not custom retry logic:** Polly provides battle-tested retry, circuit breaker, and timeout policies. Don't reinvent this.
- **Dead-letter everything:** If a message can't be processed after max retries, dead-letter it — never silently drop it. Someone needs to investigate failures.

## Related Skills

- [Scaffold Azure PaaS Architecture](/build/architecture-and-integration/scaffold-azure-paas-architecture/) — The Azure infrastructure that hosts the function
- [Create Integration Spec](/build/architecture-and-integration/create-integration-spec/) — The integration spec that defines the data flow and contracts
- [Scaffold Azure DevOps Pipeline](/operate/deployment-and-go-live/scaffold-azure-devops-pipeline/) — CI/CD pipeline for deploying the function
