"use client";

import { useParams } from "next/navigation";
import ResourceFormPage from "@/components/admin/ResourceFormPage";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";
import { testimonialsApi } from "@/lib/api/testimonials";

export default function EditTestimonialPage() {
  const { id } = useParams();

  return (
    <ResourceFormPage
      title="Edit Testimonial"
      id={id}
      queryKey="admin-testimonials"
      fetchItem={() => testimonialsApi.adminGet(id)}
      FormComponent={TestimonialForm}
      onSubmit={(values) => testimonialsApi.update(id, values)}
      backHref="/admin/testimonials"
    />
  );
}
