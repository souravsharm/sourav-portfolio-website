import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Each section gets its own hue so the page reads as chapters, not one block. */
export const sectionTones = {
  azure: "text-accent",
  mint: "text-mint",
  violet: "text-violet",
  amber: "text-amber",
  rose: "text-rose",
} as const;

export type SectionTone = keyof typeof sectionTones;

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  /** Words in the title to paint with the accent gradient. */
  highlight?: string;
  intro?: string;
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
  /** Skip the Container wrapper for sections that bleed to the viewport edge. */
  bleed?: boolean;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  highlight,
  intro,
  tone = "azure",
  // Default rather than a base class, so a caller passing its own max-width
  // replaces this one instead of colliding with it.
  className = "max-w-3xl",
}: Omit<SectionProps, "id" | "children" | "bleed"> & { className?: string }) {
  return (
    <header className={className}>
      <Reveal className="flex items-center gap-4" y={12}>
        <span className={cn("eyebrow tabular-nums", sectionTones[tone])}>{index}</span>
        <span className="h-px w-8 bg-lineStrong" aria-hidden />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        highlight={highlight}
        highlightClass={sectionTones[tone]}
        className="mt-5 font-display text-display-md font-semibold text-fg"
      />

      {intro ? (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-measure text-lead text-muted">{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  highlight,
  intro,
  children,
  className,
  bleed = false,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-20 sm:py-24 lg:py-28", className)}>
      <Container>
        <SectionHeader
          index={index}
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          intro={intro}
          className="max-w-3xl mb-14 sm:mb-20"
        />
      </Container>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
