"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Counts up once, the first time it scrolls into view. */
export function AnimatedCounter({ value, suffix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useSafeReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 34, stiffness: 80 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    if (reduceMotion) return;
    // Writing textContent directly keeps sixty updates a second out of React.
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [spring, suffix, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {reduceMotion ? `${value}${suffix}` : `0${suffix}`}
    </span>
  );
}
