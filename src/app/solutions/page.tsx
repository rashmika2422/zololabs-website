import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger } from "@/components/animations/Stagger";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata(
  "Solutions",
  "Mobile and web applications and custom business platforms designed around customer experiences, operational needs and opportunities for growth.",
  "/solutions",
);

const solutions = [
  {
    number: "01",
    id: "mobile-applications",
    title: "Mobile & Web Applications",
    headline: "Bring your business closer to the people who use it.",
    description:
      "We build mobile apps and web applications around the way your customers and teams work. From the first interaction to the everyday tasks that matter, each experience is designed to be useful, intuitive and connected to your business.",
    detail:
      "Whether you are creating a mobile app, a browser-based product or a tool for your team, we help define the right experience, connect it with your existing systems and build a reliable foundation for what comes next.",
    capabilities: [
      "Customer applications",
      "Responsive web applications",
      "Marketplace applications",
      "Booking applications",
      "Business applications",
      "E-commerce experiences",
      "Location-based applications",
      "API integrations",
      "Cross-platform development",
    ],
    outcomes: [
      "Reach customers on mobile and web",
      "Digitize service delivery",
      "Simplify customer interactions",
      "Connect with existing systems",
    ],
  },
  {
    number: "02",
    id: "business-platforms",
    title: "Business Platforms",
    headline: "Connect the work. Create room to grow.",
    description:
      "Disconnected spreadsheets, manual processes and fragmented tools make everyday work harder than it needs to be. We develop custom platforms that bring your operations, customers, data and workflows into one connected system.",
    detail:
      "Built around your actual processes, a business platform gives your team a clearer view of the work and a simpler way to manage it. We focus on the workflows that matter first, with a foundation that can evolve with the business.",
    capabilities: [
      "Booking and appointment systems",
      "Customer management systems",
      "Admin dashboards",
      "Internal management platforms",
      "Workflow automation",
      "Service management systems",
      "Analytics dashboards",
      "Third-party integrations",
    ],
    outcomes: [
      "Replace repetitive manual processes",
      "Create a clearer view of operations",
      "Connect teams and customer journeys",
      "Build around your business workflows",
    ],
  },
] as const;

export default function SolutionsPage() {
  return (
    <div className="internal-page solutions-page">
      <PageHeader
        eyebrow="Our solutions"
        title={<>Digital products built for how businesses <span>actually work.</span></>}
        description="ZoloLabs designs mobile and web applications and business platforms around real operational needs, customer experiences and opportunities for growth."
      >
        <ButtonLink href="/contact">Start a Project <ArrowRightIcon /></ButtonLink>
        <Link href="#mobile-applications" className="text-link">Explore our solutions <span aria-hidden="true">↓</span></Link>
      </PageHeader>

      <div className="container">
        <nav className="solution-jump-links" aria-label="Solutions on this page">
          {solutions.map((solution) => (
            <a href={`#${solution.id}`} key={solution.id}>
              <span>{solution.number}</span>{solution.title}<span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>

        {solutions.map((solution) => (
          <section className="solution-detail" id={solution.id} key={solution.id} aria-labelledby={`${solution.id}-title`}>
            <Reveal className="solution-detail-heading">
              <span className="solution-number">{solution.number}</span>
              <h2 id={`${solution.id}-title`}>{solution.title}</h2>
            </Reveal>
            <div className="solution-detail-grid">
              <Reveal className="solution-detail-copy" delay={60}>
                <h3>{solution.headline}</h3>
                <p>{solution.description}</p>
                <p>{solution.detail}</p>
                <div className="solution-outcomes">
                  <p className="eyebrow">What this makes possible</p>
                  <ul>
                    {solution.outcomes.map((outcome) => <li key={outcome}><span aria-hidden="true">↗</span>{outcome}</li>)}
                  </ul>
                </div>
                <Link href="/contact" className="text-link">Talk about your project <ArrowRightIcon /></Link>
              </Reveal>
              <Reveal className="solution-capabilities" variant="fade-left" delay={100}>
                <p className="eyebrow">What we can build</p>
                <Stagger as="ul" step={45}>{solution.capabilities.map((capability) => <li key={capability} data-reveal>{capability}<span aria-hidden="true">+</span></li>)}</Stagger>
                <p className="solution-capability-note">The right scope starts with your business needs.</p>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section className="internal-cta" aria-labelledby="solutions-cta-title">
        <Reveal className="container internal-cta-inner">
          <div><p className="eyebrow">A useful place to start</p><h2 id="solutions-cta-title">Tell us what you&apos;re<br />trying to improve.</h2></div>
          <ButtonLink href="/contact">Start a Project <ArrowRightIcon /></ButtonLink>
        </Reveal>
      </section>
    </div>
  );
}
