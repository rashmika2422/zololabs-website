import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassObject } from "@/components/ui/GlassObject";
import { ProcessStory } from "./ProcessStory";
export default function Process() {
  return <div className="process-band"><Section id="process" className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20"><SectionHeading eyebrow="From first thought to launch" title="A clear path. A considered product." description="You can stop after discovery or scoping. Nothing gets built until the scope and price are agreed in writing." /><ProcessStory visual={<GlassObject name="decorative/technology-ring.png" className="process-object ring-object" />} /></Section></div>;
}
