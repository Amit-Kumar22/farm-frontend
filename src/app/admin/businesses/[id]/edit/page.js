"use client";

import { useParams } from "next/navigation";
import ResourceFormPage from "@/components/admin/ResourceFormPage";
import BusinessForm from "@/components/admin/forms/BusinessForm";
import { businessesApi } from "@/lib/api/businesses";

export default function EditBusinessPage() {
  const { id } = useParams();

  return (
    <ResourceFormPage
      title="Edit Business"
      id={id}
      queryKey="admin-businesses"
      fetchItem={() => businessesApi.adminGet(id)}
      FormComponent={BusinessForm}
      onSubmit={(values) => businessesApi.update(id, values)}
      backHref="/admin/businesses"
    />
  );
}
