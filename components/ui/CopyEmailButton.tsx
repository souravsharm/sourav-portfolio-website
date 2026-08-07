"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1900);
    } catch {
      // Clipboard access can be blocked; the address is on screen either way.
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-elevated/60 px-5 text-sm text-muted transition-colors hover:border-lineStrong hover:text-fg",
        className,
      )}
    >
      {copied ? <Check aria-hidden className="h-4 w-4 text-mint" /> : <Copy aria-hidden className="h-4 w-4" />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
