"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import JobCard from "@/components/JobCard";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    apiFetch("/api/jobs/featured").then((d) => setJobs(d.jobs)).catch(() => {});
  }, []);

  if (jobs.length === 0) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Opportunities</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Featured Jobs</h2>
          </div>
          <Link href="/jobs" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all →</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => <JobCard key={j._id} job={j} />)}
        </div>
      </div>
    </section>
  );
}