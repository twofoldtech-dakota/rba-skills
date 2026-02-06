# Starlight Components Reference

Complete reference for all built-in Starlight components. Import from `@astrojs/starlight/components` in `.mdx` files.

---

## Tabs & TabItem

Tabbed content with optional sync across the page.

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="npm">Content for npm tab</TabItem>
  <TabItem label="pnpm">Content for pnpm tab</TabItem>
  <TabItem label="yarn">Content for yarn tab</TabItem>
</Tabs>
```

**Synced tabs** (selection persists across groups and page loads):
```mdx
<Tabs syncKey="pkg">
  <TabItem label="npm">npm install</TabItem>
  <TabItem label="pnpm">pnpm add</TabItem>
</Tabs>
```

**Tabs with icons:**
```mdx
<TabItem label="Stars" icon="star">Content</TabItem>
```

| Component | Prop | Type | Required | Description |
|-----------|------|------|----------|-------------|
| `Tabs` | `syncKey` | string | No | Sync tab selection across groups with the same key |
| `TabItem` | `label` | string | Yes | Tab label text |
| `TabItem` | `icon` | string | No | Starlight icon name |

---

## Card

Content card with optional icon.

```mdx
import { Card } from '@astrojs/starlight/components';

<Card title="Feature Name" icon="star">
  Description of the feature.
</Card>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Card heading |
| `icon` | string | No | Starlight icon name |

---

## CardGrid

Grid layout for Card or LinkCard components.

```mdx
import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="Card 1">Content</Card>
  <Card title="Card 2">Content</Card>
</CardGrid>
```

**Staggered effect** (offset cards for visual interest):
```mdx
<CardGrid stagger>
  <Card title="Card 1">Content</Card>
  <Card title="Card 2">Content</Card>
</CardGrid>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `stagger` | boolean | No | Offset cards for a staggered visual layout |

---

## LinkCard

Clickable card that links to a page.

```mdx
import { LinkCard } from '@astrojs/starlight/components';

<LinkCard
  title="Authoring Content"
  href="/guides/authoring-content/"
  description="Learn how to write documentation."
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Card heading |
| `href` | string | Yes | Link destination |
| `description` | string | No | Text below the title |

Also accepts standard `<a>` attributes (`target`, `rel`, etc.).

---

## LinkButton

Styled link that looks like a button.

```mdx
import { LinkButton } from '@astrojs/starlight/components';

<LinkButton href="/getting-started/" variant="primary" icon="right-arrow">
  Get Started
</LinkButton>
<LinkButton href="/reference/" variant="secondary">Reference</LinkButton>
<LinkButton href="/about/" variant="minimal">About</LinkButton>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `href` | string | Yes | Link destination |
| `variant` | `primary` \| `secondary` \| `minimal` | No | Visual style (default: `primary`) |
| `icon` | string | No | Starlight icon name |
| `iconPlacement` | `start` \| `end` | No | Icon position (default: `end`) |

Also accepts standard `<a>` attributes.

---

## Aside (Component Form)

Same as the `:::note` / `:::tip` / `:::caution` / `:::danger` markdown syntax, but as a component for use in MDX when you need dynamic content.

```mdx
import { Aside } from '@astrojs/starlight/components';

<Aside>Default note aside.</Aside>
<Aside type="tip" title="Pro Tip">Helpful suggestion.</Aside>
<Aside type="caution">Watch out for this.</Aside>
<Aside type="danger">Critical warning.</Aside>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `note` \| `tip` \| `caution` \| `danger` | No | Aside style (default: `note`) |
| `title` | string | No | Custom heading (overrides type label) |
| `icon` | string | No | Custom icon (overrides type default) |

---

## Steps

Numbered step-by-step instructions with visual connectors.

```mdx
import { Steps } from '@astrojs/starlight/components';

<Steps>
1. **Install the package**

   ```bash
   npm install @astrojs/starlight
   ```

2. **Configure your project**

   Edit `astro.config.mjs` to add the integration.

3. **Create your first page**

   Add an `index.md` file to `src/content/docs/`.
</Steps>
```

No props. Wraps a standard Markdown ordered list. Each list item becomes a numbered step with visual badge and connector line.

---

## FileTree

Visual file/directory tree.

```mdx
import { FileTree } from '@astrojs/starlight/components';

<FileTree>
- src/
  - content/
    - docs/
      - **index.mdx**
      - guides/
        - getting-started.md
        - ...
  - assets/
    - logo.svg an important file
- astro.config.mjs
- package.json
</FileTree>
```

