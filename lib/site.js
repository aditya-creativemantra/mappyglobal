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
  Utensils,
  Cog,
  Car,
  Laptop,
  BarChart,
  Leaf,
  HardHat,
  ShoppingCart,
  HomeIcon,
  Shield,
  Flask,
  LinkedInIcon,
  XIcon,
  FacebookIcon,
  InstagramIcon
} from "@/components/icons";

export const navigation = [
  { label: "Why Mappy?", href: "/why-mappy" },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        title: "Services",
        links: [
          { label: "Permanent Hiring", href: "/services#permanent-hiring" },
          { label: "RPO", href: "/services#rpo" },
          { label: "Contract Staffing", href: "/services#contract-staffing" }
        ]
      },
      {
        title: "Retained Services",
        links: [{ label: "Executive Search", href: "/services#executive-search" }]
      }
    ]
  },
  { label: "Industries", href: "/industries" },
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
      "The operating mindset across client relationships, assignment execution, and candidate engagement. Focusing on responsive delivery & execution discipline."
  },
  {
    title: "Crucial partnership & support",
    description:
      "We take on critical and hard-to-close mandates, bringing focused expertise and access to niche, senior, and specialized talent."
  },
  {
    title: "Talent mapping before hiring",
    description: "We map the talent, before talent map us."
  },
  {
    title: "Market intelligence that improves hiring",
    description:
      "We bring real-time market insight on talent availability, compensation, competition, and hiring timelines."
  },
  {
    title: "Hiring beyond the obvious talent pool",
    description:
      "The best talent isn’t always found in the usual places. We look across industries, markets, and career paths to uncover people with the capabilities your business needs."
  },
  {
    title: "Accountability beyond the shortlist",
    description:
      "From first interaction to final acceptance, we keep candidates and clients aligned, remove roadblocks, and help turn strong prospects into successful hires."
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
  }
];

export const contactEmail = "hitesh.mapara@mappyresources.com";

export const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Permanent Hiring", href: "/services#permanent-hiring" },
      { label: "RPO", href: "/services#rpo" },
      { label: "Contract Staffing", href: "/services#contract-staffing" },
      { label: "Executive Search", href: "/services#executive-search" }
    ]
  },
  {
    title: "Industries",
    links: [
      { label: "FMCG and consumer", href: "/industries" },
      { label: "Pharma and life sciences", href: "/industries" },
      { label: "Technology and IT", href: "/industries" },
      { label: "BFSI and fintech", href: "/industries" },
      { label: "Manufacturing and infrastructure", href: "/industries" }
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
    title: "Permanent Hiring",
    slug: "permanent-hiring",
    href: "/services#permanent-hiring",
    category: "Services",
    headline: "Build your team with talent that lasts.",
    description:
      "Full-time hires across functional, operational, and technology roles \u2014 mapped, screened, and closed against your brief.",
    intro:
      "From specialist professionals to mid and senior leadership, Mappy connects businesses with proven talent who bring the expertise, experience and long-term value needed to grow.",
    image: "/blogthree.jpg",
    imageAlt: "Professionals hired into permanent roles standing together in an office",
    points: [
      "Role briefing and live market mapping",
      "Screened shortlists, not CV dumps",
      "Salary benchmarking for the local market",
      "Offer negotiation and closing support",
      "Replacement cover on every placement"
    ],
    icon: Users2
  },
  {
    title: "RPO",
    slug: "rpo",
    href: "/services#rpo",
    category: "Services",
    headline: "Build your team with recruitment that scales.",
    description:
      "Embedded recruitment teams that run your hiring process end to end, at the volume and pace your roadmap needs.",
    intro:
      "From talent strategy to end-to-end recruitment, Mappy becomes an extension of your business \u2014 bringing the expertise, structure and agility needed to build stronger teams at scale.",
    image: "/blogone.webp",
    imageAlt: "Embedded recruitment team working through a hiring plan",
    types: ["End-to-End RPO", "Project RPO", "Flexible RPO"],
    typesLabel: "RPO types",
    points: [
      "Dedicated recruiters embedded in your team",
      "Process design, ATS hygiene, and reporting",
      "Volume, project, and multi-location hiring",
      "Talent pooling for roles you hire repeatedly",
      "Capacity that scales up or down by quarter"
    ],
    icon: Layers3
  },
  {
    title: "Contract Staffing",
    slug: "contract-staffing",
    href: "/services#contract-staffing",
    category: "Services",
    headline: "Build your workforce with talent that flexes.",
    description:
      "Contract, temporary, and project-based talent \u2014 onboarded quickly, with payroll and compliance handled.",
    intro:
      "From short-term specialists to project-ready professionals, Mappy connects businesses with proven talent who bring the skills, flexibility and speed needed to meet changing workforce demands.",
    image: "/blogtwo.jpg",
    imageAlt: "Contract professionals on assignment in a client workspace",
    points: [
      "Contract and fixed-term placements",
      "Project and interim leadership cover",
      "Payroll, documentation, and compliance handled",
      "Fast turnaround on urgent cover",
      "Contract-to-permanent conversions"
    ],
    icon: Compass
  },
  {
    title: "Executive Search",
    slug: "executive-search",
    href: "/services#executive-search",
    category: "Retained Services",
    headline: "Lead your business with talent that makes an impact.",
    description:
      "Retained leadership and CxO mandates, run confidentially across India, the Middle East, and international markets.",
    intro:
      "From functional leaders to C-suite executives, Mappy connects businesses with exceptional talent who bring the vision, experience and leadership needed to move the business forward.",
    image: "/blogfour.jpg",
    imageAlt: "Senior leaders reviewing a confidential search shortlist",
    points: [
      "Retained, exclusive engagement model",
      "Board, CxO, and senior leadership mandates",
      "Confidential and off-market approaches",
      "Structured assessment and referencing",
      "Discreet handling from brief to onboarding"
    ],
    icon: ShieldCheck
  }
];

