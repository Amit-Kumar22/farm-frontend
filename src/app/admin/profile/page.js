"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Lock, Save, Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/lib/api/auth";
import FormField from "@/components/admin/fields/FormField";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function AdminProfilePage() {
  const router = useRouter();
  const { admin } = useAuth();
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Profile form
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Password form
  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Load admin data
  useEffect(() => {
    if (admin) {
      profileForm.reset({
        name: admin.name || "",
        email: admin.email || "",
      });
    }
  }, [admin, profileForm]);

  async function handleProfileSubmit(values) {
    setProfileSuccess("");
    setProfileError("");
    try {
      // Implement profile update API call here
      // await authApi.updateProfile(values);
      setProfileSuccess("Profile updated successfully!");
      setTimeout(() => setProfileSuccess(""), 3000);
    } catch (err) {
      setProfileError(err.message || "Failed to update profile");
    }
  }

  async function handlePasswordSubmit(values) {
    setPasswordSuccess("");
    setPasswordError("");
    try {
      // Implement password change API call here
      // await authApi.changePassword({
      //   currentPassword: values.currentPassword,
      //   newPassword: values.newPassword,
      // });
      setPasswordSuccess("Password changed successfully!");
      passwordForm.reset();
      setTimeout(() => setPasswordSuccess(""), 3000);
    } catch (err) {
      setPasswordError(err.message || "Failed to change password");
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header with Back Button */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.push("/admin")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-forest/20 text-forest transition-colors hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-forest/30"
          aria-label="Go back to dashboard"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-forest-deep">My Profile</h1>
          <p className="mt-1 text-sm text-muted">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Information Card */}
        <div className="rounded-xl border border-forest/10 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-forest-deep">Profile Information</h2>
              <p className="text-xs text-muted">Update your personal details</p>
            </div>
          </div>

          <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
            <FormField
              label="Full Name"
              error={profileForm.formState.errors.name?.message}
            >
              <Input
                {...profileForm.register("name")}
                placeholder="Enter your full name"
                className="w-full"
              />
            </FormField>

            <FormField
              label="Email Address"
              error={profileForm.formState.errors.email?.message}
            >
              <Input
                {...profileForm.register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
            </FormField>

            {profileSuccess && (
              <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                {profileSuccess}
              </div>
            )}

            {profileError && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {profileError}
              </div>
            )}

            <Button
              type="submit"
              disabled={profileForm.formState.isSubmitting}
              className="w-full"
            >
              {profileForm.formState.isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="rounded-xl border border-forest/10 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-forest-deep">Change Password</h2>
              <p className="text-xs text-muted">Update your password regularly</p>
            </div>
          </div>

          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
            <FormField
              label="Current Password"
              error={passwordForm.formState.errors.currentPassword?.message}
            >
              <Input
                {...passwordForm.register("currentPassword")}
                type="password"
                placeholder="Enter current password"
                className="w-full"
              />
            </FormField>

            <FormField
              label="New Password"
              error={passwordForm.formState.errors.newPassword?.message}
            >
              <Input
                {...passwordForm.register("newPassword")}
                type="password"
                placeholder="Enter new password"
                className="w-full"
              />
            </FormField>

            <FormField
              label="Confirm New Password"
              error={passwordForm.formState.errors.confirmPassword?.message}
            >
              <Input
                {...passwordForm.register("confirmPassword")}
                type="password"
                placeholder="Confirm new password"
                className="w-full"
              />
            </FormField>

            {passwordSuccess && (
              <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                {passwordSuccess}
              </div>
            )}

            {passwordError && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {passwordError}
              </div>
            )}

            <Button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
              className="w-full"
            >
              {passwordForm.formState.isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Changing...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Change Password</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Account Information */}
      <div className="mt-6 rounded-xl border border-forest/10 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Mail size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-forest-deep">Account Information</h2>
            <p className="text-xs text-muted">View your account details</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-forest/10 bg-cream-dark/30 p-4">
            <p className="text-xs font-medium text-muted">Role</p>
            <p className="mt-1 text-sm font-semibold text-forest-deep">Administrator</p>
          </div>
          <div className="rounded-lg border border-forest/10 bg-cream-dark/30 p-4">
            <p className="text-xs font-medium text-muted">Account Status</p>
            <p className="mt-1 text-sm font-semibold text-green-600">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
