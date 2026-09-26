/**
 * All visitor-facing copy on both pages lives in this file; the components read it.
 * Generic control and field labels (Menu, Close, Skip to content, Back to top, Résumé,
 * Download résumé, Email me, Visit live site, Back to the portfolio, "(opens in a new
 * tab)", Built with, Highlights, Best for, What you get, Responsibilities, Contact
 * details) stay in the components. Never invent claims: see README.md.
 */
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
  { value: "4", label: "Tiers in the multi-tenant hierarchy" },
  { value: "20+", label: "Technologies in the stack" },
  { value: "MCA", label: "Master's in progress · IGNOU 2026" },
]

/** Read by Hero.jsx: the status chip, the lead (with its bold phrases) and the live-sites chip. */
export const heroIntro = {
  status: "Available for opportunities",
  lead: "I build scalable microservices, complex multi-tenant SaaS architectures and AI-integrated products: robust Django backends paired with dynamic React frontends.",
  // Substrings of `lead` that render in bold, in order.
  leadEmphasis: ["scalable microservices", "multi-tenant SaaS architectures", "AI-integrated products"],
  // Rendered as `${liveSites.length} ${liveLabel}`, e.g. "5 live sites".
  liveLabel: "live sites",
}

/** Read by About.jsx: the section head. The lead is profile.summaryTail. */
export const aboutIntro = {
  eyebrow: "About",
  title: "Bridging infrastructure and experience",
}

/** Read by About.jsx: the four pillars in the bento. `icon` is a lucide-react name in its ICONS map. */
export const aboutPillars = [
  {
    icon: "Layers",
    title: "Microservice architecture",
    body: "Splitting platforms into services that scale and deploy on their own terms, with a credit core holding the transaction lifecycle together.",
  },
  {
    icon: "Braces",
    title: "Django & DRF backends",
    body: "Secure APIs, authentication systems and data models built to survive real multi-tenant traffic, not just a demo.",
  },
  {
    icon: "Lock",
    title: "Security & fintech",
    body: "Double-entry ledgers, live currency conversion, Razorpay flows and credentials moved off .env into Google Secret Manager.",
  },
  {
    icon: "Cpu",
    title: "AI integration",
    body: "Gemini (through Google AI Studio) and Claude APIs wired into products: assistants and automation that ship, not prototypes.",
  },
]

/** Read by About.jsx: the Focus grouped list beside the summary. `icon` is a lucide-react name. */
export const aboutFocus = {
  title: "Focus",
  rows: [
    { icon: "Server", label: "Backend", value: "Django · DRF · PostgreSQL" },
    { icon: "MonitorSmartphone", label: "Frontend", value: "React" },
    { icon: "Boxes", label: "Scale", value: "Microservices · multi-tenant" },
    { icon: "Sparkles", label: "Edge", value: "AI integration · fintech" },
  ],
}

/**
 * Read by Skills.jsx: the section head, the primary band's kicker and the legend.
 * `dailyCount` has {daily} and {total} placeholders, which Skills.jsx fills in.
 */
export const skillsIntro = {
  eyebrow: "Skills",
  title: "What I build with",
  lead: "Grouped by what each thing actually does. The highlighted items are what I work with every day — the rest is solid working knowledge I reach for when a problem calls for it.",
  primaryKicker: "Primary focus",
  dailyLabel: "Used every day",
  otherLabel: "Working knowledge",
  dailyCount: "{daily} of the {total} technologies here are used every day.",
}

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
    note: "Editors and the API workbench I build in.",
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

/** Read by Experience.jsx: the section head. */
export const experienceIntro = {
  eyebrow: "Experience",
  title: "Where I've been building",
  lead: "Shipping secure backend modules and APIs in a production team environment.",
}

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

/** Read by Projects.jsx: the section head and the GitHub card's title. */
export const projectsIntro = {
  eyebrow: "Projects",
  title: "Things I've architected and shipped",
  lead: "Platforms built end to end — from the credit engine that prices every transaction, to embeddable assistants other businesses drop into their own sites.",
  moreLabel: "More on GitHub",
}

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
 * Live websites — real, deployed builds a visitor can click through to.
 *
 * Every word here was taken from what the live site actually shows (researched by
 * rendering each one on 2026-09-25). Do not add metrics or features that are not on the
 * site — AI Content Optimizer's own marketing figures, for instance, are hard-coded copy
 * on that site, not measured results, so they are deliberately not repeated here.
 *
 *  images   — captured locally with headless Chrome, stored as WebP in /public/work
 *             (naming rule: DESIGN.md §11).
 *  note     — an honest caveat the visitor should know before clicking (login wall, demo data).
 *  noteShort — the short form of note, shown in the /services/ live-sites list.
 *  accent   — the site's own brand colour, sampled from its UI; used for a subtle tint only.
 *  context  — who it was built for or at, when it is not a personal build.
 */
