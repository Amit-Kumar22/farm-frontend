"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "../fields/FormField";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "../fields/Checkbox";
import ImageUploadField from "../fields/ImageUploadField";
import FormActions from "../FormActions";
import { ApiError } from "@/lib/apiClient";
import { confirmNavigation } from "@/hooks/useUnsavedChangesWarning";

const schema = z.object({
  caption: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.coerce.number().optional(),
});

export default function GalleryForm({ defaultValues, onSubmit, onCancel }) {
  const [serverError, setServerError] = useState("");
  const [imageError, setImageError] = useState("");
  const [image, setImage] = useState(defaultValues?.image || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      caption: defaultValues?.caption || "",
      category: defaultValues?.category || "General",
      isActive: defaultValues?.isActive ?? true,
      order: defaultValues?.order ?? 0,
    },
  });

  async function submit(values) {
    setServerError("");
    setImageError("");
    if (!image) {
      setImageError("Please upload an image");
      return;
    }
    try {
      await onSubmit({ ...values, image });
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : "Something went wrong");
    }
  }

  function handleCancel() {
    confirmNavigation(isDirty, onCancel);
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      {serverError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      )}

      <FormField label="Image" error={imageError}>
        <ImageUploadField label="" type="gallery" value={image} onChange={setImage} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Caption" error={errors.caption?.message}>
          <Input {...register("caption")} placeholder="e.g. Harvesting fresh vegetables" />
        </FormField>
        <FormField label="Category" error={errors.category?.message}>
          <Input {...register("category")} placeholder="e.g. Vegetable Farming" />
        </FormField>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Checkbox label="Active (visible on site)" {...register("isActive")} />
        <FormField label="Sort Order" className="w-28">
          <Input type="number" {...register("order")} />
        </FormField>
      </div>

      <FormActions
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        submitLabel="Save Image"
      />
    </form>
  );
}
