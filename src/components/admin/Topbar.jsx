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
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-black/5 bg-white px-4 sm:px-6">
      <button onClick={onMenuClick} className="text-forest-deep lg:hidden" aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-forest-deep">{admin?.name}</p>
          <p className="text-xs text-muted">{admin?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100"
          aria-label="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
