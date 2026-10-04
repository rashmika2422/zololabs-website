import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { services } from "@/data/site";

function ServiceSymbol({ mobile }: { mobile: boolean }) {
  return (
    <svg className="service-symbol" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {mobile ? (
        <>
          <rect x="14" y="5" width="21" height="38" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 10h9M22 38h5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="19" y="17" width="11" height="13" rx="2" fill="currentColor" opacity=".15" />
        </>
      ) : (
        <>
          <rect x="5" y="9" width="38" height="29" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 17h38M15 17v21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 24h16M21 30h10" stroke="currentColor" strokeWidth="1.5" opacity=".55" />
        </>
      )}
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="home-services-band" aria-labelledby="services-title">
      <div className="container home-services section-space">
        <div className="home-section-header">
          <Reveal>
            <p className="eyebrow">Our solutions</p>
            <h2 id="services-title" className="section-heading">What we build.</h2>
          </Reveal>
          <Reveal as="p" variant="fade-left" delay={100}>
            Focused expertise, from the experience<br className="desktop-break" /> in your hand to the systems behind it.
          </Reveal>
        </div>
        <div className="service-grid" data-stagger={110}>
          {services.map((service, index) => (
            <Link href={service.href} key={service.number} className="service-card" data-reveal="scale">
              <div className="service-card-top"><span className="service-number">{service.number}</span><ServiceSymbol mobile={index === 0} /></div>
              <h3>{service.name}</h3>
              <p className="service-summary">{service.summary}</p>
              <p className="service-detail">{service.detail}</p>
              <ul className="service-capabilities">{service.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul>
              <span className="service-link">{service.cta}<ArrowRightIcon /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
