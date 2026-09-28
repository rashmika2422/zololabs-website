export type ServiceType =
  | "AI & Automation"
  | "Custom Software"
  | "Web Applications"
  | "SaaS Development";

export interface IndustryProblem {
  title: string;
  description: string;
}

export interface CustomSolution {
  serviceType: ServiceType;
  title: string;
  description: string;
  deliverables: string[];
}

export interface SolutionDetail {
  slug: "retail" | "hospitality" | "education" | "smes";
  title: string;
  eyebrow: string;
  highlightWord: string;
  heroHeadline: string;
  heroDescription: string;
  industryProblems: IndustryProblem[];
  customSolutions: CustomSolution[];
  ctaText: string;
}

export const serviceTypes: ServiceType[] = [
  "AI & Automation",
  "Custom Software",
  "Web Applications",
  "SaaS Development",
];

const retail: SolutionDetail = {
  slug: "retail",
  title: "Retail",
  eyebrow: "Retail Solutions",
  highlightWord: "in sync",
  heroHeadline: "Every shelf, store, and screen finally in sync.",
  heroDescription:
    "ZoloLabs connects your POS, inventory, and storefronts into one operating picture — so stock counts are true, orders move between channels, and your team stops reconciling spreadsheets while customers wait.",
  industryProblems: [
    {
      title: "Stock truth lives in six places",
      description:
        "The shop floor, the warehouse export, the supplier sheet, and the website each hold a different number. Nobody trusts the count, so you over-order on one line and stock out on another.",
    },
    {
      title: "The POS is an island",
      description:
        "Sales land in a terminal nothing else can read. Daily reporting is re-typed by hand, promotions cannot span channels, and refunds sit outside the ledger.",
    },
    {
      title: "Channels contradict each other",
      description:
        "The website promises next-day delivery on the last unit the local store sold this morning. Click-and-collect, ship-from-store, and returns share no rules.",
    },
    {
      title: "Peak season breaks the process",
      description:
        "Workflows that survive a quiet Tuesday collapse in December. Manual transfers and re-keyed orders become the bottleneck exactly when revenue matters most.",
    },
    {
      title: "Reporting arrives too late",
      description:
        "By the time the weekly margin report is assembled from three systems, the buying decisions it should have informed are already made.",
    },
  ],
  customSolutions: [
    {
      serviceType: "Custom Software",
      title: "POS-integrated stock synchronisation",
      description:
        "A sync layer that keeps the POS, warehouse, e-commerce platform, and accounting ledger on one stock number, with reconciliation your finance team can audit.",
      deliverables: [
        "Two-way POS integration in near real time",
        "Unified stock ledger with a full audit trail",
        "Conflict-resolution rules for simultaneous sales",
        "Failure alerts and automatic retry handling",
      ],
    },
    {
      serviceType: "Web Applications",
      title: "Tailored omnichannel storefront",
      description:
        "A storefront shaped around how your customers actually shop: live local availability, click-and-collect, ship-from-store, and returns resolved in any channel.",
      deliverables: [
        "Brand-tailored storefront experience",
        "Live per-store stock visibility",
        "Click-and-collect and ship-from-store flows",
        "Unified returns and exchange handling",
      ],
    },
    {
      serviceType: "AI & Automation",
      title: "Demand-aware replenishment",
      description:
        "Forecast per-SKU demand by store and channel, then generate replenishment and transfer suggestions automatically — with a human approving anything unusual.",
      deliverables: [
        "Per-store and per-SKU demand forecasts",
        "Automated replenishment and transfer suggestions",
        "Buyer approval queue for exceptions",
        "Seasonal and promotional uplift modelling",
      ],
    },
    {
      serviceType: "SaaS Development",
      title: "Multi-store operations platform",
      description:
        "When off-the-shelf tooling stops fitting, we build the platform you need: one product with per-store configuration, roles, and reporting across the estate.",
      deliverables: [
        "Multi-store tenancy with a shared catalogue",
        "Role-based access for head office and stores",
        "Store and channel performance dashboards",
        "Subscription billing and onboarding flow",
      ],
    },
  ],
  ctaText: "Map your retail stack",
};
const hospitality: SolutionDetail = {
  slug: "hospitality",
  title: "Hospitality",
  eyebrow: "Hospitality Solutions",
  highlightWord: "direct",
  heroHeadline: "Bookings direct, guests served, staff coordinated.",
  heroDescription:
    "We build the guest journey end to end: a booking engine that keeps commission in your pocket, self-service that clears the front-desk queue, and dispatch that tells the right person the room needs attention now.",
  industryProblems: [
    {
      title: "OTAs own the guest relationship",
      description:
        "Commission platforms take the margin and keep the guest data. Your direct channel loses to whichever listing ranks first on price for the same night.",
    },
    {
      title: "The front desk is the bottleneck",
      description:
        "Check-in, requests, room service, and late checkouts all route through one phone and one queue, so guests wait and staff are interrupted mid-task.",
    },
    {
      title: "Maintenance requests disappear",
      description:
        "A broken shower is reported verbally at 9am and rediscovered at 6pm. Nothing is logged, assigned, or timed, so nothing can be measured or prevented.",
    },
    {
      title: "Housekeeping runs on paper",
      description:
        "Room status lives on a printed sheet updated by hand. Anything sold, serviced, or blocked mid-shift leaves the board wrong for the rest of the day.",
    },
    {
      title: "Rates and availability drift",
      description:
        "The website, the channel manager, and the front desk disagree about what is free tonight, and the guest discovers it at the worst possible moment.",
    },
  ],
  customSolutions: [
    {
      serviceType: "Web Applications",
      title: "Direct booking engine",
      description:
        "A fast, brand-owned booking engine with live availability, transparent pricing, and upsells at the moment of commitment — no commission, no rate-parity games.",
      deliverables: [
        "Branded booking engine with live availability",
        "Rate plans, packages, and upsell offers",
        "Secure payment capture and confirmation flow",
        "Direct-booking conversion tracking",
      ],
    },
    {
      serviceType: "AI & Automation",
      title: "Guest self-service automation",
      description:
        "An assistant that handles the repeatable majority — check-in, Wi-Fi, late checkout, extra towels — over web, chat, or WhatsApp, and hands over to staff the moment intent gets ambiguous.",
      deliverables: [
        "Multichannel guest assistant (web, chat, WhatsApp)",
        "Automated check-in and checkout flows",
        "Intent-based escalation to the front desk",
        "Request history attached to each stay",
      ],
    },
    {
      serviceType: "Custom Software",
      title: "Staff dispatch and task routing",
      description:
        "Every request becomes a routed, timed, and verified task — housekeeping, maintenance, or front desk — against the room and the shift it belongs to.",
      deliverables: [
        "Role-based task inbox for each staff member",
        "Housekeeping and maintenance routing rules",
        "SLA timers with automatic escalation",
        "Mobile task completion and sign-off",
      ],
    },
    {
      serviceType: "SaaS Development",
      title: "Property operations platform",
      description:
        "For groups running several properties: one platform for rooms, rates, guests, and staff, with per-property configuration and group-level reporting.",
      deliverables: [
        "Multi-property architecture with shared inventory",
        "Group dashboards for occupancy and revenue",
        "Per-property branding and configuration",
        "Integrations with PMS and channel managers",
      ],
    },
  ],
  ctaText: "Audit your guest journey",
};
const education: SolutionDetail = {
  slug: "education",
  title: "Education",
  eyebrow: "Education Solutions",
  highlightWord: "without the paperwork",
  heroHeadline: "Admissions, portals, and reporting without the paperwork.",
  heroDescription:
    "We build the systems behind the student lifecycle: portals students and parents actually use, onboarding that runs itself, and reporting that gives leadership answers before the board meeting.",
  industryProblems: [
    {
      title: "Enrolment runs on email attachments",
      description:
        "Forms arrive as scans, get re-typed into a spreadsheet, and are chased for weeks. Nobody can say which documents are still missing for which applicant.",
    },
    {
      title: "Students and parents cannot self-serve",
      description:
        "Every timetable question, fee statement, and absence note becomes a phone call to a small admin team that already has a queue.",
    },
    {
      title: "Records are scattered by department",
      description:
        "Admissions, finance, and academics each keep their own copy of the student record, so a student's status depends on who you ask.",
    },
    {
      title: "Reporting is a monthly scramble",
      description:
        "Enrolment, attendance, and fee-collection figures are assembled by hand from three systems, so the numbers arrive stale and arguable.",
    },
    {
      title: "Compliance deadlines arrive as surprises",
      description:
        "Required filings, consent records, and safeguarding evidence live in someone's personal calendar and inbox rather than in a tracked workflow.",
    },
  ],
  customSolutions: [
    {
      serviceType: "Web Applications",
      title: "Student and parent portal",
      description:
        "One portal for timetables, grades, attendance, fee statements, and notices — access-controlled by role and genuinely usable on a phone.",
      deliverables: [
        "Role-based access for students, parents, and staff",
        "Timetables, grades, and attendance views",
        "Fee statements and payment history",
        "Notices, messaging, and absence submission",
      ],
    },
    {
      serviceType: "AI & Automation",
      title: "Automated student onboarding",
      description:
        "Applications move through document collection, verification, and enrolment without manual chasing, with exceptions routed to staff instead of lost in an inbox.",
      deliverables: [
        "Digital application and document intake",
        "Automatic completeness checks and reminders",
        "Verification and approval workflow",
        "Enrolment handoff into the student record",
      ],
    },
    {
      serviceType: "Custom Software",
      title: "Administrative reporting dashboard",
      description:
        "One source of truth across admissions, finance, and academics, with the numbers leadership needs refreshed automatically instead of rebuilt each month.",
      deliverables: [
        "Unified data model across departments",
        "Enrolment, attendance, and fee-collection dashboards",
        "Scheduled reports for leadership and governors",
        "Drill-down from every figure to the record",
      ],
    },
    {
      serviceType: "SaaS Development",
      title: "Multi-school management platform",
      description:
        "For trusts and groups: a multi-school platform covering admissions, student records, staff, and reporting, with per-school branding and central oversight.",
      deliverables: [
        "Multi-school tenancy with central oversight",
        "Admissions, records, and staff management",
        "Per-school branding and configuration",
        "Group-level analytics and rollups",
      ],
    },
  ],
  ctaText: "Review your admissions flow",
};
const smes: SolutionDetail = {
  slug: "smes",
  title: "SMEs",
  eyebrow: "General SMEs",
  highlightWord: "the spreadsheet",
  heroHeadline: "Replace the spreadsheet that runs your business.",
  heroDescription:
    "Most small and mid-sized businesses are held together by a workbook only one person understands. We rebuild those workflows as real systems — owned by you, backed up, and ready to grow.",
  industryProblems: [
    {
      title: "One spreadsheet, one key person",
      description:
        "The business runs on a workbook only one team can open and interpret. Annual leave, resignation, or a corrupted file becomes an operational risk overnight.",
    },
    {
      title: "Copy-paste between six tools",
      description:
        "Quotes, invoices, job sheets, and stock levels move by hand between systems that were never designed to talk to each other.",
    },
    {
      title: "Off-the-shelf software does not fit",
      description:
        "Enterprise tools are too heavy and too expensive to adopt, while entry-level tools cannot model the way you actually operate and quote.",
    },
    {
      title: "Growth breaks the workaround",
      description:
        "The manual process held at ten orders a week and falls over at fifty. Nobody has time to design what replaces it before the next busy period.",
    },
    {
      title: "Nobody can see the whole picture",
      description:
        "Revenue, pipeline, and job status live in separate files, so decisions get made on numbers that were true last week.",
    },
  ],
  customSolutions: [
    {
      serviceType: "Custom Software",
      title: "Bespoke internal ERP or CRM",
      description:
        "A single system that models how your business really runs — customers, jobs, stock, and money — instead of forcing your team into someone else's process.",
      deliverables: [
        "Customer and pipeline management",
        "Jobs, stock, and supplier records",
        "Invoicing tied to the operational record",
        "Role-based access across your team",
      ],
    },
    {
      serviceType: "AI & Automation",
      title: "Scalable workflow automation",
      description:
        "Take the repetitive middle out of quoting, ordering, invoicing, and follow-up — with firm rules where policy is clear and human review where it is not.",
      deliverables: [
        "Automated quoting and order intake",
        "Invoice, reminder, and reconciliation automation",
        "Approval rules and exception handling",
        "Audit trail for every automated action",
      ],
    },
    {
      serviceType: "Web Applications",
      title: "Customer self-service portal",
      description:
        "Give customers one place to request quotes, track jobs, and download documents, so your team stops retyping what the customer already sent.",
      deliverables: [
        "Customer self-service portal",
        "Quote requests and live job tracking",
        "Document and invoice downloads",
        "Integration with your internal system",
      ],
    },
    {
      serviceType: "SaaS Development",
      title: "Spreadsheet rescue and migration",
      description:
        "We take the workbook your business depends on, document the real rules hidden inside it, and rebuild it as a system with validation, permissions, and backups.",
      deliverables: [
        "Audit of existing spreadsheets and business rules",
        "Migration of historical data with validation",
        "Rebuilt workflows with access control",
        "Training and a written operating guide",
      ],
    },
  ],
  ctaText: "Book a systems audit",
};

export const solutions: SolutionDetail[] = [
  retail,
  hospitality,
  education,
  smes,
];

export function getSolution(slug: string): SolutionDetail | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export function getSolutionIndex(slug: string): number {
  return solutions.findIndex((solution) => solution.slug === slug);
}

export function getAdjacentSolutions(slug: string): {
  previous?: SolutionDetail;
  next?: SolutionDetail;
} {
  const index = getSolutionIndex(slug);
  if (index === -1) {
    return {};
  }

  return {
    previous: index > 0 ? solutions[index - 1] : undefined,
    next: index < solutions.length - 1 ? solutions[index + 1] : undefined,
  };
}

export function splitHighlight(
  headline: string,
  highlightWord: string,
): { before: string; match: string; after: string } {
  const index = headline.indexOf(highlightWord);

  if (index === -1) {
    return { before: headline, match: "", after: "" };
  }

  return {
    before: headline.slice(0, index),
    match: highlightWord,
    after: headline.slice(index + highlightWord.length),
  };
}
