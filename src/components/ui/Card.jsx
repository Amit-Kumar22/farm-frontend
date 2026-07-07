import clsx from "clsx";

export default function Card({ className, children }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-black/5 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
