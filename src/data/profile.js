export const profile = {
  name: "Upendra Kumar",
  role: "Full Stack Developer",
  location: "Noida, Uttar Pradesh, India",
  email: "ukiaf11@gmail.com",
  phone: "+91 62099 27804",
  github: "https://github.com/ukiaf11",
  resume: "/Upendra_Kumar_Mahto_CV.pdf",
  roles: [
    "Full Stack Developer",
    "Django & DRF Specialist",
    "Microservices Architect",
    "AI Integration Engineer",
  ],
  summary:
    "Results-driven Full Stack Developer with expertise in building scalable microservices, managing complex multi-tenant architectures, and integrating advanced AI tools. Proficient in developing robust backends using Django and dynamic frontends with React. Experienced in financial technology integrations, secure cloud credential management, and creating automated, user-customizable SaaS solutions.",
  summaryTail:
    "Adept at utilising modern development environments to bridge the gap between innovative infrastructure and seamless user experiences.",
}

export const highlights = [
  { value: "5+", label: "Production-grade projects" },
  { value: "4", label: "Tier multi-tenant hierarchy" },
  { value: "20+", label: "Technologies in the stack" },
  { value: "MCA", label: "In progress · IGNOU 2026" },
]

/**
 * Skills, grouped so each card answers one plain question about what I do.
 *
 *  name  — plain English, not architecture jargon. This is what the reader scans.
 *  note  — one short line saying what the group is for.
 *  daily — the tools I actually work with every day. They get the highlighted
 *          treatment in the UI; everything else is genuine working knowledge,
 *          reached for when the problem calls for it.
 *  primary — exactly one group gets this. It renders as the wide featured band.
 *
 * Same 26 technologies as before, regrouped by what they DO rather than which
 * architectural tier they sit in.
 */
