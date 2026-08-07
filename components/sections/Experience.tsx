"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/content/experience";

export function Experience() {
  const trackRef = useRef<HTMLOListElement>(null);

  // The rail fills as the list scrolls past, so progress through the timeline
  // is visible without a scrollbar-watching effort from the reader.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 60%"],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const railOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section id="experience" className="relative scroll-mt-24 border-y border-line bg-surface/30 py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          index="03"
          eyebrow="Experience"
          tone="violet"
          title="Three engineering roles, three very different problems."
          highlight="very different problems."
          intro="Backend integration work, a live production website, and cross-platform UI against real-time data — each one in a working team, not a classroom."
          className="max-w-3xl mb-14 sm:mb-20"
        />

        <ol ref={trackRef} className="relative grid gap-14 sm:gap-20">
          {/* Rail */}
          <div aria-hidden className="absolute left-0 top-2 hidden h-full w-px bg-line sm:block">
            <motion.div
              className="h-full w-px origin-top bg-gradient-to-b from-accent via-violet to-transparent"
              style={{ scaleY: railScale, opacity: railOpacity }}
            />
          </div>

          {experience.map((item, index) => (
            <li key={`${item.company}-${item.period}`} className="relative sm:pl-10 lg:pl-14">
              <span
                aria-hidden
                className="absolute -left-[5px] top-2 hidden h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent sm:block"
              />

              <Reveal>
                <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-10">
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">{item.period}</p>
                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-fg">{item.company}</h3>
                    <p className="mt-1 text-[0.8125rem] text-dim">{item.location}</p>
                    <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">{item.scope}</p>
                  </div>

                  <div className="panel p-6 sm:p-8">
                    <p className="font-display text-[1.0625rem] font-semibold text-fg">{item.role}</p>
                    <ul className="mt-5 grid gap-3.5">
                      {item.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                      {item.tech.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <span className="sr-only">{`Position ${index + 1} of ${experience.length}`}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
