export type SkillGroup = {
  title: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    items: ["JavaScript ES6+", "TypeScript basics", "Python", "Java", "C/C++", "HTML5", "CSS3", "Dart", "Verilog"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Responsive UI", "Cross-browser compatibility", "Accessibility", "WCAG 2.1", "Performance optimization"],
  },
  {
    title: "Backend and APIs",
    items: ["Node.js", "REST APIs", "API integration", "WebSockets", "Firebase exposure"],
  },
  {
    title: "Cloud and DevOps",
    items: ["AWS EC2", "S3", "RDS", "Lambda", "VPC", "IAM", "CloudFormation", "CI/CD concepts", "Monitoring basics"],
  },
  {
    title: "CMS and SEO",
    items: ["WordPress", "PHP", "Advanced Custom Fields", "Yoast SEO", "Schema.org", "Search Console", "Google Analytics", "Semrush"],
  },
  {
    title: "Data and ML",
    items: ["Pandas", "NumPy", "scikit-learn", "SMOTE", "SHAP", "LIME", "Data preprocessing", "Model explainability"],
  },
  {
    title: "Tools and Workflow",
    items: ["Git", "GitHub", "Postman", "Figma", "Jira", "Trello", "MS Teams", "Slack", "Agile/Scrum"],
  },
];

