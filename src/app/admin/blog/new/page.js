"use client";

import ResourceFormPage from "@/components/admin/ResourceFormPage";
import BlogForm from "@/components/admin/forms/BlogForm";
import { blogApi } from "@/lib/api/blog";

export default function NewBlogPostPage() {
  return (
    <ResourceFormPage
      title="Add Blog Post"
      queryKey="admin-blog"
      FormComponent={BlogForm}
      onSubmit={(values) => blogApi.create(values)}
      backHref="/admin/blog"
    />
  );
}
