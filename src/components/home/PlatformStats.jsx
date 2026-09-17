"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function PlatformStats() {
  const [stats, setStats] = useState({ activeJobs: 0, companies: 0, seekers: 0, hires: 0 });

  useEffect(() => {
    apiFetch("/api/stats/public").then((d) => setStats(d.stats)).catch(() => {});
  }, []);

  const items = [
    { label: "Active Jobs", value: stats.activeJobs },
    { label: "Registered Companies", value: stats.companies },
    { label: "Job Seekers", value: stats.seekers },
    { label: "Jobs Filled", value: stats.hires },
  ];

  return (
    <section className="border-y border-gray-100 bg-white py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold text-blue-600 sm:text-4xl">{s.value.toLocaleString()}+</p>
            <p className="mt-1 text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}