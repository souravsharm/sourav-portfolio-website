"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Download, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-border/70 bg-background/88 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-[min-height] duration-300",
          scrolled ? "min-h-14" : "min-h-16",
        )}
      >
        <Link
          href="#top"
          className="flex min-w-0 flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          onClick={() => setOpen(false)}
        >
          <span className="text-sm font-bold text-foreground">{site.name}</span>
          <span className="text-xs text-muted">Software Engineer</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button href={site.resumePath} download variant="secondary" icon={<Download aria-hidden className="h-4 w-4" />}>
            Resume
          </Button>
          <Button href={`mailto:${site.email}`} variant="primary" icon={<Mail aria-hidden className="h-4 w-4" />}>
            Contact
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-panel text-muted transition hover:border-accent/70 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {open ? <X aria-hidden className="h-4 w-4" /> : <Menu aria-hidden className="h-4 w-4" />}
          </button>
          <ThemeToggle />
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <Container className="grid gap-2 py-4">
              {site.nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-muted transition hover:bg-panel hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="grid gap-2 pt-2 sm:grid-cols-2">
                <Button href={site.resumePath} download icon={<Download aria-hidden className="h-4 w-4" />}>
                  Resume
                </Button>
                <Button href={`mailto:${site.email}`} variant="primary" icon={<Mail aria-hidden className="h-4 w-4" />}>
                  Contact
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
