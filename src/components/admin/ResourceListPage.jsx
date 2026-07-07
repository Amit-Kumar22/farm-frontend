"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import ConfirmDialog from "./ConfirmDialog";

export default function ResourceListPage({
  title,
  queryKey,
  fetchList,
  deleteItem,
  columns,
  createHref,
  editHref,
}) {
  const queryClient = useQueryClient();
  const [pendingDelete, setPendingDelete] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchList,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setPendingDelete(null);
    },
  });

  const items = data?.data || [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-forest-deep">{title}</h1>
        <Button href={createHref}>
          <Plus size={16} /> Add New
        </Button>
      </div>

      <Card className="overflow-x-auto">
        {isLoading ? (
          <p className="p-6 text-sm text-muted">Loading...</p>
        ) : error ? (
          <p className="p-6 text-sm text-red-600">Failed to load: {error.message}</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-muted">Nothing here yet. Click &quot;Add New&quot; to create one.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase tracking-wide text-muted">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-5 py-3 font-semibold">
                    {col.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-black/5 last:border-0">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 align-middle">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button href={editHref(item._id)} variant="ghost" className="!px-2 !py-2">
                        <Pencil size={15} />
                      </Button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(item)}
                        className="rounded-full p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this item?"
        description={`This will permanently remove "${pendingDelete?.title || pendingDelete?.name || "this item"}".`}
        confirmLabel={deleteMutation.isPending ? "Deleting..." : "Delete"}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => deleteMutation.mutate(pendingDelete._id)}
      />
    </div>
  );
}
