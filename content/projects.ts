/**
 * Project case studies.
 *
 * Each project carries a `visual` key rather than a screenshot. The matching
 * component in components/visuals/ draws a purpose-built diagram of what the
 * system actually does — more useful to a recruiter than a cropped screenshot,
 * and it stays sharp at any size.
 *
 * `theme` gives every card its own palette and title face, so the stack reads
 * as six distinct pieces of work rather than one template repeated six times.
 * Colours are stored as raw RGB triplets because they are injected as CSS
 * custom properties and consumed through rgb(var(--x) / <alpha>).
 *
 * KEEP THE COPY SHORT. A whole card has to sit on one screen without scrolling
 * — roughly: summary two lines, `problem` two lines, three single-line `build`
 * bullets, `outcome` two lines. Anything longer and the card outgrows the
 * viewport and the reader never reaches the link at the bottom.
 */
export type ProjectVisual = "api" | "saas" | "ml" | "map" | "drone" | "iot";

export type ProjectTheme = {
  /** Accent for headings, rules, and diagram strokes. */
  accent: string;
  /** Secondary accent for the diagram and metric row. */
  accentAlt: string;
  /** Background of the text column and of the visual column. */
  left: string;
  right: string;
  /**
   * Body copy tuned to the card's palette. Cool grey on a maroon card reads
   * like a mistake, so each theme carries its own heading and body tones.
   */
  text: string;
  muted: string;
  /** Title face: the CSS variable of the font this card should speak in. */
  font: string;
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  problem: string;
  build: string[];
  outcome?: string;
  metrics?: Array<{ value: string; label: string }>;
  tech: string[];
  /** Capability areas — cross-links a project to the skills section. */
  areas: string[];
  links: Array<{ label: string; href: string; kind: "live" | "code" | "paper" | "video" }>;
  /**
   * Real artwork, where it exists. Takes precedence over `visual`. Setting
   * `videoHref` turns the whole poster into the play control.
   */
  image?: { src: string; alt: string; videoHref?: string };
  visual: ProjectVisual;
  theme: ProjectTheme;
};