// Industry coverage shown on the Industries page. These are labels, not links.
// `wide` cards take the top row; `tint` is the card wash and `accent` the icon.
export const industryTags = [
  {
    name: "FMCG / FMCD",
    segments: ["Food and beverages", "Personal care", "Home and durables"],
    tagline: "Consumer brands that move the world",
    icon: Utensils,
    accent: "#ed6929",
    tint: "#fdf1e9",
    wide: true
  },
  {
    name: "Engineering & Manufacturing",
    segments: ["Plant and operations", "Design and R&D", "Quality and supply chain"],
    tagline: "Building a stronger, smarter tomorrow",
    icon: Cog,
    accent: "#3b6bd4",
    tint: "#ebf1fd",
    wide: true
  },
  {
    name: "Auto / Construction & Farm Equipment",
    segments: ["Automotive", "Construction equipment", "Farm equipment"],
    tagline: "Driving progress across landscapes",
    icon: Car,
    accent: "#2f9e5e",
    tint: "#e9f7ef",
    wide: true
  },
  {
    name: "Tech / Emerging Tech",
    segments: ["Software and platforms", "Data and AI", "Cloud and security"],
    tagline: "Innovations for a connected future",
    icon: Laptop,
    accent: "#7c4ddb",
    tint: "#f2ecfd"
  },
  {
    name: "Fintech",
    segments: ["Payments", "Lending and credit", "Wealth and insurtech"],
    tagline: "Financial solutions for what\u2019s next",
    icon: BarChart,
    accent: "#d6407f",
    tint: "#fdecf3"
  },
  {
    name: "Energy Solution",
    segments: ["Renewables", "Power and utilities", "Energy storage"],
    tagline: "Powering a sustainable tomorrow",
    icon: Leaf,
    accent: "#2f9e5e",
    tint: "#e9f7ef"
  },
  {
    name: "Construction",
    segments: ["Projects and execution", "Real estate development", "Infrastructure"],
    tagline: "People who build better possibilities",
    icon: HardHat,
    accent: "#d99a20",
    tint: "#fdf5e4"
  },
  {
    name: "E-Commerce",
    segments: ["Marketplaces", "D2C brands", "Fulfilment and logistics"],
    tagline: "Scaling digital everyday",
    icon: ShoppingCart,
    accent: "#2f7fd4",
    tint: "#eaf3fd"
  },
  {
    name: "Real Estate",
    segments: ["Residential", "Commercial", "Facilities and advisory"],
    tagline: "Shaping spaces for brighter futures",
    icon: HomeIcon,
    accent: "#d9453b",
    tint: "#fdedec"
  },
  {
    name: "QSR",
    segments: ["Restaurant operations", "Franchise and expansion", "Supply and kitchen"],
    tagline: "Fueling quick moments that matter",
    icon: Shield,
    accent: "#6d4ddb",
    tint: "#efecfd"
  },
  {
    name: "Chemical",
    segments: ["Specialty chemicals", "Petrochemicals", "Process and safety"],
    tagline: "Advancing what\u2019s essential",
    icon: Flask,
    accent: "#189b90",
    tint: "#e6f6f5"
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


