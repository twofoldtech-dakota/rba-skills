---
title: Scaffold OrderCloud Integration
description: Generate the scaffolding for a Sitecore OrderCloud integration including API client setup, middleware, and storefront patterns
---

## Context & Goal

Sitecore OrderCloud is an API-first commerce platform that powers e-commerce for RBA's enterprise clients. Integrating OrderCloud with a headless Sitecore front-end requires a coordinated set of artifacts: API client authentication configuration, middleware for order workflows and payment processing, product catalog integration, cart and checkout flows, and storefront components. Getting the foundation wrong means rework across every commerce touchpoint. This skill scaffolds the entire integration layer so teams start with a working architecture rather than a blank canvas.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior commerce developer with expertise in Sitecore OrderCloud, headless commerce architecture, API-first e-commerce patterns, and Next.js storefront development. You've built OrderCloud integrations for enterprise retailers and B2B commerce platforms, handling complex catalog structures, custom order workflows, and multi-payment-provider configurations.

Scaffold the integration foundation for the following OrderCloud project:

**Project Name:** {{PROJECT_NAME}}
**Storefront Framework:** {{STOREFRONT_FRAMEWORK}}
**Catalog Structure:** {{CATALOG_STRUCTURE}}
**Order Workflow:** {{ORDER_WORKFLOW}}
**Payment Providers:** {{PAYMENT_PROVIDERS}}

Produce all of the following:

### 1. Integration Architecture Overview
- Architecture diagram (text/ASCII) showing the flow between storefront, middleware, OrderCloud API, and third-party services
- Authentication flow: buyer user login, anonymous browsing, token refresh strategy
- API client topology: which API clients are needed (storefront, middleware, integration events) and their roles/scopes
- Environment strategy: sandbox, staging, production configuration

### 2. OrderCloud API Client Setup
- API client configuration for each client (storefront buyer, middleware, admin)
- Authentication configuration: client credentials, password grant, anonymous shopping
- Base URL and API version configuration
- Required API client roles and security profiles
- Webhook/integration event registration
- Environment variables template (.env.example)

### 3. Middleware Layer
- **Order Submit Workflow** — Order validation, tax calculation, payment capture, order forwarding, confirmation
- **Payment Processing** — Integration with {{PAYMENT_PROVIDERS}}: tokenization, authorization, capture, refund flows
- **Inventory Sync** — Real-time or scheduled inventory updates, backorder handling
- **Pricing Integration** — Price schedules, sales/promotions, buyer-specific pricing, volume discounts
- **Fulfillment Integration** — Shipping rate calculation, carrier selection, tracking updates
- Express.js or Next.js API routes for each middleware endpoint
- Error handling, retry logic, and dead letter queue patterns

### 4. Product Catalog Integration
- **Product List** — Paginated product listing with filtering, sorting, and category navigation
- **Product Detail** — Full product data fetching including specs, variants, images, and pricing
- **Category Navigation** — Category tree rendering (top-level, subcategories, breadcrumbs)
- **Product Variants** — Spec-based variant selection (size, color, configuration)
- **Search and Filtering** — Product search with facets mapped to OrderCloud product facets
- TypeScript types for Product, Category, Spec, Variant, and PriceSchedule

### 5. Cart and Checkout Flow
- **Add to Cart** — Line item creation with variant selection and quantity
- **Cart Management** — View cart, update quantities, remove items, apply promotions
- **Checkout Steps** — Shipping address, shipping method, payment method, order review, order submit
- **Guest Checkout** — Anonymous order flow with account creation option post-purchase
- State management pattern (React Context, Zustand, or similar)
- Cart persistence strategy (OrderCloud order vs. local storage for anonymous users)

### 6. User Authentication
- **Buyer User Registration** — Account creation with required profile fields
- **Login/Logout** — Password grant authentication, token storage, session management
- **Profile Management** — Address book, saved payment methods, order history
- **Token Refresh** — Automatic refresh token handling, session expiry, re-authentication
- Auth context/provider implementation for the storefront

### 7. Storefront Components
For each component, specify: component name, data source (OrderCloud API endpoint), props interface, and key UI elements:
- ProductCard (product list item)
- ProductDetail (full product page)
- CategoryNav (category tree/breadcrumb)
- CartDrawer or CartPage (cart summary)
- CheckoutStepper (multi-step checkout)
- OrderHistory (past orders list)
- OrderDetail (single order view)
- AddressBook (manage shipping addresses)
- AccountDashboard (buyer user profile)

### 8. Environment Configuration
- Environment variables for each environment (sandbox, staging, production)
- OrderCloud organization and marketplace setup checklist
- Seed data script or configuration for development (sample products, categories, buyers)
- CI/CD considerations (API client secrets, environment promotion)

### 9. Testing Strategy
- Unit tests for middleware order workflow (mock OrderCloud API responses)
- Integration tests for cart and checkout flow (using OrderCloud sandbox)
- E2E test scenarios for critical commerce paths (browse > add to cart > checkout > confirm)
- Test data management (creating and cleaning up test orders)

