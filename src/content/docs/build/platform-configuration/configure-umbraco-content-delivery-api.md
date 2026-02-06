---
title: Configure Umbraco Content Delivery API
description: Generate Umbraco Content Delivery API configuration with property expansion, custom filters, media delivery, and security settings for headless or hybrid architectures
---

## Context & Goal

Umbraco's Content Delivery API (introduced in v12, matured in v13+) enables headless delivery without Heartcore's SaaS overhead. But configuring it well requires understanding property expansion, output caching, custom query filters, media URL resolution, member authentication, and the differences between the built-in API and custom API controllers. Most teams either over-expose content (security risk) or under-configure the API (requiring custom endpoints that defeat the purpose). This skill produces a properly configured Content Delivery API setup that balances security, performance, and frontend developer experience — informed by RBA's Umbraco Gold Partner and Certified Master expertise.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior Umbraco developer with Certified Master-level expertise in the Content Delivery API. You know the configuration options, performance implications, and security considerations that separate a production-ready API from a demo setup. You configure APIs that are fast, secure, and developer-friendly — with proper property expansion, output caching, and media delivery.

Configure the Umbraco Content Delivery API for:

**Umbraco Version:** {{UMBRACO_VERSION}}
**Architecture:** {{ARCHITECTURE}}
**Content Types to Expose:**
{{CONTENT_TYPES}}
**Frontend Framework:** {{FRONTEND_FRAMEWORK}}
**Security Requirements:**
{{SECURITY_REQUIREMENTS}}

Produce a Content Delivery API Configuration:

### 1. Enable and Configure the API

```json
// appsettings.json — Content Delivery API configuration
{
  "Umbraco": {
    "CMS": {
      "DeliveryApi": {
        "Enabled": true,
        "PublicAccess": true,
        "MemberAuthorization": {
          // Member-protected content configuration
        },
        "Media": {
          // Media delivery URL configuration
        },
        "OutputCache": {
          "ContentDuration": "00:05:00",
          "MediaDuration": "01:00:00"
        }
      }
    }
  }
}
```

### 2. Content Type API Exposure

For each content type, specify:
| Content Type | Expose? | Properties to Include | Properties to Exclude | Expand? |
|-------------|---------|----------------------|----------------------|---------|

Configuration approach:
- Use `[ApiExpose]` attribute on document types for whitelist approach
- Configure property-level exposure for sensitive fields
- Set up property expansion for nested content and block lists

### 3. Custom Property Value Converters

```csharp
// Custom converters for complex property types
// Block List, Block Grid, Media Picker, Multi-URL Picker
// Ensure proper serialization for frontend consumption
```

### 4. Custom Query Filters

```csharp
// Custom filters for the Content Delivery API
// Filter by custom properties, date ranges, tags
public class CustomContentFilter : IFilterHandler
{
    // Implementation
}
```

### 5. Output Caching Strategy
- Content endpoints: [duration and invalidation strategy]
- Media endpoints: [duration]
- Search/filter endpoints: [duration or no cache]
- Cache invalidation on publish: [automatic via notification handler]

### 6. Media Delivery
- Media URL format (relative vs absolute)
- Image crop configuration
- CDN integration for media assets
- Responsive image URL generation

### 7. Security Configuration
- API key authentication (if private access)
- CORS configuration for frontend domains
- Rate limiting
- Content exposure audit (what's public vs protected)
- Member authentication for protected content

### 8. Frontend Integration Guide

```typescript
// TypeScript client for the Content Delivery API
// Typed responses based on content types
// Error handling and caching strategy
```

### 9. Performance Optimization
- Output cache configuration
- Property expansion depth limits
- Pagination configuration
- Query optimization for large content trees

### 10. Testing Checklist
- [ ] All expected content types return correctly
- [ ] Protected content requires authentication
- [ ] CORS headers are correct
- [ ] Output caching works (check headers)
- [ ] Media URLs resolve correctly
- [ ] Block List/Block Grid content serializes properly
- [ ] Custom filters work as expected
- [ ] Performance meets targets (< 200ms P95)
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/configure-umbraco-content-delivery-api/SKILL.md`:

```markdown
---
name: configure-umbraco-content-delivery-api
description: Configures Umbraco Content Delivery API with property expansion, custom filters, caching, and security. Use when setting up headless or hybrid Umbraco architectures.
argument-hint: "[content types to expose and frontend framework]"
allowed-tools: Read, Glob, Grep, Bash(dotnet *)
---

# Configure Umbraco Content Delivery API

You are an Umbraco Certified Master who configures production-ready Content Delivery APIs.

## Your Task

Configure the Content Delivery API for: **$ARGUMENTS**

## Process

### Step 1: Assess Requirements
- Identify content types to expose
- Determine security model (public, API key, member auth)
- Map frontend framework integration needs
- Plan caching strategy

### Step 2: Generate Configuration
1. appsettings.json configuration
2. Content type exposure settings
3. Custom property value converters
4. Custom query filters
5. Output caching strategy
6. Media delivery configuration
7. Security settings (CORS, auth, rate limiting)
8. TypeScript client code
9. Performance optimization
10. Testing checklist

### Quality Check
- Only intended content types are exposed
- Protected content requires authentication
- Output caching is configured with proper invalidation
- Media URLs work with CDN configuration
```

### Usage

```
/configure-umbraco-content-delivery-api Umbraco 13 — expose Article, Product, and FAQ content types for a Next.js frontend with member-protected premium content
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{UMBRACO_VERSION}}` | Umbraco version | `Umbraco 13.2 (.NET 8)` |
| `{{ARCHITECTURE}}` | Delivery architecture | `Headless with Next.js frontend` or `Hybrid — Razor views + React widgets via API` |
| `{{CONTENT_TYPES}}` | What to expose | `Article (title, body, author, category, featured image), Product (name, SKU, description, price, images), FAQ (question, answer, category)` |
| `{{FRONTEND_FRAMEWORK}}` | Frontend consuming the API | `Next.js 14 with App Router` or `React SPA` or `Mobile app (React Native)` |
| `{{SECURITY_REQUIREMENTS}}` | Access control needs | `Public content is open. Premium articles require member authentication. Admin-only content types must not be exposed.` |

## Best Practices

- **Model choice:** Sonnet 4 for standard configurations. Opus 4 for complex property value converters or custom filter implementations.
- **Whitelist, don't blacklist:** Use `[ApiExpose]` attributes to explicitly opt content types into the API rather than trying to exclude sensitive types. Default-deny is safer.
- **Configure output caching from day one:** The Content Delivery API without output caching hits the database on every request. Even a 60-second cache makes a massive difference at scale.
- **Test Block List serialization early:** Block List and Block Grid content types are the most common source of serialization issues. Test these first and write custom property value converters if needed.

## Related Skills

- [Scaffold Umbraco Document Type](/build/component-development/scaffold-umbraco-document-type/) — Properly scaffolded document types with API exposure annotations
- [Troubleshoot Umbraco Issue](/operate/troubleshooting/troubleshoot-umbraco-issue/) — Debug Content Delivery API serialization and caching issues
- [Scaffold Umbraco Block List Configuration](/build/component-development/scaffold-umbraco-block-list-configuration/) — Block List content that serializes correctly through the API
