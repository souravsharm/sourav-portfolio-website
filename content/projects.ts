export type Project = {
  title: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome?: string;
  tech: string[];
  tags: string[];
  links: Array<{ label: string; href: string }>;
  /**
   * Optional cover image for the project card.
   * Put the file in the /public folder (e.g. public/projects/drone.png) and set
   * this to the path from the site root, e.g. image: "/projects/drone.png".
   * When omitted, the card shows a text placeholder instead.
   */
  image?: string;
};

export const projects: Project[] = [
  {
    title: "AI Gesture Detection Based Drone Control System",
    summary:
      "A real-time gesture recognition workflow for controlling a DJI Tello drone using machine learning inference, ROS2, WebSockets, and a live JavaScript command interface.",
    problem:
      "Drone control usually depends on manual controllers or keyboard input. This project explored a more intuitive control interface where recognized hand gestures could trigger drone commands in near real time.",
    approach: [
      "Built a Keras-based gesture recognition workflow.",
      "Integrated DJI Tellopy APIs for drone command execution.",
      "Used ROS2 to improve operational reliability and messaging structure.",
      "Built a JavaScript/WebSocket interface for low-latency command and telemetry communication.",
    ],
    tech: ["Python", "JavaScript", "ROS2", "WebSockets", "Keras", "DJI Tellopy APIs", "Git", "GitHub"],
    tags: ["Real-time systems", "ML inference", "Robotics", "WebSockets", "API integration"],
    links: [
      {
        label: "View GitHub",
        href: "https://github.com/souravsharm/TelloDrone-GestureDetection",
      },
    ],
  },
  {
    title: "Chronic Kidney Disease Prognosis Using AI",
    summary:
      "A machine learning research project focused on predicting kidney failure risk using clinical data preprocessing, model evaluation, and explainable AI techniques.",
    problem:
      "Clinical prediction models need both accuracy and interpretability. This project focused on improving prognosis performance while explaining which features influenced predictions.",
    approach: [
      "Built preprocessing pipelines in Python using Google Colab.",
      "Applied normalization, outlier detection, and data quality improvements.",
      "Used machine learning models with evaluation metrics including F1-score and accuracy.",
      "Applied SHAP and LIME to explain model outputs and identify critical clinical features.",
    ],
    outcome: "Improved model performance with an 8% uplift in F1-score and increased overall accuracy from 86% to 94%.",
    tech: ["Python", "Pandas", "NumPy", "scikit-learn", "SMOTE", "SHAP", "LIME", "Google Colab"],
    tags: ["Machine learning", "Explainable AI", "Data preprocessing", "Evaluation metrics", "Clinical AI"],
    links: [
      {
        label: "View DOI",
        href: "https://doi.org/10.1101/2024.04.08.24305414",
      },
    ],
  },
  {
    title: "Smart Security Vault System",
    summary:
      "An IoT security system using Raspberry Pi, sensors, Python event-driven logic, and IFTTT APIs for real-time email notifications.",
    problem:
      "The project explored a low-cost smart security workflow where sensor events could trigger automated alerts.",
    approach: [
      "Integrated Raspberry Pi 4 with sensor-based monitoring.",
      "Implemented event-driven Python logic.",
      "Used IFTTT APIs to trigger real-time email notifications.",
      "Designed the system for reliable alerting and practical automation.",
    ],
    tech: ["Python", "Raspberry Pi", "IoT", "Sensors", "IFTTT APIs"],
    tags: ["IoT", "Sensors", "Automation", "Event-driven systems", "API integration"],
    links: [
      {
        label: "Watch Demo",
        href: "https://www.youtube.com/watch?v=lu3OdeYKoKc",
      },
    ],
  },
];

