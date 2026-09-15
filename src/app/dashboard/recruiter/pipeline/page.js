"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const STAGES = ["applied", "under_review", "shortlisted", "offered", "hired"];
const stageLabel = { applied: "Applied", under_review: "Under Review", shortlisted: "Shortlisted", offered: "Offered", hired: "Hired" };
const stageColor = { applied: "border-gray-300", under_review: "border-blue-300", shortlisted: "border-yellow-300", offered: "border-purple-300", hired: "border-green-300" };

export default function CandidatePipelinePage() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobFilter, setJobFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    const params = jobFilter ? `?jobId=${jobFilter}` : "";
    apiFetch(`/api/applications/pipeline${params}`)
      .then((data) => { setApplications(data.applications); setJobs(data.jobs); })
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [jobFilter]);

  const moveStage = async (appId, newStatus) => {
    try {
      await apiFetch(`/api/applications/${appId}/status`, { method: "PATCH", body: JSON.stringify({ status: newStatus }) });
      setApplications((prev) => prev.map((a) => (a._id === appId ? { ...a, status: newStatus } : a)));
      toast.success(`Moved to ${stageLabel[newStatus]}`);
    } catch (err) {
      toast.error(err.message || "Failed to move candidate");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Candidate Pipeline</h1>
        <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
          <option value="">All Jobs</option>
          {jobs.map((j) => <option key={j._id} value={j._id}>{j.title}</option>)}
        </select>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage, stageIndex) => {
          const cards = applications.filter((a) => a.status === stage);
          return (
            <div key={stage} className="w-72 shrink-0">
              <div className={`rounded-t-xl border-t-4 ${stageColor[stage]} bg-gray-50 px-4 py-3`}>
                <p className="text-sm font-semibold text-gray-900">{stageLabel[stage]} <span className="text-gray-400">({cards.length})</span></p>
              </div>
              <div className="flex flex-col gap-3 rounded-b-xl border border-t-0 border-gray-200 bg-gray-50/50 p-3 min-h-[200px]">
                {cards.map((a) => (
                  <div key={a._id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900">{a.seekerName}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{a.jobTitle}</p>
                    <p className="mt-1 text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString()}</p>

                    <div className="mt-3 flex gap-1.5">
                      {stageIndex > 0 && (
                        <button onClick={() => moveStage(a._id, STAGES[stageIndex - 1])}
                          className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50">
                          ← Back
                        </button>
                      )}
                      {stageIndex < STAGES.length - 1 && (
                        <button onClick={() => moveStage(a._id, STAGES[stageIndex + 1])}
                          className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700">
                          Advance →
                        </button>
                      )}
                      <button onClick={() => moveStage(a._id, "rejected")}
                        className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                {cards.length === 0 && <p className="py-6 text-center text-xs text-gray-400">No candidates</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}