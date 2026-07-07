"use client";

import { useParams } from "next/navigation";
import ResourceFormPage from "@/components/admin/ResourceFormPage";
import GalleryForm from "@/components/admin/forms/GalleryForm";
import { galleryApi } from "@/lib/api/gallery";

export default function EditGalleryImagePage() {
  const { id } = useParams();

  return (
    <ResourceFormPage
      title="Edit Gallery Image"
      id={id}
      queryKey="admin-gallery"
      fetchItem={() => galleryApi.adminGet(id)}
      FormComponent={GalleryForm}
      onSubmit={(values) => galleryApi.update(id, values)}
      backHref="/admin/gallery"
    />
  );
}
