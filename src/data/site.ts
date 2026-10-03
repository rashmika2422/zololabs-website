export type Service = {
  name: string;
  summary: string;
  detail: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

/**
 * Canonical origin used for metadata, OG tags, robots and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL in .env.local before deploying to your own domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zololabs.com"
).replace(/\/+$/, "");

export const siteName = "ZoloLabs";

export const siteDescription =
  "ZoloLabs is a software studio building custom software, AI automation, web applications and SaaS platforms for retail, hospitality, education and growing SMEs.";

/** Primary navigation. Four destinations keeps the site scannable. */
export const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const;

/** The four things we build. Mirrors the service types used on solutions. */
export const services: Service[] = [
  {
    name: "Custom Software",
    summary: "Systems built for your workflows",
    detail:
      "Bespoke internal tools and workflow systems designed for how your team operates, replacing clunky spreadsheets and workarounds.",
  },
  {
    name: "Web Applications",
    summary: "Apps people actually want to use",
    detail:
      "Fast, accessible portals, dashboards, and booking flows built to remove friction and save time for your staff and customers.",
  },
  {
    name: "AI & Automation",
    summary: "Automate the repetitive tasks",
    detail:
      "Handle document intake, quoting, and follow-ups automatically. Keep humans in the loop only when judgement is required.",
  },
  {
    name: "SaaS Development",
    summary: "Platforms built to scale",
    detail:
      "Multi-tenant products complete with billing, roles, and reporting. We help you turn your internal tools into a sellable product.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery session",
    description:
      "We map your current processes, pinpoint the real bottlenecks, and align on clear success metrics before any development starts.",
  },
  {
    title: "Written scope and price",
    description:
      "Receive a detailed project scope, a fixed price, and a clear delivery plan before writing a single line of code.",
  },
  {
    title: "Build, ship, hand over",
    description:
      "We deliver in stages, document everything, and train your team to ensure you fully own the final product.",
  },
];

/** Short, factual claims for the hero — no client names, no invented numbers. */
export const proofPoints: { value: string; label: string }[] = [
  { value: "01", label: "Discovery before code" },
  { value: "Fixed", label: "Price, quoted in writing" },
  { value: "Yours", label: "Data and system ownership" },
];
