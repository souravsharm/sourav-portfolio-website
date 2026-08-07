"use client";

import { useSyncExternalStore } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/** Probe once per page load — creating contexts is not free, and this never changes. */
let cachedSupport: boolean | null = null;

function detectWebGL(): boolean {
  if (cachedSupport !== null) return cachedSupport;

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    cachedSupport = Boolean(context);
    // Release the probe immediately; browsers cap how many live contexts exist.
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cachedSupport = false;
  }

  return cachedSupport;
}

// useSyncExternalStore with a no-op subscribe is the hydration-safe way to read
// a client-only capability: the server snapshot is false, so the first client
// render matches it, and React re-renders with the real value straight after.
const subscribe = () => () => {};
const getServerSnapshot = () => false;

/**
 * Gate for the WebGL scenes.
 *
 * Three things must be true before one mounts: the user has not asked for
 * reduced motion, the device can actually create a WebGL context, and the
 * viewport is wide enough to be worth the battery. Everything else gets the
 * static fallback, which is a real piece of the design rather than a blank gap.
 */
export function Scene3D({
  children,
  fallback,
  minWidth = 640,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
  minWidth?: number;
}) {
  const reduceMotion = useSafeReducedMotion();
  const wideEnough = useMediaQuery(`(min-width: ${minWidth}px)`);
  const supported = useSyncExternalStore(subscribe, detectWebGL, getServerSnapshot);

  if (reduceMotion || !supported || !wideEnough) return <>{fallback}</>;
  return <>{children}</>;
}
