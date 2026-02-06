# Agency Skill Patterns

Detailed patterns for building skills that target common digital experience agency workflows. Reference this from SKILL.md when the skill matches one of these categories.

---

## Component Scaffolding Skills

### What They Automate
Generating the full set of files for a new UI component: the component code, styles, types, tests, Storybook stories, and CMS-specific definitions (Sitecore rendering, AEM dialog, Contentful content type).

### Skill Design Pattern

**Arguments:** Component name (required), variant/type (optional)
```yaml
argument-hint: "[ComponentName]"
# or for multi-argument:
argument-hint: "[ComponentName] [variant]"
```

**Key behaviors:**
1. Detect the project's tech stack by reading `package.json`, config files, and existing component directory structure
2. Match the existing naming convention (PascalCase components, kebab-case files, etc.)
3. Generate **all** associated files — never just the component in isolation
4. Use the project's existing patterns (find a similar component and follow its structure exactly)
5. Include accessibility attributes by default (ARIA labels, roles, keyboard handlers)

**Output file structure (React/Next.js example):**
```
src/components/[ComponentName]/
├── [ComponentName].tsx          # Component implementation
├── [ComponentName].module.css   # Styles (or .scss, .styled.ts — match project)
├── [ComponentName].test.tsx     # Unit tests
├── [ComponentName].stories.tsx  # Storybook story
├── [ComponentName].types.ts     # TypeScript interfaces
└── index.ts                     # Barrel export
```

**Output file structure (Sitecore JSS example):**
```
src/components/[ComponentName]/
├── [ComponentName].tsx
├── [ComponentName].module.css
├── [ComponentName].test.tsx
├── [ComponentName].stories.tsx
├── [ComponentName].types.ts
├── index.ts
└── [ComponentName].sitecore.ts  # Sitecore component definition
```

**Quality checks specific to this pattern:**
- [ ] Component accepts all props via a typed interface, not inline
- [ ] Default export and named export both available
- [ ] At least one Storybook story with realistic mock data
- [ ] Test covers rendering, key interactions, and accessibility
- [ ] Styles use the project's design tokens, not hard-coded values
- [ ] CMS definition matches the component's prop interface

---

## Accessibility Auditing Skills

### What They Automate
Reviewing components or pages for WCAG 2.1 AA compliance and producing actionable remediation guidance — not just a list of violations.

### Skill Design Pattern

**Arguments:** File path, component name, or URL
```yaml
argument-hint: "[file-path or component-name]"
allowed-tools: Read, Grep, Glob
```

**Key behaviors:**
1. Read the component/page code
2. Check against WCAG 2.1 AA success criteria (the most common contractual requirement for agency clients)
3. For each issue found:
   - Cite the specific WCAG criterion (e.g., "1.4.3 Contrast (Minimum)")
   - Show the offending code
   - Provide the exact fix (not "add an aria-label" but the specific label text and where to put it)
   - Rate severity: Critical (blocks users), Major (degrades experience), Minor (best practice)
4. Group findings by severity, not by WCAG criterion (developers fix by priority, not by spec section)

**Output format:**
```markdown
## Accessibility Audit: [Component/Page Name]

### Summary
- Critical: X issues
- Major: Y issues
- Minor: Z issues

### Critical Issues

#### 1. [Issue title]
**WCAG Criterion:** [number and name]
**Location:** `file:line`
**Current code:**
```tsx
// problematic code
```
**Fix:**
```tsx
// corrected code
```
**Why this matters:** [Impact on users with disabilities]

### Major Issues
...

### Minor Issues
...

### Passed Checks
[List of checks that passed — important for compliance documentation]
```

**Quality checks specific to this pattern:**
- [ ] Every issue cites a specific WCAG 2.1 criterion
- [ ] Every issue includes the exact fix, not just a description of the problem
- [ ] Issues are sorted by severity (Critical > Major > Minor)
- [ ] Passed checks are listed (needed for VPAT/compliance reporting)
- [ ] No false positives from pattern-matching without context

---

## Content Migration Skills

### What They Automate
Generating scripts, mappings, and validation logic for moving content between CMS platforms or between content models within the same platform.

### Skill Design Pattern

**Arguments:** Source and target description
```yaml
argument-hint: "[source-platform/model] to [target-platform/model]"
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(node *), Bash(npx ts-node *)
```

**Key behaviors:**
1. Analyze the source content model (read schema definitions, content types, sample content)
2. Analyze the target content model
3. Generate a field-by-field mapping table
4. Produce a migration script with:
   - Content transformation logic
   - Media/asset handling
   - Link rewriting
   - Validation (pre-migration checks and post-migration verification)
   - Rollback strategy
   - Logging and error reporting
5. Generate a redirect map (old URLs → new URLs)

**Output:**
```
migration/
├── mapping.md              # Human-readable field mapping table
├── migrate.ts              # Migration script
├── validate.ts             # Post-migration validation
├── redirects.csv           # URL redirect map
└── README.md               # How to run the migration
```

**Quality checks specific to this pattern:**
- [ ] Every source field is accounted for (mapped, transformed, or explicitly marked as dropped)
- [ ] Rich text content is transformed, not just copied (handle embedded media, internal links)
- [ ] Redirect map covers every published URL
- [ ] Validation script checks record counts, required fields, and link integrity
- [ ] Migration is idempotent (safe to re-run)

