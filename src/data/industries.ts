export type ServiceType =
  | "Custom Software"
  | "AI & Automation"
  | "Web Applications"
  | "SaaS Development";

export type IndustryProblem = {
  title: string;
  description: string;
};

export type IndustryBuild = {
  serviceType: ServiceType;
  title: string;
  description: string;
  deliverables: string[];
};

export type Industry = {
  slug: "retail" | "hospitality" | "education" | "smes";
  title: string;
  /** One line used on cards and in the homepage industries grid. */
  summary: string;
  /** Two sentences used to open the industry section on /solutions. */
  intro: string;
  /** The three bottlenecks that matter most — kept to three so pages stay readable. */
  problems: IndustryProblem[];
  /** The three systems we build for the industry. */
  builds: IndustryBuild[];
};

export const serviceTypes: ServiceType[] = [
  "Custom Software",
  "AI & Automation",
  "Web Applications",
  "SaaS Development",
];

const retail: Industry = {
  slug: "retail",
  title: "Retail",
  summary: "POS, stock and storefronts on one version of the truth.",
  intro:
    "ZoloLabs connects your POS, inventory and storefronts into one operating picture — so stock counts are true, orders move between channels, and your team stops reconciling spreadsheets while customers wait.",
  problems: [
    {
      title: "Stock truth lives in six places",
      description:
        "The shop floor, the warehouse export, the supplier sheet and the website each hold a different number, so you over-order on one line and stock out on another.",
    },
    {
      title: "The POS is an island",
      description:
        "Sales land in a terminal nothing else can read. Daily reporting is re-typed by hand, promotions cannot span channels, and refunds sit outside the ledger.",
    },
    {
      title: "Channels contradict each other",
      description:
        "The website promises next-day delivery on the last unit the local store sold this morning. Click-and-collect, ship-from-store and returns share no rules.",
    },
  ],
  builds: [
    {
      serviceType: "Custom Software",
      title: "POS-integrated stock synchronisation",
      description:
        "A sync layer that keeps the POS, warehouse, e-commerce platform and accounting ledger on one stock number, with reconciliation finance can audit.",
      deliverables: [
        "Two-way POS integration in near real time",
        "Unified stock ledger with a full audit trail",
        "Conflict rules for simultaneous sales, plus failure alerts and retries",
      ],
    },
    {
      serviceType: "Web Applications",
      title: "Tailored omnichannel storefront",
      description:
        "A storefront shaped around how your customers actually shop, with live local availability and returns resolved in any channel.",
      deliverables: [
        "Brand-tailored storefront experience",
        "Live per-store stock visibility",
        "Click-and-collect, ship-from-store and unified returns",
      ],
    },
    {
      serviceType: "AI & Automation",
      title: "Demand-aware replenishment",
      description:
        "Forecast per-SKU demand by store and channel, then generate replenishment and transfer suggestions — with a human approving anything unusual.",
      deliverables: [
        "Per-store and per-SKU demand forecasts",
        "Automated replenishment and transfer suggestions",
        "Buyer approval queue and seasonal uplift modelling",
      ],
    },
  ],
};

const hospitality: Industry = {
  slug: "hospitality",
  title: "Hospitality",
  summary: "Direct bookings, faster service, coordinated staff.",
  intro:
    "We build the guest journey end to end: a booking engine that keeps commission in your pocket, self-service that clears the front-desk queue, and dispatch that tells the right person a room needs attention now.",
  problems: [
    {
      title: "OTAs own the guest relationship",
      description:
        "Commission platforms take the margin and keep the guest data, so your direct channel loses to whichever listing prices the same night lower.",
    },
    {
      title: "The front desk is the bottleneck",
      description:
        "Check-in, requests, room service and late checkouts all route through one phone and one queue, so guests wait and staff are interrupted mid-task.",
    },
    {
      title: "Maintenance requests disappear",
      description:
        "A broken shower is reported verbally at 9am and rediscovered at 6pm. Nothing is logged, assigned or timed, so nothing can be measured or prevented.",
    },
  ],
  builds: [
    {
      serviceType: "Web Applications",
      title: "Direct booking engine",
      description:
        "A fast, brand-owned booking engine with live availability, transparent pricing and upsells at the moment of commitment — no commission, no rate-parity games.",
      deliverables: [
        "Branded booking engine with live availability",
        "Rate plans, packages and upsell offers",
        "Secure payment capture and confirmation flow",
      ],
    },
    {
      serviceType: "AI & Automation",
      title: "Guest self-service automation",
      description:
        "An assistant that handles the repeatable majority — check-in, Wi-Fi, late checkout, extra towels — over web, chat or WhatsApp, and hands over the moment intent gets ambiguous.",
      deliverables: [
        "Multichannel guest assistant (web, chat, WhatsApp)",
        "Automated check-in and checkout flows",
        "Intent-based escalation to the front desk",
      ],
    },
    {
      serviceType: "Custom Software",
      title: "Staff dispatch and task routing",
      description:
        "Every request becomes a routed, timed and verified task — housekeeping, maintenance or front desk — against the room and shift it belongs to.",
      deliverables: [
        "Role-based task inbox for each staff member",
        "Housekeeping and maintenance routing rules",
        "SLA timers with escalation, mobile completion and sign-off",
      ],
    },
  ],
};

