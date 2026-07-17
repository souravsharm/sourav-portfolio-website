"use client";

import { ExternalLink, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { projects, type Project } from "@/content/projects";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group/card relative mr-6 flex w-[86vw] shrink-0 flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-panel/86 p-6 shadow-line transition-colors hover:border-accent/60 sm:w-[380px] lg:w-[400px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover/card:bg-accent/15"
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-background/60">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 640px) 86vw, 400px"
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_center,rgb(var(--accent)/0.12),transparent_70%)] text-muted">
            <ImageIcon aria-hidden className="h-6 w-6" />
            <span className="text-xs font-medium">Project image</span>
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold leading-tight text-foreground">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
      </div>

      <div className="grid gap-2 text-sm text-muted">
        <p className="font-semibold text-foreground">Technical approach</p>
        <ul className="grid gap-2">
          {project.approach.slice(0, 2).map((item) => (
            <li key={item} className="border-l border-accent/60 pl-3 leading-6">
              {item}
            </li>
          ))}
        </ul>
        {project.outcome ? (
          <p className="mt-1">
            <span className="font-semibold text-foreground">Outcome: </span>
            {project.outcome}
          </p>
        ) : null}
      </div>

      <div className="mt-auto">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((tech) => (
            <span key={tech} className="rounded-full bg-accentSoft px-2.5 py-1 text-xs font-medium text-foreground">
              {tech}
            </span>
          ))}
        </div>
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
          >
            {link.label}
            <ExternalLink
              aria-hidden
              className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100"
            />
          </a>
        ))}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const reduceMotion = useSafeReducedMotion();
  // Duplicate the list so the translateX(-50%) loop is seamless. Each card owns
  // its trailing margin (mr-6), so the two copies are exactly equal width.
  const looped = [...projects, ...projects];

  return (
    <section id="projects" className="scroll-mt-24 overflow-hidden bg-panel/30 py-20 sm:py-28">
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <Badge>Featured Work</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Projects with technical depth and real implementation detail.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            Selected work spanning real-time interfaces, explainable AI, API integration, robotics, and IoT automation.
          </p>
        </Reveal>
      </Container>

      {reduceMotion ? (
        <Container>
          <div className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      ) : (
        <div
          className="group relative flex overflow-hidden py-4 [--marquee-duration:48s] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        >
          <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
            {looped.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} />
            ))}
          </div>
        </div>
      )}

      <Container>
        <p className="mt-4 text-xs text-muted">Hover to pause · projects loop automatically</p>
      </Container>
    </section>
  );
}
