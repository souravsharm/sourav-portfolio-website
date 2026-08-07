import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-shell px-[var(--shell-pad)]", className)}>{children}</div>
  );
}
