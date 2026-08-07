import { education } from "@/content/education";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { allSkills } from "@/content/skills";
import { absoluteUrl } from "@/lib/seo";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: site.email,
    url: absoluteUrl("/"),
    image: absoluteUrl(site.heroImage),
    description: site.seo.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "Victoria",
      addressCountry: "AU",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.institution,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "AWS Certified Solutions Architect – Associate",
      recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
    },
    sameAs: [site.linkedin, site.github],
    // Derived from the skills content so the markup cannot drift from the page.
    knowsAbout: [...new Set(allSkills.map((skill) => skill.name))],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — Portfolio`,
    url: absoluteUrl("/"),
    description: site.seo.description,
    author: { "@type": "Person", name: site.name },
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      url: project.links[0]?.href,
    })),
  };
}
