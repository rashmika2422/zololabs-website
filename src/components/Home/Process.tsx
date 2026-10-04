import { ProcessStory } from "./ProcessStory";
import "./storytelling.css";

export default function Process() {
  return (
    <section id="process" className="process-section" aria-labelledby="process-title">
      <div className="container story-section-space process-story-layout">
        <header className="story-editorial" data-reveal="fade-up">
          <p className="eyebrow">How we work</p>
          <h2 id="process-title" className="section-heading">From idea to production.</h2>
          <p className="story-editorial-copy">
            Every step has a purpose. Quality runs through all of them.
          </p>
          <p className="story-editorial-note">A clear path, with room to move forward.</p>
        </header>
        <ProcessStory />
      </div>
    </section>
  );
}
