"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function ModerateJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => apiFetch("/api/jobs/admin/all").then((d) => setJobs(d.jobs)).catch(() => setJobs([])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Remove this job listing?")) return;
    try {
      await apiFetch(`/api/jobs/admin/${id}`, { method: "DELETE" });
      toast.success("Job removed");
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      toast.error(err.message || "Failed to remove job");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Moderate Jobs</h1>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Title</th>
              <th className="px-5 py-3.5 font-semibold">Company</th>
              <th className="px-5 py-3.5 font-semibold">Category</th>
              <th className="px-5 py-3.5 font-semibold">Status</th>
              <th className="px-5 py-3.5 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j._id} className="border-t border-gray-100">
                <td className="px-5 py-3.5">{j.title}</td>
                <td className="px-5 py-3.5 text-gray-500">{j.companyName}</td>
                <td className="px-5 py-3.5">{j.category}</td>
                <td className="px-5 py-3.5 capitalize">{j.status}</td>
                <td className="px-5 py-3.5">
                  <button onClick={() => remove(j._id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}