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
    "Results-driven Full Stack Developer with expertise in building scalable microservices, managing complex multi-tenant architectures, and integrating advanced AI tools. Proficient in developing robust backends using Django and dynamic frontends with React. Experienced in financial technology integrations, secure cloud credential management, and creating automated, user-customisable SaaS solutions.",
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
 * Same 28 technologies, regrouped by what they DO rather than which
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
      { name: "Vite" },
      { name: "Tailwind CSS" },
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
      "Integrated a third-party bot API so each customer can create their own assistant and curate its knowledge base, with the widget sending the request and rendering the reply inside the host site's own styling.",
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

/**
 * Client-facing services. Ordered as the reader should meet them, not by strength:
 * websites is the offer the widest set of buyers self-identify with, so it leads.
 * The one marked `featured` gets a "Most requested" marker in its masthead rule —
 * emphasis by label, not by size, so the 2x2 lattice stays even.
 *
 *  pitch        — addresses the client in second person and leads with the outcome.
 *  deliverables — concrete, 2-5 words, rendered as a ledger rather than bullets.
 *  proof        — a REAL project from the list above. Never invent client work.
 */
export const services = [
  {
    id: "business-websites",
    icon: "Gauge",
    title: "Fast, findable business websites",
    tagline: "Loads quickly, reads properly on a phone, gets found.",
    pitch:
      "People decide about a business in the first few seconds, and a slow or awkward site loses them before you get a word in. You get a site that opens almost immediately, works properly on a 360px screen, and is structured so search engines can index what you actually sell. The point is not decoration — it is turning the visitors you already have into enquiries.",
    bestFor: "Local businesses, marketing agencies and independent consultants.",
    deliverables: [
      "Sub-second first paint target",
      "Responsive down to 360px",
      "On-page SEO and metadata",
      "Accessible, keyboard-friendly UI",
      "Enquiry forms that work",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Django", "PostgreSQL"],
    proof:
      "The Multi-Vendor Hotel & Food Ordering Platform gave every hotel owner a public storefront with real-time pricing — customer-facing pages that had to stay quick on a phone.",
  },
  {
    id: "web-apps-saas",
    icon: "LayoutDashboard",
    title: "Custom web apps and SaaS platforms",
    tagline: "The software your business runs on, built to fit rather than bent to fit.",
    // A claim about where his own depth is, not about client demand he cannot evidence.
    flag: "Core strength",
    pitch:
      "You have a process that spreadsheets and off-the-shelf tools have quietly stopped keeping up with. I build the application that replaces them — proper logins and roles, a database shaped around how your business actually works, and dashboards that answer the questions you keep asking someone to look up. It is built to grow with you rather than need replacing the moment you do.",
    bestFor: "Startups, mid-sized teams and internal tools that have outgrown spreadsheets.",
    deliverables: [
      "Authentication and user roles",
      "Custom database architecture",
      "Interactive React dashboards",
      "Secure Django backends",
      "Multi-tenant account hierarchy",
    ],
    stack: ["Django", "Django REST Framework", "React", "PostgreSQL", "Redis", "Docker"],
    proof:
      "The Microservice SaaS Platform runs a four-tier Admin, Reseller, Sub-reseller and Client hierarchy on one credit engine that prices and settles every transaction.",
  },
  {
    id: "apis-backends",
    icon: "Network",
    title: "APIs that connect your systems",
    tagline: "One clean layer between your app, your payments and everything else.",
    pitch:
      "Your site, your payment provider and every other service you depend on need to agree on the same data. I build the API layer in the middle — documented endpoints, real authentication, payments that reconcile, and queries that stay fast as the tables fill up. You end up with one place to plug new things into, instead of the same integration written twice.",
    bestFor: "Teams wiring in payments or third-party services, or splitting one app into several.",
    deliverables: [
      "Documented REST endpoints",
      "Token-based authentication",
      "Payment gateway integration",
      "PostgreSQL query optimisation",
      "Docker containerisation",
    ],
    stack: ["Django REST Framework", "PostgreSQL", "Redis", "Docker", "Razorpay", "Webhooks"],
    proof:
      "Payments and live currency conversion run through the credit service in the Microservice SaaS Platform — Razorpay and ExchangeRate-API behind one API, with double-entry ledgers underneath. Infrastructure credentials moved out of .env files into Google Secret Manager.",
  },
  {
    id: "ai-automation",
    icon: "Bot",
    title: "AI assistants and automation",
    tagline: "Chat, voice, and the repetitive work nobody should be doing by hand.",
    pitch:
      "A good part of what your team does every day is copying things between systems and answering the same five questions. I put an assistant on your site that answers from a knowledge base you control, in your own branding, and I build the pipelines that move content between platforms with nobody driving them. What you get back is the time you were spending on it.",
    bestFor: "Businesses with repetitive manual work, or a site that needs an assistant on it.",
    deliverables: [
      "Embeddable chat widget",
      "Voice assistant integration",
      "Knowledge-base backed replies",
      "Scrape-to-publish pipelines",
      "Brand-matched widget theming",
    ],
    stack: ["JavaScript", "React", "Django", "WebSockets", "Webhooks", "Embed SDK"],
    proof:
      "The Embeddable Web-Chat & Voice Assistant Widgets drop into any third-party site from a generated embed code, take on that site's colours, fonts and quick actions, and answer from a knowledge base the customer configures themselves; the Social Media Automation Engine publishes to Instagram and YouTube with nobody in the loop.",
  },
]

/**
 * Kinds of website, for the gallery on /services/.
 *
 * `preview` names a composition in SiteMockup.jsx — a miniature wireframe of the layout
 * that kind of site actually has. Deliberately sketches, not screenshots: there are no
 * real client sites to photograph, and stock imagery would be a claim about work that
 * does not exist. The section lead says so out loud.
 *
 * `icon` must be a real lucide-react export AND be present in the ICONS map in
 * WebsiteTypes.jsx, or it silently falls back to the default.
 */
export const websiteTypes = [
  {
    id: "business-site",
    name: "Business website",
    icon: "Building2",
    preview: "brochure-stack",
    blurb:
      "The site people find when they look you up, and decide from whether to get in touch. It says what you do, who you do it for, and gives them one obvious way to start the conversation.",
    bestFor: "Small firms and trades whose customers look them up before they call.",
    highlights: ["Clear service pages", "Enquiry form", "Findable on search"],
  },
  {
    id: "online-shop",
    name: "Online shop",
    icon: "ShoppingBag",
    preview: "product-grid",
    blurb:
      "A shop that takes the order and the payment without you touching anything. Customers browse, choose and pay; you get stock, prices and orders in one place instead of three.",
    bestFor: "Retailers and makers selling more than a handful of products.",
    highlights: ["Searchable catalogue", "Checkout and payments", "Orders and stock admin"],
  },
  {
    id: "landing-page",
    name: "Campaign landing page",
    icon: "MousePointerClick",
    preview: "single-offer",
    blurb:
      "One page with one job: explain a single offer and let the visitor act on it. Built for traffic you are already paying to bring in, so the click lands somewhere that answers the question it arrived with.",
    bestFor: "Product launches, ad campaigns and event sign-ups.",
    highlights: ["One offer, one action", "Sign-up form", "Fast on mobile data"],
  },
  {
    id: "booking-site",
    name: "Booking and ordering site",
    icon: "ConciergeBell",
    preview: "menu-and-slots",
    blurb:
      "For a business where the site's real job is to take the booking or the order. Customers see what is available, pick a time or a dish and confirm it themselves, rather than ringing you in the middle of service.",
    bestFor: "Restaurants, hotels, salons and clinics.",
    highlights: ["Live menu or availability", "Bookings taken online", "Owner dashboard"],
  },
  {
    id: "customer-portal",
    name: "Customer portal",
    icon: "PanelsTopLeft",
    preview: "portal-dashboard",
    blurb:
      "The part of your business that lives behind a login. Customers sign in to see their own account, orders, usage or documents, and your team sees the whole lot from the other side.",
    bestFor: "Service businesses and subscription products with accounts to manage.",
    highlights: ["Logins and roles", "Account dashboards", "Usage and billing views"],
  },
  {
    id: "portfolio-site",
    name: "Portfolio site",
    icon: "SquareUserRound",
    preview: "work-mosaic",
    blurb:
      "A site built around the work rather than the words. Projects get room to be looked at properly, and the way to commission you stays one tap from every one of them.",
    bestFor: "Designers, photographers, studios and freelancers.",
    highlights: ["Work-first layout", "Case study pages", "Contact on every page"],
  },
]

export const websiteTypesIntro = {
  title: "The shapes a website comes in",
  lead:
    "An enquiry usually starts with a rough idea of the kind of site, not a spec. These are the six shapes that idea normally turns out to be, each one drawn as the layout that kind of page actually has — sketches rather than screenshots, since the finished design is decided with you.",
}

/** Copy for the standalone /services/ page header. */
export const servicesPage = {
  h1: "Websites, and the software behind them",
  intro:
    "I am a full stack developer based in Noida — Django on the backend, React on the front. Most of what people ask for is some combination of a website, the application behind it, and the payments, third-party services or AI features that connect the two. This page starts with the kinds of site I get asked for most, then goes on to the four kinds of work underneath them.",
}

export const servicesCta = {
  headline: "Not sure which one you need?",
  sub: "Most jobs turn out to be a mix of two of these. Describe the problem in a few lines and I'll come back within two working days with scope, a timeline and a price range — or the two or three questions I need answered to give you one.",
  buttonLabel: "Tell me about your project",
  // The button asks for a brief, so it opens one rather than an empty compose window.
  mailSubject: "Project enquiry",
  mailBody: [
    "What the business does:",
    "",
    "The problem I need solved:",
    "",
    "Rough timing and budget:",
    "",
  ].join("\n"),
}

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
  "JavaScript", "Vite", "Tailwind CSS", "HTML", "CSS", "Google AI Studio",
]

/**
 * The nav, in order. Single source of truth for the nav itself, the scroll-spy AND the
 * numbered eyebrow on every section (see `sectionNo`).
 *
 * An entry with `page: true` is a separate HTML page rather than a section of the home
 * page, so it is excluded from the scroll-spy and from the section numbering — it has a
 * real `href` instead of an anchor. Reordering the home page means reordering the
 * section entries here plus the JSX order in App.jsx.
 */
export const navLinks = [
  { id: "about", label: "About" },
  { id: "services", label: "Services", href: "/services/", page: true },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

/** Just the home-page sections, in order — what the ordinals and scroll-spy count. */
export const pageSections = navLinks.filter((l) => !l.page)

/**
 * Zero-padded ordinal for a section's eyebrow, derived from the page order above.
 * Returns null — rather than a silent "00" — for a section that is deliberately not
 * in the nav, so the eyebrow simply drops its prefix instead of rendering nonsense.
 */
export const sectionNo = (id) => {
  const i = pageSections.findIndex((l) => l.id === id)
  if (i < 0) {
    if (import.meta.env?.DEV) console.warn(`sectionNo: "${id}" is not a home-page section`)
    return null
  }
  return String(i + 1).padStart(2, "0")
}
