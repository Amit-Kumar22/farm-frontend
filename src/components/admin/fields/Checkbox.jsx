import { forwardRef } from "react";

export const Checkbox = forwardRef(function Checkbox({ label, ...props }, ref) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-forest-deep">
      <input
        ref={ref}
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-forest/30 text-gold-dark focus:ring-gold"
      />
      {label}
    </label>
  );
});