export const projects: Project[] = [
  {
    slug: "secure-connect",
    title: "Secure Connect",
    kind: "Middleware API · MA Services Group internship",
    year: "2025",
    summary: "A REST API that automates building access control, so security staff stop provisioning cardholders by hand.",
    problem:
      "Granting or revoking someone's building access meant clicking through the vendor's admin console one record at a time.",
    build: [
      "Node.js and Express API wrapping Gallagher Command Centre — onboarding, credentials, access groups, offboarding.",
      "Service and adapter layers, so a second vendor can be added without touching the cardholder logic.",
      "JWT and bcrypt auth, mutual TLS to the vendor, Zod validation at the edge, audit logs with PII redacted.",
    ],
    outcome: "A manual, error-prone console process became a documented API another engineer can extend.",
    metrics: [
      { value: "mTLS", label: "+ JWT secured" },
      { value: "v1", label: "versioned API" },
      { value: "0", label: "PII in logs" },
    ],
    tech: ["Node.js", "Express", "JWT", "Zod", "Winston", "Docker", "React"],
    areas: ["Backend & APIs", "Security", "DevOps"],
    links: [{ label: "View source on GitHub", href: "https://github.com/souravsharm/Secure-Connect", kind: "code" }],
    visual: "api",
    theme: {
      // Warm amber against cool silver — the industrial-security look.
      accent: "240 164 96",
      accentAlt: "214 224 238",
      left: "20 23 28",
      right: "30 22 15",
      text: "232 238 246",
      muted: "166 178 194",
      font: "var(--font-plex)",
    },
  },
  {
    slug: "willify",
    title: "Willify",
    kind: "Full-stack SaaS · designed, built, and shipped solo",
    year: "2025",
    summary: "A live estate-planning product — \"your legacy, secured\" — taken from empty database to paying customers on my own.",
    problem: "People put off writing a will because it feels legal, expensive, and unclear.",
    build: [
      "Designed the database schema first, then the object-oriented backend services around it.",
      "Built the guided flow that takes someone from first question to a finished, valid document.",
      "Integrated one-time payments, deployed it, and fixed what real users actually hit.",
    ],
    outcome: "Live and taking payments — proof I can carry a product from idea to production on my own.",
    metrics: [
      { value: "Solo", label: "end-to-end build" },
      { value: "Live", label: "in production" },
      { value: "1×", label: "payment flow" },
    ],
    tech: ["Next.js", "React", "Node.js", "TypeScript", "SQL", "Payments", "Vercel"],
    areas: ["Full-stack", "Frontend", "Databases"],
    links: [{ label: "Open the live site", href: "https://willify-mu.vercel.app", kind: "live" }],
    visual: "saas",
    theme: {
      // Deep maroon and gold, echoing the product's own brand.
      accent: "214 178 124",
      accentAlt: "205 128 142",
      left: "23 13 16",
      right: "48 18 26",
      text: "244 231 219",
      muted: "199 176 163",
      font: "var(--font-serif)",
    },
  },
  {
    slug: "ckd-prognosis",
    title: "Predicting kidney disease progression",
    kind: "Published research · Honours thesis",
    year: "2024",
    summary: "A model that predicts kidney failure risk and — just as importantly — explains why it made each call.",
    problem: "A clinical prediction is useless if the doctor cannot see the reasoning behind it.",
    build: [
      "Built the Python preprocessing pipeline: normalisation, outlier detection, incomplete records.",
      "Corrected the class imbalance with SMOTE, so 'healthy' could not win by default.",
      "Applied SHAP and LIME so each prediction ships with the features that drove it.",
    ],
    outcome: "Accuracy rose from 86% to 94%, F1-score up 8%. Peer reviewed and published by Elsevier.",
    metrics: [
      { value: "94%", label: "accuracy, from 86%" },
      { value: "+8%", label: "F1-score" },
      { value: "DOI", label: "peer reviewed" },
    ],
    tech: ["Python", "pandas", "NumPy", "scikit-learn", "SMOTE", "SHAP", "LIME"],
    areas: ["Data & AI", "Python"],
    links: [{ label: "Read the published paper", href: "https://doi.org/10.1016/j.cmpbup.2024.100160", kind: "paper" }],
    visual: "ml",
    theme: {
      // Clinical teal.
      accent: "90 214 190",
      accentAlt: "132 196 255",
      left: "10 16 17",
      right: "12 27 27",
      text: "226 243 239",
      muted: "150 182 176",
      font: "var(--font-plex)",
    },
  },
  {
    slug: "trip-tracker",
    title: "Travel Tracker",
    kind: "Full-stack web app · Express and PostgreSQL",
    year: "2026",
    summary: "A multi-user app where each family member gets a colour and every country they visit lights up on a shared world map.",
    problem: "Several people, shared state, and a map that has to stay in sync with the database on every write.",
    build: [
      "Express server on PostgreSQL, with EJS rendering an interactive SVG world map.",
      "Relational schema for users, countries, and visits — plus the queries that colour the map.",
      "Fuzzy country search, a first-run tour, and deployment to Render with a hosted database.",
    ],
    metrics: [
      { value: "SQL", label: "relational schema" },
      { value: "Multi", label: "user state" },
      { value: "Live", label: "deployed" },
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "EJS", "SVG", "Neon", "Render"],
    areas: ["Full-stack", "Backend & APIs", "Databases"],
    links: [
      { label: "Try the live demo", href: "https://trip-tracker-rydl.onrender.com/", kind: "live" },
      { label: "View source", href: "https://github.com/souravsharm/Trip-Tracker", kind: "code" },
    ],
    visual: "map",
    theme: {
      // Cartographic azure.
      accent: "108 170 255",
      accentAlt: "126 220 236",
      left: "10 13 20",
      right: "13 21 36",
      text: "228 236 248",
      muted: "154 172 198",
      font: "var(--font-display)",
    },
  },
  {
    slug: "gesture-drone",
    title: "Flying a drone with hand gestures",
    kind: "Robotics and real-time systems",
    year: "2024",
    summary: "Point at a DJI Tello and it moves — a model reads the gesture, ROS2 carries the message, the drone responds.",
    problem: "Closing the loop from camera frame to flight command fast enough to feel like a response, not a delay.",
    build: [
      "Trained a Keras gesture-recognition model and ran inference on the live camera feed.",
      "Routed commands through ROS2 to keep recognition and flight control reliable.",
      "Drove the aircraft over the Tellopy API, with WebSockets for commands and telemetry.",
    ],
    metrics: [
      { value: "Real-time", label: "inference loop" },
      { value: "ROS2", label: "message bus" },
      { value: "WS", label: "live telemetry" },
    ],
    tech: ["Python", "Keras", "ROS2", "JavaScript", "WebSockets", "DJI Tellopy"],
    areas: ["Data & AI", "Real-time", "Robotics"],
    links: [
      { label: "Watch the drone demo", href: "https://youtu.be/Dv5XkQuXW5Q", kind: "video" },
      { label: "View source on GitHub", href: "https://github.com/souravsharm/TelloDrone-GestureDetection", kind: "code" },
    ],
    image: {
      src: "/TelloDrone.png",
      alt: "The DJI Tello in flight above a mission-pad mat, overlaid with navigation telemetry",
      videoHref: "https://youtu.be/Dv5XkQuXW5Q",
    },
    visual: "drone",
    theme: {
      // Electric violet.
      accent: "162 142 255",
      accentAlt: "120 204 255",
      left: "13 12 20",
      right: "21 17 36",
      text: "234 231 250",
      muted: "166 162 200",
      font: "var(--font-display)",
    },
  },
  {
    slug: "smart-vault",
    title: "Smart Security Vault",
    kind: "IoT and event-driven automation",
    year: "2023",
    summary: "A Raspberry Pi vault that watches its sensors and emails you the moment something happens.",
    problem: "How much useful alerting can you get out of a Pi, a few sensors, and event-driven Python?",
    build: [
      "Wired sensors into a Raspberry Pi 4 and wrote the event loop that watches their state.",
      "Triggered real-time email alerts through IFTTT whenever a sensor condition is met.",
      "Tuned the trigger logic so genuine events get through and noise does not.",
    ],
    metrics: [
      { value: "Live", label: "sensor events" },
      { value: "Push", label: "email alerts" },
      { value: "Pi 4", label: "on-device logic" },
    ],
    tech: ["Python", "Raspberry Pi", "Sensors", "IFTTT API", "Event-driven design"],
    areas: ["IoT", "Python", "Real-time"],
    links: [{ label: "Watch the demo video", href: "https://www.youtube.com/watch?v=lu3OdeYKoKc", kind: "video" }],
    visual: "iot",
    theme: {
      // Muted signal-lime.
      accent: "158 208 124",
      accentAlt: "230 196 118",
      left: "12 15 12",
      right: "17 25 18",
      text: "234 242 228",
      muted: "164 182 154",
      font: "var(--font-display)",
    },
  },
];
