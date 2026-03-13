"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Star } from "lucide-react";
import Link from "next/link";

import { createAdaptiveSkeleton } from "react-adaptive-skeleton";

import { AdaptiveSkeleton } from "@/components/ui/adaptive-skeleton";
import { ExampleViewer } from "@/components/ui/example-viewer";

import { cn } from "@/lib/utils";
import {
  gridCode,
  scrollCode,
  shimmerCode,
  tableCode,
  userCardCode,
} from "./examples-code";

// -- Shimmer skeleton factory --

const ShimmerSkeleton = createAdaptiveSkeleton(
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
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
            animation: "skeleton-shimmer 2s ease-in-out infinite",
          }}
        />
      ),
    },
  },
);

// -- Example Component Implementations -- (Code rendered on screen)

const USER_DATA_TEMPLATE = {
  name: "Jane Doe",
  role: "Senior Product Designer",
  bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
  avatar: "https://i.pravatar.cc/150?u=jane",
};

function UserCardExample({ isLoading }: { isLoading: boolean }) {
  const user = isLoading
    ? USER_DATA_TEMPLATE
    : {
        name: "Marry Jane",
        role: "Senior Product Designer",
        bio: "Passionate about creating intuitive and accessible user experiences that delight customers and drive business value.",
        avatar: "https://i.pravatar.cc/150?u=jane",
      };

  return (
    <AdaptiveSkeleton isLoading={isLoading}>
      <div className="flex flex-col sm:flex-row gap-6 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm max-w-md w-full">
        <div
          className="size-24 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 mx-auto sm:mx-0 overflow-hidden"
          // Force this div to become a skeleton block
          data-skeleton
        >
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-foreground">
            <Link href="#">{user.name}</Link>
          </h3>

          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {user.role}
          </p>

          <div>
            {/*  data-no-skeleton-text does not skeletonize text nodes */}
            <div data-no-skeleton-text className="flex gap-1 items-center">
              <span className="text-sm">Bio</span>
              <Star className="size-4" />
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {user.bio}
            </p>
          </div>
        </div>
      </div>
    </AdaptiveSkeleton>
  );
}

function ProductGridExample({ isLoading }: { isLoading: boolean }) {
  const items = [
    { id: 1, title: "Wireless Headphones", price: "$129.99" },
    { id: 2, title: "Mechanical Keyboard", price: "$149.50" },
    { id: 3, title: "Ergonomic Mouse", price: "$79.00" },
    { id: 4, title: "4K Monitor", price: "$349.00" },
    { id: 5, title: "Laptop Stand", price: "$45.99" },
    { id: 6, title: "USB-C Hub", price: "$59.90" },
  ];

  return (
    // Single observer for the entire grid (Macro performance pattern)
    <AdaptiveSkeleton
      isLoading={isLoading}
      style={{
        width: "100%",
      }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {items.map((item, i) => (
          <div
            key={item.id || i}
            className="flex flex-col gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900"
          >
            <div
              className="w-full aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              data-skeleton
              data-flat-skeleton
            />
            <div>
              <h4 className="font-semibold text-sm line-clamp-1">
                {item.title}
              </h4>
              <p className="text-zinc-500 text-xs mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </AdaptiveSkeleton>
  );
}

function TableExample({ isLoading }: { isLoading: boolean }) {
  const users = isLoading
    ? [
        {
          id: 1,
          name: "Alice M. Smith",
          status: "Active",
          role: "Administrator",
        },
        {
          id: 2,
          name: "Robert B. Johnson",
          status: "Offline",
          role: "Content Editor",
        },
        {
          id: 3,
          name: "Charles C. Brown",
          status: "Active",
          role: "Staff Viewer",
        },
        {
          id: 4,
          name: "Diana D. Prince",
          status: "Active",
          role: "Administrator",
        },
      ]
    : [
        { id: 1, name: "Alice Smith", status: "Active", role: "Admin" },
        { id: 2, name: "Bob Johnson", status: "Offline", role: "Editor" },
        { id: 3, name: "Charlie Brown", status: "Active", role: "Viewer" },
        { id: 4, name: "Diana Prince", status: "Active", role: "Admin" },
      ];

  const getStatusClass = (status: string) => {
    return status === "Active"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
  };

  return (
    <div className="w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <tr>
            <th className="p-4 font-medium text-zinc-500">Name</th>
            <th className="p-4 font-medium text-zinc-500">Status</th>
            <th className="p-4 font-medium text-zinc-500">Role</th>
          </tr>
        </thead>

        {/* Polymorphic container — render prop keeps valid HTML structure */}
        <AdaptiveSkeleton render={<tbody />} isLoading={isLoading}>
          {users.map((user, i) => (
            <tr
              key={user.id || i}
              className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20"
            >
              <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">
                <span data-skeleton>{user.name}</span>
              </td>
              <td className="p-4">
                <span
                  data-skeleton
                  className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                    getStatusClass(user.status),
                  )}
                >
                  {user.status}
                </span>
              </td>
              <td className="p-4 text-zinc-500 dark:text-zinc-400">
                <span data-skeleton>{user.role}</span>
              </td>
            </tr>
          ))}
        </AdaptiveSkeleton>
      </table>
    </div>
  );
}

function ScrollContainerExample({ isLoading }: { isLoading: boolean }) {
  const items = isLoading
    ? Array(8)
        .fill(null)
        .map((_, i) => ({
          id: i,
          title: "Recent System Notification",
          description:
            "This is a placeholder description that is long enough to span multiple lines in the notification feed to match the loaded state.",
          time: "10m ago",
        }))
    : Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: `Notification event ${i + 1}`,
        description:
          "Some long text data to fill up horizontal and vertical space inside this constrained container list view.",
        time: `${i * 2 + 1}m ago`,
      }));

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm overflow-hidden max-w-sm w-full mx-auto">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 font-semibold bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center">
        <span>Updates</span>
        <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">
          New
        </span>
      </div>

      {/* PERFECT: AdaptiveSkeleton is INSIDE the scroll view wrapper */}
      <div className="h-72 overflow-y-auto p-4 relative bg-zinc-50/30 dark:bg-black/20">
        <AdaptiveSkeleton isLoading={isLoading}>
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div
                key={item.id || i}
                className="flex gap-4 items-start p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm"
              >
                <div
                  className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 shrink-0"
                  data-skeleton
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2 mb-1">
                    <p className="text-sm font-semibold truncate text-foreground">
                      {item.title}
                    </p>
                    <span className="text-xs text-zinc-400 shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AdaptiveSkeleton>
      </div>
    </div>
  );
}

