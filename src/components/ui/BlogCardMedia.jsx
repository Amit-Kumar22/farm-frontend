import { Play } from "lucide-react";
import CoverImage from "./CoverImage";
import { resolveImageUrl } from "@/lib/imageUrl";

export default function BlogCardMedia({ coverImage, videoUrl, icon, className = "" }) {
  const resolvedVideoUrl = videoUrl ? resolveImageUrl(videoUrl) : null;

  if (resolvedVideoUrl) {
    return (
      <div className={`relative overflow-hidden bg-cream-dark ${className}`}>
        <video 
          src={resolvedVideoUrl} 
          className="h-full w-full object-cover"
          muted
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
            <Play size={28} className="ml-1 text-forest-deep" fill="currentColor" />
          </div>
        </div>
      </div>
    );
  }

  return <CoverImage src={coverImage} icon={icon} className={className} />;
}
