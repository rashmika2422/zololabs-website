import { MotionGroup, MotionItem } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { proofPoints } from "@/data/site";
import { GlassObject } from "@/components/ui/GlassObject";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { FloatingElement } from "@/components/animations/FloatingElement";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
export default function Hero() {
  return <section className="home-hero relative isolate overflow-hidden">
    <AmbientBackground />
    <div className="hero-composition relative mx-auto w-full max-w-7xl px-6">
      <MotionGroup className="hero-copy">
        <MotionItem as="p" className="text-xs font-semibold tracking-[.2em] text-brand uppercase">Software studio for growing businesses</MotionItem>
        <MotionItem as="h1" className="hero-title mt-6 text-heading">Ideas deserve<br /> room to <span className="hero-heading-gradient">scale.</span></MotionItem>
        <MotionItem as="p" className="mt-7 max-w-lg text-lg leading-8 text-muted">Give your team time back and open new doors. We turn your business ideas into custom software, AI automation, and digital experiences built to help you grow.</MotionItem>
        <MotionItem className="mt-9" contentClassName="flex flex-wrap gap-3"><ButtonLink href="/contact">Start a project <ArrowRightIcon className="h-4 w-4" /></ButtonLink><ButtonLink href="/solutions" variant="secondary">See what we build</ButtonLink></MotionItem>
      </MotionGroup>
      <FloatingElement delay={.55} className="hero-art-entrance">
        <ParallaxLayer className="hero-visual" glow>
          <GlassObject name="hero/hero-glass-sculpture.png" className="main-object" />
          <GlassObject name="decorative/glass-orb.png" className="decoration decoration-orb" />
          <GlassObject name="services/technology-network-orb.png" className="decoration decoration-network" />
          <span className="visual-caption">FROM POSSIBILITY TO PRODUCT</span>
        </ParallaxLayer>
      </FloatingElement>
    </div>
    <MotionGroup className="hero-proof relative mx-auto grid w-full max-w-7xl gap-6 px-6 pb-10 sm:grid-cols-3">{proofPoints.map(point => <MotionItem as="dl" key={point.label}><dt className="text-xs font-semibold tracking-widest text-brand uppercase">{point.value}</dt><dd className="mt-2 text-sm text-muted">{point.label}</dd></MotionItem>)}</MotionGroup>
    <a href="#services" className="scroll-cue" aria-label="Scroll to services">Explore below <span aria-hidden="true">↓</span></a>
  </section>;
}
