"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiFetch("/api/stats/admin").then((d) => setStats(d.stats)).catch(() => setStats(null));
  }, []);

  const cards = [
    { label: "Total Users", value: stats?.totalUsers },
    { label: "Seekers", value: stats?.seekers },
    { label: "Recruiters", value: stats?.recruiters },
    { label: "Companies", value: stats?.companies },
    { label: "Active Jobs", value: stats?.activeJobs },
    { label: "Applications", value: stats?.totalApplications },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{c.value ?? "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}