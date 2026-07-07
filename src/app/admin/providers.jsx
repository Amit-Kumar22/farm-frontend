"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";

export default function AdminProviders({ admin, children }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <AuthProvider admin={admin}>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
