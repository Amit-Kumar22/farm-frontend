"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import FormField from "../fields/FormField";
import { Input, Textarea } from "@/components/ui/Input";
import { Checkbox } from "../fields/Checkbox";
import ImageUploadField from "../fields/ImageUploadField";
import FormActions from "../FormActions";
import { ApiError } from "@/lib/apiClient";
import { resolveImageUrl } from "@/lib/imageUrl";
import { confirmNavigation } from "@/hooks/useUnsavedChangesWarning";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  shortDescription: z.string().min(5, "Short description is required"),
  description: z.string().min(10, "Description is required"),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.coerce.number().optional(),
});

export default function BusinessForm({ defaultValues, onSubmit, onCancel }) {
  const [serverError, setServerError] = useState("");
  const [coverImage, setCoverImage] = useState(defaultValues?.coverImage || "");
  const [gallery, setGallery] = useState(defaultValues?.gallery || []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title || "",
      shortDescription: defaultValues?.shortDescription || "",
      description: defaultValues?.description || "",
      isFeatured: defaultValues?.isFeatured ?? false,
      isActive: defaultValues?.isActive ?? true,
      order: defaultValues?.order ?? 0,
    },
  });

  async function submit(values) {
    setServerError("");
    try {
      await onSubmit({ ...values, coverImage, gallery });
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

      <FormField label="Title" error={errors.title?.message}>
        <Input {...register("title")} placeholder="e.g. Fish Farming" />
      </FormField>

      <FormField
        label="Short Description"
        error={errors.shortDescription?.message}
        hint="Shown on cards and listings"
      >
        <Textarea rows={2} {...register("shortDescription")} />
      </FormField>

      <FormField label="Full Description" error={errors.description?.message}>
        <Textarea rows={6} {...register("description")} />
      </FormField>

      <ImageUploadField
        label="Cover Image"
        type="businesses"
        value={coverImage}
        onChange={setCoverImage}
      />

      <div>
        <p className="mb-1.5 text-sm font-medium text-forest-deep">Gallery Images</p>
        <div className="flex flex-wrap gap-3">
          {gallery.map((url, i) => (
            <div key={i} className="relative h-20 w-20 overflow-hidden rounded-xl border border-forest/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resolveImageUrl(url)} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setGallery((g) => g.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <ImageUploadField
            type="businesses"
            value=""
            onChange={(url) => url && setGallery((g) => [...g, url])}
            label=""
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Checkbox label="Featured on homepage" {...register("isFeatured")} />
        <Checkbox label="Active (visible on site)" {...register("isActive")} />
        <FormField label="Sort Order" className="w-28">
          <Input type="number" {...register("order")} />
        </FormField>
      </div>

      <FormActions
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        submitLabel="Save Business"
      />
    </form>
  );
}
