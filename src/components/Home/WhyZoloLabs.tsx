import { PrincipleStory } from "./PrincipleStory";
import "./storytelling.css";

export default function WhyZoloLabs() {
  return (
    <section className="why-section" aria-labelledby="why-title">
      <div className="container story-section-space principle-story-layout">
        <header className="story-editorial" data-reveal="fade-up">
          <p className="eyebrow">Why ZoloLabs</p>
          <h2 id="why-title" className="section-heading">Built differently.</h2>
          <p className="story-editorial-copy">
            A considered approach. At every stage of the product.
          </p>
          <p className="story-editorial-note">Four principles. One consistent standard.</p>
        </header>
        <PrincipleStory />
      </div>
    </section>
  );
}
