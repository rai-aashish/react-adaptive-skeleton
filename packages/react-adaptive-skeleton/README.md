# react-adaptive-skeleton

[![npm version](https://img.shields.io/npm/v/react-adaptive-skeleton.svg)](https://www.npmjs.com/package/react-adaptive-skeleton)
[![license](https://img.shields.io/npm/l/react-adaptive-skeleton.svg)](https://github.com/rai-aashish/react-adaptive-skeleton/blob/main/packages/react-adaptive-skeleton/LICENSE)

Skeleton loaders that **perfectly match your real UI** — no manually drawn rectangles, no brittle width/height props. `react-adaptive-skeleton` traverses your actual DOM, measures every text node, image, and element, then overlays pixel-perfect placeholders on top.

[**Interactive Examples →**](https://rai-aashish.github.io/react-adaptive-skeleton/examples)

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
| `options.defaultProps` | `HTMLAttributes & Record<string, unknown>` | Default props applied to the wrapper container for every instance. Instance-level props (`className`, `style`, data attributes, etc.) override these. |
| `options.classNameMerger` | `(...classes: string[]) => string` | Custom function used to merge `skeletonClassName` with the template's `className`. Pass `twMerge` (from `tailwind-merge`) to avoid Tailwind class conflicts. Defaults to a plain space-join. |
| `options.overlay` | `{ style?, className?, children? }` | Customize the absolutely-positioned overlay element. Use `children` to render a shimmer element that sweeps across all skeleton rects at once. The overlay automatically gains `overflow: hidden` when `children` are provided so animated children are clipped at the boundary. |

```tsx
import { twMerge } from "tailwind-merge"; // optional — only needed for Tailwind users

export const AdaptiveSkeleton = createAdaptiveSkeleton(
  <div className="bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />,
  {
    skipSelectors: [".no-skeleton"],
    targetSelectors: [".skeleton"],
    defaultProps: {
      className: "group/skeleton",
      "data-wrapper": "",
    },
    // Prevents Tailwind class conflicts when using skeletonClassName
    classNameMerger: twMerge,
  },
);
```

Returns a component with the following props:

| Prop | Type | Description |
|------|------|-------------|
| `isLoading` | `boolean` | When `true`, hides real content and shows the skeleton overlay. |
| `render` | `ReactElement \| (props) => ReactElement` | Controls the container element. See [Polymorphic Container](#polymorphic-container-render-prop) below. |
| `className` | `string` | Applied to the container element. |
| `style` | `CSSProperties` | Applied to the container element. |
| `skeletonClassName` | `string` | Extra class name(s) appended to every rendered skeleton rectangle (merged with the template's `className`). |
| `skeletonStyle` | `CSSProperties` | Extra styles merged into every rendered skeleton rectangle (applied on top of the template's styles). |

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

## Polymorphic Container (`render` prop)

`AdaptiveSkeleton` uses a **render prop** pattern (same as [Base UI](https://base-ui.com)) to control the container element. This keeps the API flexible without baking in a fixed element type.

### Element form

Pass a React element. The library merges its internal props (ref, aria-busy, positioning styles, etc.) with your element's props. Your `className` and `style` are combined with the component's; event handlers are composed.

```tsx
// Renders as <section> — useful when a div would be semantically wrong
<AdaptiveSkeleton isLoading={isLoading} render={<section className="card" />}>
  <UserCard user={user} />
</AdaptiveSkeleton>
```

### Function form

Pass a function that receives the resolved props. Use this when you need full control — spread `props` onto your element to wire everything up.

```tsx
<AdaptiveSkeleton
  isLoading={isLoading}
  render={(props) => <section {...props} />}
>
  <UserCard user={user} />
</AdaptiveSkeleton>
```

### Default (`render` omitted)

When `render` is not provided the container is a plain `<div>`.

```tsx
<AdaptiveSkeleton isLoading={isLoading}>
  <UserCard user={user} />
</AdaptiveSkeleton>
```

### Table example

The render prop is especially useful when HTML nesting rules must be respected (e.g. inside a `<table>`):

```tsx
function UserTable({ users, isLoading }) {
  return (
    <table className="w-full text-left">
      <thead>…</thead>
      {/* render as tbody so the DOM structure stays valid */}
      <AdaptiveSkeleton render={<tbody />} isLoading={isLoading}>
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
> `AdaptiveSkeleton` always wraps its children in a `<div>` (or your `render` element) with `position: relative` applied automatically so skeleton rects are positioned correctly. This extra wrapper affects flex/grid layouts — set an explicit `className` or `style` on the container to control sizing and layout as needed.

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

## Shimmer / Shine Effects

Because all skeleton rectangles live inside a single overlay element, you can add a **single animated child** that sweeps across every rect at once — no per-rect duplication, no JavaScript timers.

Pass a `children` element to `options.overlay` when calling `createAdaptiveSkeleton`. The overlay automatically gains `overflow: hidden` to clip the animation at the container boundary.

### 1. Define the keyframe

```css
@keyframes skeleton-shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### 2. Create the skeleton factory

```tsx
import { createAdaptiveSkeleton } from "react-adaptive-skeleton";

export const ShimmerSkeleton = createAdaptiveSkeleton(
  <div className="bg-zinc-200 dark:bg-zinc-800 rounded-md" />,
  {
    overlay: {
      children: (
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "200%",
            left: "-50%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            animation: "skeleton-shimmer 1.6s ease-in-out infinite",
          }}
        />
      ),
    },
  },
);
```

### 3. Use it

```tsx
<ShimmerSkeleton isLoading={isLoading}>
  <UserCard user={user} />
</ShimmerSkeleton>
```

> [!TIP]
> The shimmer gradient uses `rgba(255,255,255,0.4)` — adjust the alpha for darker themes. Use `overlay.style` to set a background color or blend mode on the overlay itself if you need to tint all rects uniformly.

---

## License

MIT © [Aashish Rai](https://github.com/rai-aashish)
