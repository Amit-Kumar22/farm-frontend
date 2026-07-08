import Image from "next/image";
import clsx from "clsx";
import { resolveImageUrl } from "@/lib/imageUrl";

export default function CoverImage({ src, alt, icon: Icon, className, priority = false }) {
  const url = resolveImageUrl(src);

  if (!url) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-light to-forest-deep text-cream/70",
          className
        )}
      >
        {Icon ? <Icon size={40} strokeWidth={1.5} /> : null}
      </div>
    );
  }

  return (
    <div className={clsx("overflow-hidden", className)}>
      {/* Nested wrapper: keeps our own `relative` positioning context off the
          same element as the caller's className, which may itself set
          `absolute` (e.g. full-bleed hero backgrounds) — putting both position
          utilities on one element lets Tailwind's cascade order silently pick
          one and collapse the box to zero height. */}
      <div className="relative h-full w-full">
        <Image
          src={url}
          alt={alt || ""}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}
