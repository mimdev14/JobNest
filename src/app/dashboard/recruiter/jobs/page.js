"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const statusColor = { active: "bg-green-100 text-green-700", draft: "bg-gray-100 text-gray-600", closed: "bg-red-100 text-red-700" };

export default function MyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => apiFetch("/api/jobs/mine").then((d) => setJobs(d.jobs)).catch(() => setJobs([])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    try {
      await apiFetch(`/api/jobs/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      toast.success(`Job ${status}`);
      load();
    } catch (err) {
      toast.error(err.message || "Failed to update job");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      await apiFetch(`/api/jobs/${id}`, { method: "DELETE" });
      toast.success("Job deleted");
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
        <Link href="/dashboard/recruiter/jobs/new" className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          + Post a Job
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {jobs.map((j) => (
          <div key={j._id} className="rounded-2xl border border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">{j.title}</p>
                <p className="mt-1 text-sm text-gray-500">{j.location} · {j.type} · {j.views || 0} views · {j.applicationsCount || 0} applicants</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColor[j.status]}`}>{j.status}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {j.status === "draft" && <button onClick={() => changeStatus(j._id, "active")} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50">Publish</button>}
              {j.status === "active" && <button onClick={() => changeStatus(j._id, "closed")} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50">Close</button>}
              {j.status === "closed" && <button onClick={() => changeStatus(j._id, "active")} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50">Reopen</button>}
              <Link href={`/dashboard/recruiter/jobs/${j._id}/applicants`} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50">Applicants</Link>
              <button onClick={() => remove(j._id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && <p className="text-center text-gray-500">No jobs yet.</p>}
      </div>
    </div>
  );
}