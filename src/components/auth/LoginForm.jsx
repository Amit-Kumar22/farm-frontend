"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/apiClient";
import Button from "../ui/Button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values) {
    setServerError("");
    try {
      await authApi.login(values);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-forest-deep">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-lg border border-forest/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
          placeholder="admin@mainfarm.org"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-forest-deep">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-lg border border-forest/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
          placeholder="••••••••"
        />
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
