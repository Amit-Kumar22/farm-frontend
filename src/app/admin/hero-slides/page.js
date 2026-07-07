"use client";

import ResourceListPage from "@/components/admin/ResourceListPage";
import { heroSlidesApi } from "@/lib/api/heroSlides";

export default function AdminHeroSlidesPage() {
  return (
    <ResourceListPage
      title="Hero Slides"
      queryKey="admin-hero-slides"
      fetchList={() => heroSlidesApi.adminList()}
      deleteItem={(id) => heroSlidesApi.remove(id)}
      createHref="/admin/hero-slides/new"
      editHref={(id) => `/admin/hero-slides/${id}/edit`}
      columns={[
        { key: "title", label: "Title" },
        { key: "isActive", label: "Active", render: (i) => (i.isActive ? "Yes" : "No") },
        { key: "order", label: "Order" },
      ]}
    />
  );
}
