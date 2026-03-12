"use client";

import { Cpu, Info, Layers, Package, Zap } from "lucide-react";
import { LEAF_TAGS } from "react-adaptive-skeleton";

import { CodeBlock } from "@/components/ui/code-block";

import {
  exampleSnippet,
  scrollSnippet,
  setupSnippet,
  tableExampleSnippet,
} from "@/lib/code-snippets";

export function DocsPage() {
  return (
    <>
      <main className="container max-w-4xl mx-auto px-5 py-16 space-y-20">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight">
            API Documentation
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A deep-dive into{" "}
            <code className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-indigo-500">
              react-adaptive-skeleton
            </code>
            — how it works, how to configure it, and how to get the best
            performance out of it.
          </p>

          {/* How it works */}
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1">
                Step 1 — Render
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Wrap your UI in{" "}
                <code className="text-indigo-500">{"<AdaptiveSkeleton>"}</code>.
                While loading, pass{" "}
                <strong className="text-foreground">template data</strong> to
                your components so the real DOM structure is present and
                measurable.
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1">
                Step 2 — Scan
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The library recursively traverses the DOM inside the container.
                It measures every{" "}
                <strong className="text-foreground">
                  text node, image, and tagged element
                </strong>
                , capturing their exact position, size, and border radius
                relative to the container.
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1">
                Step 3 — Overlay
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                An absolutely-positioned overlay is drawn on top of the hidden
                content. Each rectangle is a clone of your{" "}
                <strong className="text-foreground">skeleton template</strong>,
                sized and placed to pixel-perfectly match the real layout.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: API */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <Package className="text-indigo-500" />
            <h2 className="text-3xl font-bold">The API</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400">
              The library exports a single factory function called{" "}
              <code>createAdaptiveSkeleton</code>. Use it to create a reusable
              skeleton component for your application. It requires a React
              Element that serves as your skeleton "template" and an optional
              configuration object.
            </p>

            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 border-l-4 border-l-blue-500 rounded-xl p-4 mt-6 mb-4 flex gap-3">
              <div className="text-blue-500 mt-0.5 shrink-0">
                <Info size={16} />
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
                <strong className="block text-xs uppercase tracking-wider text-blue-500 mb-1">
                  Pro Tip: Create a Reusable Component
                </strong>
                We recommend creating a single <code>AdaptiveSkeleton</code>{" "}
                component in your UI library and exporting it. This ensures
                consistent skeleton styling across your entire application.
              </p>
            </div>

            <div className="bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 border-l-4 border-l-orange-500 rounded-xl p-4 mb-10 flex gap-3">
              <div className="text-orange-500 mt-0.5 shrink-0">
                <Info size={16} />
              </div>
              <p className="text-sm text-orange-800 dark:text-orange-300 leading-relaxed font-medium">
                <strong className="block text-xs uppercase tracking-wider text-orange-500 mb-1">
                  Layout Note
                </strong>
                The returned component wraps your content in a{" "}
                <code>&lt;div&gt;</code> with <code>position: relative</code>{" "}
                and <code>width: fit-content</code> to accurately position the
                absolute-placed skeletons. Consider this extra wrapper when
                structuring your flex/grid layouts.
              </p>
            </div>

            <CodeBlock
              code={setupSnippet}
              fileName="components/ui/adaptive-skeleton.tsx"
              showLineNumbers
            />

            <div className="mt-12 space-y-4">
              <h3 className="text-xl font-semibold">Default Adapted Tags</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                To provide a seamless experience out of the box, the library
                automatically identifies and skeletonizes:
              </p>
              <div className="flex flex-wrap gap-2">
                {["TEXT", ...LEAF_TAGS].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-mono text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-zinc-500 italic">
                Any other block elements (like <code>div</code> or{" "}
                <code>section</code>) require explicit skeletonization using
                selectors or attributes.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-12 mb-4">
              Configuration Options
            </h3>
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                <h4 className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                  skipSelectors: string[]
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Any valid CSS query that the scanner should skip. This
                  includes tag names (<code>"label"</code>), class names (
                  attribute selectors (<code>"[data-ignore='true']"</code>).
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                <h4 className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                  skipTextSelectors: string[]
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  CSS selectors for elements whose text nodes should be ignored.
                  This is useful when you want to skeletonize an element's
                  structure but keep its text visible or untouched.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                <h4 className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                  targetSelectors: string[]
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Explicit CSS selectors, tag names, or attribute selectors
                  defining which elements should be skeletonized. This accepts
                  any valid CSS query.
                </p>
              </div>
            </div>

            {/* Section 2: Attributes */}
            <section className="space-y-6 pt-8">
              <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <Layers className="text-blue-500" />
                <h2 className="text-3xl font-bold">Attribute Selectors</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                You can use data attributes to precisely control how the scanner
                handles specific nodes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="text-blue-500 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded text-xs">
                      data-skeleton
                    </code>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Forces the scanner to treat the element as a block.
                  </p>
                </div>
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="text-blue-500 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded text-xs">
                      data-no-skeleton
                    </code>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Tells the scanner to ignore this element and all its
                    children.
                  </p>
                </div>
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="text-blue-500 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded text-xs">
                      data-no-skeleton-text
                    </code>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Tells the scanner to ignore the text nodes within this
                    element and its descendants, while still processing other
                    child elements.
                  </p>
                </div>
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="text-blue-500 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded text-xs">
                      data-flat-skeleton
                    </code>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Forces the skeleton to be flat. By default, skeletons
                    automatically adapt to an element's custom{" "}
                    <code>border-radius</code> (like <code>rounded-2xl</code>)
                    or fallback to the <code>skeletonTemplate</code>'s radius
                    for sharp elements.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Section 2: Hot Swapping */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <Cpu className="text-amber-500" />
            <h2 className="text-3xl font-bold">Hot Swapping Data</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            For <code>react-adaptive-skeleton</code> to know what shapes to
            draw, the underlying DOM structures must be rendered. Feeding
            "template data" to your UI components while loading isn't just about
            avoiding a React crash—it's how the library{" "}
            <strong>measures</strong> the physical dimensions, margins, and
            layouts to generate perfectly matching skeletons!
          </p>

          <CodeBlock code={exampleSnippet} fileName="example.tsx" />
        </section>

        {/* Section 3: Polymorphism */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <Layers className="text-blue-500" />
            <h2 className="text-3xl font-bold">Polymorphic Containers</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            <code>AdaptiveSkeleton</code> is polymorphic by nature, meaning it
            can render as any HTML element using the <code>as</code> prop. This
            is particularly useful in situations like table rows, where strict
            HTML nesting rules must be followed.
          </p>

          <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 border-l-4 border-l-blue-500 rounded-xl p-4 my-6 flex gap-3">
            <div className="text-blue-500 mt-0.5 shrink-0">
              <Zap size={16} />
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
              <strong className="block text-xs uppercase tracking-wider text-blue-500 mb-1">
                Efficiency Tip
              </strong>
              Wrap the entire <code>tbody</code> to minimize the number of
              observers. The library will scan all rows and cells within that
              single container.
            </p>
          </div>

          <CodeBlock code={tableExampleSnippet} fileName="UserTable.tsx" />
        </section>

        {/* Section 4: Scroll Containers */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <Layers className="text-purple-500" />
            <h2 className="text-3xl font-bold">Scroll Containers</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            Because skeleton rectangles are <code>position: absolute</code>{" "}
            overlays placed relative to the <code>AdaptiveSkeleton</code>{" "}
            container, <strong>they will not scroll with the content</strong> if
            you put the component <em>outside</em> of a scrollable element. This
            causes the skeletons to "float" or overflow weirdly when the user
            scrolls.
          </p>
          <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 border-l-4 border-l-purple-500 rounded-xl p-4 my-6 flex gap-3">
            <div className="text-purple-500 mt-0.5 shrink-0">
              <Info size={16} />
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-300 leading-relaxed font-medium">
              <strong className="block text-xs uppercase tracking-wider text-purple-500 mb-1">
                Rule of Thumb
              </strong>
              Always place the <code>&lt;AdaptiveSkeleton&gt;</code>{" "}
              <strong>inside</strong> the scroll container, wrapping the
              scrolling content directly. Make sure the scroll container itself
              has a defined dimension and <code>position: relative</code> if
              necessary.
            </p>
          </div>

          <CodeBlock code={scrollSnippet} fileName="scroll-example.tsx" />
        </section>

        {/* Section 5: Performance Analysis */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <Zap className="text-emerald-500" />
            <h2 className="text-3xl font-bold">Performance Analysis</h2>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400">
            Choosing the right placement for your <code>AdaptiveSkeleton</code>{" "}
            container is key to maintaining a smooth 60fps experience. Depending
            on your UI complexity, you can choose between a{" "}
            <strong>Macro (Single Container)</strong> or{" "}
            <strong>Micro (Per Card)</strong> approach.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Single Container */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                Single Container (Macro)
              </h3>
              <ul className="text-sm space-y-2 text-zinc-600 dark:text-zinc-400 mb-6">
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">+</span> Lowest
                  memory overhead (1 observer)
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">+</span> Simplest
                  implementation
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">-</span> Full rescan
                  on any change
                </li>
              </ul>
              <div className="bg-zinc-100 dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Best For
                </p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Static lists or simple layouts where cards don't resize
                  independently.
                </p>
              </div>
            </div>

            {/* Per Card */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                Per Card (Micro)
              </h3>
              <ul className="text-sm space-y-2 text-zinc-600 dark:text-zinc-400 mb-6">
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">+</span> Prevents
                  long-tasks on main thread
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">+</span> Precise
                  internal resize detection
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">-</span> Higher
                  overhead (N observers)
                </li>
              </ul>
              <div className="bg-zinc-100 dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Best For
                </p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Interactive cards, complex layouts, or large dynamic feeds.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
