import Link from "next/link";
import { Sprout } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Admin Login — MainFarm" };

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-20">
      <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-forest-deep">
            <Sprout size={22} />
          </span>
          <h1 className="text-xl font-bold text-forest-deep">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">Sign in to manage MainFarm content.</p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-xs text-muted">
          <Link href="/" className="hover:text-forest-deep">
            ← Back to website
          </Link>
        </p>
      </div>
    </section>
  );
}
