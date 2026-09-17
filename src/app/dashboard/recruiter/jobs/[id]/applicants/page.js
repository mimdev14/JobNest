"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const STAGES = ["applied", "under_review", "shortlisted", "offered", "hired", "rejected"];
const stageLabel = { applied: "Applied", under_review: "Under Review", shortlisted: "Shortlisted", offered: "Offered", hired: "Hired", rejected: "Rejected" };
const stageColor = {
  applied: "bg-gray-100 text-gray-700", under_review: "bg-blue-100 text-blue-700",
  shortlisted: "bg-yellow-100 text-yellow-700", offered: "bg-purple-100 text-purple-700",
  hired: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700",
};

export default function ApplicantsPage() {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteDrafts, setNoteDrafts] = useState({});

  const load = () => {
    apiFetch(`/api/applications/job/${id}`)
      .then((data) => { setApplications(data.applications); setJob(data.job); })
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [id]);

  const changeStatus = async (appId, status) => {
    try {
      await apiFetch(`/api/applications/${appId}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      toast.success(`Marked as ${stageLabel[status]}`);
      setApplications((prev) => prev.map((a) => (a._id === appId ? { ...a, status } : a)));
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const addNote = async (appId) => {
    const note = noteDrafts[appId];
    if (!note?.trim()) return;
    try {
      await apiFetch(`/api/applications/${appId}/notes`, { method: "POST", body: JSON.stringify({ note }) });
      toast.success("Note added");
      setNoteDrafts((prev) => ({ ...prev, [appId]: "" }));
      load();
    } catch (err) {
      toast.error(err.message || "Failed to add note");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Applicants{job ? ` — ${job.title}` : ""}</h1>

      {applications.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No applicants yet.</p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {applications.map((a) => (
            <div key={a._id} className="rounded-2xl border border-gray-200 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{a.seekerName}</p>
                  <p className="text-sm text-gray-500">{a.seekerEmail}</p>
                  <p className="mt-1 text-xs text-gray-400">Applied {new Date(a.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stageColor[a.status]}`}>{stageLabel[a.status]}</span>
              </div>

              {a.coverLetter && <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">{a.coverLetter}</p>}
              {a.resumeUrl && <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline">View Resume</a>}

              <div className="mt-4 flex flex-wrap gap-2">
                {STAGES.filter((s) => s !== a.status).map((s) => (
                  <button key={s} onClick={() => changeStatus(a._id, s)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50">
                    Mark as {stageLabel[s]}
                  </button>
                ))}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Private Notes</p>
                {a.notes?.map((n, i) => <p key={i} className="mt-2 text-sm text-gray-600">{n.text}</p>)}
                <div className="mt-2 flex gap-2">
                  <input value={noteDrafts[a._id] || ""} onChange={(e) => setNoteDrafts((prev) => ({ ...prev, [a._id]: e.target.value }))}
                    placeholder="Add a private note..." className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                  <button onClick={() => addNote(a._id)} className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-black">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}