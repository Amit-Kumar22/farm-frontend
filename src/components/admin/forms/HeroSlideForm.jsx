"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "../fields/FormField";
import { Input, Textarea } from "@/components/ui/Input";
import { Checkbox } from "../fields/Checkbox";
import ImageUploadField from "../fields/ImageUploadField";
import Button from "@/components/ui/Button";
import { ApiError } from "@/lib/apiClient";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  subtitle: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.coerce.number().optional(),
});

export default function HeroSlideForm({ defaultValues, onSubmit }) {
  const [serverError, setServerError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(defaultValues?.backgroundImage || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title || "",
      subtitle: defaultValues?.subtitle || "",
      ctaText: defaultValues?.ctaText || "Contact Us",
      ctaLink: defaultValues?.ctaLink || "/businesses",
      isActive: defaultValues?.isActive ?? true,
      order: defaultValues?.order ?? 0,
    },
  });

  async function submit(values) {
    setServerError("");
    try {
      await onSubmit({ ...values, backgroundImage });
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      {serverError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      )}

      <FormField label="Title" error={errors.title?.message}>
        <Input {...register("title")} placeholder="e.g. Quality Trust: Direct to the Farm" />
      </FormField>

      <FormField label="Subtitle" error={errors.subtitle?.message}>
        <Textarea rows={2} {...register("subtitle")} />
      </FormField>

      <ImageUploadField
        label="Background Image"
        type="hero"
        value={backgroundImage}
        onChange={setBackgroundImage}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Button Text" error={errors.ctaText?.message}>
          <Input {...register("ctaText")} />
        </FormField>
        <FormField label="Button Link" error={errors.ctaLink?.message}>
          <Input {...register("ctaLink")} placeholder="/businesses" />
        </FormField>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Checkbox label="Active (visible on site)" {...register("isActive")} />
        <FormField label="Sort Order" className="w-28">
          <Input type="number" {...register("order")} />
        </FormField>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Slide"}
      </Button>
    </form>
  );
}
