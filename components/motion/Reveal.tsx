"use client";

import { motion, type Variants } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  delay?: number;
  y?: number;
  once?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, className, as = "div", delay = 0, y = 28, once = true }: RevealProps) {
  const reduceMotion = useSafeReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function RevealGroup({
  children,
  className,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once, amount: 0.2 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <motion.div className={className} variants={reduceMotion ? undefined : staggerItem}>
      {children}
    </motion.div>
  );
}
