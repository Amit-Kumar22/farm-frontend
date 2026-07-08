"use client";

import ResourceListPage from "@/components/admin/ResourceListPage";
import TableThumbnail from "@/components/admin/TableThumbnail";
import { businessesApi } from "@/lib/api/businesses";

export default function AdminBusinessesPage() {
  return (
    <ResourceListPage
      title="Businesses"
      queryKey="admin-businesses"
      fetchList={() => businessesApi.adminList()}
      deleteItem={(id) => businessesApi.remove(id)}
      createHref="/admin/businesses/new"
      editHref={(id) => `/admin/businesses/${id}/edit`}
      columns={[
        {
          key: "image",
          label: "Image",
          render: (i) => <TableThumbnail src={i.coverImage} alt={i.title} />,
        },
        { key: "title", label: "Title" },
        { key: "isFeatured", label: "Featured", render: (i) => (i.isFeatured ? "Yes" : "No") },
        { key: "isActive", label: "Active", render: (i) => (i.isActive ? "Yes" : "No") },
        { key: "order", label: "Order" },
      ]}
    />
  );
}
