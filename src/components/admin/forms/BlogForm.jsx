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
  category: z.string().min(1, "Category is required"),
  author: z.string().optional(),
  excerpt: z.string().min(5, "Excerpt is required"),
  content: z.string().min(20, "Content is required"),
  isPublished: z.boolean().optional(),
});

export default function BlogForm({ defaultValues, onSubmit }) {
  const [serverError, setServerError] = useState("");
  const [coverImage, setCoverImage] = useState(defaultValues?.coverImage || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title || "",
      category: defaultValues?.category || "General",
      author: defaultValues?.author || "MainFarm Team",
      excerpt: defaultValues?.excerpt || "",
      content: defaultValues?.content || "",
      isPublished: defaultValues?.isPublished ?? true,
    },
  });

  async function submit(values) {
    setServerError("");
    try {
      await onSubmit({ ...values, coverImage });
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
        <Input {...register("title")} placeholder="e.g. What Technology Is Used In Vertical Farming?" />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Category" error={errors.category?.message}>
          <Input {...register("category")} placeholder="e.g. Vegetable Farming" />
        </FormField>
        <FormField label="Author" error={errors.author?.message}>
          <Input {...register("author")} />
        </FormField>
      </div>

      <FormField label="Excerpt" error={errors.excerpt?.message} hint="Short summary shown on listing cards">
        <Textarea rows={2} {...register("excerpt")} />
      </FormField>

      <FormField label="Content" error={errors.content?.message}>
        <Textarea rows={10} {...register("content")} />
      </FormField>

      <ImageUploadField label="Cover Image" type="blog" value={coverImage} onChange={setCoverImage} />

      <Checkbox label="Published (visible on site)" {...register("isPublished")} />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Post"}
      </Button>
    </form>
  );
}
