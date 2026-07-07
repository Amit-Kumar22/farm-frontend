"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "@/components/ui/Card";
import SettingsForm from "@/components/admin/forms/SettingsForm";
import { siteSettingsApi } from "@/lib/api/siteSettings";

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-site-settings"],
    queryFn: () => siteSettingsApi.adminGet(),
  });

  async function handleSubmit(values) {
    await siteSettingsApi.update(values);
    queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-forest-deep">Site Settings</h1>
      <Card className="p-6">
        {isLoading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : (
          <SettingsForm defaultValues={data?.data} onSubmit={handleSubmit} />
        )}
      </Card>
    </div>
  );
}