**Formatting rules:**
- Directories end with `/` or contain nested items
- **Bold** filenames are highlighted/emphasized
- Text after a filename becomes an inline comment
- `...` indicates additional files (placeholder)

No props. Structure defined entirely by the Markdown list inside.

---

## Badge

Inline status badge.

```mdx
import { Badge } from '@astrojs/starlight/components';

<Badge text="New" variant="tip" />
<Badge text="Deprecated" variant="caution" size="small" />
<Badge text="v2.0" variant="note" size="large" />
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | string | Yes | Badge label |
| `variant` | `default` \| `note` \| `tip` \| `caution` \| `danger` \| `success` | No | Color scheme |
| `size` | `small` \| `medium` \| `large` | No | Badge size |

Also accepts standard `<span>` attributes.

---

## Icon

Inline icon from Starlight's icon set.

```mdx
import { Icon } from '@astrojs/starlight/components';

<Icon name="star" />
<Icon name="rocket" color="goldenrod" size="2rem" />
<Icon name="github" label="GitHub Repository" />
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Icon identifier |
| `label` | string | No | Accessible text for screen readers |
| `size` | string | No | CSS size value (e.g., `1.5rem`) |
| `color` | string | No | CSS color value |

**Commonly used icons:**

| Category | Icons |
|----------|-------|
| Navigation | `up-arrow`, `down-arrow`, `right-arrow`, `left-arrow`, `external` |
| Actions | `pencil`, `setting`, `magnifier`, `download`, `document` |
| Status | `information`, `error`, `warning`, `approve-check`, `rocket`, `star` |
| Social | `github`, `discord`, `twitter`, `linkedin`, `youtube`, `slack` |
| Tech | `astro`, `npm`, `node`, `vscode`, `cloudflare`, `vercel`, `netlify` |

File type icons use the `seti:` prefix: `seti:javascript`, `seti:typescript`, `seti:python`, `seti:css`, `seti:json`, `seti:folder`.

---

## Code (Component Form)

Code block as a component — useful for importing code from files or using dynamic content.

```mdx
import { Code } from '@astrojs/starlight/components';

export const exampleCode = `const greeting = "Hello, world!";`;

<Code code={exampleCode} lang="js" title="example.js" />
```

**Import code from a file:**
```mdx
import importedCode from '/src/examples/config.ts?raw';

<Code code={importedCode} lang="ts" title="config.ts" />
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | The code to display |
| `lang` | string | No | Language for syntax highlighting |
| `title` | string | No | Editor frame title |
| `frame` | string | No | Frame style (`auto`, `code`, `terminal`, `none`) |
| `mark` | string[] | No | Lines or text to highlight |
| `ins` | string[] | No | Lines to mark as insertions (green) |
| `del` | string[] | No | Lines to mark as deletions (red) |
| `collapse` | string[] | No | Line ranges to collapse |

---

## Expressive Code (Markdown Code Blocks)

These features work in standard markdown code blocks (no component import needed):

**Title:**
````md
```js title="src/main.js"
console.log('Hello');
```
````

**Line highlighting:**
````md
```js {2-3}
const a = 1;
const b = 2;  // highlighted
const c = 3;  // highlighted
```
````

**Text marking:**
````md
```js "highlighted text"
const msg = 'highlighted text here';
```
````

**Insertion / Deletion markers:**
````md
```js ins={2} del={3}
const a = 1;
const b = 2;  // shown as added (green)
const c = 3;  // shown as removed (red)
```
````

**No frame (plain code):**
````md
```bash frame="none"
npm install @astrojs/starlight
```
````

**Terminal frame** (automatic for `bash`, `sh`, `shell`, `zsh`):
````md
```bash
npm run dev
```
````

---

## Aside Markdown Syntax (No Import Needed)

These work in both `.md` and `.mdx` files without any imports:

```markdown
:::note
Default note. Blue styling.
:::

:::tip
Pro tip. Purple styling.
:::

:::tip[Custom Title]
Tip with a custom title instead of "Tip".
:::

:::caution
Proceed with caution. Yellow/orange styling.
:::

:::danger
Critical warning. Red styling.
:::
```

Four types: `note` (blue), `tip` (purple), `caution` (yellow), `danger` (red).
Custom titles via `[Title Text]` after the type.
