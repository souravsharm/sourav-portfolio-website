"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, FileText, Github, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/layout/Section";
import { ProjectPoster } from "@/components/visuals/ProjectPoster";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { projects, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const linkIcons = {
  live: ExternalLink,
  code: Github,
  paper: FileText,
  video: Play,
} as const;

/** Every card carries its own palette and title face via CSS custom properties. */
function themeVars(project: Project) {
  return {
    "--c-accent": project.theme.accent,
    "--c-accent-2": project.theme.accentAlt,
    "--c-left": project.theme.left,
    "--c-right": project.theme.right,
    "--c-text": project.theme.text,
    "--c-muted": project.theme.muted,
    "--c-font": project.theme.font,
  } as React.CSSProperties;
}

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const primaryLink = project.links[0];
  const PrimaryIcon = linkIcons[primaryLink.kind];

  return (
    <article
      style={themeVars(project)}
      className="w-full shrink-0 snap-center overflow-hidden rounded-2xl border border-line shadow-card"
    >
      {/* h-full so both columns fill the tallest card in the track — otherwise
          the shorter card's panels stop short and the page shows through. */}
      <div className="grid h-full lg:grid-cols-[1.06fr_0.94fr]">
        {/* Text column */}
        <div className="order-2 flex flex-col bg-[rgb(var(--c-left))] p-6 sm:p-7 lg:order-1 lg:p-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.6875rem] tabular-nums text-card">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-6 bg-[rgb(var(--c-accent)/0.4)]" aria-hidden />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[rgb(var(--c-muted)/0.7)]">
              {project.year}
            </span>
          </div>

          <h3 className="mt-3 font-cardTitle text-[clamp(1.375rem,1.15rem+0.85vw,1.875rem)] font-semibold leading-tight tracking-tight text-[rgb(var(--c-text))]">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[0.8125rem] text-[rgb(var(--c-accent)/0.85)]">{project.kind}</p>
          <p className="mt-3.5 text-[1rem] leading-[1.55] text-[rgb(var(--c-muted))]">{project.summary}</p>

          <div className="mt-5 grid gap-4 border-t border-[rgb(var(--c-accent)/0.16)] pt-5">
            <div>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[rgb(var(--c-muted)/0.65)]">
                The problem
              </p>
              <p className="mt-1.5 text-[0.875rem] leading-[1.55] text-[rgb(var(--c-muted))]">{project.problem}</p>
            </div>
            <div>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[rgb(var(--c-muted)/0.65)]">
                What I built
              </p>
              <ul className="mt-1.5 grid gap-1.5">
                {project.build.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.875rem] leading-[1.55] text-[rgb(var(--c-muted))]">
                    <span aria-hidden className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-card" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {project.outcome ? (
              <p className="rounded-lg border-l-2 border-card bg-[rgb(var(--c-accent)/0.07)] px-3.5 py-2.5 text-[0.875rem] leading-[1.55] text-[rgb(var(--c-text))]">
                {project.outcome}
              </p>
            ) : null}
          </div>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center whitespace-nowrap rounded-md border border-[rgb(var(--c-accent)/0.22)] bg-[rgb(var(--c-accent)/0.07)] px-2 py-1 font-mono text-[0.6875rem] leading-none text-[rgb(var(--c-accent)/0.95)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Visual column */}
        <div className="order-1 flex flex-col gap-5 border-b border-line bg-[rgb(var(--c-right))] p-6 sm:p-7 lg:order-2 lg:border-b-0 lg:border-l lg:p-8">
          {/* Centred in whatever height is left over, so a short card and a tall
              card both look composed rather than top-heavy. */}
          <div className="flex flex-1 items-center">
            {/* Real artwork wins over the generated diagram — a photograph of
                the thing running beats an illustration of how it works.
                No max-height: capping it would break the aspect ratio and the
                SVG would letterbox itself inside a too-wide box. */}
            {project.image ? (
              <ProjectPoster
                src={project.image.src}
                alt={project.image.alt}
                videoHref={project.image.videoHref}
                className="aspect-[400/240] w-full"
              />
            ) : (
              <ProjectVisual variant={project.visual} className="aspect-[400/240] w-full" />
            )}
          </div>

          {project.metrics ? (
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[rgb(var(--c-accent)/0.18)] bg-[rgb(var(--c-accent)/0.18)]">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="bg-[rgb(var(--c-right))] px-3 py-3 text-center">
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="block font-cardTitle text-[1.0625rem] font-semibold leading-none text-card">
                      {metric.value}
                    </span>
                    <span className="mt-1.5 block font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[rgb(var(--c-muted)/0.7)]">
                      {metric.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {/* Links live here, at the visual end of the card, so the call to
              action is never below the fold of a long text column. */}
          <div className="flex flex-col gap-2">
            <a
              href={primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-card px-6 text-[0.875rem] font-semibold text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              <PrimaryIcon aria-hidden className="h-4 w-4" />
              {primaryLink.label}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </a>

            {project.links.slice(1).map((link) => {
              const Icon = linkIcons[link.kind];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[rgb(var(--c-accent)/0.35)] px-6 text-[0.875rem] text-[rgb(var(--c-accent))] transition-colors duration-300 hover:bg-[rgb(var(--c-accent)/0.1)]"
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  {link.label}
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              );
            })}

            <p className="text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[rgb(var(--c-muted)/0.7)]">
              {project.areas.join(" · ")} — {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(projects.length - 1, target));
    // Scroll by whole slide widths — every card is exactly the track's width.
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }, []);

  // The scroll position is the source of truth, so a swipe and an arrow press
  // both end up updating the same state.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIndex(Math.round(track.scrollLeft / track.clientWidth));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const atStart = index === 0;
  const atEnd = index === projects.length - 1;

  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            index="01"
            eyebrow="Selected work"
            tone="amber"
            title="Six things I built, and what each one had to solve."
            highlight="what each one had to solve."
            intro="Every project here is live, published, or open source — the link on each card goes straight to it."
            className="max-w-2xl"
          />

          {/* Duplicate controls at the top: reachable without hunting, and the
              first thing a keyboard user tabs into. */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.6875rem] tabular-nums text-dim" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={atStart}
                aria-label="Previous project"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-elevated/60 text-muted transition-colors hover:border-lineStrong hover:text-fg disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowLeft aria-hidden className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={atEnd}
                aria-label="Next project"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-elevated/60 text-muted transition-colors hover:border-lineStrong hover:text-fg disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative mt-12 sm:mt-14"
          role="region"
          aria-roledescription="carousel"
          aria-label="Project case studies"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(index + 1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(index - 1);
            }
          }}
        >
          {/* Deliberately no data-lenis-prevent here: it would hand this whole
              area back to native scrolling, so vertical scrolling would jolt
              every time the pointer crossed the card. Touch swipe still works
              (Lenis leaves touch alone) and the arrows cover the desktop case. */}
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          >
            {projects.map((project, cardIndex) => (
              <ProjectCard key={project.slug} project={project} index={cardIndex} total={projects.length} />
            ))}
          </div>

          {/* Side arrows, floating clear of the card on wide screens. */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={atStart}
            aria-hidden
            tabIndex={-1}
            aria-label="Previous project"
            className={cn(
              "absolute -left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/85 text-muted backdrop-blur-md transition-all duration-300 hover:border-lineStrong hover:text-fg xl:flex",
              atStart && "pointer-events-none opacity-0",
            )}
          >
            <ArrowLeft aria-hidden className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={atEnd}
            aria-hidden
            tabIndex={-1}
            aria-label="Next project"
            className={cn(
              "absolute -right-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/85 text-muted backdrop-blur-md transition-all duration-300 hover:border-lineStrong hover:text-fg xl:flex",
              atEnd && "pointer-events-none opacity-0",
            )}
          >
            <ArrowRight aria-hidden className="h-5 w-5" />
          </button>
        </div>

        {/* Jump straight to a project, and a visual index of how many there are. */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {projects.map((project, dotIndex) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Go to ${project.title}`}
              aria-current={dotIndex === index}
              style={themeVars(project)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                dotIndex === index ? "w-10 bg-card" : "w-5 bg-line hover:bg-lineStrong",
              )}
            />
          ))}
          <span className="ml-3 hidden font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim sm:inline">
            Swipe on touch, or use the arrows
          </span>
        </div>
      </Container>
    </section>
  );
}
