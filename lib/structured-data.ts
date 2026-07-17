import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: site.email,
    url: absoluteUrl("/"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "Victoria",
      addressCountry: "Australia",
    },
    sameAs: [site.linkedin, site.github],
    knowsAbout: [
      "React",
      "Next.js",
      "Python",
      "Java",
      "Artificial intelligence",
      "Internet of Things",
      "Robotics",
      "AWS",
      "WordPress SEO",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} Portfolio`,
    url: absoluteUrl("/"),
    description: site.seo.description,
  };
}
