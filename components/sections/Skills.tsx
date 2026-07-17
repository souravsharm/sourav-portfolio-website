import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { skills } from "@/content/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Skills"
      title="A broad stack for practical product, data, cloud, and automation work."
      className="bg-panel/30"
    >
      <RevealGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((group) => (
          <RevealItem key={group.title}>
            <Card className="h-full">
              <h3 className="text-lg font-bold text-foreground">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-border bg-background/72 px-2.5 py-1 text-xs font-medium text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
