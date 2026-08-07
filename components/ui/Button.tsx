"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: React.ReactNode;
  /** Force a plain anchor that opens in a new tab (the PDF viewer, mainly). */
  newTab?: boolean;
};

const variants = {
  primary:
    "border-transparent bg-fg text-bg hover:bg-white shadow-[0_18px_45px_-22px_rgb(var(--accent)/0.9)]",
  secondary: "border-line bg-elevated/70 text-fg hover:border-lineStrong hover:bg-elevated",
  ghost: "border-transparent bg-transparent text-muted hover:text-fg hover:bg-elevated/60",
};

const sizes = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-[3.25rem] px-7 text-[0.95rem]",
};

// Module scope: creating this inside the component would produce a new
// component type on every render and remount the link each time.
const MotionLink = motion.create(Link);

/** Subtle magnetic pull toward the cursor — the tell of a considered site. */
function useMagnetic(disabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  function onMouseMove(event: React.MouseEvent<HTMLElement>) {
    if (disabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.3);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { springX, springY, onMouseMove, onMouseLeave };
}

export function Button({
  href,
  children,
  className,
  variant = "secondary",
  size = "md",
  icon,
  newTab,
}: ButtonProps) {
  const reduceMotion = useSafeReducedMotion();
  const { springX, springY, onMouseMove, onMouseLeave } = useMagnetic(reduceMotion);

  const classes = cn(
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border font-medium transition-colors duration-300",
    variants[variant],
    sizes[size],
    className,
  );

  const motionProps = {
    style: reduceMotion ? undefined : { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
    whileTap: { scale: 0.97 },
  };

  const inner = (
    <>
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {icon ? <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5">{icon}</span> : null}
    </>
  );

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal || newTab) {
    const opensNewTab = newTab || href.startsWith("http");
    return (
      <motion.a
        className={classes}
        href={href}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <MotionLink className={classes} href={href} {...motionProps}>
      {inner}
    </MotionLink>
  );
}
