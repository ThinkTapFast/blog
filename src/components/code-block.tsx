"use client";

import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ children, language, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([children], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `code.${language || "txt"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("group relative my-6 overflow-hidden rounded-lg border", className)}>
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && <span className="text-sm font-medium text-foreground">{filename}</span>}
            {language && (
              <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {language}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0">
              {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
            </Button>

            {filename && (
              <Button variant="ghost" size="sm" onClick={downloadCode} className="h-8 w-8 p-0">
                <Download className="size-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Code Content */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className={`language-${language || "text"}`}>{children}</code>
        </pre>

        {/* Copy button for blocks without header */}
        {!filename && !language && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute right-2 top-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
          </Button>
        )}
      </div>
    </div>
  );
}
