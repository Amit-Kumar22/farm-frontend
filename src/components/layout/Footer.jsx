import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import { siteSettingsApi } from "@/lib/api/siteSettings";
import Container from "../ui/Container";

export default async function Footer() {
  const res = await siteSettingsApi.get().catch(() => null);
  const settings = res?.data;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-forest-deep text-cream/80">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Logo and Tagline - Takes more space */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/logo.png"
                alt="MainFarm Logo"
                width={180}
                height={60}
                className="h-16 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-sm leading-relaxed text-cream/70 max-w-xs">
              {settings?.tagline ||
                "Professional, sustainable farming across fish, dairy, vegetables and mushrooms."}
            </p>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {config.nav.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-cream/80 transition-colors hover:text-cream hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Working Hours
            </h3>
            <p className="text-sm text-cream/80 leading-relaxed">
              {settings?.workingHours || "Mon – Sat: 8:00am – 6:00pm"}
            </p>
          </div>

          {/* Address */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Address
            </h3>
            <div className="space-y-1.5 text-sm leading-relaxed text-cream/80">
              <p className="font-semibold text-cream mb-2">MAI Integrated Farm</p>
              <p>Near R.K International School,</p>
              <p>R.K Puram, Ward No. 1</p>
              <p>Dinara Nagar Panchayat,</p>
              <p>District – Rohtas</p>
              <p>Bihar – 802213</p>
              {settings?.phone && (
                <p className="mt-3 text-gold-light">
                  <span className="font-medium">Phone:</span> {settings.phone}
                </p>
              )}
              {settings?.email && (
                <p className="text-gold-light">
                  <span className="font-medium">Email:</span> {settings.email}
                </p>
              )}
            </div>
          </div>
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
