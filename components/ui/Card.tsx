"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <motion.article
      className={cn(
        "rounded-2xl border border-border bg-panel/86 p-6 shadow-line transition-colors hover:border-accent/55",
        className,
      )}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.article>
  );
}

