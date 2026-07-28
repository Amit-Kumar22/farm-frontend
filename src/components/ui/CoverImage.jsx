import clsx from "clsx";
import { resolveImageUrl } from "@/lib/imageUrl";
import ImageWithFallback from "./ImageWithFallback";

export default function CoverImage({ src, alt, icon: Icon, className, priority = false, objectFit = "cover" }) {
  const url = resolveImageUrl(src);

  const fallback = (
    <div
      className={clsx(
        "flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-light to-forest-deep text-cream/70",
        className
      )}
    >
      {Icon ? <Icon size={40} strokeWidth={1.5} /> : null}
    </div>
  );

  if (!url) return fallback;

  return (
    <div className={clsx("overflow-hidden", className)}>
      {/* Nested wrapper: keeps our own `relative` positioning context off the
          same element as the caller's className, which may itself set
          `absolute` (e.g. full-bleed hero backgrounds) — putting both position
          utilities on one element lets Tailwind's cascade order silently pick
          one and collapse the box to zero height. */}
      <div className="relative h-full w-full">
        <ImageWithFallback
          src={url}
          alt={alt || ""}
          priority={priority}
          className={objectFit === "cover" ? "object-cover" : "object-contain"}
          sizes="(max-width: 768px) 100vw, 33vw"
          fallback={fallback}
        />
      </div>
    </div>
  );
}
