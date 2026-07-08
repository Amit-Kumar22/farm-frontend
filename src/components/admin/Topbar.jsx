"use client";

import { Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/lib/api/auth";

export default function Topbar({ onMenuClick }) {
  const router = useRouter();
  const { admin } = useAuth();

  async function handleLogout() {
    await authApi.logout();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-cream/10 bg-forest-deep px-4 sm:px-6">
      <button onClick={onMenuClick} className="text-cream lg:hidden" aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-cream">{admin?.name}</p>
          <p className="text-xs text-cream/60">{admin?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 text-red-300 hover:bg-red-500/25"
          aria-label="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
