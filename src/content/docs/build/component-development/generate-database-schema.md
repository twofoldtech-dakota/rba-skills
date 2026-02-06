---
title: Generate Database Schema
description: Design a database schema with tables, relationships, indexes, and migration scripts from data requirements
---

## Context & Goal

Database design underpins every CMS implementation and custom application RBA builds. A poorly designed schema leads to performance problems, data integrity issues, and painful migrations down the road. This skill produces a complete schema design — normalized tables, relationships, indexes, and migration scripts — from data requirements or entity descriptions. It accounts for CMS-specific patterns (Sitecore's xDB, Umbraco's content tables, custom application databases on Azure SQL) and produces implementation-ready SQL that developers can run directly.

## The Prompt

:::tip[Copy & Paste]
Copy this prompt into ChatGPT, Claude, Gemini, or any AI assistant. Replace the `{{VARIABLES}}` with your specifics.
:::

```text
You are a senior database engineer with expertise in SQL Server, Azure SQL, database design patterns (normalization, denormalization trade-offs), indexing strategy, query performance tuning, and data modeling for CMS platforms and custom web applications. You design schemas that are performant, maintainable, and correct from day one.

Design a complete database schema:

**Project Name:** {{PROJECT_NAME}}
**Database Type:** {{DATABASE_TYPE}}
**Entities:** {{ENTITIES}}
**Relationships:** {{RELATIONSHIPS}}
**Performance Requirements:** {{PERFORMANCE_REQUIREMENTS}}
**CMS Platform:** {{CMS_PLATFORM}}

Produce a complete database schema design with the following sections:

### 1. Schema Overview
- Purpose and scope of this database/schema
- Normalization level and rationale (3NF with specific denormalization exceptions)
- Naming conventions used (PascalCase tables, camelCase columns, or specify)
- Character encoding and collation
- Schema namespace if applicable (dbo, app, cms)

### 2. Entity-Relationship Description
- Text-based ER diagram showing all entities and their relationships
- Relationship types: one-to-one, one-to-many, many-to-many
- Cardinality and optionality for each relationship
- Identify the aggregate roots (primary entities)
- Note any self-referential relationships (hierarchies, trees)

### 3. Table Definitions
For each table, provide:

**Table: [TableName]**
| Column | Data Type | Nullable | Default | Constraints | Description |
|--------|-----------|----------|---------|-------------|-------------|

Include for every table:
- Primary key (INT IDENTITY or UNIQUEIDENTIFIER with rationale)
- Foreign keys with ON DELETE/ON UPDATE behavior
- Check constraints for data validation
- Computed columns if applicable
- Audit columns: CreatedDate, CreatedBy, ModifiedDate, ModifiedBy
- Soft delete column (IsDeleted BIT) if applicable
- Row version/timestamp for concurrency control

### 4. Index Strategy
For each table, define:
- **Clustered index:** Primary key or most common query pattern
- **Non-clustered indexes:** Columns frequently used in WHERE, JOIN, ORDER BY
- **Covering indexes:** For high-frequency queries that need specific column sets
- **Filtered indexes:** For queries on subsets (e.g., WHERE IsActive = 1)
- **Unique indexes:** For business key uniqueness enforcement
- Include estimated selectivity and expected query patterns for each index
- Note indexes to avoid (over-indexing on write-heavy tables)

### 5. Stored Procedures & Views
If applicable, define:
- Key stored procedures for complex business operations
- Views for common query patterns or reporting
- Table-valued functions for reusable query logic
- Include parameter types, return types, and purpose for each

### 6. Migration Script
Provide a complete, executable SQL script:
- CREATE SCHEMA statements
- CREATE TABLE statements in dependency order (parent tables first)
- ALTER TABLE for foreign key constraints (added after all tables exist)
- CREATE INDEX statements
- CREATE VIEW / CREATE PROCEDURE statements
- Use IF NOT EXISTS guards for idempotent execution
- Include transaction wrapping for atomicity
- Add PRINT statements for progress tracking

### 7. Seed Data Script
- Reference/lookup table data (statuses, types, categories)
- Default configuration values
- Test data for development environments (clearly separated from production seeds)
- Use MERGE statements for idempotent seeding

### 8. Performance Considerations
- Expected data volumes per table (1 year, 3 year projections)
- Read/write ratio and optimization strategy
- Partitioning strategy for large tables
- Archive/purge strategy for historical data
- Connection pooling and timeout recommendations
- Query plan considerations for the most critical queries

### 9. CMS Platform Integration
Based on the specified CMS platform:
- How this schema relates to the CMS's built-in content database
- Separation strategy: custom tables vs. CMS content types
- Data synchronization between CMS content and custom tables
- Platform-specific considerations (Sitecore xDB collections, Umbraco content tables, Optimizely DXP data stores)
- Migration path if the CMS platform changes

Provide all SQL in a format ready to execute against the specified database engine.
```

