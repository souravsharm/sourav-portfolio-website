export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  /** One line on what the job actually was. */
  scope: string;
  achievements: string[];
  tech: string[];
  /** Optional link to the work itself. */
  link?: { label: string; href: string };
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern — Middleware API Developer",
    company: "MA Services Group",
    location: "Melbourne, VIC",
    period: "Jul 2025 — Sep 2025",
    scope: "Built the API that replaced a manual security-provisioning process.",
    achievements: [
      "Designed and built a Node.js and Express REST API that integrates with Gallagher, a third-party enterprise security platform, so building access can be managed programmatically instead of by hand.",
      "Structured it with adapter and service-layer patterns, which means another vendor can be added later without changing the core logic.",
      "Tracked down and fixed integration bugs across authentication, caching, and data validation, then added schema validation so the same class of defect could not come back.",
      "Wrote the endpoint documentation and implementation notes the team needed to pick the project up after I left.",
    ],
    tech: ["Node.js", "Express", "REST APIs", "JWT", "Zod", "Docker", "Postman", "Git"],
    link: { label: "See the project", href: "#work" },
  },
  {
    role: "WordPress Developer & SEO Intern",
    company: "Willify Pty Ltd",
    location: "Bayswater, Melbourne",
    period: "Dec 2023 — Mar 2024",
    scope: "Kept a live business website fast, findable, and maintainable.",
    achievements: [
      "Maintained and extended a production business site, building custom modules and plugins and fixing front-end and CMS bugs as they came in.",
      "Migrated legacy page templates to structured layouts, improving Core Web Vitals by 20% and lifting search visibility.",
      "Integrated Advanced Custom Fields and Yoast SEO, and implemented Schema.org structured data to improve how the site was indexed.",
      "Helped the site reach first-page rankings for more than five target keywords.",
    ],
    tech: ["WordPress", "PHP", "JavaScript", "HTML", "CSS", "ACF", "Yoast SEO", "Google Analytics", "Semrush"],
  },
  {
    role: "Front-end Developer Intern",
    company: "Deakin Launchpad",
    location: "Burwood, Melbourne",
    period: "Nov 2022 — Mar 2023",
    scope: "Built cross-platform UI against live financial data.",
    achievements: [
      "Built and debugged cross-platform interfaces in Flutter and Dart, applying OOP structure across shared components.",
      "Integrated more than ten REST APIs to fetch and render near real-time financial data.",
      "Worked with the backend team on API contracts, and with designers in Figma to deliver UI that matched the product spec.",
      "Worked in Agile sprints with code review and Git-based version control.",
    ],
    tech: ["Flutter", "Dart", "REST APIs", "Firebase", "Git", "GitHub", "Figma", "Agile"],
  },
];
