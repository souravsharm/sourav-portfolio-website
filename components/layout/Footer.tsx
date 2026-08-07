import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-[0.8125rem] text-dim">
            Built with Next.js, TypeScript, Tailwind, GSAP, and three.js. Source on{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-[0.8125rem] text-muted transition-colors hover:border-lineStrong hover:text-fg sm:self-auto"
        >
          Back to top
          <ArrowUp aria-hidden className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </Container>
    </footer>
  );
}
