"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import FormField from "../fields/FormField";
import { Input, Textarea } from "@/components/ui/Input";
import ImageUploadField from "../fields/ImageUploadField";
import Button from "@/components/ui/Button";
import { ApiError } from "@/lib/apiClient";

const schema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  tagline: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  workingHours: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

export default function SettingsForm({ defaultValues, onSubmit }) {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [logo, setLogo] = useState(defaultValues?.logo || "");
  const [stats, setStats] = useState(defaultValues?.stats?.length ? defaultValues.stats : []);
  const [timeline, setTimeline] = useState(
    defaultValues?.timeline?.length ? defaultValues.timeline : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      siteName: defaultValues?.siteName || "MainFarm",
      tagline: defaultValues?.tagline || "",
      phone: defaultValues?.phone || "",
      email: defaultValues?.email || "",
      address: defaultValues?.address || "",
      workingHours: defaultValues?.workingHours || "",
      facebook: defaultValues?.socialLinks?.facebook || "",
      twitter: defaultValues?.socialLinks?.twitter || "",
      instagram: defaultValues?.socialLinks?.instagram || "",
      linkedin: defaultValues?.socialLinks?.linkedin || "",
    },
  });

  async function submit(values) {
    setServerError("");
    setSuccessMessage("");
    try {
      await onSubmit({
        siteName: values.siteName,
        tagline: values.tagline,
        phone: values.phone,
        email: values.email,
        address: values.address,
        workingHours: values.workingHours,
        logo,
        socialLinks: {
          facebook: values.facebook,
          twitter: values.twitter,
          instagram: values.instagram,
          linkedin: values.linkedin,
        },
        stats: stats.filter((s) => s.label && s.value),
        timeline: timeline.filter((t) => t.year && t.title),
      });
      setSuccessMessage("Settings saved.");
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      {serverError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      )}
      {successMessage && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{successMessage}</p>
      )}

      <section className="space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">General</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Site Name" error={errors.siteName?.message}>
            <Input {...register("siteName")} />
          </FormField>
          <FormField label="Tagline" error={errors.tagline?.message}>
            <Input {...register("tagline")} />
          </FormField>
        </div>
        <ImageUploadField label="Logo" type="settings" value={logo} onChange={setLogo} />
      </section>

      <section className="space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">Contact</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Phone" error={errors.phone?.message}>
            <Input {...register("phone")} />
          </FormField>
          <FormField label="Email" error={errors.email?.message}>
            <Input {...register("email")} />
          </FormField>
          <FormField label="Address" error={errors.address?.message}>
            <Input {...register("address")} />
          </FormField>
          <FormField label="Working Hours" error={errors.workingHours?.message}>
            <Input {...register("workingHours")} />
          </FormField>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">Social Links</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Facebook">
            <Input {...register("facebook")} placeholder="https://facebook.com/..." />
          </FormField>
          <FormField label="Twitter">
            <Input {...register("twitter")} placeholder="https://twitter.com/..." />
          </FormField>
          <FormField label="Instagram">
            <Input {...register("instagram")} placeholder="https://instagram.com/..." />
          </FormField>
          <FormField label="LinkedIn">
            <Input {...register("linkedin")} placeholder="https://linkedin.com/..." />
          </FormField>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
            Stats / Counters
          </h2>
          <button
            type="button"
            onClick={() => setStats((s) => [...s, { label: "", value: "" }])}
            className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:underline"
          >
            <Plus size={14} /> Add Stat
          </button>
        </div>
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3">
            <Input
              placeholder="Label"
              value={stat.label}
              onChange={(e) =>
                setStats((arr) => arr.map((s, idx) => (idx === i ? { ...s, label: e.target.value } : s)))
              }
            />
            <Input
              placeholder="Value"
              value={stat.value}
              onChange={(e) =>
                setStats((arr) => arr.map((s, idx) => (idx === i ? { ...s, value: e.target.value } : s)))
              }
              className="w-32"
            />
            <button
              type="button"
              onClick={() => setStats((arr) => arr.filter((_, idx) => idx !== i))}
              className="rounded-full p-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">Timeline</h2>
          <button
            type="button"
            onClick={() => setTimeline((t) => [...t, { year: "", title: "", description: "" }])}
            className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:underline"
          >
            <Plus size={14} /> Add Milestone
          </button>
        </div>
        {timeline.map((item, i) => (
          <div key={i} className="grid gap-3 rounded-xl border border-black/5 p-4 sm:grid-cols-[100px_1fr_auto]">
            <Input
              placeholder="Year"
              value={item.year}
              onChange={(e) =>
                setTimeline((arr) => arr.map((t, idx) => (idx === i ? { ...t, year: e.target.value } : t)))
              }
            />
            <Input
              placeholder="Title"
              value={item.title}
              onChange={(e) =>
                setTimeline((arr) => arr.map((t, idx) => (idx === i ? { ...t, title: e.target.value } : t)))
              }
            />
            <button
              type="button"
              onClick={() => setTimeline((arr) => arr.filter((_, idx) => idx !== i))}
              className="rounded-full p-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={15} />
            </button>
            <Textarea
              placeholder="Description"
              rows={2}
              value={item.description}
              onChange={(e) =>
                setTimeline((arr) =>
                  arr.map((t, idx) => (idx === i ? { ...t, description: e.target.value } : t))
                )
              }
              className="sm:col-span-3"
            />
          </div>
        ))}
      </section>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
