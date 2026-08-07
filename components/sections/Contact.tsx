import { ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { site } from "@/content/site";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
  { label: "LinkedIn", value: "sourav-sharma", href: site.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", value: "souravsharm", href: site.github, icon: Github, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[26rem] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgb(var(--accent)/0.14),transparent_70%)]"
      />

      <Container>
        <div className="flex items-center gap-4">
          <span className="eyebrow text-accent">05</span>
          <span className="h-px w-8 bg-lineStrong" aria-hidden />
          <span className="eyebrow">Contact</span>
        </div>

        <TextReveal
          as="h2"
          text="If the fit looks right, let's talk."
          highlight="let's talk."
          className="mt-8 max-w-4xl font-display text-display-lg font-semibold text-fg"
        />

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-measure text-lead text-muted">
            The fastest way to reach me is email — I reply to every genuine message. Happy to walk through any of the
            projects above, share more code, or talk about what your team is building.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href={`mailto:${site.email}`}
              variant="primary"
              size="lg"
              icon={<ArrowUpRight aria-hidden className="h-4 w-4" />}
            >
              {site.email}
            </Button>
            <CopyEmailButton className="min-h-[3.25rem] px-7" />
            <Button href={site.resumePath} newTab size="lg" icon={<ArrowUpRight aria-hidden className="h-4 w-4" />}>
              <FileText aria-hidden className="mr-1 inline h-4 w-4 align-[-3px]" />
              Open résumé
            </Button>
          </div>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {channels.map((channel) => (
            <RevealItem key={channel.label}>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col justify-between gap-8 bg-surface/70 p-6 transition-colors duration-300 hover:bg-elevated"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg/50 text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent">
                  <channel.icon aria-hidden className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim">
                    {channel.label}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 break-all text-[0.875rem] text-fg">
                    {channel.value}
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 shrink-0 text-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
            <MapPin aria-hidden className="h-3.5 w-3.5" />
            {site.location}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
