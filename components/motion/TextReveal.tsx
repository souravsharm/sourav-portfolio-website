"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  /** Rendered element. Headings should pass their real level for a11y. */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  /** Play immediately instead of waiting for the element to scroll into view. */
  immediate?: boolean;
  /** Words to paint in the accent colour, matched case-insensitively. */
  highlight?: string;
  /**
   * Class applied to highlighted words. Defaults to a flat accent because
   * `text-gradient` clips its ramp to each word's own box — across several
   * words that reads as speckling, not as one gradient.
   */
  highlightClass?: string;
};

const strip = (word: string) => word.toLowerCase().replace(/[.,—–:]/g, "");

/**
 * Words rise out from behind a mask, staggered. The split happens during render
 * so server and client markup match exactly; GSAP only ever touches transforms.
 * The full string stays available to screen readers via aria-label.
 */
export function TextReveal({
  text,
  className,
  as = "p",
  delay = 0,
  immediate = false,
  highlight,
  highlightClass = "text-accent",
}: TextRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const words = text.split(" ");
  const highlightWords = highlight ? new Set(highlight.split(" ").map(strip)) : null;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-word",
        { yPercent: 118, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          delay,
          ease: "expo.out",
          stagger: 0.045,
          scrollTrigger: immediate ? undefined : { trigger: root, start: "top 88%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [delay, immediate, text]);

  // JSX over a union of tag names intersects every element's prop types, which
  // TypeScript collapses to `never`. Narrowing the tag to one concrete element
  // gives JSX a single prop shape to check; the rendered tag is still `as`.
  const Component = as as "div";

  return (
    <Component ref={rootRef as React.RefObject<HTMLDivElement>} className={cn(className)} aria-label={text}>
      {words.map((word, index) => (
        // The gap between words is a margin, not a space character: a trailing
        // space inside an inline-flex box collapses, but a margin still lets the
        // line wrap naturally between words.
        <span
          key={`${word}-${index}`}
          aria-hidden
          className={cn(
            "inline-flex overflow-hidden py-[0.08em] align-bottom",
            index < words.length - 1 && "mr-[0.26em]",
          )}
        >
          <span className={cn("reveal-word", highlightWords?.has(strip(word)) && highlightClass)}>{word}</span>
        </span>
      ))}
    </Component>
  );
}
