"use client";
import { AdaptiveSkeleton } from "@/components/ui/adaptive-skeleton";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Mail,
  MoreVertical,
  Play,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

function ProfileCard() {
  return (
    <div className="border dark:border-zinc-800 border-zinc-200 rounded-xl p-5 bg-white dark:bg-zinc-950 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div
          data-skeleton
          className="w-12 h-12 rounded-full overflow-hidden bg-zinc-100 shrink-0"
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="avatar"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Jane Doe
          </h3>
          <p className="text-sm text-zinc-500">Senior Product Designer</p>
        </div>
        <button
          type="button"
          data-skeleton
          className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <MoreVertical size={20} />
        </button>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
        Passionate about creating intuitive user experiences and bridging the
        gap between design and engineering.
      </p>
      <div className="flex items-center gap-3 pt-2">
        <Button variant="outline" size="sm" className="w-full gap-2">
          <Mail size={14} />
          Message
        </Button>
      </div>
    </div>
  );
}

function StatsCard() {
  return (
    <div className="border dark:border-zinc-800 border-zinc-200 rounded-xl p-5 bg-white dark:bg-zinc-950 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between text-zinc-500">
        <div className="text-sm font-medium">Monthly Active Users</div>
        <Activity size={18} />
      </div>
      <div>
        <div className="text-3xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
          24,592
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
            <CheckCircle2 size={14} />
            +14%
          </span>
          <span className="text-zinc-400 text-sm">vs last month</span>
        </div>
      </div>
      <div className="h-14 mt-2 flex items-end gap-1.5 opacity-80">
        {[40, 70, 45, 90, 65, 85, 100, 60].map((h) => (
          <div
            key={h}
            data-skeleton
            className="flex-1 bg-indigo-500/20 dark:bg-indigo-500/40 rounded-t-sm"
            style={{ height: `${h}%` }}
          >
            <div
              className="w-full bg-indigo-500 rounded-t-sm"
              style={{ height: "4px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleCard() {
  return (
    <div className="border dark:border-zinc-800 border-zinc-200 rounded-xl p-5 bg-white dark:bg-zinc-950 shadow-sm flex gap-5">
      <div className="size-24 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0" />
      <div className="flex flex-col justify-center gap-2 flex-1">
        <div className="flex items-center gap-2">
          <div
            data-skeleton
            className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 lowercase"
          >
            Engineering
          </div>
          <span className="text-xs text-zinc-500">5 min read</span>
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
          Building Resilient UI Components
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-2">
          Learn how to architect your React components to gracefully handle
          loading states, errors, and missing data without resorting to complex
          state management.
        </p>
      </div>
    </div>
  );
}

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="container mx-auto px-5 pb-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-1.5"
        >
          <SparklesIcon />
          Dynamic React Skeletons
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
        >
          Skeletons that match your{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-purple-500">
            exact UI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
        >
          Stop wasting hours creating and maintaining manual skeleton UI.{" "}
          <strong>react-adaptive-skeleton</strong> dynamically traverses your
          React tree and wraps text and nodes seamlessly, preserving layout and
          structural integrity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Button
            size="lg"
            className="rounded-full gap-2 px-8 shadow-xl shadow-indigo-500/20"
            onClick={() => {
              const el = document.getElementById("demo-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Play size={18} fill="currentColor" className="opacity-80" />
            Watch Demo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full gap-2 px-8"
            asChild
          >
            <Link href="/docs">
              <Code2 size={18} className="opacity-80" />
              Documentation
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Demo Section */}
      <section
        id="demo-section"
        className="mt-10 py-16 border-t border-border/50 relative scroll-m-20"
      >
        <div className="absolute inset-0 bg-linear-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Interactive Demo
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">
              Try toggling the loading state. Notice how the skeleton
              meticulously maps to every curve, text node, and image of the
              cards? That's the power of precise DOM traversal.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-foreground/10 shadow-indigo-200 shadow-lg flex flex-col items-center gap-3">
            <span className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Toggle State
            </span>
            <button
              type="button"
              onClick={() => setIsLoading((pre) => !pre)}
              className="relative inline-flex h-10 w-20 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 ease-in-out bg-indigo-500 shadow-inner"
              style={{
                backgroundColor: isLoading
                  ? "rgb(99 102 241)"
                  : "rgb(228 228 231)",
              }}
              aria-checked={isLoading}
            >
              <div
                className="pointer-events-none absolute left-0 h-8 w-8 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center"
                style={{
                  transform: isLoading
                    ? "translateX(2.6rem)"
                    : "translateX(0.1rem)",
                }}
              />
            </button>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Cards Demo */}
          <div className="space-y-6">
            <AdaptiveSkeleton isLoading={isLoading}>
              <div className="space-y-6 transition-all duration-300">
                <ProfileCard />
                <div className="grid sm:grid-cols-2 gap-6">
                  <StatsCard />
                  <ArticleCard />
                </div>
              </div>
            </AdaptiveSkeleton>
          </div>

          {/* Explanation Code block */}
          <div className="sticky top-24 rounded-2xl overflow-hidden border bg-zinc-950 shadow-xl self-start">
            <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-zinc-400">
                demo.tsx
              </div>
            </div>
            <div className="p-5 text-sm font-mono overflow-auto max-h-[500px]">
              <pre className="text-zinc-300">
                <code>
                  <span className="text-pink-400">import</span> {"{"}{" "}
                  createAdaptiveSkeleton {"}"}{" "}
                  <span className="text-pink-400">from</span>{" "}
                  <span className="text-amber-300">
                    "react-adaptive-skeleton"
                  </span>
                  ;{"\n\n"}
                  <span className="text-zinc-500">
                    {"// 1. Configure your skeleton style"}
                  </span>
                  {"\n"}
                  <span className="text-pink-400">const</span> AdaptiveSkeleton
                  ={" "}
                  <span className="text-blue-400">createAdaptiveSkeleton</span>(
                  {"\n"}
                  {'<div className="animate-pulse bg-gray-200 rounded" />'},
                  {"\n"}
                  {"{"}
                  {"\n"}
                  {"\t...options"}
                  {"\n"}
                  {"}"});{"\n\n"}
                  <span className="text-zinc-500">
                    {" // 2. Wrap your complex UI"}
                  </span>
                  {"\n"}
                  <span className="text-pink-400" />
                  <span className="text-blue-400">MyDashboard</span>() {"{"}
                  {"\n"}
                  <span className="text-pink-400">const</span> {"{"} data,
                  isLoading {"}"} ={" "}
                  <span className="text-blue-400">useData</span>();{"\n\n"}
                  <span className="text-pink-400">return</span> ({"\n"}
                  {"<AdaptiveSkeleton isLoading={isLoading}>"}
                  {"\n"}
                  <span className="text-zinc-500">
                    {" "}
                    {/* Skeletons perfectly match this layout! */}
                  </span>
                  {"\n"}
                  {'  <div className="grid gap-4">'}
                  {"\n"}
                  {
                    "    <ProfileCard user={isLoading? templateUserData : data.user} />"
                  }
                  {"\n"}
                  {
                    "    <StatsCard stats={isLoading? templateStatsData : data.stats} />"
                  }
                  {"\n"}
                  {"  </div>"}
                  {"\n"}
                  {"</AdaptiveSkeleton>"}
                  {"\n"}
                  );{"\n"}
                  {"}"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 mt-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Why Adaptive Skeleton?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I built this because manually designing, coding, and updating
            skeleton loaders for every UI change was frustrating and honestly,
            not so fun. Much time was spent doing that instead of building
            features.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-indigo-600 dark:text-indigo-400">
            react-adaptive-skeleton was born out of the need for a solution that
            just works—mapping perfectly to your UI without the manual labor.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 mt-10">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-5">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-semibold">Zero Configuration</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Drop it in and it works. No need to define arbitrary width/height
              props for hundreds of placeholder elements.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-5">
              <Wand2 size={24} />
            </div>
            <h3 className="text-xl font-semibold">Automatic Mapping</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Text nodes, images, and nested structures are automatically sized
              and replaced with perfectly fitting skeletons.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-5">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-semibold">Granular Control</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Opt-out specific elements using data-attributes or CSS selectors.
              You retain full control over what gets skeletonized.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

export default HomePage;
