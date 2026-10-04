import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/site";
import { ArrowRightIcon } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand-logo" aria-label="ZoloLabs home">
            <Image src="/branding/logos/zololabs-wordmark.png" alt="ZoloLabs" width={480} height={139} sizes="148px" />
          </Link>
          <p>Mobile and web applications, plus business platforms, built around real business problems.</p>
        </div>
        <nav aria-label="Footer"><ul>{navLinks.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>
        <Link href="/contact" className="footer-contact">Let’s build something useful.<ArrowRightIcon /></Link>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} ZoloLabs. All rights reserved.</p>
        <p>Thoughtfully designed. Carefully engineered.</p>
      </div>
    </footer>
  );
}
