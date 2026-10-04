import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Parallax } from "@/components/animations/Parallax";
import { PointerGlow } from "@/components/animations/PointerGlow";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProductBlueprint } from "./ProductBlueprint";

export default function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <PointerGlow className="hero-light" range={10} data-motion-mobile="true" />
      <div className="container hero-composition">
        <div className="hero-copy">
          <Reveal as="p" className="eyebrow" eager duration={550}>
            Mobile Applications <span>·</span> Business Platforms
          </Reveal>
          <h1 id="hero-title" className="hero-title">
            <TextReveal eager delay={90}>Build Better.</TextReveal>
            {" "}
            <TextReveal eager delay={210}>
              <span className="hero-heading-accent">Operate Smarter.</span>
            </TextReveal>
          </h1>
            <Reveal as="p" className="hero-rotating-text" eager delay={280} aria-label="We build mobile applications, business platforms, and digital products.">
              <span className="hero-type-prefix" aria-hidden="true">WE BUILD</span>
              <span className="hero-type-window" aria-hidden="true">
                <span>Mobile Applications</span>
                <span>Business Platforms</span>
                <span>Digital Products</span>
              </span>
            </Reveal>
            <Reveal as="p" className="hero-description" eager delay={360}>
            ZoloLabs designs and develops modern mobile and web applications and business platforms that help companies simplify operations, connect with customers, and scale.
          </Reveal>
          <Reveal className="hero-actions" eager delay={400}>
            <ButtonLink href="/contact">Start a Project <ArrowRightIcon /></ButtonLink>
            <ButtonLink href="/work" variant="secondary">Explore Our Work <ArrowRightIcon /></ButtonLink>
          </Reveal>
          <Reveal as="p" className="hero-footnote" eager delay={470}>
            <span aria-hidden="true" />Thoughtfully designed. Built to work.
          </Reveal>
        </div>
        <Reveal className="hero-blueprint" eager variant="scale" delay={180} duration={900}>
          <Parallax className="hero-product-parallax" amount={18}>
            <ProductBlueprint />
          </Parallax>
        </Reveal>
      </div>
      <Reveal className="container hero-bottom" eager delay={510}>
        <p>From real problems.<br /><span>To useful products.</span></p>
        <div className="hero-bottom-links">
          <Link href="/solutions#mobile-applications"><span>01 / Mobile & Web Applications</span><ArrowRightIcon /></Link>
          <Link href="/solutions#business-platforms"><span>02 / Business Platforms</span><ArrowRightIcon /></Link>
        </div>
        <a href="#intro" className="hero-scroll" aria-label="Explore ZoloLabs below"><span>Explore below</span><span aria-hidden="true">↓</span></a>
      </Reveal>
    </section>
  );
}
