"use client";

import ResourceFormPage from "@/components/admin/ResourceFormPage";
import HeroSlideForm from "@/components/admin/forms/HeroSlideForm";
import { heroSlidesApi } from "@/lib/api/heroSlides";

export default function NewHeroSlidePage() {
  return (
    <ResourceFormPage
      title="Add Hero Slide"
      queryKey="admin-hero-slides"
      FormComponent={HeroSlideForm}
      onSubmit={(values) => heroSlidesApi.create(values)}
      backHref="/admin/hero-slides"
    />
  );
}
