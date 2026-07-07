"use client";

import ResourceFormPage from "@/components/admin/ResourceFormPage";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";
import { testimonialsApi } from "@/lib/api/testimonials";

export default function NewTestimonialPage() {
  return (
    <ResourceFormPage
      title="Add Testimonial"
      queryKey="admin-testimonials"
      FormComponent={TestimonialForm}
      onSubmit={(values) => testimonialsApi.create(values)}
      backHref="/admin/testimonials"
    />
  );
}
