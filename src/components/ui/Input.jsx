import { forwardRef } from "react";
import clsx from "clsx";

const base =
  "w-full rounded-lg border border-forest/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold";

export const Input = forwardRef(function Input(props, ref) {
  return <input ref={ref} {...props} className={clsx(base, props.className)} />;
});

export const Textarea = forwardRef(function Textarea({ rows = 4, ...props }, ref) {
  return <textarea ref={ref} rows={rows} {...props} className={clsx(base, props.className)} />;
});
