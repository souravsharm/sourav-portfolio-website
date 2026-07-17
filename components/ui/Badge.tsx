import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center whitespace-normal break-words rounded-full border border-border/80 bg-panel/70 px-3 py-1 text-xs font-medium leading-5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
