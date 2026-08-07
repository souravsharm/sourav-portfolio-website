"use client";

import { useEffect, useRef } from "react";

/**
 * Normalised pointer position (-1 to 1 on both axes) in a ref.
 *
 * The 3D canvases are pointer-events:none so they can never swallow a click or
 * a scroll gesture — which also means R3F's own pointer state never updates.
 * Tracking it on the window instead keeps the parallax working without putting
 * an invisible interaction blocker over the page. A ref rather than state
 * because this is read inside useFrame and must not trigger React renders.
 */
export function usePointerParallax() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Coarse pointers have no hover position to follow.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}

/** Reads a next/font CSS variable back as a real family name for canvas 2D. */
export function resolveFontFamily(variable: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value ? `${value}, ${fallback}` : fallback;
}
