"use client";

import ResourceListPage from "@/components/admin/ResourceListPage";
import { blogApi } from "@/lib/api/blog";

export default function AdminBlogPage() {
  return (
    <ResourceListPage
      title="Blog Posts"
      queryKey="admin-blog"
      fetchList={() => blogApi.adminList()}
      deleteItem={(id) => blogApi.remove(id)}
      createHref="/admin/blog/new"
      editHref={(id) => `/admin/blog/${id}/edit`}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "isPublished", label: "Published", render: (i) => (i.isPublished ? "Yes" : "No") },
      ]}
    />
  );
}