const education: Industry = {
  slug: "education",
  title: "Education",
  summary: "Admissions, portals and reporting without the paperwork.",
  intro:
    "We build the systems behind the student lifecycle: portals students and parents actually use, onboarding that runs itself, and reporting that gives leadership answers before the board meeting.",
  problems: [
    {
      title: "Enrolment runs on email attachments",
      description:
        "Forms arrive as scans, get re-typed into a spreadsheet and are chased for weeks. Nobody can say which documents are still missing for which applicant.",
    },
    {
      title: "Students and parents cannot self-serve",
      description:
        "Every timetable question, fee statement and absence note becomes a phone call to a small admin team that already has a queue.",
    },
    {
      title: "Records are scattered by department",
      description:
        "Admissions, finance and academics each keep their own copy of the student record, so a student's status depends on who you ask.",
    },
  ],
  builds: [
    {
      serviceType: "Web Applications",
      title: "Student and parent portal",
      description:
        "One portal for timetables, grades, attendance, fee statements and notices — access-controlled by role and genuinely usable on a phone.",
      deliverables: [
        "Role-based access for students, parents and staff",
        "Timetables, grades and attendance views",
        "Fee statements, payment history and absence submission",
      ],
    },
    {
      serviceType: "AI & Automation",
      title: "Automated student onboarding",
      description:
        "Applications move through document collection, verification and enrolment without manual chasing, with exceptions routed to staff instead of lost in an inbox.",
      deliverables: [
        "Digital application and document intake",
        "Automatic completeness checks and reminders",
        "Verification workflow with enrolment handoff",
      ],
    },
    {
      serviceType: "Custom Software",
      title: "Administrative reporting dashboard",
      description:
        "One source of truth across admissions, finance and academics, with the numbers leadership needs refreshed automatically instead of rebuilt each month.",
      deliverables: [
        "Unified data model across departments",
        "Enrolment, attendance and fee-collection dashboards",
        "Scheduled reports with drill-down to every record",
      ],
    },
  ],
};

const smes: Industry = {
  slug: "smes",
  title: "SMEs",
  summary: "Replace the spreadsheet that runs your business.",
  intro:
    "Most small and mid-sized businesses are held together by a workbook only one person understands. We rebuild those workflows as real systems — owned by you, backed up, and ready to grow.",
  problems: [
    {
      title: "One spreadsheet, one key person",
      description:
        "The business runs on a workbook only one team can open and interpret. Annual leave, a resignation or a corrupted file becomes an operational risk overnight.",
    },
    {
      title: "Copy-paste between six tools",
      description:
        "Quotes, invoices, job sheets and stock levels move by hand between systems that were never designed to talk to each other.",
    },
    {
      title: "Off-the-shelf software does not fit",
      description:
        "Enterprise tools are too heavy and expensive to adopt, while entry-level tools cannot model the way you actually operate and quote.",
    },
  ],
  builds: [
    {
      serviceType: "SaaS Development",
      title: "Spreadsheet rescue and migration",
      description:
        "We take the workbook your business depends on, document the real rules hidden inside it, and rebuild it as a system with validation, permissions and backups.",
      deliverables: [
        "Audit of existing spreadsheets and business rules",
        "Migration of historical data with validation",
        "Rebuilt workflows with access control and training",
      ],
    },
    {
      serviceType: "Custom Software",
      title: "Bespoke internal ERP or CRM",
      description:
        "A single system that models how your business really runs — customers, jobs, stock and money — instead of forcing your team into someone else's process.",
      deliverables: [
        "Customer and pipeline management",
        "Jobs, stock and supplier records",
        "Invoicing tied to the operational record",
      ],
    },
    {
      serviceType: "AI & Automation",
      title: "Scalable workflow automation",
      description:
        "Take the repetitive middle out of quoting, ordering, invoicing and follow-up — with firm rules where policy is clear and human review where it is not.",
      deliverables: [
        "Automated quoting and order intake",
        "Invoice, reminder and reconciliation automation",
        "Approval rules, exception handling and audit trail",
      ],
    },
  ],
};

export const industries: Industry[] = [retail, hospitality, education, smes];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function getIndustryServices(industry: Industry): ServiceType[] {
  return serviceTypes.filter((serviceType) =>
    industry.builds.some((build) => build.serviceType === serviceType),
  );
}
