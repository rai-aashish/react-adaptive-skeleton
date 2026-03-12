"use client";

import { useTheme } from "@/components/contexts/theme-context";
import { Button } from "@/components/ui/button";
import { Github, Layers, Moon, Sun } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="container flex h-14 max-w-7xl items-center mx-auto px-5">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <Layers className="h-5 w-5 text-indigo-500" />
          <span className="font-bold sm:inline-block font-mono tracking-tighter">
            react-adaptive-skeleton
          </span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Link
            href="/docs"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="/examples"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Examples
          </Link>
          <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-4 ml-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full h-9 w-9"
            >
              <a
                href="https://github.com/rai-aashish/adaptive-skeleton/tree/main/packages/react"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full h-9 w-9"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
