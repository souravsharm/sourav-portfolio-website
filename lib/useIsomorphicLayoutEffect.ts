"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server (where it would warn).
 * Scroll animations need the layout variant: setting a GSAP "from" state in a
 * passive effect happens after paint, so the element flashes at its final
 * position for one frame before snapping back to the start.
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
