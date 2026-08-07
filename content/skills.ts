/**
 * Skills, tagged by the role they matter for.
 *
 * Two tiers on purpose. `skills` is the short, confident list — thirty things
 * worth putting a name to, six groups of five, which lays out as a clean grid
 * and can be read in about fifteen seconds. `alsoUsed` catches everything else
 * as a single row of chips, so nothing is lost but nothing pads the page either.
 *
 * Levels are deliberately coarse and honest:
 *   3 — Core: used daily, in production or published work
 *   2 — Strong: shipped real features with it
 *   1 — Familiar: built with it, would want a ramp-up week
 *
 * `evidence` is only surfaced for level 3 — those are the claims that need
 * backing. Listing a source for all thirty is what turned this into a wall.
 */
export type RoleId = "fullstack" | "backend" | "frontend" | "cloud" | "data";

export type Role = {
  id: RoleId;
  label: string;
  short: string;
  blurb: string;
};

export const roles: Role[] = [
  {
    id: "fullstack",
    label: "Full-stack",
    short: "Full-stack",
    blurb: "Owning a feature from the database through the API to the screen.",
  },
  {
    id: "backend",
    label: "Backend / API",
    short: "Backend",
    blurb: "Services, integrations, auth, and the data model underneath them.",
  },
  {
    id: "frontend",
    label: "Frontend",
    short: "Frontend",
    blurb: "Accessible, fast interfaces in React and Next.js.",
  },
  {
    id: "cloud",
    label: "Cloud / DevOps",
    short: "Cloud",
    blurb: "Deploying and running it on AWS, containerised and observable.",
  },
  {
    id: "data",
    label: "Data / AI",
    short: "Data & AI",
    blurb: "Pipelines, models, and making the output explainable.",
  },
];

export type Skill = {
  /** Key into the icon map in components/ui/SkillIcon.tsx. */
  icon: string;
  name: string;
  level: 1 | 2 | 3;
  roles: RoleId[];
  /** Shown only for level 3 — proof for the claims that carry weight. */
  evidence?: string;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { icon: "javascript", name: "JavaScript", level: 3, roles: ["fullstack", "backend", "frontend"], evidence: "Every project since 2022" },
      { icon: "typescript", name: "TypeScript", level: 2, roles: ["fullstack", "backend", "frontend"] },
      { icon: "python", name: "Python", level: 3, roles: ["data", "backend"], evidence: "Published research, robotics, IoT" },
      { icon: "sql", name: "SQL", level: 3, roles: ["fullstack", "backend", "data"], evidence: "Willify and Travel Tracker schemas" },
      { icon: "java", name: "Java", level: 2, roles: ["backend"] },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { icon: "node", name: "Node.js", level: 3, roles: ["fullstack", "backend"], evidence: "Secure Connect, Willify, Travel Tracker" },
      { icon: "express", name: "Express", level: 3, roles: ["fullstack", "backend"], evidence: "The middleware API at MA Services Group" },
      { icon: "rest", name: "REST API design", level: 3, roles: ["fullstack", "backend"], evidence: "Versioned /api/v1, documented for handover" },
      { icon: "jwt", name: "Auth & JWT", level: 2, roles: ["backend"] },
      { icon: "integration", name: "Third-party integration", level: 3, roles: ["backend"], evidence: "Gallagher, IFTTT, 10+ REST APIs" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { icon: "react", name: "React", level: 3, roles: ["fullstack", "frontend"], evidence: "Willify and the Secure Connect console" },
      { icon: "nextjs", name: "Next.js", level: 2, roles: ["fullstack", "frontend"] },
      { icon: "html", name: "HTML & CSS", level: 3, roles: ["frontend"], evidence: "Every interface I have shipped" },
      { icon: "tailwind", name: "Tailwind CSS", level: 2, roles: ["frontend", "fullstack"] },
      { icon: "a11y", name: "Accessibility", level: 2, roles: ["frontend"] },
    ],
  },
  {
    title: "Data & databases",
    skills: [
      { icon: "postgres", name: "PostgreSQL", level: 2, roles: ["fullstack", "backend", "data"] },
      { icon: "schema", name: "Data modelling", level: 2, roles: ["fullstack", "backend", "data"] },
      { icon: "pandas", name: "pandas & NumPy", level: 2, roles: ["data"] },
      { icon: "sklearn", name: "scikit-learn", level: 2, roles: ["data"] },
      { icon: "explain", name: "Model explainability", level: 2, roles: ["data"] },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { icon: "aws", name: "AWS", level: 2, roles: ["cloud", "backend"] },
      { icon: "docker", name: "Docker", level: 2, roles: ["cloud", "backend"] },
      { icon: "vercel", name: "Vercel & Render", level: 2, roles: ["cloud", "fullstack"] },
      { icon: "logging", name: "Structured logging", level: 2, roles: ["cloud", "backend"] },
      { icon: "cicd", name: "CI/CD", level: 1, roles: ["cloud"] },
    ],
  },
  {
    title: "Ways of working",
    skills: [
      { icon: "git", name: "Git & GitHub", level: 3, roles: ["fullstack", "backend", "frontend", "cloud", "data"], evidence: "Every role and every project" },
      { icon: "agile", name: "Agile & code review", level: 2, roles: ["fullstack", "backend", "frontend"] },
      { icon: "docs", name: "API documentation", level: 2, roles: ["backend", "fullstack"] },
      { icon: "postman", name: "Postman", level: 2, roles: ["backend"] },
      { icon: "figma", name: "Figma", level: 2, roles: ["frontend"] },
    ],
  },
];

