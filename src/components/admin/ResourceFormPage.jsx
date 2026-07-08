"use client";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Card from "../ui/Card";

export default function ResourceFormPage({
  title,
  id,
  queryKey,
  fetchItem,
  FormComponent,
  onSubmit,
  backHref,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => fetchItem(id),
    enabled: !!id,
  });

  const defaultValues = id ? data?.data : undefined;

  async function handleSubmit(values) {
    await onSubmit(values);
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    router.push(backHref);
  }

  function handleCancel() {
    router.push(backHref);
  }

  function handleBack() {
    router.push(backHref);
  }

  return (
    <div>
      {/* Header with Back Button */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-forest/20 text-forest transition-colors hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-forest/30"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-forest-deep">{title}</h1>
      </div>

      <Card className="p-6">
        {id && isLoading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : (
          <FormComponent 
            defaultValues={defaultValues} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </Card>
    </div>
  );
}
