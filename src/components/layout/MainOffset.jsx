"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MainOffset({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return <main className={clsx("flex-1", !isHome && "pt-16")}>{children}</main>;
}
