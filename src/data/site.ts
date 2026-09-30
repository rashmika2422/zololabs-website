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
    summary: "Systems modelled on how you already work",
    detail:
      "Bespoke internal tools, CRMs and workflow systems that replace the workaround your team built around software that never fitted.",
  },
  {
    name: "Web Applications",
    summary: "Apps your customers and staff actually use",
    detail:
      "Fast, accessible portals, dashboards, booking and ordering flows — measured on the tasks they remove, not the features they list.",
  },
  {
    name: "AI & Automation",
    summary: "Automation for the repetitive middle",
    detail:
      "Document intake, quoting, reconciliation and follow-up handled automatically, with human review wherever judgement or policy matters.",
  },
  {
    name: "SaaS Development",
    summary: "Platforms built to launch and keep growing",
    detail:
      "Multi-tenant products with billing, roles, permissions and reporting, so you can sell the software you used to buy.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery session",
    description:
      "Bring the process that breaks most often. We map the current state, name the real constraint, and agree what success looks like.",
  },
  {
    title: "Written scope and price",
    description:
      "You get a scoped first slice, a fixed price and a delivery plan — before a line of code is written.",
  },
  {
    title: "Build, ship, hand over",
    description:
      "We release in stages, document as we go, and train your team so the system ends up owned by you.",
  },
];

/** Short, factual claims for the hero — no client names, no invented numbers. */
export const proofPoints: { value: string; label: string }[] = [
  { value: "01", label: "Discovery before code" },
  { value: "Fixed", label: "Price, quoted in writing" },
  { value: "Yours", label: "Data and system ownership" },
];
