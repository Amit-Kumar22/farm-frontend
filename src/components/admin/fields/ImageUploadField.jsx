"use client";

import { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadFile } from "@/lib/api/uploads";
import { resolveImageUrl } from "@/lib/imageUrl";

export default function ImageUploadField({ value, onChange, type, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const res = await uploadFile(file, type);
      onChange(res.data.url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const preview = resolveImageUrl(value);

  return (
    <div>
      {label && <p className="mb-1.5 text-sm font-medium text-forest-deep">{label}</p>}
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-forest/20 bg-cream-dark/40">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <UploadCloud size={20} className="text-muted" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-forest/20 px-4 py-2 text-xs font-semibold text-forest hover:bg-forest/5">
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
            {uploading ? "Uploading..." : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex w-fit items-center gap-1 text-xs text-red-600 hover:underline"
            >
              <X size={12} /> Remove
            </button>
          )}
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
