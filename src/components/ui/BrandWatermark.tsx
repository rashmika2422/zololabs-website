import Image from "next/image";

/** Decorative brand artwork that never obscures or captures page interactions. */
export function BrandWatermark({ className }: { className: string }) {
  return (
    <div aria-hidden="true" className={`brand-watermark pointer-events-none absolute ${className}`}>
      <Image
        src="/branding/logos/zololabs-mark.png"
        alt=""
        width={130}
        height={139}
        sizes="(min-width: 1024px) 320px, 220px"
        className="h-auto w-full"
      />
    </div>
  );
}
