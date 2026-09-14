"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function RecruiterOverviewPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiFetch("/api/stats/recruiter").then((d) => setStats(d.stats)).catch(() => setStats(null));
  }, []);

  const cards = [
    { label: "Total Jobs", value: stats?.totalJobs },
    { label: "Active Jobs", value: stats?.activeJobs },
    { label: "Total Applicants", value: stats?.totalApplicants },
    { label: "Hires", value: stats?.hires },
  ];

  const funnelSteps = ["applied", "under_review", "shortlisted", "offered", "hired"];
  const funnelLabel = { applied: "Applied", under_review: "Under Review", shortlisted: "Shortlisted", offered: "Offered", hired: "Hired" };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Recruiter Overview</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{c.value ?? "-"}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 p-6">
        <p className="text-sm font-semibold text-gray-900">Recruitment Funnel</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {funnelSteps.map((s) => (
            <div key={s} className="flex-1 min-w-[100px] rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stats?.funnel?.[s] ?? 0}</p>
              <p className="mt-1 text-xs text-gray-500">{funnelLabel[s]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}