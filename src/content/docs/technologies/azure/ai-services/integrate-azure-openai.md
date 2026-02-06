---
title: Integrate Azure OpenAI
description: Design and scaffold an Azure OpenAI integration for search enhancement, content generation, or intelligent features in a CMS-powered application
---

## Context & Goal

Azure OpenAI lets RBA add AI-powered features to CMS-driven sites — intelligent search that understands natural language, content generation that drafts pages from briefs, summarization that creates excerpts automatically, and classification that tags content without manual effort. But dropping a GPT call into a controller is not an integration. This skill designs the full architecture: resource configuration, prompt management, RAG patterns for grounded responses, content safety guardrails, and monitoring to keep costs and quality under control.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior AI engineer with deep expertise in Azure OpenAI, prompt engineering, RAG (Retrieval-Augmented Generation) patterns, Azure AI Search integration, and responsible AI practices. You build production AI features for enterprise CMS-powered applications — not prototypes, but systems that handle real traffic with proper error handling, monitoring, and cost controls.

Design and scaffold an Azure OpenAI integration for the following use case:

**Use Case:** {{USE_CASE}}
**CMS Platform:** {{CMS_PLATFORM}}
**Model Selection:** {{MODEL_SELECTION}}

**Data Sources:**
{{DATA_SOURCES}}

**Responsible AI Requirements:**
{{RESPONSIBLE_AI_REQUIREMENTS}}

Produce the following deliverables:

### 1. Integration Architecture Overview
- System diagram description (CMS → API layer → Azure OpenAI → response)
- Where AI processing happens in the request lifecycle
- Synchronous vs. asynchronous processing decision
- Fallback behavior when Azure OpenAI is unavailable
- Data flow: what data goes to the model, what comes back, what is stored

### 2. Azure OpenAI Resource Configuration
- Resource provisioning (region selection for latency and availability)
- Model deployment configuration:
  - Model name and version (GPT-4o, GPT-4o-mini, text-embedding-ada-002)
  - TPM (tokens per minute) allocation per deployment
  - Content filtering configuration (severity thresholds per category)
- Deployment strategy (single deployment, blue/green for model updates)
- Quota management and throttling configuration

### 3. API Client Setup
Provide code in the appropriate language (.NET for Sitecore/Umbraco/Optimizely, Node.js for headless):
- Azure OpenAI client initialization with managed identity (no API keys in code)
- Retry policy with exponential backoff (handle 429 rate limiting)
- Timeout configuration
- Connection pooling and client reuse
- Streaming response handling (for chat/generation use cases)
- Error handling (rate limit, content filter triggered, model overloaded)

### 4. Prompt Template Design
For the specified use case, design:
- **System prompt** — Role, constraints, output format, guardrails
- **User prompt template** — With variable placeholders for dynamic content
- **Few-shot examples** — 2-3 input/output pairs that demonstrate expected behavior
- **Output format specification** — JSON schema, markdown structure, or plain text
- Prompt versioning strategy (how to update prompts without redeploying)
- Token budget allocation (system prompt, context, user input, response)

### 5. RAG Implementation (if search-enhanced)
If the use case requires grounding in organizational data:
- **Azure AI Search index design:**
  - Index schema (fields, types, searchable/filterable/facetable)
  - Data source connection (CMS content, documents, database)
  - Indexer configuration and schedule
  - Semantic ranking configuration
  - Vector search field for embeddings
- **Embedding generation pipeline:**
  - Content chunking strategy (size, overlap, section-aware)
  - Embedding model selection and batch processing
  - Index update triggers (content publish webhook)
- **Retrieval pipeline:**
  - Query formulation (user query → search query)
  - Hybrid search (keyword + vector + semantic)
  - Top-K selection and relevance threshold
  - Context window assembly (retrieved chunks → prompt context)
- **Generation with grounding:**
  - System prompt enforcing citation of sources
  - Context injection format
  - Hallucination reduction techniques
  - Source attribution in the response

### 6. Response Handling
- Response parsing and validation
- Streaming vs. buffered response delivery to the UI
- Token count tracking per request
- Response caching strategy (when appropriate)
- Graceful degradation (fallback to standard search, static content)
- User feedback collection (thumbs up/down, correction)

### 7. Content Safety Configuration
- Azure AI Content Safety integration
- Content filtering levels per category:
  | Category | Input Filter | Output Filter |
  |----------|-------------|---------------|
  | Hate | Medium | Low |
  | Violence | Medium | Low |
  | Sexual | High | High |
  | Self-harm | High | High |
- Custom blocklists (brand-specific terms, competitor names)
- Prompt injection detection and mitigation
- PII detection and handling
- Jailbreak attempt monitoring

### 8. Monitoring and Logging
- Application Insights integration for AI-specific telemetry
- Custom metrics:
  - Token usage per request (prompt tokens, completion tokens)
  - Latency (time to first token, total response time)
  - Error rates by type (rate limit, content filter, timeout)
  - Cache hit rate
  - User satisfaction (feedback signals)
- Cost tracking dashboard (daily/weekly/monthly token spend)
- Alert rules (cost threshold, error rate spike, latency degradation)
- Log retention and compliance (what AI interactions are logged, PII handling)

### 9. Cost Estimation and Optimization
- Per-request cost calculation for the chosen model
- Monthly cost projection at expected traffic volume
- Cost optimization techniques:
  - Prompt caching for repeated contexts
  - Response caching for common queries
  - Model selection optimization (GPT-4o-mini for simple tasks, GPT-4o for complex)
  - Token budget management (truncation, summarization of long inputs)
  - Batch processing for non-real-time workloads
- Cost monitoring alerts and circuit breakers

