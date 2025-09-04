"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = "javascript", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-lg border bg-zinc-950", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-zinc-400">{filename || `${language || "text"}`}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          {copied ? (
            <>
              <Check className="size-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 font-mono text-sm">
          <code className="whitespace-pre text-green-400" data-language={language}>
            {code}
          </code>
        </pre>

        {/* Gradient overlay for long code */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent" />
      </div>
    </div>
  );
}
