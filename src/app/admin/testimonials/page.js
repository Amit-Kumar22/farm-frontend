"use client";

import ResourceListPage from "@/components/admin/ResourceListPage";
import TableThumbnail from "@/components/admin/TableThumbnail";
import { testimonialsApi } from "@/lib/api/testimonials";

export default function AdminTestimonialsPage() {
  return (
    <ResourceListPage
      title="Testimonials"
      queryKey="admin-testimonials"
      fetchList={() => testimonialsApi.adminList()}
      deleteItem={(id) => testimonialsApi.remove(id)}
      createHref="/admin/testimonials/new"
      editHref={(id) => `/admin/testimonials/${id}/edit`}
      columns={[
        {
          key: "avatar",
          label: "Avatar",
          render: (i) => <TableThumbnail src={i.avatar} alt={i.name} rounded="rounded-full" />,
        },
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "rating", label: "Rating" },
        { key: "isActive", label: "Active", render: (i) => (i.isActive ? "Yes" : "No") },
      ]}
    />
  );
}
