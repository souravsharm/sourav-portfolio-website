export const site = {
  name: "Sourav Sharma",
  role: "Full-Stack Software Engineer",
  location: "Melbourne, Victoria, Australia",
  shortLocation: "Melbourne, VIC",
  email: "sharma-sourav@outlook.com",
  linkedin: "https://www.linkedin.com/in/sourav-sharma-5026631b0",
  github: "https://github.com/souravsharm",
  resumePath: "/Sourav-Sharma-Resume.pdf",
  heroImage: "/portfolio-hero.png",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sourav-portfolio-website-rzao.vercel.app",

  // Hero. Short sentences on purpose — a recruiter reads this in about four seconds.
  headline: {
    lead: "I build the whole thing —",
    emphasis: "interface, API, and database.",
  },
  availability: "Open to full-stack, backend, and frontend roles",
  intro:
    "Full-stack software engineer in Melbourne. Most recently I built a production middleware API that automates access control for an enterprise security platform. Before that I designed, built, and shipped a paying SaaS product on my own. Honours degree from Deakin, AWS Solutions Architect certified.",

  // Ticker under the hero — the stack a recruiter is usually scanning for.
  marquee: [
    "Node.js",
    "Express",
    "React",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "Python",
    "Docker",
    "REST APIs",
  ],

  /**
   * The "ten second version". This is the block designed to answer a recruiter's
   * screening questions before they have to scroll, so keep every line factual
   * and short enough to scan.
   */
  snapshot: [
    { label: "Looking for", value: "Full-stack, backend, or frontend engineer" },
    { label: "Based in", value: "Melbourne, Victoria" },
    { label: "Core stack", value: "TypeScript · Node.js · React · PostgreSQL · AWS" },
    { label: "Education", value: "B. Software Engineering (Honours), Deakin, 2024" },
    { label: "Certified", value: "AWS Solutions Architect – Associate" },
    { label: "Also published", value: "Peer-reviewed ML paper, Elsevier CMPBUP" },
  ],

  stats: [
    {
      value: 94,
      suffix: "%",
      label: "Accuracy",
      detail: "Reached on the published kidney-disease model, up from 86%",
    },
    {
      value: 20,
      suffix: "%",
      label: "Faster",
      detail: "Core Web Vitals uplift on a live business site",
    },
    {
      value: 10,
      suffix: "+",
      label: "APIs wired up",
      detail: "REST integrations shipped into real-time interfaces",
    },
    {
      value: 3,
      suffix: "",
      label: "Engineering roles",
      detail: "Internships across API, web, and mobile teams since 2022",
    },
  ],

  about: [
    "I am a software engineer based in Melbourne. I like the parts of the job most people skip: reading someone else's undocumented API, working out why the integration breaks at 2am, and leaving behind something the next person can actually maintain.",
    "My most recent work was a middleware API for MA Services Group that talks to Gallagher, an enterprise physical-security platform. Security staff used to add and remove building-access cardholders by hand in an admin console. I replaced that with a JWT-protected REST API — built on a service and adapter structure, so a second vendor can be plugged in without touching the cardholder logic.",
    "Alongside that I have shipped a SaaS product end to end including payments, published a machine-learning paper, flown a drone with hand gestures over ROS2, and made a WordPress site 20% faster. Different problems, same habit: understand it properly, then build the simple version that works.",
  ],

  lookingFor: {
    title: "What I am looking for",
    body: "A team where I can own features end to end — take a vague requirement, ask the right questions, and ship the API and the interface that go with it. I am most useful on product teams building web applications, internal tools, or integration-heavy backends.",
    points: [
      "Full-stack or backend engineering on a product team",
      "Codebases where API design and data modelling matter",
      "People who review code properly and write things down",
    ],
  },

  nav: [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  seo: {
    title: "Sourav Sharma | Full-Stack Software Engineer, Melbourne",
    description:
      "Melbourne-based full-stack software engineer. Node.js and Express APIs, React and Next.js interfaces, PostgreSQL, and AWS. Honours graduate and AWS Certified Solutions Architect.",
    keywords: [
      "Sourav Sharma",
      "Full Stack Developer Melbourne",
      "Software Engineer Melbourne",
      "Node.js Developer",
      "React Developer",
      "Next.js Developer",
      "Backend Engineer",
      "API Developer",
      "TypeScript",
      "AWS Certified Solutions Architect",
      "Graduate Software Engineer Australia",
    ],
  },
} as const;
