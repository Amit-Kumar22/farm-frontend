"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageWithFallback({ fallback, ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed) return fallback;

  return <Image {...props} fill onError={() => setFailed(true)} />;
}
