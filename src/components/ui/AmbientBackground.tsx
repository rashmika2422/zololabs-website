import Image from "next/image";

type Atmosphere = "hero" | "light" | "technology" | "work";
/** A small, shared set of atmosphere layers; imagery stays behind readable content. */
export function AmbientBackground({ variant = "hero" }: { variant?: Atmosphere }) {
  const image = { hero: null, light: "backgrounds/light-tech-background.png", technology: "backgrounds/light-tech-background.png", work: "backgrounds/dark-tech-background.png" }[variant];
  return (
    <div aria-hidden="true" className={`ambient-background atmosphere-${variant}`}>
      {image && <Image src={`/branding/${image}`} alt="" fill sizes="100vw" className="atmosphere-image object-cover" />}
      {variant === "hero" && <><i /><i /><i /></>}
    </div>
  );
}
