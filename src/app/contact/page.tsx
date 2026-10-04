import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowRightIcon } from "@/components/ui/icons";
import "@/components/contact/contact.css";

export const metadata = buildPageMetadata(
  "Contact",
  "Start a conversation with ZoloLabs about your mobile app, web application, business platform or existing product. Tell us what you want to improve.",
  "/contact",
);

const contactEmail = process.env.CONTACT_EMAIL?.trim() || null;
const nextSteps = [
  { title: "We get to know the problem.", description: "We review your idea, your users and what you want to improve." },
  { title: "We talk through the possibilities.", description: "A conversation helps us understand the right direction together." },
  { title: "We define a clear next step.", description: "We align on the scope and approach before development begins." },
];

export default function ContactPage() {
  return (
    <div className="contact-page container">
      <div className="contact-layout">
        <div className="contact-intro">
          <header className="contact-header">
            <p className="eyebrow">Start a conversation</p>
            <h1 className="page-title contact-title">Let’s build<br />something <span>useful.</span></h1>
            <p className="page-lede">Tell us about the problem, product or process you want to improve.</p>
          </header>

          <aside className="contact-next" aria-labelledby="contact-next-heading">
            <h2 id="contact-next-heading">A good project starts with a conversation.</h2>
            <ol>
              {nextSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="contact-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
            <Link href="/solutions" className="text-link">Explore what we build <ArrowRightIcon /></Link>
          </aside>
        </div>
        <ContactForm contactEmail={contactEmail} />
      </div>
    </div>
  );
}
