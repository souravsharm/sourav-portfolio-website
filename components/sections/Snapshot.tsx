import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

/**
 * The screening block. A recruiter's first questions — what role, where, what
 * stack, what qualifications — answered above the fold of the second screen,
 * before they have to hunt for any of it.
 */
export function Snapshot() {
  return (
    <section className="relative border-y border-line bg-surface/40 py-20 sm:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Reveal className="flex items-center gap-4" y={12}>
              <span className="eyebrow text-accent">00</span>
              <span className="h-px w-8 bg-lineStrong" aria-hidden />
              <span className="eyebrow">The ten-second version</span>
            </Reveal>

            {/* A description list is the honest markup here — HTML permits the
                div wrappers, which is what lets each row animate on its own. */}
            <RevealGroup as="dl" className="mt-8 border-t border-line">
              {site.snapshot.map((row) => (
                <RevealItem
                  key={row.label}
                  className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[9.5rem_1fr]"
                >
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">{row.label}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-fg">{row.value}</dd>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15}>
              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-fg"
              >
                Hiring for one of these?
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {site.stats.map((stat) => (
              <RevealItem key={stat.label} className="bg-bg">
                <div className="group h-full bg-surface/60 p-6 transition-colors duration-500 hover:bg-elevated sm:p-8">
                  <p className="font-display text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] font-semibold leading-none tracking-tight text-fg">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-dim">{stat.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
