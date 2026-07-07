import Link from "next/link";
import clsx from "clsx";

const variants = {
  primary: "bg-gold text-ink hover:bg-gold-dark",
  dark: "bg-forest text-cream hover:bg-forest-light",
  outline: "border border-forest/20 text-forest hover:bg-forest/5",
  ghost: "text-forest hover:bg-forest/5",
};

export default function Button({
  as,
  href,
  variant = "primary",
  className,
  children,
  ...props
}) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Component = as || "button";
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
