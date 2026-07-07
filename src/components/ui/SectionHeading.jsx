import clsx from "clsx";

export default function SectionHeading({ eyebrow, title, align = "left", light = false, className }) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={clsx(
            "mb-2 text-sm font-semibold uppercase tracking-wide",
            light ? "text-gold" : "text-gold-dark"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "text-3xl font-bold leading-tight sm:text-4xl",
          light ? "text-cream" : "text-forest-deep"
        )}
      >
        {title}
      </h2>
    </div>
  );
}
