"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import config from "@/config";
import Button from "../ui/Button";

export default function MobileNav({ isLoggedIn }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-forest-deep"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-20 border-b border-forest/10 bg-cream px-6 py-6 shadow-sm">
          <nav className="flex flex-col gap-4">
            {config.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink hover:text-forest-deep"
              >
                {item.label}
              </Link>
            ))}
            <Button href={isLoggedIn ? "/admin" : "/login"} variant="dark" className="w-fit">
              {isLoggedIn ? "Admin Panel" : "Login"}
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
