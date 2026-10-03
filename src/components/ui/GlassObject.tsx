import Image from "next/image";

/** Existing transparent brand artwork, shared by the hero and service panels. */
export function GlassObject({ name = "hero/hero-glass-sculpture.png", className = "" }: { name?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`glass-object ${className}`}>
      <Image
        src={`/branding/${name}`}
        alt=""
        fill
        sizes={className.includes("service-object") ? "200px" : className.includes("decoration") ? "(max-width: 768px) 100px, 160px" : "(max-width: 768px) 90vw, 560px"}
        preload={className.includes("main-object")}
        className="object-contain"
      />
    </div>
  );
}