## Install as Claude Code Skill

<details>
<summary>For Claude Code CLI users — install as a reusable skill</summary>

### SKILL.md

Save to `.claude/skills/generate-database-schema/SKILL.md`:

```markdown
---
name: generate-database-schema
description: Generates a complete database schema design with table definitions, relationships, indexes, migration scripts, and seed data. Use when designing databases for CMS implementations or custom applications.
argument-hint: "[project name and entity descriptions]"
allowed-tools: Read, Glob, Grep, Write
---

# Generate Database Schema

You are a senior database engineer with expertise in SQL Server, Azure SQL, database design patterns, indexing strategy, and data modeling for CMS platforms.

## Your Task

Design a database schema for: **$ARGUMENTS**

## Process

### Step 1: Discover Existing Patterns
- Search for existing migration files, SQL scripts, or schema definitions
- Read Entity Framework models or ORM configuration to understand current patterns
- Check for naming conventions in existing tables (PascalCase, snake_case)
- Identify the database engine from connection strings or configuration
- Look for the CMS platform's database to understand co-existence requirements

### Step 2: Design the Schema
Produce a complete schema with:
1. Schema overview with normalization rationale
2. Entity-relationship description with cardinality
3. Table definitions (columns, types, constraints, audit fields)
4. Index strategy (clustered, non-clustered, covering, filtered)
5. Stored procedures and views for complex operations
6. Migration script (CREATE TABLE in dependency order, idempotent)
7. Seed data script (reference data and test data)
8. Performance considerations (volumes, partitioning, archiving)
9. CMS platform integration notes

### Step 3: Write Migration Files
- Save the migration script following the project's migration convention
- Save seed data as a separate, idempotent script
- Update any ORM model files if Entity Framework or similar is in use

### Quality Check
- Foreign keys have explicit ON DELETE/ON UPDATE behavior
- Every table has audit columns (CreatedDate, ModifiedDate)
- Indexes align with expected query patterns
- Migration script is idempotent (IF NOT EXISTS guards)
- Seed data uses MERGE for safe re-execution
```

### Usage

```
/generate-database-schema E-commerce product catalog with products, categories, variants, pricing tiers, and inventory tracking on Azure SQL
```

</details>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project or application name | `Contoso Product Catalog` |
| `{{DATABASE_TYPE}}` | Database engine and hosting | `Azure SQL Database (S2 tier)` or `SQL Server 2022 on Azure VM` |
| `{{ENTITIES}}` | Data entities with key attributes | `Product (name, SKU, description, price, status), Category (name, slug, parent), ProductVariant (size, color, price override, inventory), Review (rating, text, author, date)` |
| `{{RELATIONSHIPS}}` | How entities relate to each other | `Product belongs to many Categories (M:N), Product has many Variants (1:N), Product has many Reviews (1:N), Category has parent Category (self-referential hierarchy)` |
| `{{PERFORMANCE_REQUIREMENTS}}` | Scale and speed expectations | `10,000 products, 50,000 variants, 500 concurrent read queries/sec, sub-100ms response for product detail page, write-heavy inventory updates during flash sales` |
| `{{CMS_PLATFORM}}` | CMS platform if applicable | `Sitecore XM Cloud — product content managed in CMS, pricing and inventory in custom database` or `None — standalone application` |

## Best Practices

- **Model choice:** Use Opus 4 for schema design. Database decisions are hard to reverse — normalization trade-offs, index strategy, and constraint design benefit from the deeper reasoning. Sonnet 4 is sufficient for simple schemas (under 5 tables, no complex relationships).
- **Define relationships explicitly:** Don't let the AI infer relationships from entity names alone. Specify cardinality (`1:N`, `M:N`), optionality (required vs. optional), and delete behavior (cascade, restrict, set null) in `{{RELATIONSHIPS}}`.
- **Include volume estimates:** The index strategy and partitioning recommendations are only useful if `{{PERFORMANCE_REQUIREMENTS}}` includes expected row counts and query patterns. "Fast" is not a requirement — "sub-100ms for product search across 50K rows" is.
- **Validate the migration script:** Run the generated migration against a local or dev database before committing. Check for syntax, dependency order, and constraint conflicts.
- **Review index strategy separately:** Over-indexing hurts write performance. Review each index against actual query patterns, not hypothetical ones. Remove indexes you can't justify with a specific query.

## Related Skills

- [Generate API Specification](/build/architecture-and-integration/generate-api-specification/) — Design the API layer that sits on top of this schema
- [Security Review Checklist](/test-and-review/compliance-and-security/security-review-checklist/) — Review database security: connection encryption, least-privilege access, SQL injection prevention, audit logging