### 10. Testing Strategy
- **Prompt evaluation:**
  - Test dataset with expected inputs and golden outputs
  - Automated evaluation metrics (relevance, faithfulness, coherence)
  - A/B testing framework for prompt variants
- **Integration testing:**
  - Mock Azure OpenAI responses for unit tests
  - End-to-end tests with actual model calls (in dev environment)
  - Load testing for concurrent request handling
- **Regression testing:**
  - Prompt regression suite (detect quality degradation after changes)
  - Model version comparison testing
- **Red team testing:**
  - Prompt injection attempts
  - Content safety boundary testing
  - Edge cases (empty input, extremely long input, non-English input)

### 11. Responsible AI Guardrails
- Transparency: user-visible disclosure that AI generated the content
- Grounding: responses cite specific sources, do not fabricate
- Human oversight: editorial review for AI-generated published content
- Data privacy: what user data is sent to the model, retention policies
- Bias monitoring: regular review of AI outputs for fairness
- Kill switch: ability to disable AI features without full redeployment

Include production-ready code, not pseudocode. Handle edge cases and errors. Follow the principle of least privilege for all Azure resource access.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/integrate-azure-openai/SKILL.md`:

```markdown
---
name: integrate-azure-openai
description: Designs and scaffolds Azure OpenAI integrations for CMS-powered applications including search enhancement, content generation, and intelligent features. Use when adding AI capabilities to Sitecore, Umbraco, or Optimizely implementations.
argument-hint: "[use case, CMS platform, and AI requirements]"
allowed-tools: Read, Glob, Grep, Write, WebSearch
---

# Integrate Azure OpenAI

You are a senior AI engineer with deep expertise in Azure OpenAI, prompt engineering, RAG patterns, Azure AI Search, and responsible AI practices.

## Your Task

Design and scaffold an Azure OpenAI integration for: **$ARGUMENTS**

## Process

### Step 1: Assess the Project
- Read the project structure to identify the CMS platform and language (.NET, Node.js)
- Check for existing Azure OpenAI or AI Search configuration
- Look for existing search implementations that could be enhanced
- Identify content types and data sources relevant to the AI use case
- Check for existing API client patterns and dependency injection setup

### Step 2: Research Current APIs
- Use WebSearch to verify the latest Azure OpenAI SDK documentation
- Check for recent model availability and pricing changes
- Review Azure AI Search integration patterns for the SDK version

### Step 3: Design and Scaffold
Produce:
1. Integration architecture overview
2. Azure OpenAI resource configuration
3. API client code with retry and error handling
4. Prompt templates with versioning strategy
5. RAG implementation (if search-enhanced)
6. Response handling with fallbacks
7. Content safety configuration
8. Monitoring and logging setup
9. Cost estimation and optimization plan
10. Testing strategy
11. Responsible AI guardrails

### Step 4: Write Code
- Write the API client class following the project's existing patterns
- Write prompt template files
- Write configuration files for Azure resources
- Write test scaffolds

### Step 5: Quality Check
- Client uses managed identity, not hardcoded API keys
- Retry policy handles 429 rate limiting with exponential backoff
- Content safety filtering is configured, not left at defaults
- Cost estimation uses current Azure pricing
- Prompts include system-level guardrails against injection
- Tests cover happy path, error cases, and content safety triggers
```

### Usage

```
/integrate-azure-openai Intelligent site search for Umbraco v13 site — RAG over 2,000 content pages, using GPT-4o-mini for query understanding and response generation
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{USE_CASE}}` | What the AI integration should do | `Intelligent site search — users ask natural language questions, AI searches CMS content and generates grounded answers with citations` |
| `{{CMS_PLATFORM}}` | The CMS platform and version | `Umbraco v13 on .NET 8`, `Sitecore XM Cloud with Next.js`, `Optimizely CMS on .NET 8` |
| `{{MODEL_SELECTION}}` | Preferred Azure OpenAI model(s) | `GPT-4o for generation, text-embedding-3-large for embeddings` or `GPT-4o-mini for cost-efficient generation` |
| `{{DATA_SOURCES}}` | What data the AI should have access to | `2,000 CMS content pages, 500 PDFs in media library, product catalog with 3,000 SKUs` |
| `{{RESPONSIBLE_AI_REQUIREMENTS}}` | Compliance and safety requirements | `Financial services regulated — no investment advice, all responses must cite source pages, PII must not be sent to the model, audit log required` |

## Best Practices

- **Model choice for the skill itself:** Use Opus 4 for Azure OpenAI integration design. The architecture involves interconnected decisions (model selection affects cost, RAG design affects quality, safety config affects functionality) that benefit from deeper reasoning. Sonnet 4 can scaffold simple, single-purpose integrations like a content summarizer.
- **Start with GPT-4o-mini:** For most CMS integrations, GPT-4o-mini provides sufficient quality at a fraction of the cost. Upgrade to GPT-4o only after testing shows quality gaps.
- **Design the RAG pipeline before the prompts:** The retrieval quality determines the generation quality. Invest in chunking strategy, embedding quality, and relevance filtering before refining prompts.
- **Set cost alerts from day one:** Azure OpenAI costs scale with traffic. Configure budget alerts before going to production, not after the first invoice surprise.
- **Test with adversarial inputs:** Prompt injection is a real risk. Include red team testing in your implementation, especially for user-facing features.
- **Plan the kill switch:** Every AI feature should be toggleable via feature flag. When the model produces unexpected results at 2 AM, the team needs to disable it without a deployment.

## Related Skills

- [Research Any Topic](/cross-role/research-any-topic/) — Research AI patterns and best practices before designing the integration
- [Configure Sitecore Search](/technologies/sitecore/search/configure-sitecore-search/) — For Sitecore-specific search implementations that could be enhanced with AI