Format each section with file paths, TypeScript code, and configuration snippets. Use TypeScript throughout. Follow OrderCloud SDK best practices and include ordercloud-javascript-sdk usage patterns.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/scaffold-ordercloud-integration/SKILL.md`:

```markdown
---
name: scaffold-ordercloud-integration
description: Scaffolds a Sitecore OrderCloud integration — API client setup, middleware for order workflows and payments, product catalog integration, cart/checkout flow, user authentication, and storefront components. Use when starting a new OrderCloud project or adding commerce to an existing Sitecore front-end.
argument-hint: "[project name and commerce requirements]"
allowed-tools: Read, Glob, Grep, Write, WebSearch
---

# Scaffold OrderCloud Integration

You are a senior commerce developer with expertise in Sitecore OrderCloud, headless commerce architecture, and Next.js storefront development.

## Your Task

Scaffold an OrderCloud integration for: **$ARGUMENTS**

## Process

### Step 1: Discover Project Context
- Read package.json to identify the storefront framework and existing dependencies
- Search for any existing OrderCloud SDK usage or commerce code
- Check for authentication patterns already in the project
- Identify the project's state management approach (Context, Zustand, Redux)
- Find environment configuration patterns (.env files, config modules)

### Step 2: Generate API Client Configuration
1. Define API clients for storefront, middleware, and admin
2. Configure authentication flows and security profiles
3. Create environment variables template
4. Set up webhook/integration event endpoints

### Step 3: Generate Middleware
1. Order submit workflow with validation, payment, and confirmation
2. Payment provider integration
3. Inventory and pricing sync
4. Error handling and retry logic

### Step 4: Generate Storefront Code
1. Product catalog components (list, detail, category nav)
2. Cart and checkout flow with state management
3. User authentication (registration, login, profile)
4. Commerce-specific TypeScript types

### Step 5: Generate Configuration and Tests
1. Environment configuration for sandbox, staging, production
2. Seed data scripts for development
3. Test scaffolds for middleware and checkout flows

### Quality Check
- All OrderCloud API calls use the official SDK with proper typing
- Authentication handles token refresh and session expiry
- Middleware includes error handling for OrderCloud API errors
- Cart state persists correctly for both authenticated and anonymous users
- Checkout flow handles all edge cases (empty cart, payment failure, inventory changes)
- Environment variables are documented and no secrets are hardcoded
```

### Usage

```
/scaffold-ordercloud-integration Contoso B2B storefront — Next.js with Stripe payments and multi-warehouse fulfillment
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Name of the commerce project | `Contoso B2B Marketplace` or `HealthCo Medical Supplies Store` |
| `{{STOREFRONT_FRAMEWORK}}` | Front-end framework for the storefront | `Next.js 14 (App Router) with Sitecore XM Cloud` or `Next.js 14 (Pages Router) standalone` |
| `{{CATALOG_STRUCTURE}}` | Product catalog organization | `3-level category hierarchy, 500 products, each with 2-5 variants (size, color). Products have specs for filtering.` |
| `{{ORDER_WORKFLOW}}` | Order processing requirements | `Standard B2C: cart > checkout > payment > fulfillment. Supports guest checkout. Orders route to nearest warehouse.` or `B2B with approval workflow: cart > quote request > manager approval > PO submission > fulfillment` |
| `{{PAYMENT_PROVIDERS}}` | Payment gateways to integrate | `Stripe (credit card, Apple Pay) + PayPal` or `Stripe for B2C, purchase orders for B2B buyers` |

## Best Practices

- **Model choice:** Use Opus 4 for the initial scaffold, especially when the order workflow involves approval chains, multi-warehouse fulfillment, or B2B pricing tiers. Commerce integrations have many interacting parts, and Opus produces more architecturally coherent scaffolds. Use Sonnet 4 for adding individual components to an existing integration or generating straightforward CRUD patterns.
- **Start with the order workflow:** The order workflow determines middleware complexity, payment integration depth, and checkout UX. Define it clearly before generating anything else.
- **Use OrderCloud sandbox:** OrderCloud provides free sandbox environments. Test all generated middleware against the sandbox API before connecting staging or production.
- **Secure API credentials:** Never commit OrderCloud client secrets. The scaffold includes an .env.example — make sure your actual .env is in .gitignore from the start.
- **Iterate on checkout:** The checkout flow is the most complex piece. Generate the scaffold, test the happy path end-to-end, then follow up with "add error handling for payment decline" or "add address validation step."
- **Review TypeScript types:** OrderCloud's SDK provides types, but custom middleware often needs extended types. Verify that the generated types align with your OrderCloud marketplace configuration.

## Related Skills

- [Scaffold Sitecore JSS Component](/build/component-development/scaffold-sitecore-jss-component/) — Build the CMS-managed components that wrap commerce storefront elements
- [Generate API Specification](/build/architecture-and-integration/generate-api-specification/) — Document the middleware API layer for team onboarding and integration testing
