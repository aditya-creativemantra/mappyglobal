"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

function ArrowRight(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function BadgeCheck(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m12 3 2.2 2.1 3-.3.9 2.9 2.7 1.4-1 2.8 1 2.8-2.7 1.4-.9 2.9-3-.3L12 21l-2.2-2.1-3 .3-.9-2.9-2.7-1.4 1-2.8-1-2.8L5.9 7l.9-2.9 3 .3Z" />
      <path d="m8.7 12.2 2.1 2.1 4.5-4.6" />
    </svg>
  );
}

function Building2(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 21V7l6-3 6 3v14" />
      <path d="M4 21h16" />
      <path d="M9 10h.01" />
      <path d="M9 13h.01" />
      <path d="M9 16h.01" />
      <path d="M15 10h.01" />
      <path d="M15 13h.01" />
      <path d="M15 16h.01" />
    </svg>
  );
}

function Compass(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8" />
      <path d="m15.5 8.5-2.3 6.2-6.2 2.3 2.3-6.2 6.2-2.3Z" />
    </svg>
  );
}

function Globe2(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function Handshake(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m10 11 2 2a2 2 0 0 0 2.8 0l3.7-3.7" />
      <path d="m14 9 1.6-1.6a2 2 0 0 1 2.8 0l2.1 2.1" />
      <path d="m10 11-1.9 1.9a2 2 0 0 1-2.8 0L3 10.6" />
      <path d="m8 9-1.6-1.6a2 2 0 0 0-2.8 0L1.5 9.5" />
      <path d="m7 14 2 2" />
      <path d="m10 15 1.5 1.5" />
      <path d="m13 15 1.5 1.5" />
    </svg>
  );
}

function Layers3(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </svg>
  );
}

function Rocket(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 19c2.5-1.2 4.1-2.8 5-5l5-5c1.8-1.8 2.2-4.4 2.4-6.5-2.1.2-4.7.6-6.5 2.4l-5 5c-2.2.9-3.8 2.5-5 5Z" />
      <path d="M15 9h.01" />
      <path d="M5 19l-1 4 4-1" />
    </svg>
  );
}

function ShieldCheck(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m12 3 7 3v6c0 4.6-2.7 7.8-7 9-4.3-1.2-7-4.4-7-9V6l7-3Z" />
      <path d="m9.3 12.3 1.9 1.9 3.8-4.1" />
    </svg>
  );
}

function Sparkles(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3Z" />
      <path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
      <path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
    </svg>
  );
}

function Target(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8v4l3 3" />
    </svg>
  );
}

function Users2(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
      <path d="M16 4.1a3 3 0 0 1 0 5.8" />
    </svg>
  );
}

