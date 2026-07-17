import { Github, Linkedin, Mail } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let us build something practical."
      intro="I am open to software engineering, frontend, full-stack, AI-tooling, automation, and freelance MVP opportunities."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <Reveal className="rounded-2xl border border-border bg-panel/86 p-6">
          <h3 className="text-xl font-bold text-foreground">Reach out directly</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            If my work looks relevant to your team or project, feel free to reach out by email or connect through LinkedIn/GitHub.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={`mailto:${site.email}`} variant="primary" icon={<Mail aria-hidden className="h-4 w-4" />}>
              Email Me
            </Button>
            <CopyEmailButton />
            <Button href={site.linkedin} external icon={<Linkedin aria-hidden className="h-4 w-4" />}>
              LinkedIn
            </Button>
            <Button href={site.github} external icon={<Github aria-hidden className="h-4 w-4" />}>
              GitHub
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="rounded-2xl border border-border bg-background/72 p-6">
          <h3 className="text-xl font-bold text-foreground">Contact details</h3>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="selectable mt-1 font-medium text-foreground">{site.email}</dd>
            </div>
            <div>
              <dt className="text-muted">Location</dt>
              <dd className="mt-1 font-medium text-foreground">{site.location}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
