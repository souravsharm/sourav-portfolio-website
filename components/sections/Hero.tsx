"use client";

import { ArrowDown, ArrowUpRight, FileText, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatusPill } from "@/components/ui/Tag";
import { Scene3D } from "@/components/three/Scene3D";
import { site } from "@/content/site";
import { useScrollProgress } from "@/lib/useScrollProgress";

// WebGL never runs on the server, and keeping three out of the initial bundle
// means the text above the fold paints without waiting for it.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

/** Static stand-in for the 3D core: same silhouette, no WebGL. */
function CoreFallback() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgb(var(--accent)/0.5),rgb(var(--accent-2)/0.22)_45%,transparent_70%)] blur-[2px]" />
      {[0.52, 0.72, 0.92].map((size, index) => (
        <div
          key={size}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line"
          style={{
            width: `${size * 100}%`,
            height: `${size * 100}%`,
            transform: `translate(-50%, -50%) rotateX(${62 + index * 6}deg) rotateZ(${index * 24}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef, { start: "top top", end: "bottom top" });

  return (
    <section id="top" ref={sectionRef} className="relative min-h-[100svh] overflow-hidden">
      {/* The scene sits behind the copy on small screens and beside it on large. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-70 sm:opacity-100 lg:left-[42%]"
      >
        <Scene3D fallback={<CoreFallback />}>
          <HeroScene progress={progress} />
        </Scene3D>
      </div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-28 pt-28">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <StatusPill>{site.availability}</StatusPill>
          </motion.div>

          <h1 className="mt-6 font-display text-display-xl font-semibold text-fg">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              {site.headline.lead}
            </motion.span>
            <motion.span
              className="block text-gradient"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.22, ease: EASE }}
            >
              {site.headline.emphasis}
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-measure text-lead text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38, ease: EASE }}
          >
            {site.intro}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            <Button href="#work" variant="primary" size="lg" icon={<ArrowUpRight aria-hidden className="h-4 w-4" />}>
              See the work
            </Button>
            <Button
              href={site.resumePath}
              newTab
              size="lg"
              icon={<ArrowUpRight aria-hidden className="h-4 w-4" />}
            >
              <FileText aria-hidden className="mr-1 inline h-4 w-4 align-[-3px]" />
              View résumé
            </Button>
          </motion.div>

          <motion.p
            className="mt-8 flex items-center gap-2 font-mono text-xs text-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.66 }}
          >
            <MapPin aria-hidden className="h-3.5 w-3.5" />
            {site.location}
          </motion.p>
        </div>
      </Container>

      {/* Stack ticker, pinned to the bottom edge of the viewport. */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-y border-line bg-bg/60 backdrop-blur-sm">
        <div className="marquee-mask flex overflow-hidden py-3.5 [--marquee-duration:38s]">
          <div className="marquee-track flex w-max shrink-0 items-center">
            {[...site.marquee, ...site.marquee].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-dim">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-line" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-20 right-[var(--shell-pad)] z-10 hidden items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-dim lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Scroll
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
