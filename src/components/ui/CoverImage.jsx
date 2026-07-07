import Image from "next/image";
import clsx from "clsx";
import { resolveImageUrl } from "@/lib/imageUrl";

export default function CoverImage({ src, alt, icon: Icon, className }) {
  const url = resolveImageUrl(src);

  if (!url) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center bg-gradient-to-br from-forest-light to-forest-deep text-cream/70",
          className
        )}
      >
        {Icon ? <Icon size={40} strokeWidth={1.5} /> : null}
      </div>
    );
  }

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <Image
        src={url}
        alt={alt || ""}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
