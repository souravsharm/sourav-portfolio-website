export const education = {
  degree: "Bachelor of Software Engineering (Honours)",
  institution: "Deakin University",
  location: "Burwood, Melbourne",
  year: "2024",
  wam: "72.4",
  specialization: "Internet of Things, Robotics, and Cyber-Physical Systems",
  note: "Four-year accredited engineering degree. My Honours research became a peer-reviewed publication.",
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  primary?: boolean;
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    year: "2024",
    primary: true,
  },
  {
    name: "AWS Academy Graduate — Cloud Architecting",
    issuer: "AWS Academy",
    year: "2023",
  },
  {
    name: "React Essential Training",
    issuer: "LinkedIn Learning",
    year: "2025",
  },
  {
    name: "Batch Script Programming",
    issuer: "Udemy",
    year: "2024",
  },
];

export const publication = {
  title: "Chronic kidney disease prognosis using explainable machine learning",
  venue: "Computer Methods and Programs in Biomedicine Update (Elsevier)",
  year: "2024",
  doi: "10.1016/j.cmpbup.2024.100160",
  href: "https://doi.org/10.1016/j.cmpbup.2024.100160",
};