function ChevronDown(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function GridDots(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="5" cy="5" r="1.6" />
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="19" cy="5" r="1.6" />
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
      <circle cx="5" cy="19" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
      <circle cx="19" cy="19" r="1.6" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

const countryOptions = [
  { label: "India", href: "#contact" },
  { label: "United States", href: "#contact" },
  { label: "Canada", href: "#contact" },
  { label: "United Kingdom", href: "#contact" },
  { label: "Middle East", href: "#contact" },
  { label: "Africa", href: "#contact" }
];

const navigation = [
  { label: "Home", href: "#top" },
  {
    label: "Recruitment solutions",
    href: "#solutions",
    columns: [
      {
        title: "Acquire talent",
        links: [
          { label: "Executive search", href: "#solutions" },
          { label: "Key and niche talent recruitment", href: "#solutions" },
          { label: "RPO, staffing and pooling", href: "#solutions" },
          { label: "Talent pooling and mapping", href: "#solutions" }
        ]
      },
      {
        title: "Grow globally",
        links: [
          { label: "Global expansions", href: "#solutions" },
          { label: "Mergers and acquisitions", href: "#solutions" },
          { label: "Cross-border team builds", href: "#why-mappy" },
          { label: "New market hiring", href: "#why-mappy" }
        ]
      },
      {
        title: "Why partner with us",
        links: [
          { label: "International assignment expertise", href: "#why-mappy" },
          { label: "End-to-end partnership", href: "#why-mappy" },
          { label: "Local market judgment", href: "#why-mappy" }
        ],
        feature: { label: "All recruitment solutions", href: "#solutions" }
      }
    ]
  },
  {
    label: "Industries",
    href: "#industries",
    columns: [
      {
        title: "Consumer and health",
        links: [
          { label: "FMCG and consumer", href: "#industries" },
          { label: "Pharma and life sciences", href: "#industries" },
          { label: "Retail and distribution", href: "#industries" }
        ]
      },
      {
        title: "Technology and finance",
        links: [
          { label: "Technology and IT", href: "#industries" },
          { label: "BFSI and fintech", href: "#industries" },
          { label: "Digital media", href: "#industries" }
        ]
      },
      {
        title: "Industrial and infrastructure",
        links: [
          { label: "Manufacturing and infrastructure", href: "#industries" },
          { label: "Telecom and logistics", href: "#industries" },
          { label: "Cement and projects", href: "#industries" }
        ],
        feature: { label: "All industries", href: "#industries" }
      }
    ]
  },
  {
    label: "Insights",
    href: "#insights",
    columns: [
      {
        title: "Hiring trends",
        links: [
          { label: "Global presence", href: "#insights" },
          { label: "Consistent delivery", href: "#insights" },
          { label: "International hiring experience", href: "#insights" }
        ]
      },
      {
        title: "By the numbers",
        links: [
          { label: "Markets and reach", href: "#insights" },
          { label: "Sector depth", href: "#industries" },
          { label: "Leadership placements", href: "#solutions" }
        ]
      },
      {
        title: "Working with Mappy",
        links: [
          { label: "Structured market mapping", href: "#approach" },
          { label: "Shortlist calibration", href: "#approach" },
          { label: "Cross-border hiring rhythm", href: "#approach" }
        ],
        feature: { label: "All insights", href: "#insights" }
      }
    ]
  },
  {
    label: "About Mappy",
    href: "#approach",
    columns: [
      {
        title: "Who we are",
        links: [
          { label: "Our approach", href: "#approach" },
          { label: "Why Mappy", href: "#why-mappy" },
          { label: "Global reach", href: "#industries" }
        ]
      },
      {
        title: "How we work",
        links: [
          { label: "Speed without compromise", href: "#approach" },
          { label: "Precision matching", href: "#approach" },
          { label: "End-to-end partnership", href: "#approach" }
        ]
      },
      {
        title: "Talk to us",
        links: [
          { label: "Contact the team", href: "#contact" },
          { label: "Start a search", href: "#contact" }
        ],
        feature: { label: "Contact Mappy", href: "#contact" }
      }
    ]
  }
];

const heroSignals = [
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

const insightCards = [
  {
    eyebrow: "Global presence",
    title: "Connected consultants across key hiring markets",
    description:
      "Young, nimble teams with offices and active networks across India, North America, the United Kingdom, and the Middle East.",
    imageSrc: "/images/mappy-consultation.png",
    imageAlt: "Consultation meeting for a leadership search",
    imageClassName: "object-[55%_center]"
  },
  {
    eyebrow: "Consistent delivery",
    title: "Trusted for critical mandates",
    description:
      "A strong delivery track record in executive and specialist hiring keeps the business positioned as a dependable search partner.",
    imageSrc: "/images/mappy-hero-team.png",
    imageAlt: "Mappy Global Resources team in a client meeting",
    imageClassName: "object-[58%_center]"
  },
  {
    eyebrow: "Assignment expertise",
    title: "International hiring experience across continents",
    description:
      "Cross-border assignment exposure across the USA, UK, Canada, Southeast Asia, the Middle East, and Africa.",
    imageSrc: "/images/mappy-leadership.png",
    imageAlt: "Senior leadership conversation in a premium office",
    imageClassName: "object-[60%_center]"
  },
  {
    eyebrow: "Sector depth",
    title: "Multi-industry presence that scales with need",
    description:
      "Coverage spans FMCG, pharma, technology, infrastructure, digital, BFSI, telecom, logistics, and adjacent sectors.",
    imageSrc: "/images/mappy-consultation.png",
    imageAlt: "Consultative hiring discussion across sectors",
    imageClassName: "object-[42%_center]"
  }
];

const proofStats = [
  {
    value: "5+",
    label: "countries",
    detail: "Active offices and consultant networks across major hiring markets",
    icon: Globe2,
    badge: "Active markets"
  },
  {
    value: "15+",
    label: "industries",
    detail: "Sector coverage spanning consumer, pharma, technology, infrastructure, and more",
    icon: Layers3,
    badge: "Sector depth"
  },
  {
    value: "CxO",
    label: "placements",
    detail: "Leadership and executive hiring capability for business-critical roles",
    icon: ShieldCheck,
    badge: "Leadership focus"
  },
  {
    value: "3+",
    label: "continents",
    detail: "North America, Europe, the Middle East, and South Asia talent access",
    icon: Compass,
    badge: "Cross-border reach"
  }
];

const whyMappyCards = [
  {
    title: "Speed, accuracy and agility",
    description: "The operating mindset across client relationships, assignment execution, and candidate engagement.",
    icon: Compass,
    signals: ["Responsive delivery", "Execution discipline"]
  },
  {
    title: "International assignment expertise",
    description:
      "Experience across international mandates gives Mappy better context for cross-border leadership and specialist searches.",
    icon: Globe2,
    signals: ["Global context", "Multi-market hiring"]
  },
  {
    title: "End-to-end partnership",
    description: "Clients get a hiring partner that stays close from initial brief through shortlist, offer, and onboarding.",
    icon: Handshake,
    signals: ["Stakeholder alignment", "Offer-to-join support"]
  },
  {
    title: "Local market judgment",
    description: "Consultants close to the market bring sharper candidate mapping, outreach, and hiring advice.",
    icon: BadgeCheck,
    signals: ["Sharper mapping", "Better candidate fit"]
  }
];

const servicePaths = [
  {
    title: "Executive search",
    description:
      "Retained by global clients to fulfill leadership and CxO mandates in competitive international markets.",
    points: ["Leadership and CxO focus", "Retained search model", "Critical and confidential mandates"],
    icon: ShieldCheck
  },
  {
    title: "Key and niche talent recruitment",
    description:
      "Focused hiring for key and niche roles across functional, operational, and technology domains.",
    points: ["Functional roles", "Operational talent", "Technology hiring"],
    icon: Target
  },
  {
    title: "RPO, staffing and pooling",
    description:
      "End-to-end in-house recruitment process support for select clients in India and the USA.",
    points: ["Embedded recruitment support", "Staffing and talent pooling", "Extension of internal hiring teams"],
    icon: Users2
  },
  {
    title: "Global expansions",
    description:
      "Hiring support for companies meeting ambitious cross-border expansion agendas and building talent in new markets.",
    points: ["Cross-border team builds", "New market hiring", "Global growth support"],
    icon: Globe2
  },
  {
    title: "Mergers and acquisitions",
    description:
      "Talent identification and assessment for critical positions during high-stakes mergers and acquisitions.",
    points: ["Critical role mapping", "Leadership assessment", "Support at pivotal transition moments"],
    icon: Handshake
  }
];

const specialtyGroups = [
  {
    title: "FMCG and consumer",
    roles: ["Sales leadership", "Category talent", "Supply chain hiring"],
    icon: Layers3
  },
  {
    title: "Pharma and life sciences",
    roles: ["Commercial teams", "Life science specialists", "Market-facing roles"],
    icon: BadgeCheck
  },
  {
    title: "Technology and IT",
    roles: ["Digital capability", "Technology teams", "IT and transformation roles"],
    icon: Sparkles
  },
  {
    title: "BFSI and fintech",
    roles: ["Banking talent", "Financial services roles", "Growth and control functions"],
    icon: ShieldCheck
  },
  {
    title: "Manufacturing and infrastructure",
    roles: ["Operations hiring", "Plant and project roles", "Cement and infrastructure talent"],
    icon: Building2
  },
  {
    title: "Telecom, logistics and digital media",
    roles: ["Network and operations", "Logistics capability", "Media and digital roles"],
    icon: Rocket
  }
];

const experienceCards = [
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

const approachCards = [
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

const reachTags = ["India", "USA", "Canada", "United Kingdom", "Middle East", "Africa"];

const footerColumns = [
  {
    title: "Solutions",
    items: [
      "Executive search",
      "Key talent recruitment",
      "RPO, staffing and pooling",
      "Global expansions",
      "Mergers and acquisitions"
    ]
  },
  {
    title: "Industries",
    items: [
      "FMCG and consumer",
      "Pharma and life sciences",
      "Technology and IT",
      "BFSI and fintech",
      "Manufacturing and infrastructure"
    ]
  },
  {
    title: "Global reach",
    items: ["India", "USA", "Canada", "United Kingdom", "Middle East", "Africa"]
  }
];

const interactiveCardClass = "";
const interactivePanelClass = "";
const interactiveMediaClass = "";
const interactiveIconClass = "";
const interactiveIconInverseClass = "";
const interactiveArrowClass = "";
const interactiveChipClass = "";
const interactiveBadgeClass = "";
const interactiveButtonClass = "";

function SectionHeading({ eyebrow, title, description, className = "" }) {
  return (
    <div className={className} data-section-heading>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ed6929] sm:text-sm">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#16204a] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
    </div>
  );
}

export default function MappyHomepage() {
  const rootRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  const closeAll = () => {
    setOpenMenu(null);
    setCountryOpen(false);
    setMobileOpen(false);
    setMobileSection(null);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeMenu = navigation.find((item) => item.label === openMenu && item.columns);

  useEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        defaults: {
          duration: 0.85,
          ease: "power3.out"
        }
      });

      heroTimeline
        .from("[data-header]", { y: -24, autoAlpha: 0, duration: 0.7 })
        .from("[data-orb]", { scale: 0.82, autoAlpha: 0, stagger: 0.16, duration: 1 }, 0.05)
        .from("[data-hero-eyebrow]", { y: 20, autoAlpha: 0, duration: 0.6 }, 0.18)
        .from("[data-hero-title]", { y: 34, autoAlpha: 0, duration: 0.82 }, 0.28)
        .from("[data-hero-copy]", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.4)
        .from("[data-hero-actions]", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.5)
        .from("[data-hero-signal]", { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.64 }, 0.58)
        .from("[data-hero-visual]", { x: 36, autoAlpha: 0, scale: 0.985, duration: 0.9 }, 0.34)
        .from("[data-hero-overlay]", { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.65 }, 0.76);

      gsap.utils.toArray("[data-section]").forEach((section) => {
        const heading = section.querySelector("[data-section-heading]");
        const panels = section.querySelectorAll("[data-reveal-panel]");
        const groups = section.querySelectorAll("[data-reveal-group]");

        if (heading) {
          gsap.from(heading, {
            y: 36,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true
            }
          });
        }

        panels.forEach((panel) => {
          gsap.from(panel, {
            y: 26,
            autoAlpha: 0,
            duration: 0.72,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 84%",
              once: true
            }
          });
        });

        groups.forEach((group) => {
          const items = Array.from(group.children).filter((child) => child.nodeType === 1);

          if (!items.length) {
            return;
          }

          gsap.from(items, {
            y: 30,
            autoAlpha: 0,
            duration: 0.72,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              once: true
            }
          });
        });
      });

      media.add("(min-width: 1024px)", () => {
        gsap.utils.toArray("[data-parallax]").forEach((node) => {
          const amount = Number(node.getAttribute("data-parallax")) || 6;
          const trigger = node.closest("[data-parallax-wrap]") || node;

          gsap.to(node, {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1
            }
          });
        });
      });
    }, rootRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={rootRef} id="top" className="relative overflow-hidden bg-white">
      <div data-orb className="brand-orb absolute left-[-6rem] top-20 h-60 w-60 rounded-full bg-[#2a3170]/8 blur-3xl" />
      <div data-orb className="brand-orb absolute right-[-8rem] top-12 h-72 w-72 rounded-full bg-[#ed6929]/8 blur-3xl [animation-delay:3s]" />

      <header data-header className="sticky top-0 z-50 bg-white">
        <div className="border-b border-[#e3e1dd] bg-[#f2f1ef]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
            <div className="relative">
              <button
                type="button"
                aria-expanded={countryOpen}
                onClick={() => {
                  setOpenMenu(null);
                  setCountryOpen((value) => !value);
                }}
                className="flex items-center gap-2 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#16204a] transition-colors hover:text-[#ed6929]"
              >
                <Globe2 className="h-4 w-4" />
                Select your country
                <ChevronDown className={`h-3 w-3 transition-transform ${countryOpen ? "rotate-180" : ""}`} />
              </button>

              {countryOpen ? (
                <div className="absolute left-0 top-full z-50 w-60 border border-[#e3e1dd] bg-white py-2 shadow-[0_18px_40px_-24px_rgba(22,32,74,0.45)]">
                  {countryOptions.map((country) => (
                    <a
                      key={country.label}
                      href={country.href}
                      onClick={closeAll}
                      className="block px-4 py-2 text-sm text-[#26315f] transition-colors hover:bg-[#f7f9fc] hover:text-[#ed6929]"
                    >
                      {country.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            <a
              href="#contact"
              onClick={closeAll}
              className="hidden py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#26315f] transition-colors hover:text-[#ed6929] sm:block"
            >
              Looking for a role?
            </a>
          </div>
        </div>

        <div className="relative border-b border-[#edf0f6] bg-white" onMouseLeave={() => setOpenMenu(null)}>
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4 lg:px-8">
            <a href="#top" onClick={closeAll} className="flex items-center">
              <Image
                src="/brand/mappy-logo.png"
                alt="Mappy Global Resources logo"
                width={240}
                height={43}
                className="h-9 w-auto"
                priority
              />
            </a>

            <nav className="hidden flex-1 items-center gap-1 xl:flex">
              {navigation.map((item) =>
                item.columns ? (
                  <button
                    key={item.label}
                    type="button"
                    aria-expanded={openMenu === item.label}
                    onMouseEnter={() => {
                      setCountryOpen(false);
                      setOpenMenu(item.label);
                    }}
                    onClick={() => setOpenMenu((value) => (value === item.label ? null : item.label))}
                    className={`flex items-center gap-2 rounded-sm border px-3 py-2 text-[15px] font-medium transition-colors ${
                      openMenu === item.label
                        ? "border-[#ed6929] text-[#ed6929]"
                        : "border-transparent text-[#16204a] hover:text-[#ed6929]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => setOpenMenu(null)}
                    onClick={closeAll}
                    className="rounded-sm border border-transparent px-3 py-2 text-[15px] font-medium text-[#16204a] transition-colors hover:text-[#ed6929]"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            <a
              href="https://mappyglobalresources.com/contact.html"
              className="ml-auto hidden items-center border border-[#16204a] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#16204a] transition-colors hover:bg-[#16204a] hover:text-white xl:inline-flex"
            >
              Contact us
            </a>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setCountryOpen(false);
                setMobileOpen((value) => !value);
              }}
              className="ml-auto inline-flex h-11 w-11 items-center justify-center border border-[#dfe4ef] text-[#16204a] transition-colors hover:border-[#16204a] xl:hidden"
            >
              {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>

          {activeMenu ? (
            <div className="absolute inset-x-0 top-full hidden border-b border-[#edf0f6] bg-white shadow-[0_24px_48px_-30px_rgba(22,32,74,0.45)] xl:block">
              <div className="mx-auto grid max-w-7xl grid-cols-3 gap-x-14 px-6 py-12 lg:px-8">
                {activeMenu.columns.map((column) => (
                  <div key={column.title}>
                    <p className="border-b border-[#d7dce8] pb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#16204a]">
                      {column.title}
                    </p>
                    <ul className="mt-6 space-y-4">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={closeAll}
                            className="text-[17px] leading-7 text-[#26315f] transition-colors hover:text-[#ed6929]"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {column.feature ? (
                      <a
                        href={column.feature.href}
                        onClick={closeAll}
                        className="mt-7 inline-flex items-center gap-3 text-[17px] text-[#16204a] transition-colors hover:text-[#ed6929]"
                      >
                        <GridDots className="h-4 w-4 text-[#ed6929]" />
                        {column.feature.label}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {mobileOpen ? (
          <div className="border-b border-[#edf0f6] bg-white xl:hidden">
            <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
              {navigation.map((item) =>
                item.columns ? (
                  <div key={item.label} className="border-b border-[#eef1f7] py-1">
                    <button
                      type="button"
                      aria-expanded={mobileSection === item.label}
                      onClick={() => setMobileSection((value) => (value === item.label ? null : item.label))}
                      className="flex w-full items-center justify-between py-3 text-left text-base font-semibold text-[#16204a]"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`}
                      />
                    </button>

                    {mobileSection === item.label ? (
                      <div className="pb-4">
                        {item.columns.map((column) => (
                          <div key={column.title} className="mt-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b93ab]">
                              {column.title}
                            </p>
                            <ul className="mt-3 space-y-3">
                              {column.links.map((link) => (
                                <li key={link.label}>
                                  <a
                                    href={link.href}
                                    onClick={closeAll}
                                    className="text-[15px] text-[#26315f] transition-colors hover:text-[#ed6929]"
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeAll}
                    className="block border-b border-[#eef1f7] py-4 text-base font-semibold text-[#16204a]"
                  >
                    {item.label}
                  </a>
                )
              )}

              <a
                href="https://mappyglobalresources.com/contact.html"
                onClick={closeAll}
                className="mt-6 inline-flex w-full items-center justify-center border border-[#16204a] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#16204a] transition-colors hover:bg-[#16204a] hover:text-white"
              >
                Contact us
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <section className="relative overflow-hidden border-b border-[#edf0f6] bg-white">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,rgba(42,49,112,0.08),transparent_46%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="relative z-10 max-w-2xl">
            <p data-hero-eyebrow className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ed6929] sm:text-sm">
              Global recruitment agency
            </p>

            <h1
              data-hero-title
              className="mt-6 max-w-[12ch] font-display text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-[#16204a] sm:text-6xl lg:text-[4.7rem]"
            >
              Connecting exceptional talent with the world&apos;s best employers.
            </h1>

            <p data-hero-copy className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Speed, accuracy, and agility at every stage of the talent journey, with partnerships spanning three
              continents to find leaders and specialist talent that move the needle.
            </p>

            <div data-hero-actions className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                className={`h-12 rounded-full bg-[#ed6929] px-6 text-sm text-white hover:bg-[#d85f21] ${interactiveButtonClass}`}
              >
                <a href="https://mappyglobalresources.com/contact.html">
                  Start a search
                  <ArrowRight className={`h-4 w-4 ${interactiveArrowClass}`} />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className={`h-12 rounded-full border-[#d7dff1] bg-white px-6 text-sm text-[#16204a] hover:bg-[#f6f8fc] ${interactiveButtonClass}`}
              >
                <a href="#solutions">Explore solutions</a>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroSignals.map(({ title, description, icon: Icon }) => (
                <Card
                  key={title}
                  data-hero-signal
                  className={`rounded-[1.7rem] border border-[#e5e9f3] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${interactiveCardClass}`}
                >
                  <CardContent className="p-5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5f7fc] text-[#16204a] ${interactiveIconInverseClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-base font-semibold text-[#16204a]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div data-hero-visual className="relative lg:pl-4">
            <div className={`rounded-[2.5rem] border border-[#eef1f7] bg-white p-3 shadow-[0_32px_80px_rgba(15,23,42,0.08)] sm:p-4 ${interactivePanelClass}`}>
              <div data-parallax-wrap className="relative overflow-hidden rounded-[2rem]">
                <Image
                  data-parallax="8"
                  src="/images/mappy-hero-team.png"
                  alt="Mappy Global Resources team in a client meeting"
                  width={1740}
                  height={904}
                  className={`h-[430px] w-full object-cover object-[58%_center] sm:h-[520px] ${interactiveMediaClass}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(18,27,72,0.58)_0%,rgba(18,27,72,0.14)_58%,rgba(237,105,41,0.08)_100%)]" />
              </div>

              <div
                data-hero-overlay
                className="absolute right-0 top-8 rounded-[1.8rem] border border-[#e5e9f3] bg-white px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_50px_rgba(15,23,42,0.12)] sm:right-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ed6929]">Global reach</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#16204a]">3+ continents</p>
              </div>

              <div
                data-hero-overlay
                className="absolute bottom-0 left-0 right-0 rounded-[2rem] border border-[#eef1f7] bg-white p-5 shadow-[0_22px_50px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:translate-y-1 group-hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)] sm:bottom-6 sm:left-6 sm:right-6 sm:p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ed6929]">Market access</p>
                <p className="mt-3 max-w-lg text-2xl font-semibold leading-tight text-[#16204a]">
                  Hiring access across multiple regions, sectors, and time zones.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {reachTags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border border-[#dbe2f1] bg-[#f8faff] px-3 py-1.5 text-xs font-medium text-[#26315f] ${interactiveChipClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="insights" data-section className="bg-[#f7f9fc] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Hiring trends and insights"
              title="A cleaner, more structured way to tell the Mappy story."
              description="The same approved content now sits inside a whiter, more modular homepage with clearer section pacing, more images, and a more modern professional-services feel."
              className="max-w-3xl"
            />

            <div
              data-reveal-panel
              className={`max-w-md rounded-[1.8rem] border border-[#e5e9f3] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${interactiveCardClass}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ed6929] sm:text-sm">Reference direction</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                White canvas, simpler card structure, stronger image support, and typography that feels closer to the
                Robert Half homepage the team liked.
              </p>
            </div>
          </div>

          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {insightCards.map((item) => (
              <Card
                key={item.title}
                className={`overflow-hidden rounded-[2rem] border border-[#e5e9f3] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${interactiveCardClass}`}
              >
                <div data-parallax-wrap className="relative overflow-hidden">
                  <Image
                    data-parallax="5"
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={1792}
                    height={1024}
                    className={`h-52 w-full object-cover ${item.imageClassName} ${interactiveMediaClass}`}
                  />
                </div>
                <CardContent className="p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ed6929]">{item.eyebrow}</p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#16204a]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#16204a] transition-colors duration-300 group-hover:text-[#ed6929]">
                    <span>Discover more</span>
                    <ArrowRight className={`h-4 w-4 ${interactiveArrowClass}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="why-mappy" data-section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Mappy"
            title="Global delivery with local market judgment."
            description="Mappy operates with a clear obsession for speed, accuracy, and agility across client relationships, assignment execution, and candidate engagement."
            className="max-w-3xl"
          />

          <div data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {proofStats.map(({ value, label, detail, icon: Icon, badge }) => (
              <Card key={label} className={`rounded-[1.9rem] border border-[#e5e9f3] bg-white shadow-[0_16px_34px_rgba(15,23,42,0.04)] ${interactiveCardClass}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f7fc] text-[#16204a] ${interactiveIconInverseClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-[#dce2f0] bg-[#f8faff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#26315f] transition-colors duration-300 group-hover:border-[#ed6929]/30 group-hover:bg-[#fff7f2]">
                      {badge}
                    </span>
                  </div>
                  <p className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[#16204a]">{value}</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ed6929]">{label}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.98fr)] lg:items-start">
            <div
              data-reveal-panel
              data-parallax-wrap
              className="relative overflow-hidden rounded-[2.6rem] border border-[#e7ebf3] bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-4"
            >
              <div className="relative overflow-hidden rounded-[2rem]">
                <Image
                  data-parallax="6"
                  src="/images/mappy-consultation.png"
                  alt="Consultative hiring discussion with business stakeholders"
                  width={1792}
                  height={1024}
                  className="h-[430px] w-full object-cover object-[54%_center] sm:h-[520px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,27,72,0.06)_0%,rgba(18,27,72,0.22)_46%,rgba(18,27,72,0.72)_100%)]" />
                <div className="absolute right-5 top-5 hidden gap-3 sm:flex">
                  <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/90 px-3 py-2 text-xs font-semibold text-[#16204a] shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                    <BadgeCheck className="h-4 w-4 text-[#ed6929]" />
                    Stakeholder alignment
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/90 px-3 py-2 text-xs font-semibold text-[#16204a] shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                    <Globe2 className="h-4 w-4 text-[#ed6929]" />
                    Global execution
                  </div>
                </div>
                <div className="absolute inset-x-5 bottom-5 rounded-[1.8rem] border border-white/14 bg-[#16204a]/82 p-5 shadow-[0_24px_55px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ed6929]">Client partnership</p>
                  <p className="mt-3 max-w-[18ch] text-[1.95rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.2rem]">
                    Search conversations grounded in market context, stakeholder alignment, and global execution.
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/72">
                    Early alignment on the brief, market map, and delivery rhythm keeps critical searches sharper from
                    the first conversation.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white px-3 py-1.5 text-xs font-semibold text-[#26315f] shadow-[0_10px_24px_rgba(15,23,42,0.16)]">
                      <Target className="h-3.5 w-3.5 text-[#ed6929]" />
                      Market mapping
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white px-3 py-1.5 text-xs font-semibold text-[#26315f] shadow-[0_10px_24px_rgba(15,23,42,0.16)]">
                      <Handshake className="h-3.5 w-3.5 text-[#ed6929]" />
                      Client collaboration
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white px-3 py-1.5 text-xs font-semibold text-[#26315f] shadow-[0_10px_24px_rgba(15,23,42,0.16)]">
                      <Compass className="h-3.5 w-3.5 text-[#ed6929]" />
                      Search precision
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal-group className="grid gap-4">
              {whyMappyCards.map(({ title, description, icon: Icon, signals }) => (
                <Card key={title} className={`rounded-[1.8rem] border border-[#e5e9f3] bg-white shadow-[0_16px_34px_rgba(15,23,42,0.04)] ${interactiveCardClass}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5f7fc] text-[#16204a] ${interactiveIconInverseClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#16204a]">{title}</h3>
                          <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
                        </div>
                      </div>
                      <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dce2f0] text-[#16204a] transition-all duration-300 group-hover:border-[#ed6929]/30 group-hover:bg-[#fff7f2] sm:flex">
                        <ArrowRight className={`h-4 w-4 ${interactiveArrowClass}`} />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {signals.map((signal) => (
                        <span
                          key={signal}
                          className={`inline-flex items-center gap-2 rounded-full border border-[#dce2f0] bg-[#f8faff] px-3 py-1.5 text-xs font-semibold text-[#26315f] ${interactiveChipClass}`}
                        >
                          <BadgeCheck className="h-3.5 w-3.5 text-[#ed6929]" />
                          {signal}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" data-section className="bg-[#f7f9fc] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Help you hire, your way"
            title="End-to-end recruitment at global scale."
            description="From executive search to niche hiring, embedded recruitment support, expansions, and M&A talent work, Mappy&apos;s offering is built around critical talent needs."
            className="max-w-3xl"
          />

          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {servicePaths.map(({ title, description, points, icon: Icon }, index) => (
              <Card
                key={title}
                className={`rounded-[2rem] border border-[#e5e9f3] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${interactiveCardClass} ${
                  index === 0 ? "xl:col-span-2" : ""
                }`}
              >
                <div className="h-1.5 origin-left bg-[linear-gradient(90deg,#16204a,#ed6929)] transition-transform duration-300 group-hover:scale-x-[1.01]" />
                <CardContent className="p-7">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16204a] text-white ${interactiveIconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-[#16204a]">{title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {points.map((point) => (
                      <div
                        key={point}
                        className={`rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm leading-6 text-[#26315f] ${interactiveChipClass}`}
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" data-section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center">
            <div
              data-reveal-panel
              data-parallax-wrap
              className={`relative overflow-hidden rounded-[2.6rem] border border-[#e7ebf3] bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-4 ${interactivePanelClass}`}
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
                <div className="relative overflow-hidden rounded-[2rem]">
                  <Image
                    data-parallax="6"
                    src="/images/mappy-leadership.png"
                    alt="Leadership discussion in a premium office"
                    width={1668}
                    height={960}
                    className={`h-[420px] w-full object-cover object-[58%_center] ${interactiveMediaClass}`}
                  />
                </div>
                <div className="grid gap-4">
                  <div className="relative overflow-hidden rounded-[1.8rem]">
                    <Image
                      src="/images/mappy-consultation.png"
                      alt="Consultation meeting for executive hiring"
                      width={1792}
                      height={1024}
                      className={`h-[200px] w-full object-cover object-[60%_center] ${interactiveMediaClass}`}
                    />
                  </div>
                  <div className="rounded-[1.8rem] bg-[#16204a] p-5 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb48c]">Skilled talent for the job</p>
                    <p className="mt-3 text-xl font-semibold leading-tight">
                      Capability coverage across the sectors that matter most.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Skilled talent for the job"
                title="Industry expertise across every vertical."
                description="Fifteen-plus sectors and growing. Wherever talent is critical, Mappy brings the context, access, and search discipline to deliver."
              />

              <div data-reveal-group className="mt-10 grid gap-4">
                {specialtyGroups.slice(0, 3).map(({ title, roles, icon: Icon }) => (
                  <Card key={title} className={`rounded-[1.8rem] border border-[#e5e9f3] bg-white shadow-[0_16px_34px_rgba(15,23,42,0.04)] ${interactiveCardClass}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5f7fc] text-[#16204a] ${interactiveIconInverseClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="w-full">
                          <h3 className="text-xl font-semibold text-[#16204a]">{title}</h3>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {roles.map((role) => (
                              <span
                                key={role}
                                className={`rounded-full border border-[#dce2f0] bg-[#f8faff] px-3 py-1.5 text-xs font-medium text-[#26315f] ${interactiveChipClass}`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-section className="bg-[#f7f9fc] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
            <SectionHeading
              eyebrow="Experience that delivers"
              title="Structured hiring support from brief to onboarding."
              description="The delivery model combines fast turnaround, deeper matching, global reach, and close partnership throughout the talent journey."
              className="max-w-2xl"
            />

            <div data-reveal-group className="grid gap-4 sm:grid-cols-3">
              {experienceCards.map(({ title, description, icon: Icon }) => (
                <Card key={title} className={`rounded-[1.8rem] border border-[#e5e9f3] bg-white shadow-[0_16px_34px_rgba(15,23,42,0.04)] ${interactiveCardClass}`}>
                  <CardContent className="p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16204a] text-white ${interactiveIconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#16204a]">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Add specialized talent across your organization"
            title="Role-focused coverage across the functions you need most."
            description="The same sector coverage now appears in a more scannable, more modular layout that can easily expand into dedicated service or industry pages later."
            className="max-w-3xl"
          />

          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {specialtyGroups.map(({ title, roles, icon: Icon }) => (
              <Card key={title} className={`rounded-[2rem] border border-[#e5e9f3] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${interactiveCardClass}`}>
                <CardContent className="p-7">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5f7fc] text-[#16204a] ${interactiveIconInverseClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#16204a]">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Specialist recruitment support shaped around live market context and priority roles.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <span
                        key={role}
                        className={`rounded-full border border-[#dce2f0] bg-[#f8faff] px-3 py-1.5 text-xs font-medium text-[#26315f] ${interactiveChipClass}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" data-section className="bg-[#f7f9fc] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Approach"
            title="Speed, precision, reach, and partnership."
            description="Mappy&apos;s approach is designed to move quickly without losing shortlist quality, context, or stakeholder confidence."
            className="max-w-3xl"
          />

          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {approachCards.map((item) => (
              <Card key={item.number} className={`rounded-[2rem] border border-[#e5e9f3] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${interactiveCardClass}`}>
                <CardContent className="p-7">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[#ed6929] text-lg font-semibold text-white ${interactiveIconClass}`}>
                    {item.number}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-[#16204a]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" data-section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`grid gap-8 rounded-[2.6rem] border border-[#e5e9f3] bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:p-10 ${interactivePanelClass}`}>
            <div data-reveal-panel className="rounded-[2rem] bg-[#16204a] p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb48c] sm:text-sm">Start the conversation</p>
              <h2 className="mt-4 max-w-[14ch] font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                Ready to find your next great hire?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/78">
                Let&apos;s talk about your talent challenge. Mappy&apos;s consultants work across time zones to
                understand the brief and move quickly on critical mandates.
              </p>
            </div>

            <div className="grid gap-6">
              <div
                data-reveal-panel
                data-parallax-wrap
                className={`relative overflow-hidden rounded-[2rem] border border-[#e7ebf3] bg-[#f7f9fc] p-3 sm:p-4 ${interactiveCardClass}`}
              >
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  <Image
                    data-parallax="5"
                    src="/images/mappy-hero-team.png"
                    alt="Mappy Global Resources team in a collaborative meeting"
                    width={1740}
                    height={904}
                    className={`h-64 w-full object-cover object-[56%_center] sm:h-72 ${interactiveMediaClass}`}
                  />
                </div>
              </div>

              <div data-reveal-panel className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className={`h-12 rounded-full bg-[#ed6929] px-6 text-sm text-white hover:bg-[#d85f21] ${interactiveButtonClass}`}
                >
                  <a href="https://mappyglobalresources.com/contact.html">
                    Connect with us
                    <ArrowRight className={`h-4 w-4 ${interactiveArrowClass}`} />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`h-12 rounded-full border-[#d7dff1] bg-white px-6 text-sm text-[#16204a] hover:bg-[#f6f8fc] ${interactiveButtonClass}`}
                >
                  <a href="#top">Back to top</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer data-section className="border-t border-[#edf0f6] bg-[#f7f9fc] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div data-reveal-panel className="max-w-xl">
              <Image
                src="/brand/mappy-logo.png"
                alt="Mappy Global Resources logo"
                width={240}
                height={43}
                className="h-10 w-auto"
              />
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Partnering in your critical and niche talent needs with executive search, specialist recruitment, RPO
                support, and cross-border hiring capability.
              </p>
            </div>

            <div data-reveal-group className="grid gap-8 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16204a]">{column.title}</p>
                  <div className="mt-4 space-y-3">
                    {column.items.map((item) => (
                      <p key={item} className="text-sm text-slate-600">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
