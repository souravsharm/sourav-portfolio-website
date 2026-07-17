import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

const footerLinks = [
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
  { label: "GitHub", href: site.github, icon: Github },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container>
        <Reveal y={12} className="flex flex-col gap-5 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 {site.name}. Built with Next.js, TypeScript, and Tailwind CSS.</p>
          <div className="flex flex-wrap items-center gap-2">
            {footerLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-panel transition hover:border-accent/70 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label={label}
              >
                <Icon aria-hidden className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}

