"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function FeaturedCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    apiFetch("/api/companies").then((d) => setCompanies(d.companies.slice(0, 6))).catch(() => {});
  }, []);

  if (companies.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Trusted By</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Companies Hiring on JobNest</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {companies.map((c) => (
            <Link key={c._id} href={`/companies/${c._id}`} className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-blue-50">
                {c.logo ? <img src={c.logo} className="h-full w-full object-cover" /> : <span className="text-lg font-bold text-blue-600">{c.name[0]}</span>}
              </div>
              <p className="text-center text-xs font-medium text-gray-700">{c.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}