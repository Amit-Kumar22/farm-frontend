"use client";

import { useState } from "react";
import { Video, X, Loader2, Play } from "lucide-react";
import { uploadVideo } from "@/lib/api/uploads";
import { resolveImageUrl } from "@/lib/imageUrl";
import { useToast } from "@/context/ToastContext";

export default function VideoUploadField({ value, onChange, type = 'blog-videos', label = "Video" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/avi'];
    if (!validTypes.includes(file.type)) {
      const message = "Please upload a valid video file (MP4, WebM, MOV, or AVI)";
      setError(message);
      toast.error(message);
      e.target.value = "";
      return;
    }

    setUploading(true);
    setError("");
    try {
      const res = await uploadVideo(file, type);
      onChange(res.data.url);
    } catch (err) {
      const message = err.message || "Upload failed";
      setError(message);
      toast.error(message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const videoUrl = resolveImageUrl(value);

  return (
    <div>
      {label && <p className="mb-1.5 text-sm font-medium text-forest-deep">{label}</p>}
      <div className="flex items-start gap-4">
        <div className="flex h-32 w-48 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-forest/20 bg-cream-dark/40">
          {videoUrl ? (
            <div className="relative h-full w-full group">
              <video 
                src={videoUrl} 
                className="h-full w-full object-cover"
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={32} className="text-white" />
              </div>
            </div>
          ) : (
            <Video size={24} className="text-muted" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-forest/20 px-4 py-2 text-xs font-semibold text-forest hover:bg-forest/5">
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Video size={14} />}
            {uploading ? "Uploading..." : "Upload video"}
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/avi"
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
              <X size={12} /> Remove video
            </button>
          )}
          
          {error && <p className="text-xs text-red-600">{error}</p>}
          
          <p className="text-xs text-muted max-w-xs">
            Supported formats: MP4, WebM, MOV, AVI · Max size: 5 MB
          </p>
        </div>
      </div>
    </div>
  );
}