function ShimmerExample({ isLoading }: { isLoading: boolean }) {
  const user = isLoading
    ? {
        name: "Jane Doe",
        role: "Senior Product Designer",
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        avatar: "https://i.pravatar.cc/150?u=jane",
      }
    : {
        name: "Marry Jane",
        role: "Senior Product Designer",
        bio: "Passionate about creating intuitive and accessible user experiences that delight customers.",
        avatar: "https://i.pravatar.cc/150?u=jane",
      };

  return (
    <>
      <style>{`
        @keyframes skeleton-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <ShimmerSkeleton isLoading={isLoading}>
        <div className="flex flex-col sm:flex-row gap-6 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm max-w-md w-full">
          <div
            className="size-24 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 mx-auto sm:mx-0 overflow-hidden"
            data-skeleton
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {user.role}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {user.bio}
            </p>
          </div>
        </div>
      </ShimmerSkeleton>
    </>
  );
}

// -- Page Wrapper --

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-zinc-800 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="text-zinc-600 dark:text-zinc-400 group-hover:text-foreground"
              />
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-500" size={20} />
              <h1 className="text-xl font-bold tracking-tight">Examples</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Pattern Library
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Explore interactive examples of{" "}
            <code className="text-sm font-semibold text-indigo-500 dark:text-indigo-400">
              react-adaptive-skeleton
            </code>{" "}
            in action. View the source code to see how to implement explicit
            targets, polymporphic containers, and scroll boundaries.
          </p>
        </div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ExampleViewer
              title="User Profile Card"
              description="Demonstrates explicit 'data-skeleton' targeting for an image block, and text freezing with 'data-no-skeleton-text' for the user's role."
              code={userCardCode}
            >
              {(isLoading) => <UserCardExample isLoading={isLoading} />}
            </ExampleViewer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ExampleViewer
              title="Product Grid"
              description="A 'Macro' scale pattern. Instead of wrapping individual cards, one AdaptiveSkeleton wraps the entire grid view for superior performance. Suitable for simple structured cards that does not have complex node trees."
              code={gridCode}
            >
              {(isLoading) => <ProductGridExample isLoading={isLoading} />}
            </ExampleViewer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ExampleViewer
              title="Table Rows"
              description="Uses the polymorphic 'as' prop to render the scanner as a <tbody> to ensure HTML validity inside table layouts."
              code={tableCode}
            >
              {(isLoading) => <TableExample isLoading={isLoading} />}
            </ExampleViewer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ExampleViewer
              title="Scrolling Container"
              description="Shows the Golden Rule of scrolling: place the AdaptiveSkeleton INSIDE the overflow element, so skeletons scroll smoothly with the page."
              code={scrollCode}
            >
              {(isLoading) => <ScrollContainerExample isLoading={isLoading} />}
            </ExampleViewer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ExampleViewer
              title="Shimmer / Shine Effect"
              description="Uses the overlay.children option to render a single animated gradient inside the overlay — one element sweeps across all skeleton rects simultaneously, with no per-rect duplication."
              code={shimmerCode}
            >
              {(isLoading) => <ShimmerExample isLoading={isLoading} />}
            </ExampleViewer>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
