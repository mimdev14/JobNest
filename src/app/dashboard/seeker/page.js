"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function SeekerOverviewPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiFetch("/api/stats/seeker").then((d) => setStats(d.stats)).catch(() => setStats(null));
  }, []);

  const cards = [
    { label: "Applications", value: stats?.totalApplications },
    { label: "Saved Jobs", value: stats?.savedJobs },
    { label: "Interviews", value: stats?.interviews },
    { label: "Offers", value: stats?.offers },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Seeker Overview</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{c.value ?? "-"}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 p-6">
        <p className="text-sm font-medium text-gray-700">Profile Completion</p>
        <div className="mt-3 h-2.5 w-full rounded-full bg-gray-100">
          <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${stats?.profileCompletion || 0}%` }} />
        </div>
        <p className="mt-2 text-sm text-gray-500">{stats?.profileCompletion || 0}% complete</p>
      </div>
    </div>
  );
}