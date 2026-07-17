"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  download?: boolean;
  external?: boolean;
};

const variants = {
  primary:
    "border-accent bg-accent text-white shadow-soft hover:bg-accent/90 hover:border-accent/90",
  secondary:
    "border-border bg-panel text-foreground hover:border-accent/70 hover:text-accent",
  ghost:
    "border-transparent bg-transparent text-muted hover:text-foreground hover:bg-panel/70",
};

const MotionLink = motion.create(Link);

function useMagnetic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function onMouseMove(event: React.MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.25);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.5);
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
  icon,
  download,
  external,
}: ButtonProps) {
  const { springX, springY, onMouseMove, onMouseLeave } = useMagnetic();
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variants[variant],
    className,
  );

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
    whileTap: { scale: 0.96 },
  };

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <motion.a
        className={classes}
        href={href}
        download={download}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
        {...motionProps}
      >
        {icon}
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink className={classes} href={href} download={download} {...motionProps}>
      {icon}
      {children}
    </MotionLink>
  );
}
