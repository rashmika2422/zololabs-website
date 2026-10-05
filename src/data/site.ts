export type Service = {
  number: string;
  name: string;
  summary: string;
  detail: string;
  href: string;
  cta: string;
  capabilities: string[];
};
export type ProcessStep = { title: string; description: string };

/** Canonical origin; configure NEXT_PUBLIC_SITE_URL for deployment. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zololabssolutions.com"
).replace(/\/+$/, "");
export const siteName = "ZoloLabs";
export const siteDescription =
  "ZoloLabs is a software development company in Sri Lanka building modern web applications, mobile applications, business platforms, and custom digital solutions.";
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
export const services: Service[] = [
  {
    number: "01",
    name: "Mobile Applications",
    summary: "Mobile and web products designed for customers, teams and growing digital businesses.",
    detail: "From mobile apps to responsive web applications, we build useful experiences around the people who rely on them.",
    href: "/solutions#mobile-applications",
    cta: "Explore Applications",
    capabilities: ["Customer applications", "Marketplace applications", "Booking applications", "Business applications", "Location-based applications", "E-commerce applications", "API-connected applications", "Cross-platform mobile apps", "Responsive web applications"],
  },
  {
    number: "02",
    name: "Business Platforms",
    summary: "Custom platforms that connect operations, customers, data and workflows.",
    detail: "Turn disconnected tools and manual processes into a connected system that gives your team clarity and control.",
    href: "/solutions#business-platforms",
    cta: "Explore Platforms",
    capabilities: ["Booking systems", "Appointment platforms", "Admin dashboards", "Customer management", "Workflow automation", "Analytics", "Internal management systems", "Third-party integrations"],
  },
];
export const principles = [
  { title: "Business First", description: "We begin with the problem, not the technology." },
  { title: "Product Thinking", description: "We design products around real users and measurable business needs." },
  { title: "Modern Engineering", description: "We build maintainable, scalable and reliable systems using modern development practices." },
  { title: "Quality Built In", description: "Testing, review and deployment are part of development—not an afterthought." },
] as const;
export const processSteps: ProcessStep[] = [
  { title: "Discover", description: "Understand the business, users and core problem." },
  { title: "Design", description: "Define the product experience and system architecture." },
  { title: "Develop", description: "Engineer the application using scalable and maintainable technologies." },
  { title: "Test", description: "Validate functionality, usability, performance and reliability." },
  { title: "Deploy", description: "Release the production system through a controlled deployment process." },
  { title: "Support", description: "Maintain and improve the product as the business evolves." },
];
