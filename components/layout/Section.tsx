import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  intro?: string;
  className?: string;
};

export function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <Badge>{eyebrow}</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
          {intro ? <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{intro}</p> : null}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}

