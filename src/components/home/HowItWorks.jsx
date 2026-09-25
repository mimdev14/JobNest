"use client";

import { useEffect, useState } from "react";
import { Briefcase, Building2, Users, BadgeCheck } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function PlatformStats() {
  const [stats, setStats] = useState({ activeJobs: 0, companies: 0, seekers: 0, hires: 0 });

  useEffect(() => {
    apiFetch("/api/stats/public").then((d) => setStats(d.stats)).catch(() => {});
  }, []);

  const items = [
    { Icon: Briefcase, label: "Active Jobs", value: stats.activeJobs },
    { Icon: Building2, label: "Registered Companies", value: stats.companies },
    { Icon: Users, label: "Job Seekers", value: stats.seekers },
    { Icon: BadgeCheck, label: "Jobs Filled", value: stats.hires },
  ];

  return (
    <section className="relative -mt-16 pb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 lg:grid-cols-4">
        {items.map(({ Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <Icon className="h-5 w-5 text-blue-600" strokeWidth={2} />
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{value.toLocaleString()}+</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}