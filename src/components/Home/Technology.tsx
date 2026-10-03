import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { GlassObject } from "@/components/ui/GlassObject";
import { MotionGroup, MotionItem } from "@/components/ui/Motion";
import { FloatingElement } from "@/components/animations/FloatingElement";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function Technology() {
  return (
    <section aria-labelledby="technology-heading" className="technology-section relative isolate overflow-hidden">
      <AmbientBackground variant="technology" />
      <div className="technology-composition mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <FloatingElement><ParallaxLayer scroll><GlassObject name="services/digital-network.png" className="technology-object" /></ParallaxLayer></FloatingElement>
        <MotionGroup>
          <MotionItem as="p" className="text-xs font-semibold tracking-[.2em] text-brand uppercase">Connected by design</MotionItem>
          <MotionItem><h2 id="technology-heading" className="mt-5 text-4xl font-semibold tracking-tight text-heading sm:text-5xl">Less friction.<br />More possibility.</h2></MotionItem>
          <MotionItem as="p" className="mt-6 max-w-md text-base leading-8 text-muted">Custom software, AI automation, and connected systems that bring your tools and workflows together. Built around the way your business runs.</MotionItem>
          <MotionItem className="mt-8"><ButtonLink href="/solutions" variant="secondary">Explore our solutions <ArrowRightIcon className="h-4 w-4" /></ButtonLink></MotionItem>
        </MotionGroup>
      </div>
    </section>
  );
}
