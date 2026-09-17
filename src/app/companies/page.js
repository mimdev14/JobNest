"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/companies").then((d) => setCompanies(d.companies)).catch(() => setCompanies([])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-900">Companies Hiring</h1>

      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : companies.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No companies yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <Link key={c._id} href={`/companies/${c._id}`} className="rounded-2xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50">
                  {c.logo ? <img src={c.logo} className="h-full w-full object-cover" /> : <span className="text-xl font-bold text-blue-600">{c.name[0]}</span>}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.industry} · {c.location}</p>
                </div>
              </div>
              {c.description && <p className="mt-4 line-clamp-2 text-sm text-gray-600">{c.description}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}