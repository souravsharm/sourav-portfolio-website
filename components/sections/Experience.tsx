import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Internship experience across product UI, WordPress, SEO, and API-driven work."
    >
      <RevealGroup className="grid gap-5">
        {experience.map((item) => (
          <RevealItem key={`${item.role}-${item.company}`}>
            <Card className="grid gap-5 lg:grid-cols-[0.34fr_1fr]">
              <div>
                <p className="text-sm font-semibold text-accent">{item.period}</p>
                <h3 className="mt-2 text-xl font-bold text-foreground">{item.role}</h3>
                <p className="mt-2 text-sm text-muted">
                  {item.company} / {item.location}
                </p>
              </div>
              <div>
                <ul className="grid gap-3 text-sm leading-6 text-muted">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="border-l border-border pl-4">
                      {achievement}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span key={tech} className="rounded-full bg-accentSoft px-2.5 py-1 text-xs font-medium text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
