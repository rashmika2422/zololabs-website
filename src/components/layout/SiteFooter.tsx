import Image from "next/image";
import Link from "next/link";
import { navLinks, contactDetails } from "@/data/site";
import { ArrowRightIcon } from "@/components/ui/icons";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 8h3V4.5c-.52-.07-2.3-.22-4.42-.22-4.18 0-7.04 2.55-7.04 7.23V15H1v4h4.54v10h4.57V19h3.82l.61-4h-4.43v-3.1C10.11 10.74 10.43 8 14 8Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M15.5 3c.3 2.45 1.7 3.9 4.5 4.05v3.1c-1.63.16-3.06-.37-4.45-1.3v5.8c0 7.37-8.03 9.67-11.27 4.39-2.08-3.4-.81-9.38 5.87-9.62v3.27c-.54.09-1.11.23-1.64.41-1.57.52-2.46 1.5-2.21 3.23.48 3.31 6.55 4.29 6.05-2.18V3h3.15Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .7C5.73.7.65 5.78.65 12.05c0 5.02 3.25 9.28 7.76 10.78.57.1.77-.25.77-.55v-2.17c-3.15.68-3.82-1.34-3.82-1.34-.51-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.44.11-3 0 0 .95-.31 3.12 1.16a10.77 10.77 0 0 1 5.68 0c2.17-1.47 3.12-1.16 3.12-1.16.62 1.56.23 2.71.11 3 .73.8 1.17 1.81 1.17 3.05 0 4.36-2.66 5.32-5.19 5.6.41.35.77 1.05.77 2.12v3.16c0 .3.21.66.78.55 4.5-1.5 7.75-5.76 7.75-10.78C23.35 5.78 18.27.7 12 .7Z" />
    </svg>
  );
}

function ContactLink({
  href,
  label,
  title,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  title: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="footer-contact-item"
      {...(external
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
    >
      <span className="footer-contact-icon">{icon}</span>

      <span className="footer-contact-copy">
        <span className="footer-contact-label">{title}</span>
        <span className="footer-contact-value">{label}</span>
      </span>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        {/* BRAND */}
        <div className="footer-brand">
          <Link href="/" className="brand-logo" aria-label="ZoloLabs home">
            <Image
              src="/branding/logos/zololabs-wordmark.png"
              alt="ZoloLabs"
              width={480}
              height={139}
              sizes="170px"
            />
          </Link>

          <p>
            Mobile and web applications, plus business platforms, built around
            real business problems.
          </p>

          <Link href="/contact" className="footer-cta">
            Let&apos;s build something useful.
            <ArrowRightIcon />
          </Link>
        </div>

        {/* NAVIGATION */}
        <div className="footer-nav-column">
          <p className="footer-title">EXPLORE</p>

          <nav aria-label="Footer">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* CONTACT */}
        <div className="footer-contact-details">
          <p className="footer-title">CONTACT</p>

          <div className="footer-primary-contacts">
            <ContactLink
              href={contactDetails.email.href}
              label={contactDetails.email.label}
              title="Email"
              icon={<MailIcon />}
            />

            {contactDetails.phones.map((phone, index) => (
              <ContactLink
                key={phone.href}
                href={phone.href}
                label={phone.label}
                title={`Phone ${index + 1}`}
                icon={<PhoneIcon />}
              />
            ))}
          </div>

          <div className="footer-socials">
            <ContactLink
              href={contactDetails.socials.instagram.href}
              label={contactDetails.socials.instagram.label}
              title="Instagram"
              icon={<InstagramIcon />}
              external
            />

            <ContactLink
              href={contactDetails.socials.facebook.href}
              label={contactDetails.socials.facebook.label}
              title="Facebook"
              icon={<FacebookIcon />}
              external
            />

            <ContactLink
              href={contactDetails.socials.tiktok.href}
              label={contactDetails.socials.tiktok.label}
              title="TikTok"
              icon={<TikTokIcon />}
              external
            />

            <ContactLink
              href={contactDetails.socials.github.href}
              label={contactDetails.socials.github.label}
              title="GitHub"
              icon={<GithubIcon />}
              external
            />
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} ZoloLabs. All rights reserved.</p>
        <p>Thoughtfully designed. Carefully engineered.</p>
      </div>
    </footer>
  );
}