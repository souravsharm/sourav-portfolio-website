export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "WordPress Developer and SEO Intern",
    company: "Willify Pty Ltd",
    location: "Bayswater, Melbourne",
    period: "Dec 2023 - Mar 2024",
    achievements: [
      "Developed and maintained a large-scale WordPress website, implementing custom themes and plugins to improve user experience and maintainability.",
      "Integrated Advanced Custom Fields and Yoast SEO to improve search visibility.",
      "Helped achieve first-page rankings for 5+ keywords.",
      "Improved site performance by 20% through Core Web Vitals and analytics-driven optimizations.",
      "Implemented structured data using Schema.org to improve indexing and content discoverability.",
    ],
    tech: ["WordPress", "PHP", "JavaScript", "HTML", "CSS", "ACF", "Yoast SEO", "Google Analytics", "Search Console", "Semrush"],
  },
  {
    role: "Front-end Developer Intern",
    company: "Deakin Launchpad",
    location: "Burwood, Melbourne",
    period: "Nov 2022 - Mar 2023",
    achievements: [
      "Built responsive cross-platform interfaces using Flutter.",
      "Integrated 10+ REST APIs to fetch and render near real-time financial data.",
      "Collaborated with backend teams on API contracts.",
      "Participated in Agile sprints, code reviews, and version control workflows using Git and GitHub.",
      "Collaborated with designers through Figma to deliver UI/UX aligned with product requirements.",
    ],
    tech: ["Flutter", "Dart", "REST APIs", "Git", "GitHub", "Firebase", "Figma"],
  },
];

