import Link from "next/link";
import { Sprout } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Admin Login — MainFarm" };

export default function LoginPage() {
  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden py-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-2xl border border-black/5 bg-white p-8 shadow-lg">
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
