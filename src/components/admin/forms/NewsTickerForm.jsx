"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NewsTickerForm({ initialData, onSubmit, isEditing = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    text: initialData?.text || "",
    order: initialData?.order || 0,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      router.push("/admin/tickers");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to save ticker item");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/tickers"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 text-forest-deep/60 transition-colors hover:bg-black/5"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-bold text-forest-deep">
          {isEditing ? "Edit Ticker Item" : "New Ticker Item"}
        </h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form Card */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ticker Text Input */}
          <div>
            <label htmlFor="text" className="mb-2 block text-sm font-semibold text-forest-deep">
              Ticker Text <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="e.g., Farming, Organics, Vegetables"
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-base text-forest-deep placeholder-gray-400 transition-all focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/10"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              {formData.text.length}/100 characters
            </p>
          </div>

          {/* Display Order Input */}
          <div>
            <label htmlFor="order" className="mb-2 block text-sm font-semibold text-forest-deep">
              Display Order
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
              step="1"
              className="w-full max-w-[200px] rounded-lg border border-black/10 bg-white px-4 py-2.5 text-base text-forest-deep transition-all focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/10"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Lower numbers appear first in the ticker
            </p>
          </div>

          {/* Active Status Checkbox */}
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-5 w-5 shrink-0 rounded border-gray-300 text-forest transition-all focus:ring-2 focus:ring-forest/20"
            />
            <label htmlFor="isActive" className="flex-1 select-none text-sm font-medium text-forest-deep">
              Active (displayed on website)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/tickers")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full sm:w-auto sm:ml-auto"
            >
              {loading ? "Saving..." : isEditing ? "Update Ticker" : "Create Ticker"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
