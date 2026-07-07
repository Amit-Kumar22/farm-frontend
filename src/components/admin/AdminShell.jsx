"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream-dark/40">
      <Sidebar />

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full w-64">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 z-10 text-cream"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