export const liveSites = [
  {
    id: "mobile-accessories",
    name: "Mobile Accessories Shop",
    url: "https://mobile-accessories-shop-fawn.vercel.app/",
    category: "Online shop",
    tagline: "A phone-accessories storefront that only shows what fits your exact model.",
    summary:
      "Shoppers pick a smartphone or tablet, then their brand and model, and the catalogue narrows to the cases, tempered glass, chargers and audio gear that actually fit. Items go into a request list that is sent to the shop for pickup or local delivery, and the shop calls back to confirm stock and the final price.",
    features: [
      "Model finder across 21 brands and 200 models",
      "Filterable, sortable product catalogue",
      "Saved request list",
      "Pickup or local-delivery order requests",
      "Custom request form for unlisted models",
    ],
    stack: ["React 19", "Vite", "Tailwind CSS v4", "Motion", "Zustand", "React Hook Form", "Zod", "Vercel Functions"],
    accent: "#6d5dfc",
    note: "Order requests, not checkout: the shop calls back to confirm stock and the final price.",
    noteShort: "Order requests only",
    images: {
      desktop: "/work/mobile-accessories-1280.webp",
      desktopSmall: "/work/mobile-accessories-640.webp",
      mobile: "/work/mobile-accessories-mobile.webp",
    },
  },
  {
    id: "hotel-express",
    name: "Hotel Express",
    url: "https://hotel-web-mu-ten.vercel.app/",
    category: "Ordering platform",
    tagline: "Meals from neighbourhood hotel kitchens, booked into a delivery or pickup slot up to 14 days ahead.",
    summary:
      "Diners browse verified hotels and their menus, build a cart and book a home-delivery or self-pickup slot, paying cash on delivery or at the counter. Hotel owners get their own workspace — dashboard, menu manager, live order queue and sales reports with CSV and PDF export — while an admin console handles hotel verification and support.",
    features: [
      "Hotel search with quick filters",
      "Delivery or pickup slot scheduling",
      "Owner dashboard and live order queue",
      "Sales reports with CSV and PDF export",
      "Admin verification console",
    ],
    stack: ["React 19", "Vite", "React Router", "Zustand", "Custom CSS design tokens"],
    accent: "#f68d31",
    note: "Live demo — data stays in your browser, with one-click demo accounts for each role.",
    noteShort: "Demo data",
    images: {
      desktop: "/work/hotel-express-1280.webp",
      desktopSmall: "/work/hotel-express-640.webp",
      mobile: "/work/hotel-express-mobile.webp",
    },
  },
  {
    id: "saloon",
    name: "Upendra Salon",
    url: "https://saloon-shop-web.vercel.app/",
    category: "Booking site",
    tagline: "Salon bookings with UPI payment, combo discounts and five lucky free slots every day.",
    summary:
      "Visitors browse the grooming menu by category, add services to one booking and pay by UPI QR code or UPI app, with 10% off applied automatically when two or more services are booked. Every booking gets a QR coupon to show at the salon, and a live daily panel tracks the five lucky slots that win a free haircut, shave and face massage.",
    features: [
      "Filterable service menu with prices",
      "Automatic 10% combo discount",
      "UPI QR and UPI-app payment",
      "QR coupon for every booking",
      "Live daily lucky-slot tracker",
    ],
    stack: ["Next.js 16", "React", "Tailwind CSS v4", "Zod", "REST API"],
    accent: "#b2502a",
    images: {
      desktop: "/work/saloon-1280.webp",
      desktopSmall: "/work/saloon-640.webp",
      mobile: "/work/saloon-mobile.webp",
    },
  },
  {
    id: "omni-panel",
    name: "Omni Panel",
    url: "https://next.bol7.com/billing",
    category: "SaaS dashboard",
    context: "BOL7 Technologies",
    tagline: "A multichannel AI sales and customer-engagement dashboard for businesses.",
    summary:
      "A sign-in-only client dashboard where businesses run customer messaging and marketing from one place. Accounts are created and verified with one-time passwords over email or WhatsApp, and the platform brings AI agents, a shared inbox, WhatsApp, SMS, RCS and email campaigns, bot flows, CRM and billing together.",
    features: [
      "Email or WhatsApp OTP sign-in",
      "OTP-verified sign-up with country picker",
      "reCAPTCHA-protected auth flows",
      "Campaign, inbox and CRM modules",
      "Client billing",
    ],
    stack: ["React", "Vite", "React Router", "Tailwind CSS", "React Flow", "Axios"],
    accent: "#4f46e5",
    note: "Client dashboard — the link opens the sign-in screen.",
    noteShort: "Sign-in required",
    images: {
      // 1152 wide: a native-resolution crop, never upscaled (DESIGN.md §11).
      desktop: "/work/omni-panel-1152.webp",
      desktopSmall: "/work/omni-panel-640.webp",
      mobile: "/work/omni-panel-mobile.webp",
    },
  },
  {
    id: "ai-content-optimizer",
    name: "AI Content Optimizer",
    url: "https://ai-content-optimizer-six.vercel.app/",
    category: "AI web app",
    tagline: "Scores short-form videos and images, then writes platform-ready captions and fixes.",
    summary:
      "Creators upload a video or image, choose Instagram, TikTok or YouTube along with a goal, niche, audience and language, and get back a report scoring the content from 1 to 100 across eight factors, including hook, pacing, audio and searchability. The report adds timeline-linked fixes, a platform safe-zone overlay, SEO captions and hashtags, and a side-by-side comparison with an edited revision.",
    features: [
      "Drag-and-drop video and image upload",
      "8-factor creative quality scorecard",
      "Platform safe-zone overlay",
      "SEO captions and hashtag sets",
      "Side-by-side revision comparison",
    ],
    stack: ["React", "Vite", "Custom CSS", "REST API"],
    accent: "#6366f1",
    // Comes out once the Render API answers again (see MEMORY.md).
    note: "The analysis service is offline right now, so uploads won't return a report. The interface is live.",
    noteShort: "Analysis service offline",
    images: {
      desktop: "/work/ai-content-optimizer-1280.webp",
      desktopSmall: "/work/ai-content-optimizer-640.webp",
      mobile: "/work/ai-content-optimizer-mobile.webp",
    },
  },
]

