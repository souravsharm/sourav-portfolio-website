import {
  Accessibility,
  BookMarked,
  Blocks,
  Cloud,
  CloudCog,
  Database,
  Gauge,
  Layers,
  Lightbulb,
  MessagesSquare,
  MonitorSmartphone,
  Plug,
  Repeat,
  Scale,
  ScrollText,
  Search,
  ShieldCheck,
  Table2,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  siCplusplus,
  siDart,
  siDocker,
  siExpress,
  siFirebase,
  siFlutter,
  siGit,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siKeras,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPandas,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siScikitlearn,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVercel,
  siZod,
  siFigma,
} from "simple-icons";
import { cn } from "@/lib/utils";

type Brand = { path: string; hex: string };

/**
 * Several brand marks are pure black (Next.js, Express, Vercel, JWT) or a very
 * dark navy (pandas), which would vanish against this canvas. Anything below
 * the luminance floor gets swapped for a neutral light grey instead.
 */
const LUMINANCE_FLOOR = 0.16;
const DARK_FALLBACK = "D6DCE6";

function readableHex(hex: string) {
  const value = parseInt(hex, 16);
  const r = ((value >> 16) & 255) / 255;
  const g = ((value >> 8) & 255) / 255;
  const b = (value & 255) / 255;
  // Perceptual weighting — green reads far brighter than blue at equal value.
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < LUMINANCE_FLOOR ? DARK_FALLBACK : hex;
}

const brandIcons: Record<string, Brand> = {
  javascript: siJavascript,
  typescript: siTypescript,
  python: siPython,
  java: siOpenjdk,
  cpp: siCplusplus,
  php: siPhp,
  dart: siDart,
  node: siNodedotjs,
  express: siExpress,
  jwt: siJsonwebtokens,
  zod: siZod,
  websockets: siSocketdotio,
  react: siReact,
  nextjs: siNextdotjs,
  html: siHtml5,
  tailwind: siTailwindcss,
  flutter: siFlutter,
  postgres: siPostgresql,
  mongodb: siMongodb,
  firebase: siFirebase,
  docker: siDocker,
  vercel: siVercel,
  pandas: siPandas,
  sklearn: siScikitlearn,
  keras: siKeras,
  git: siGit,
  postman: siPostman,
  figma: siFigma,
};

/** Concepts and practices have no brand mark, so they get a meaningful glyph. */
const conceptIcons: Record<string, LucideIcon> = {
  sql: Database,
  rest: Waypoints,
  integration: Plug,
  tls: ShieldCheck,
  patterns: Blocks,
  responsive: MonitorSmartphone,
  a11y: Accessibility,
  vitals: Gauge,
  schema: Table2,
  aws: Cloud,
  awslambda: CloudCog,
  logging: ScrollText,
  cicd: Workflow,
  explain: Lightbulb,
  balance: Scale,
  agile: Repeat,
  review: MessagesSquare,
  docs: BookMarked,
  seo: Search,
};

/**
 * Brand icons render in their own colour so the list is scannable at a glance;
 * concept glyphs stay neutral. Unmatched skills are desaturated by the caller
 * rather than here, so the transition can be a single CSS filter.
 */
export function SkillIcon({ icon, className }: { icon: string; className?: string }) {
  const brand = brandIcons[icon];

  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn("h-[1.15rem] w-[1.15rem] shrink-0", className)}
        fill={`#${readableHex(brand.hex)}`}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Concept = conceptIcons[icon] ?? Layers;
  return <Concept aria-hidden className={cn("h-[1.15rem] w-[1.15rem] shrink-0 text-muted", className)} />;
}
