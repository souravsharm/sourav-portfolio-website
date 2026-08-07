"use client";

import { useRef, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

type Options = {
  start?: string;
  end?: string;
};

/**
 * Scroll progress (0 to 1) through an element, written into a ref.
 *
 * A ref rather than state on purpose: this feeds useFrame inside a WebGL scene,
 * which already runs every frame. Routing it through React state would re-render
 * the tree sixty times a second for a value React never needs to see.
 */
export function useScrollProgress(
  target: RefObject<HTMLElement | null>,
  { start = "top top", end = "bottom top" }: Options = {},
) {
  const progress = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const element = target.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, [target, start, end]);

  return progress;
}
