"use client";

import { motion, type Variants } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, as = "div", delay = 0, y = 24 }: RevealProps) {
  const reduceMotion = useSafeReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "dl" | "ul" | "ol";
}) {
  const reduceMotion = useSafeReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduceMotion = useSafeReducedMotion();
  const Component = motion[as];

  return (
    <Component className={className} variants={reduceMotion ? undefined : item}>
      {children}
    </Component>
  );
}
