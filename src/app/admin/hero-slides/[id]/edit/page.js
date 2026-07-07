"use client";

import { useParams } from "next/navigation";
import ResourceFormPage from "@/components/admin/ResourceFormPage";
import HeroSlideForm from "@/components/admin/forms/HeroSlideForm";
import { heroSlidesApi } from "@/lib/api/heroSlides";

export default function EditHeroSlidePage() {
  const { id } = useParams();

  return (
    <ResourceFormPage
      title="Edit Hero Slide"
      id={id}
      queryKey="admin-hero-slides"
      fetchItem={() => heroSlidesApi.adminGet(id)}
      FormComponent={HeroSlideForm}
      onSubmit={(values) => heroSlidesApi.update(id, values)}
      backHref="/admin/hero-slides"
    />
  );
}
