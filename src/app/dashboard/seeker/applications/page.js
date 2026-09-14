"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const stageColor = {
  applied: "bg-gray-100 text-gray-700", under_review: "bg-blue-100 text-blue-700",
  shortlisted: "bg-yellow-100 text-yellow-700", offered: "bg-purple-100 text-purple-700",
  hired: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700", withdrawn: "bg-gray-200 text-gray-500",
};

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => apiFetch("/api/applications/mine").then((d) => setApplications(d.applications)).catch(() => setApplications([])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const withdraw = async (id) => {
    if (!confirm("Withdraw this application?")) return;
    try {
      await apiFetch(`/api/applications/${id}/withdraw`, { method: "PATCH" });
      toast.success("Application withdrawn");
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status: "withdrawn" } : a)));
    } catch (err) {
      toast.error(err.message || "Failed to withdraw");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>

      {applications.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {applications.map((a) => (
            <div key={a._id} className="flex items-center justify-between rounded-2xl border border-gray-200 p-5">
              <div>
                <p className="font-semibold text-gray-900">{a.jobTitle}</p>
                <p className="text-sm text-gray-500">{a.companyName} · Applied {new Date(a.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${stageColor[a.status]}`}>{a.status.replace("_", " ")}</span>
                {a.status === "applied" && (
                  <button onClick={() => withdraw(a._id)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50">Withdraw</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}