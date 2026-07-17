import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Practical engineering across software, hardware-connected systems, and automation."
      intro={site.positioning}
    >
      <RevealGroup className="mb-10 grid gap-4 sm:grid-cols-3">
        {site.stats.map((stat) => (
          <RevealItem key={stat.label}>
            <Card className="h-full">
              <p className="text-4xl font-bold text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{stat.label}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="space-y-5 text-base leading-8 text-muted">
          {site.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="grid content-start gap-4">
            <h3 className="text-xl font-bold text-foreground">Current focus</h3>
            <div className="grid gap-3 text-sm text-muted">
              <p>Full-stack development, frontend engineering, practical AI tools, internal tools, MVP development, and automation systems.</p>
              <p>Strong interest in useful software that is understandable, maintainable, and tied to real outcomes.</p>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
