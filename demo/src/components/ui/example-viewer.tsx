"use client";

import { Code2, Eye } from "lucide-react";
import { type ReactNode, useState } from "react";

import { CodeBlock } from "./code-block";

interface ExampleViewerProps {
  title: string;
  description: string;
  code: string;
  children: (isLoading: boolean) => ReactNode;
}

export function ExampleViewer({
  title,
  description,
  code,
  children,
}: ExampleViewerProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 md:py-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 gap-4">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {description}
          </p>
        </div>

        {/* Global Loading Toggle for this specific example */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Loading State
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isLoading}
            onClick={() => setIsLoading(!isLoading)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-start rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
              isLoading ? "bg-indigo-500" : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isLoading ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "preview"
              ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
              : "text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
          }`}
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("code")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "code"
              ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
              : "text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
          }`}
        >
          <Code2 size={16} />
          Code
        </button>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[300px] bg-zinc-50/30 dark:bg-black/20">
        {activeTab === "preview" ? (
          <div className="p-4 md:p-8 flex items-center justify-center min-h-[300px]">
            <div className="w-full max-w-3xl">{children(isLoading)}</div>
          </div>
        ) : (
          <div className="p-4">
            <CodeBlock code={code} language="tsx" showLineNumbers />
          </div>
        )}
      </div>
    </div>
  );
}
