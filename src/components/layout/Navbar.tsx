import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 relative overflow-hidden border-b border-blue-400/15 bg-[#081426]">
      
      {/* Left light gradient */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[420px] bg-gradient-to-r from-blue-300/25 via-cyan-300/10 to-transparent" />

      <nav className="relative z-10 mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/branding/logo01.png"
            alt="ZoloLabs logo"
            width={180}
            height={50}
            priority
            className="h-auto w-40"
          />
        </Link>

        <div className="flex gap-8">
          <Link
            href="#services"
            className="text-sm text-slate-200 transition hover:text-cyan-300"
          >
            Services
          </Link>

          <Link
            href="#work"
            className="text-sm text-slate-200 transition hover:text-cyan-300"
          >
            Work
          </Link>

          <Link
            href="#about"
            className="text-sm text-slate-200 transition hover:text-cyan-300"
          >
            About
          </Link>

          <Link
            href="#contact"
            className="text-sm text-slate-200 transition hover:text-cyan-300"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}