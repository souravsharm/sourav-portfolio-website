import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Freelance Focus"
      title="Useful builds for startups, small businesses, and teams."
      intro="I can help shape practical software systems where clear requirements, clean interfaces, and reliable integrations matter."
      className="bg-panel/30"
    >
      <RevealGroup className="grid gap-3 md:grid-cols-2">
        {site.services.map((service) => (
          <RevealItem
            key={service}
            className="flex gap-3 rounded-2xl border border-border bg-background/72 p-4 text-sm leading-6 text-muted transition-colors hover:border-accent/50"
          >
            <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />
            <span>{service}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
