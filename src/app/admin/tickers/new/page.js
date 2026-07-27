"use client";

import { newsTickerApi } from "@/lib/api/newsTicker";
import NewsTickerForm from "@/components/admin/forms/NewsTickerForm";

export default function NewTickerPage() {
  const handleSubmit = async (formData) => {
    await newsTickerApi.create(formData);
  };

  return <NewsTickerForm onSubmit={handleSubmit} />;
}
