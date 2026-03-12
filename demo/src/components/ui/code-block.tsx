"use client";

import { Code2 } from "lucide-react";
import React from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  fileName?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  fileName,
}: CodeBlockProps) {
  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl my-6">
      {fileName && (
        <div className="flex items-center px-4 py-3 bg-zinc-950 border-b border-zinc-800 text-xs font-mono text-zinc-400">
          <Code2 size={14} className="mr-2" /> {fileName}
        </div>
      )}
      <div className="p-1 font-mono text-sm overflow-x-auto bg-zinc-900">
        <CopyBlock
          text={code}
          language={language}
          showLineNumbers={showLineNumbers}
          theme={atomOneDark}
          wrapLongLines={true}
        />
      </div>
    </div>
  );
}
