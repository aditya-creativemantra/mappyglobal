import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Compass,
  Globe2,
  Handshake,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
  LinkedInIcon,
  XIcon,
  FacebookIcon,
  InstagramIcon
} from "@/components/icons";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Why Mappy?", href: "/why-mappy" },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        title: "Services",
        links: [
          { label: "Executive search", href: "/services#executive-search" },
          { label: "Key and niche talent recruitment", href: "/services#key-and-niche-talent" },
          { label: "RPO, staffing and pooling", href: "/services#rpo-staffing-and-pooling" },
          { label: "Global expansions", href: "/services#global-expansions" },
          { label: "Mergers and acquisitions", href: "/services#mergers-and-acquisitions" }
        ]
      }
    ]
  },
  {
    label: "Industries",
    href: "/industries",
    columns: [
      {
        title: "Consumer and health",
        links: [
          { label: "FMCG and consumer", href: "/industries#fmcg-and-consumer" },
          { label: "Pharma and life sciences", href: "/industries#pharma-and-life-sciences" }
        ]
      },
      {
        title: "Technology and finance",
        links: [
          { label: "Technology and IT", href: "/industries#technology-and-it" },
          { label: "BFSI and fintech", href: "/industries#bfsi-and-fintech" }
        ]
      },
      {
        title: "Industrial and infrastructure",
        links: [
          { label: "Manufacturing and infrastructure", href: "/industries#manufacturing-and-infrastructure" },
          { label: "Telecom, logistics and digital media", href: "/industries#telecom-logistics-and-digital-media" }
        ]
      }
    ]
  },
  { label: "About Us", href: "/about" }
];

export const insightCards = [
  {
    eyebrow: "Global presence",
    title: "Connected consultants across key hiring markets",
    description:
      "Young, nimble teams with offices and active consultant networks across India and the Middle East.",
    imageSrc: "/blogone.webp",
    imageAlt: "Consultation meeting for a leadership search",
    imageClassName: "object-center"
  },
  {
    eyebrow: "Consistent delivery",
    title: "Trusted for critical mandates",
    description:
      "A strong delivery track record in executive and specialist hiring keeps the business positioned as a dependable search partner.",
    imageSrc: "/blogtwo.jpg",
    imageAlt: "Mappy Global Resources team in a client meeting",
    imageClassName: "object-center"
  },
  {
    eyebrow: "Assignment expertise",
    title: "Cross-border hiring experience",
    description:
      "Cross-border assignment exposure across India, the Middle East, and the international mandates that run between them.",
    imageSrc: "/blogthree.jpg",
    imageAlt: "Senior leadership conversation in a premium office",
    imageClassName: "object-center"
  },
  {
    eyebrow: "Sector depth",
    title: "Multi-industry presence that scales with need",
    description:
      "Coverage spans FMCG, pharma, technology, infrastructure, digital, BFSI, telecom, logistics, and adjacent sectors.",
    imageSrc: "/blogfour.jpg",
    imageAlt: "Consultative hiring discussion across sectors",
    imageClassName: "object-center"
  }
];

export const whyMappyReasons = [
  {
    title: "Speed, accuracy and agility",
    description:
      "The operating mindset across client relationships, assignment execution, and candidate engagement.",
    signals: ["Responsive delivery", "Execution discipline"]
  },
  {
    title: "International assignment expertise",
    description:
      "Experience across international mandates gives Mappy better context for cross-border leadership and specialist searches.",
    signals: ["Global context", "Multi-market hiring"]
  },
  {
    title: "End-to-end partnership",
    description:
      "Clients get a hiring partner that stays close from initial brief through shortlist, offer, and onboarding.",
    signals: ["Stakeholder alignment", "Offer-to-join support"]
  },
  {
    title: "Local market judgment",
    description: "Consultants close to the market bring sharper candidate mapping, outreach, and hiring advice.",
    signals: ["Sharper mapping", "Better candidate fit"]
  }
];

export const approachCards = [
  {
    number: "01",
    title: "Speed without compromise",
    description:
      "Agile search processes are built for quick turnaround without compromising the quality of the shortlist."
  },
  {
    number: "02",
    title: "Precision matching",
    description:
      "Deep sector knowledge and broad networks help surface candidates who fit strategically and culturally, not just on paper."
  },
  {
    number: "03",
    title: "Truly global reach",
    description:
      "Local presence across multiple markets brings sharper insight to international mandates."
  },
  {
    number: "04",
    title: "End-to-end partnership",
    description:
      "From briefing through onboarding, the team works as an extension of HR and leadership stakeholders."
  }
];

export const offices = [
  {
    region: "India — headquarters",
    city: "Mumbai",
    address: "201, Modi House, Bajaj Cross Road, Kandivali West, Mumbai 400067",
    hours: "Monday – Saturday · 10:00 AM – 7:00 PM IST"
  },
  {
    region: "Middle East",
    city: "Dubai",
    address:
      "R. No. 305, Bldg No. 18, Rocky Building, Opp. Strawberry Cafeteria, OPC Area, Bur Dubai, Dubai",
    hours: "Saturday – Wednesday · 10:00 AM – 7:00 PM GST · Thu & Fri closed"
  }
];

export const contactEmail = "hitesh.mapara@mappyresources.com";

