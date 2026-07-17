import { Award, GraduationCap } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { certifications, education } from "@/content/education";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education and Certifications"
      title="Software engineering foundation with AWS and frontend learning."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Card className="h-full">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-accentSoft text-accent">
                <GraduationCap aria-hidden className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-foreground">{education.degree}</h3>
                <p className="mt-2 text-sm text-muted">
                  {education.institution} / {education.location}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {education.year} / WAM: {education.wam} / Specialization: {education.specialization}
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="h-full">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-accentSoft text-warning">
                <Award aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-bold text-foreground">Certifications</h3>
            </div>
            <ul className="grid gap-3 text-sm leading-6 text-muted">
              {certifications.map((certification) => (
                <li key={certification} className="border-l border-border pl-4">
                  {certification}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
