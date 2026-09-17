"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { apiFetch } from "@/lib/api";

const ROLE_DASHBOARD = { SEEKER: "/dashboard/seeker", RECRUITER: "/dashboard/recruiter", ADMIN: "/dashboard/admin" };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { data: session } = useSession();
  const { user } = useCurrentUser();

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    await signOut();
    router.push("/");
  };

  const dashboardHref = user ? ROLE_DASHBOARD[user.role] || "/" : "/";
  const initial = session?.user?.name?.[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="text-2xl font-bold text-blue-600">JobNest</Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="font-medium text-gray-700 transition hover:text-blue-600">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen((o) => !o)} className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition hover:border-blue-200">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">{initial}</div>
                )}
                <span className="max-w-[100px] truncate text-sm font-medium text-gray-700">{session.user.name}</span>
                {user?.role === "ADMIN" && <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-semibold text-white">ADMIN</span>}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                  <Link href={dashboardHref} onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="font-medium text-gray-700 transition hover:text-blue-600">Sign In</Link>
              <Link href="/auth/register" className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">Get Started</Link>
            </>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" aria-label="Toggle Menu">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="font-medium text-gray-700">
                {item.name}
              </Link>
            ))}
            {session?.user ? (
              <>
                <Link href={dashboardHref} onClick={() => setIsOpen(false)} className="font-medium text-gray-700">Dashboard</Link>
                <button onClick={handleLogout} className="text-left font-medium text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="font-medium text-gray-700">Sign In</Link>
                <Link href="/auth/register" onClick={() => setIsOpen(false)} className="font-medium text-blue-600">Get Started</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}