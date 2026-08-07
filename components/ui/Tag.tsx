import { cn } from "@/lib/utils";

/** Small monospace chip used for tech stacks and metadata. */
export function Tag({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent" | "outline";
}) {
  const tones = {
    default: "border-line bg-elevated/60 text-muted",
    accent: "border-accent/35 bg-accent/10 text-accent",
    outline: "border-lineStrong bg-transparent text-dim",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-tight",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Status pill with a live dot — used for the availability line. */
export function StatusPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-elevated/70 py-1.5 pl-3 pr-4 text-xs text-muted backdrop-blur",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-mint" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
      </span>
      {children}
    </span>
  );
}
