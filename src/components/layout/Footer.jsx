import Link from "next/link";
import config from "@/config";
import { siteSettingsApi } from "@/lib/api/siteSettings";
import Container from "../ui/Container";

export default async function Footer() {
  const res = await siteSettingsApi.get().catch(() => null);
  const settings = res?.data;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-forest-deep text-cream/80">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="mb-3 text-xl font-extrabold text-cream">
            {settings?.siteName || config.siteName}
          </p>
          <p className="text-sm leading-relaxed">
            {settings?.tagline ||
              "Professional, sustainable farming across fish, dairy, vegetables and mushrooms."}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">Explore</p>
          <ul className="space-y-2 text-sm">
            {config.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">
            Working Hours
          </p>
          <p className="text-sm">{settings?.workingHours || "Mon – Sat: 8:00am – 6:00pm"}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">Contact</p>
          <ul className="space-y-2 text-sm">
            {settings?.address && <li>{settings.address}</li>}
            {settings?.phone && <li>{settings.phone}</li>}
            {settings?.email && <li>{settings.email}</li>}
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-cream/60 sm:flex-row">
          <p>
            © {year} {settings?.siteName || config.siteName}. All rights reserved.
          </p>
          <p>{config.domain}</p>
        </Container>
      </div>
    </footer>
  );
}
