"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Phone } from "lucide-react";
import config from "@/config";
import Container from "../ui/Container";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";

export default function NavbarClient({ siteName, phone, isLoggedIn }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return undefined;

    function onScroll() {
      setScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        transparent ? "bg-transparent" : "border-b border-forest/10 bg-cream/95 backdrop-blur"
      )}
    >
      <Container className="relative flex h-16 items-center justify-between">
        <Link
          href="/"
          className="relative h-14 w-auto flex items-center"
        >
          <Image
            src="/logo.png"
            alt="MainFarm Logo"
            width={500}
            height={150}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {config.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-sm font-medium transition-colors",
                transparent ? "text-cream/90 hover:text-cream" : "text-ink hover:text-forest-deep"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className={clsx(
                "flex items-center gap-2 text-sm font-semibold transition-colors",
                transparent ? "text-cream" : "text-forest-deep"
              )}
            >
              <Phone size={16} />
              {phone}
            </a>
          )}
          <Button href={isLoggedIn ? "/admin" : "/login"} variant="dark">
            {isLoggedIn ? "Admin Panel" : "Login"}
          </Button>
        </div>

        <MobileNav isLoggedIn={isLoggedIn} transparent={transparent} />
      </Container>
    </header>
  );
}
