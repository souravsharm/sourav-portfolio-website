"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Scene3D } from "@/components/three/Scene3D";
import { SkillIcon } from "@/components/ui/SkillIcon";
import {
  allSkills,
  alsoUsed,
  groupStrength,
  levelLabels,
  levelLegend,
  roles,
  skills,
  type RoleId,
} from "@/content/skills";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/lib/useScrollProgress";

const SkillCloud = dynamic(() => import("@/components/three/SkillCloud"), { ssr: false });

/** Three dots, filled to the skill's level. The legend below names each step. */
function LevelDots({ level, matched = true }: { level: number; matched?: boolean }) {
  return (
    <span className="flex shrink-0 items-center gap-[3px]" aria-hidden>
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors duration-500",
            dot <= level ? (matched ? "bg-accent" : "bg-lineStrong") : "bg-line",
          )}
        />
      ))}
    </span>
  );
}

/** Static stand-in for the cloud: the same words, laid out flat. */
function CloudFallback({ activeRole }: { activeRole: RoleId | null }) {
  return (
    <div className="flex h-full w-full flex-wrap content-center items-center justify-center gap-x-3 gap-y-2 p-6">
      {allSkills.slice(0, 30).map((skill) => {
        const matched = activeRole === null || skill.roles.includes(activeRole);
        return (
          <span
            key={skill.name}
            className={cn(
              "font-display transition-all duration-500",
              skill.level === 3 ? "text-lg font-bold" : skill.level === 2 ? "text-base font-semibold" : "text-sm",
              matched ? "text-accent/90" : "text-line",
            )}
          >
            {skill.name}
          </span>
        );
      })}
    </div>
  );
}

export function Skills() {
  const [activeRole, setActiveRole] = useState<RoleId | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef, { start: "top bottom", end: "bottom top" });

  const matchCount = useMemo(
    () => (activeRole === null ? allSkills.length : allSkills.filter((s) => s.roles.includes(activeRole)).length),
    [activeRole],
  );
  const activeRoleMeta = roles.find((role) => role.id === activeRole) ?? null;

  const filters: Array<{ id: RoleId | null; label: string }> = [
    { id: null, label: "Everything" },
    ...roles.map((role) => ({ id: role.id as RoleId | null, label: role.label })),
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          index="02"
          eyebrow="Skills"
          tone="mint"
          title="Pick the role you are hiring for."
          highlight="hiring for."
          intro="The same skill set, filtered against the job in front of you."
          className="max-w-2xl mb-10 sm:mb-12"
        />

        <Reveal>
          <div role="group" aria-label="Filter skills by role" className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeRole === filter.id;
              return (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => setActiveRole(filter.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative rounded-full border px-4 py-2 text-[0.8125rem] transition-colors duration-300",
                    isActive ? "border-transparent text-bg" : "border-line text-muted hover:border-lineStrong hover:text-fg",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="role-pill"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <Reveal className="order-2 lg:order-1">
            <p className="font-display text-display-sm font-semibold text-fg">
              <span className="text-gradient tabular-nums">{matchCount}</span>
              <span className="text-muted">
                {activeRole === null ? " skills, six areas" : ` of ${allSkills.length} match`}
              </span>
            </p>
            <p className="mt-2 max-w-measure text-[0.9375rem] leading-relaxed text-muted">
              {activeRoleMeta ? activeRoleMeta.blurb : "Choose a role and everything that does not apply steps back."}
            </p>

            {/* Depth per area, not coverage: how deep the group runs, which
                stays meaningful even with no filter applied. */}
            <dl className="mt-7 grid gap-2.5">
              {skills.map((group) => {
                const { share, matched } = groupStrength(group, activeRole);
                return (
                  <div key={group.title} className="grid grid-cols-[8.5rem_1fr] items-center gap-3">
                    <dt
                      className={cn(
                        "truncate text-[0.8125rem] transition-colors duration-500",
                        matched > 0 ? "text-muted" : "text-dim/60",
                      )}
                    >
                      {group.title}
                    </dt>
                    <dd className="h-[3px] overflow-hidden rounded-full bg-line">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-accent to-mint"
                        initial={false}
                        animate={{ width: `${share * 100}%` }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <div className="order-1 h-[16rem] w-full sm:h-[19rem] lg:order-2 lg:h-[22rem]">
            <Scene3D fallback={<CloudFallback activeRole={activeRole} />}>
              <SkillCloud skills={allSkills} activeRole={activeRole} progress={progress} />
            </Scene3D>
          </div>
        </div>

        {/* Six groups of five — one clean grid, readable in about fifteen seconds. */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.title} className="bg-surface/70 p-6">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim">{group.title}</h3>

              <ul className="mt-4 grid gap-2.5">
                {group.skills.map((skill) => {
                  const matched = activeRole === null || skill.roles.includes(activeRole);
                  return (
                    <li
                      key={skill.name}
                      className={cn("transition-opacity duration-500", matched ? "opacity-100" : "opacity-25")}
                    >
                      <div className="flex items-center gap-2.5">
                        <SkillIcon
                          icon={skill.icon}
                          // Desaturating rather than hiding keeps the row's
                          // shape stable while the filter changes.
                          className={cn("transition-[filter] duration-500", !matched && "grayscale")}
                        />
                        <span
                          className={cn(
                            "truncate text-[0.9375rem] transition-colors duration-500",
                            matched ? "text-fg" : "text-muted",
                          )}
                        >
                          {skill.name}
                        </span>
                        <span className="ml-auto flex shrink-0 items-center gap-2">
                          <LevelDots level={skill.level} matched={matched} />
                          <span className="w-[3.5rem] text-right font-mono text-[0.625rem] uppercase tracking-[0.08em] text-dim">
                            {levelLabels[skill.level]}
                          </span>
                        </span>
                      </div>
                      {skill.evidence ? (
                        <p className="mt-0.5 pl-[1.9rem] text-[0.75rem] leading-snug text-dim">{skill.evidence}</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <dl className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {levelLegend.map((entry) => (
                <div key={entry.label} className="flex items-center gap-2">
                  <LevelDots level={entry.level} />
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">{entry.label}</dt>
                  <dd className="text-[0.75rem] text-dim">{entry.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The long tail, kept to one quiet row so nothing is hidden but
              nothing competes with the list above either. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-line pt-6">
            <span className="mr-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim">Also used</span>
            {alsoUsed.map((skill) => {
              const matched = activeRole === null || skill.roles.includes(activeRole);
              return (
                <span
                  key={skill.name}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-[0.75rem] transition-opacity duration-500",
                    matched ? "text-muted opacity-100" : "text-dim opacity-30",
                  )}
                >
                  <SkillIcon icon={skill.icon} className={cn("h-3.5 w-3.5", !matched && "grayscale")} />
                  {skill.name}
                </span>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