---

## API Integration Skills

### What They Automate
Generating typed client wrappers, error handling, retry logic, and integration tests for third-party API integrations.

### Skill Design Pattern

**Arguments:** API name or OpenAPI spec path
```yaml
argument-hint: "[api-name or openapi-spec-path]"
allowed-tools: Read, Write, Edit, Grep, Glob, WebFetch
```

**Key behaviors:**
1. Read the API spec (OpenAPI/Swagger) or documentation
2. Generate a typed client class/module with:
   - Method per endpoint
   - TypeScript request/response interfaces
   - Authentication handling
   - Error handling with typed error responses
   - Retry logic with exponential backoff
   - Request/response logging
3. Generate integration tests with mocked responses
4. Generate environment configuration (API keys, base URLs)

**Output:**
```
src/integrations/[api-name]/
├── client.ts               # API client with typed methods
├── types.ts                # Request/response TypeScript interfaces
├── errors.ts               # Custom error classes
├── client.test.ts          # Integration tests with mocked responses
└── README.md               # Usage examples and configuration
```

---

## Design System Skills

### What They Automate
Enforcing design token usage, generating component documentation, and maintaining consistency between design specs and code.

### Skill Design Pattern

**Arguments:** Component name or "audit"
```yaml
argument-hint: "[component-name] or 'audit'"
allowed-tools: Read, Grep, Glob
```

**Key behaviors:**
1. Read the design token definitions (CSS custom properties, JS/TS token files, Figma tokens)
2. For component generation: ensure all visual properties reference tokens, never hard-coded values
3. For audits: scan components for hard-coded colors, font sizes, spacing values that should use tokens
4. Generate component API documentation (props table, usage examples, do/don't)

---

## Code Review Skills

### What They Automate
Reviewing pull requests or code changes against agency-specific standards, platform best practices, and common pitfalls.

### Skill Design Pattern

**Arguments:** File path, PR number, or "staged changes"
```yaml
argument-hint: "[file-path or PR-number]"
allowed-tools: Read, Grep, Glob, Bash(git diff *), Bash(git log *)
```

**Key behaviors:**
1. Read the changed files
2. Check against categories:
   - **Security**: XSS vectors, injection risks, exposed secrets
   - **Accessibility**: Missing ARIA, keyboard traps, color contrast
   - **Performance**: Unnecessary re-renders, missing memoization, large bundles
   - **Platform best practices**: CMS-specific patterns (Sitecore field helpers, AEM Sling models)
   - **Maintainability**: Magic numbers, copy-pasted code, missing types
3. For each finding:
   - Cite the specific line
   - Explain the risk
   - Suggest the fix
   - Rate: Blocker / Warning / Suggestion

---

## Client Onboarding Skills

### What They Automate
Generating project-specific documentation for developers joining a client engagement mid-project.

### Skill Design Pattern

**Arguments:** none (reads the current project context)
```yaml
argument-hint: ""
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git log *), Bash(ls *)
```

**Key behaviors:**
1. Scan the project structure to understand the tech stack
2. Read key configuration files (package.json, docker-compose, CI config, README)
3. Identify the CMS platform, front-end framework, testing setup, deployment pipeline
4. Generate a developer onboarding guide covering:
   - Prerequisites and local setup
   - Architecture overview (what lives where)
   - Development workflow (branch strategy, PR process, deployment)
   - Key conventions and patterns
   - Where to find things (config, components, tests, docs)
   - Common gotchas and troubleshooting

---

## Performance Optimization Skills

### What They Automate
Analyzing code for Core Web Vitals impact and producing prioritized remediation plans.

### Skill Design Pattern

**Arguments:** File path, component name, or "full-site"
```yaml
argument-hint: "[file-path, component-name, or 'full-site']"
allowed-tools: Read, Grep, Glob
```

**Key behaviors:**
1. Analyze for LCP (Largest Contentful Paint) blockers: unoptimized images, render-blocking resources, slow server responses
2. Analyze for CLS (Cumulative Layout Shift) causes: images without dimensions, dynamic content injection, font loading
3. Analyze for INP (Interaction to Next Paint) issues: long tasks, heavy event handlers, layout thrashing
4. For each issue:
   - Explain the Core Web Vital impact
   - Show the problematic code
   - Provide the optimized version
   - Estimate the impact (High/Medium/Low)
5. Prioritize by impact and effort

---

## Skill Naming Conventions for Agencies

Use these prefixes to organize skills by domain:

| Prefix | Domain | Examples |
|--------|--------|---------|
| `scaffold-` | Code generation | `scaffold-component`, `scaffold-api-route` |
| `audit-` | Analysis & review | `audit-a11y`, `audit-performance`, `audit-security` |
| `migrate-` | Data/content migration | `migrate-content`, `migrate-cms` |
| `generate-` | Document/config generation | `generate-docs`, `generate-env-config` |
| `review-` | Code review | `review-pr`, `review-component` |
| `onboard-` | Onboarding | `onboard-developer`, `onboard-project` |

For platform-specific skills, include the platform:

| Pattern | Example |
|---------|---------|
| `scaffold-[platform]-component` | `scaffold-sitecore-component` |
| `audit-[standard]` | `audit-wcag` |
| `migrate-[source]-to-[target]` | `migrate-wordpress-to-contentful` |
