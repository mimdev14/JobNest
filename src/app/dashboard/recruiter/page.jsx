"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import ConfirmModal from "@/components/ConfirmModal";

const STAGES = ["applied", "under_review", "shortlisted", "offered", "hired"];
const stageLabel = { applied: "Applied", under_review: "Under Review", shortlisted: "Shortlisted", offered: "Offered", hired: "Hired" };
const stageColor = { applied: "border-gray-300", under_review: "border-blue-300", shortlisted: "border-yellow-300", offered: "border-purple-300", hired: "border-green-300" };

export default function CandidatePipelinePage() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobFilter, setJobFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejecting, setRejecting] = useState(false);

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

  const handleReject = async () => {
    setRejecting(true);
    try {
      await apiFetch(`/api/applications/${rejectTarget}/status`, { method: "PATCH", body: JSON.stringify({ status: "rejected" }) });
      setApplications((prev) => prev.filter((a) => a._id !== rejectTarget));
      toast.success("Candidate rejected");
      setRejectTarget(null);
    } catch (err) {
      toast.error(err.message || "Failed to reject candidate");
    } finally {
      setRejecting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Candidate Pipeline</h1>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
          {STAGES.map((s) => (
            <div key={s} className="w-72 shrink-0 animate-pulse">
              <div className="h-11 rounded-t-xl bg-gray-100" />
              <div className="space-y-3 rounded-b-xl border border-t-0 border-gray-200 bg-gray-50/50 p-3">
                <div className="h-20 rounded-xl bg-gray-100" />
                <div className="h-20 rounded-xl bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Candidate Pipeline</h1>
        <div>
          <label htmlFor="job-filter" className="sr-only">Filter by job</label>
          <select id="job-filter" value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">All Jobs</option>
            {jobs.map((j) => <option key={j._id} value={j._id}>{j.title}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage, stageIndex) => {
          const cards = applications.filter((a) => a.status === stage);
          return (
            <div key={stage} className="w-72 shrink-0">
              <div className={`rounded-t-xl border-t-4 ${stageColor[stage]} bg-gray-50 px-4 py-3`}>
                <p className="text-sm font-semibold text-gray-900">{stageLabel[stage]} <span className="text-gray-400">({cards.length})</span></p>
              </div>
              <div className="flex min-h-[200px] flex-col gap-3 rounded-b-xl border border-t-0 border-gray-200 bg-gray-50/50 p-3">
                {cards.map((a) => (
                  <div key={a._id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900">{a.seekerName}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{a.jobTitle}</p>
                    <p className="mt-1 text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString()}</p>

                    <div className="mt-3 flex items-center gap-1.5">
                      {stageIndex > 0 && (
                        <button onClick={() => moveStage(a._id, STAGES[stageIndex - 1])}
                          aria-label={`Move ${a.seekerName} back to ${stageLabel[STAGES[stageIndex - 1]]}`}
                          className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500">
                          ← Back
                        </button>
                      )}
                      {stageIndex < STAGES.length - 1 && (
                        <button onClick={() => moveStage(a._id, STAGES[stageIndex + 1])}
                          aria-label={`Advance ${a.seekerName} to ${stageLabel[STAGES[stageIndex + 1]]}`}
                          className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500">
                          Advance →
                        </button>
                      )}
                      <button onClick={() => setRejectTarget(a._id)}
                        aria-label={`Reject ${a.seekerName}`}
                        className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-red-500">
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

      <ConfirmModal
        open={!!rejectTarget}
        title="Reject this candidate?"
        message="They will be moved out of the pipeline. This can't be undone from here."
        onCancel={() => setRejectTarget(null)}
        onConfirm={handleReject}
        loading={rejecting}
      />
    </div>
  );
}