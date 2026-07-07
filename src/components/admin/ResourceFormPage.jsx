"use client";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-forest-deep">{title}</h1>
      <Card className="p-6">
        {id && isLoading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : (
          <FormComponent defaultValues={defaultValues} onSubmit={handleSubmit} />
        )}
      </Card>
    </div>
  );
}
