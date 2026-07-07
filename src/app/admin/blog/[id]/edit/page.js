"use client";

import { useParams } from "next/navigation";
import ResourceFormPage from "@/components/admin/ResourceFormPage";
import BlogForm from "@/components/admin/forms/BlogForm";
import { blogApi } from "@/lib/api/blog";

export default function EditBlogPostPage() {
  const { id } = useParams();

  return (
    <ResourceFormPage
      title="Edit Blog Post"
      id={id}
      queryKey="admin-blog"
      fetchItem={() => blogApi.adminGet(id)}
      FormComponent={BlogForm}
      onSubmit={(values) => blogApi.update(id, values)}
      backHref="/admin/blog"
    />
  );
}
