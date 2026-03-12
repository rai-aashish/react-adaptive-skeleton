# react-adaptive-skeleton

[![npm version](https://img.shields.io/npm/v/react-adaptive-skeleton.svg)](https://www.npmjs.com/package/react-adaptive-skeleton)
[![license](https://img.shields.io/npm/l/react-adaptive-skeleton.svg)](https://github.com/rai-aashish/react-adaptive-skeleton/blob/main/packages/react-adaptive-skeleton/LICENSE)

Skeleton loaders that **perfectly match your real UI** — no manually drawn rectangles, no brittle width/height props. `react-adaptive-skeleton` traverses your actual DOM, measures every text node, image, and element, then overlays pixel-perfect placeholders on top.

[**Interactive Examples →**](https://rai-aashish.github.io/adaptive-skeleton/examples)

---

## How It Works

| Step | What happens |
|------|-------------|
| **1 · Render** | Wrap your UI in `<AdaptiveSkeleton isLoading={…}>`. While loading, pass **template / placeholder data** to your components so the real DOM structure exists and can be measured. |
| **2 · Scan** | The library recursively walks the DOM inside the container, capturing the exact position, size, and border-radius of every text node, leaf element, and explicitly tagged element. |
| **3 · Overlay** | An absolutely-positioned overlay is placed on top. Each rectangle is a clone of your **skeleton template**, sized and positioned to match the real layout. |

---

## Installation

```bash
npm install react-adaptive-skeleton
# or
bun add react-adaptive-skeleton
```

---

## Quick Start

### 1 · Create a reusable skeleton component

Call `createAdaptiveSkeleton` once and export the result. The first argument is the **template element** — the visual style applied to every skeleton rectangle.

```tsx
// components/ui/adaptive-skeleton.tsx
import { createAdaptiveSkeleton } from "react-adaptive-skeleton";

export const AdaptiveSkeleton = createAdaptiveSkeleton(
  <div className="bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />,
  {
    skipSelectors: [".no-skeleton"],   // optional: always ignore these
    targetSelectors: [".skeleton"],    // optional: always skeletonize these
  },
);
```

### 2 · Wrap your components

```tsx
import { AdaptiveSkeleton } from "@/components/ui/adaptive-skeleton";

function UserProfile() {
  const { data, isLoading } = useUserQuery();

  // While loading, feed placeholder data so the DOM structure is measurable
  const user = isLoading ? { name: "Placeholder", role: "Member" } : data;

  return (
    <AdaptiveSkeleton isLoading={isLoading}>
      <div className="flex gap-4 p-4 border rounded-xl">
        {/* data-skeleton → capture this div as a block */}
        <div className="size-12" data-skeleton>
          <img src={user.avatar} alt={user.name} />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="font-bold">{user.name}</h3>

          {/* data-no-skeleton → skip this element entirely */}
          <p className="text-sm text-zinc-500" data-no-skeleton>
            {user.role}
          </p>
        </div>
      </div>
    </AdaptiveSkeleton>
  );
}
```

---

## API

### `createAdaptiveSkeleton(template, options?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `template` | `ReactElement` | The element used as the visual style for every skeleton rectangle. |
| `options.skipSelectors` | `string[]` | CSS selectors whose matched elements (and their subtrees) are excluded from scanning. |
| `options.skipTextSelectors` | `string[]` | CSS selectors whose matched elements' text nodes (and descendants' text nodes) are excluded from scanning. |
| `options.targetSelectors` | `string[]` | CSS selectors whose matched elements are always captured as skeleton blocks. |

Returns a component with a single required prop:

| Prop | Type | Description |
|------|------|-------------|
| `isLoading` | `boolean` | When `true`, hides real content and shows the skeleton overlay. |
| `as` | `ElementType` | Render the container as any HTML element (default: `div`). Useful for tables — see below. |
| `className` | `string` | Applied to the container element. |
| `style` | `CSSProperties` | Applied to the container element. |

---

## Attribute Selectors

Control scanning behaviour directly in your JSX without touching configuration:

| Attribute | Effect |
|-----------|--------|
| `data-skeleton` | Force this element to be captured as a skeleton block. |
| `data-no-skeleton` | Exclude this element **and all its children** from scanning. |
| `data-no-skeleton-text` | Exclude this element's **text nodes** and its descendants' text nodes from scanning. Other child elements will still be processed. |
| `data-flat-skeleton` | Force the skeleton for this element to ignore the template's border-radius (produces sharp rectangles). |

---

## Auto-Detected Elements

The following are automatically skeletonized without any extra attributes:

- **Text nodes** — any visible text content
- **Leaf elements** — `IMG`, `BUTTON`, `SELECT`, `TEXTAREA`, `IFRAME`, `CANVAS`, `VIDEO`, `AUDIO`, `SVG`, `INPUT`

All other elements (`div`, `section`, `span`, …) require explicit targeting via `data-skeleton` or `targetSelectors`.

---

## Polymorphic Container (`as` prop)

`AdaptiveSkeleton` can render as any HTML element. This is essential when HTML nesting rules must be respected (e.g. inside a `<table>`):

```tsx
function UserTable({ users, isLoading }) {
  return (
    <table className="w-full text-left">
      <thead>…</thead>
      {/* Wrap the entire tbody — one observer covers all rows */}
      <AdaptiveSkeleton as="tbody" isLoading={isLoading}>
        {users.map((user) => (
          <tr key={user.id}>
            <td><span data-skeleton>{user.name}</span></td>
            <td>{user.role}</td>
          </tr>
        ))}
      </AdaptiveSkeleton>
    </table>
  );
}
```

---

## Performance Tips

**Macro (single container)** — wrap a whole section in one `AdaptiveSkeleton`. One observer, lowest overhead. Best for static lists.

**Micro (per card)** — wrap each card individually. More observers but scoped re-scans. Best for interactive feeds or independently resizing cards.

> [!IMPORTANT]
> The wrapper `<div>` gets `position: relative` and `width: fit-content` applied automatically so skeleton rects are positioned correctly. Keep this in mind when building flex/grid layouts — you may need to set an explicit `className` on the container.

---

## Scroll Containers

Because skeleton rectangles are `position: absolute` overlays placed relative to the `AdaptiveSkeleton` container, **they will not scroll with the content** if you put the `AdaptiveSkeleton` *outside* of a scrollable element. This causes the skeletons to "float" or overflow weirdly when the user scrolls.

**Rule of thumb:** Always place the `<AdaptiveSkeleton>` *inside* the scroll container, wrapping the scrolling content directly.

```tsx
// ❌ WRONG: Skeletons will float over the scroll view
<AdaptiveSkeleton isLoading={isLoading}>
  <div className="h-96 overflow-y-auto">
    <MyLongList />
  </div>
</AdaptiveSkeleton>

// ✅ CORRECT: The overlay and skeletons will scroll cleanly with the content
<div className="h-96 overflow-y-auto relative">
  <AdaptiveSkeleton isLoading={isLoading}>
    <MyLongList />
  </AdaptiveSkeleton>
</div>
```

---

## License

MIT © [Aashish Rai](https://github.com/rai-aashish)
