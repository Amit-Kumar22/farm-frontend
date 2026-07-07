export default function FormField({ label, error, hint, children, className }) {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-medium text-forest-deep">{label}</label>}
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