/** The long tail — real experience, but not what I would lead with. */
export const alsoUsed: Skill[] = [
  { icon: "php", name: "PHP & WordPress", level: 2, roles: ["backend", "fullstack"] },
  { icon: "vitals", name: "Core Web Vitals", level: 2, roles: ["frontend"] },
  { icon: "seo", name: "SEO & structured data", level: 2, roles: ["frontend"] },
  { icon: "websockets", name: "WebSockets", level: 2, roles: ["backend", "frontend"] },
  { icon: "zod", name: "Zod", level: 2, roles: ["backend", "fullstack"] },
  { icon: "tls", name: "Mutual TLS", level: 2, roles: ["backend", "cloud"] },
  { icon: "patterns", name: "Adapter & service patterns", level: 2, roles: ["backend", "fullstack"] },
  { icon: "responsive", name: "Responsive & cross-browser", level: 3, roles: ["frontend"] },
  { icon: "mongodb", name: "MongoDB", level: 1, roles: ["backend"] },
  { icon: "firebase", name: "Firebase", level: 1, roles: ["frontend", "backend"] },
  { icon: "keras", name: "Keras", level: 1, roles: ["data"] },
  { icon: "balance", name: "SMOTE", level: 2, roles: ["data"] },
  { icon: "flutter", name: "Flutter", level: 1, roles: ["frontend"] },
  { icon: "dart", name: "Dart", level: 1, roles: ["frontend"] },
  { icon: "cpp", name: "C / C++", level: 1, roles: ["backend"] },
];

/** Everything, flat — feeds the 3D cloud and the match counter. */
export const allSkills: Skill[] = [...skills.flatMap((group) => group.skills), ...alsoUsed];

export const levelLabels: Record<1 | 2 | 3, string> = {
  3: "Core",
  2: "Strong",
  1: "Familiar",
};

/** Spelled out under the list, so the three dots need no guessing. */
export const levelLegend: Array<{ level: 1 | 2 | 3; label: string; meaning: string }> = [
  { level: 3, label: "Core", meaning: "Daily, in production" },
  { level: 2, label: "Strong", meaning: "Shipped real features" },
  { level: 1, label: "Familiar", meaning: "Built with it" },
];

/**
 * Average depth across a group's matched skills, 0–1. Used for the strength
 * bars: unlike a coverage percentage this stays meaningful with no filter
 * applied, because it measures how deep the group runs rather than how much
 * of it survived the filter.
 */
export function groupStrength(group: SkillGroup, role: RoleId | null) {
  const matched = role === null ? group.skills : group.skills.filter((skill) => skill.roles.includes(role));
  if (matched.length === 0) return { share: 0, matched: 0 };
  const total = matched.reduce((sum, skill) => sum + skill.level, 0);
  return { share: total / (matched.length * 3), matched: matched.length };
}
