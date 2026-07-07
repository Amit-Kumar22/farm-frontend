"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Sprout,
  MessageSquareQuote,
  Newspaper,
  Image as ImageIcon,
  Sliders,
  Settings,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/businesses", label: "Businesses", icon: Sprout },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/blog", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: Sliders },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ mobile = false, onNavigate }) {
  const pathname = usePathname();

  return (
    <aside
      className={
        mobile
          ? "flex w-64 flex-col bg-forest-deep px-4 py-6 text-cream/80"
          : "hidden w-64 shrink-0 flex-col bg-forest-deep px-4 py-6 text-cream/80 lg:flex"
      }
    >
      <Link
        href="/admin"
        onClick={onNavigate}
        className="mb-8 flex items-center gap-2 px-2 text-lg font-extrabold text-cream"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-forest-deep">
          <Sprout size={18} />
        </span>
        MainFarm
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-gold text-ink" : "hover:bg-cream/10"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
