---
title: Generate API Specification
description: Create an OpenAPI 3.0 specification with endpoint definitions, schemas, authentication, and error handling from requirements
---

## Context & Goal

Back-end engineers at RBA build APIs that power headless CMS front-ends, mobile apps, and system integrations. Writing an OpenAPI specification before writing code establishes a contract that front-end teams can develop against and QA teams can test from. This skill transforms requirements into a formal OpenAPI 3.0 spec with endpoints, schemas, authentication, error handling, and examples — giving every team a shared source of truth before implementation begins.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior back-end engineer with expertise in RESTful API design, OpenAPI/Swagger specifications, .NET Web API, Node.js/Express, authentication patterns (OAuth 2.0, API keys, JWT), and integration architecture. You design APIs that are intuitive for consumers, consistent in their patterns, and production-hardened.

Create a complete OpenAPI 3.0 specification in YAML format:

**API Name:** {{API_NAME}}
**API Purpose:** {{API_PURPOSE}}
**Endpoints:** {{ENDPOINTS}}
**Authentication Method:** {{AUTHENTICATION_METHOD}}
**Data Models:** {{DATA_MODELS}}
**Error Handling:** {{ERROR_HANDLING}}

Generate a full OpenAPI 3.0.3 YAML specification with the following sections:

### 1. Info & Servers
- Title, version, description, and contact information
- Server URLs for development, staging, and production environments
- License information if applicable

### 2. Authentication & Security
- Define security schemes matching the specified authentication method
- OAuth 2.0 flows (authorization code, client credentials) with scope definitions
- API key configuration (header, query, cookie)
- JWT Bearer token setup
- Apply security globally and override per-endpoint where needed

### 3. Endpoint Paths
For each endpoint, define:
- HTTP method and path with RESTful naming conventions
- Operation ID (camelCase, unique, descriptive)
- Summary (one line) and description (detailed)
- Path parameters, query parameters, and request headers
- Request body with schema reference and required fields
- Response codes: 200/201 (success), 400 (validation), 401 (unauthorized), 403 (forbidden), 404 (not found), 409 (conflict), 500 (server error)
- Example request and response payloads for each endpoint
- Pagination parameters (page, pageSize, sort) for list endpoints
- Rate limiting headers (X-RateLimit-Limit, X-RateLimit-Remaining)

### 4. Component Schemas (Data Models)
- Define all data models as reusable components/schemas
- Use proper JSON Schema types (string, integer, number, boolean, array, object)
- Mark required fields explicitly
- Add format hints (date-time, email, uri, uuid)
- Include min/max constraints, pattern regex for validated fields
- Define enum values for constrained fields
- Use allOf/oneOf/anyOf for inheritance and polymorphism where appropriate

### 5. Error Response Schema
- Standardized error response object: { code, message, details[], traceId }
- Validation error format with field-level detail
- Map HTTP status codes to error scenarios

### 6. Pagination & Filtering
- Standard pagination response wrapper: { data[], pagination: { page, pageSize, totalItems, totalPages } }
- Common query parameters for filtering, sorting, and searching
- HATEOAS links if applicable

### 7. Examples
- Provide realistic example values for every schema
- Include example request/response pairs for the most common workflows
- Show both success and error scenarios

Output the complete YAML specification in a single code block, valid and parseable by any OpenAPI tool (Swagger UI, Redocly, Stoplight).
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-api-specification/SKILL.md`:

```markdown
---
name: generate-api-specification
description: Generates a complete OpenAPI 3.0 specification from requirements, including endpoints, schemas, authentication, error handling, and examples. Use when designing new APIs or formalizing existing ones.
argument-hint: "[API name and purpose]"
allowed-tools: Read, Glob, Grep, Write
---

# Generate API Specification

You are a senior back-end engineer with expertise in RESTful API design, OpenAPI specifications, and integration architecture.

## Your Task

Generate an OpenAPI 3.0 specification for: **$ARGUMENTS**

## Process

### Step 1: Discover Existing Patterns
- Search for existing OpenAPI/Swagger specs in the project to match conventions
- Read controller files or route definitions to understand existing endpoint patterns
- Check for a shared error response model or middleware
- Identify the authentication mechanism from configuration or middleware

### Step 2: Generate the Specification
Produce a complete OpenAPI 3.0.3 YAML file with:
1. Info section with API name, version, and description
2. Server URLs for dev, staging, and production
3. Security schemes (OAuth 2.0, API key, JWT)
4. Endpoint paths with parameters, request bodies, and response codes
5. Component schemas for all data models
6. Standardized error response schema
7. Pagination wrapper for list endpoints
8. Realistic example values for every schema and endpoint

### Step 3: Write the File
- Save the specification as `openapi.yaml` (or match existing naming)
- Ensure the YAML is valid and parseable by OpenAPI tools

### Quality Check
- Every endpoint has success and error response codes defined
- All schemas use proper types, formats, and constraints
- Authentication is applied correctly (global and per-endpoint overrides)
- Example values are realistic, not placeholder text
- Specification validates against OpenAPI 3.0.3 schema
```

### Usage

```
/generate-api-specification Product Catalog API for headless commerce with CRUD operations, search, and category filtering
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{API_NAME}}` | Name of the API | `Product Catalog API` |
| `{{API_PURPOSE}}` | What the API does and who consumes it | `Serves product data to the Next.js storefront and mobile app. Supports CRUD, search, filtering, and inventory checks.` |
| `{{ENDPOINTS}}` | List of endpoints to define | `GET /products, GET /products/{id}, POST /products, PUT /products/{id}, DELETE /products/{id}, GET /products/search?q=, GET /categories, GET /categories/{id}/products` |
| `{{AUTHENTICATION_METHOD}}` | How consumers authenticate | `OAuth 2.0 client credentials for service-to-service, JWT Bearer for user-facing` |
| `{{DATA_MODELS}}` | Key entities and their fields | `Product (id, name, description, price, categoryId, images[], inventory), Category (id, name, slug, parentId), Image (url, alt, width, height)` |
| `{{ERROR_HANDLING}}` | Error handling requirements | `Standard RFC 7807 problem details format, field-level validation errors, correlation IDs for tracing` |

## Best Practices

- **Model choice:** Sonnet 4 produces clean, well-structured OpenAPI specs for straightforward CRUD APIs. Use Opus 4 for APIs with complex authentication flows (multi-tenant OAuth, delegated permissions), polymorphic schemas, or intricate business logic that requires careful modeling.
- **Start with endpoints:** List your endpoints in `{{ENDPOINTS}}` before worrying about schemas. The data models become obvious once you know what each endpoint needs to accept and return.
- **Validate the output:** Paste the generated YAML into [Swagger Editor](https://editor.swagger.io/) or run it through a linter. AI-generated specs occasionally have subtle schema reference errors.
- **Use it as a contract:** Share the spec with front-end and QA teams before writing implementation code. The spec is the agreement — implementation follows.
- **Version from the start:** Include `version: 1.0.0` in the spec and establish a versioning strategy (URL path `/v1/` or header-based) before the API has consumers.

## Related Skills

- [Security Review Checklist](/test-and-review/compliance-and-security/security-review-checklist/) — Review the API's authentication, authorization, and input validation against OWASP standards
- [Generate Test Plan](/test-and-review/testing/generate-test-plan/) — Generate a test plan that covers every endpoint and error scenario defined in the spec
