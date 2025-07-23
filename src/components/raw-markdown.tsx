"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { T, useGT } from "gt-next";

interface RawMarkdownProps {
  slug: string;
  content: string;
}

export function RawMarkdown({ slug, content }: RawMarkdownProps) {
  const [copied, setCopied] = useState(false);
  const t = useGT();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-3">
      <T><h3 className="font-semibold text-sm text-foreground">
        View Raw (for LLMs)
      </h3></T>
      <div className="space-y-2">
        <a
          href={`/posts/${slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <T>View raw markdown</T>
        </a>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-start"
        >
          {copied ? (
            <T><>
              <Check className="h-4 w-4 text-green-500" />
              Copied!
            </></T>
          ) : (
            <T><>
              <Copy className="h-4 w-4" />
              Copy raw content
            </></T>
          )}
        </button>
      </div>
    </div>
  );
}
