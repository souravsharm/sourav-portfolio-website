import { Award, BookOpen, GraduationCap, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { certifications, education, publication } from "@/content/education";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          index="04"
          eyebrow="About"
          tone="rose"
          title="The short version, without the buzzwords."
          highlight="without the buzzwords."
          className="max-w-3xl mb-14 sm:mb-20"
        />

        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal className="grid gap-6">
              {site.about.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-[1.6] text-fg"
                      : "text-lead text-muted"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="panel mt-10 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent">
                    <Target aria-hidden className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-fg">{site.lookingFor.title}</h3>
                </div>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{site.lookingFor.body}</p>
                <ul className="mt-5 grid gap-2.5">
                  {site.lookingFor.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="grid content-start gap-4">
            <Reveal>
              <article className="panel p-6 sm:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-elevated text-accent">
                  <GraduationCap aria-hidden className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug text-fg">{education.degree}</h3>
                <p className="mt-2 text-[0.875rem] text-muted">
                  {education.institution} · {education.year}
                </p>
                <dl className="mt-5 grid gap-2.5 border-t border-line pt-5 text-[0.8125rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-dim">Specialisation</dt>
                    <dd className="text-right text-muted">{education.specialization}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-dim">WAM</dt>
                    <dd className="font-mono text-muted">{education.wam}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-[0.8125rem] leading-relaxed text-dim">{education.note}</p>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={publication.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel panel-hover block p-6 transition-colors sm:p-7"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-elevated text-violet">
                  <BookOpen aria-hidden className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug text-fg">Peer-reviewed publication</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{publication.title}</p>
                <p className="mt-3 text-[0.8125rem] text-dim">
                  {publication.venue}, {publication.year}
                </p>
                <p className="mt-4 font-mono text-[0.6875rem] text-accent">DOI {publication.doi}</p>
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <article className="panel p-6 sm:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-elevated text-mint">
                  <Award aria-hidden className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-fg">Certifications</h3>
                <RevealGroup as="ul" className="mt-5 grid gap-3 border-t border-line pt-5">
                  {certifications.map((certification) => (
                    <RevealItem as="li" key={certification.name} className="flex items-baseline justify-between gap-4">
                      <span
                        className={
                          certification.primary
                            ? "text-[0.875rem] font-medium leading-snug text-fg"
                            : "text-[0.875rem] leading-snug text-muted"
                        }
                      >
                        {certification.name}
                        <span className="block text-[0.75rem] text-dim">{certification.issuer}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[0.6875rem] text-dim">{certification.year}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </article>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
