"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import JobCard from "@/components/JobCard";

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/saved-jobs/mine").then((d) => setJobs(d.jobs)).catch(() => setJobs([])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No saved jobs yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => <JobCard key={j._id} job={j} />)}
        </div>
      )}
    </div>
  );
}