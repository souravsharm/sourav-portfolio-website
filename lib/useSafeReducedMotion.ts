"use client";

import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * framer-motion's useReducedMotion reads the OS preference synchronously on the
 * client's first render but is null on the server, so any component branching on
 * it mismatches during hydration. useMediaQuery is backed by useSyncExternalStore
 * with a false server snapshot, so server and the first client render always
 * agree (motion enabled), then it updates safely after hydration.
 */
export function useSafeReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
