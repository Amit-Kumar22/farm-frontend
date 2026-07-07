import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import AdminProviders from "./providers";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin Panel — MainFarm" };

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let admin = null;
  try {
    const res = await authApi.me(cookieHeader);
    admin = res.data;
  } catch {
    redirect("/login");
  }

  return (
    <AdminProviders admin={admin}>
      <AdminShell>{children}</AdminShell>
    </AdminProviders>
  );
}
