"use client";

import ResourceFormPage from "@/components/admin/ResourceFormPage";
import GalleryForm from "@/components/admin/forms/GalleryForm";
import { galleryApi } from "@/lib/api/gallery";

export default function NewGalleryImagePage() {
  return (
    <ResourceFormPage
      title="Add Gallery Image"
      queryKey="admin-gallery"
      FormComponent={GalleryForm}
      onSubmit={(values) => galleryApi.create(values)}
      backHref="/admin/gallery"
    />
  );
}
