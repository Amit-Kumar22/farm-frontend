"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Sprout, MessageSquareQuote, Newspaper, Image as ImageIcon, Sliders } from "lucide-react";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { dashboardApi } from "@/lib/api/dashboard";

const cards = [
  { key: "businesses", label: "Businesses", icon: Sprout, href: "/admin/businesses" },
  { key: "testimonials", label: "Testimonials", icon: MessageSquareQuote, href: "/admin/testimonials" },
  { key: "blogPosts", label: "Blog Posts", icon: Newspaper, href: "/admin/blog" },
  { key: "galleryImages", label: "Gallery Images", icon: ImageIcon, href: "/admin/gallery" },
  { key: "heroSlides", label: "Hero Slides", icon: Sliders, href: "/admin/hero-slides" },
];

export default function AdminDashboardPage() {
  const { admin } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard-summary"],
    queryFn: () => dashboardApi.summary(),
  });

  const summary = data?.data || {};

  return (
    <div>
      <h1 className="text-xl font-bold text-forest-deep">
        Welcome back{admin?.name ? `, ${admin.name.split(" ")[0]}` : ""}
      </h1>
      <p className="mt-1 text-sm text-muted">Here&apos;s a quick overview of your content.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ key, label, icon: Icon, href }) => (
          <Link key={key} href={href}>
            <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                <Icon size={22} />
              </span>
              <div>
                <p className="text-2xl font-bold text-forest-deep">
                  {isLoading ? "–" : (summary[key] ?? 0)}
                </p>
                <p className="text-sm text-muted">{label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