export const skills = [
  {
    id: "backend",
    name: "Backend & APIs",
    note: "Secure REST APIs and the multi-tenant services behind them.",
    icon: "Server",
    primary: true,
    items: [
      { name: "Python", daily: true },
      { name: "Django", daily: true },
      { name: "Django REST Framework", daily: true },
      { name: "Microservice Architecture", daily: true },
      { name: "WebSockets" },
      { name: "Webhooks" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    note: "The interfaces people actually touch.",
    icon: "MonitorSmartphone",
    items: [
      { name: "React", daily: true },
      { name: "JavaScript" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    note: "Where the data lives, and how it stays fast.",
    icon: "Database",
    items: [
      { name: "PostgreSQL", daily: true },
      { name: "Redis" },
      { name: "MySQL" },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    note: "Shipping, versioning and keeping credentials safe.",
    icon: "Container",
    items: [
      { name: "Docker", daily: true },
      { name: "Git", daily: true },
      { name: "Google Secret Manager" },
    ],
  },
  {
    id: "ai",
    name: "AI Integrations",
    note: "Model APIs I build product features on top of.",
    icon: "Sparkles",
    items: [
      { name: "Gemini API", daily: true },
      { name: "Claude API", daily: true },
      { name: "Google AI Studio" },
    ],
  },
  {
    id: "integrations",
    name: "Integrations",
    note: "Third-party services wired into production apps.",
    icon: "Plug",
    items: [
      { name: "Razorpay", daily: true },
      { name: "ExchangeRate-API" },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    note: "My day-to-day editors and API workbench.",
    icon: "TerminalSquare",
    items: [
      { name: "VS Code", daily: true },
      { name: "Cursor" },
      { name: "Postman" },
      { name: "Antigravity" },
      { name: "Antigravity 2.0" },
    ],
  },
]

export const experience = [
  {
    company: "BOL7 Technologies Private Limited",
    title: "Full Stack Developer",
    period: "September 15, 2025 — Present",
    current: true,
    points: [
      "Manage and integrate secure backend modules, APIs, and authentication systems using Django REST Framework and Postman.",
      "Collaborate on backend logic and database management, utilising containerisation and version control tools like Docker and Git.",
    ],
    stack: ["Django REST Framework", "Postman", "Docker", "Git"],
  },
]

export const projects = [
  {
    name: "Microservice SaaS Platform & Credit Service Core",
    tagline:
      "A multi-tenant SaaS platform where every transaction, margin and role flows through one credit engine.",
    featured: true,
    icon: "Boxes",
    points: [
      "Architected a scalable SaaS platform leveraging microservice architecture, using Django for the backend and React for the dynamic frontend interface.",
      "Engineered the central Credit Service module responsible for managing the entire transaction lifecycle (consume, add, transfer) and service pricing across the platform.",
      "Designed a complex, multi-tier workflow architecture supporting Admin, Reseller, Sub-reseller and Client hierarchies.",
      "Implemented dynamic global pricing controls, allowing administrators to set and automate custom margins over base service costs.",
      "Enhanced enterprise-grade security by migrating infrastructure credentials from local .env files to Google Secret Manager.",
      "Engineered a financial tracking system featuring double-entry ledgers, automated real-time currency conversions via ExchangeRate-API, and Razorpay integration.",
    ],
    stack: [
      "Django",
      "React",
      "Microservices",
      "PostgreSQL",
      "Google Secret Manager",
      "Razorpay",
      "ExchangeRate-API",
    ],
  },
  {
    name: "Embeddable Web-Chat & Voice Assistant Widgets",
    tagline:
      "Drop-in chat and voice assistants that any third-party site can theme to match its own brand.",
    icon: "MessagesSquare",
    points: [
      "Developed a highly customisable web-chat widget and a standalone voice assistant designed for seamless third-party website integration via generated embed codes.",
      "Engineered extensive personalisation features, allowing end-users to configure UI aesthetics (colours, fonts, widget names) and integrate custom quick-action links (WhatsApp, phone, email).",
    ],
    stack: ["JavaScript", "React", "WebSockets", "Django", "Embed SDK"],
  },
  {
    name: "Multi-Vendor Hotel & Food Ordering Platform",
    tagline:
      "Digital storefronts for hotel owners, with live pricing and scheduled delivery baked in.",
    icon: "UtensilsCrossed",
    points: [
      "Built a comprehensive multi-tenant platform enabling hotel owners to register, establish digital storefronts, upload inventory images and manage real-time pricing.",
      "Implemented an end-to-end customer order management system that supports both immediate and scheduled food delivery requests.",
    ],
    stack: ["Django", "Multi-tenancy", "PostgreSQL", "Redis", "React"],
  },
  {
    name: "Social Media Automation Engine",
    tagline:
      "A scrape-to-publish pipeline that moves video content across platforms without a human in the loop.",
    icon: "Repeat",
    points: [
      "Developed an automated scraping and publishing pipeline capable of extracting video content from Instagram and other external sources.",
      "Programmed direct, automated API publishing workflows to post content natively to Instagram and YouTube without manual intervention.",
    ],
    stack: ["Python", "Instagram API", "YouTube API", "Automation", "Webhooks"],
  },
  {
    name: "Vertical Farming Web Platform",
    tagline:
      "Agritech data models built for the intersection of growing cycles and operational tracking.",
    icon: "Sprout",
    points: [
      "Developed a specialised backend web application tailored for a vertical farming initiative.",
      "Utilised Django to create robust data models supporting the intersection of agricultural technology, data management and operational tracking.",
    ],
    stack: ["Django", "PostgreSQL", "Data Modelling", "Agritech"],
  },
]

export const education = [
  {
    degree: "Master of Computer Applications (MCA_NEW)",
    school: "Indira Gandhi National Open University (IGNOU)",
    period: "2026 · Pursuing",
    current: true,
  },
  { degree: "Bachelor of Arts (BA)", school: "IGNOU", period: "2022 — 2025" },
  {
    degree: "Class 12th",
    school: "SDS College, Chhapra, Saran (Bihar)",
    period: "2020",
  },
  {
    degree: "Class 10th",
    school: "Bareja High School Cum Inter College, Bareja (Bihar)",
    period: "2018",
  },
]

export const certifications = [
  { name: "Python Full Stack", issuer: "Ducat India, Noida", period: "2024 — 2025" },
  { name: "ADCA", issuer: "Wizard Tech Computer Academy, Ekma", period: "2023" },
]

export const marqueeTech = [
  "Python", "Django", "Django REST Framework", "React", "PostgreSQL", "MySQL",
  "Redis", "Docker", "Git", "WebSockets", "Webhooks", "Microservices",
  "Google Secret Manager", "Razorpay", "Gemini API", "Claude API", "Postman",
  "JavaScript", "HTML", "CSS", "Google AI Studio",
]

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]
