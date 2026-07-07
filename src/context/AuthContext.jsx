"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ admin, children }) {
  return <AuthContext.Provider value={{ admin }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
