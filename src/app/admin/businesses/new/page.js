"use client";

import ResourceFormPage from "@/components/admin/ResourceFormPage";
import BusinessForm from "@/components/admin/forms/BusinessForm";
import { businessesApi } from "@/lib/api/businesses";

export default function NewBusinessPage() {
  return (
    <ResourceFormPage
      title="Add Business"
      queryKey="admin-businesses"
      FormComponent={BusinessForm}
      onSubmit={(values) => businessesApi.create(values)}
      backHref="/admin/businesses"
    />
  );
}
