import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import config from "@/config";
import { siteSettingsApi } from "@/lib/api/siteSettings";
import Container from "../ui/Container";

const SOCIAL_ICONS = {
  facebook: (
    <path d="M13.5 9.5H15V6.7h-1.8c-2 0-3.4 1.6-3.4 3.6v1.7H8v2.8h1.8V21h2.8v-6.2h2l.4-2.8h-2.4v-1.4c0-.6.3-1.1 1-1.1Z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.6" cy="7.4" r="0.9" />
    </>
  ),
  twitter: (
    <path d="M4.5 4.5 11 13l-6.4 7h1.9l5.4-5.9 4.2 5.9H20l-6.8-9.6L19 4.5h-1.9l-5 5.4-3.8-5.4H4.5Z" />
  ),
  linkedin: (
    <path d="M4.7 9.2h2.6v10.3H4.7V9.2Zm1.3-4.2a1.5 1.5 0 1 1 0 3.1 1.5 1.5 0 0 1 0-3.1ZM10 9.2h2.5v1.4h.04c.35-.65 1.2-1.4 2.5-1.4 2.66 0 3.16 1.7 3.16 3.9v6.4h-2.6v-5.7c0-1.35-.02-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8H10V9.2Z" />
  ),
};

export default async function Footer() {
  const res = await siteSettingsApi.get().catch(() => null);
  const settings = res?.data;
  const year = new Date().getFullYear();

  const socialLinks = Object.entries(settings?.socialLinks || {}).filter(
    ([key, href]) => href && SOCIAL_ICONS[key]
  );

  return (
    <footer className="mt-20 bg-forest-deep text-cream/80">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="MainFarm Logo"
                width={160}
                height={54}
                className="h-12 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {settings?.tagline ||
                "Professional, sustainable farming across fish, dairy, vegetables and mushrooms."}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex items-center gap-2.5">
                {socialLinks.map(([key, href]) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={key}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                      {SOCIAL_ICONS[key]}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {config.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/75 transition-colors hover:text-cream hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-cream/75">
              <li>{settings?.workingHours || "Mon – Sat: 8:00am – 6:00pm"}</li>
              {settings?.phone && (
                <li className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-gold" />
                  <span>{settings.phone}</span>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-2">
                  <Mail size={14} className="shrink-0 text-gold" />
                  <span className="break-all">{settings.email}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Address */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
              Address
            </h3>
            <address className="text-sm not-italic leading-relaxed text-cream/75">
              <p className="mb-1 font-semibold text-cream">MAI Integrated Farm</p>
              <p>Near R.K International School, R.K Puram,</p>
              <p>Ward No. 1, Dinara Nagar Panchayat,</p>
              <p>District – Rohtas, Bihar – 802213</p>
            </address>
          </div>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-cream/55 sm:flex-row">
          <p>
            © {year} {settings?.siteName || config.siteName}. All rights reserved.
          </p>
          <p>{config.domain}</p>
        </Container>
      </div>
    </footer>
  );
}
