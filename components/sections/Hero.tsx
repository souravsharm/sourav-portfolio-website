"use client";

import { ArrowDown, ArrowRight, Download, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const mottoWords = site.tagline.split(" ");
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mottoLayerRef = useRef<HTMLDivElement>(null);
  const identityLayerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useSafeReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pinEnabled = isDesktop && !reduceMotion;

  useEffect(() => {
    if (!pinEnabled) return;

    const ctx = gsap.context(() => {
      gsap.set(identityLayerRef.current, { autoAlpha: 0, y: 60 });
      gsap.set(mottoLayerRef.current, { autoAlpha: 1, scale: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "hero-pin",
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sequence with a clean handoff: motto fully exits before identity enters,
      // so the two very different layouts never render on top of each other.
      timeline
        .to(mottoLayerRef.current, { autoAlpha: 0, scale: 0.86, y: -60, ease: "power1.in", duration: 0.4 }, 0)
        .to(identityLayerRef.current, { autoAlpha: 1, y: 0, ease: "power1.out", duration: 0.4 }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, [pinEnabled]);

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[130px]" />
        <div className="absolute right-0 bottom-0 h-[26rem] w-[26rem] translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className={cn("relative flex flex-col", pinEnabled && "lg:h-[100svh]")}>
        <div
          ref={mottoLayerRef}
          className={cn(
            "flex min-h-[100svh] flex-col items-center justify-center px-6 text-center",
            pinEnabled && "lg:absolute lg:inset-0",
          )}
        >
          <p
            aria-hidden
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-5xl font-bold leading-none tracking-tight text-foreground sm:text-7xl lg:text-8xl"
          >
            {mottoWords.map((word, index) => (
              <motion.span
                key={word}
                initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 * index, ease: EASE }}
                className={index === mottoWords.length - 1 ? "text-gradient" : undefined}
              >
                {word}
              </motion.span>
            ))}
          </p>
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex items-center gap-2 text-sm text-muted"
          >
            <span>Scroll to explore</span>
            <ArrowDown aria-hidden className="h-4 w-4 animate-bounce" />
          </motion.div>
        </div>

        <div
          ref={identityLayerRef}
          className={cn("min-h-[100svh]", pinEnabled && "lg:absolute lg:inset-0")}
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={site.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--background))_0%,rgb(var(--background)/0.92)_35%,rgb(var(--background)/0.7)_100%)]" />
          </div>
          <Container className="grid min-h-[100svh] items-center gap-10 py-14 lg:grid-cols-[1fr_0.82fr] lg:py-16">
            <div className="min-w-0 max-w-[21.5rem] sm:max-w-3xl">
              <Badge className="items-start gap-2 text-left">
                <MapPin aria-hidden className="h-3.5 w-3.5 text-accent" />
                <span className="min-w-0 break-words">{site.shortLocation} / Software Engineering Honours Graduate</span>
              </Badge>
              <h1 className="mt-6 max-w-full text-[2.1rem] font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="block">Software engineer</span>
                <span className="block">building full-stack,</span>
                <span className="block">AI, IoT, and</span>
                <span className="block">cloud-aware solutions.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{site.intro}</p>
              <div className="mt-5 flex flex-wrap gap-2 md:hidden">
                {site.strengths.slice(0, 4).map((strength) => (
                  <span key={strength} className="rounded-full border border-border bg-panel/80 px-2.5 py-1 text-xs font-medium text-muted">
                    {strength}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#projects" variant="primary" icon={<ArrowRight aria-hidden className="h-4 w-4" />}>
                  View Projects
                </Button>
                <Button href={site.resumePath} download icon={<Download aria-hidden className="h-4 w-4" />}>
                  Download Resume
                </Button>
                <Button href={`mailto:${site.email}`} variant="ghost">
                  Contact Me
                </Button>
              </div>
            </div>

            <div className="hidden min-w-0 gap-4 rounded-2xl border border-border bg-background/76 p-5 shadow-soft backdrop-blur-xl md:grid">
              <p className="text-sm font-semibold uppercase tracking-normal text-accent">Core Range</p>
              <div className="grid gap-3 md:grid-cols-2">
                {site.strengths.map((strength) => (
                  <div key={strength} className="min-w-0 rounded-xl border border-border bg-panel/80 p-4 text-sm font-medium text-foreground">
                    {strength}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