export const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Executive search", href: "/services#executive-search" },
      { label: "Key talent recruitment", href: "/services#key-and-niche-talent" },
      { label: "RPO, staffing and pooling", href: "/services#rpo-staffing-and-pooling" },
      { label: "Global expansions", href: "/services#global-expansions" },
      { label: "Mergers and acquisitions", href: "/services#mergers-and-acquisitions" }
    ]
  },
  {
    title: "Industries",
    links: [
      { label: "FMCG and consumer", href: "/industries#fmcg-and-consumer" },
      { label: "Pharma and life sciences", href: "/industries#pharma-and-life-sciences" },
      { label: "Technology and IT", href: "/industries#technology-and-it" },
      { label: "BFSI and fintech", href: "/industries#bfsi-and-fintech" },
      { label: "Manufacturing and infrastructure", href: "/industries#manufacturing-and-infrastructure" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Global reach", href: "/about#reach" },
      { label: "Why Mappy?", href: "/why-mappy" },
      { label: "Contact us", href: "/contact" }
    ]
  }
];

export const tickerItems = [
  "Executive search",
  "Niche recruitment",
  "RPO & staffing",
  "M&A talent advisory",
  "Speed · Accuracy · Agility",
  "India · Middle East"
];

export const legalLinks = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms and conditions", href: "/terms" }
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hiteshmapara", icon: LinkedInIcon },
  // TODO: replace with the real Instagram profile URL.
  { label: "Instagram", href: "https://www.instagram.com/", icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/hitesh.b.mapara", icon: FacebookIcon },
  { label: "X", href: "https://x.com/HiteshMapara", icon: XIcon }
];

// Kelly-style flat UI: square edges, thin rules, uppercase tracked button labels.
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 bg-[#ed6929] px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d85f21]";

export const btnOutline =
  "inline-flex items-center justify-center gap-2 border border-[#2c3272] px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#2c3272] transition-colors hover:bg-[#2c3272] hover:text-white";

export const btnOutlineLight =
  "inline-flex items-center justify-center gap-2 border border-white/60 px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-[#2c3272]";

export const eyebrowClass = "text-xs font-bold uppercase tracking-[0.2em] text-[#ed6929]";

export const heroSignals = [
  {
    title: "Executive search",
    description: "Retained leadership and CxO hiring for competitive international markets.",
    icon: ShieldCheck
  },
  {
    title: "Niche and key talent",
    description: "Hiring across functional, operational, and technology domains where standard searches fall short.",
    icon: Target
  },
  {
    title: "RPO and staffing",
    description: "End-to-end in-house recruitment process support for select growth-focused clients.",
    icon: Users2
  }
];


export const servicePaths = [
  {
    title: "Executive search",
    slug: "executive-search",
    description:
      "Retained by global clients to fulfill leadership and CxO mandates in competitive international markets.",
    points: ["Leadership and CxO focus", "Retained search model", "Critical and confidential mandates"],
    icon: ShieldCheck
  },
  {
    title: "Key and niche talent recruitment",
    slug: "key-and-niche-talent",
    description:
      "Focused hiring for key and niche roles across functional, operational, and technology domains.",
    points: ["Functional roles", "Operational talent", "Technology hiring"],
    icon: Target
  },
  {
    title: "RPO, staffing and pooling",
    slug: "rpo-staffing-and-pooling",
    description:
      "End-to-end in-house recruitment process support for select clients across India and the Middle East.",
    points: ["Embedded recruitment support", "Staffing and talent pooling", "Extension of internal hiring teams"],
    icon: Users2
  },
  {
    title: "Global expansions",
    slug: "global-expansions",
    description:
      "Hiring support for companies meeting ambitious cross-border expansion agendas and building talent in new markets.",
    points: ["Cross-border team builds", "New market hiring", "Global growth support"],
    icon: Globe2
  },
  {
    title: "Mergers and acquisitions",
    slug: "mergers-and-acquisitions",
    description:
      "Talent identification and assessment for critical positions during high-stakes mergers and acquisitions.",
    points: ["Critical role mapping", "Leadership assessment", "Support at pivotal transition moments"],
    icon: Handshake
  }
];

export const specialtyGroups = [
  {
    title: "FMCG and consumer",
    slug: "fmcg-and-consumer",
    roles: ["Sales leadership", "Category talent", "Supply chain hiring"],
    icon: Layers3
  },
  {
    title: "Pharma and life sciences",
    slug: "pharma-and-life-sciences",
    roles: ["Commercial teams", "Life science specialists", "Market-facing roles"],
    icon: BadgeCheck
  },
  {
    title: "Technology and IT",
    slug: "technology-and-it",
    roles: ["Digital capability", "Technology teams", "IT and transformation roles"],
    icon: Sparkles
  },
  {
    title: "BFSI and fintech",
    slug: "bfsi-and-fintech",
    roles: ["Banking talent", "Financial services roles", "Growth and control functions"],
    icon: ShieldCheck
  },
  {
    title: "Manufacturing and infrastructure",
    slug: "manufacturing-and-infrastructure",
    roles: ["Operations hiring", "Plant and project roles", "Cement and infrastructure talent"],
    icon: Building2
  },
  {
    title: "Telecom, logistics and digital media",
    slug: "telecom-logistics-and-digital-media",
    roles: ["Network and operations", "Logistics capability", "Media and digital roles"],
    icon: Rocket
  }
];

export const experienceCards = [
  {
    title: "Structured market mapping",
    description: "Searches start with a sharper view of the market, the adjacencies, and the target talent universe.",
    icon: Compass
  },
  {
    title: "Deeper shortlist calibration",
    description: "Candidates are reviewed for fit, motivation, compensation logic, and stakeholder alignment.",
    icon: BadgeCheck
  },
  {
    title: "Cross-border hiring rhythm",
    description: "Teams stay aligned across time zones with tighter communication and faster decision loops.",
    icon: Globe2
  }
];