/** Read by LiveWork.jsx: the Work section head. */
export const liveSitesIntro = {
  eyebrow: "Work",
  title: "Shipped, deployed and one click away",
  lead:
    "Real, deployed sites — a storefront, an ordering platform, a booking site, a SaaS dashboard and an AI tool. Open any of them and click through it yourself.",
}

/** Read by Services.jsx: the section head (the accent part of the title is set apart). */
export const servicesIntro = {
  eyebrow: "Services",
  titleLead: "What I can",
  titleAccent: "build for you",
  lead: "Four kinds of work I take on — websites, custom applications, APIs and AI features. Each one is grounded in something I have already built, not a service line invented for this page.",
}

/**
 * Client-facing services. Ordered as the reader should meet them, not by strength:
 * websites is the offer the widest set of buyers self-identify with, so it leads.
 * A service may carry a short `flag` (e.g. "Core strength"), rendered as a chip in its row:
 * emphasis by label, not by size.
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
 *
 * `examples` lists `liveSites` ids that ARE this kind of site, so a sketch can link to a
 * real, deployed one. Only list a site that genuinely is this kind of site.
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
    examples: ["mobile-accessories"],
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
    examples: ["saloon", "hotel-express"],
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
    examples: ["omni-panel"],
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

/** Read by WebsiteTypes.jsx: the section head. */
export const websiteTypesIntro = {
  eyebrow: "Website types",
  title: "The shapes a website comes in",
  lead:
    "An enquiry usually starts with a rough idea of the kind of site, not a spec. These are the six shapes that idea normally turns out to be, each one drawn as the layout that kind of page actually has — sketches rather than screenshots, since the finished design is decided with you.",
}

/** Read by ServicesApp.jsx: the standalone /services/ page header and its live-sites widget. */
export const servicesPage = {
  h1: "Websites, and the software behind them",
  intro:
    "I am a full stack developer based in Noida — Django on the backend, React on the front. Most of what people ask for is some combination of a website, the application behind it, and the payments, third-party services or AI features that connect the two. This page starts with the kinds of site I get asked for most, then goes on to the four kinds of work underneath them.",
  primaryAction: "What I take on",
  secondaryAction: "Start a conversation",
  liveTitle: "Live on the web",
  liveMore: "Screenshots and details",
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

/** Read by Education.jsx: the section head. */
export const educationIntro = {
  eyebrow: "Education",
  title: "Learning, formal and otherwise",
  lead: "A computer applications master's in progress, on top of a full stack development track.",
}

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
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

/** Read by Contact.jsx: the pitch. The title renders as `${title} ${titleTail}`, the tail set apart. */
export const contactCta = {
  eyebrow: "Contact",
  title: "Let's build something",
  titleTail: "that scales",
  body: "Open to full stack roles and freelance work — especially anything involving Django backends, microservices or AI integration. The fastest way to reach me is email.",
}

/** Read by Footer.jsx: the "Built with" credits. */
export const footerCredits = {
  builtWith: ["React", "Vite", "Tailwind CSS"],
}

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
  { id: "work", label: "Work" },
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
