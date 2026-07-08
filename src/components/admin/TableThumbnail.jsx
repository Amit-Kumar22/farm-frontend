import { ImageOff } from "lucide-react";
import { resolveImageUrl } from "@/lib/imageUrl";

export default function TableThumbnail({ src, alt, rounded = "rounded-lg" }) {
  const url = resolveImageUrl(src);

  if (!url) {
    return (
      <span
        className={`flex h-10 w-10 items-center justify-center ${rounded} bg-cream-dark/60 text-muted`}
      >
        <ImageOff size={16} />
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt={alt || ""} className={`h-10 w-10 ${rounded} object-cover`} />
  );
}
