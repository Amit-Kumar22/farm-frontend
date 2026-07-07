import Link from "next/link";
import { cookies } from "next/headers";
import { Sprout, Phone } from "lucide-react";
import config from "@/config";
import { siteSettingsApi } from "@/lib/api/siteSettings";
import Container from "../ui/Container";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";

export default async function Navbar() {
  const [cookieStore, settingsRes] = await Promise.all([
    cookies(),
    siteSettingsApi.get().catch(() => null),
  ]);
  const isLoggedIn = cookieStore.has(config.cookieName);
  const settings = settingsRes?.data;

  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-cream/95 backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-forest-deep">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-forest-deep">
            <Sprout size={18} strokeWidth={2.5} />
          </span>
          {settings?.siteName || config.siteName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {config.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink hover:text-forest-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-forest-deep"
            >
              <Phone size={16} />
              {settings.phone}
            </a>
          )}
          <Button href={isLoggedIn ? "/admin" : "/login"} variant="dark">
            {isLoggedIn ? "Admin Panel" : "Login"}
          </Button>
        </div>

        <MobileNav isLoggedIn={isLoggedIn} />
      </Container>
    </header>
  );
}
