"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "../fields/FormField";
import { Input, Textarea } from "@/components/ui/Input";
import { Checkbox } from "../fields/Checkbox";
import ImageUploadField from "../fields/ImageUploadField";
import FormActions from "../FormActions";
import { ApiError } from "@/lib/apiClient";
import { confirmNavigation } from "@/hooks/useUnsavedChangesWarning";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().optional(),
  rating: z.coerce.number().min(1).max(5),
  message: z.string().min(5, "Message is required"),
  isActive: z.boolean().optional(),
  order: z.coerce.number().optional(),
});

export default function TestimonialForm({ defaultValues, onSubmit, onCancel }) {
  const [serverError, setServerError] = useState("");
  const [avatar, setAvatar] = useState(defaultValues?.avatar || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name || "",
      designation: defaultValues?.designation || "",
      rating: defaultValues?.rating ?? 5,
      message: defaultValues?.message || "",
      isActive: defaultValues?.isActive ?? true,
      order: defaultValues?.order ?? 0,
    },
  });

  async function submit(values) {
    setServerError("");
    try {
      await onSubmit({ ...values, avatar });
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

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="e.g. Martin Bailey" />
        </FormField>
        <FormField label="Designation" error={errors.designation?.message}>
          <Input {...register("designation")} placeholder="e.g. Supervisor" />
        </FormField>
      </div>

      <FormField label="Message" error={errors.message?.message}>
        <Textarea rows={4} {...register("message")} />
      </FormField>

      <ImageUploadField label="Avatar" type="testimonials" value={avatar} onChange={setAvatar} />

      <div className="flex flex-wrap items-center gap-6">
        <FormField label="Rating (1-5)" className="w-28">
          <Input type="number" min={1} max={5} {...register("rating")} />
        </FormField>
        <Checkbox label="Active (visible on site)" {...register("isActive")} />
        <FormField label="Sort Order" className="w-28">
          <Input type="number" {...register("order")} />
        </FormField>
      </div>

      <FormActions
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        submitLabel="Save Testimonial"
      />
    </form>
  );
}
