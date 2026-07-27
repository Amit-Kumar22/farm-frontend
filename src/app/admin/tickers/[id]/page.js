"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { newsTickerApi } from "@/lib/api/newsTicker";
import NewsTickerForm from "@/components/admin/forms/NewsTickerForm";

export default function EditTickerPage() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItem();
  }, [params.id]);

  const loadItem = async () => {
    try {
      const res = await newsTickerApi.getById(params.id);
      setItem(res.data);
    } catch (error) {
      console.error("Failed to load ticker item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    await newsTickerApi.update(params.id, formData);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-cream/60">Loading ticker item...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-cream/60">Ticker item not found</div>
      </div>
    );
  }

  return <NewsTickerForm initialData={item} onSubmit={handleSubmit} isEditing />;
}
