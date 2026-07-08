"use client";

import { Menu } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-cream/10 bg-forest-deep px-4 sm:px-6">
      <button onClick={onMenuClick} className="text-cream lg:hidden" aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="hidden lg:block" />

      <ProfileMenu />
    </header>
  );
}
