"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Globe, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/lib/api/auth";
import ConfirmDialog from "./ConfirmDialog";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { admin } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShowLogoutConfirm(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  function handleViewSite() {
    window.open("/", "_blank");
    setIsOpen(false);
  }

  function handleMyProfile() {
    router.push("/admin/profile");
    setIsOpen(false);
  }

  function handleLogoutClick() {
    setShowLogoutConfirm(true);
  }

  async function handleLogoutConfirm() {
    await authApi.logout();
    router.push("/");
    router.refresh();
  }

  function handleLogoutCancel() {
    setShowLogoutConfirm(false);
    setIsOpen(false);
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Profile Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2 rounded-full bg-cream/10 pr-3 transition-all hover:bg-cream/15 focus:outline-none focus:ring-2 focus:ring-gold/50"
          aria-label="Open profile menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold transition-colors group-hover:bg-gold/30">
            <User size={18} strokeWidth={2.5} />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-cream">{admin?.name || "Admin"}</p>
            <p className="text-xs text-cream/60">{admin?.email}</p>
          </div>
          <ChevronDown
            size={16}
            className={`hidden text-cream/60 transition-transform sm:block ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-cream/10 bg-forest-deep shadow-xl"
            role="menu"
            aria-orientation="vertical"
          >
            {/* User Info - Mobile Only */}
            <div className="border-b border-cream/10 px-4 py-3 sm:hidden">
              <p className="text-sm font-semibold text-cream">{admin?.name || "Admin"}</p>
              <p className="text-xs text-cream/60">{admin?.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={handleViewSite}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-cream transition-colors hover:bg-cream/10 focus:bg-cream/10 focus:outline-none"
                role="menuitem"
              >
                <Globe size={18} className="text-cream/70" />
                <span>View Site</span>
              </button>

              <button
                onClick={handleMyProfile}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-cream transition-colors hover:bg-cream/10 focus:bg-cream/10 focus:outline-none"
                role="menuitem"
              >
                <User size={18} className="text-cream/70" />
                <span>My Profile</span>
              </button>

              <div className="my-1 border-t border-cream/10" />

              <button
                onClick={handleLogoutClick}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-300 transition-colors hover:bg-red-500/10 focus:bg-red-500/10 focus:outline-none"
                role="menuitem"
              >
                <LogOut size={18} className="text-red-300" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        open={showLogoutConfirm}
        title="Confirm Logout"
        description="Are you sure you want to logout? You will need to log in again to access the admin panel."
        confirmLabel="Logout"
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
