"use client";

import ResourceListPage from "@/components/admin/ResourceListPage";
import TableThumbnail from "@/components/admin/TableThumbnail";
import { galleryApi } from "@/lib/api/gallery";

export default function AdminGalleryPage() {
  return (
    <ResourceListPage
      title="Gallery"
      queryKey="admin-gallery"
      fetchList={() => galleryApi.adminList()}
      deleteItem={(id) => galleryApi.remove(id)}
      createHref="/admin/gallery/new"
      editHref={(id) => `/admin/gallery/${id}/edit`}
      columns={[
        {
          key: "image",
          label: "Image",
          render: (i) => <TableThumbnail src={i.image} alt={i.caption} />,
        },
        { key: "caption", label: "Caption" },
        { key: "category", label: "Category" },
        { key: "isActive", label: "Active", render: (i) => (i.isActive ? "Yes" : "No") },
      ]}
    />
  );
}
