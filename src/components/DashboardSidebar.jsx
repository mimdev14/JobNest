"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export default function DashboardSidebar({ title, links }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    await signOut();
    router.push("/");
  };

  return (
    <aside className="w-64 shrink-0">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</p>
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === l.href ? "bg-blue-600 text-white shadow-sm" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button onClick={handleLogout}
            className="mt-4 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50">
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}