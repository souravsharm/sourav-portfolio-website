"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const sectionIds = site.nav.map((item) => item.href.replace("#", ""));

/** Highlights whichever section currently occupies the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Band across the middle of the screen: whichever section crosses it wins.
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 34, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 32));

  // A menu open behind a locked body is the usual mobile-nav bug; lock it here.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-accent via-violet to-mint"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[65] transition-all duration-500 ease-out",
          scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-6 transition-all duration-500 ease-out",
            scrolled ? "h-14" : "h-[4.5rem]",
          )}
        >
          <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line bg-elevated font-display text-xs font-bold text-fg transition-colors group-hover:border-accent/60">
              SS
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight text-fg">{site.name}</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim">{site.role}</span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-300",
                    isActive ? "text-fg" : "text-dim hover:text-muted",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-line bg-elevated/80"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-4 py-2 text-[0.8125rem] text-muted transition-colors duration-300 hover:border-lineStrong hover:text-fg"
            >
              Résumé
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group/cta inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[0.8125rem] font-medium text-bg transition-colors hover:bg-white"
            >
              Get in touch
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elevated/70 text-muted transition-colors hover:text-fg md:hidden"
          >
            {open ? <X aria-hidden className="h-4 w-4" /> : <Menu aria-hidden className="h-4 w-4" />}
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[64] bg-bg/96 backdrop-blur-2xl md:hidden"
          >
            <Container className="flex h-full flex-col justify-center gap-2 pb-16">
              {site.nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-semibold text-fg"
                >
                  <span className="font-mono text-xs text-dim">0{index + 1}</span>
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-8 flex flex-col gap-3"
              >
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-fg px-6 font-medium text-bg"
                >
                  Get in touch
                </a>
                <a
                  href={site.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 text-muted"
                >
                  View résumé
                </a>
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
